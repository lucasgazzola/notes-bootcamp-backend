const mongoose = require('mongoose');
const connectionString = process.env.MONGODB_URI;

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
