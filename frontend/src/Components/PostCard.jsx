
import important from "../important.jpg"
import profilImage from "../profilImage.jpg"
export default function PostCard({post,user}){


    const  handleClickLike =(e)=>{
        e.preventDefault()

    }




    return <div className="post-card">
        
    <div className="post-header">
      <img src={user?.image ? user.image : profilImage } alt="user" className="user-photo" />
      <h4>{user?.firstName} {user?.lastName}</h4>
    </div>

    <div className="post-content">
      <h3>{post.title}</h3>
      <p>{post.body}</p>
       <img src={important} alt="post" className="post-image" width={150} height={300} />
    </div>

    <div className="post-actions">
      <button onClick={handleClickLike} className="like-btn">👍 {post.reactions.likes} Like</button>
      <button className="comment-btn">💬 Comment</button>
    </div>
  </div>
}