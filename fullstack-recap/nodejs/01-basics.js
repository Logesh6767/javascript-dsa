/**
 * DAY 11: NODE.JS BASICS & MODULES
 * Topics: CommonJS vs ES Modules, require vs import,
 * module.exports, __dirname, __filename, process, npm basics
 */

// PART 1: COMMONJS MODULES
// Exporting
// module.exports = { function1, function2 };
// exports.myFunction = function() {};

// Importing
// const myModule = require('./myModule');

// PART 2: ES MODULES
// Exporting
// export function myFunction() {}
// export default class MyClass {}

// Importing
// import { myFunction } from './myModule.js';
// import MyClass from './MyClass.js';

// PART 3: BUILT-IN MODULES
const path = require('path');
const os = require('os');
const fs = require('fs');

console.log('Platform:', os.platform());
console.log('CPUs:', os.cpus().length);
console.log('Free memory:', os.freemem());

console.log('Current directory:', __dirname);
console.log('Current file:', __filename);

// PART 4: PROCESS OBJECT
console.log('Node version:', process.version);
console.log('Platform:', process.platform);
console.log('Arguments:', process.argv);
console.log('Environment:', process.env.NODE_ENV);

// Exit with code
// process.exit(0); // Success
// process.exit(1); // Error

// PART 5: NPM BASICS
/**
 * npm init - Initialize package.json
 * npm install package - Install dependency
 * npm install -g package - Install globally
 * npm install --save-dev package - Dev dependency
 * npm start - Run start script
 * npm test - Run test script
 */

// EXERCISES
// Exercise 1: Create a module that exports utility functions
// Exercise 2: Read command line arguments
// Exercise 3: Create a package.json with scripts

console.log('\n=== Node.js Basics ===\n');
