import React from 'react'

import CountryDetails from './CountryDetails'
import Country from './Country'

const Countries = ({countries, filter, handleClick,weather, setWeather}) => {
    const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
    if(filteredCountries.length === 1){
      return(
        <CountryDetails country={filteredCountries[0]} weather={weather} setWeather={setWeather}/>
      )
    }
    if(filteredCountries.length <= 10){
      return(
        filteredCountries.map(country => <Country country={country} key={country.name} handleClick={handleClick}/>)
      )
    }
    return(
     <p>Too many matches, specify another filter</p>
    )
}

export default Countries