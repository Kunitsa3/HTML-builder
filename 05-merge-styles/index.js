const fs = require('fs');
const path = require('path');
const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');
const stylesPath = path.join(__dirname, 'styles');

module.exports = mergeStyles = async (targetPath, stylesPath) => {
  await fs.promises.rm(targetPath, {
    force: true
  });

  fs.readdir(stylesPath, {
    withFileTypes: true
  }, (err, files) => {
    files.forEach(file => {
      if (file.isFile()) {
        const extname = path.extname(file.name);
        const pathToFile = path.join(stylesPath, file.name);
        if (extname === '.css') {
          const stream = fs.createReadStream(pathToFile, 'utf-8');
          const writeableStream = fs.createWriteStream(targetPath, {flags: 'a'});
          stream.pipe(writeableStream);
        }
      }
    });
  });

}

mergeStyles(bundlePath, stylesPath); 