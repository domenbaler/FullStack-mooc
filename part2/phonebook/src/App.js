import React, {useState, useEffect} from 'react'
import axios from 'axios'

import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  
  const handleNameChange = (event) => {setNewName(event.target.value)}
  const handleNumberChange = (event) => {setNewNumber(event.target.value)}
  const handleFilterChange = (event) => {setNewFilter(event.target.value)}

  useEffect( () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  },[])
 

  const addPerson = (event) => {
    if (persons.some(person => person.name===newName)){
      window.alert(`${newName} is already added to phonebook`)
    }else{
      event.preventDefault()
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length+1
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <br/>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter}/>
      
    </div>
  )
}

export default App;