const fs = require('fs');

const path = require('path');

async function buildPage() {
  //create index.html
  await fs.promises.mkdir(path.resolve(__dirname, 'project-dist'), { 'recursive': true });
  const template = await fs.promises.readFile(path.resolve(__dirname, 'template.html'), 'utf8');
  await fs.promises.writeFile((path.resolve(__dirname, 'project-dist', 'index.html')), template);
  const indexFile = await fs.promises.readFile(path.resolve(__dirname, 'project-dist', 'index.html'), 'utf8'); 
  const result = indexFile.match(/{{[a-z]+}}/g);
  
  for (const item of result) {
    const fileName = item.slice(2,-2);
    const fileContent = await fs.promises.readFile(path.resolve(__dirname, 'components', `${fileName}.html`), 'utf8');
    const currentIndexFile = await fs.promises.readFile(path.resolve(__dirname, 'project-dist', 'index.html'), 'utf8');
    const newFile = currentIndexFile.replace(item, fileContent);
    await fs.promises.writeFile(path.resolve(__dirname, 'project-dist', 'index.html'), newFile);
  }
  //create style.css
  const bundle = fs.createWriteStream(path.resolve(__dirname, 'project-dist', 'style.css'));
  fs.readdir(path.resolve(__dirname, 'styles'), (err, files) => {
    if (!err) {
      files.forEach(file => {
        if (path.extname(file) == '.css') {
          const stream = fs.createReadStream(
            path.resolve(__dirname, 'styles', file));
          let data = '';
          stream.on('data', partData => bundle.write(data += partData));
        }
      });
    }
  });

  //copy assets 
  await fs.promises.rm(path.resolve(__dirname,'project-dist', 'assets'), { recursive: true, force: true });
  await fs.promises.mkdir(path.resolve(__dirname, 'project-dist', 'assets'), { 'recursive': true });
  const folders = await fs.promises.readdir(path.resolve(__dirname, 'assets'));
  for (let folder of folders) {
    await fs.promises.rm(path.resolve(__dirname, 'project-dist', 'assets', folder), { recursive: true, force: true });
    await fs.promises.mkdir(path.resolve(__dirname, 'project-dist', 'assets', folder), { 'recursive': true });
    const files = await fs.promises.readdir(path.resolve(__dirname, 'assets', folder));
    files.forEach(file => {
      fs.copyFile(path.resolve(__dirname, 'assets', folder.toString(), file), path.resolve(__dirname, 'project-dist', 'assets', folder.toString(), file), (err) => {
        if (err) throw err;
      });
    });
  }
}

buildPage();