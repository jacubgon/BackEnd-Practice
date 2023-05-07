const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  const token_jwt = req.headers['x-auth-token']
  if (!token_jwt) return res.status(401).send('No hay token de acceso')

  try {
    const decoded = jwt.verify(token_jwt, process.env['jwt_privateKey'])
    req.user = decoded

    next()
  } catch (err) {
    res.status(401).send('Token invalido')
  }
}
