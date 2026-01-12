# JavaScript Interview Questions

## Table of Contents
1. [Fundamentals](#fundamentals)
2. [Functions & Closures](#functions--closures)
3. [Async Programming](#async-programming)
4. [Array Methods](#array-methods)
5. [ES6+ Features](#es6-features)
6. [Advanced Topics](#advanced-topics)

## Fundamentals

### Q1: What are the different data types in JavaScript?
**Answer**: Primitive types: string, number, boolean, null, undefined, symbol, bigint. Reference type: object (including arrays, functions).

### Q2: What's the difference between `==` and `===`?
**Answer**: `==` performs type coercion, `===` checks both value and type.
```javascript
'5' == 5   // true
'5' === 5  // false
```

### Q3: What is hoisting?
**Answer**: Variable and function declarations are moved to the top of their scope during compilation.

### Q4: What's the difference between `let`, `const`, and `var`?
**Answer**:
- `var`: Function-scoped, hoisted, can be redeclared
- `let`: Block-scoped, not hoisted to usable state, can't be redeclared
- `const`: Block-scoped, must be initialized, can't be reassigned

## Functions & Closures

### Q5: What is a closure?
**Answer**: A closure is a function that has access to variables from its outer scope, even after the outer function has returned.

```javascript
function outer() {
    let count = 0;
    return function inner() {
        count++;
        return count;
    };
}
```

### Q6: What is `this` keyword?
**Answer**: `this` refers to the object that is executing the current function. Its value depends on how the function is called.

### Q7: Difference between arrow functions and regular functions?
**Answer**:
- No own `this` (lexical binding)
- Can't be used as constructors
- No `arguments` object
- Implicit return for one-liners

## Async Programming

### Q8: What is the Event Loop?
**Answer**: The event loop handles asynchronous operations in JavaScript. It continuously checks the call stack and task queues, executing tasks when the call stack is empty.

### Q9: What's the difference between Promises and async/await?
**Answer**: async/await is syntactic sugar over Promises, making async code look synchronous.

### Q10: What's the difference between microtasks and macrotasks?
**Answer**:
- Microtasks: Promises, queueMicrotask (higher priority)
- Macrotasks: setTimeout, setInterval (lower priority)

```javascript
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// Output: 1, 4, 3, 2
```

### Q11: How do you handle errors in Promises?
**Answer**: Using `.catch()` for promise chains or `try-catch` with async/await.

### Q12: What is Promise.all() vs Promise.race()?
**Answer**:
- `Promise.all()`: Waits for all promises, fails if any fails
- `Promise.race()`: Resolves/rejects with the first settled promise

## Array Methods

### Q13: Explain map, filter, and reduce
**Answer**:
- `map()`: Transform each element, returns new array of same length
- `filter()`: Select elements matching condition, returns new array
- `reduce()`: Reduce array to single value

### Q14: What's the difference between forEach and map?
**Answer**: `forEach` doesn't return anything, `map` returns new array. Use `map` for transformations, `forEach` for side effects.

### Q15: How do you flatten a nested array?
**Answer**:
```javascript
// Method 1: flat()
[1, [2, [3, 4]]].flat(2); // [1, 2, 3, 4]

// Method 2: reduce + concat
arr.reduce((acc, val) => acc.concat(val), []);

// Method 3: flatMap (one level)
arr.flatMap(x => x);
```

## ES6+ Features

### Q16: What is destructuring?
**Answer**: Extracting values from arrays/objects into variables.
```javascript
const [a, b] = [1, 2];
const { name, age } = { name: 'John', age: 30 };
```

### Q17: What is the spread operator?
**Answer**: Expands iterables into individual elements.
```javascript
const arr2 = [...arr1, 4, 5];
const obj2 = { ...obj1, c: 3 };
```

### Q18: What are template literals?
**Answer**: String literals allowing embedded expressions and multi-line strings.
```javascript
const name = 'John';
console.log(`Hello, ${name}!`);
```

### Q19: What are default parameters?
**Answer**: Function parameters with default values.
```javascript
function greet(name = 'Guest') {
    return `Hello, ${name}`;
}
```

## Advanced Topics

### Q20: What is prototypal inheritance?
**Answer**: Objects can inherit properties from other objects through the prototype chain.

### Q21: What is event delegation?
**Answer**: Attaching a single event listener to a parent element to handle events for multiple children.

### Q22: What is debouncing and throttling?
**Answer**:
- **Debouncing**: Delays function execution until after a wait period
- **Throttling**: Limits function execution to once per time interval

### Q23: What is memoization?
**Answer**: Caching function results to avoid redundant calculations.

```javascript
function memoize(fn) {
    const cache = {};
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache[key]) return cache[key];
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}
```

### Q24: Explain call, apply, and bind
**Answer**:
- `call(thisArg, arg1, arg2, ...)`: Invokes function with specified `this`
- `apply(thisArg, [args])`: Like call but args as array
- `bind(thisArg)`: Returns new function with bound `this`

### Q25: What is currying?
**Answer**: Converting a function with multiple arguments into a sequence of functions each taking a single argument.

```javascript
const add = a => b => c => a + b + c;
add(1)(2)(3); // 6
```

## Coding Challenges

### Challenge 1: Implement Promise.all
```javascript
function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        const results = [];
        let completed = 0;
        
        promises.forEach((promise, index) => {
            Promise.resolve(promise)
                .then(result => {
                    results[index] = result;
                    completed++;
                    if (completed === promises.length) {
                        resolve(results);
                    }
                })
                .catch(reject);
        });
    });
}
```

### Challenge 2: Deep Clone Object
```javascript
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof Array) return obj.map(item => deepClone(item));
    
    const cloned = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloned[key] = deepClone(obj[key]);
        }
    }
    return cloned;
}
```

### Challenge 3: Implement debounce
```javascript
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}
```

### Challenge 4: Flatten object
```javascript
function flattenObject(obj, prefix = '') {
    return Object.keys(obj).reduce((acc, key) => {
        const newKey = prefix ? `${prefix}.${key}` : key;
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            Object.assign(acc, flattenObject(obj[key], newKey));
        } else {
            acc[newKey] = obj[key];
        }
        return acc;
    }, {});
}
```

## Quick Reference

### Common Patterns
1. **Module Pattern**: Encapsulate private state
2. **Factory Pattern**: Create objects without constructor
3. **Observer Pattern**: Subscribe to events
4. **Singleton Pattern**: Single instance of class

### Best Practices
- Use `const` by default, `let` when needed
- Prefer arrow functions for callbacks
- Use async/await over promise chains
- Use array methods over loops
- Handle errors properly
- Write pure functions when possible

### Performance Tips
- Minimize DOM manipulation
- Use event delegation
- Debounce/throttle expensive operations
- Lazy load resources
- Avoid memory leaks (clear timers, remove listeners)
