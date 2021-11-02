const fs = require('fs');
const path = require('path');

function copyDir() {
  fs.promises.rmdir(path.resolve(__dirname, 'files-copy'), { 'recursive': true })
    .then(() =>
      fs.promises.mkdir(path.resolve(__dirname, 'files-copy'), { 'recursive': true }))
    .then(() => {
      fs.readdir(path.resolve(__dirname, 'files'), (err, files) => {
        files.forEach(file => {
          fs.copyFile(path.resolve(__dirname, 'files', file), path.resolve(__dirname, 'files-copy', file), (err) => {
            if (err) throw err;
          });
        });
      });
    });
}

copyDir();