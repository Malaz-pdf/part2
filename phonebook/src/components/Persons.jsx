const Persons = ({namesToShow, removePerson}) => {

return (
  <ul>
        {namesToShow.map((person) => (
          <li key={person.id} >
            {person.name} {person.number} 
            <button onClick={() =>{
              if(window.confirm(`Delete ${person.name}?`)){
                removePerson(person.id)
              }
            }}>  delete  </button>
            </li>
        ))}
      </ul>
  
)

}

export default Persons