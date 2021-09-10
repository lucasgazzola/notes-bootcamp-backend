const { app } = require('../index');
const supertest = require('supertest');
const api = supertest(app);

const initialNotes = [
  {
    content: 'Hello',
    important: true,
    date: new Date()
  },
  {
    content: 'Hello again',
    important: false,
    date: new Date()
  }
]

const getAllContentsFromNotes = async () => {
  const response = await api.get('/api/notes');
  return {
    contents: response.body.map(note => note.content),
    response
  }
}

module.exports = { initialNotes, api, getAllContentsFromNotes }