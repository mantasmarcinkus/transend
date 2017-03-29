const api = require('./src/modules/google_authorization');
const service = require('./src/modules');
const google = require('googleapis');
const EventLogger = require('node-windows').EventLogger;

const log = new EventLogger('transend');

function work(auth) {
  const drive = google.drive('v3');
  setInterval(() => {
    try {
      service.notifyAboutLinks(drive, auth);
    } catch (e) {
      log.error(e);
    }
  }, 10000);
}

try {
  api.init(work);
} catch (e) {
  log.error(e);
}
