const USER = 'lucasjg017'
const PASSWORD = '39423428lg'
const DBNAME = 'firstDB'
const mongoose = require('mongoose')
const connectionString = `mongodb+srv://${USER}:${PASSWORD}@firstdb.nsk8l.mongodb.net/${DBNAME}?retryWrites=true&w=majority`

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Database is connected')
  })
  .catch(e => {
    console.error('Connection error ', e)
  })
