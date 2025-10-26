// Sliding Window - maxSubarraySum
// Given an array of integers and a number, write a function called maxSubarraySum, which finds the maximum sum of a subarray with the length of the number passed to the function.

// Note that a subarray must consist of consecutive elements from the original array. In the first example below, [100, 200, 300] is a subarray of the original array, but [100, 300] is not.

// maxSubarraySum([100,200,300,400], 2) // 700
// maxSubarraySum([1,4,2,10,23,3,1,0,20], 4)  // 39 
// maxSubarraySum([-3,4,0,-2,6,-1], 2) // 5
// maxSubarraySum([3,-2,7,-4,1,-1,4,-2,1],2) // 5
// maxSubarraySum([2,3], 3) // null
// Constraints:

// Time Complexity - O(N)

// Space Complexity - O(1)

function maxSubarraySum (arr, val) {
    //check if the length of arr is greater than val, if not, return null
    if (arr.length < val) return null;
    //declare 2 variables, tempSum and maxSum
    let tempSum = 0;
    let maxSum = 0;
    //loop through arr till the length of the val
    for (let i = 0; i < val; i++ ) {
        //store the sum in the maxSum
        maxSum += arr[i]
    }
    tempSum = maxSum
    //loop throgh arr till the end
    for (let i = val; i < arr.length; i++) {
        console.log(i,val)
        //remove the first element and add the next element from the end, and store it in the tempSum
        tempSum = tempSum - arr[i - val] + arr[i]
        console.log('tempSum', tempSum)
        //if tempSum is greater than maxSum, overwrite the tempSum Value in the maxSum, if not, do nothing
        console.log('maxSum before', maxSum)
        maxSum = Math.max(maxSum, tempSum)
        console.log('maxSum after', maxSum)
    }
    //return maxSum
    return maxSum
}

console.log(maxSubarraySum([100,200,300,400], 2))