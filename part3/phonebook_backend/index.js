require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Entry = require('./models/entry')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())


//Middleware Morgan
morgan.token('postBody', function (req, res)
{
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postBody'))

//Requests
app.get('/api/persons', (request, response) => {
  Entry.find({}).then(entries => {
    response.json(entries)
  })
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
    Entry.findById(request.params.id).then(entry => {
      response.json(entry)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  //Checks for missing name or number or uniqueness of name
  if(!body.name) {
    return response.status(400).json({
      error: 'name is missing'
    })
  }else if(!body.number) {
    return response.status(400).json({
      error: 'number is missing'
    })
  }
  //else if(persons.filter(p => p.name === body.name).length > 0) {
  //   console.log(persons.filter(p => p.name === body.name))
  //   return response.status(400).json({
  //     error: 'name must be unique'
  //   })
  // }

  const entry = new Entry({
    name: body.name,
    number: body.number,
    date: new Date()
  })

  entry.save().then(savedEntry => {
    response.json(savedEntry)
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})