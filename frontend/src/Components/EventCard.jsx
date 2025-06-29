import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default function EventCard({event ,getEvents,editEventTrigger,displayEventDetails,connectedUser}){


    

    const exportToExcel =(participants, fileName) =>{
        const worksheet = XLSX.utils.json_to_sheet(participants);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Participants");

  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array'
  });

  const data = new Blob([excelBuffer], { type: 'application/octet-stream' });

  saveAs(data, fileName);

    }

  


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

    const handlePlusInfo = (e)=>{
        e.preventDefault()
        const eventId=e.currentTarget.dataset.id
        displayEventDetails(eventId)


    }


    const handleRegisterEvent = async (e) => {
        e.preventDefault();
        if (window.confirm("Êtes-vous sûr de vouloir vous inscrire à cet événement ?")) {
          const eventId = e.currentTarget.dataset.id;
          const memberId = connectedUser.id;
      
          try {
            const response = await fetch(`http://localhost:8080/events/${eventId}/register/${memberId}`, {
              method: "PUT"
            });
      
            if (response.ok) {
                
              alert(await response.text());
            } else {
              alert(await response.text());
            }
          } catch (error) {
            console.error("Erreur lors de l'inscription :", error);
            alert("Une erreur est survenue. Veuillez réessayer plus tard.");
          }
        }
      }


      


      const getParticipantsList= async(e)=>{
        e.preventDefault()
        const eventId = e.currentTarget.dataset.id
        const eventName = e.currentTarget.parentNode.parentNode.querySelector('h3').innerHTML+".xlsx"
       

        try{
            const response = await fetch(`http://localhost:8080/eventsParticipant/${eventId}`, {
                method: "GET"
              });

              if(response.status===200){

              const data =  await response.json();
              console.log(data)

              const mappedData = data.map(p => ({
                Nom: p.firstname,
                Prenom: p.lastname,
                Email: p.email,
                Telephone: p.phone
              }));
              exportToExcel(mappedData,eventName)
             
              

              }

        }catch(error){
            console.log(error)
        }

    




      }

      const headers = [
        { label: 'Nom', key: 'firstname' },
        { label: 'Prenom', key: 'lastname' },
        { label: 'Email', key: 'email' },
        { label: 'Telephone', key: 'phone' },
      ];



     
      


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
      {connectedUser.role==="Membre" ? (
        <div className="eventCard__buttons">
        <button className="eventCard__button eventCard__button--register"  data-id={event.id} onClick={handleRegisterEvent}>S'inscrire</button>
        <button className="eventCard__button eventCard__button--more"   data-id={event.id} onClick={handlePlusInfo}>Plus d'information</button>
      </div>
      ) : (
                    <>
                    <div className="eventCard__buttons">
                            <button className="eventCard__button eventCard__button--register" data-id={event.id} onClick={getParticipantsList} >Liste des participants </button>
                            <button className="eventCard__button eventCard__button--more" data-id={event.id} onClick={handlePlusInfo}>Plus d'information</button>
                            
                        </div>


               <div className="eventCard__buttonsModerator">
                        <button className="eventCard__button eventCard__button--register" data-id={event.id} onClick={handleDeleteEvent}>Supprimer</button>
                        {connectedUser.role==="Moderateur" && (

                            <button className="eventCard__button eventCard__button--more" data-id={event.id} onClick={handeEditEvent}>Modifier</button>
                        )}
                    </div>         
                        
                        </>
     
      )}
      
      
      
    </div>
  </div>
}