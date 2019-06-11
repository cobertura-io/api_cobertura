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

  get_all_broker (callback) {
    db.query(`
      SELECT user.pk_user, user.avatar, user.name, user.surname, user.phone, user.email, state.name as state, broker.creci FROM user
        JOIN broker ON broker.fk_user = user.pk_user
        JOIN state ON state.pk_state = broker.region`, callback)
  },

  get_broker (url, callback) {
    db.query(`
      SELECT user.pk_user, user.avatar, user.url_profile, user.name, user.surname, user.phone, user.email, state.name as state, broker.creci FROM user
        JOIN broker ON broker.fk_user = user.pk_user
        JOIN state ON state.pk_state = broker.region
        WHERE url_profile = '${url}'`, callback)
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