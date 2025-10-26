// Given the array nums, for each nums[i] find out how many numbers in the array are smaller than it. That is, for each nums[i] you have to count the number of valid j's such that j != i and nums[j] < nums[i].

// Return the answer in an array.

// Example 1:
// Input: nums = [8,1,2,2,3]
// Output: [4,0,1,1,3]
// Explanation: 
// For nums[0]=8 there exist four smaller numbers than it (1, 2, 2 and 3). 
// For nums[1]=1 does not exist any smaller number than it.
// For nums[2]=2 there exist one smaller number than it (1). 
// For nums[3]=2 there exist one smaller number than it (1). 
// For nums[4]=3 there exist three smaller numbers than it (1, 2 and 2).

// Example 2:
// Input: nums = [6,5,4,8]
// Output: [2,1,0,3]

// Example 3:
// Input: nums = [7,7,7,7]
// Output: [0,0,0,0]

var smallerNumbersThanCurrent = function(nums) {
    //declare a array to store the result
    let result = [];
    //loop through each value in array
    for (let val of nums) {
        //check if the value is greater then other values in the array excluding the current value
        
        // if (val < indexOf(nums)){

        // }
            //if true, increament and store it, or else, store it as 0
    }
    //end loop
    // return result array        
};

smallerNumbersThanCurrent([1,2,3,4])