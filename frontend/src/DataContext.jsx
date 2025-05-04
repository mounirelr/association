import { createContext, useContext, useState } from "react";


const DataContext = createContext();

export const useData = ()=>useContext(DataContext);

export const DataProvider = ({children})=>{
    const [userLogin,setUserLogin] = useState(null)

    const loginUser = (userData)=>{
        setUserLogin(useData)

    }


   

    

    return <DataContext.Provider value={[userLogin,setUserLogin,loginUser]}>
        {children}
    </DataContext.Provider>
}