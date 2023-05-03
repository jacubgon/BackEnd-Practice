import { Router } from 'express'


const router = Router()

// GET /api/test
router.get('/clientes', (req, res) => {
  try {
    
    res.send('soy el cliente')
  } catch (err) {
    console.log(err)
    res.status(500).send('pronto volvemos')}
  })

export default router  


// import { Router } from 'express';

// const router = Router();

// router.get('/', (req, res) => {
//   res.send('¡Hola, mundo!');
// });

// router.get('/usuarios', (req, res) => {
//   res.send('Listado de usuarios');
// });

// export default router;
