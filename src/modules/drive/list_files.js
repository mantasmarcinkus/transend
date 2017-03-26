const google = require('googleapis');

/**
 * Lists the names and IDs of up to 10 files.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
module.exports = function listFiles(auth) {
  const service = google.drive('v3');
  service.files.list({
    auth,
    pageSize: 10,
    fields: 'nextPageToken, files(id, name)',
  }, (err, response) => {
    if (err) {
      console.log(`The API returned an error: ${err}`);
      return;
    }
    const files = response.files;
    if (files.length === 0) {
      console.log('No files found.');
    } else {
      console.log('Files:');
      for (let i = 0; i < files.length; i += 1) {
        const file = files[i];
        console.log('%s (%s)', file.name, file.id);
      }
    }
  });
};
