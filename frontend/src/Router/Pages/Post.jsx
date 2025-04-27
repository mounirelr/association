import "../../Styles/Post.css"
import { useEffect,useState } from "react"
import PostCard from "../../Components/PostCard"
import { useOutletContext } from "react-router-dom";

export default  function Post(){
  const { inputSearch } = useOutletContext();

  const [postList , setPostsList] = useState([])

  const [usersList , setUserList] = useState([])

  


  const fetchUsers = async ()   =>{

  await   fetch('https://dummyjson.com/users')
    .then(response=> response.json())
    .then(resposne=> setUserList(resposne.users))
  }


  const fetchPosts =  async()=>{

     await fetch('https://dummyjson.com/posts')
    .then(response=> response.json())
    .then(response=>setPostsList(response.posts))
  }


  const displayPost = ()=>{

    const SearchedPostList = postList.filter(post=>{
      return post.title.toLowerCase().includes(inputSearch.toLowerCase())
    })
    

     return SearchedPostList.map((post,key)=> { 

    
      const user = usersList.find(u=>  u.id === post.userId) ;
      
    
    return  <PostCard   post={post}  key={key} user={user} /> 
  })
}





  useEffect(()=>{
    fetchUsers()
    fetchPosts()
    
    
  },[])

  return <>
{console.log(inputSearch)}
  {displayPost()}
  </>
    
   
}