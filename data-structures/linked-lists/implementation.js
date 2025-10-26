// Simple singly linked list implementation for learning

class Node {
	constructor(value) {
		this.value = value;
		this.next = null;
	}
}

class LinkedList {
	constructor() {
		this.head = null;
		this.length = 0;
	}

	// Add a node at the end
	append(value) {
		const newNode = new Node(value);
		if (!this.head) {
			this.head = newNode;
		} else {
			let curr = this.head;
			while (curr.next) curr = curr.next;
			curr.next = newNode;
		}
		this.length++;
		return this;
	}

	// Insert at beginning
	prepend(value) {
		const newNode = new Node(value);
		newNode.next = this.head;
		this.head = newNode;
		this.length++;
		return this;
	}

	// Remove first occurrence of value
	remove(value) {
		if (!this.head) return null;
		if (this.head.value === value) {
			const removed = this.head;
			this.head = this.head.next;
			this.length--;
			return removed;
		}

		let prev = this.head;
		let curr = this.head.next;
		while (curr) {
			if (curr.value === value) {
				prev.next = curr.next;
				this.length--;
				return curr;
			}
			prev = curr;
			curr = curr.next;
		}

		return null;
	}

	// Convert to array for easy inspection
	toArray() {
		const arr = [];
		let curr = this.head;
		while (curr) {
			arr.push(curr.value);
			curr = curr.next;
		}
		return arr;
	}

	// Print list
	print() {
		console.log(this.toArray().join(' -> '));
	}
}

// Example usage and simple tests
if (require.main === module) {
	const list = new LinkedList();
	list.append(10);
	list.append(20);
	list.prepend(5);
	console.log('List contents:', list.toArray());
	list.print();

	console.log('Remove 20:', list.remove(20)?.value ?? null);
	console.log('After removal:', list.toArray());
}

module.exports = { Node, LinkedList };