
import MemberComp from "../../Components/MemberComp"
import { useOutletContext } from "react-router-dom";
import "../../Styles/memberTable.css"
import { useEffect, useState } from "react";


export default function  Members(){
    
    const { inputSearch } = useOutletContext();
   
    const [ membersList, setMembersList] = useState([]);
    


    const fetchMembers =  async()=>{
        await fetch("http://localhost:8080/users")
        .then(response=>response.json())
        .then(response=>setMembersList(response))
    }


    const displayMembers = ()=>{

        const memberToDisplay = membersList.filter(member=>{
            return member.firstName.toLowerCase().includes(inputSearch.toLowerCase()) || member.lastName.toLowerCase().includes(inputSearch.toLowerCase())
        })

        return memberToDisplay.map((member,key)=>{
            return <MemberComp member={member} key={key} deleteMember={deleteMember} blockMember={blockMember} />
        })
    }

    const deleteMember = async (e)=>{
        const idMember = parseInt(e.currentTarget.dataset.id);
        try{

          const response = await  fetch(`http://localhost:8080/user/${idMember}`,{
            method:"DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
           
          });

          if(response.status===200){
            

                const newMemberList = membersList.filter(e=>e.id !== idMember )
                setMembersList(newMemberList)
            }
            else if(response.status===404){
                console.log("Member Not Found Not Found");
            }
            else{
                console.log("failed to delete Member");
            }
        }catch(error){
            console.log(error);
        }
    }
          
        

       const blockMember = async (e)=>{
        const idMember = e.currentTarget.dataset.id
        try{
            const response = await fetch(`http://localhost:8080/user/${idMember}`,{
                method:"PATCH",
               
            });
            if(response.status===200){
                fetchMembers()
            }
            else if(response.status===404){
                console.log("Member Not Found Not Found");
            }
            else{
                console.log("failed to delete Member");
            }
        }catch(error){
            console.log(error);
        }
         }



         useEffect(()=>{
            fetchMembers()
         },[])


    return <>
    {console.log(membersList)}
    <table >
    <thead >

            <tr >
                <th>Id</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
         {displayMembers()}
        </tbody>
    </table>
    </>





}