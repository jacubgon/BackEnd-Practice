import mongoose from 'mongoose'

const cuponSchema = new mongoose.Schema({
    descripcion: String,
    restaurante: String,
    disponible: Boolean, 
})

const Cupon = mongoose.model('Cupon', cuponSchema)

export default Cupon