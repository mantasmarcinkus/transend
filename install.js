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
// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install', () => {
  svc.start();
});

svc.install();
