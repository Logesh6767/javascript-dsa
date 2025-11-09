/**
 * DAY 5: CLOSURES & SCOPE
 * 
 * Topics: Lexical scope, Closure patterns, Module pattern, 
 * Private variables, IIFE, Common interview questions
 */

// PART 1: UNDERSTANDING SCOPE
// Global, Function, Block scope

let globalVar = 'global';

function outerFunction() {
    let outerVar = 'outer';
    
    function innerFunction() {
        let innerVar = 'inner';
        console.log(globalVar, outerVar, innerVar); // Access all
    }
    
    innerFunction();
    // console.log(innerVar); // Error: innerVar not accessible
}

// PART 2: CLOSURES - THE CONCEPT
function makeCounter() {
    let count = 0; // Private variable
    
    return function() {
        count++;
        return count;
    };
}

const counter1 = makeCounter();
console.log(counter1()); // 1
console.log(counter1()); // 2

const counter2 = makeCounter();
console.log(counter2()); // 1 (separate closure)

// PART 3: PRACTICAL CLOSURE PATTERNS

// Pattern 1: Private variables
function createBankAccount(initialBalance) {
    let balance = initialBalance; // Private
    
    return {
        deposit(amount) {
            balance += amount;
            return balance;
        },
        withdraw(amount) {
            if (amount <= balance) {
                balance -= amount;
                return balance;
            }
            return 'Insufficient funds';
        },
        getBalance() {
            return balance;
        }
    };
}

// Pattern 2: Function factory
function multiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

const double = multiplier(2);
const triple = multiplier(3);

// Pattern 3: Module pattern
const calculator = (function() {
    let result = 0; // Private
    
    return {
        add(n) {
            result += n;
            return this;
        },
        subtract(n) {
            result -= n;
            return this;
        },
        getResult() {
            return result;
        }
    };
})();

// PART 4: COMMON PITFALLS

// ❌ Problem: Loop with var
for (var i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i); // 3, 3, 3 (not 0, 1, 2)
    }, 1000);
}

// ✅ Solution 1: Use let
for (let i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i); // 0, 1, 2
    }, 1000);
}

// ✅ Solution 2: IIFE
for (var i = 0; i < 3; i++) {
    (function(j) {
        setTimeout(function() {
            console.log(j); // 0, 1, 2
        }, 1000);
    })(i);
}

// EXERCISES

// Exercise 1: Create a secret keeper
function secretKeeper(secret) {
    // TODO: Return object with getSecret() and changeSecret() methods
}

// Exercise 2: Rate limiter
function rateLimiter(fn, limit, interval) {
    // TODO: Return function that limits calls to 'limit' per 'interval'
}

// Exercise 3: Memoization
function memoize(fn) {
    // TODO: Cache function results
}

// INTERVIEW QUESTIONS

/**
 * Q1: What is a closure?
 * Q2: What's the output?
 */
function outer() {
    let count = 0;
    return function inner() {
        count++;
        console.log(count);
    };
}

const fn = outer();
fn(); // ?
fn(); // ?

/**
 * Q3: Fix this code
 */
const functions = [];
for (var i = 0; i < 3; i++) {
    functions.push(function() {
        return i;
    });
}
console.log(functions[0]()); // Should be 0, but is 3

// Test your code
console.log('\n=== Testing Closures ===\n');
