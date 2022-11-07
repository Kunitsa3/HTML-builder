const fs = require('fs');
const path = require('path');

const pathToFile = path.join(__dirname, 'secret-folder');

fs.readdir(pathToFile, {
  withFileTypes: true
}, (_, files) => {
  files.forEach(file => {
    if (file.isFile()) {
      const extname = path.extname(file.name);
      const name = path.basename(file.name, extname);
      const currentPath = path.join(pathToFile, file.name)

      fs.stat(currentPath, (_, stats) => {
        const size = (stats.size / 1024);

        console.log(`${name} - ${extname.slice(1)} - ${size}kb`);
      })
    }
  });
});