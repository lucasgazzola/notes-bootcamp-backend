const ERRORS_HANDLER = {
  CastError: res => res.status(400).json({ error: 'Id used is malformed' }).end(),
  ValidationError: (res, { message }) => res.status(400).json({ error: message }).end(),
  JsonWebTokenError: res => res.status(401).json({ error: 'Missing or invalid token' }).end(),
  defaultError: res => res.status(500).end()
}

module.exports = (error, req, res, next) => {
  const handler = ERRORS_HANDLER[error.name] || ERRORS_HANDLER.defaultError
  handler(res, error)
}
