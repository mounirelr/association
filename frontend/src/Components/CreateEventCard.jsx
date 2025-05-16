import { useRef, useState } from "react";

export default function CreateEventCard() {
    const [showForm, setShowForm] = useState(false);
    const [errorList, setErrorList] = useState([]);
    
    const titleRef = useRef();
    const descriptionRef = useRef();
    const dateRef = useRef();
    const heureRef = useRef();
    const placeAdresseRef = useRef();
    const imageRef = useRef();

    function validateFormData(formData) {
        const errors = [];
        if (formData.title.length === 0) {
            errors.push("Title is required");
        }
        return errors;
    }

    const submitFormEvent = (e) => {
        e.preventDefault();
        const formData = [
            { key: 'title', value: titleRef.current.value.trim(), ref: titleRef },
            { key: 'description', value: descriptionRef.current.value.trim(), ref: descriptionRef },
            { key: 'date', value: dateRef.current.value, ref: dateRef },
            { key: 'heure', value: heureRef.current.value, ref: heureRef },
            { key: 'placeAdresse', value: placeAdresseRef.current.value.trim(), ref: placeAdresseRef },
            { key: 'image', value: imageRef.current.files[0], ref: imageRef } 
        ];
        const errors = validateFormData(formData);
        setErrorList(errors);
        
        if (errors.length === 0) {
            // Form submission logic here
            setShowForm(false); // Close form after submission
        }
    };

    const toggleForm = () => {
        setShowForm(!showForm);
        setErrorList([]); // Clear errors when toggling
    };

    return (
        <div className="eventManagement__addSection">
            {!showForm ? (
                <button 
                    className="eventForm__toggleButton"
                    onClick={toggleForm}
                >
                    <span>+</span> Add New Event
                </button>
            ) : (
                <form className="eventForm">
                    <div className="eventForm__header">
                        <h2 className="eventForm__title">Ajouter un nouveau evenement</h2>
                        <button 
                            type="button" 
                            className="eventForm__closeButton"
                            onClick={toggleForm}
                        >
                            ×
                        </button>
                    </div>
                    
                    <div className="eventForm__group">
                        <label htmlFor="title" className="eventForm__label">Event Title</label>
                        <input 
                            type="text" 
                            id="title" 
                            className="eventForm__input" 
                            placeholder="Enter title"  
                            ref={titleRef}
                        />
                    </div>

                    <div className="eventForm__group">
                        <label htmlFor="description" className="eventForm__label">Description</label>
                        <textarea 
                            id="description" 
                            className="eventForm__textarea" 
                            rows="4" 
                            placeholder="Describe the event" 
                            ref={descriptionRef}
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
                            />
                        </div>
                        
                        <div className="eventForm__group eventForm__group--half">
                            <label htmlFor="time" className="eventForm__label">Time</label>
                            <input 
                                type="time" 
                                id="time" 
                                className="eventForm__input" 
                                ref={heureRef} 
                            />
                        </div>
                    </div>

                    <div className="eventForm__group">
                        <label htmlFor="location" className="eventForm__label">Location</label>
                        <input 
                            type="text" 
                            id="location" 
                            className="eventForm__input" 
                            placeholder="Event address"  
                            ref={placeAdresseRef}
                        />
                    </div>

                    <div className="eventForm__group">
                        <label htmlFor="image" className="eventForm__label">Image</label>
                        <div className="eventForm__fileUpload">
                            <label htmlFor="image" className="eventForm__fileLabel">
                                <span className="eventForm__fileButton">Choose File</span>
                                <span className="eventForm__fileName">No file selected</span>
                            </label>
                            <input 
                                type="file" 
                                id="image" 
                                className="eventForm__fileInput"  
                                ref={imageRef}
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="eventForm__submit" 
                        onClick={submitFormEvent}
                    >
                        Add Event
                    </button>
                </form>
            )}
        </div>
    );
}