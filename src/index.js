const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(require('./routes'));

app.listen(8085, () => 
  console.log('Servidor iniciado com sucesso na porta 8085')
)