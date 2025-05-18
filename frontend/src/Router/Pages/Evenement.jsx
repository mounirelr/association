import "../../Styles/evenement.css";
import important from "../../important.jpg";
import CreateEventCard from "../../Components/CreateEventCard";
import { useEffect, useState } from "react";
import EventCard from "../../Components/EventCard"
import { useOutletContext } from "react-router-dom";
export default function Evenement() {


  const [eventsList,setEventList] = useState([])
  const { inputSearch } = useOutletContext();
  const [formEdit,setFormEdit] = useState(false)
  const [editedEvent , setEditedEvent] = useState([])


  const getEvents =  async ()=>{
    await fetch("http://localhost:8080/events")
        .then(response=>response.json())
        .then(response=>setEventList(response))
    
  }

  const displayEvents = () =>{
    const eventsToDisplay = eventsList.filter((event)=>{
      return event.titre.toLowerCase().includes(inputSearch.toLowerCase())
    })
    return  eventsToDisplay.map((event,key)=> <EventCard event={event} key={key}  getEvents={getEvents} editEventTrigger={editEventTrigger}/>)
  }


  const handleChangeFilterPeriode = (e)=>{
    console.log(e.currentTarget.value)
    
  }

  const editEventTrigger = (id)=>{
console.log(eventsList)
    const editEvent = eventsList.filter(event=>{
      return event.id===parseInt(id)
    })
    console.log(editEvent[0])
    setFormEdit(true)
    setEditedEvent(editEvent[0])

  }


  const resetEdit = ()=>{
    setFormEdit(false)
  }

  

useEffect(()=>{
  getEvents()
  console.log(formEdit)
  
},[formEdit])


  return (
    <div className="eventManagement">
      {/* Add Event Section */}
      {formEdit===true ?  <CreateEventCard  getEvents={getEvents} formEdit={true} editedEvent={editedEvent}  resetEdit={resetEdit}    key={editedEvent?.id || "create"}/> :  <CreateEventCard  getEvents={getEvents} formEdit={false} resetEdit={resetEdit} key="create" /> }
     

      {/* Event List Section */}
      <section className="eventManagement__listSection">
        <div className="sectionHeader">
          <h2 className="sectionHeader__title">Événements à venir</h2>
          <div className="sectionHeader__filter">
            <select className="filterSelect" onChange={handleChangeFilterPeriode}>
              <option>Tous les événements</option>
              <option>Cette semaine</option>
              <option>Cette mois</option>
            </select>
          </div>
        </div>

        <div className="eventGrid">
        
          
          {displayEvents()}
          </div>
      </section>
    </div>
  );
}