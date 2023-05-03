import mongoose from 'mongoose'

const clienteSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    email: String,
    telefono: String,
    edad: Number,
    sexo: String
})

const Cliente = mongoose.model('Cliente', clienteSchema)

export default Cliente
