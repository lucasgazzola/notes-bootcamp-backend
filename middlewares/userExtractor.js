const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

module.exports = (req, res, next) => {
  const authorization = req.get('authorization')
  let token = null
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  const decodedToken = jwt.verify(token, SECRET)

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'Missing or invalid token' })
  }

  const { id: userId } = decodedToken
  req.userId = userId
  next()
}
