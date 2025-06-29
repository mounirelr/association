import { useEffect ,useRef,useState} from "react";
import "../Styles/createPostCard.css"
import profilImage from  "../profilImage.jpg"


export default function  CreatePostCard({editedPost,fetchPosts,clearEditPost}){
  const [errorList, setErrorList] = useState([]);
  const [fileName, setFileName] = useState("Aucun fichier sélectionné");
  const[file,setFile] = useState()

  const titleRef = useRef()
  const ContentRef = useRef()
   const imageRef = useRef();
   const [imageSet,setImageSet]=useState(false)
  
   const [connectedUser,setConnectedUser]=useState([])
   const getConnectedUser=()=>{
    const user = JSON.parse(localStorage.getItem("connectedUser"));
    if (user) {
        setConnectedUser(user);
}
}


   const handleAddPost= async(e)=>{
    e.preventDefault()
    if(editedPost){
      const formData = new FormData();
      formData.append("id",editedPost.id)
    formData.append("titre" , titleRef.current.value.trim())
    formData.append( "content" ,ContentRef.current.value.trim())
    formData.append( "userId" , editedPost.userId)
    if (imageRef.current.files[0]) {
      formData.append("pieceJoint", imageRef.current.files[0]);
    }
   
    
    
    
  


    try{
      const response = await fetch("http://localhost:8080/updatePost", {
        method: "PUT",
        
        body: formData,
    });

    if (response.ok) {
      clearEditPost()
      titleRef.current.defaultValue=""
      fetchPosts()
        console.log("Post updated successfully");
       
    } else {
        const errorData = await response.text();
        setErrorList([errorData || "Failed to update post"]);
    }
    }catch(error){
      console.log(error)
    }



    }


    else{
    const formData = new FormData();
    formData.append("titre" , titleRef.current.value.trim())
    formData.append( "content" ,ContentRef.current.value.trim())
    formData.append( "pieceJoint", imageRef.current.files[0])
    formData.append( "userId" , connectedUser.id)
    

    try{
      const response = await fetch("http://localhost:8080/post", {
        method: "POST",
        
        body: formData,
    });

    if (response.ok) {
      fetchPosts()
        console.log("Post added successfully");
       
    } else {
        const errorData = await response.json();
        setErrorList([errorData.message || "Failed to add event"]);
    }
    }catch(error){
      console.log(error)
    }
  }
   }

  
   const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file)
    setFileName(file ? file.name : "Aucun fichier sélectionné");
};
   

   useEffect(()=>{
    getConnectedUser()
    console.log("editedPost",editedPost)
   },[editedPost])



    return <div className="create-post-card">
    <div className="create-post-header">
    <div className="disscussion-member-info">
          <span className="disscussion-member-avatar">
            {(connectedUser.firstName+" "+connectedUser.lastName)
              ? (connectedUser.firstName+" "+connectedUser.lastName).split(" ").map((word) => word[0]).join("").toUpperCase()
              : "??"}
          </span>
          <h4 className="disscussion-member">{connectedUser.firstName+" "+connectedUser.lastName}</h4>
        </div>
    </div>
  
    <div className="create-post-form">
      <input 
        type="text" 
        placeholder="Post titre..." 
        className="post-input" 
        defaultValue={editedPost?.titre || ""}
        ref={titleRef}
       
      />
  
      <textarea 
        placeholder="Contenu" 
        className="post-textarea" 
        defaultValue={editedPost?.content || ""}
        ref={ContentRef}
       
      ></textarea>


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
  
  

{editedPost && !imageRef.current?.files[0] && !imageSet && (
  <img
    src={`http://localhost:8080/uploads/${editedPost.pieceJoint}`}
    alt="Image actuelle"
    style={{ marginTop: "10px", maxWidth: "200px" }}
  />
)}

  
      
  
      <button  className="add-post-btn" onClick={handleAddPost}>➕ {editedPost ?"Modifier" :"Ajouter"}</button>
    </div>
  </div>
  

}