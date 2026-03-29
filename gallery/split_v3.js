const fs = require('fs');
const readline = require('readline');

const fileIn = 'i:\\ANTIGRAVITY\\revision-landing\\gallery\\gallery-logic.js';
const dataOut = 'i:\\ANTIGRAVITY\\revision-landing\\gallery\\artworks-data.js';
const logicOut = 'i:\\ANTIGRAVITY\\revision-landing\\gallery\\gallery-logic-v2.js';

const rl = readline.createInterface({
  input: fs.createReadStream(fileIn),
  crlfDelay: Infinity
});

const wData = fs.createWriteStream(dataOut);
const wLogic = fs.createWriteStream(logicOut);

let lineCount = 0;

rl.on('line', (line) => {
  lineCount++;
  if (lineCount >= 77 && lineCount <= 58914) {
    wData.write(line + '\n');
  } else {
    wLogic.write(line + '\n');
    if (lineCount === 76) {
        wLogic.write('// DATA ARRAY RESERVED\n');
    }
  }
});

rl.on('close', () => {
  console.log(`Split complete! Total lines: ${lineCount}`);
  process.exit(0);
});
