const google = require('googleapis');
const listFiles = require('./drive/list_files');
const downloadFile = require('./drive/download_file');
const listAppFiles = require('./drive/list_app_files');
const addFolder = require('./drive/add_folder');
const addConfig = require('./drive/add_config');
const deleteFile = require('./drive/delete_app_files');
const updateFile = require('./drive/update_file');
const notify = require('./notifications');
const config = require('config');
const notifier = require('./notifications/notifier_wrapper');

const DB_NAME = config.get('dbConfig.name');

/**
 * Get config if it's not there create it!
 * @param {*} auth
 */
function checkConfigFile(auth) {
  const drive = google.drive('v3');
  drive.files.list({
    auth,
    spaces: 'appDataFolder',
    fields: 'nextPageToken, files(id, name)',
    pageSize: 100,
  }, (err, res) => {
    if (!err) {
      if (res.files.length > 0) {
        let exists = false;
        res.files.forEach((file) => {
          if (file.name === DB_NAME) {
            console.log('Found file: ', file.name, file.id);
            exists = true;
            downloadFile(file.id, drive, auth, notifier);
          }
        });

        if (!exists) {
          console.log('DB file does not exist!');
        }
      } else {
        console.log('DB file does not exist!');
        // TO DO: do we really need the config addition?
        // addConfig(auth);
      }
    } else {
      console.log(err);
    }
  });
}

/**
 * Notification about not read links in drive app data
 * @param {*} auth
 */
function notifyAboutLinks(auth) {
  const drive = google.drive('v3');
  drive.files.list({
    auth,
    spaces: 'appDataFolder',
    fields: 'nextPageToken, files(id, name)',
    pageSize: 100,
  }, (err, res) => {
    if (!err) {
      if (res.files.length > 0) {
        let exists = false;
        res.files.forEach((file) => {
          if (file.name === DB_NAME) {
            console.log('Found file: ', file.name, file.id);
            exists = true;
            notify(file.id, drive, auth, notifier);
          }
        });

        if (!exists) {
          console.log('DB file does not exist!');
        }
      } else {
        console.log('DB file does not exist!');
        // TO DO: do we really need the config addition?
        // addConfig(auth);
      }
    } else {
      console.log(err);
    }
  });
}

/**
 * Deletes all the files in app data folder
 * @param {*} auth
 */
function deleteAllAppFiles(auth) {
  const drive = google.drive('v3');
  drive.files.list({
    auth,
    spaces: 'appDataFolder',
    fields: 'nextPageToken, files(id, name)',
    pageSize: 100,
  }, (err, res) => {
    if (!err) {
      if (res.files.length > 0) {
        res.files.forEach((file) => {
          deleteFile(file.id, drive, auth);
        });
        console.log(`${res.files.length} deleted`);
      } else {
        console.log('No files to delete!');
      }
    } else {
      console.log(err);
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
