const stream = require('stream');

module.exports = function downloadFile(fileId, drive, auth) {
  return new Promise((resolve) => {
    const echoStream = new stream.Writable();
    echoStream._write = (chunk, encoding, done) => {
      resolve(chunk.toString(), fileId);
      done();
    };
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
      .pipe(echoStream);
  });
};
