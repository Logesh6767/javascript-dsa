// Problem Statement: Given an integer N, print the following pattern.

// Example 1:
// Input: N = 3
// Output: 
// * * *
// * *
// *

function printStarPattern(n) {
    for (let i = n; i > 0; i--) {
        let row = ""
        for (let j = i; j > 0; j--) {
            row += `* `
        }
        console.log(row)
    }
}

printStarPattern(3)