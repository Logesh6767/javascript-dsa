/**
 * WEEK 2 REVIEW: Advanced JavaScript & Node.js
 * Comprehensive review of Days 8-13
 */

// ============================================
// SECTION 1: PROTOTYPES & CLASSES
// ============================================

/**
 * Challenge 1: Implement a complete class hierarchy
 * Create: Shape -> Rectangle -> Square
 * Include area(), perimeter() methods
 * Use both ES6 classes and prototype-based approach
 */

// ============================================
// SECTION 2: DESTRUCTURING & MODERN JS
// ============================================

/**
 * Challenge 2: Transform this nested data structure
 */
const apiData = {
    user: {
        id: 1,
        profile: {
            name: 'John Doe',
            contact: {
                email: 'john@example.com',
                phone: '123-456-7890'
            }
        },
        posts: [
            { id: 101, title: 'Post 1', likes: 10 },
            { id: 102, title: 'Post 2', likes: 25 }
        ]
    }
};

// TODO: Extract and format data using destructuring

// ============================================
// SECTION 3: NODE.JS FILE OPERATIONS
// ============================================

/**
 * Challenge 3: Build a JSON database
 * Implement CRUD operations for a JSON file
 */
class JSONDatabase {
    constructor(filePath) {
        // TODO: Implement
    }
    
    async create(data) {}
    async read(id) {}
    async update(id, data) {}
    async delete(id) {}
    async findAll() {}
}

// ============================================
// SECTION 4: HTTP SERVER
// ============================================

/**
 * Challenge 4: Build a complete REST API
 * - CRUD operations for todos
 * - Error handling
 * - Input validation
 * - Proper status codes
 */

// ============================================
// FINAL PROJECT: CLI TODO APP
// ============================================

/**
 * Build a command-line TODO application:
 * - Add, list, complete, delete todos
 * - Store in JSON file
 * - Use process.argv for commands
 * - Implement proper error handling
 * 
 * Usage:
 * node todo.js add "Buy groceries"
 * node todo.js list
 * node todo.js complete 1
 * node todo.js delete 2
 */

console.log('\n=== Week 2 Review Complete ===\n');
