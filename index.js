require('dotenv').config();
require('./mongo');
const express = require('express');
const logger = require('./loggerMiddleware');
const cors = require('cors');
const notFound = require('./middlewares/notFound');
const handleError = require('./middlewares/handleError');
const usersRouter = require('./controllers/users');
const notesRouter = require('./controllers/notes');
const loginRouter = require('./controllers/login');

const app = express();
app.use(express.json());
app.use(logger);
app.use(cors());
app.use('/', loginRouter);
app.use('/', notesRouter);
app.use('/', usersRouter);
app.use(notFound);
app.use(handleError);

const PORT = process.env.PORT;
const server = app.listen(PORT, () => { console.log(`Se ha realizado con éxito en el puerto ${PORT}`) });

module.exports = { app, server };