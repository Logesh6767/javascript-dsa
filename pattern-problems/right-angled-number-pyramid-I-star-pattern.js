// Problem Statement: Given an integer N, print the following pattern.

// Example 1:
// Input: N = 3
// Output: 
//    1
//    1 2
//    1 2 3 

// Example 2:
// Input: N = 4
// Output: 
//    1
//    1 2
//    1 2 3 
//    1 2 3 4

function printStarPattern(n) {
    for (let i = 0; i < n; i++) {
        let row = ""
        for (let j = 0; j <= i; j++) {
            row += `${j + 1} `
        }
        console.log(row)
    }
}

printStarPattern(6)