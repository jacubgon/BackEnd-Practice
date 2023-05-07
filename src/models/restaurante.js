const mongoose = require('mongoose')


const restauranteSchema = new mongoose.Schema({
  nombre: String,
  tipo_cocina: String,
  direccion: String,
  capacidad: Number,
  clientes_interesados: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cliente'
    }]
})

const Restaurante = mongoose.model('Restaurante', restauranteSchema)

module.exports = Restaurante
