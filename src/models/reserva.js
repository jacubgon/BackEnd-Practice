const mongoose = require('mongoose')


const reservaSchema = new mongoose.Schema({
  nombre: String,
  tipo_cocina: String,
  direccion: String,
  capacidad: Number,
  clientes_interesados: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cliente'
    }]
})

const Reserva = mongoose.model('Reserva', reservaSchema)

module.exports = Reserva
