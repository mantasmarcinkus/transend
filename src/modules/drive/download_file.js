const jos = require('json-object-stream');

module.exports = function downloadFile(fileId, drive, auth, callback) {
  drive.files.get({
    auth,
    fileId,
    alt: 'media',
  })
    .on('end', () => {
      console.log('Done downloading');
    })
    .on('error', (err) => {
      console.log('Error during download', err);
    })
    .pipe(jos.parse())
    .on('data', (object) => {
      if (callback) {
        object.links.forEach(callback);
      }
    });
};
