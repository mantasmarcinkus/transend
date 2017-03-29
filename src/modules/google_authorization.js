const fs = require('fs');
const GoogleAuth = require('google-auth-library');
const EventLogger = require('node-windows').EventLogger;

const log = new EventLogger('transend');

const TOKEN_DIR = `${process.env.HOME || process.env.HOMEPATH ||
  process.env.USERPROFILE}/.credentials/`;
const TOKEN_PATH = `${TOKEN_DIR}drive-nodejs-quickstart.json`;
const CLIENT_SECRET = './client_secret.json';

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const clientSecret = credentials.installed.client_secret;
  const clientId = credentials.installed.client_id;
  const redirectUrl = credentials.installed.redirect_uris[0];
  const auth = new GoogleAuth();
  const oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) {
      log.error('Token is not registered. Please run command: npm run register');
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

function init(callback) {
  // Load client secrets from a local file.
  fs.readFile(CLIENT_SECRET, (err, content) => {
    if (err) {
      log.error(`Error loading client secret file: ${err}`);
      return;
    }
    // Authorize a client with the loaded credentials, then call the
    // Drive API.
    authorize(JSON.parse(content), callback);
  });
}


module.exports = {
  init,
};
