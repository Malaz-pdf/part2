import { useState,useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'
import Confirmation from './components/Confirmation'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchedName, setSearchedName] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [succesMessage, setSuccesMessage] = useState(null)

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
      setErrorMessage(
          `${newNumber} is not valid. please use a real number`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      return
    }

    if (newName.trim() === '' || newNumber.trim() === '') {
      setErrorMessage(
          'Please fill in both fields'
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
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
        setSuccesMessage(
          'Nummber change has been successful'
        )
        setTimeout(() => {
          setSuccesMessage(null)
        }, 5000)
        
      })
      

      .catch(error => { 
        setErrorMessage(
          `the person '${personRepeated.name}' was already deleted from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons(persons.filter(p => p.id !== personRepeated.id))
      })

  } else {
    setErrorMessage(
          `${newName} is already added to phonebook`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
  }
  
  return
      } 
   else if (numberRepeated){
    setErrorMessage(
          `${newNumber} is already used`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    return
   }
   else{

    personService
                .create(personObj)
                .then(returnedPerson => {setPersons(persons.concat(returnedPerson))
                setNewName("")
                setNewNumber("")
                setSuccesMessage(
               `added ${newName}`)
                setTimeout(() => {
                setSuccesMessage(null)
                 }, 5000)
                
                 })
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
    const person = persons.find(p => p.id === id)
    const updatedPersons = persons.filter( person => person.id !== id )

    personService
                .remove(id)
                .then(returnedPerson =>{
                setPersons(updatedPersons)
                setSuccesMessage(
               `Deletion of ${person.name} was successful`)
                setTimeout(() => {
                setSuccesMessage(null)
                 }, 5000)
                })
                .catch(error => {
                setErrorMessage(
                `Information of '${person.name}' has already been deleted from server`)
                setTimeout(() => {
                setErrorMessage(null)
                 }, 5000)
                
                setPersons(persons.filter(person => person.id !== id))
                })
  }

  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage}/>
      <Confirmation message={succesMessage}/>

      <Filter searchedName = {searchedName} handelNameSearch={handelNameSearch} />

      <h3>Add a new</h3>

      <PersonForm  addPerson={addPerson} newName={newName} handelNameChange={handelNameChange} newNumber={newNumber} handelNumberChange={handelNumberChange}/>

      <h2>Numbers</h2>

      <Persons namesToShow={namesToShow} removePerson={removePerson}/>
      
    </div>
  )
}

export default App