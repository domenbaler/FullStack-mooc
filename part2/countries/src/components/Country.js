import React from 'react'

const Country = ({country, handleClick}) => {
    return (
      <p>
        {country.name} <button onClick={() => handleClick(country.name)}> show </button>
      </p>
    )
}

export default Country
