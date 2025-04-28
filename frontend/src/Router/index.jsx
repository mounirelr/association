import { createBrowserRouter } from "react-router-dom";
import Layout from "./Pages/Layout";
import Post from "./Pages/Post";
import HomePage from "./Pages/HomePage";
import  NotFound from "./Pages/NotFound"
import Evenement from "./Pages/Evenement";
import  Members from "./Pages/Members";



export const router = createBrowserRouter([
     {
        path:'/',
        element : <HomePage />  
},

{
    path:'/login',
    element : <HomePage />  
},

{
    path:'/registre',
    element : <HomePage />  
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
            element : <Members />
        },

        {
            path: '/*',
            element : <NotFound />
        },
    ]
}


])

export default router