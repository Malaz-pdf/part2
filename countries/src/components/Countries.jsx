
import CountryInfo from "./CountryInfo"

const Countries = ({ countries,onSelection }) => {
    if (countries.length > 10) {
    return <p>too many matches, specify another filter</p>
  }

  if (countries.length === 1) {
    return <CountryInfo country={countries[0]} />
  }

    return (
        <ul>
        {countries.map((country) => (
        <li key={country.cca3}>{country.name.common} <button onClick={() => onSelection(country.name.common)}>show</button></li>
        ))}
        </ul>
    )
}
export default Countries
