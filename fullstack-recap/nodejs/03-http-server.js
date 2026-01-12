/**
 * DAY 13: HTTP MODULE & SIMPLE SERVER
 * Topics: Creating HTTP server, Handling requests,
 * Routing, Query parameters, POST data, Status codes
 */

const http = require('http');
const url = require('url');

// PART 1: BASIC SERVER
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, World!');
});

// server.listen(3000, () => {
//     console.log('Server running on http://localhost:3000');
// });

// PART 2: HANDLING DIFFERENT ROUTES
const routedServer = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    
    if (pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Home Page</h1>');
    } else if (pathname === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>About Page</h1>');
    } else if (pathname === '/api/users') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ users: ['Alice', 'Bob'] }));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
    }
});

// PART 3: HANDLING QUERY PARAMETERS
http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;
    
    // http://localhost:3000/?name=John&age=30
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ query }));
}).listen(3001);

// PART 4: HANDLING POST DATA
http.createServer((req, res) => {
    if (req.method === 'POST') {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ received: data }));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
    }
}).listen(3002);

// PART 5: COMPLETE REST API EXAMPLE
const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
];

http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;
    
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // GET /users - Get all users
    if (pathname === '/users' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
    }
    // GET /users/:id - Get user by ID
    else if (pathname.match(/^\/users\/\d+$/) && method === 'GET') {
        const id = parseInt(pathname.split('/')[2]);
        const user = users.find(u => u.id === id);
        
        if (user) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(user));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'User not found' }));
        }
    }
    // POST /users - Create user
    else if (pathname === '/users' && method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const newUser = JSON.parse(body);
            newUser.id = users.length + 1;
            users.push(newUser);
            
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newUser));
        });
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
    }
}).listen(3003);

console.log('Servers running on ports 3000-3003');

// EXERCISES
// Exercise 1: Add PUT and DELETE methods to the API
// Exercise 2: Implement basic authentication
// Exercise 3: Create a file upload endpoint

console.log('\n=== HTTP Server ===\n');
