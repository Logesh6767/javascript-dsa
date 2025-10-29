// Binary Search Exercise
// Write a function called binarySearch which accepts a sorted array and a value and returns the index at which the value exists. Otherwise, return -1.

// This algorithm should be more efficient than linearSearch - you can read how to implement it here - https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search and here - https://www.topcoder.com/community/data-science/data-science-tutorials/binary-search/

// Examples:

// binarySearch([1,2,3,4,5],2) // 1
// binarySearch([1,2,3,4,5],3) // 2
// binarySearch([1,2,3,4,5],5) // 4
// binarySearch([1,2,3,4,5],6) // -1
// binarySearch([
//   5, 6, 10, 13, 14, 18, 30, 34, 35, 37, 
//   40, 44, 64, 79, 84, 86, 95, 96, 98, 99
// ], 10) // 2
// binarySearch([
//   5, 6, 10, 13, 14, 18, 30, 34, 35, 37, 
//   40, 44, 64, 79, 84, 86, 95, 96, 98, 99
// ], 95) // 16
// binarySearch([
//   5, 6, 10, 13, 14, 18, 30, 34, 35, 37, 
//   40, 44, 64, 79, 84, 86, 95, 96, 98, 99
// ], 100) // -1

function binarySearch(arr, val){
    if (!arr) return -1
    let left = 0
    let right = arr.length - 1
    for (let i = 0; i < arr.length; i++) {
        console.log(left,i,right)
        if((arr[left] - arr[right]) === val) {
            console.log((arr[left] - arr[right]))
            return i
        } else if(arr[i] > arr[left]) {
            left = i
        } else {
            right = i
        }
    }
    return -1
    //loop through arr
        //check if the middle value of the left and right is equal to current value
            //if true return its index
        //else check if the value is greater than left
            //if true set the left as current index
        //else
            //decreament set the right as current index
    //return -1    
}

console.log(binarySearch([1,2,3,4,5],2))