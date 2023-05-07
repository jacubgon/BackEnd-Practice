const { Router } = require('express')
const isAuth = require('../middlewares/isAuth')
const isAdmin = require('../middlewares/isAdmin')
const Restaurante = require('../models/restaurante')
const User = require('../models/user')

const router = Router()

//Obtener todos los restaurantes
router.get('/', async (req, res) => {
  const restaurantes = await Restaurante.find().exec()
  res.json(restaurantes)
})

// Crear un nuevo restaurante(Funciona hardcodeando los valores, pero no recoge bien el body)
router.post('/', async (req, res) => {
  const restaurantDetails = req.body
  const newRestaurant = await Restaurante.create({ restaurantDetails })
  res.json(newRestaurant)
})
// Eliminar un restaurante (FUNCIONA)
router.delete('/:id', async (req, res) => {
  const id = req.params.id
  try {
    const restauranteEliminado = await Restaurante.findByIdAndDelete(id)
    if (!restauranteEliminado) {
      return res.status(404).json({ error: 'Restaurante no encontrado' })
    }
    res.json({ mensaje: `Restaurante ${id} eliminado` })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al eliminar el restaurante' })
  }
})


module.exports = router
