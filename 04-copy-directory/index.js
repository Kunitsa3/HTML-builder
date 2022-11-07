const fs = require('fs');
const path = require('path');
const filesDirPath = path.join(__dirname, 'files');
const filesCopyDirPath = path.join(__dirname, '/files-copy');

module.exports = copyDirectory = async (currentDir, targetDir) => {
  await fs.promises.rm(targetDir, {
    recursive: true,
    force: true
  });

  fs.readdir(currentDir, {
    withFileTypes: true
  }, (err, files) => {
    if (err) throw new Error(err);

    fs.mkdir(targetDir, {
      recursive: true
    }, (err) => {
      if (err) throw new Error(err);
    });

    files.forEach(file => {
      if (file.isFile()) {
        const current = path.join(currentDir, file.name);
        const target = path.join(targetDir, file.name);
        fs.copyFile(current, target, err => {
          if (err) throw new Error(err);
        })
      } else {
        const currentFolder = path.join(currentDir, file.name);
        const targetFolder = path.join(targetDir, file.name);
        copyDirectory(currentFolder, targetFolder)
      }
    });

  });
}

copyDirectory(filesDirPath, filesCopyDirPath);