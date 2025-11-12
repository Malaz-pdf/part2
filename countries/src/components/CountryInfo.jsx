import { useState, useEffect } from "react"
import weatherService from '/Users/malaznatouf/Desktop/Fullstack sub/part2/countries/src/services/weather.js'

const CountryInfo = ({ country }) => {

    const languages = country.languages ? Object.values(country.languages) : []

    const [weather, setWeather] = useState(null)

    const capital = country.capital[0]

    useEffect(() => {
        if (!capital) return

        weatherService 
                        .getWeather(capital)
                        .then(initialWeather =>{setWeather(initialWeather)})
                        .catch((error) => {
                        console.error("Error fetching weather:", error);
                        setWeather(null);
                         })
    },[capital])

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
            <h2>Weather in {country.capital[0]}</h2>
            {weather && (
            <div>
            <p>Temperature: {weather.main.temp} Celsius</p>
            <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
            alt={weather.weather[0].description} 
            />
             <p>Wind: {weather.wind.speed} m/s</p>
            </div>
            )}
            </div>
    )

}
export default  CountryInfo