/**
 * DAY 9: ES6 CLASSES & CONSTRUCTOR FUNCTIONS
 * Topics: Class syntax, Constructor, Methods, Static methods,
 * Getters/Setters, Private fields, Inheritance with extends
 */

// PART 1: CLASS BASICS
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        return `Hi, I'm ${this.name}`;
    }
    
    static species() {
        return 'Homo sapiens';
    }
}

// PART 2: GETTERS AND SETTERS
class User {
    constructor(email) {
        this._email = email;
    }
    
    get email() {
        return this._email.toLowerCase();
    }
    
    set email(value) {
        if (value.includes('@')) {
            this._email = value;
        } else {
            throw new Error('Invalid email');
        }
    }
}

// PART 3: INHERITANCE
class Employee extends Person {
    constructor(name, age, job) {
        super(name, age);
        this.job = job;
    }
    
    work() {
        return `${this.name} is working as ${this.job}`;
    }
}

// PART 4: PRIVATE FIELDS (ES2022)
class BankAccount {
    #balance = 0; // Private field
    
    deposit(amount) {
        this.#balance += amount;
    }
    
    getBalance() {
        return this.#balance;
    }
}

// EXERCISES
// Exercise 1: Create a Vehicle class hierarchy
// Exercise 2: Implement a LinkedList using classes
// Exercise 3: Create a Logger class with private state

console.log('\n=== Classes ===\n');
