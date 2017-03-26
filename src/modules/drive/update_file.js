module.exports = function updateFile(fileId, drive, auth, content) {
  const media = {
    mimeType: 'application/json',
    body: content,
  };
  drive.files.update({
    auth,
    media,
    fileId,
  })
    .on('end', () => {
      console.log('Done updating');
    })
    .on('error', (err) => {
      console.log('Error during update', err);
    });
};
