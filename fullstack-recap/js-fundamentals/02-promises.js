/**
 * DAY 2: PROMISES & PROMISE CHAINING
 * 
 * Topics Covered:
 * 1. What are Promises?
 * 2. Creating Promises
 * 3. Promise states (pending, fulfilled, rejected)
 * 4. .then(), .catch(), .finally()
 * 5. Promise chaining
 * 6. Common patterns and pitfalls
 */

// ============================================
// PART 1: UNDERSTANDING PROMISES
// ============================================

/**
 * A Promise is an object representing the eventual completion
 * or failure of an asynchronous operation.
 * 
 * Three states:
 * - Pending: Initial state
 * - Fulfilled: Operation completed successfully
 * - Rejected: Operation failed
 */

// Creating a basic Promise
const basicPromise = new Promise((resolve, reject) => {
    // Simulating async operation
    setTimeout(() => {
        const success = true;
        
        if (success) {
            resolve('Operation successful!'); // Fulfill the promise
        } else {
            reject('Operation failed!'); // Reject the promise
        }
    }, 1000);
});

// Consuming the Promise
basicPromise
    .then(result => {
        console.log('Success:', result);
    })
    .catch(error => {
        console.error('Error:', error);
    })
    .finally(() => {
        console.log('Promise completed (success or failure)');
    });

// ============================================
// PART 2: CREATING PROMISES
// ============================================

// Simulating an API call
function fetchUser(userId) {
    return new Promise((resolve, reject) => {
        console.log(`Fetching user ${userId}...`);
        
        setTimeout(() => {
            if (userId > 0) {
                resolve({
                    id: userId,
                    name: 'John Doe',
                    email: 'john@example.com'
                });
            } else {
                reject(new Error('Invalid user ID'));
            }
        }, 1500);
    });
}

// Exercise 1: Create a Promise that fetches posts
// TODO: Implement fetchPosts(userId) that returns a promise
function fetchPosts(userId) {
    // Should resolve with an array of posts after 1 second
    // Should reject if userId is not provided
}
// Answer
function fetchPostsAnswer(userId) {
    // Should resolve with an array of posts after 1 second
    // Should reject if userId is not provided
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve([1,2,3,4])
            } else {
                reject(new Error("Invalid UserId"))
            }
        }, 1000)
        
    })
}


// ============================================
// PART 3: PROMISE CHAINING
// ============================================

// Sequential async operations
fetchUser(1)
    .then(user => {
        console.log('Got user:', user.name);
        return fetchPosts(user.id); // Return another promise
    })
    .then(posts => {
        console.log('Got posts:', posts);
        return posts.length; // Return a value
    })
    .then(count => {
        console.log('Total posts:', count);
    })
    .catch(error => {
        console.error('Something went wrong:', error.message);
    });

// ⚠️ Common Mistake: Not returning the promise
fetchUser(1)
    .then(user => {
        fetchPosts(user.id); // ❌ Wrong: promise not returned
        console.log('This runs immediately!');
    })
    .then(posts => {
        console.log(posts); // undefined!
    });

// ✅ Correct way: Return the promise
fetchUser(1)
    .then(user => {
        return fetchPosts(user.id); // ✅ Correct
    })
    .then(posts => {
        console.log(posts); // Has the posts data
    });

// Exercise 2: Chain these operations
// TODO: Fetch user → fetch posts → fetch comments for first post
function fetchComments(postId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, text: 'Great post!' },
                { id: 2, text: 'Thanks for sharing' }
            ]);
        }, 1000);
    });
}

// TODO: Chain fetchUser → fetchPosts → fetchComments
// My Answer
fetchUser(1)
    .then(user => {
        return fetchPosts(user.id)
    })
    .then(post => {
        return fetchComments(post[0])
    })
    .then(comment => {
        console.log(comment)
    })
    .catch(error => {
        console.error("User not found!" + error)
    })

// ============================================
// PART 4: ERROR HANDLING
// ============================================

// Errors propagate down the chain
fetchUser(-1)  // This will fail
    .then(user => {
        return fetchPosts(user.id);
    })
    .then(posts => {
        console.log('Posts:', posts); // This won't run
    })
    .catch(error => {
        console.error('Caught error:', error.message); // Error caught here
    });

// Multiple catch handlers
fetchUser(1)
    .then(user => {
        return fetchPosts(user.id);
    })
    .catch(error => {
        console.error('Error fetching posts:', error);
        return []; // Return fallback value
    })
    .then(posts => {
        console.log('Posts (may be empty):', posts); // Still runs
    });

// Exercise 3: Add proper error handling
// TODO: Handle errors at each step and provide fallbacks
function robustFetchUserData(userId) {
    // Should try to fetch user, posts, and comments
    // If user fetch fails, reject
    // If posts/comments fail, use empty arrays
    return fetchUser(userId)
        .then(user => {
            return fetchPosts(user.id)
        })
        .catch(error => {
            console.error("No Post Found!", error.message)
            return []
        })
        .then(post => {
            return fetchComments(post[0])
        })
        .catch(error => {
            console.error("No Comments Found!", error.message)
            return []
        })
}


// ============================================
// PART 5: PROMISE UTILITIES
// ============================================

