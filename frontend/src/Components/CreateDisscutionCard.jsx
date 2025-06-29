import { useState  , useRef, useEffect} from "react";

export default function CreateDisscutionCard({getDisscution}) {
  const [showAddDiscussionForm, setShowAddDiscussionForm] = useState(false);
  const newDiscussionTitle = useRef()
  const newDiscussionDescription = useRef()

  const [connectedUser,setConnectedUser]=useState([])

  const getConnectedUser=()=>{
    const user = JSON.parse(localStorage.getItem("connectedUser"));
    if (user) {
        setConnectedUser(user);
}
}

  const handleAddDiscussion = async () => {
    const title = newDiscussionTitle.current.value.trim()
    const description = newDiscussionDescription.current.value.trim()
    if(title.length === 0){

        console.log("titre est obligatoire")
    }
    else{

        const newDisscution ={
            "title" : title,
            "description" : description,
            "userId" : connectedUser.id
        }

        try{

            const response = await fetch("http://localhost:8080/addDisscution",{
                method :"POST" ,
                headers :{
                    "Content-Type" :"application/json",
                },
                
                body : JSON.stringify(newDisscution)
            })

            if(response.status === 200){
                console.log("disscution ajoute avec success")
                setShowAddDiscussionForm(!showAddDiscussionForm)
                getDisscution()
            }
            else{
                console.log("erreur dans l'ajout du disscution ")
            }


        }catch(error){
            console.log(error)
        }
    }
    
  }
  useEffect(()=>{
    getConnectedUser()
  },[])

  return (
    <div className="disscussion-add-container">
      <div style={{ 
        display: 'flex', 
        justifyContent: showAddDiscussionForm ? 'flex-end' : 'flex-start',
        width: '100%',
        marginBottom : '5px',
      }}>
        <button
          className="disscussion-btn disscussion-add-discussion-btn"
          onClick={() => setShowAddDiscussionForm(!showAddDiscussionForm)}
          style={{ marginBottom: "5px" }}
        >
          {showAddDiscussionForm ? 'Annuler' : 'Ajouter une discussion'}
        </button>
      </div>
      
      {showAddDiscussionForm && (
        <div className="disscussion-add-form">
          <input
            type="text"
            className="disscussion-edit-input"
            
             ref={newDiscussionTitle}
            placeholder="Titre de la discussion"
          />
          <textarea
            className="disscussion-edit-input"
           
             ref={newDiscussionDescription}
            placeholder="Description de la discussion"
          />
          <div className="disscussion-actions">
            <button
              className="disscussion-btn disscussion-save-btn"
              onClick={handleAddDiscussion}
            >
              Créer une discussion
            </button>
          </div>
        </div>
      )}
    </div>
  );
}