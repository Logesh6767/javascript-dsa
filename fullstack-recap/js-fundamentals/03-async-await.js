/**
 * DAY 3: ASYNC/AWAIT & ERROR HANDLING
 * 
 * Topics Covered:
 * 1. Understanding async/await syntax
 * 2. Converting promises to async/await
 * 3. Error handling with try-catch
 * 4. Parallel vs Sequential execution
 * 5. Common pitfalls and best practices
 */

// ============================================
// PART 1: BASIC ASYNC/AWAIT SYNTAX
// ============================================

/**
 * async/await is syntactic sugar over Promises
 * Makes asynchronous code look synchronous
 */

// Promise version
function fetchDataPromise() {
    return fetch('https://api.example.com/data')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(error => {
            console.error(error);
        });
}

// Async/await version (cleaner!)
async function fetchDataAsync() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}

// Simulated async function for practice
function delay(ms, value) {
    return new Promise(resolve => setTimeout(() => resolve(value), ms));
}

// Exercise 1: Convert this promise chain to async/await
function getUserDataPromise(userId) {
    return fetchUser(userId)
        .then(user => {
            return fetchPosts(user.id);
        })
        .then(posts => {
            return fetchComments(posts[0].id);
        });
}

// TODO: Rewrite using async/await
async function getUserDataAsync(userId) {
    // Your code here
}


// ============================================
// PART 2: ERROR HANDLING
// ============================================

// Try-catch for error handling
async function fetchUserSafe(userId) {
    try {
        const response = await fetch(`/api/users/${userId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const user = await response.json();
        return user;
    } catch (error) {
        console.error('Failed to fetch user:', error.message);
        return null; // Return fallback value
    }
}

// Multiple try-catch blocks
async function complexOperation() {
    let user, posts;
    
    try {
        user = await fetchUser(1);
    } catch (error) {
        console.error('User fetch failed:', error);
        return; // Early return on critical failure
    }
    
    try {
        posts = await fetchPosts(user.id);
    } catch (error) {
        console.error('Posts fetch failed, using empty array');
        posts = []; // Use fallback
    }
    
    return { user, posts };
}

// Exercise 2: Add proper error handling
async function robustDataFetch(url) {
    // TODO: Fetch data with timeout and retry logic
    // - Timeout after 5 seconds
    // - Retry 3 times on failure
    // - Return null if all attempts fail
}


// ============================================
// PART 3: SEQUENTIAL VS PARALLEL EXECUTION
// ============================================

// ❌ SLOW: Sequential execution (3 seconds total)
async function fetchSequential() {
    const user = await delay(1000, 'user');      // Wait 1s
    const posts = await delay(1000, 'posts');    // Wait 1s
    const comments = await delay(1000, 'comments'); // Wait 1s
    
    return { user, posts, comments };
}

// ✅ FAST: Parallel execution (1 second total)
async function fetchParallel() {
    const [user, posts, comments] = await Promise.all([
        delay(1000, 'user'),
        delay(1000, 'posts'),
        delay(1000, 'comments')
    ]);
    
    return { user, posts, comments };
}

// When operations depend on each other (must be sequential)
async function fetchDependent() {
    const user = await fetchUser(1);           // Must wait
    const posts = await fetchPosts(user.id);   // Depends on user
    const comments = await fetchComments(posts[0].id); // Depends on posts
    
    return { user, posts, comments };
}

// Mixed: Some parallel, some sequential
async function fetchMixed() {
    const user = await fetchUser(1); // Must wait first
    
    // These can run in parallel
    const [posts, friends] = await Promise.all([
        fetchPosts(user.id),
        fetchFriends(user.id)
    ]);
    
    return { user, posts, friends };
}

// Exercise 3: Optimize this function
async function slowFunction() {
    const data1 = await fetch('/api/data1').then(r => r.json());
    const data2 = await fetch('/api/data2').then(r => r.json());
    const data3 = await fetch('/api/data3').then(r => r.json());
    
    return { data1, data2, data3 };
}

// TODO: Rewrite to run requests in parallel


// ============================================
// PART 4: COMMON PATTERNS
// ============================================

// Pattern 1: Async IIFE (Immediately Invoked Function Expression)
(async () => {
    const data = await fetchData();
    console.log(data);
})();

// Pattern 2: Async array iteration
async function processUsers(userIds) {
    // ❌ Wrong: forEach doesn't wait
    userIds.forEach(async (id) => {
        const user = await fetchUser(id);
        console.log(user);
    });
    console.log('Done'); // Logs immediately!
    
    // ✅ Correct: for...of loop
    for (const id of userIds) {
        const user = await fetchUser(id);
        console.log(user);
    }
    console.log('Done'); // Logs after all fetches
}

// Pattern 3: Parallel processing with map
async function fetchAllUsers(userIds) {
    const promises = userIds.map(id => fetchUser(id));
    const users = await Promise.all(promises);
    return users;
}

// Pattern 4: Sequential processing with reduce
async function processSequentially(items) {
    return items.reduce(async (previousPromise, item) => {
        await previousPromise;
        return processItem(item);
    }, Promise.resolve());
}

// Exercise 4: Process array with rate limiting
async function processWithLimit(items, concurrentLimit) {
    // TODO: Process items but max 'concurrentLimit' at a time
}


// ============================================
// PART 5: REAL-WORLD EXAMPLES
// ============================================

// Example 1: API call with retry
async function fetchWithRetry(url, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Status: ${response.status}`);
            return await response.json();
        } catch (error) {
            const isLastAttempt = i === maxRetries - 1;
            if (isLastAttempt) throw error;
            
            console.log(`Retry ${i + 1}/${maxRetries}`);
            await delay(1000 * Math.pow(2, i)); // Exponential backoff
        }
    }
}

