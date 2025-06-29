
export default  function CreateEvent(){

    return <>
    <div className="eventManagement__addSection">
        <form className="eventForm">
          <h2 className="eventForm__title">Cree un nouveau evenement</h2>
          
          <div className="eventForm__group">
            <label htmlFor="title" className="eventForm__label">Titre evenement</label>
            <input type="text" id="title" className="eventForm__input" placeholder="Entrer un titre" />
          </div>

          <div className="eventForm__group">
            <label htmlFor="description" className="eventForm__label">Description</label>
            <textarea id="description" className="eventForm__textarea" rows="4" placeholder="Decrire l'evenement"></textarea>
          </div>

          <div className="eventForm__row">
            <div className="eventForm__group eventForm__group--half">
              <label htmlFor="date" className="eventForm__label">Date</label>
              <input type="date" id="date" className="eventForm__input" />
            </div>
            
            <div className="eventForm__group eventForm__group--half">
              <label htmlFor="time" className="eventForm__label">Heure</label>
              <input type="time" id="time" className="eventForm__input" />
            </div>
          </div>

          <div className="eventForm__group">
            <label htmlFor="location" className="eventForm__label">Place</label>
            <input type="text" id="location" className="eventForm__input" placeholder="Adresse Evenement" />
          </div>

          <div className="eventForm__group">
            <label htmlFor="image" className="eventForm__label">Image</label>
            <div className="eventForm__fileUpload">
              <label htmlFor="image" className="eventForm__fileLabel">
                <span className="eventForm__fileButton">Choisir un fichier</span>
                <span className="eventForm__fileName">Aucun fichier n'est sélectionné</span>
              </label>
              <input type="file" id="image" className="eventForm__fileInput" />
            </div>
          </div>

          <button type="submit" className="eventForm__submit">
            <span className="eventForm__submitIcon">+</span> Ajouter l'événement
          </button>
        </form>
      </div>
    </>
}