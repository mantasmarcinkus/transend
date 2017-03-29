const api = require('./src/modules/google_authorization');
const service = require('./src/modules');
const google = require('googleapis');


function work(auth) {
  const drive = google.drive('v3');
  service.deleteAllAppFiles(drive, auth);
  service.addConfig(drive, auth);
}

try {
  console.log('Starting reset');
  api.init(work);
  console.log('Done');
} catch (e) {
  console.log(e);
}
