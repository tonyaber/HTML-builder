const fs = require('fs');
const path = require('path');

fs.readdir(path.resolve(__dirname, 'secret-folder'), (err, files) => {
  if (!err) {
    files.forEach(file => {
      fs.promises.stat(path.resolve(__dirname, 'secret-folder', file))
        .then(statFile => {
          if (!statFile.isDirectory()) {
            console.log(`${file.substring(0, file.lastIndexOf('.'))} - ${path.extname(file.toString()).substring(1)} - ${statFile.size}b`);
          }
        });
    });
  }
});