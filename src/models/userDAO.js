const db = require('./../config/db')()

module.exports = {
  create (data, callback) {
    db.query(`INSERT INTO user(name, surname, email, password) 
      VALUES ('${data.name}', '${data.surname}', '${data.email}', '${data.password}')`, callback)
  }, 

  authenticate (data, callback) {
    db.query(`
      SELECT pk_user, name, surname FROM user 
        WHERE email = '${data.email}' AND password = '${data.password}'`, callback)
  },

  get_all (callback) {
    db.query(`
      SELECT pk_user, name, surname FROM user`, callback)
  },
  
  get_by_id (id, callback) {
    db.query(`
      SELECT pk_user, name, surname FROM user
        WHERE pk_user = ${id}`, callback)
  },

  delete (id, callback) {
    db.query(`DELETE FROM user WHERE pk_user = ${id}`, callback)
  }
}

/*
async getUsers (id, callback) {
    db.query(`SELECT v_search.*, realty.fk_user 'broker_id', user.name, user.surname FROM cobertura.v_search join realty on realty.pk_realty = v_search.pk_realty join broker on broker.fk_user = realty.fk_user join user on user.pk_user = broker.fk_user where realty.fk_user = ${id}`, callback)
  },
*/