// Longest Harmonious Subsequence
// We define a harmonious array as an array where the difference between its maximum value and its minimum value is exactly 1.

// Given an integer array nums, return the length of its longest harmonious subsequence among all its possible subsequences.

 

// Example 1:

// Input: nums = [1,3,2,2,5,2,3,7]

// Output: 5

// Explanation:

var findLHS = function(nums) {
    //declare an object
    let count = {}
    let max = 0
    //loop nums
    for (let val of nums) {
        count[val] = (count[val] || 0) + 1
    }
    for (let key in count) {
        let num = Number(key)
        if (count[num+1]) {
            max = Math.max(max, count[num] + count[num+1])
        }
    }
    return max
};

console.log(findLHS([1,3,2,2,5,2,3,7]))

//Took me 42 minutes to solve (with help)