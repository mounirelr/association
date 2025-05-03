import { createContext, useContext, useEffect, useState } from "react";


const DataContext = createContext();

export const useData = ()=>useContext(DataContext);

export const DataProvider = ({children})=>{
    const [usersList,setUserList] = useState([])


    const getUsers =  ()=>{
         
    }

    useEffect(()=>{
        getUsers()
    },[])

    return <DataContext.Provider value={[usersList,setUserList,getUsers]}>
        {children}
    </DataContext.Provider>
}