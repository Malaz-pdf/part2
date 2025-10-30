import { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchedName, setSearchedName] = useState('')

  const namesToShow = 
  searchedName === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(searchedName.toLowerCase()))

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

    const nameRepeated = persons.some(person => person.name === newName)
    const numberRepeated = persons.some(person => person.number === newNumber)

    if (nameRepeated){
    alert(`${newName} is already added to phonebook`)
    return
   } 
   else if (numberRepeated){
    alert(`${newNumber} is already used`)
    return
   }
   else{

    setPersons(persons.concat(personObj))
    setNewName("")
    setNewNumber("")

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
  

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchedName = {searchedName} handelNameSearch={handelNameSearch} />

      <h3>Add a new</h3>

      <PersonForm  addPerson={addPerson} newName={newName} handelNameChange={handelNameChange} newNumber={newNumber} handelNumberChange={handelNumberChange}/>

      <h2>Numbers</h2>

      <Persons namesToShow={namesToShow}/>
      
    </div>
  )
}

export default App