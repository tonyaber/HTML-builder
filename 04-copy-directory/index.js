const fs = require('fs');
const path = require('path');

async function copyDir() {
  await fs.promises.rm(path.resolve(__dirname, 'files-copy'), { recursive: true, force: true });
  await fs.promises.mkdir(path.resolve(__dirname, 'files-copy'), { 'recursive': true });
  await fs.readdir(path.resolve(__dirname, 'files'), (err, files) => {
    files.forEach(file => {
      fs.copyFile(path.resolve(__dirname, 'files', file), path.resolve(__dirname, 'files-copy', file), (err) => {
        if (err) throw err;
      });
    });
  });
}

copyDir();