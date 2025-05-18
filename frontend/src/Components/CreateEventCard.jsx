import { useRef, useState, useEffect } from "react";

export default function CreateEventCard({ getEvents, formEdit, editedEvent ,resetEdit }) {
    const [showForm, setShowForm] = useState(false);
    const [errorList, setErrorList] = useState([]);
    const [fileName, setFileName] = useState("Aucun fichier sélectionné");

    const titleRef = useRef();
    const descriptionRef = useRef();
    const dateRef = useRef();
    const heureRef = useRef();
    const placeAdresseRef = useRef();
    const imageRef = useRef();

    function validateFormData() {
        const errors = [];
        // Add your validations here
        return errors;
    }

    const submitFormEvent = async (e) => {
        e.preventDefault();
        const errors = validateFormData();

        if (errors.length > 0) {
            setErrorList(errors);
            return;
        }
      if(!formEdit){
        try {
            const formData = new FormData();
           
            formData.append("titre", titleRef.current.value.trim());
            formData.append("description", descriptionRef.current.value.trim());
            formData.append("date", dateRef.current.value);
            formData.append("heure", heureRef.current.value);
            formData.append("placeAdresse", placeAdresseRef.current.value.trim());
            formData.append("etat", "Active");
            formData.append("userId", 3);
            if (imageRef.current.files[0]) {
                formData.append("pieceJoint", imageRef.current.files[0]);
            }

            const response = await fetch("http://localhost:8080/addEvent", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                console.log("Event added successfully");
                setShowForm(false);
                getEvents();
            } else {
                const errorData = await response.json();
                setErrorList([errorData.message || "Failed to add event"]);
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorList(["Network error. Please try again."]);
        }}
        else{
            



            try {
                const formData = new FormData();
                formData.append("id",editedEvent.id)
                formData.append("titre", titleRef.current.value.trim());
                formData.append("description", descriptionRef.current.value.trim());
                formData.append("date", dateRef.current.value);
                formData.append("heure", heureRef.current.value.slice(0,5));
                formData.append("placeAdresse", placeAdresseRef.current.value.trim());
                formData.append("etat", "Active");
                formData.append("userId", 3);
                if (imageRef.current.files[0]) {
                    formData.append("pieceJoint", imageRef.current.files[0]);
                }
                
    
                const response = await fetch("http://localhost:8080/updateEvent", {
                    method: "PUT",
                    body: formData,
                });
    
                if (response.ok) {
                    console.log("Event updated successfully");
                    resetEdit();
                    setShowForm(false);
                    getEvents();
                } else {
                    const errorData = await response.json();
                    setErrorList([errorData.message || "Failed to update event"]);
                }
            } catch (error) {
                console.error("Error:", error);
                setErrorList(["Network error. Please try again."]);
            }}




        }
    

    const displayErrors = () => {
        return errorList.map((error, key) => <h3 key={key}>- {error}</h3>);
    };

    const toggleForm = () => {
        setShowForm(!showForm);
        resetEdit();
        setErrorList([]);
        setFileName("Aucun fichier sélectionné");
    };

    const checkEdit = () => {
        if (formEdit) {
            window.scrollTo({ top: 120, behavior: 'smooth' });
            setShowForm(true);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFileName(file ? file.name : "Aucun fichier sélectionné");
    };

    useEffect(() => {
        checkEdit();
    }, [formEdit]);

    return (
        <div className="eventManagement__addSection">
            {!showForm ? (
                <button className="eventForm__toggleButton" onClick={toggleForm}>
                    <span>+</span> Ajouter un evenement
                </button>
            ) : (
                <form className="eventForm" onSubmit={submitFormEvent}>
                    <div className="eventForm__header">
                        <h2 className="eventForm__title">
                            {formEdit ? "Modifier l'evenement" : "Ajouter un nouveau evenement"}
                        </h2>
                        <button
                            type="button"
                            className="eventForm__closeButton"
                            onClick={toggleForm}
                        >
                            ×
                        </button>
                    </div>

                    <div className="EventErrors">
                        {errorList.length > 0 && displayErrors()}
                    </div>

                    <div className="eventForm__group">
                        <label htmlFor="title" className="eventForm__label">Titre Evenement</label>
                        <input
                            type="text"
                            id="title"
                            className="eventForm__input"
                            placeholder="Enter title"
                            ref={titleRef}
                            defaultValue={editedEvent?.titre || ""}
                        />
                    </div>

                    <div className="eventForm__group">
                        <label htmlFor="description" className="eventForm__label">Description</label>
                        <textarea
                            id="description"
                            className="eventForm__textarea"
                            rows="4"
                            placeholder="Décrire l'évènement"
                            ref={descriptionRef}
                            defaultValue={editedEvent?.description || ""}
                        ></textarea>
                    </div>

                    <div className="eventForm__row">
                        <div className="eventForm__group eventForm__group--half">
                            <label htmlFor="date" className="eventForm__label">Date</label>
                            <input
                                type="date"
                                id="date"
                                className="eventForm__input"
                                ref={dateRef}
                                defaultValue={editedEvent?.date || ""}
                            />
                        </div>

                        <div className="eventForm__group eventForm__group--half">
                            <label htmlFor="time" className="eventForm__label">Heure</label>
                            <input
                                type="time"
                                id="time"
                                className="eventForm__input"
                                ref={heureRef}
                                defaultValue={editedEvent?.heure || ""}
                            />
                        </div>
                    </div>

                    <div className="eventForm__group">
                        <label htmlFor="location" className="eventForm__label">Emplacement</label>
                        <input
                            type="text"
                            id="location"
                            className="eventForm__input"
                            placeholder="Adresse de l'evenement"
                            ref={placeAdresseRef}
                            defaultValue={editedEvent?.placeAdresse || ""}
                        />
                    </div>

                    <div className="eventForm__group">
                        <label htmlFor="image" className="eventForm__label">Image</label>
                        <div className="eventForm__fileUpload">
                            <label htmlFor="image" className="eventForm__fileLabel">
                                <span className="eventForm__fileButton">Choisir un fichier</span>
                                <span className="eventForm__fileName">{fileName}</span>
                            </label>
                            <input
                                type="file"
                                id="image"
                                className="eventForm__fileInput"
                                ref={imageRef}
                                onChange={handleFileChange}
                                style={{ display: "none" }}
                            />
                        </div>
                        {editedEvent && !imageRef.current?.files[0] && (
                            <img
                                src={`http://localhost:8080/uploads/${editedEvent.pieceJoint}`}
                                alt="Évènement actuel"
                                style={{ marginTop: "10px", maxWidth: "200px" }}
                            />
                        )}
                    </div>

                    <button type="submit" className="eventForm__submit">
                        {formEdit ? "Modifier l'événement" : "Ajouter l'événement"}
                    </button>
                </form>
            )}
        </div>
    );
}
