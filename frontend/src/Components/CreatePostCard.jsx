import "../Styles/createPostCard.css"
import profilImage from  "../profilImage.jpg"


export default function  CreatePostCard(){



    return <div className="create-post-card">
    <div className="create-post-header">
      <img src= {profilImage} alt="user" className="user-photo" />
      <h4>hassan java</h4>
    </div>
  
    <div className="create-post-form">
      <input 
        type="text" 
        placeholder="Post title..." 
        className="post-input" 
        value="" 
       // onChange={(e) => setTitle(e.target.value)} 
      />
  
      <textarea 
        placeholder="What's on your mind?" 
        className="post-textarea" 
        value=""
        //onChange={(e) => setBody(e.target.value)} 
      ></textarea>
  
      <input 
        type="file" 
        accept="image/*" 
        className="file-input" 
        //onChange={handleFileChange} 
      />
  
      
  
      <button  className="add-post-btn">➕ Add Post</button>
    </div>
  </div>
  

}