import { useEffect, useState } from "react";
export default function DissuctionCard({diss}){
   

    const [editedMessage, setEditedMessage] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMessage, setNewMessage] = useState('');
   const [showMessages, setShowMessages] = useState(false);
    const [isEditing, setIsEditing] = useState(null);


    const handleEdit = (messageId, currentContent) => {
        if (isEditing === messageId) {
        
          setIsEditing(null);
        } else {
          setEditedMessage(currentContent);
          setIsEditing(messageId);
        }
      };

      const [connectedUser,setConnectedUser]=useState([])

  const getConnectedUser=()=>{
    const user = JSON.parse(localStorage.getItem("connectedUser"));
    if (user) {
        setConnectedUser(user);
}
}
    


  const handleShowMessages = () => setShowMessages(!showMessages);


    const handleDeleteMessage = (messageId) => {
        console.log("Delete message:", messageId);
      };
    
      const handleDeleteDiscussion = () => {
        console.log("Delete discussion");
      };
    
      const handleAddMessage =  async (e) => {
        e.preventDefault()
        if (newMessage.trim()) {
          console.log("Add message:", newMessage);

          const response =   await fetch("http://localhost:8080/addMessage",{
            method:"POST",
            headers :{
                "Content-Type" :"application/json"
            },
            body : JSON.stringify({
                "contenu": newMessage,
                "idPost": e.currentTarget.dataset.id,
                 "idUser" : connectedUser.id

            }),
            

          })
          if(response.status === 200){
            console.log("message ajoute avec success")
          
        }
        else{
            console.log("erreur dans l'ajout du message ")
        }
          
          setNewMessage('');
          setShowAddForm(false);
        }
      };

      useEffect(()=>{
        getConnectedUser()
      },[])
    

    return <div className="disscussion-card">
    <div className="disscussion-header">
      <div className="disscussion-member-info">
        <span className="disscussion-member-avatar">
        {diss.user.split(' ').map(word => word[0]).join('').toUpperCase()}

        </span>
        <h4 className="disscussion-member"> {diss.user}</h4>
      </div>
    </div>

    <div className="disscussion-card-header">
      <div className="disscussion-card-info">
        <h3 className="disscussion-card-title">{diss.title}</h3>
        <p className="disscussion-card-description">
        {diss.description}
        </p>
      </div>
      <div className="disscussion-card-actions">
        <button
          className="disscussion-btn disscussion-show-btn"
          onClick={handleShowMessages}
        >
          {showMessages ? 'Hide Messages' : 'Show Messages'}
        </button>
        <button
          className="disscussion-btn disscussion-delete-btn"
          onClick={handleDeleteDiscussion}
        >
          Delete Discussion
        </button>
      </div>
    </div>

    {showMessages && (
      <>
        <div className="disscussion-add-message-btn-container">
          <button
            className="disscussion-btn disscussion-add-btn"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? 'Cancel' : 'Add Message'}
          </button>
        </div>

        {showAddForm && (
          <div className="disscussion-add-form">
            <textarea
              className="disscussion-edit-input"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Write your message..."
            />
            <div className="disscussion-actions">
              <button
                className="disscussion-btn disscussion-save-btn"
                data-id={diss.id}
                onClick={handleAddMessage}
              >
                Post Message
              </button>
            </div>
          </div>
        )}

        <div className="disscussion-messages-list">
          {diss.commentaire.map((msg) => (
            <div key={msg.id} className="disscussion-message-container">
              <div className="disscussion-message-header">
                <span className="disscussion-message-author">
                  {msg.user}
                </span>
                <span className="disscussion-message-time">
                  {msg.date}
                </span>
              </div>
              
              {isEditing === msg.id ? (
                <textarea
                  className="disscussion-edit-input"
                  value={editedMessage}
                  onChange={(e) => setEditedMessage(e.target.value)}
                />
              ) : (
                <p className="disscussion-message">{msg.contenu}</p>
              )}
              
              <div className="disscussion-actions">
                <button
                  className="disscussion-btn disscussion-edit-btn"
                  onClick={() => handleEdit(msg.id, msg.contenu)}
                >
                  {isEditing === msg.id ? 'Save' : 'Edit'}
                </button>
                <button
                  className="disscussion-btn disscussion-delete-btn"
                  onClick={() => handleDeleteMessage(msg.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </>
    )}
  </div>
}