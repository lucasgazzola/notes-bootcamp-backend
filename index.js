require('dotenv').config();
require('./mongo');
const express = require('express');
const logger = require('./loggerMiddleware');
const cors = require('cors');
const Note = require('./models/Note');
const notFound = require('./middlewares/notFound');
const handleError = require('./middlewares/handleError');

const app = express();
app.use(express.json());
app.use(logger);
app.use(cors());

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/json' })
//   response.end(JSON.stringify(notes))
// })
app.get('/', (req, res) => {
  res.send('<h1>Hello World this is a DataBase test. Have fun!</h1>')
})

app.get('/api/notes/:id', (req, res, next) => {
  const { id } = req.params;

  Note.findById(id)
    .then(note => {
      if (note) {
        res.json(note)
      } else {
        res.status(404).end()
      }
    })
    .catch(e => {
      next(e)
    })

  // res.json(notes)
})

app.get('/api/notes/', (req, res) => {
  Note.find({}).then(notes => res.json(notes))
})

app.post('/api/notes/', (req, res) => {
  const note = req.body

  if (!note || !note.content) {
    return res.status(400).json({
      error: 'Note content is missing'
    })
  }
  const newNote = new Note({
    content: note.content,
    important: note.important || false,
    date: new Date()
  })

  newNote.save().then(note => res.status(201).json(note))
})

app.put('/api/notes/:id', (req, res, next) => {
  const { id } = req.params;
  const note = req.body;

  const newNoteInfo = {
    content: note.content,
    important: note.important
  }

  Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
    .then(result => res.json(result))
    .catch(err => next(err))
})

app.delete('/api/notes/:id', (req, res, next) => {
  const { id } = req.params
  Note.findByIdAndDelete(id)
    .then(() => res.send(204).end())
    .catch(err => next(err));
})

app.use(notFound)
app.use(handleError)

const PORT = process.env.PORT;
app.listen(PORT, () => { console.log(`Se ha realizado con éxito en el puerto ${PORT}`) })