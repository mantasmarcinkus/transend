const google = require('googleapis');
const config = require('config');

const DB_NAME = config.get('dbConfig.name');
const INITIAL_DATA = '{ "id": 1, "links": [ {"value": "http://google.com"} ] }';

module.exports = function addConfig(auth) {
  const drive = google.drive('v3');
  const fileMetadata = {
    name: DB_NAME,
    parents: ['appDataFolder'],
  };
  const media = {
    mimeType: 'application/json',
    body: INITIAL_DATA,
  };
  drive.files.create({
    resource: fileMetadata,
    auth,
    media,
    fields: 'id',
  }, (err, file) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Folder Id: ', file.id);
    }
  });
};
