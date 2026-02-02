/**
 * ARRAY METHODS PRACTICE
 * 
 * Practice these methods until you can use them without thinking!
 * Each section has examples + exercises for you to solve.
 */

const users = [
  { id: 1, name: 'Alice', age: 25, active: true },
  { id: 2, name: 'Bob', age: 30, active: false },
  { id: 3, name: 'Charlie', age: 35, active: true },
  { id: 4, name: 'Diana', age: 28, active: true },
  { id: 5, name: 'Eve', age: 22, active: false }
];

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// ==========================================
// 1. MAP - Transform each element
// ==========================================
// Returns: NEW array with same length

// Example: Double all numbers
const doubled = numbers.map(num => num * 2);
// console.log(doubled); // [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

// Example: Get all user names
const names = users.map(user => user.name);
// console.log(names); // ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve']

// 🎯 Exercise 1: Get array of user ages
function getUserAges(users) {
  // Your code here
  return users.map((user) => user.age)
}
// console.log(getUserAges(users)); // [25, 30, 35, 28, 22]

// 🎯 Exercise 2: Square all numbers
function squareNumbers(nums) {
  // Your code here
  return nums.map((num) => num ** 2)
}
// console.log(squareNumbers(numbers)); // [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

// 🎯 Exercise 3: Create array of "Hello, {name}!" strings
function greetUsers(users) {
  // Your code here
  return users.map((user) => `Hello ${user.name}`)
}
// console.log(greetUsers(users)); // ['Hello, Alice!', 'Hello, Bob!', ...]


// ==========================================
// 2. FILTER - Keep elements that pass test
// ==========================================
// Returns: NEW array (possibly shorter)

// Example: Get even numbers
const evens = numbers.filter(num => num % 2 === 0);
// console.log(evens); // [2, 4, 6, 8, 10]

// Example: Get active users
const activeUsers = users.filter(user => user.active);
// console.log(activeUsers); // [Alice, Charlie, Diana]

// 🎯 Exercise 4: Get users older than 25
function getUsersOlderThan25(users) {
  // Your code here
  return users.filter((user) => user.age > 25)
}
// console.log(getUsersOlderThan25(users)); // [Bob, Charlie, Diana]

// 🎯 Exercise 5: Get numbers greater than 5
function getNumbersGreaterThan5(nums) {
  // Your code here
  return nums.filter((num) => num > 5)
}
// console.log(getNumbersGreaterThan5(numbers)); // [6, 7, 8, 9, 10]

// 🎯 Exercise 6: Get inactive users
function getInactiveUsers(users) {
  // Your code here
  return users.filter((user) => user.active === false)
}
// console.log(getInactiveUsers(users)); // [Bob, Eve]


// ==========================================
// 3. REDUCE - Accumulate to single value
// ==========================================
// Returns: SINGLE value (number, string, object, array)

// Example: Sum all numbers
const sum = numbers.reduce((acc, num) => acc + num, 0);
// console.log(sum); // 55

// Example: Find oldest user
const oldest = users.reduce((oldest, user) => 
  user.age > oldest.age ? user : oldest
);
// console.log(oldest); // { id: 3, name: 'Charlie', age: 35, ... }

// 🎯 Exercise 7: Calculate total age of all users
function getTotalAge(users) {
  return users.reduce((total, user) => total + user.age, 0)
}
// console.log(getTotalAge(users)); // 140

// 🎯 Exercise 8: Find the maximum number
function findMax(nums) {
  // Your code here
  return nums.reduce((max, num) => max > num ? max : num)
}
// console.log(findMax(numbers)); // 10

// 🎯 Exercise 9: Count active users
function countActiveUsers(users) {
  return users.reduce((count, user) => user.active ? count + 1 : count, 0)
}
// console.log(countActiveUsers(users)); // 3

// 🎯 Exercise 10: Create object { name: age }
function createNameAgeMap(users) {
  return users.reduce((map, user) => {
    map[user.name] = user.age
    return map
  }, {})
}
// console.log(createNameAgeMap(users));


// ==========================================
// 4. FIND - Get first match
// ==========================================
// Returns: SINGLE element or undefined

// Example: Find user with id 3
const user3 = users.find(user => user.id === 3);
// console.log(user3); // { id: 3, name: 'Charlie', ... }

// 🎯 Exercise 11: Find first even number
function findFirstEven(nums) {
  // Your code here
  return nums.find(num => num % 2 === 0)
}
// console.log(findFirstEven(numbers)); // 2

// 🎯 Exercise 12: Find user named 'Diana'
function findUserByName(users, name) {
  // Your code here
  return users.find(user => user.name === name)
}
// console.log(findUserByName(users, 'Diana')); // { id: 4, name: 'Diana', ... }


