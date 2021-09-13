const Note = require('../models/Note');
const notesRouter = require('express').Router();

notesRouter.post('/', async (request, response) => {
  const { body } = request;
  const { content, important } = body;

  const note = new Note({
    content,
    important
  })

  const savedNote = await note.save();
  response.json(savedNote)

})

module.exports = notesRouter;
