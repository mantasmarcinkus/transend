const Service = require('node-windows').Service;

// Create a new service object
const svc = new Service({
  name: 'transend',
  description: 'Checks google drive app data and finds if there are new links and notifies windows desktop about them',
  script: './index.js',
  env: {
    name: 'HOME',
    value: process.env.USERPROFILE,
  },
});

// Listen for the 'uninstall' event so we know when it is done.
svc.on('uninstall', () => {
  console.log('Uninstall complete.');
  console.log('The service exists: ', svc.exists);
});

// Uninstall the service.
svc.uninstall();
