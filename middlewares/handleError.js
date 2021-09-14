const ERRORS_HANDLER = {
  CastError: res => res.json({ error: 'Id used is malformed' }).status(400).end(),
  ValidationError: (res, { message }) => res.json({ error: message }).status(400).end(),
  JsonWebTokenError: res => res.json({ error: 'Missing or invalid token' }).status(401).end(),
  defaultError: res => res.status(500).end()
}

module.exports = (error, req, res, next) => {
  console.error(error.message)
  const handler = ERRORS_HANDLER[error.name] || ERRORS_HANDLER.defaultError;
  handler(res, error)
}