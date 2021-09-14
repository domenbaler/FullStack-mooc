import React from 'react'

const Weather = ({country,weather}) => {
    return(
        <div>
        <h2>Weather in {country.capital}</h2>
        <p>{weather.weather[0].description}</p>
        <p>Temperature:  {weather.main.temp} Celsius</p>
        <p>Wind speed: {weather.wind.speed} m/s</p>
        <p>Wind direction: {weather.wind.deg} °</p>
        </div>
    )
}

export default Weather