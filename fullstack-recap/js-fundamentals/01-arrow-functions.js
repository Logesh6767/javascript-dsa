/**
 * DAY 1: ARROW FUNCTIONS & THIS BINDING
 * 
 * Topics Covered:
 * 1. Arrow function syntax
 * 2. Implicit vs explicit return
 * 3. Lexical 'this' binding
 * 4. When NOT to use arrow functions
 * 5. Arrow functions in callbacks
 */

// ============================================
// PART 1: BASIC SYNTAX
// ============================================

// Regular function
function regularAdd(a, b) {
    return a + b;
}

// Arrow function - full syntax
const arrowAdd = (a, b) => {
    return a + b;
};

// Arrow function - implicit return (one-liner)
const arrowAddShort = (a, b) => a + b;

// Single parameter - parentheses optional
const square = x => x * x;

// No parameters - parentheses required
const greet = () => console.log('Hello!');

// Exercise 1: Convert these regular functions to arrow functions
// TODO: Implement these
const multiply = function(a, b) {
    return a * b;
};

const isEven = function(num) {
    return num % 2 === 0;
};

const logMessage = function() {
    console.log('This is a message');
};

// Exercise 1: Solutions
console.log('Exercise 1: Solutions')
const multiplyArrow = (a, b) => a + b;
console.log('multiplyArrow', multiplyArrow(1,2))

const isEvenArrow = num => num % 2 === 0;
console.log('isEvenArrow', isEvenArrow(6))

const logMessageArrow = () => console.log('This is a message');
console.log('logMessageArrow', logMessageArrow())
console.log('Exercise 1: Ends!')

// ============================================
// PART 2: RETURNING OBJECTS
// ============================================

// Wrong - this will be interpreted as a code block
// const makePerson = (name, age) => { name: name, age: age };

// Correct - wrap object in parentheses
const makePerson = (name, age) => ({ name, age });

// Exercise 2: Create an arrow function that returns an object
// TODO: Create a function 'makeUser' that takes username and email
// and returns an object with these properties
const makeUser = (username, email) => ({username, email});

// ============================================
// PART 3: THIS BINDING - THE BIG DIFFERENCE
// ============================================

// Regular functions have their own 'this'
const regularObject = {
    name: 'Regular',
    regularMethod: function() {
        console.log('Regular this:', this.name);
    }
};

// Arrow functions inherit 'this' from parent scope
const arrowObject = {
    name: 'Arrow',
    arrowMethod: () => {
        console.log('Arrow this:', this.name); // 'this' is from global scope!
    }
};

// Test the difference
regularObject.regularMethod(); // Works: "Regular"
arrowObject.arrowMethod();     // Doesn't work as expected: undefined

// ============================================
// PART 4: REAL-WORLD EXAMPLE - EVENT HANDLERS
// ============================================

class Counter {
    constructor() {
        this.count = 0;
    }

    // Regular function - 'this' depends on how it's called
    incrementRegular() {
        setTimeout(function() {
            this.count++; // 'this' is undefined or window!
            console.log('Regular:', this.count);
        }, 1000);
    }

    // Arrow function - 'this' is lexically bound
    incrementArrow() {
        setTimeout(() => {
            this.count++; // 'this' refers to Counter instance
            console.log('Arrow:', this.count);
        }, 1000);
    }

    // Old way to fix regular function
    incrementWithBind() {
        setTimeout(function() {
            this.count++;
            console.log('Bind:', this.count);
        }.bind(this), 1000);
    }
}

// Exercise 3: Test the counter
// TODO: Create a Counter instance and test all three methods
// const counter = new Counter();
class Counter2 {
    constructor(num, word) {
        this.num = num
        this.word = word
    }
    showNumber() {
         console.log("show number", this.num)
         setTimeout(() => {
            console.log("show word", this. word)
         }, 1000)
    }
    increamentNumber() {
        this.num++
        console.log("show number", this.num)
    }
}
const counter1 = new Counter2(45645, 'four-five-six-four-five')
counter1.showNumber()
counter1.increamentNumber()
// console.log(counter1)

// ============================================
// PART 5: WHEN NOT TO USE ARROW FUNCTIONS
// ============================================

// ❌ BAD: As object methods
const calculator = {
    value: 0,
    add: (x) => {
        this.value += x; // 'this' doesn't refer to calculator!
        return this.value;
    }
};

// ✅ GOOD: Use regular functions for object methods
const calculatorFixed = {
    value: 0,
    add(x) {
        this.value += x;
        return this.value;
    }
};

// ❌ BAD: As constructors
// const Person = (name) => {
//     this.name = name; // Arrow functions can't be constructors!
// };
// new Person('John'); // TypeError

// ✅ GOOD: Use regular function or class
function Person(name) {
    this.name = name;
}

// ❌ BAD: When you need 'arguments' object
const arrowWithArgs = () => {
    console.log(arguments); // ReferenceError: arguments is not defined
};

// ✅ GOOD: Use regular function or rest parameters
const regularWithArgs = function() {
    console.log(arguments);
};

const arrowWithRest = (...args) => {
    console.log(args); // This works!
};

