const bcrypt = require('bcrypt');
const User = require('../models/User');
const usersRouter = require('express').Router();

usersRouter.post('/', async (request, response) => {
  const { body } = request;
  const { username, name, password } = body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new User({
    username,
    name,
    passwordHash
  })
  try {
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (err) {
    response.status(500).json(err._message);
  }

})

module.exports = usersRouter;
