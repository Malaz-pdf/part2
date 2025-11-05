import { useState,useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchedName, setSearchedName] = useState('')

  const namesToShow = 
  searchedName === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(searchedName.toLowerCase()))

  useEffect(() => {
  personService
              .get()
              .then(initialPerson => {setPersons(initialPerson)})
}, [])

  const addPerson = (event) =>{
    event.preventDefault()
    const personObj ={
      name : newName,
      number : newNumber
    }

    const validNumber = /^[0-9+()\-\s]*$/.test(newNumber)
    if(!validNumber){
      alert(`${newNumber} is not valid`)
      return
    }

    if (newName.trim() === '' || newNumber.trim() === '') {
      alert('Please fill in both fields')
      return
    }

    const personRepeated = persons.find(person => person.name === newName)
    const numberRepeated = persons.some(person => person.number === newNumber) 

    if (personRepeated){
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
    const changedNumber = { ...personRepeated, number: newNumber }

    personService
      .update(personRepeated.id, changedNumber)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id === personRepeated.id ? returnedPerson : person))
        setNewName('')
        setNewNumber('')
      })

      .catch(error => {  
        alert(`the person '${personRepeated.name}' was already deleted from server`)
        setPersons(persons.filter(p => p.id !== personRepeated.id))
      })

  } else {
    alert(`${newName} is already added to phonebook`)
  }
  
  return
      } 
   else if (numberRepeated){
    alert(`${newNumber} is already used`)
    return
   }
   else{

    personService
                .create(personObj)
                .then(returnedPerson => {setPersons(persons.concat(returnedPerson))
                setNewName("")
                setNewNumber("")})
  }
}
  const handelNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)

  }
  const handelNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)

  }
  const handelNameSearch = (event) => {

    console.log(event.target.value)
    setSearchedName(event.target.value)

  }
  const removePerson = id => {
    const updatedPersons = persons.filter( person => person.id !== id )

    personService
                .remove(id)
                .then(returnedPerson =>{
                setPersons(updatedPersons)
                })
                .catch(error => {
                 alert(
                `the Person '${person.name}' was already deleted from server`
                )
                setPersons(persons.filter(person => person.id !== id))
                })
  }

  

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchedName = {searchedName} handelNameSearch={handelNameSearch} />

      <h3>Add a new</h3>

      <PersonForm  addPerson={addPerson} newName={newName} handelNameChange={handelNameChange} newNumber={newNumber} handelNumberChange={handelNumberChange}/>

      <h2>Numbers</h2>

      <Persons namesToShow={namesToShow} removePerson={removePerson}/>
      
    </div>
  )
}

export default App