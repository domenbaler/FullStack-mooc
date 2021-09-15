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
  const [message, setMessage ] = useState(null)
  
  const handleNameChange = (event) => {setNewName(event.target.value)}
  const handleNumberChange = (event) => {setNewNumber(event.target.value)}
  const handleFilterChange = (event) => {setNewFilter(event.target.value)}

  useEffect( () => {
    personService
      .getAll()
      .then(returnedPersons => setPersons(returnedPersons))
  },[])
 
  const Notification = ({message}) => {
    if(message === null){
      return null
    }

    let notificationStyle = {
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }

    const firstChar = message.charAt(0)
    if(firstChar === 'A' || firstChar === 'U'){
      notificationStyle.color = 'green'
    }else{
      notificationStyle.color = 'red'
    }

    return (
      <div style={notificationStyle}>
        {message}
      </div>
    )

  }

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
          setMessage(`Updated ${newName}`)
          setTimeout( () => {setMessage(null)},5000)
          setNewName('')
          setNewNumber('')
        }).catch( error => {
          setMessage(`Information of ${newName} has already been removed from server`)
          setTimeout( () => {setMessage(null)},5000)
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
          setMessage(`Added ${newPerson.name}`)
          setTimeout( () => {setMessage(null)},5000)
          setNewName('')
          setNewNumber('')          
        })
    }
  }

  const deletePerson = (id) => {
    if (window.confirm(`Delete ${persons.find(person => person.id === id).name}`)){
      personService.remove(id)
      setPersons(persons.filter(person => person.id !== id))
      setMessage(`Removed ${id}`)
      setTimeout( () => {setMessage(null)},5000)
    }
   
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <br/>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
      
    </div>
  )
}

export default App;