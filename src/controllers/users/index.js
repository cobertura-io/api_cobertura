const userDAO = require('./../../models/userDAO')

module.exports = {
  async authenticate (req, res) {
    const { email, password } = req.body
    
    if(email === undefined || email.length === 0)
      return res.status(403).json({ error: true, message: 'Favor, inserir email' })

    if(password === undefined || password.length === 0)
      return res.status(403).json({error: true, message: 'Favor, inserir senha' })

    await userDAO.authenticate({ email, password }, (err, result) => {
      if(err)
        return res.status(400).json({ error: true, message: 'As credenciais estão inválidas' })
      
      return res.status(200).json({ error: false, data: result[0] })
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
      if(err)
        return res.status(400).json({ error: true, message: `Ops! não foi possível pegar o usuário ${id}` })
        
      return res.status(200).json({ error: false, data: result[0] })
    })
  },

  async get_all (req, res) {
    await userDAO.get_all((err, result) => {
      if(err)
        return res.status(400).json({ error: true, message: 'Ops! não foi possível pegar todos usuários' })
        
      return res.status(200).json({ error: false, data: result })
    })
  },
}