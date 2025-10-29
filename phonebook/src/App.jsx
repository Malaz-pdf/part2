import { useState } from 'react'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) =>{
    event.preventDefault()
    const nameObj ={
      name : newName
    }
    setPersons(persons.concat(nameObj))
    setNewName("")
  }
  const handelNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit ={addName}>
        <div>
          name: <input value ={newName} 

          onChange={handelNameChange}
           />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person,index) => (
          <Persons key={index} person={person} />
        ))}
      </ul>
      
    </div>
  )
}

export default App