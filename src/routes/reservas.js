const { Router } = require('express')
const isAuth = require('../middlewares/isAuth')
const isAdmin = require('../middlewares/isAdmin')
const Reserva = require('../models/reserva')
const User = require('../models/user')

const router = Router()

router.get('/', async (req, res) => {
    const allReservas = await Reserva.find().exec()
    res.send(allReservas)
})

router.post('/', async (req, res) => {
    const reservaDetails = req.body
    const newReserva = await Reserva.create( reservaDetails)
    res.json(newReserva)
})

module.exports = router