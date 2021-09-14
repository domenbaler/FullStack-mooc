import React, {useEffect} from 'react'
import axios from 'axios'

import Weather from './Weather'

const CountryDetails = ({country,weather ,setWeather}) => {
    useEffect( () => {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
        .then(response => {
          setWeather(response.data)
        })
    },[setWeather,country.capital])

    return(
      <div>
        <h1>{country.name}</h1>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
        <h3>languages</h3>
        <ul>
          {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img src={country.flag} alt="flag" width="30%" height="30%"/>
        <Weather country={country} weather={weather}/>
      </div>
    )
  }


export default CountryDetails