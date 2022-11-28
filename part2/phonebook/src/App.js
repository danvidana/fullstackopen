import { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = ({ person, deletePerson }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={deletePerson}>delete</button>
    </div>
  )
}

const Filter = ({ searchTerm, handler }) => {
  return (
    <div>
      filter shown with <input value={searchTerm} onChange={handler} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ personsToShow, deletePerson }) => {
  return (
    <div>
      {personsToShow.map(person =>
        <Person
          key={person.name}
          person={person}
          deletePerson={() => deletePerson(person.id)}
        />
      )}
    </div>
  )
}

const Notification = ({ message, messageType }) => {
  if (message === null) {
    return null
  }

  if (messageType === 'success') {
    return (
      <div className='success'>
        {message}
      </div>
    )
  }else {
    return (
      <div className='error'>
        {message}
      </div>
    )
  }
  
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtering, setFiltering] = useState(false)
  const [newSearch, setNewSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.find(p => p.name === newName)) {
      const person = persons.find(p => p.name === newName)
      if (window.confirm(`${person.name} is already added to phonebook, replace the old number with the new one?`)) {
        const changedPerson = { ...person, number: newNumber }

        personService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setMessage(`${returnedPerson.name} phone number was changed`)
            setMessageType('success')
            setTimeout(() => {
              setMessage(null)
              setMessageType(null)
            }, 5000)
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
          })
          .catch(error => {
            console.log(error)
            setMessage(error.response.data.error)
            setMessageType('error')
            setTimeout(() => {
              setMessage(null)
              setMessageType(null)
            }, 5000)
            //setPersons(persons.filter(p => p.id !== changedPerson.id))
          })
      }
    }else {
      const newPerson = {
        name: newName,
        number: newNumber
      }

      personService
        .create(newPerson)
        .then(returnedPerson => {
          setMessage(`${returnedPerson.name} phone number was added`)
          setMessageType('success')
          setTimeout(() => {
            setMessage(null)
            setMessageType(null)
          }, 5000)
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setMessage(error.response.data.error)
          setMessageType('error')
          setTimeout(() => {
            setMessage(null)
            setMessageType(null)
          }, 5000)
        }) 
    }
  }

  const deletePerson = id => {
    console.log(id)
    if (window.confirm(`Delete ${persons.find(p => p.id === id).name} ?`)) {
      personService
        .deletePerson(id)
        .then(returnedPerson => {
          setMessage(`${returnedPerson.name} was deleted from server`)
          setMessageType('success')
          setTimeout(() => {
            setMessage(null)
            setMessageType(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          console.log(error)
          alert(`the person with id: ${id} does not exist on the server`)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    if(event.target.value === '') {
      setFiltering(false)
    }else {
      setFiltering(true)
    }

    setNewSearch(event.target.value)
  }

  const personsToShow = filtering
    ? persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={message}
        messageType={messageType} />
      <Filter
        searchTerm={newSearch}
        handler={handleSearchChange} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons
        personsToShow={personsToShow}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App