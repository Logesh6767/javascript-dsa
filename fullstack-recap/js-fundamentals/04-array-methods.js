/**
 * DAY 4: ARRAY METHODS (map, filter, reduce, etc.)
 * 
 * Topics Covered:
 * 1. Transformation: map()
 * 2. Filtering: filter()
 * 3. Reduction: reduce()
 * 4. Search: find(), findIndex(), some(), every()
 * 5. Iteration: forEach()
 * 6. Chaining methods
 * 7. Performance considerations
 */

// ============================================
// PART 1: MAP - TRANSFORMATION
// ============================================

/**
 * map() creates a new array by transforming each element
 * Returns array of same length
 */

const numbers = [1, 2, 3, 4, 5];

// Basic map
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// Map with index
const withIndex = numbers.map((num, index) => `${index}: ${num}`);
console.log(withIndex); // ['0: 1', '1: 2', ...]

// Map objects
const users = [
    { id: 1, name: 'John', age: 25 },
    { id: 2, name: 'Jane', age: 30 },
    { id: 3, name: 'Bob', age: 35 }
];

const names = users.map(user => user.name);
const userIds = users.map(user => user.id);

// Transform objects
const usersWithEmail = users.map(user => ({
    ...user,
    email: `${user.name.toLowerCase()}@example.com`
}));

// Exercise 1: Map transformations
const products = [
    { name: 'Laptop', price: 1000, tax: 0.1 },
    { name: 'Phone', price: 500, tax: 0.1 },
    { name: 'Tablet', price: 300, tax: 0.1 }
];

// TODO: Create array of product names


// TODO: Create array with final prices (price + tax)


// TODO: Create array of objects with { name, finalPrice }



// ============================================
// PART 2: FILTER - SELECTION
// ============================================

/**
 * filter() creates new array with elements that pass test
 * Returns array of same or shorter length
 */

// Basic filter
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens); // [2, 4]

// Filter objects
const adults = users.filter(user => user.age >= 30);
const youngUsers = users.filter(user => user.age < 30);

// Multiple conditions
const specificUsers = users.filter(user => {
    return user.age > 25 && user.name.startsWith('J');
});

// Exercise 2: Filter practice
const transactions = [
    { id: 1, amount: 100, type: 'credit' },
    { id: 2, amount: 50, type: 'debit' },
    { id: 3, amount: 200, type: 'credit' },
    { id: 4, amount: 75, type: 'debit' }
];

// TODO: Get all credit transactions


// TODO: Get transactions over $100


// TODO: Get debit transactions under $100



// ============================================
// PART 3: REDUCE - AGGREGATION
// ============================================

/**
 * reduce() reduces array to single value
 * Most powerful and flexible method
 */

// Sum all numbers
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum); // 15

// With detailed syntax
const sumDetailed = numbers.reduce((accumulator, currentValue) => {
    console.log(`Acc: ${accumulator}, Current: ${currentValue}`);
    return accumulator + currentValue;
}, 0); // 0 is initial value

// Product of all numbers
const product = numbers.reduce((acc, num) => acc * num, 1);

// Max value
const max = numbers.reduce((max, num) => num > max ? num : max, numbers[0]);

// Build object from array
const userMap = users.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
}, {});

// Count occurrences
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
const fruitCount = fruits.reduce((acc, fruit) => {
    acc[fruit] = (acc[fruit] || 0) + 1;
    return acc;
}, {});

// Group by property
const groupedByAge = users.reduce((acc, user) => {
    const key = user.age >= 30 ? 'senior' : 'junior';
    if (!acc[key]) acc[key] = [];
    acc[key].push(user);
    return acc;
}, {});

// Exercise 3: Reduce challenges
const orders = [
    { id: 1, amount: 100, status: 'completed' },
    { id: 2, amount: 50, status: 'pending' },
    { id: 3, amount: 200, status: 'completed' },
    { id: 4, amount: 75, status: 'cancelled' }
];

// TODO: Calculate total of completed orders


// TODO: Group orders by status


