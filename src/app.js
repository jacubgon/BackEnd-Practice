const express = require('express')
require('dotenv').config()

const app = express()

require('./startup/bd')()
require('./startup/routes')(app)

const port = process.env.PORT || 5000

app.listen(port, () => console.log('server on http://localhost:' + port))
