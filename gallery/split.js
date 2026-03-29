const fs = require('fs');
const readline = require('readline');

const fileIn = 'gallery-logic.js';
const dataOut = 'artworks-data.js';
const logicOut = 'gallery-logic-new.js';

const rl = readline.createInterface({
  input: fs.createReadStream(fileIn),
  crlfDelay: Infinity
});

const wData = fs.createWriteStream(dataOut);
const wLogic = fs.createWriteStream(logicOut);

let inData = false;

rl.on('line', (line) => {
  if (line.includes('const STREAM_RECORDS = [')) {
    inData = true;
  }
  
  if (inData) {
    wData.write(line + '\n');
  } else {
    wLogic.write(line + '\n');
  }
  
  if (line.includes(']; // ── AUTO-SHUFFLE ON INITIAL LOAD')) {
    inData = false;
    wLogic.write('// DATA IMPORTED FROM artworks-data.js\n');
  }
});

rl.on('close', () => {
  console.log('Split complete!');
});
