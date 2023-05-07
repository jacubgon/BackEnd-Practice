const { Router } = require('express')
const Cupon = require('../models/cupon')
const User = require('../models/user.js')

const isAuth = require('../middlewares/isAuth')

const router = Router()

//Obtener todos los cupones
router.get('/', async (req, res) => {
  const allCupones = await Cupon.find({}).exec()
  res.json(allCupones)
})

//Crear un nuevo cupon
router.post('/', async (req, res) => {
  const cuponDetails = req.body
  const newCupon = await Cupon.create(cuponDetails)
  res.json(newCupon)
})

//Obtener un cupon por ID
router.get('/:id', async (req, res) => {
  const cuponId = req.params.id
  const cupon = await Cupon.findById(cuponId).exec()

  res.json(cupon)
})


// Actualizar un cupón por ID y agregar su referencia a los usuarios correspondientes
router.put('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const updatedCupon = await Cupon.findByIdAndUpdate(id, req.body, {
      new: true,
    })

    const usersWithCupon = await User.find({ cuponesUser: id })
 
    console.log(usersWithCupon);

    for (const user of usersWithCupon) {
      user.cuponesUser.push(updatedCupon._id)
      await user.save()
    }
    console.log('esta entrando ');
    res.json(updatedCupon)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ message: 'Ha ocurrido un error al actualizar el cupón.' })
  }
})

router.put('/add-coupon/:userId', async (req, res) => {
  const { userId } = req.params;
  const { cuponId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'El usuario no existe.' });
    }

    user.cuponesUser.push(cuponId);

    await user.save();

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al agregar el cupón.' });
  }
});

router.delete('/:id', async (req, res) => {
  const cuponId = req.params.id

  const deletedCupon = await Cupon.findByIdAndDelete(cuponId)

  res.json(deletedCupon)
})

module.exports = router
