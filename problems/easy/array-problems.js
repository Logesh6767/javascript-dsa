// Array Problems and Solutions
const { test, assertEquals, printArray, measureTime } = require('../../utils/helpers');

/**
 * Problem 1: Two Sum
 * Given an array of integers and a target sum, return indices of two numbers that add up to target
 */
function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}

/**
 * Problem 2: Maximum Subarray (Kadane's Algorithm)
 * Find the contiguous subarray with the largest sum
 */
function maxSubArray(nums) {
    let maxSoFar = nums[0];
    let maxEndingHere = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }
    
    return maxSoFar;
}

/**
 * Problem 3: Remove Duplicates from Sorted Array
 * Remove duplicates in-place and return new length
 */
function removeDuplicates(nums) {
    if (nums.length <= 1) return nums.length;
    
    let writeIndex = 1;
    
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] !== nums[i - 1]) {
            nums[writeIndex] = nums[i];
            writeIndex++;
        }
    }
    
    return writeIndex;
}

/**
 * Problem 4: Rotate Array
 * Rotate array to the right by k steps
 */
function rotate(nums, k) {
    k = k % nums.length;
    
    // Helper function to reverse array portion
    function reverse(start, end) {
        while (start < end) {
            [nums[start], nums[end]] = [nums[end], nums[start]];
            start++;
            end--;
        }
    }
    
    // Reverse entire array
    reverse(0, nums.length - 1);
    // Reverse first k elements
    reverse(0, k - 1);
    // Reverse remaining elements
    reverse(k, nums.length - 1);
    
    return nums;
}

/**
 * Problem 5: Move Zeroes
 * Move all zeros to the end while maintaining relative order
 */
function moveZeroes(nums) {
    let writeIndex = 0;
    
    // Move all non-zero elements to the front
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            nums[writeIndex] = nums[i];
            writeIndex++;
        }
    }
    
    // Fill the rest with zeros
    for (let i = writeIndex; i < nums.length; i++) {
        nums[i] = 0;
    }
    
    return nums;
}

// Test all problems
function runTests() {
    console.log('🧪 Array Problems - Test Results\n');
    
    test('Two Sum', () => {
        const result = twoSum([2, 7, 11, 15], 9);
        assertEquals(result, [0, 1]);
        
        const result2 = twoSum([3, 2, 4], 6);
        assertEquals(result2, [1, 2]);
    });
    
    test('Maximum Subarray', () => {
        assertEquals(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]), 6);
        assertEquals(maxSubArray([1]), 1);
        assertEquals(maxSubArray([5, 4, -1, 7, 8]), 23);
    });
    
    test('Remove Duplicates', () => {
        const nums1 = [1, 1, 2];
        assertEquals(removeDuplicates(nums1), 2);
        
        const nums2 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
        assertEquals(removeDuplicates(nums2), 5);
    });
    
    test('Rotate Array', () => {
        const nums1 = [1, 2, 3, 4, 5, 6, 7];
        assertEquals(rotate([...nums1], 3), [5, 6, 7, 1, 2, 3, 4]);
        
        const nums2 = [-1, -100, 3, 99];
        assertEquals(rotate([...nums2], 2), [3, 99, -1, -100]);
    });
    
    test('Move Zeroes', () => {
        const nums1 = [0, 1, 0, 3, 12];
        assertEquals(moveZeroes([...nums1]), [1, 3, 12, 0, 0]);
        
        const nums2 = [0];
        assertEquals(moveZeroes([...nums2]), [0]);
    });
}

// Example usage and performance testing
function examples() {
    console.log('\n📊 Array Problems - Examples and Performance\n');
    
    // Two Sum example
    console.log('🔍 Two Sum Problem:');
    const nums = [2, 7, 11, 15];
    const target = 9;
    const { result, executionTime } = measureTime(twoSum, nums, target);
    console.log(`Input: [${nums.join(', ')}], Target: ${target}`);
    console.log(`Result: [${result.join(', ')}], Time: ${executionTime}\n`);
    
    // Maximum Subarray example
    console.log('📈 Maximum Subarray Problem:');
    const subArr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
    const { result: maxSum, executionTime: maxTime } = measureTime(maxSubArray, subArr);
    console.log(`Input: [${subArr.join(', ')}]`);
    console.log(`Maximum Sum: ${maxSum}, Time: ${maxTime}\n`);
    
    // Rotate Array example
    console.log('🔄 Rotate Array Problem:');
    const rotateArr = [1, 2, 3, 4, 5, 6, 7];
    const k = 3;
    console.log(`Original: [${rotateArr.join(', ')}]`);
    const rotated = rotate([...rotateArr], k);
    console.log(`Rotated by ${k}: [${rotated.join(', ')}]\n`);
}

// Run everything if this file is executed directly
if (require.main === module) {
    runTests();
    examples();
}

module.exports = {
    twoSum,
    maxSubArray,
    removeDuplicates,
    rotate,
    moveZeroes
};
