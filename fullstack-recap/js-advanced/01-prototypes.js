/**
 * DAY 8: PROTOTYPES & INHERITANCE
 * Topics: Prototype chain, Object.create, Constructor functions,
 * Prototypal inheritance, __proto__ vs prototype
 */

// PART 1: UNDERSTANDING PROTOTYPES
const obj = {};
console.log(obj.__proto__ === Object.prototype); // true
console.log(obj.__proto__.__proto__); // null

// PART 2: CONSTRUCTOR FUNCTIONS
function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.greet = function() {
    return `Hi, I'm ${this.name}`;
};

const john = new Person('John', 30);
console.log(john.greet()); // "Hi, I'm John"

// PART 3: PROTOTYPAL INHERITANCE
function Employee(name, age, job) {
    Person.call(this, name, age); // Call parent constructor
    this.job = job;
}

Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

Employee.prototype.work = function() {
    return `${this.name} is working as ${this.job}`;
};

// PART 4: OBJECT.CREATE
const personProto = {
    greet() {
        return `Hello, ${this.name}`;
    }
};

const person1 = Object.create(personProto);
person1.name = 'Alice';

// EXERCISES
// Exercise 1: Create Animal -> Dog inheritance
// Exercise 2: Implement instanceof from scratch
// Exercise 3: Create a shape hierarchy (Shape -> Rectangle -> Square)

console.log('\n=== Prototypes & Inheritance ===\n');
