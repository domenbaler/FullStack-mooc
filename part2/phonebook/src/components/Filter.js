import React from 'react'

const Filter = ({filter,handleFilterChange}) => {
  return(
    <div>
      search names <input value={filter} onChange={handleFilterChange}/>
    </div>
  )
}

export default Filter