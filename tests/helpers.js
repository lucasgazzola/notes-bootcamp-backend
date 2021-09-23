const { app } = require('../index')
const supertest = require('supertest')
const api = supertest(app)

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

const initialUsers = [
  {
    username: 'tuvi',
    name: 'Tu vieja',
    password: 'tuviejaaaaa'
  },
  {
    username: 'lucas017',
    name: 'Lucas',
    password: '393939'
  }
]

const getAllContentsFromNotes = async () => {
  const response = await api.get('/api/notes')
  return {
    contents: response.body.map(note => note.content),
    response
  }
}

const getAllContentsFromUsers = async () => {
  const response = await api.get('/api/users')
  return {
    usernames: response.body.map(user => user.username),
    response
  }
}

module.exports = { initialNotes, initialUsers, api, getAllContentsFromNotes, getAllContentsFromUsers }
