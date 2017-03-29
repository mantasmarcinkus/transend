/**
 * List applicationFiles
 * @param {*} auth
 */
module.exports = function listAppFiles(drive, auth) {
  return new Promise((resolve, reject) => {
    drive.files.list({
      auth,
      spaces: 'appDataFolder',
      fields: 'nextPageToken, files(id, name)',
      pageSize: 100,
    }, (err, res) => {
      resolve(res);
    });
  });
};
