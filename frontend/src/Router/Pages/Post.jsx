import "../../Styles/Post.css"
import { useEffect,useState } from "react"
import PostCard from "../../Components/PostCard"
import { useOutletContext } from "react-router-dom";
import CreatePostCard from "../../Components/CreatePostCard";

export default  function Post(){
  const { inputSearch } = useOutletContext();

  const [postList, setPostList] = useState([]);




  





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
      <PostCard post={post} key={key} />
    ));
  };
  





  useEffect(()=>{
   
    fetchPosts()
   
    
    
  },[])

  return <>
  <div className="contanierCardPost">


  <CreatePostCard />
  {displayPost()}
  </div>

  </>
    
   
}