const mongoose = require('mongoose')

const { MONGODB_URI, MONGODB_URI_TEST, NODE_ENV } = process.env

const connectionString = NODE_ENV === 'test'
  ? MONGODB_URI_TEST
  : MONGODB_URI

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Database is connected')
}).catch(e => {
  console.error('Connection error ', e)
})
