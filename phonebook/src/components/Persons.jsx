const Persons = ({namesToShow}) => {

return (
  <ul>
        {namesToShow.map((person) => (
          <li key={person.id} >
            {person.name} {person.number} </li>
        ))}
      </ul>
  
)

}

export default Persons