// TODO: Get average order amount



// ============================================
// PART 4: FIND & SEARCH METHODS
// ============================================

// find() - returns first match or undefined
const firstAdult = users.find(user => user.age >= 30);
const nonExistent = users.find(user => user.age > 100); // undefined

// findIndex() - returns index or -1
const adultIndex = users.findIndex(user => user.age >= 30);

// some() - returns true if ANY element passes test
const hasAdults = users.some(user => user.age >= 30); // true
const hasKids = users.some(user => user.age < 18); // false

// every() - returns true if ALL elements pass test
const allAdults = users.every(user => user.age >= 18);
const allYoung = users.every(user => user.age < 50);

// includes() - check if value exists
const hasThree = numbers.includes(3); // true
const hasTen = numbers.includes(10); // false

// Exercise 4: Search methods
const inventory = [
    { id: 1, name: 'Laptop', stock: 5, price: 1000 },
    { id: 2, name: 'Phone', stock: 0, price: 500 },
    { id: 3, name: 'Tablet', stock: 3, price: 300 }
];

// TODO: Find product with id 2


// TODO: Check if any product is out of stock


// TODO: Check if all products are under $2000


// TODO: Find index of out-of-stock item



// ============================================
// PART 5: METHOD CHAINING
// ============================================

// Combining methods for complex operations
const result = numbers
    .filter(num => num % 2 === 0)  // Get evens: [2, 4]
    .map(num => num * 2)           // Double them: [4, 8]
    .reduce((sum, num) => sum + num, 0); // Sum: 12

// Real-world example
const orderSummary = orders
    .filter(order => order.status === 'completed')
    .map(order => order.amount)
    .reduce((total, amount) => total + amount, 0);

// Complex chain
const processedUsers = users
    .filter(user => user.age >= 25)
    .map(user => ({
        ...user,
        category: user.age >= 30 ? 'senior' : 'junior'
    }))
    .reduce((acc, user) => {
        if (!acc[user.category]) acc[user.category] = [];
        acc[user.category].push(user);
        return acc;
    }, {});

// Exercise 5: Method chaining
const students = [
    { name: 'Alice', grade: 85, subject: 'Math' },
    { name: 'Bob', grade: 75, subject: 'Math' },
    { name: 'Charlie', grade: 95, subject: 'Science' },
    { name: 'David', grade: 65, subject: 'Math' }
];

// TODO: Get average grade of Math students who scored above 70



// ============================================
// PART 6: FOREACH VS MAP
// ============================================

// forEach() - for side effects (doesn't return anything)
numbers.forEach(num => {
    console.log(num);
});

const result2 = numbers.forEach(num => num * 2);
console.log(result2); // undefined!

// map() - for transformations (returns new array)
const doubled2 = numbers.map(num => num * 2);
console.log(doubled2); // [2, 4, 6, 8, 10]

// ❌ Wrong: Using forEach when you need transformation
const doubled3 = [];
numbers.forEach(num => {
    doubled3.push(num * 2);
});

// ✅ Right: Use map for transformations
const doubled4 = numbers.map(num => num * 2);


// ============================================
// PART 7: PERFORMANCE CONSIDERATIONS
// ============================================

// ❌ Less efficient: Multiple iterations
const evenDoubledSum = numbers
    .filter(num => num % 2 === 0)  // Iteration 1
    .map(num => num * 2)           // Iteration 2
    .reduce((sum, num) => sum + num, 0); // Iteration 3

// ✅ More efficient: Single reduce
const evenDoubledSum2 = numbers.reduce((sum, num) => {
    if (num % 2 === 0) {
        return sum + (num * 2);
    }
    return sum;
}, 0);

// When readability matters more, chaining is fine
// When performance is critical, use single reduce


// ============================================
// PRACTICE PROBLEMS
// ============================================

/**
 * Problem 1: Data transformation pipeline
 * Transform raw data into desired format
 */
