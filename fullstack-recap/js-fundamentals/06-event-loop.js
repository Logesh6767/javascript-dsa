/**
 * DAY 6: EVENT LOOP & ASYNCHRONOUS JavaScript
 * 
 * Topics: Call stack, Event loop, Callback queue,
 * Microtasks vs Macrotasks, setTimeout, setInterval
 */

// PART 1: CALL STACK BASICS

console.log('1');

function first() {
    console.log('2');
    second();
    console.log('4');
}

function second() {
    console.log('3');
}

first();
console.log('5');
// Output: 1, 2, 3, 4, 5

// PART 2: ASYNCHRONOUS EXECUTION

console.log('Start');

setTimeout(() => {
    console.log('Timeout');
}, 0);

Promise.resolve().then(() => {
    console.log('Promise');
});

console.log('End');
// Output: Start, End, Promise, Timeout

// PART 3: MICROTASKS VS MACROTASKS

// Macrotasks: setTimeout, setInterval, setImmediate
// Microtasks: Promises, queueMicrotask, process.nextTick

console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve()
    .then(() => console.log('3'))
    .then(() => console.log('4'));

console.log('5');
// Output: 1, 5, 3, 4, 2

// PART 4: REAL-WORLD PATTERNS

// Pattern 1: Debounce
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Pattern 2: Throttle
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Pattern 3: SetInterval with cleanup
function startTimer() {
    let count = 0;
    const intervalId = setInterval(() => {
        count++;
        console.log(count);
        if (count === 5) {
            clearInterval(intervalId);
        }
    }, 1000);
}

// EXERCISES

// Exercise 1: Predict output
console.log('A');
setTimeout(() => console.log('B'), 1000);
setTimeout(() => console.log('C'), 0);
Promise.resolve().then(() => console.log('D'));
console.log('E');
// What's the order?

// Exercise 2: Implement async forEach
async function asyncForEach(array, callback) {
    // TODO: Execute callback for each element with proper async handling
}

// Exercise 3: Request scheduler
class RequestScheduler {
    constructor(maxConcurrent) {
        // TODO: Implement request queuing with concurrency limit
    }
    
    async add(requestFn) {
        // TODO: Add request to queue
    }
}

// INTERVIEW QUESTIONS

/**
 * Q1: Explain the event loop
 * Q2: What's the difference between microtasks and macrotasks?
 * Q3: What's the output?
 */
async function async1() {
    console.log('1');
    await async2();
    console.log('2');
}

async function async2() {
    console.log('3');
}

console.log('4');
setTimeout(() => console.log('5'), 0);
async1();
new Promise(resolve => {
    console.log('6');
    resolve();
}).then(() => console.log('7'));
console.log('8');

console.log('\n=== Testing Event Loop ===\n');
