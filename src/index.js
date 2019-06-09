const express = require('express')

const app = express()

app.use(express.json())
app.use(require('./routes'));

app.listen(8085, () => 
  console.log('Servidor iniciado com sucesso na porta 8085')
)