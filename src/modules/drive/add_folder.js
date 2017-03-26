const google = require('googleapis');

/**
 * Real folder!
 * @param {*} auth
 */
module.exports = function addFolder(auth) {
  const drive = google.drive('v3');
  const fileMetadata = {
    name: 'appDataFolder',
    mimeType: 'application/vnd.google-apps.folder',
  };
  drive.files.create({
    auth,
    resource: fileMetadata,
    fields: 'id',
  }, (err, file) => {
    if (err) {
      // Handle error
      console.log(err);
    } else {
      console.log('Folder Id: ', file.id);
    }
  });
};
