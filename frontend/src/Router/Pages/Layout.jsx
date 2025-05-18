import { Link,Outlet  } from "react-router-dom"
import {useEffect, useState} from "react"

import "../../Styles/Layout.css"
import SearchBar from "../../Components/SearchBar";



export default  function Layout(){
   
    const [inputSearch, setInputSearch] = useState("");

    const [connectedUser,setConnectedUser] =useState({})

    const filterSearch = (inputSearch) => {
      setInputSearch(inputSearch);  
    };

    const getConnectedUser = ()=>{
      const user = JSON.parse(localStorage.getItem("connectedUser"))
      
      setConnectedUser(user)
    }

    useEffect(()=>{
      getConnectedUser()
    },[])


    return <>
    <div className="sidebar">
    <div className="logo">
        <h3>Association</h3>

    </div>
    <ul>
       
        
            <li >
                <Link to="/" >
                    <i className="fas fa-tachometer-alt"></i>
                    <span>Aperçu</span>
                </Link>
            </li>

            <li className="active">
            <Link to="/post" >
                    <i className="fa-regular fa-newspaper"></i>
                    <span>Post</span>
                </Link>
            </li>

            <li>
            <Link to="/disscution" >
                    <i className="fa-regular fa-comments"></i>
                    <span>Disscution</span>
                </Link>
            </li>




            <li>
            <Link to="/evenement" >
                    <i className="fa-regular fa-calendar-days"></i>
                    <span>evenement</span>
                </Link>
            </li>

            <li>
            <Link to="/members" >
                    <i className="fa-regular fa-circle-user"></i>
                <span>Membre</span>
            </Link>
        </li>

        
        

        <li>
        <Link to="/Membre" >
                <i className="fa-solid fa-user"></i>
                <span>Profil</span>
             </Link >
        </li>


        <li className="logout">
       

                <i className="fa-solid fa-right-from-bracket"></i>
                <span>Deconnecter</span>
            
        </li>
    </ul>
</div>






<div className="main_content">
        <div className="headerNav">
            <span></span>
            <SearchBar filterSearch={filterSearch} />
            <div className="userInfo">
                <span>{connectedUser.firstName} {connectedUser.lastName}</span>
                
            </div>
        </div>

        
     
        


    <div className="content">
    
    <Outlet  context={{ inputSearch }}/>
        </div>
        
    </div>
    </> 

    
    
}