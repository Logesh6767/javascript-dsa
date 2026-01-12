/**
 * WEEK 1 REVIEW: JavaScript Fundamentals
 * 
 * Comprehensive review of Days 1-6
 * Practice problems covering all topics
 */

// ============================================
// SECTION 1: ARROW FUNCTIONS REVIEW
// ============================================

/**
 * Question 1: Fix the 'this' binding issue
 */
const person = {
    name: 'Alice',
    hobbies: ['reading', 'coding'],
    showHobbies: () => {
        this.hobbies.forEach(hobby => {
            console.log(`${this.name} likes ${hobby}`);
        });
    }
};
// TODO: Fix this code

/**
 * Question 2: When NOT to use arrow functions?
 * List 3 scenarios and explain why
 */

// ============================================
// SECTION 2: PROMISES & ASYNC/AWAIT
// ============================================

/**
 * Question 3: Convert to async/await
 */
function getUserData(userId) {
    return fetchUser(userId)
        .then(user => fetchPosts(user.id))
        .then(posts => fetchComments(posts[0].id))
        .then(comments => ({ user, posts, comments }))
        .catch(error => console.error(error));
}
// TODO: Rewrite using async/await

/**
 * Question 4: Parallel vs Sequential
 * Optimize this to run in parallel where possible
 */
async function fetchAllData(userId) {
    const user = await fetchUser(userId);
    const posts = await fetchPosts(user.id);
    const friends = await fetchFriends(user.id);
    const notifications = await fetchNotifications(user.id);
    return { user, posts, friends, notifications };
}
// TODO: Optimize

/**
 * Question 5: Error handling
 * Add proper error handling with fallbacks
 */
async function robustFetch(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
// TODO: Add try-catch, timeout, retry logic

// ============================================
// SECTION 3: ARRAY METHODS
// ============================================

const products = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 1000, stock: 5 },
    { id: 2, name: 'Phone', category: 'Electronics', price: 500, stock: 0 },
    { id: 3, name: 'Shirt', category: 'Clothing', price: 50, stock: 20 },
    { id: 4, name: 'Shoes', category: 'Clothing', price: 100, stock: 15 }
];

/**
 * Question 6: Complex array operations
 */
// TODO: Get total value of all in-stock items (price * stock)


// TODO: Group products by category


// TODO: Get names of out-of-stock products


// TODO: Calculate average price per category


/**
 * Question 7: Implement utility functions
 */
function groupBy(array, key) {
    // TODO: Implement using reduce
}

function unique(array) {
    // TODO: Remove duplicates
}

function flatten(nestedArray) {
    // TODO: Flatten nested array
}

// ============================================
// SECTION 4: CLOSURES
// ============================================

/**
 * Question 8: Create a counter with private state
 */
function createCounter() {
    // TODO: Implement counter with increment, decrement, reset, getValue
}

/**
 * Question 9: Fix the loop issue
 */
for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(i);
    }, i * 1000);
}
// TODO: Fix to print 0, 1, 2, 3, 4

/**
 * Question 10: Module pattern
 */
const shoppingCart = (function() {
    // TODO: Implement private cart array with add, remove, getTotal, getItems
})();

// ============================================
// SECTION 5: EVENT LOOP
// ============================================

/**
 * Question 11: Predict the output
 */
console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve()
    .then(() => console.log('3'))
    .then(() => console.log('4'));

setTimeout(() => console.log('5'), 0);

console.log('6');

// What order will numbers be logged?

/**
 * Question 12: Implement debounce and throttle
 */
function debounce(fn, delay) {
    // TODO: Implement
}

function throttle(fn, limit) {
    // TODO: Implement
}

// ============================================
// COMPREHENSIVE CHALLENGES
// ============================================

/**
 * Challenge 1: Data Processing Pipeline
 * Given raw user data, process it efficiently
 */
