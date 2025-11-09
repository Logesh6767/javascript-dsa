# Node.js Interview Questions

## Fundamentals

### Q1: What is Node.js?
**Answer**: A JavaScript runtime built on Chrome's V8 engine that allows running JavaScript on the server-side.

### Q2: What is the Event Loop?
**Answer**: Mechanism that handles asynchronous operations in Node.js using a single thread.

### Q3: What is non-blocking I/O?
**Answer**: Operations don't block the execution thread, allowing other operations to run while waiting.

### Q4: What is the difference between process.nextTick() and setImmediate()?
**Answer**:
- `process.nextTick()`: Executes before I/O events
- `setImmediate()`: Executes after I/O events

## Modules

### Q5: What is CommonJS?
**Answer**: Module system using `require()` and `module.exports`.
```javascript
// Export
module.exports = { func1, func2 };

// Import
const myModule = require('./myModule');
```

### Q6: What are ES Modules in Node.js?
**Answer**: Standard JavaScript modules using `import/export`.
```javascript
// Export
export function myFunc() {}

// Import
import { myFunc } from './myModule.js';
```

### Q7: What is the difference between require() and import?
**Answer**:
- `require()`: Synchronous, CommonJS, dynamic
- `import`: Asynchronous, ES6, static (can be dynamic with import())

## Built-in Modules

### Q8: What are some important Node.js modules?
**Answer**:
- `fs`: File system operations
- `http/https`: HTTP server/client
- `path`: File path manipulation
- `os`: Operating system info
- `events`: Event emitter
- `stream`: Stream handling

### Q9: How do you read a file in Node.js?
**Answer**:
```javascript
// Async
fs.readFile('file.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});

// Promises
const data = await fs.promises.readFile('file.txt', 'utf8');

// Sync (blocks)
const data = fs.readFileSync('file.txt', 'utf8');
```

## Async Programming

### Q10: What are callbacks?
**Answer**: Functions passed as arguments to be executed after an operation completes.

### Q11: What is callback hell?
**Answer**: Deeply nested callbacks that are hard to read and maintain. Solution: Promises or async/await.

### Q12: How do you handle errors in Node.js?
**Answer**:
- Try-catch for synchronous code
- Error parameter in callbacks
- .catch() for promises
- Try-catch with async/await
- Error event listeners

## Express.js

### Q13: What is Express.js?
**Answer**: A minimal web application framework for Node.js.

### Q14: What is middleware?
**Answer**: Functions that have access to request and response objects, executed in sequence.
```javascript
app.use((req, res, next) => {
    console.log('Middleware executed');
    next();
});
```

### Q15: What are different types of middleware?
**Answer**:
- Application-level
- Router-level
- Error-handling
- Built-in (express.json(), express.static())
- Third-party (cors, helmet, morgan)

## Advanced Topics

### Q16: What is clustering in Node.js?
**Answer**: Running multiple instances of Node.js to utilize multi-core systems.
```javascript
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
    for (let i = 0; i < os.cpus().length; i++) {
        cluster.fork();
    }
} else {
    // Worker code
    startServer();
}
```

### Q17: What are streams in Node.js?
**Answer**: Objects for reading/writing data in chunks.
- Readable
- Writable
- Duplex (both)
- Transform

### Q18: What is the Buffer class?
**Answer**: Handles binary data in Node.js.
```javascript
const buf = Buffer.from('Hello');
console.log(buf); // <Buffer 48 65 6c 6c 6f>
```

### Q19: What is npm?
**Answer**: Node Package Manager for installing and managing dependencies.

### Q20: What is package.json?
**Answer**: Manifest file with project metadata and dependencies.

## Coding Challenges

### Challenge 1: Simple HTTP Server
```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Hello World' }));
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});
```

### Challenge 2: REST API with Express
```javascript
const express = require('express');
const app = express();

app.use(express.json());

let users = [];

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).json(user);
});

app.listen(3000);
```

### Challenge 3: File Upload Handler
```javascript
const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ filename: req.file.filename });
});
```

## Best Practices

1. **Error Handling**
   - Always handle errors
   - Use try-catch with async/await
   - Log errors properly

2. **Security**
   - Validate input
   - Use helmet.js
   - Implement rate limiting
   - Use HTTPS

3. **Performance**
   - Use clustering
   - Implement caching
   - Use async operations
   - Monitor with PM2

4. **Code Organization**
   ```
   project/
   ├── src/
   │   ├── routes/
   │   ├── controllers/
   │   ├── models/
   │   ├── middleware/
   │   └── utils/
   ├── tests/
   └── package.json
   ```

5. **Environment Variables**
   - Use .env files
   - Never commit secrets
   - Use process.env
