
    import { useNavigate, Link } from "react-router-dom";
    import "../../Styles/login.css"
import { useRef , useState} from "react";



    export default function Login(){

        
    
    const navigate = useNavigate()
    const emailInput = useRef()
    const passwordInput = useRef()
    const [errors,setErrors] =useState()
        
    const handleSubmitLogin = async  (e)=>{
        e.preventDefault()
        const email = emailInput.current.value
        const password = passwordInput.current.value
        const userDetails = {"email" :email , "password" :password}

        try{
            const response =  await fetch("http://localhost:8080/login",{
                method:"POST",
                headers :{
                    "Content-Type" :"application/json"
                },
                body : JSON.stringify(userDetails)
            });
                if(response.status===200){
                    
                    const data = await  response.json()
                console.log(data.userDetails)
                localStorage.setItem("connectedUser",JSON.stringify(data.userDetails))
                    navigate("/post")
                }
            else if(response.status===401) {
              const data =  await response.json()
                console.log(data.message)
               setErrors(data.message)
            }
        }catch(error){
            console.log(error)
        }

    }

        return <div className="loginBase">
        <div className="login-container">
          <div className="login-card">
            <h2>Login</h2>
            <div className="login-error-message">
             {errors && errors}
            </div>
            <form>
              <div className="login-form-row">
                <input type="email"  placeholder="Email" required ref={emailInput}/>
              </div>
      
              <div className="login-form-row">
                <input type="password" placeholder="Mot de passe" required  ref={passwordInput}/>
              </div>
      
              <button onClick={handleSubmitLogin}  type="submit">Login</button>
            </form>
      
            <p className="register-link">
            Vous n'avez pas de compte ? <Link to="/register">Inscrivez-vous ici</Link>
            </p>
          </div>
        </div>
      </div>
      
    }