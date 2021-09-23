const mongoose = require('mongoose')
const { initialUsers, api, getAllContentsFromUsers } = require('./helpers')
const User = require('../models/User')
const { server } = require('../index')

beforeEach(async () => {
  await User.deleteMany({})

  for (const user of initialUsers) {
    const userObject = new User(user)
    await userObject.save()
  }
})

test('add new users', async () => {
  const newUser = {
    username: 'Lucas017',
    name: 'Lucas',
    password: 'contraseña'
  }
  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const { usernames } = await getAllContentsFromUsers()
  expect(usernames).toContain(newUser.username)
})

afterAll(() => {
  server.close()
  mongoose.connection.close()
})
