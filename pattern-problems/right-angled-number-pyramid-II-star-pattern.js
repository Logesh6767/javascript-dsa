// Problem Statement: Given an integer N, print the following pattern.

// Example 1:
// Input: N = 3
// Output: 
//    1
//    2 2
//    3 3 3 

// Example 2:
// Input: N = 4
// Output: 
//    1
//    2 2
//    3 3 3  
//    4 4 4 4

function printStarPattern(n) {
    for (let i = 1; i <= n; i++) {
        let row = ""
        for (let j = 1; j <= i; j++) {
            row += `${i} `
        }
        console.log(row)
    }
}

printStarPattern(6)