const rawData = [
    { id: 1, name: 'John Doe', purchases: [100, 200, 150] },
    { id: 2, name: 'Jane Smith', purchases: [50, 75] },
    { id: 3, name: 'Bob Johnson', purchases: [300, 400, 200, 100] }
];

// TODO: Create array with { name, totalSpent, avgPurchase }



/**
 * Problem 2: Filter and sort
 */
const employees = [
    { name: 'Alice', department: 'Engineering', salary: 100000 },
    { name: 'Bob', department: 'Sales', salary: 80000 },
    { name: 'Charlie', department: 'Engineering', salary: 120000 },
    { name: 'David', department: 'Sales', salary: 75000 }
];

// TODO: Get Engineering employees sorted by salary (high to low)



/**
 * Problem 3: Nested array operations
 */
const classes = [
    { name: 'Math', students: [{ name: 'Alice', score: 85 }, { name: 'Bob', score: 92 }] },
    { name: 'Science', students: [{ name: 'Charlie', score: 78 }, { name: 'David', score: 88 }] }
];

// TODO: Get all students with scores above 80 (flatten and filter)



/**
 * Problem 4: Custom reduce - implement groupBy
 */
function groupBy(array, key) {
    // TODO: Group array elements by the specified key
}

// Usage: groupBy(users, 'age')


/**
 * Problem 5: Implement map using reduce
 */
function customMap(array, transformFn) {
    // TODO: Implement map functionality using reduce
}


// ============================================
// INTERVIEW QUESTIONS
// ============================================

/**
 * Q1: What's the difference between map() and forEach()?
 * Answer: 
 */

/**
 * Q2: When would you use reduce() instead of map() or filter()?
 * Answer: 
 */

/**
 * Q3: What does this return?
 */
const arr = [1, 2, 3];
const result3 = arr.map(x => {
    x * 2;
});
console.log(result3); // ?


/**
 * Q4: How do you flatten a nested array?
 */
const nested = [[1, 2], [3, 4], [5, 6]];
// Write two solutions


/**
 * Q5: What's the difference between find() and filter()?
 * Answer: 
 */

/**
 * Q6: Fix this code
 */
const nums = [1, 2, 3, 4, 5];
const sumOfEvens = nums
    .filter(n => n % 2 === 0)
    .forEach((n, sum) => sum + n); // What's wrong?


/**
 * Q7: Implement these array methods from scratch
 */
Array.prototype.myMap = function(callback) {
    // TODO: Implement map
};

Array.prototype.myFilter = function(callback) {
    // TODO: Implement filter
};

Array.prototype.myReduce = function(callback, initialValue) {
    // TODO: Implement reduce
};


// ============================================
// REAL-WORLD EXAMPLES
// ============================================

// Example 1: Data aggregation for dashboard
const salesData = [
    { date: '2024-01', revenue: 10000, expenses: 6000 },
    { date: '2024-02', revenue: 12000, expenses: 7000 },
    { date: '2024-03', revenue: 15000, expenses: 8000 }
];

const summary = salesData.reduce((acc, month) => {
    acc.totalRevenue += month.revenue;
    acc.totalExpenses += month.expenses;
    acc.profit += (month.revenue - month.expenses);
    return acc;
}, { totalRevenue: 0, totalExpenses: 0, profit: 0 });

// Example 2: Normalize API response
const apiResponse = [
    { userId: 1, userName: 'John', postId: 101, postTitle: 'Post 1' },
    { userId: 1, userName: 'John', postId: 102, postTitle: 'Post 2' },
    { userId: 2, userName: 'Jane', postId: 103, postTitle: 'Post 3' }
];

const normalized = apiResponse.reduce((acc, item) => {
    if (!acc[item.userId]) {
        acc[item.userId] = {
            id: item.userId,
            name: item.userName,
            posts: []
        };
    }
    acc[item.userId].posts.push({
        id: item.postId,
        title: item.postTitle
    });
    return acc;
}, {});


// ============================================
// RUN YOUR CODE
// ============================================

console.log('\n=== Testing Array Methods ===\n');

// Test your implementations here
