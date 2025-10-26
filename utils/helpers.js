// Common utility functions for testing and debugging

/**
 * Print array in a formatted way
 * @param {Array} arr - Array to print
 * @param {string} label - Label for the array
 */
function printArray(arr, label = "Array") {
    console.log(`${label}: [${arr.join(', ')}]`);
}

/**
 * Generate random array of given size and range
 * @param {number} size - Size of array
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {Array} Random array
 */
function generateRandomArray(size, min = 1, max = 100) {
    return Array.from({ length: size }, () => 
        Math.floor(Math.random() * (max - min + 1)) + min
    );
}

/**
 * Measure execution time of a function
 * @param {Function} fn - Function to measure
 * @param {...any} args - Arguments for the function
 * @returns {Object} Result and execution time
 */
function measureTime(fn, ...args) {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();
    return {
        result,
        executionTime: `${(end - start).toFixed(2)}ms`
    };
}

/**
 * Simple test runner
 * @param {string} testName - Name of the test
 * @param {Function} testFn - Test function
 */
function test(testName, testFn) {
    try {
        testFn();
        console.log(`✅ ${testName} - PASSED`);
    } catch (error) {
        console.log(`❌ ${testName} - FAILED: ${error.message}`);
    }
}

/**
 * Assert equality
 * @param {any} actual - Actual value
 * @param {any} expected - Expected value
 */
function assertEquals(actual, expected) {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error(`Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(actual)}`);
    }
}

module.exports = {
    printArray,
    generateRandomArray,
    measureTime,
    test,
    assertEquals
};
