import { useEffect, useState } from "react";
import "../../Styles/profil.css";
import PostCard from "../../Components/PostCard";
import DissuctionCard from "../../Components/DisscutionCard";

export default function Profil() {
  const [userDetails, setUserDetails] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    passwordVerify: ""
  });

  const [switchButton,setswitchButton] = useState(true)
  const [postList,setPostList] = useState([])
  const [discussionList,setDiscussionList]=useState([])

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("connectedUser"));
    fetchPosts()
    fetchDiscussion()
    if (user) {
      setUserDetails(user);
      setFormData({
        email: user.email || "",
        phone: user.phone || "",
        password: "",
        passwordVerify: ""
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit =  async(e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordVerify) {
      alert("Passwords do not match.");
      return;
    }

    const updatedUser = {
        id:userDetails.id,
      email: formData.email,
      phone: formData.phone,
      password :formData.password
    };
    console.log(updatedUser)


    try{

        const response = await fetch(`http://localhost:8080/updateUser`,{
            method: 'PATCH',
            headers :{
                "Content-Type":"application/json"
            },
           body: JSON.stringify(updatedUser),
        })
        if(response.ok){
            console.log("user Updated")
            localStorage.setItem("connectedUser",JSON.stringify({ ...userDetails, ...updatedUser }))
            
           
        }


       }catch(error){
        console.log(error)
       }

    setUserDetails(JSON.parse(localStorage.getItem("connectedUser")));
    
    setEditMode(false);
  };

  

  const fetchPosts =  async()=>{
    const userId= JSON.parse(localStorage.getItem("connectedUser")).id

    const response = await fetch(`http://localhost:8080/postsUser?userId=${userId}`);
    const data = await response.json();
    console.log(data)
    setPostList(data);
  }


  const fetchDiscussion =  async()=>{
    const userId= JSON.parse(localStorage.getItem("connectedUser")).id

    const response = await fetch(`http://localhost:8080/discussionsUser?userId=${userId}`);
    const data = await response.json();
    console.log(data)
    setDiscussionList(data);
  }


  const displayPost = () => {
      
    
      return postList.map((post, key) => (
        <PostCard post={post} key={key} />
      ));
    };

    const displayDisscution = ()=>{
       
        return  discussionList.map((diss,key)=>{
          return   <DissuctionCard diss={diss} key={key} />
        })
      }


  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">
          {(userDetails?.firstName || "U")[0]}
          {(userDetails?.lastName || "N")[0]}
        </div>
        <h1>
          {userDetails?.firstName} {userDetails?.lastName}
        </h1>
      </div>

      <div className="profile-info">
        <div className="profile-details">
          <h2>
          Informations personnelles
            {!editMode && (
              <button className="edit-btn" onClick={() => setEditMode(true)}>
               Modifier
              </button>
            )}
          </h2>

          {!editMode ? (
            <>
              <div className="info-item">
                <span className="label">Email:</span>
                <span className="value">{userDetails.email}</span>
              </div>
              <div className="info-item">
                <span className="label">Telephone:</span>
                <span className="value">{userDetails.phone}</span>
              </div>
              <div className="info-item">
                <span className="label">Role:</span>
                <span className="value">{userDetails.role}</span>
              </div>
            </>
          ) : (
            <form className="edit-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Telephone:</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Mot de passe:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Confirmer votre mot de passe:</label>
                <input
                  type="password"
                  name="passwordVerify"
                  value={formData.passwordVerify}
                  onChange={handleChange}
                />
              </div>
              <div className="form-buttons">
                <button type="submit" className="submit-btn">
                Enregistrer
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setEditMode(false)}
                >
                  Annuler
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <div className="profilbtnAction-row">
      <button className="profilbtnAction-btn profilbtnAction-primary" onClick={() => setswitchButton(prev => !prev)}
      >Mes posts</button>
      <button className="profilbtnAction-btn profilbtnAction-secondary" onClick={() => setswitchButton(prev => !prev)}
      >Mes discussions</button>
    </div>
    
        <br />
    {switchButton===true &&(
        <div className="contanierCardPost">
        {displayPost()}
        </div>
    )}
    {switchButton===false &&(
        <div className="disscussion-container">
       { displayDisscution()}
       </div>
    )}
   
    
    </div>
    
  );
}
