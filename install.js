const Service = require('node-windows').Service;
const regedit = require('regedit');

const registryKey = 'HKCU\\SOFTWARE\\MICROSOFT\\WINDOWS\\CurrentVersion\\Notifications\\Settings\\transend';
(() => {
  new Promise((resolve) => {
    regedit.createKey(registryKey, () => {
      resolve();
    });
  })
    .then(() => new Promise((resolve) => {
      const registryValue = { [registryKey]: {
        ShowInActionCenter: {
          value: 1,
          type: 'REG_DWORD',
        },
      } };

      regedit.putValue(registryValue, () => {
        console.log('Added registry configuration for toaster to persist in Action center');
        resolve();
      });
    }))
    .then(() => new Promise((resolve) => {
      regedit.list(registryKey,
        (err = '') => {
          console.log('Registry in this key: ', registryKey, err);
          resolve();
        });
    }))
    .then(() => {
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
      console.log('Instalation of service finished');
    });
})();
