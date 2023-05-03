import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'

import Cliente from './models/cliente.js'
import Restaurante from './models/restaurante.js'
import Cupon from './models/cupon.js'
import Reserva from './models/reserva.js'

mongoose.connect('mongodb://localhost:27017/restaurantes')

const port = process.env.PORT || 3001

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

import clientes from './routes/clientes.js'
// import restaurantes from './routes/restaurantes.js'
// import cupones from './routes/cupones.js'
// import reservas from './routes/reservas.js'

app.use('/clientes', clientes)
// app.use('/api/restaurantes', restaurantes)
// app.use('/api/cupones',cupones)
// app.use('/api/reservas',reservas)

app.get('/ping', async (req, res) => {
    try {
      
      res.json({ pong: true })
    } catch (err) {
      console.log(err)
      res.status(500).send('pronto volvemos')
    }
  })
  
  app.listen(port, () => console.log('Servidor andando http://localhost:' + port))