const listFiles = require('./drive/list_files');
const downloadFile = require('./drive/download_file');
const listAppFiles = require('./drive/list_app_files');
const addFolder = require('./drive/add_folder');
const addConfig = require('./drive/add_config');
const deleteFile = require('./drive/delete_app_files');
const updateFile = require('./drive/update_file');
const notifier = require('./notifications/notifier_wrapper');
const getDatabaseFile = require('../utils/DbUtils');

/**
 * Get config if it's not there create it!
 * @param {*} auth
 */
function checkConfigFile(service, auth) {
  listAppFiles(service, auth)
    .then(files => getDatabaseFile(files))
    .then(file => downloadFile(file.id, service, auth))
    .then(stream => JSON.parse(stream))
    .then(object => object.links.forEach(notifier));
}

/**
 * Notification about not read links in drive app data
 * @param {*} auth
 */
function notifyAboutLinks(service, auth) {
  let fileId;
  listAppFiles(service, auth)
    .then(res => getDatabaseFile(res))
    .then(file => new Promise((resolve) => {
      fileId = file.id;
      const stream = downloadFile(file.id, service, auth);
      resolve(stream);
    }))
    .then(stream => JSON.parse(stream))
    .then((object) => {
      const links = [];

      // Notify all not read links
      // Mark all the links read afterwards
      object.links.forEach((link) => {
        if (!link.read) { notifier(link); }
        links.push({
          value: link.value,
          author: link.author,
          date: link.date,
          read: true,
        });
      });
      updateFile(fileId, service, auth, JSON.stringify(Object.assign({}, object, { links })));
    });
}

/**
 * Deletes all the files in app data folder
 * @param {*} auth
 */
function deleteAllAppFiles(drive, auth) {
  listAppFiles(drive, auth)
    .then((res) => {
      if (res.files.length > 0) {
        res.files.forEach((file) => {
          deleteFile(file.id, drive, auth);
        });
        console.log(`${res.files.length} deleted`);
      } else {
        console.log('No files to delete!');
      }
    });
}

module.exports = {
  listFiles,
  deleteAllAppFiles,
  listAppFiles,
  addConfig,
  addFolder,
  notifyAboutLinks,
  checkConfigFile,
};
