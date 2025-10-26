// Bubble Sort Algorithm Implementation
const { generateRandomArray, printArray, measureTime, test, assertEquals } = require('../../utils/helpers');

/**
 * Bubble Sort - Simple comparison-based sorting algorithm
 * Time Complexity: O(n²), Space Complexity: O(1)
 */
function bubbleSort(arr) {
    const n = arr.length;
    const sortedArr = [...arr]; // Create a copy
    
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        
        // Last i elements are already sorted
        for (let j = 0; j < n - i - 1; j++) {
            if (sortedArr[j] > sortedArr[j + 1]) {
                // Swap elements
                [sortedArr[j], sortedArr[j + 1]] = [sortedArr[j + 1], sortedArr[j]];
                swapped = true;
            }
        }
        
        // If no swapping occurred, array is sorted
        if (!swapped) break;
    }
    
    return sortedArr;
}

/**
 * Selection Sort - Find minimum and place at beginning
 * Time Complexity: O(n²), Space Complexity: O(1)
 */
function selectionSort(arr) {
    const n = arr.length;
    const sortedArr = [...arr];
    
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        // Find minimum element in remaining array
        for (let j = i + 1; j < n; j++) {
            if (sortedArr[j] < sortedArr[minIndex]) {
                minIndex = j;
            }
        }
        
        // Swap minimum element with first element
        if (minIndex !== i) {
            [sortedArr[i], sortedArr[minIndex]] = [sortedArr[minIndex], sortedArr[i]];
        }
    }
    
    return sortedArr;
}

/**
 * Insertion Sort - Build sorted array one element at a time
 * Time Complexity: O(n²), Space Complexity: O(1)
 */
function insertionSort(arr) {
    const n = arr.length;
    const sortedArr = [...arr];
    
    for (let i = 1; i < n; i++) {
        let key = sortedArr[i];
        let j = i - 1;
        
        // Move elements greater than key one position ahead
        while (j >= 0 && sortedArr[j] > key) {
            sortedArr[j + 1] = sortedArr[j];
            j--;
        }
        
        sortedArr[j + 1] = key;
    }
    
    return sortedArr;
}

/**
 * Merge Sort - Divide and conquer approach
 * Time Complexity: O(n log n), Space Complexity: O(n)
 */
function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] <= right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }
    
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

/**
 * Quick Sort - Partition-based sorting
 * Time Complexity: O(n log n) average, O(n²) worst, Space Complexity: O(log n)
 */
function quickSort(arr, low = 0, high = arr.length - 1) {
    const sortedArr = [...arr];
    
    if (low < high) {
        const pivotIndex = partition(sortedArr, low, high);
        quickSort(sortedArr, low, pivotIndex - 1);
        quickSort(sortedArr, pivotIndex + 1, high);
    }
    
    return sortedArr;
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

// Test all sorting algorithms
function testSortingAlgorithms() {
    console.log('🧪 Testing Sorting Algorithms\n');
    
    const testCases = [
        [64, 34, 25, 12, 22, 11, 90],
        [5, 2, 4, 6, 1, 3],
        [1],
        [],
        [3, 3, 3, 3],
        [5, 4, 3, 2, 1]
    ];
    
    const algorithms = [
        { name: 'Bubble Sort', fn: bubbleSort },
        { name: 'Selection Sort', fn: selectionSort },
        { name: 'Insertion Sort', fn: insertionSort },
        { name: 'Merge Sort', fn: mergeSort },
        { name: 'Quick Sort', fn: quickSort }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`Test Case ${index + 1}: [${testCase.join(', ')}]`);
        const expected = [...testCase].sort((a, b) => a - b);
        
        algorithms.forEach(({ name, fn }) => {
            test(`${name}`, () => {
                const result = fn(testCase);
                assertEquals(result, expected);
            });
        });
        
        console.log('');
    });
}

// Performance comparison
function performanceComparison() {
    console.log('📊 Sorting Algorithms Performance Comparison\n');
    
    const sizes = [100, 1000, 5000];
    const algorithms = [
        { name: 'Bubble Sort', fn: bubbleSort },
        { name: 'Selection Sort', fn: selectionSort },
        { name: 'Insertion Sort', fn: insertionSort },
        { name: 'Merge Sort', fn: mergeSort },
        { name: 'Quick Sort', fn: quickSort }
    ];
    
    sizes.forEach(size => {
        console.log(`\n🔢 Array Size: ${size}`);
        const randomArray = generateRandomArray(size, 1, 1000);
        
        algorithms.forEach(({ name, fn }) => {
            const { executionTime } = measureTime(fn, randomArray);
            console.log(`${name.padEnd(15)}: ${executionTime}`);
        });
    });
}

// Examples with different data sets
function examples() {
    console.log('\n📚 Sorting Examples\n');
    
    // Example 1: Small array
    console.log('Example 1: Small Array');
    const smallArray = [64, 34, 25, 12, 22, 11, 90];
    printArray(smallArray, 'Original');
    printArray(bubbleSort(smallArray), 'Bubble Sort');
    printArray(mergeSort(smallArray), 'Merge Sort');
    console.log('');
    
    // Example 2: Already sorted array
    console.log('Example 2: Already Sorted Array');
    const sortedArray = [1, 2, 3, 4, 5];
    printArray(sortedArray, 'Original');
    const { executionTime: bubbleTime } = measureTime(bubbleSort, sortedArray);
    const { executionTime: mergeTime } = measureTime(mergeSort, sortedArray);
    console.log(`Bubble Sort Time: ${bubbleTime}`);
    console.log(`Merge Sort Time: ${mergeTime}\n`);
    
    // Example 3: Reverse sorted array
    console.log('Example 3: Reverse Sorted Array');
    const reverseArray = [5, 4, 3, 2, 1];
    printArray(reverseArray, 'Original');
    printArray(insertionSort(reverseArray), 'Insertion Sort');
    printArray(quickSort(reverseArray), 'Quick Sort');
}

// Run everything if this file is executed directly
if (require.main === module) {
    testSortingAlgorithms();
    performanceComparison();
    examples();
}

module.exports = {
    bubbleSort,
    selectionSort,
    insertionSort,
    mergeSort,
    quickSort
};
