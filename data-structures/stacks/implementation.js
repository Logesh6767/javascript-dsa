// Stack Implementation
const { test, assertEquals } = require('../../utils/helpers');

class Stack {
    constructor() {
        this.items = [];
    }

    // Add element to top of stack
    push(element) {
        this.items.push(element);
    }

    // Remove and return top element
    pop() {
        if (this.isEmpty()) {
            throw new Error('Stack is empty');
        }
        return this.items.pop();
    }

    // View top element without removing
    peek() {
        if (this.isEmpty()) {
            throw new Error('Stack is empty');
        }
        return this.items[this.items.length - 1];
    }

    // Check if stack is empty
    isEmpty() {
        return this.items.length === 0;
    }

    // Get stack size
    size() {
        return this.items.length;
    }

    // Clear all elements
    clear() {
        this.items = [];
    }

    // Print stack contents
    print() {
        console.log('Stack:', this.items.join(' <- '));
    }

    // Convert to array (top to bottom)
    toArray() {
        return [...this.items].reverse();
    }
}

// Stack using Linked List (alternative implementation)
class StackNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedStack {
    constructor() {
        this.top = null;
        this.length = 0;
    }

    push(data) {
        const newNode = new StackNode(data);
        newNode.next = this.top;
        this.top = newNode;
        this.length++;
    }

    pop() {
        if (!this.top) {
            throw new Error('Stack is empty');
        }
        
        const data = this.top.data;
        this.top = this.top.next;
        this.length--;
        return data;
    }

    peek() {
        if (!this.top) {
            throw new Error('Stack is empty');
        }
        return this.top.data;
    }

    isEmpty() {
        return this.top === null;
    }

    size() {
        return this.length;
    }

    print() {
        if (this.isEmpty()) {
            console.log('Stack is empty');
            return;
        }
        
        const values = [];
        let current = this.top;
        while (current) {
            values.push(current.data);
            current = current.next;
        }
        console.log('Stack:', values.join(' <- '));
    }
}

// Test the stack implementations
function testStack() {
    console.log('🧪 Testing Stack Implementation\n');
    
    const stack = new Stack();
    
    test('Push elements', () => {
        stack.push(1);
        stack.push(2);
        stack.push(3);
        assertEquals(stack.size(), 3);
        assertEquals(stack.peek(), 3);
    });
    
    test('Pop elements', () => {
        assertEquals(stack.pop(), 3);
        assertEquals(stack.pop(), 2);
        assertEquals(stack.size(), 1);
    });
    
    test('Peek operation', () => {
        assertEquals(stack.peek(), 1);
        assertEquals(stack.size(), 1); // Size shouldn't change
    });
    
    test('Empty stack operations', () => {
        stack.pop(); // Remove last element
        assertEquals(stack.isEmpty(), true);
        
        try {
            stack.pop();
            throw new Error('Should have thrown error');
        } catch (e) {
            assertEquals(e.message, 'Stack is empty');
        }
    });
    
    console.log('\n🧪 Testing Linked Stack Implementation\n');
    
    const linkedStack = new LinkedStack();
    
    test('Linked Stack - Push and Pop', () => {
        linkedStack.push('A');
        linkedStack.push('B');
        linkedStack.push('C');
        
        assertEquals(linkedStack.peek(), 'C');
        assertEquals(linkedStack.pop(), 'C');
        assertEquals(linkedStack.pop(), 'B');
        assertEquals(linkedStack.size(), 1);
    });
}

// Run tests if this file is executed directly
if (require.main === module) {
    testStack();
}

module.exports = { Stack, LinkedStack };
