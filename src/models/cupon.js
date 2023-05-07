const mongoose = require('mongoose')

const cuponSchema = new mongoose.Schema({
  descripcion: String,
  restaurante: String,
  disponible: Boolean, 
})

const Cupon = mongoose.model('Cupon', cuponSchema)

module.exports = Cupon