// Exercise 4: Fix this broken code
// TODO: Convert the arrow function to a regular function
const user = {
    name: 'Alice',
    hobbies: ['reading', 'coding'],
    showHobbies: () => {
        this.hobbies.forEach(hobby => {
            console.log(`${this.name} likes ${hobby}`);
        });
    }
};
//My Answer:
const userFix = {
    name: 'Alice',
    hobbies: ['reading', 'coding'],
    showHobbies() {
        this.hobbies.forEach(hobby => {
            console.log(`${this.name} likes ${hobby}`);
        });
    }
};


// ============================================
// PART 6: ARROW FUNCTIONS IN ARRAY METHODS
// ============================================

const numbers = [1, 2, 3, 4, 5];

// Map with arrow function
const doubled = numbers.map(num => num * 2);

// Filter with arrow function
const evens = numbers.filter(num => num % 2 === 0);

// Reduce with arrow function
const sum = numbers.reduce((acc, num) => acc + num, 0);

// Exercise 5: Use arrow functions with array methods
const products = [
    { name: 'Laptop', price: 1000 },
    { name: 'Phone', price: 500 },
    { name: 'Tablet', price: 300 }
];

// TODO: Get all product names
// const productNames = null;
//Answer
const productNames = products.map(product => product.name);
console.log("productNames", productNames)

// TODO: Get products under $600
// const affordable = null;
const affordable = products.filter(product => product.price <= 600 );
console.log("affordable", affordable)

// TODO: Calculate total price
// const totalPrice = null;
const totalPrice = products.reduce((total, product) => total + product.price, 0);
console.log("totalPrice", totalPrice)

// ============================================
// PRACTICE PROBLEMS
// ============================================

/**
 * Problem 1: Create a function that returns a function
 * multiplier(x) should return a function that multiplies its argument by x
 * Example: const double = multiplier(2); double(5) // 10
 */
// TODO: Implement multiplier using arrow functions
const multiplier = (num) => {
    return (num2) => {
        return num * num2
    }
}
const double = multiplier(2);
double(5) 

/**
 * Problem 2: Fix the timer
 * The timer should log the seconds elapsed, but 'this' isn't working
 */
class Timer {
    constructor() {
        this.seconds = 0;
    }

    start() {
        // TODO: Fix this using arrow function
        setInterval(function() {
            this.seconds++;
            console.log(this.seconds);
        }, 1000);
    }
}
class TimerAnswer {
    constructor() {
        this.seconds = 0;
    }

    start() {
        // TODO: Fix this using arrow function
        setInterval(() => {
            this.seconds++;
            console.log(this.seconds);
        }, 1000);
    }
}

/**
 * Problem 3: Chain array operations
 * Given an array of numbers, use arrow functions to:
 * 1. Filter out numbers less than 10
 * 2. Square the remaining numbers
 * 3. Sum them up
 */
const nums = [5, 12, 8, 130, 44, 3, 15];
// TODO: Implement using method chaining with arrow functions
const answer = nums
    .filter(num => num > 10)
    .map(num => num ** 2)
    .reduce((total, num) => total + num, 0)

/**
 * Problem 4: Create a curry function
 * Create an add function that can be called like:
 * add(1)(2)(3) // 6
 */
// TODO: Implement using arrow functions
const add = (num) => {
    return (num2) => {
        return (num3) => {
            return num + num2 + num3
        }
    }
}
const add2 = a => b => c => a + b + c
add(1)(2)(3)
// ============================================
// INTERVIEW QUESTIONS
// ============================================

/**
 * Q1: What's the difference between arrow functions and regular functions?
 * Answer: 
    * Syntax: Arrow functions use => syntax and are more concise. They support implicit returns for single expressions.

    this binding:
    Regular functions have their own this (dynamic, based on how they're called)
    Arrow functions inherit this from parent scope (lexical binding)

    arguments object:
    Regular functions have access to arguments object
    Arrow functions don't have arguments (use rest parameters instead)

    Constructor:
    Regular functions can be used with new keyword as constructors
    Arrow functions cannot be constructors (will throw TypeError)

    Use cases:
    Arrow functions: callbacks, array methods, promises, when you need to preserve this
    Regular functions: object methods, constructors, when you need dynamic this
 */

/**
 * Q2: When should you NOT use arrow functions?
 * Answer: [Write your answer here]
 */

/**
 * Q3: What does 'this' refer to in an arrow function?
 * Answer: [Write your answer here]
 */

/**
 * Q4: Can arrow functions be used as constructors? Why or why not?
 * Answer: [Write your answer here]
 */

/**
 * Q5: What's the output of this code?
 */
const obj = {
    name: 'Object',
    regular: function() {
        setTimeout(function() {
            console.log(this.name);
        }, 100);
    },
    arrow: function() {
        setTimeout(() => {
            console.log(this.name);
        }, 100);
    }
};
// obj.regular(); // ?
// obj.arrow();   // ?

// ============================================
// RUN YOUR CODE
// ============================================

console.log('\n=== Testing Arrow Functions ===\n');

// Test your implementations here
