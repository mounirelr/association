import React, { useEffect, useState } from "react";

export default function PostCard({ post,editPost,fetchPosts }) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  const [connectedUser,setConnectedUser]=useState([])
   const getConnectedUser=()=>{
    const user = JSON.parse(localStorage.getItem("connectedUser"));
    if (user) {
        setConnectedUser(user);
}
}

  const handleClickLike = async (e) => {
    e.preventDefault();
    const postId = e.currentTarget.dataset.id;
    const userId= connectedUser.id;
    
    try{
      const response = await fetch(`http://localhost:8080/likePost/${postId}/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      })
      
     if(response.ok){
      fetchPosts()
      console.log("like add successfully")
     }
    }catch(err){
      console.log(err)
    }
   
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const postId = e.currentTarget.dataset.id;
    try {
      const response = await fetch(`http://localhost:8080/deletePost?postId=${postId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchPosts()
        console.log("Deleted successfully");
       
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleComment = () => {
    setShowComments((prev) => !prev);
  };


    const handleDeleteComment= async(idComment)=>{
      console.log("yes ",idComment)
        const response = await fetch(`http://localhost:8080/deleteComment/${idComment}`,{
          method:"DELETE",

        })
        if(response.status === 200){
          fetchPosts()
          console.log("commentaire supprimer avec success")
        
      }
      else{
        console.log("erreur dans la suppression du commentaire ")
    }

      
    }

  const handleSendComment =  async(e) => {
    if (commentText.trim() === "") return;
    const response =   await fetch("http://localhost:8080/addPostComment",{
      method:"POST",
      headers :{
          "Content-Type" :"application/json"
      },
      body : JSON.stringify({
          "contenu": commentText,
          "idPost": e.currentTarget.dataset.id,
           "idUser" : connectedUser.id

      }),
      

    })
    if(response.status === 200){
      fetchPosts()
      console.log("message ajoute avec success")
    
  }
  else{
      console.log("erreur dans l'ajout du message ")
  }
   
    setCommentText(""); 
  
  };

 

  const handleEditPost = (e)=>{
    e.preventDefault()
    const postId = e.currentTarget.dataset.id
    editPost(postId)
   
  }

  useEffect(()=>{
    getConnectedUser()
  },[])

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="disscussion-member-info">
          <span className="disscussion-member-avatar">
            {post.user
              ? post.user.split(" ").map((word) => word[0]).join("").toUpperCase()
              : "??"}
          </span>
          <h4 className="disscussion-member">{post.user}</h4>
        </div>

        <div className="post-actions">
          {connectedUser.role==="Membre" && connectedUser.id===post.userId &&(

          <button className="post-btn edit-btn" data-id={post.id} onClick={handleEditPost}>Modifier</button>
          )}
          {(connectedUser.role!=="Membre" || connectedUser.id===post.userId )&& (
           
            <button
            className="post-btn delete-btn"
            data-id={post.id}
            onClick={handleDelete}
          >
            Supprimer
          </button>
          
          )}
          
        </div>
      </div>

      <div className="post-content">
        <h3>{post.titre}</h3>
        <p>{post.content}</p>
        <img
          src={"http://localhost:8080/uploads/" + post.pieceJoint}
          alt="post"
          className="post-image"
          width={150}
          height={300}
        />
      </div>

      <div className="post-actions">
       {connectedUser.role==="Membre" ? (
         <button onClick={handleClickLike} className="like-btn"  data-id={post.id}>
         👍 {post.likes} Like
       </button>
       ): (<button  className="like-btn"  >
       👍 {post.likes} Like
     </button> )}
        <button onClick={handleToggleComment} className="comment-btn">
          💬 Comment
        </button>
      </div>

     
      {showComments && (
  <div className="comment-section">
    {connectedUser.role==="Membre"  && (
     <><textarea
              className="comment-input"
              placeholder="Ecrire un commentaire"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea><button
              className="send-comment-btn"
              data-id={post.id}
              onClick={handleSendComment}
            >
                Ajouter
              </button></>
    )}
    
   
    
    <div className="existing-comments">
    {post.commentaire && post.commentaire.length > 0 ? (
  post.commentaire.map((comment, index) => (
    <div key={index} className="comment-card">
      <div className="comment-content">
        <div className="comment-header">
          <h3>{comment.user || "Anon"}</h3>
          
        </div>
        <p>{comment.contenu}</p>
      </div>
      <div className="rightPostComment">
      <span className="comment-date">{comment.date}</span>
      {(connectedUser.role!=="Membre" || connectedUser.id===post.userId) &&(
        <button
        className="delete-comment-btn"
        onClick={() => handleDeleteComment(comment.id)}
      >
        Supprimer
      </button>
      )}
      
      </div>
    </div>
  ))
) : (
  <p className="no-comments">Pas de commentaire pour l'instant.</p>
)}

    </div>

    
  </div>
)}


    </div>
  );
}
