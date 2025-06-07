import "../../Styles/disscution.css";
import CreateDisscutionCard from '../../Components/CreateDisscutionCard';
import DissuctionCard from '../../Components/DisscutionCard';
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";








export default function Disscution() {
    const [disscutions ,setDisscutionList] = useState([])
    const { inputSearch } = useOutletContext();


const getDisscution = async () => {
    const response = await fetch("http://localhost:8080/disscutions");
    const data = await response.json();
    console.log(data)
    setDisscutionList(data);
  }

  const displayDisscution = ()=>{
    const disscutionToDisplay = disscutions.filter((diss)=>{
        return  diss.title.toLowerCase().includes(inputSearch.toLowerCase())
    })
    return  disscutionToDisplay.map((diss,key)=>{
      return   <DissuctionCard diss={diss} key={key} />
    })
  }


  useEffect(()=>{
    getDisscution()
  },[])
 
  

 

 
  
  return (
    <div className="disscussion-container">
    
      <CreateDisscutionCard />

     
      {displayDisscution()}
    </div>
  );
}