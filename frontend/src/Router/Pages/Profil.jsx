import { useEffect,useState ,useRef} from "react"
import "../../Styles/profil.css"
export default function Profil(){

    const [userDetails,setUserDetails] = useState({})
    const [errors , setErrors] =useState([])
    const [message ,setMessage] =useState("")
    const emailRef = useRef()
    const phoneRef = useRef()
    const passwordRef = useRef()
    const passwordVerifyRef = useRef()

    const getConnectedUser = ()=>{
        const user = JSON.parse(localStorage.getItem("connectedUser"))
        setUserDetails(user)
    }
    const verifyInput =(email,phone,password,passwordVerify)=>{
        const newErrors =[];

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
          newErrors.push({ "message": "Email is required" });
        } else if (!emailRegex.test(email)) {
          newErrors.push({ "message": "Email is invalid" });
        }

        const phoneRegex = /^0\d{9}$/;
        if (!phone.trim()) {
          newErrors.push({ "message": "Phone is required" });
        } else if (!phoneRegex.test(phone)) {
          newErrors.push({ "message": "Phone is invalid" });
        }


        if(password){
          if (password.length < 8) {
            newErrors.push({ "message": "Password must be at least 8 characters long" });
          }
        
         
          if (password !== passwordVerify) {
            newErrors.push({ "message": "Password confirmation does not match" });
          }
        }

          setErrors(newErrors);
        if(newErrors.length>0)
            return true
        else return false

    }
    const displayErrors = ()=>{
        return errors.map((err, key) => <span key={key} className="error"  style={{color:"red"}}>{err.message}</span>);
    }

    const handleSubmitUpdate = async (e)=>{
        e.preventDefault()
        const email = emailRef.current.value
        const phone = phoneRef.current.value
        const password =passwordRef.current.value
        const passwordVerify = passwordVerifyRef.current.value

        if(!verifyInput(email,phone,password,passwordVerify)){
            const userData = {
                "id":userDetails.id,
                "email": email,
                "phone":phone,

            }
            if (password.length > 0) {
                userData.password = password;
            }
            try{

                const response = await fetch("http://localhost:8080/updateUser",{
                    method : "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body : JSON.stringify( userData)
                })

                if(response.status===200){
                   const connectedUser = JSON.parse(localStorage.getItem("connectedUser"))
                   connectedUser.email =email
                   connectedUser.phone = phone
                   localStorage.setItem("connectedUser",JSON.stringify(connectedUser))
                   setUserDetails(connectedUser)
                   setMessage("Vos informations ont été correctement mises à jour.")
                }
                else{
                    console.log(response.message)
                }




            }catch(error){
                console.log(error)
            }
        }


    }


    useEffect(()=>{
        getConnectedUser()
    },[])

    return (
        <div className="profilContainer">
           <h3 className="profilMessageForm " >  {message.length>0 ? message :''}</h3>   
           {displayErrors()} 
            <h2>Vos informations:</h2>
            <form onSubmit={handleSubmitUpdate} >
                <div className="profilFirstName">
                    <label >Prenom</label>
                    <input type="text" name="prenom" className="readOnly" defaultValue={userDetails.firstName } readOnly/>
                </div>

                <div className="profilLastName">
                    <label >Nom</label>
                    <input type="text" name="nom" className="readOnly" defaultValue={userDetails.lastName } readOnly />
                </div>

                <div className="profilEmail">
                    <label >Email</label>
                    <input type="email" name="email"   defaultValue={userDetails.email }  ref={emailRef}/>
                </div>

                <div className="profilPhone">
                    <label >Telephone</label>
                    <input type="text" name="telephone"  defaultValue={userDetails.phone }  ref={phoneRef}/>
                </div>

                <div className="profilRole">
                    <label >Role</label>
                    <input type="text" name="role" className="readOnly"  defaultValue={userDetails.role } readOnly/>
                </div>

                <div className="profilPassword">
                    <label >Mot de passe</label>
                    <input type="password" name="password"   ref={passwordRef}/>
                </div>
                <div className="profilPasswordVerify">
                    <label >Confirmer votre mot de passe</label>
                    <input type="password" name="passwordVerify"  ref={passwordVerifyRef} />
                </div>


                <button type="submit">Mise a jour</button>


            </form>

        </div>
    )
}