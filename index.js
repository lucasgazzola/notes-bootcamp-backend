require('dotenv').config();
require('./mongo');
const express = require('express');
const logger = require('./loggerMiddleware');
const cors = require('cors');
const Note = require('./models/Note');
const User = require('./models/User')
const notFound = require('./middlewares/notFound');
const handleError = require('./middlewares/handleError');
const usersRouter = require('./controllers/users');
const notesRouter = require('./controllers/notes')

const app = express();
app.use(express.json());
app.use(logger);
app.use(cors());

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/json' })
//   response.end(JSON.stringify(notes))
// })
app.get('/', (req, res) => {
  res.send('<h1>Hello World this is a DataBase test. Have fun!</h1>').end()
})

app.get('/api/notes/:id', (req, res, next) => {
  const { id } = req.params;

  Note.findById(id)
    .then(note => {
      if (note) {
        res.json(note).end()
      } else {
        res.status(404).send("<h1>La nota no existe</h1>").end()
      }
    })
    .catch(e => {
      next(e)
    })

  // res.json(notes)
})

app.get('/api/notes/', async (req, res) => {
  const notes = await Note.find({})
  res.json(notes).end()
})

app.get('/api/users/', async (req, res) => {
  const users = await User.find({})
  res.json(users).end()
})

app.post('/api/notes/', (req, res) => {
  const note = req.body

  if (!note || !note.content) {
    return res.status(400).json({
      error: 'Note content is missing'
    }).end()
  }
  const newNote = new Note({
    content: note.content,
    important: note.important || false,
    date: new Date()
  })
  newNote.save().then(note => res.status(201).json(note).end())
})

app.put('/api/notes/:id', (req, res, next) => {
  const { id } = req.params;
  const note = req.body;

  const newNoteInfo = {
    content: note.content,
    important: note.important
  }

  Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
    .then(result => res.json(result).end())
    .catch(err => next(err))
})

app.delete('/api/notes/:id', (req, res, next) => {
  const { id } = req.params
  Note.findByIdAndDelete(id)
    .then(() => res.send(204).end())
    .catch(err => next(err));
})

app.use('/api/notes', notesRouter);

app.use('/api/users', usersRouter);

app.use(notFound)
app.use(handleError)

const PORT = process.env.PORT;
const server = app.listen(PORT, () => { console.log(`Se ha realizado con éxito en el puerto ${PORT}`) });

module.exports = { app, server };