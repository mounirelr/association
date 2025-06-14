import { useEffect ,useRef,useState} from "react";
import "../Styles/createPostCard.css"
import profilImage from  "../profilImage.jpg"


export default function  CreatePostCard(){
  const [errorList, setErrorList] = useState([]);

  const titleRef = useRef()
  const ContentRef = useRef()
   const imageRef = useRef();
   const [connectedUser,setConnectedUser]=useState([])
   const getConnectedUser=()=>{
    const user = JSON.parse(localStorage.getItem("connectedUser"));
    if (user) {
        setConnectedUser(user);
}
}


   const handleAddPost= async(e)=>{
    e.preventDefault()
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
        console.log("Post added successfully");
       
    } else {
        const errorData = await response.json();
        setErrorList([errorData.message || "Failed to add event"]);
    }
    }catch(error){
      console.log(error)
    }
   }


   useEffect(()=>{
    getConnectedUser()
   },[])



    return <div className="create-post-card">
    <div className="create-post-header">
      <img src= {profilImage} alt="user" className="user-photo" />
      <h4>hassan java</h4>
    </div>
  
    <div className="create-post-form">
      <input 
        type="text" 
        placeholder="Post titre..." 
        className="post-input" 
        
        ref={titleRef}
       
      />
  
      <textarea 
        placeholder="Contenu" 
        className="post-textarea" 
       
        ref={ContentRef}
       
      ></textarea>
  
      <input 
        type="file" 
        accept="image/*" 
        className="file-input" 
        ref={imageRef}
        
      />
  
      
  
      <button  className="add-post-btn" onClick={handleAddPost}>➕ Add Post</button>
    </div>
  </div>
  

}