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

    const count = Entry.countDocuments((error, count) => {
      response.send(`
        <div>Phonebook has info for ${count} people</div>
        <div>${date}</div>
        `
      )
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Entry.findById(request.params.id)
      .then(entry => {
        if(entry)  {
          response.json(entry)
        }else {
          response.status(404).end()
        }
      })
      .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  console.log('inside server')
    Entry.findByIdAndRemove(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
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

  const entry = new Entry({
    name: body.name,
    number: body.number,
    date: new Date()
  })

  entry.save().then(savedEntry => {
    response.json(savedEntry)
  })
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const entry = {
    number: body.number,
    name: body.name,
  }

  Entry.findByIdAndUpdate(request.params.id, entry, { new: true })
    .then(updatedEntry => {
      response.json(updatedEntry)
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if(error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})