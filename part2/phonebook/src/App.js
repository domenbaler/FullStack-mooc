import React, {useState, useEffect} from 'react'
import personService from './services/persons'

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
    personService
      .getAll()
      .then(returnedPersons => setPersons(returnedPersons))
  },[])
 

  const addPerson = (event) => {
    if (persons.some(person => person.name===newName)){
      if(window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)){
        event.preventDefault()
        const personObject = {
          name: newName,
          number: newNumber,
          id: newName
        }

        personService
        .update(newName, personObject)
        .then(oldPerson => {
          setPersons(persons.map(person =>  person.id !== newName ? person : oldPerson))
          setNewName('')
          setNewNumber('')
        })

      }
    }else{
      event.preventDefault()
      const personObject = {
        name: newName,
        number: newNumber,
        id: newName
      }
      
      personService
        .create(personObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = (id) => {
    if (window.confirm(`Delete ${persons.find(person => person.id === id).name}`)){
      personService.remove(id)
      setPersons(persons.filter(person => person.id !== id))
    }
   
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <br/>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
      
    </div>
  )
}

export default App;