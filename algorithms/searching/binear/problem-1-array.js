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
    //a left pointer starts 0
    let left = 0
    //a right pointer starts at the last index
    let right = arr.length - 1
    
    while (left <= right) {
        //calculate middle index and round down
        let middle = Math.floor((left + right) / 2)
        
        //if we found the value, return its index
        if (arr[middle] === val) {
            return middle
        }
        //if value is greater than middle, search right half
        else if (arr[middle] < val) {
            left = middle + 1
        }
        //if value is less than middle, search left half
        else {
            right = middle - 1
        }
    }
    //value not found
    return -1
}


console.log(binarySearch([1,2,3],3))