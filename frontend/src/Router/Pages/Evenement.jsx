import "../../Styles/evenement.css";
import important from "../../important.jpg";
import CreateEventCard from "../../Components/CreateEventCard";
import { useEffect, useState } from "react";
import EventCard from "../../Components/EventCard";
import { useOutletContext } from "react-router-dom";

export default function Evenement() {
  const [eventsList, setEventList] = useState([]);
  const { inputSearch } = useOutletContext();
  const [formEdit, setFormEdit] = useState(false);
  const [editedEvent, setEditedEvent] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); 
  const [connectedUser,setConnectedUser]=useState([])

  const getConnectedUser=()=>{
    const user = JSON.parse(localStorage.getItem("connectedUser"));
    if (user) {
        setConnectedUser(user);
}
}

  const getEvents = async () => {
    const response = await fetch("http://localhost:8080/events");
    const data = await response.json();
    setEventList(data);
  };

  const displayEvents = () => {
    const eventsToDisplay = eventsList.filter((event) =>
      event.titre.toLowerCase().includes(inputSearch.toLowerCase())
    );
    return eventsToDisplay.map((event, key) => (
      <EventCard
        event={event}
        key={key}
        getEvents={getEvents}
        editEventTrigger={editEventTrigger}
        displayEventDetails={displayEventDetails}
        connectedUser={connectedUser}
      />
    ));
  };

  const handleChangeFilterPeriode = (e) => {
    const filterValue = e.currentTarget.value;
    const today = new Date();
    
    const filteredEvents = eventsList.filter(event => {
      const eventDate = new Date(event.date);
      
      switch(filterValue) {
        case "Cette semaine":
          const startOfWeek = new Date(today);
          startOfWeek.setDate(today.getDate() - today.getDay()); 
          const endOfWeek = new Date(today);
          endOfWeek.setDate(today.getDate() + (6 - today.getDay())); 
          
          return eventDate >= startOfWeek && eventDate <= endOfWeek;
          
        case "Ce mois":
         
          return (
            eventDate.getMonth() === today.getMonth() && 
            eventDate.getFullYear() === today.getFullYear()
          );
          
        default: 
          return true;
      }
    });
    
    setEventList(filteredEvents);
    
    
    if (filterValue === "Tous les événements") {
      getEvents();
    }
  };

  const editEventTrigger = (id) => {
    const editEvent = eventsList.find((event) => event.id === parseInt(id));
    setFormEdit(true);
    setEditedEvent(editEvent);
  };

  const resetEdit = () => {
    setFormEdit(false);
  };

  const displayEventDetails = (id) => {
    const foundEvent = eventsList.find((e) => e.id === parseInt(id));
    setSelectedEvent(foundEvent); 
  };

  const closeDetails = () => {
    setSelectedEvent(null);
  };

  useEffect(() => {
    getConnectedUser()
    getEvents();
  }, [formEdit]);

  return (
    <div className="eventManagement">
     
      
   
      { connectedUser.role==="Moderateur" && formEdit ? (
        <CreateEventCard
          getEvents={getEvents}
          formEdit={true}
          editedEvent={editedEvent}
          resetEdit={resetEdit}
          key={editedEvent?.id || "create"}
        />
      ) : connectedUser.role==="Moderateur" ? (
        <CreateEventCard
          getEvents={getEvents}
          formEdit={false}
          resetEdit={resetEdit}
          key="create"
        />
      ) :''}

     
      <section className="eventManagement__listSection">
        <div className="sectionHeader">
          <h2 className="sectionHeader__title">Événements à venir</h2>
          <div className="sectionHeader__filter">
            <select className="filterSelect" onChange={handleChangeFilterPeriode}>
              <option>Tous les événements</option>
              <option>Cette semaine</option>
              <option>Ce mois</option>
            </select>
          </div>
        </div>

        <div className="eventGrid">{displayEvents()}</div>
      </section>

      
      {selectedEvent && (
        <div className="eventDetailsModal">
          <div className="eventDetailsContent">
            <button className="closeButton" onClick={closeDetails}>
              &times;
            </button>
            <h2>{selectedEvent.titre}</h2>
            <p>{selectedEvent.description}</p>
            <p>Date: {selectedEvent.date}</p>
            <p>Heure: {selectedEvent.heure}</p>
            <p>Adresse: {selectedEvent.placeAdresse}</p>
            
          </div>
        </div>
      )}
    </div>
  );
}
