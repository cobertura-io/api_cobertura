var sql = require('mysql');

var connection = function() {
  return sql.createConnection({
    host: 'mysql669.umbler.com',
    port: '41890',
    user: 'devops_cobertura',
    password: 'r00T7790',
    database: 'cobertura'
  });
};

module.exports = function() {
  return connection();
};