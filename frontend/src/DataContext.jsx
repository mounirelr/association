import { createContext, useContext, useEffect, useState } from "react";


const DataContext = createContext();

export const useData = ()=>useContext(DataContext);

export const DataProvider = ({children})=>{
    const [usersList,setUserList] = useState([])


    const getUsers =  async()=>{
         await fetch("http://localhost:8080/users")
        .then(response=>response.json())
        .then(response=>setUserList(response))
    }

    useEffect(()=>{
        getUsers()
    },[])

    return <DataContext.Provider value={[usersList,setUserList,getUsers]}>
        {children}
    </DataContext.Provider>
}