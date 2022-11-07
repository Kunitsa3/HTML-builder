const fs = require('fs');
const path = require('path');

const pathToFile = path.join(__dirname, 'text.txt');

let stream = process.stdin;
let writeableStream = fs.createWriteStream(pathToFile);
stream.pipe(writeableStream);

process.on('SIGINT', () => {
  console.log(' Thank you!');
  process.exit(0);
});

process.stdin.on('data', (data) => {
  const stringData = data.toString('utf8').trim();

  if (stringData === 'exit') {
    console.log(' Thank you!');
  process.exit(0);
  }
  
});

