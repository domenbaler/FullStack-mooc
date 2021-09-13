import React from 'react'
import Person from './Person'

const Persons = ({persons,filter}) =>{
    if(filter===''){
        return (
        persons.map(person => <Person key={person.id} person={person}/> )
        )
    }

    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    return(
        filteredPersons.map(person => <Person key={person.id} person={person}/>)
    )
}
  
export default Persons