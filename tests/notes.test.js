const mongoose = require('mongoose')
const Note = require('../models/Note')
const { initialNotes, api, getAllContentsFromNotes } = require('./helpers')
const { server } = require('../index')

beforeEach(async () => {
  await Note.deleteMany({})

  for (const note of initialNotes) {
    const noteObject = new Note(note)
    await noteObject.save()
  }
})

test('notes are returnet as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two notes', async () => {
  const { response } = await getAllContentsFromNotes()
  expect(response.body).toHaveLength(2)
})

test('add new notes', async () => {
  const newNote = {
    content: 'This is a test',
    important: false
  }
  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const { contents, response } = await getAllContentsFromNotes()
  expect(contents).toContain(newNote.content)
  expect(response.body).toHaveLength(initialNotes.length + 1)
})

afterAll(() => {
  server.close()
  mongoose.connection.close()
})
