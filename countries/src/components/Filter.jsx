const Filter = ({searchedCountry,handelCountrySearche }) => {
  return (
    <div>
      find countries
       <input 
        value={searchedCountry} 
        onChange={handelCountrySearche} 
      />
    </div>
  )
}

export default Filter
