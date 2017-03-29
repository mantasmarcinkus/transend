module.exports = function deleteFile(fileId, drive, auth) {
  return new Promise((resolve) => {
    drive.files.delete({
      auth,
      fileId,
    }, (err) => {
      if (!err) {
        console.log(`${fileId} deleted`);
        resolve(fileId);
      }

      console.log(err);
    });
  });
};
