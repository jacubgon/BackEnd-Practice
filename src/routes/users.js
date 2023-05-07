const { Router } = require('express')

const bcrypt = require('bcrypt')
const User = require('../models/user')

const router = Router()

// Todos los usuarios
router.get('/', async (req, res) => {
  const allUsers = await User.find().exec()
  res.send(allUsers)
})

//Obtener un usuario por Id
router.get('/:id', async (req, res) => {
  const userId = req.params.id; //Obtener el parámetro de id de la URL
  const getUser = await User.findById(userId).exec(); //Buscar usuario por su id

  res.json(getUser);
});

//Registrar un nuevo usuario
router.post('/signup', async (req, res) => {
  const { password: passwordPlainText, ...rest } = req.body

  const salt = await bcrypt.genSalt(10)
  const password = await bcrypt.hash(passwordPlainText, salt)

  const newUser = await User.create({ password, ...rest })

  const token = newUser.generateJWT()

  res.setHeader('x-auth-token', token).json(newUser)
})


// Iniciar sesión (NO ME FUNCIONA)
router.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    // Buscar al usuario en la base de datos
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' })
    }

    // Generar un token de autenticación
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)

    // Enviar el token en la respuesta
    res.status(200).json({ token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error en el servidor' })
  }
})

//Iniciar sesion
router.post('/signin', async (req, res) => {
  const { password: passwordPlainText, username } = req.body
console.log('estoy iniciando sesion');
  const user = await User.findOne({ username })

  const isUser = await bcrypt.compare(passwordPlainText, user.password)

  const token = user.generateJWT()
  console.log(isUser)

  res.setHeader('x-auth-token', token).send('Success')
})



module.exports = router
