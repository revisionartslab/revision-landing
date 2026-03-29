const fs = require('fs');
const readline = require('readline');

const fileIn = 'gallery-logic.js';
const dataOut = 'artworks-data.js';
const logicOut = 'gallery-logic-v2.js';

const rl = readline.createInterface({
  input: fs.createReadStream(fileIn),
  crlfDelay: Infinity
});

const wData = fs.createWriteStream(dataOut);
const wLogic = fs.createWriteStream(logicOut);

let lineCount = 0;

rl.on('line', (line) => {
  lineCount++;
  
  // Lines 77 to 58914 are STREAM_RECORDS
  if (lineCount >= 77 && lineCount <= 58914) {
    wData.write(line + '\n');
  } else {
    // Other lines are logic
    wLogic.write(line + '\n');
    if (lineCount === 76) {
        wLogic.write('// DATA ARRAY REMOVED AND MOVED TO artworks-data.js\n');
        wLogic.write('// The array is now expected to be available on window.STREAM_RECORDS\n');
    }
  }
});

rl.on('close', () => {
  console.log(`Split complete! Total lines processed: ${lineCount}`);
});