// Promise.all() - Wait for all promises to resolve
const promise1 = Promise.resolve(3);
const promise2 = new Promise(resolve => setTimeout(() => resolve(42), 1000));
const promise3 = Promise.resolve('foo');

Promise.all([promise1, promise2, promise3])
    .then(values => {
        console.log('All resolved:', values); // [3, 42, 'foo']
    });

// ⚠️ If ANY promise rejects, Promise.all() rejects
Promise.all([
    Promise.resolve(1),
    Promise.reject('Error!'),
    Promise.resolve(3)
])
    .catch(error => {
        console.error('Promise.all failed:', error); // 'Error!'
    });

// Promise.race() - Resolves/rejects with the first settled promise
Promise.race([
    new Promise(resolve => setTimeout(() => resolve('slow'), 2000)),
    new Promise(resolve => setTimeout(() => resolve('fast'), 1000))
])
    .then(value => {
        console.log('Winner:', value); // 'fast'
    });

// Promise.allSettled() - Waits for all, never rejects
Promise.allSettled([
    Promise.resolve(1),
    Promise.reject('Error!'),
    Promise.resolve(3)
])
    .then(results => {
        console.log('All settled:', results);
        // [
        //   { status: 'fulfilled', value: 1 },
        //   { status: 'rejected', reason: 'Error!' },
        //   { status: 'fulfilled', value: 3 }
        // ]
    });

// Promise.any() - Resolves with first fulfilled promise
Promise.any([
    Promise.reject('Error 1'),
    Promise.resolve('Success!'),
    Promise.reject('Error 2')
])
    .then(value => {
        console.log('First success:', value); // 'Success!'
    });

// Exercise 4: Use Promise utilities
const urls = [
    'https://api.example.com/users',
    'https://api.example.com/posts',
    'https://api.example.com/comments'
];

// TODO: Fetch all URLs concurrently using Promise.all


// ============================================
// PART 6: REAL-WORLD EXAMPLES
// ============================================

// Example 1: API with retry logic
function fetchWithRetry(url, retries = 3) {
    return fetch(url)
        .catch(error => {
            if (retries > 0) {
                console.log(`Retrying... (${retries} attempts left)`);
                return fetchWithRetry(url, retries - 1);
            }
            throw error;
        });
}

// Example 2: Timeout wrapper
function fetchWithTimeout(url, timeout = 5000) {
    return Promise.race([
        fetch(url),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Request timeout')), timeout)
        )
    ]);
}

// Example 3: Sequential processing
function processItemsSequentially(items) {
    return items.reduce((promise, item) => {
        return promise.then(results => {
            return processItem(item).then(result => {
                return [...results, result];
            });
        });
    }, Promise.resolve([]));
}

// Exercise 5: Implement a rate limiter
// TODO: Create a function that limits API calls to max 2 per second
function rateLimitedFetch(urls, requestsPerSecond = 2) {
    // Your implementation here
}


// ============================================
// PRACTICE PROBLEMS
// ============================================

/**
 * Problem 1: Promisify setTimeout
 * Create a 'delay' function that returns a promise
 */
function delay(ms) {
    // TODO: Implement
}

// Usage: delay(2000).then(() => console.log('2 seconds passed'));


/**
 * Problem 2: Parallel processing with limit
 * Process array items in parallel but limit concurrent operations
 */
function processWithLimit(items, limit, processFn) {
    // TODO: Process items with max 'limit' concurrent operations
}


/**
 * Problem 3: Build a simple cache
 * Cache promise results to avoid redundant API calls
 */
const cache = new Map();

function cachedFetch(url) {
    // TODO: Return cached promise if exists, otherwise fetch and cache
}


/**
 * Problem 4: Promise waterfall
 * Execute promises in sequence, passing result to next
 */
function waterfall(tasks) {
    // tasks is an array of functions that return promises
    // Each function receives the result of the previous one
    // TODO: Implement
}

// Usage:
// waterfall([
//     () => Promise.resolve(1),
//     (val) => Promise.resolve(val + 1),
//     (val) => Promise.resolve(val * 2)
// ]).then(result => console.log(result)); // 4


// ============================================
// INTERVIEW QUESTIONS
// ============================================

/**
 * Q1: What are the three states of a Promise?
 * Answer: [Write your answer here]
 */

/**
 * Q2: What's the difference between .then() and .catch()?
 * Answer: [Write your answer here]
 */

/**
 * Q3: What's the difference between Promise.all() and Promise.race()?
 * Answer: [Write your answer here]
 */

/**
 * Q4: How do you handle errors in promise chains?
 * Answer: [Write your answer here]
 */

/**
 * Q5: What's the output of this code?
 */
Promise.resolve(1)
    .then(x => x + 1)
    .then(x => { throw new Error('Error!') })
    .then(x => x + 1)
    .catch(err => 2)
    .then(x => x + 1)
    .then(x => console.log(x))
    .catch(err => console.error(err));
// What will be logged?


/**
 * Q6: What's wrong with this code?
 */
function badPromiseChain() {
    fetchUser(1)
        .then(user => {
            fetchPosts(user.id); // Missing return!
        })
        .then(posts => {
            console.log(posts); // What will this be?
        });
}


// ============================================
// RUN YOUR CODE
// ============================================

console.log('\n=== Testing Promises ===\n');

// Test your implementations here
