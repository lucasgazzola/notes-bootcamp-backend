module.exports = (error, req, res, next) => {
  if (error.name === 'CastError') {
    res.status(400).send("<h1>El ID es erroneo</h1>").end()
  }
  res.status(500).end()
}