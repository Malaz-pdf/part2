import { useState,useEffect } from 'react'
import countriesService from './services/countries'
import Countries from './components/Countries'
import Filter from './components/Filter'

function App() {
  const [countries, setCountries] = useState([])
  const [searchedCountry, setSearchedCountry] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    countriesService
                    .getAll()
                    .then(initialCountry => {setCountries(initialCountry)})
  },[])

  const countryToShow = 
  searchedCountry === '' ? countries : countries.filter(country => country.name.common.toLowerCase().includes(searchedCountry.toLowerCase()))
  
  const handelCountrySearche = (event) => {

    setSearchedCountry(event.target.value)
    setSelectedCountry(null)
  }
  const handelCountryShow = (name) =>{
    const country = countries.find(c => c.name.common.toLowerCase() === name.toLowerCase())
    setSelectedCountry(country)
  } 

  return (
    <div>
      <Filter searchedCountry = {searchedCountry} handelCountrySearche={handelCountrySearche} />

      {selectedCountry ? (
        <Countries countries={[selectedCountry]} onSelection={handelCountryShow} />
      ) : (
        <Countries countries={countryToShow} onSelection={handelCountryShow} />
      )}
    </div>
  )
}

export default App
