// Problem Statement: Given an integer N, print the following pattern.

// Example 1:
// Input: N = 3
// Output: 
// 1 2 3
// 1 2
// 1 

function printStarPattern(n) {
    for (let i = n; i > 0; i--) {
        let row = ""
        for (let j = 1; j <= i; j++) {
            row += `${j} `
        }
        console.log(row)
    }
}

printStarPattern(3)