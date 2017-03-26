const google = require('googleapis');

/**
 * List applicationFiles
 * @param {*} auth
 */
module.exports = function listAppFiles(auth) {
  const service = google.drive('v3');
  service.files.list({
    auth,
    spaces: 'appDataFolder',
    fields: 'nextPageToken, files(id, name)',
    pageSize: 100,
  }, (err, res) => {
    if (err) {
      // Handle error
      console.log(err);
    } else {
      res.files.forEach((file) => {
        console.log('Found file: ', file.name, file.id);
      });
    }
  });
};
