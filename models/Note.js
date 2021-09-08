const { Schema, model } = require('mongoose')

const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean
})

const Note = model('Note', noteSchema)

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id,
      delete returnedObject._id,
      delete returnedObject.__v
  }
})

module.exports = Note

// Note.find({})
//   .then(res => {
//     console.log(res);
//     mongoose.connection.close()
//   })

// const newNote = ({ content, important }) => {
//   return new Note({
//     content,
//     date: new Date(),
//     important
//   })
// }

// const note = [];

// note[0] = newNote({ content: 'Mongo la tiene gigante', important: true })
// note[1] = newNote({ content: 'This is a test', important: false })
// note[2] = newNote({ content: 'Another test', important: false })
// note[3] = newNote({ content: 'This is a database', important: true })
// note[4] = newNote({ content: 'Hello World!', important: true })

// note.forEach(item => {
//   item.save()
//     .then(res => {
//       console.log('Agregado correctamente ', res)
//     })
//     .catch(err => {
//       console.error('Error ', err)
//     })
// }
// )
