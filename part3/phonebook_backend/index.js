const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

morgan.token('postBody', function (req, res)
{
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postBody'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const date = new Date()
    response.send(`
        <div>Phonebook has info for ${persons.length} people</div>
        <div>${date}</div>
        `
    )
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)

    if (person) {
        response.json(person)
    }else {
        response.status(404).json({
            error: '404 content missing'
        })
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)

    response.status(204).end()
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(p => p.id))
    : 0
    return maxId + 1
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if(!body.name) {
    return response.status(400).json({
      error: 'name is missing'
    })
  }else if(!body.number) {
    return response.status(400).json({
      error: 'number is missing'
    })
  }else if(persons.filter(p => p.name === body.name).length > 0) {
    console.log(persons.filter(p => p.name === body.name))
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    date: new Date(),
    id: generateId(),
  }

  persons = persons.concat(person)
  response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})