const rawUsers = [
    { id: 1, name: 'john doe', email: 'JOHN@EXAMPLE.COM', age: 25, purchases: [100, 200] },
    { id: 2, name: 'jane smith', email: 'jane@example.com', age: 30, purchases: [150] },
    { id: 3, name: 'bob johnson', email: 'BOB@EXAMPLE.COM', age: 35, purchases: [300, 400, 200] }
];

// TODO: Transform to:
// - Capitalize names properly
// - Lowercase emails
// - Add totalSpent field
// - Add category field (age < 30 = 'young', otherwise 'mature')
// - Filter out users with totalSpent < 200
// - Sort by totalSpent descending


/**
 * Challenge 2: Async Queue Processor
 * Process items from queue with concurrency limit
 */
class AsyncQueue {
    constructor(concurrency = 2) {
        this.concurrency = concurrency;
        this.queue = [];
        this.running = 0;
    }
    
    async add(task) {
        // TODO: Implement queue with concurrency limit
    }
    
    async process() {
        // TODO: Process queue
    }
}


/**
 * Challenge 3: API Client with Caching
 * Implement API client with caching, retry, and timeout
 */
class APIClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.cache = new Map();
    }
    
    async get(endpoint, options = {}) {
        // TODO: Implement with:
        // - Caching (with TTL)
        // - Retry logic (3 attempts)
        // - Timeout (5 seconds)
        // - Error handling
    }
}


/**
 * Challenge 4: State Machine
 * Implement a simple state machine using closures
 */
function createStateMachine(initialState, transitions) {
    // TODO: Implement state machine
    // - getCurrentState()
    // - transition(action)
    // - canTransition(action)
    // - onEnter(state, callback)
}

// Usage:
// const machine = createStateMachine('idle', {
//     idle: { start: 'running' },
//     running: { pause: 'paused', stop: 'idle' },
//     paused: { resume: 'running', stop: 'idle' }
// });


// ============================================
// INTERVIEW SCENARIO QUESTIONS
// ============================================

/**
 * Scenario 1: Rate Limiting
 * You have an API that allows max 10 requests per second.
 * Implement a rate limiter.
 */
function createRateLimiter(maxRequests, timeWindow) {
    // TODO: Implement
}


/**
 * Scenario 2: Lazy Loading
 * Implement lazy loading of resources
 */
function lazyLoad(loader) {
    // TODO: Load resource only when first accessed
    // Cache the result for subsequent calls
}


/**
 * Scenario 3: Retry with Exponential Backoff
 */
async function retryWithBackoff(fn, maxRetries = 3) {
    // TODO: Retry with increasing delays (1s, 2s, 4s, 8s...)
}


// ============================================
// FINAL PROJECT: TODO APP
// ============================================

/**
 * Build a TODO app with these features:
 * - Add, remove, update todos
 * - Filter todos (all, active, completed)
 * - Store in localStorage
 * - Async operations with proper error handling
 * - Use closures for private state
 * - Use array methods for data manipulation
 */

const TodoApp = (function() {
    // Private state
    let todos = [];
    let filter = 'all';
    
    // TODO: Implement all functionality
    
    return {
        addTodo(text) {},
        removeTodo(id) {},
        toggleTodo(id) {},
        setFilter(newFilter) {},
        getTodos() {},
        saveToStorage() {},
        loadFromStorage() {}
    };
})();


// ============================================
// SELF-ASSESSMENT
// ============================================

/**
 * Rate your understanding (1-5):
 * 
 * [ ] Arrow Functions & 'this' binding
 * [ ] Promises
 * [ ] Async/Await
 * [ ] Array Methods (map, filter, reduce)
 * [ ] Closures & Scope
 * [ ] Event Loop & Async behavior
 * 
 * If any topic is < 4, review that day's material again!
 */


console.log('\n=== Week 1 Review Complete ===\n');
console.log('✓ Complete all exercises above');
console.log('✓ Test your implementations');
console.log('✓ Ready for Week 2? Let\'s go!');
