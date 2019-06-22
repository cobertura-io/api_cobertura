const jwt = require('jsonwebtoken')
const authConfig = require('./../../config/auth')
const userDAO = require('./../../models/userDAO')

module.exports = {
  async authenticate (req, res) {
    const { email, password } = req.body
    
    if(email === undefined || email.length === 0)
      return res.status(200).json({ message: 'Favor, inserir email' })

    if(password === undefined || password.length === 0)
      return res.status(200).json({ message: 'Favor, inserir senha' })

    await userDAO.authenticate({ email, password }, (err, user) => {
      if(err)
        return res.status(400).json({ message: 'Ops! não foi possível realizar a requisição' })

      if(user[0] === undefined)
        return res.status(200).json({ message: 'As credenciais estão inválidas' })

      const token = jwt.sign({ id: user[0].pk_user }, authConfig.secret, {
        expiresIn: 86400
      })
      
      return res.status(200).json({ user: user[0], token })
    })
  },

  async create (req, res) {
    const { name, surname, email, password } = req.body

    if(name === undefined || name.length === 0)
      return res.status(403).json({ error: true, message: 'Favor, inserir nome' })

    if(surname === undefined || surname.length === 0)
      return res.status(403).json({ error: true, message: 'Favor, inserir sobrenome' })
    
    if(email === undefined || email.length === 0)
      return res.status(403).json({ error: true, message: 'Favor, inserir email' })
    
    if(password === undefined || password.length === 0)
      return res.status(403).json({ error: true, message: 'Favor, inserir senha' })

    await userDAO.create({ name, surname, email, password }, (err, result) => {
      if(err)
        return res.status(400).json({ error: true, message: 'Ops! não foi possível cadastrar usuário' })
        
      return res.status(200).json({ error: false, data: result.insertId })
    })
  },

  async delete (req, res) {
    const id = req.params.id
    await userDAO.delete(id, (err, result) => {
      if(err)
        return res.status(400).json({ error: true, message: `Ops! não foi possível deletar o usuário ${id}` })
    
      return res.status(200).json({ error: false, message: 'Usuário foi excluído com sucesso' })
    })
  },

  async get (req, res) {
    const id = req.params.id
    await userDAO.get_by_id(id, (err, result) => {
      if(err || result.length === 0)
        return res.status(400).json({ error: true, message: `Ops! não foi possível pegar o usuário ${id}` })
        
      return res.status(200).json({ error: false, data: result[0] })
    })
  },

  async get_all (req, res) {
    await userDAO.get_all((err, result) => {
      if(err || result.length === 0)
        return res.status(400).json({ error: true, message: 'Ops! não foi possível pegar todos usuários' })
        
      return res.status(200).json({ error: false, data: result })
    })
  },

  async get_broker_all (req, res) {
    await userDAO.get_all_broker((err, result) => {
      if(err || result.length === 0)
        return res.status(400).json({ error: true, message: 'Ops! não foi possível pegar todos corretores' })
        
      return res.status(200).json({ error: false, data: result })
    })
  },

  async get_broker (req, res) {
    const url = req.params.url
    await userDAO.get_broker(url, (err, result) => {
      if(err || result.length === 0)
        return res.status(400).json({ error: true, message: 'Ops! não foi possível pegar o corretor' })
        
      return res.status(200).json({ error: false, data: result })
    })
  }
}