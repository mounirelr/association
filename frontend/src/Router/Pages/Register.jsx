import { useRef, useState } from "react"
import "../../Styles/register.css"

import {Link,useNavigate} from "react-router-dom"

export default function Register(){

    const firstNameInput = useRef()
    const lastNameInput = useRef()
    const phoneInput = useRef()
    const emailInput = useRef()
    const passwordInput = useRef()
    const passwordVerifiyInput = useRef()
    const [errors , setErrors] =useState([])
    const navigate = useNavigate();
   


    const handeSubmitRegister = async  (e)=>{
        e.preventDefault()
       const  firstName = firstNameInput.current.value
       const lastName = lastNameInput.current.value
       const phone = phoneInput.current.value
       const email = emailInput.current.value
       const password = passwordInput.current.value
       const passwordVerify = passwordVerifiyInput.current.value
       if(!verifyInput(firstName,lastName,phone,email,password,passwordVerify)){
        console.log("no error")
       }
       const userData ={
        "firstName" :firstName,
        "lastName" :lastName,
        "phone" :phone,
        "email" :email,
        "password" :password
       }

       try{
        const response = await fetch('http://localhost:8080/user',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify( userData)

        })
        if(response.status===200){
            navigate("/members")
        }
        else{
            console.log(response.message)
        }
       }catch(error){
        console.log(error)
       }

    }

    const verifyInput = (firstName, lastName, phone, email, password, passwordVerify) => {
        const newErrors = [];
      
        
        if (!firstName.trim()) {
          newErrors.push({ "message": "First Name is required" });
          
        }
      
        
        if (!lastName.trim()) {
          newErrors.push({ "message": "Last Name is required" });
          
        }
      
       
        const phoneRegex = /^0\d{9}$/;
        if (!phone.trim()) {
          newErrors.push({ "message": "Phone is required" });
        } else if (!phoneRegex.test(phone)) {
          newErrors.push({ "message": "Phone is invalid" });
        }
      
       
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
          newErrors.push({ "message": "Email is required" });
        } else if (!emailRegex.test(email)) {
          newErrors.push({ "message": "Email is invalid" });
        }
      
        
        if (!password) {
          newErrors.push({ "message": "Password is required" });
        } else if (password.length < 8) {
          newErrors.push({ "message": "Password must be at least 8 characters long" });
        }
      
       
        if (password !== passwordVerify) {
          newErrors.push({ "message": "Password confirmation does not match" });
        }
      
        
        setErrors(newErrors);
        if(newErrors.length>0)
            return true
        else return false
      
        
      };
      const displayErrors = ()=>{
   return   errors.map((error,key)=>{
           return  <span key={key}>-{error.message}</span>
        })
      }
      
    

  return   <div className="containerBase">
  <div className="register-container">
    <div className="register-card">
      <h2>Create Account</h2>
      <div className="error-message">
        {displayErrors()}
        </div>
      <form>
        <div className="form-row">
          <input type="text" placeholder="First Name" required ref={firstNameInput} />
          <input type="text" placeholder="Last Name" required ref={lastNameInput} />
        </div>

        <div className="form-row">
          <input type="tel" placeholder="Phone" required ref={phoneInput} />
          <input type="email" placeholder="Email" required ref={emailInput} />
        </div>

        <div className="form-row">
          <input type="password" placeholder="Password" required ref={passwordInput} />
          <input type="password" placeholder="Confirm Password" required  ref={passwordVerifiyInput}/>
        </div>

        <button onClick={handeSubmitRegister} type="submit">Register</button>
      </form>

      <p className="login-link">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  </div>
</div>


}