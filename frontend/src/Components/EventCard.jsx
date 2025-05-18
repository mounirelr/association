

export default function eventCard({event ,getEvents,editEventTrigger}){

    const handleDeleteEvent =  async (e)=>{
        e.preventDefault()
        const eventId = e.currentTarget.dataset.id
       try{

        const response = await fetch(`http://localhost:8080/deleteEvent/${eventId}`,{
            method: 'DELETE',
        })
        if(response.ok){
            console.log("deleted successfuly")
            getEvents()
        }


       }catch(error){
        console.log(error)
       }

    }


    const handeEditEvent = (e)=>{
        e.preventDefault()
        const eventId = e.currentTarget.dataset.id
        editEventTrigger(eventId)


    }


    return <div className="eventCard">
    {/* <div className="eventCard__badge">Featured</div> */}
    <img src={"http://localhost:8080/uploads/"+event.pieceJoint} alt="Event" className="eventCard__image" />
    <div className="eventCard__content">
      <div className="eventCard__date">{event.date} • {event.heure.slice(0,5)}</div>
      <h3 className="eventCard__title">{event.titre}</h3>
      <p className="eventCard__description">
      {event.description}
      </p>
      <div className="eventCard__meta">
        <span className="eventCard__location">{event.placeAdresse}</span>
        <span className="eventCard__spots">Place limitee</span>
      </div>
      <div className="eventCard__buttons">
        <button className="eventCard__button eventCard__button--register">S'inscrire</button>
        <button className="eventCard__button eventCard__button--more">Plus d'information</button>
      </div>
      <div className="eventCard__buttonsModerator">
        <button className="eventCard__button eventCard__button--register" data-id={event.id} onClick={handleDeleteEvent}>Supprimer</button>
        <button className="eventCard__button eventCard__button--more" data-id={event.id} onClick={handeEditEvent}>Modifier</button>
      </div>
    </div>
  </div>
}