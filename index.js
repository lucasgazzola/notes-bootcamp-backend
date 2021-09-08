require('dotenv').config();
require('./mongo');
const express = require('express');
const logger = require('./loggerMiddleware');
const cors = require('cors');
const Note = require('./models/Note');

const app = express();
app.use(express.json());
app.use(logger);
app.use(cors());

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/json' })
//   response.end(JSON.stringify(notes))
// })
app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

app.get('/api/notes/:id', (req, res) => {
  const { id } = req.params
  const note = notes.find(note => note.id === Number(id))
  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
  // res.json(notes)
})

app.get('/api/notes/', (req, res) => {
  Note.find({}).then(notes => {
    res.json(notes)
  })
})

app.post('/api/notes/', (req, res) => {
  const note = req.body

  if (!note || !note.content) {
    return res.status(400).json({
      error: 'note.content is missing'
    })
  }
  const ids = notes.map(note => note.id)

  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  }

  notes = [...notes, newNote]
  res.status(201).json(newNote)
})

app.delete('/api/notes/:id', function (req, res) {
  const { id } = req.params
  notes = notes.filter(note => note.id !== Number(id))
  res.status(204).end()
})

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' })
})

const PORT = process.env.PORT;
app.listen(PORT, () => { console.log(`Se ha realizado con éxito en el puerto ${PORT}`) })
