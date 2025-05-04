import { createBrowserRouter } from "react-router-dom";
import Layout from "./Pages/Layout";
import Post from "./Pages/Post";
import HomePage from "./Pages/HomePage";
import  NotFound from "./Pages/NotFound"
import Evenement from "./Pages/Evenement";
import  Members from "./Pages/Members";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import PrivateRoute from "../PrivateRoute";



export const router = createBrowserRouter([
     {
        path:'/',
        element : <HomePage />  
},

{
    path:'/login',
    element : <Login />  
},

{
    path:'/register',
    element : <Register />  
},


{
    element:< Layout/>,
    children: [
        {
            path: '/post',
            element : <Post />
        },

        {
            path: '/evenement',
            element : <Evenement />
        },

        {
            path: '/members',
            element : <PrivateRoute>
                  <Members />
            </PrivateRoute> 
        },

        {
            path: '/*',
            element : <NotFound />
        },
    ]
}


])

export default router