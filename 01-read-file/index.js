const fs = require('fs');
const path = require('path');

const stream = fs.createReadStream(
  path.resolve(__dirname, 'text.txt'), 'utf-8');

let data = '';

stream.on('data', partData => console.log(data += partData));
stream.on('error', error => console.log('Error', error.message));
