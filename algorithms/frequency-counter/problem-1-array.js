//write a function called same, which accepts two arrays. The function should return true if every value in the array has its corresponding value squared in the second array. The frequency of values must be same.

//outputs
// same([1,2,3],[1,9,4]) true
// same([1,2,3],[1,9,]) false
// same([1,2,3],[1,4,4]) false

// function same (num, numsquared) {
//     // check if both the array length are same
//         //loop through each values in the array
//             // check if the number is not stored in the 'result' variable
//                 // if true, proceed to find if the current value has a exact squared value in the corresponding array (condition).
//                     // if true, continue the loop
//                     // else, break the loop and return false 
//             // close condition    
//         // close loop
//         // return true
//     // close condtion
//     // return        
// }

// function same (num, numSquared) {
//     // check if both the array length are same
//     if (num.length === numSquared.length) {
//         //loop through each values in the array
//         for (let i in num) {
//             for (let j in numSquared) {
//                 // if true, proceed to find if the current value has a exact squared value in the corresponding array (condition).
//                 // if true, continue the loop
//                 // else, break the loop and return false
//             }   
//         }        
//         // close loop
//         // return true
//     }    
//     // close condtion
//     return
//     // return        
// }

function getWrongAnswers(N,C) {
    return [...C].map(c => c === 'A' ? 'B' : 'A').join('');
}