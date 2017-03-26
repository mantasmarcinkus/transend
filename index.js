const api = require('./src/modules/google_authorization');
const service = require('./src/modules');

function work(auth) {
  service.notifyAboutLinks(auth);
  //service.addConfig(auth);
  //service.deleteAllAppFiles(auth);
  // api.addFolder(auth);
  // setInterval(function () {
  //   api.listAppFiles(auth);
  // }, 5000);
}

try {
  console.log('Starting');
  api.init(work);
  console.log('Logged in');
} catch (e) {
  console.log(e);
}
