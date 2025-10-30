
const Filter = ({searchedName,handelNameSearch }) => {
  return (
    <div>
      filter shown with 
       <input 
        value={searchedName} 
        onChange={handelNameSearch} 
      />
    </div>
  )
}

export default Filter
