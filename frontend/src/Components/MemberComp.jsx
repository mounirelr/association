
export default function MemberComp({member,deleteMember ,blockMember,upgradeMember}){


    
    
      
    

    return <tr>
        <td>{member.id}</td>
        <td>{member.firstName} {member.lastName}</td>
        <td>{member.email}</td>
        <td>{member.phone}</td>
        <td>{member.role}</td>
        <td >{member.status}</td>
        <td>
            <button data-id={member.id} onClick={blockMember}>{member.status==="Active" ?"Bloquer" :"Debloquer"}</button>
            <button  data-id={member.id} onClick={upgradeMember}>{member.role==="Moderateur" ? "Memebre" :"Moderateur"}</button>
            <button data-id={member.id} onClick={deleteMember}>Supprimer</button>
        </td>
    </tr>
}