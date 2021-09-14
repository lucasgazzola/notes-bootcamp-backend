const Note = require('../models/Note');
const User = require('../models/User');
const notesRouter = require('express').Router();
const userExtractor = require('../middlewares/userExtractor');

notesRouter.get('/', (req, res) => {
  // GET página principal
  res.send('<h1>Hello World this is a DataBase test. Have fun!</h1>').end()
})

notesRouter.get('/api/notes/', async (req, res) => {
  // GET de todas las notas
  const notes = await Note.find({}).populate('user', {
    username: 1,
    name: 1
  })
  res.json(notes).end()
})

notesRouter.get('/api/notes/:id', (req, res, next) => {
  // GET de la nota con ese ID
  const { id } = req.params;

  Note.findById(id)
    .then(note => {
      if (note) {
        return res.json(note).end()
      } else {
        return res.status(404).json({ error: 'The note does not exist' }).end()
      }
    })
    .catch(e => {
      next(e)
    })
})

notesRouter.post('/api/notes/', userExtractor, async (req, res, next) => {
  // POST de notas 
  const {
    content,
    important = false,
  } = req.body;

  const { userId } = req;

  const user = await User.findById(userId);
  if (!content) {
    return res.status(400).json({
      error: 'Note content is missing'
    }).end()
  }
  const newNote = new Note({
    content,
    important,
    date: new Date(),
    user: user._id
  })

  try {
    const savedNote = await newNote.save();
    user.notes = [...user.notes, savedNote._id];
    await user.save();
    res.json(savedNote);
  } catch (err) {
    next(err)
  }
})

notesRouter.put('/api/notes/:id', userExtractor, (req, res, next) => {
  // PUT (actualización) de notas con cierto ID
  const { id } = req.params;
  const { content, important = false } = req.body;

  const newNoteInfo = {
    content,
    important
  }

  Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
    .then(result => res.json(result).end())
    .catch(err => next(err))
})

notesRouter.delete('/api/notes/:id', userExtractor, (req, res, next) => {
  // DELETE de notas con cierto ID
  const { id } = req.params
  Note.findByIdAndDelete(id)
    .then(() => res.send(204).end())
    .catch(err => next(err));
})

module.exports = notesRouter;
