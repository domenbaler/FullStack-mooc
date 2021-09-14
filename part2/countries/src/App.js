import React, {useState, useEffect} from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import Countries from './components/Countries'


const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setNewFilter] = useState('')
  const [weather, setWeather] = useState({
    coord: {
    lon: -0.1257,
    lat: 51.5085
    },
    weather: [
    {
    id: 801,
    main: "Clouds",
    description: "few clouds",
    icon: "02d"
    }
    ],
    base: "stations",
    main: {
    temp: 18.73,
    feels_like: 19.11,
    temp_min: 17.29,
    temp_max: 20.61,
    pressure: 1011,
    humidity: 94
    },
    visibility: 5000,
    wind: {
    speed: 2.06,
    deg: 220
    },
    clouds: {
    all: 20
    },
    dt: 1631633935,
    sys: {
    type: 2,
    id: 2019646,
    country: "GB",
    sunrise: 1631597640,
    sunset: 1631643501
    },
    timezone: 3600,
    id: 2643743,
    name: "London",
    cod: 200
    })
  
  const handleFilterChange = (event) => {setNewFilter(event.target.value)}
  const handleClick = (name) => {setNewFilter(name)}

  useEffect( () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  },[])
 
  return (
    <div>
      <h1>Countries</h1>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <Countries countries={countries} filter={filter} handleClick={handleClick} weather={weather} setWeather={setWeather}/>
    </div>
  )
}

export default App;