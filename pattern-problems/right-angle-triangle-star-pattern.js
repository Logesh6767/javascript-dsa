// Problem Statement: Given an integer N, print the following pattern.

// Example 1:
// Input: N = 3
// Output: 
//    *
//    **
//    *** 

// Example 2:
// Input: N = 4
// Output: 
//    *
//    **
//    *** 
//    ****

function printStarPattern(n) {
    for (let i = 0; i < n; i++) {
        let row = ""
        for (let j = 0; j <= i; j++) {
            row += "* "
        }
        console.log(row)
    }
}

printStarPattern(6)