// Example 2: Timeout wrapper
async function withTimeout(promise, timeoutMs) {
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout')), timeoutMs);
    });
    
    return Promise.race([promise, timeoutPromise]);
}

// Usage
async function fetchWithTimeout(url) {
    try {
        const data = await withTimeout(
            fetch(url).then(r => r.json()),
            5000
        );
        return data;
    } catch (error) {
        console.error('Request timed out or failed');
        throw error;
    }
}

// Example 3: Batch processing
async function batchProcess(items, batchSize = 10) {
    const results = [];
    
    for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);
        const batchResults = await Promise.all(
            batch.map(item => processItem(item))
        );
        results.push(...batchResults);
        
        console.log(`Processed ${i + batchSize} of ${items.length}`);
    }
    
    return results;
}

// Example 4: Caching with async/await
const cache = new Map();

async function cachedFetch(url) {
    if (cache.has(url)) {
        console.log('Cache hit!');
        return cache.get(url);
    }
    
    console.log('Cache miss, fetching...');
    const data = await fetch(url).then(r => r.json());
    cache.set(url, data);
    
    return data;
}

// Exercise 5: Implement async queue
class AsyncQueue {
    constructor() {
        this.queue = [];
        this.processing = false;
    }
    
    async enqueue(task) {
        // TODO: Add task to queue and process
    }
    
    async processQueue() {
        // TODO: Process tasks one by one
    }
}


// ============================================
// PRACTICE PROBLEMS
// ============================================

/**
 * Problem 1: Parallel fetch with fallback
 * Fetch from multiple sources, return first successful result
 */
async function fetchFromMultipleSources(urls) {
    // TODO: Try all URLs in parallel, return first success
    // If all fail, throw error
}


/**
 * Problem 2: Sequential dependency chain
 * Each step depends on previous result
 */
async function dependencyChain(initialValue) {
    // TODO: 
    // Step 1: fetch user with initialValue
    // Step 2: fetch user's posts
    // Step 3: fetch comments for first post
    // Step 4: fetch author details for first comment
    // Return all data
}


/**
 * Problem 3: Async map with error handling
 * Map over array with async function, handle individual errors
 */
async function asyncMap(array, asyncFn) {
    // TODO: Map over array, catch errors per item
    // Return array with results or error objects
}


/**
 * Problem 4: Rate-limited parallel execution
 */
async function parallelWithLimit(tasks, limit) {
    // TODO: Execute tasks in parallel but max 'limit' at once
}


/**
 * Problem 5: Implement Promise.allSettled with async/await
 */
async function allSettled(promises) {
    // TODO: Wait for all promises, return status for each
}


// ============================================
// INTERVIEW QUESTIONS
// ============================================

/**
 * Q1: What's the difference between async/await and Promises?
 * Answer: 
 */

/**
 * Q2: Can you use await without async?
 * Answer: 
 */

/**
 * Q3: How do you handle errors in async/await?
 * Answer: 
 */

/**
 * Q4: What happens if you don't await an async function?
 * Answer: 
 */

/**
 * Q5: How do you run async operations in parallel?
 * Answer: 
 */

/**
 * Q6: What's the output?
 */
async function test1() {
    console.log('1');
    await delay(0);
    console.log('2');
}

async function test2() {
    console.log('3');
    await delay(0);
    console.log('4');
}

test1();
test2();
console.log('5');
// What order will the numbers be logged?


/**
 * Q7: What's wrong with this code?
 */
async function badAsync() {
    const users = [1, 2, 3, 4, 5];
    users.forEach(async (id) => {
        const user = await fetchUser(id);
        console.log(user);
    });
    console.log('All done!'); // Problem here!
}


/**
 * Q8: How would you fix this?
 */
async function needsOptimization() {
    const user = await fetchUser(1);
    const post = await fetchPost(1);
    const comment = await fetchComment(1);
    return { user, post, comment };
}


// ============================================
// COMPARISON: PROMISES VS ASYNC/AWAIT
// ============================================

// Promises
function getDataPromises() {
    return fetchUser(1)
        .then(user => {
            return fetchPosts(user.id)
                .then(posts => {
                    return { user, posts };
                });
        })
        .catch(error => {
            console.error(error);
            throw error;
        });
}

// Async/Await (cleaner!)
async function getDataAsync() {
    try {
        const user = await fetchUser(1);
        const posts = await fetchPosts(user.id);
        return { user, posts };
    } catch (error) {
        console.error(error);
        throw error;
    }
}


// ============================================
// RUN YOUR CODE
// ============================================

console.log('\n=== Testing Async/Await ===\n');

// Helper functions for testing
function fetchUser(id) {
    return delay(100, { id, name: `User${id}` });
}

function fetchPosts(userId) {
    return delay(100, [{ id: 1, userId, title: 'Post 1' }]);
}

function fetchComments(postId) {
    return delay(100, [{ id: 1, postId, text: 'Comment 1' }]);
}

function processItem(item) {
    return delay(100, `Processed: ${item}`);
}

// Test your implementations here
(async () => {
    try {
        // Add your tests
    } catch (error) {
        console.error('Test failed:', error);
    }
})();
