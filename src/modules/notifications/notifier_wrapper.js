const WindowsToaster = require('node-notifier').WindowsToaster;
const opn = require('opn');

// TO DO: change this node-notifier module to something home made, or anything else, because
// you need specific permisions for notifications to stay in Action Center
module.exports = function notify(object) {
  const notifier = new WindowsToaster({
    withFallback: false, // Fallback to Growl or Balloons?
    customPath: null, // Relative/Absolute path if you want to use your fork of SnoreToast.exe
  });
  notifier.notify({
    title: `${object.date} ${object.author}`,
    message: object.value,
    wait: true,
    appID: 'transend',
    url: object.value,
  });
  notifier.on('click', (notifierObject, options) => {
    opn(options.url);
  });
};
