const fs = require('fs');
const path = require('path');
const readLine = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

fs.open(
  path.resolve(__dirname, 'text.txt'), 'w',
  console.log('Hello. Enter your text'),
  (err) => {
    if (err) throw err;    
  }
);

const text = fs.createWriteStream(path.resolve(__dirname, 'text.txt'));

readLine.on('line', (date) => {
  if (date == 'exit') {   
    process.exit();
  }
  text.write(date + '\n'); 
});

process.on('exit', () => {
  console.log('You can see the result in the file text.txt. Goodbye!');
});