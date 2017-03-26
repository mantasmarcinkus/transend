const jos = require('json-object-stream');
const updateFile = require('../drive/update_file');

module.exports = function notify(fileId, drive, auth, callback) {
  drive.files.get({
    auth,
    fileId,
    alt: 'media',
  })
    .on('end', () => {
      console.log('Done notifying');
    })
    .on('error', (err) => {
      console.log('Error during download', err);
    })
    .pipe(jos.parse())
    .on('data', (object) => {
      const links = [];
      object.links.forEach((link) => {
        if (callback && !link.read) { callback(link); }
        links.push({
          value: link.value,
          read: true,
        });
      });
      updateFile(fileId, drive, auth, JSON.stringify(Object.assign({}, object, { links })));
    });
};
