import { useRef } from "react"



export default function SearchBar({filterSearch}){

const inputSearchValue = useRef()
    const handleSubmit = (e)=>{
       e.preventDefault()
      const  inputSearch =inputSearchValue.current.value
      
       filterSearch(inputSearch)
    }

    return <div className="headerSearch">
                
    <form action="" onSubmit={handleSubmit}>
        <input type="text" name="search" id="search" placeholder="Chercher"  ref={inputSearchValue}/>
        <input type="submit" value="Chercher" id="btnSearch" />
    </form>
</div>
}