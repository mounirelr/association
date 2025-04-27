
    import { useNavigate } from "react-router-dom";


    export default function Login(){

        const navigate = useNavigate();
        const handleLogin = (e)=>{
            e.preventDefault()

            navigate('/app');

        }


        return <form action="">

            <label >Email</label>
            <input type="text" name="" id="" />
            <label >Password</label>
            <input type="text" name="" id="" />
            <input onClick={handleLogin} type="submit" value="login" />
        </form>
    }