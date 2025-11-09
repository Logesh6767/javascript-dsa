/**
 * DAY 10: DESTRUCTURING & SPREAD/REST
 * Topics: Array destructuring, Object destructuring,
 * Default values, Nested destructuring, Spread operator, Rest parameters
 */

// PART 1: ARRAY DESTRUCTURING
const arr = [1, 2, 3, 4, 5];
const [first, second, ...rest] = arr;

// Skip elements
const [a, , c] = arr; // 1, 3

// Default values
const [x, y, z = 0] = [1, 2];

// PART 2: OBJECT DESTRUCTURING
const user = { name: 'John', age: 30, city: 'NYC' };
const { name, age } = user;

// Rename variables
const { name: userName, age: userAge } = user;

// Default values
const { email = 'no-email' } = user;

// Nested destructuring
const data = {
    user: {
        name: 'Alice',
        address: {
            city: 'NYC',
            zip: '10001'
        }
    }
};

const { user: { address: { city } } } = data;

// PART 3: FUNCTION PARAMETERS
function greet({ name, age = 18 }) {
    return `${name} is ${age}`;
}

// PART 4: SPREAD OPERATOR
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1,2,3,4,5]

const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // {a:1, b:2, c:3}

// PART 5: REST PARAMETERS
function sum(...numbers) {
    return numbers.reduce((acc, n) => acc + n, 0);
}

// EXERCISES
// Exercise 1: Swap variables without temp
// Exercise 2: Merge multiple objects
// Exercise 3: Extract specific fields from API response

console.log('\n=== Destructuring & Spread/Rest ===\n');
