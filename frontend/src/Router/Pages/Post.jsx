import "../../Styles/Post.css"
import { useEffect,useState } from "react"
import PostCard from "../../Components/PostCard"
import { useOutletContext } from "react-router-dom";
import CreatePostCard from "../../Components/CreatePostCard";

export default  function Post(){
  const { inputSearch } = useOutletContext();

  const [postList, setPostList] = useState([]);
  const [connectedUser,setConnectedUser]=useState([])
  const [editClicked,setEditClicked] = useState(false)
  const [editedPost,setEditedPost] = useState([])

  const getConnectedUser=()=>{
    const user = JSON.parse(localStorage.getItem("connectedUser"));
    if (user) {
        setConnectedUser(user);
}
}




  const clearEditPost=()=>{
    setEditClicked(false)
    setEditClicked([])
  }





  const fetchPosts =  async()=>{

    const response = await fetch("http://localhost:8080/posts");
    const data = await response.json();
    console.log(data)
    setPostList(data);
  }


  const displayPost = () => {
    if (!postList || !Array.isArray(postList)) return [];
  
    const SearchedPostList = postList.filter(post => {
      return post.titre.toLowerCase().includes(inputSearch.toLowerCase());
    });
  
    return SearchedPostList.map((post, key) => (
      <PostCard post={post} key={key} editPost={editPost} fetchPosts={fetchPosts} />
    ));
  };
  

const editPost =(postId)=>{
  console.log("edit is clicked")
  setEditClicked(true)
  const post =getEditedPost(postId)
  setEditedPost(post)
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const getEditedPost=(postId)=>{
 
  return postList.filter((p)=>{
    
    return p.id===parseInt(postId)
  }
  )[0]
 
}



  useEffect(()=>{
    getConnectedUser()
    fetchPosts()
  },[])

  return <>
  <div className="contanierCardPost">
    {connectedUser.role==="Membre" && editClicked===true ?(
       <CreatePostCard editedPost={editedPost} fetchPosts={fetchPosts} clearEditPost={clearEditPost} />
    ) :(
      <CreatePostCard fetchPosts={fetchPosts} />
    )

    
    }
  {displayPost()}
  </div>

  </>
    
   
}