module.exports = function deleteFile(fileId, drive, auth) {
  drive.files.delete({
    auth,
    fileId,
  }, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`${fileId} deleted`);
    }
  });
};
