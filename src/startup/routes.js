const { json } = require('express')
const morgan = require('morgan')
const cors = require('cors')

const cupones = require('../routes/cupones')
const restaurantes = require('../routes/restaurantes')
const users = require('../routes/users')
const reservas = require('../routes/reservas')

module.exports = function (app) {
  app.use(cors())
  app.use(json())
  app.use(morgan('dev'))

  app.use('/api/cupones', cupones)
  app.use('/api/restaurantes', restaurantes)
  app.use('/api/reservas', reservas)
  app.use('/users', users)

  // health check endpoint
  app.get('/ping', async (req, res) => {
    res.status(500).send('pronto volvemos')
  })
}
