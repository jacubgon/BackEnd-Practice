import mongoose from 'mongoose'

const reservaSchema = new mongoose.Schema({
    nombre: String,
    tipo_cocina: String,
    direccion: String,
    capacidad: Number,
})

const Reserva = mongoose.model('Reserva', reservaSchema)

export default Reserva