const db = require('../config/db');

exports.getAllModules = callback => {
  db.query('SELECT * FROM Module', callback);
};

exports.getModuleById = (id, callback) => {
  db.query('SELECT * FROM Module WHERE Module_Id = ?', [id], callback);
};

exports.createModule = (module, callback) => {
  db.query('INSERT INTO Module SET ?', module, callback);
};

exports.updateModule = (id, module, callback) => {
  db.query('UPDATE Module SET ? WHERE Module_Id = ?', [module, id], callback);
};

exports.deleteModule = (id, callback) => {
  db.query('DELETE FROM Module WHERE Module_Id = ?', [id], callback);
};
