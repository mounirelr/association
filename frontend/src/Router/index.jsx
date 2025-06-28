import { createBrowserRouter } from "react-router-dom";
import Layout from "./Pages/Layout";
import Post from "./Pages/Post";
import HomePage from "./Pages/HomePage";
import  NotFound from "./Pages/NotFound"
import Evenement from "./Pages/Evenement";
import  Members from "./Pages/Members";
import Register from "./Pages/Register";
import Disscution from "./Pages/Disscution";
import Login from "./Pages/Login";
import Profil from "./Pages/Profil";
import PrivateRoute from "../PrivateRoute";
import AdminRoute from "./AdminRoute";
import Apercu from "./Pages/Apercu";




export const router = createBrowserRouter(
    [
    
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
    element: <PrivateRoute>
         < Layout/>
         </PrivateRoute> ,
    children: [
        {
            path: '/post',
            element : <Post />
        },
        {
            path: '/Apercu',
            element : <PrivateRoute>
            <AdminRoute>
            <Apercu />
             </AdminRoute>
       </PrivateRoute> 
        },

        {
            path: '/evenement',
            element :  <PrivateRoute> 
                <Evenement />
                </PrivateRoute> 
        },

        {
            path: '/members',
            
            element : <PrivateRoute>
                 <AdminRoute>
                  <Members />
                  </AdminRoute>
            </PrivateRoute> 
        },

        { path: '/discussion',
            element : <PrivateRoute>
                  <Disscution />
            </PrivateRoute> 
        },



       { path: '/profil',
        element : <PrivateRoute>
              <Profil />
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