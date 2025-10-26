// Array Implementation and Common Operations
const { printArray, test, assertEquals } = require('../../utils/helpers');

class MyArray {
    constructor() {
        this.data = {};
        this.length = 0;
    }

    // Access element at index
    get(index) {
        return this.data[index];
    }

    // Add element at the end
    push(element) {
        this.data[this.length] = element;
        this.length++;
        return this.length;
    }

    // Remove last element
    pop() {
        if (this.length === 0) return undefined;
        
        const lastItem = this.data[this.length - 1];
        delete this.data[this.length - 1];
        this.length--;
        return lastItem;
    }

    // Add element at the beginning
    unshift(element) {
        // Shift all elements to the right
        for (let i = this.length; i > 0; i--) {
            this.data[i] = this.data[i - 1];
        }
        this.data[0] = element;
        this.length++;
        return this.length;
    }

    // Remove first element
    shift() {
        if (this.length === 0) return undefined;
        
        const firstItem = this.data[0];
        // Shift all elements to the left
        for (let i = 0; i < this.length - 1; i++) {
            this.data[i] = this.data[i + 1];
        }
        delete this.data[this.length - 1];
        this.length--;
        return firstItem;
    }

    // Insert element at specific index
    insert(index, element) {
        if (index > this.length) return false;
        
        // Shift elements to the right from index
        for (let i = this.length; i > index; i--) {
            this.data[i] = this.data[i - 1];
        }
        this.data[index] = element;
        this.length++;
        return true;
    }

    // Delete element at specific index
    delete(index) {
        if (index >= this.length) return undefined;
        
        const item = this.data[index];
        // Shift elements to the left from index
        for (let i = index; i < this.length - 1; i++) {
            this.data[i] = this.data[i + 1];
        }
        delete this.data[this.length - 1];
        this.length--;
        return item;
    }

    // Convert to regular array
    toArray() {
        const result = [];
        for (let i = 0; i < this.length; i++) {
            result.push(this.data[i]);
        }
        return result;
    }

    // Print the array
    print() {
        console.log(this.toArray());
    }
}

// Test the array implementation
function testMyArray() {
    console.log('🧪 Testing Custom Array Implementation\n');
    
    const arr = new MyArray();
    
    test('Push elements', () => {
        arr.push(1);
        arr.push(2);
        arr.push(3);
        assertEquals(arr.toArray(), [1, 2, 3]);
    });
    
    test('Pop element', () => {
        const popped = arr.pop();
        assertEquals(popped, 3);
        assertEquals(arr.toArray(), [1, 2]);
    });
    
    test('Unshift element', () => {
        arr.unshift(0);
        assertEquals(arr.toArray(), [0, 1, 2]);
    });
    
    test('Shift element', () => {
        const shifted = arr.shift();
        assertEquals(shifted, 0);
        assertEquals(arr.toArray(), [1, 2]);
    });
    
    test('Insert element', () => {
        arr.insert(1, 1.5);
        assertEquals(arr.toArray(), [1, 1.5, 2]);
    });
    
    test('Delete element', () => {
        arr.delete(1);
        assertEquals(arr.toArray(), [1, 2]);
    });
    
    console.log('\nFinal array:');
    arr.print();
}

// Run tests if this file is executed directly
if (require.main === module) {
    testMyArray();
}

module.exports = { MyArray };
