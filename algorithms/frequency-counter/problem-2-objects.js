//write a function called same, which accepts two arrays. The function should return true if every value in the array has its corresponding value squared in the second array. The frequency of values must be same.

//outputs
// same([1,2,3],[1,9,4]) true
// same([1,2,3],[1,9,]) false
// same([1,2,3],[1,4,4]) false

// function same (arr1, arr2) {
//     // a condition to check if the length of both arrays are same
//     if (arr1.length !== arr2.length) {
//         // if false, return result as false
//         return false
//     }
//     let frequency1 = {};
//     let frequency2 = {};
//     for (let val of arr1) {
//         frequency1[val] = (frequency1[val] || 0) + 1;
//     }
//     for (let val of arr2) {
//         frequency2[val] = (frequency2[val] || 0) + 1;
//     }
//     for (let key in frequency1) {
//         if (!(key ** 2 in frequency2)) {
//             return false
//         }
//         if (frequency2[key ** 2] !== frequency1[key]) {
//             return false
//         }
//     }
//     return true
//     // declare two frequency objects to store the frequency of values in each of the arrays
//     // loop through the arrays and assign the frequencies in the object
//     // loop through the frequency objects to find the corresponding squared value
//         // condition to find the squared value
//         // another condition if the all values exists
//     // return true        
// }

function same(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    let frequency1 = {};
    let frequency2 = {};
    for (let val of arr1) {
        frequency1[val] = (frequency1[val] || 0) + 1
    }
    for (let val of arr2) {
        frequency2[val] = (frequency2[val] || 0) + 1
    }
    for (let key in frequency1) {
        if (!(key ** 2 in frequency2)) {
            return false
        }
        if (frequency2[key ** 2] !== frequency1[key]) {
            return false
        }
    }
    return true
}

// Test all the expected outputs
console.log(same([1,2,3],[1,9,4])); // should be true
console.log(same([1,2,3],[1,9])); // should be false
console.log(same([1,2,3],[1,4,4])); // should be false