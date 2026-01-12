/**
 * DAY 12: FILE SYSTEM & PATH MODULE
 * Topics: Reading files, Writing files, Async vs Sync,
 * Working with directories, Path manipulation
 */

const fs = require('fs');
const path = require('path');

// PART 1: PATH MODULE
const filePath = path.join(__dirname, 'data', 'users.json');
console.log('File path:', filePath);
console.log('Extension:', path.extname(filePath));
console.log('Basename:', path.basename(filePath));
console.log('Directory:', path.dirname(filePath));

// PART 2: READING FILES

// Synchronous (blocks code)
try {
    const data = fs.readFileSync('file.txt', 'utf8');
    console.log(data);
} catch (error) {
    console.error('Error reading file:', error.message);
}

// Asynchronous with callback
fs.readFile('file.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error:', err.message);
        return;
    }
    console.log(data);
});

// Async with promises
const fsPromises = require('fs').promises;

async function readFileAsync() {
    try {
        const data = await fsPromises.readFile('file.txt', 'utf8');
        console.log(data);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// PART 3: WRITING FILES
const content = 'Hello, World!';

// Async write
fs.writeFile('output.txt', content, (err) => {
    if (err) throw err;
    console.log('File written');
});

// Append to file
fs.appendFile('output.txt', '\nNew line', (err) => {
    if (err) throw err;
});

// PART 4: WORKING WITH DIRECTORIES
// Check if exists
fs.access('mydir', fs.constants.F_OK, (err) => {
    console.log(err ? 'Does not exist' : 'Exists');
});

// Create directory
fs.mkdir('newdir', { recursive: true }, (err) => {
    if (err) throw err;
});

// Read directory
fs.readdir('./', (err, files) => {
    if (err) throw err;
    files.forEach(file => console.log(file));
});

// PART 5: FILE STATS
fs.stat('file.txt', (err, stats) => {
    if (err) throw err;
    console.log('Is file?', stats.isFile());
    console.log('Is directory?', stats.isDirectory());
    console.log('File size:', stats.size);
    console.log('Created:', stats.birthtime);
    console.log('Modified:', stats.mtime);
});

// EXERCISES
// Exercise 1: Create a file organizer (group files by extension)
// Exercise 2: Implement file watcher
// Exercise 3: Build a simple logger that writes to file

console.log('\n=== File System Operations ===\n');
