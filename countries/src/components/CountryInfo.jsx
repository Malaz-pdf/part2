const CountryInfo = ({ country }) => {

    const languages = country.languages ? Object.values(country.languages) : []

    return (
        <div className="country-info">
            <h1>{country.name.common}</h1>
            <p>Capital {country.capital[0]}</p>
            <p>Area {country.area} km²</p>
            <p>population {country.population.toLocaleString()}</p>
            <h2>Languages</h2>
            <ul>
            {languages.map((lang) => (
            <li key={lang}>{lang}</li>
             ))}
            </ul>
            <img
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`}
            width="300"
            />

        </div>
    )

}
export default  CountryInfo