// ==========================================
// 5. SOME / EVERY - Boolean checks
// ==========================================
// Returns: true or false

// Example: Are there any active users?
const hasActive = users.some(user => user.active);
// console.log(hasActive); // true

// Example: Are ALL users active?
const allActive = users.every(user => user.active);
// console.log(allActive); // false

// 🎯 Exercise 13: Check if any user is under 25
function hasUserUnder25(users) {
  // Your code here
  return users.some(user => user.age < 25)
}
// console.log(hasUserUnder25(users)); // true

// 🎯 Exercise 14: Check if all numbers are positive
function allPositive(nums) {
  // Your code here
  return nums.every(num => num > 0)
}
// console.log(allPositive(numbers)); // true
// console.log(allPositive([-1, 2, 3])); // false


// ==========================================
// 6. INCLUDES / INDEXOF - Search
// ==========================================

// Example: Does array include 5?
const hasFive = numbers.includes(5);
// console.log(hasFive); // true

// Example: Find index of 5
const indexOfFive = numbers.indexOf(5);
// console.log(indexOfFive); // 4


// ==========================================
// 7. CHAINING - Combine methods
// ==========================================

// Example: Get names of active users over 25
const result = users
  .filter(user => user.active && user.age > 25)
  .map(user => user.name);
// console.log(result); // ['Charlie', 'Diana']

// 🎯 Exercise 15: Get sum of ages of active users
function getSumOfActiveAges(users) {
  // Your code here (use filter + reduce)
  return users.filter(user => user.active).reduce((sum, user) => sum + user.age, 0)
}
// console.log(getSumOfActiveAges(users)); // 88 (25 + 35 + 28)

// 🎯 Exercise 16: Get doubled even numbers
function getDoubledEvens(nums) {
  // Your code here (use filter + map)
  return nums.filter(num => num % 2 === 0).map(num => num * 2)
}
// console.log(getDoubledEvens(numbers)); // [4, 8, 12, 16, 20]


// ==========================================
// 8. SORT - Arrange elements
// ==========================================
// ⚠️ MUTATES original array! Use [...arr].sort() to avoid mutation

// Example: Sort numbers ascending
const sortedAsc = [...numbers].sort((a, b) => a - b);
// console.log(sortedAsc); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Example: Sort numbers descending
const sortedDesc = [...numbers].sort((a, b) => b - a);
// console.log(sortedDesc); // [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

// 🎯 Exercise 17: Sort users by age (youngest first)
function sortByAge(users) {
  // Your code here
  return [...users].sort((a, b) => a.age - b.age)
}
// console.log(sortByAge(users).map(u => u.name)); // ['Eve', 'Alice', 'Diana', 'Bob', 'Charlie']


// ==========================================
// QUICK REFERENCE
// ==========================================
/*
| Method   | Returns          | Mutates? | Use For                    |
|----------|------------------|----------|----------------------------|
| map      | New array (same) | No       | Transform each element     |
| filter   | New array (less) | No       | Keep matching elements     |
| reduce   | Single value     | No       | Accumulate/combine         |
| find     | Single element   | No       | Get first match            |
| some     | Boolean          | No       | Check if ANY match         |
| every    | Boolean          | No       | Check if ALL match         |
| includes | Boolean          | No       | Check if value exists      |
| indexOf  | Number (-1 if no)| No       | Find position              |
| sort     | Same array       | YES ⚠️   | Arrange order              |
| forEach  | undefined        | No       | Loop with side effects     |
*/


// ==========================================
// TEST YOUR SOLUTIONS
// ==========================================
// Uncomment to test:

// console.log('--- MAP ---');
// console.log(getUserAges(users));
// console.log(squareNumbers(numbers));
// console.log(greetUsers(users));

// console.log('--- FILTER ---');
// console.log(getUsersOlderThan25(users));
// console.log(getNumbersGreaterThan5(numbers));
// console.log(getInactiveUsers(users));

// console.log('--- REDUCE ---');
// console.log(getTotalAge(users));
// console.log(findMax(numbers));
// console.log(countActiveUsers(users));
// console.log(createNameAgeMap(users));

// console.log('--- FIND ---');
// console.log(findFirstEven(numbers));
// console.log(findUserByName(users, 'Diana'));

// console.log('--- SOME/EVERY ---');
// console.log(hasUserUnder25(users));
// console.log(allPositive(numbers));

// console.log('--- CHAINING ---');
// console.log(getSumOfActiveAges(users));
// console.log(getDoubledEvens(numbers));

// console.log('--- SORT ---');
// console.log(sortByAge(users));
