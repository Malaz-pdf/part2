const PersonForm = ({addPerson, newName, handelNameChange, newNumber, handelNumberChange}) => {
return(
      <form onSubmit ={addPerson}>
        <div>
          name: <input value ={newName} 

          onChange={handelNameChange}
           />
        </div>
        <div>
          number: <input value ={newNumber} 

          onChange={handelNumberChange} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form> 
    )
}
export default PersonForm