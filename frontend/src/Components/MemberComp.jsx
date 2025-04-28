
export default function MemberComp({member,deleteMember ,blockMember}){

    

    return <tr>
        <td>{member.id}</td>
        <td>{member.firstName} {member.lastName}</td>
        <td>{member.email}</td>
        <td>0679126533</td>
        <td>{member.role}</td>
        <td >{member.status}</td>
        <td>
            <button data-id={member.id} onClick={blockMember}>{member.status==="Active" ?"Bloquer" :"Debloquer"}</button>
            <button data-id={member.id}>Editer</button>
            <button data-id={member.id} onClick={deleteMember}>Supprimer</button>
        </td>
    </tr>
}