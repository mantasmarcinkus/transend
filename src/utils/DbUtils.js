const config = require('config');

const DB_NAME = config.get('dbConfig.name');

module.exports = function getDatabaseFile(res) {
  return new Promise((resolve, reject) => {
    const db = res.files.find(file => file.name === DB_NAME);
    if (db) {
      resolve(db);
    } else {
      console.log('DB file does not exist!');
    }
  });
};
