const notifier = require('node-notifier');
const opn = require('opn');

module.exports = function notify(object) {
  notifier.notify({
    title: new Date().toLocaleDateString(),
    message: object.value,
    wait: true,
    url: object.value,
  });
  notifier.on('click', (notifierObject, options) => {
    opn(options.url);
  });
};
