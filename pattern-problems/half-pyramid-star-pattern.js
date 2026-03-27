// Problem: Pattern 10 - Half Diamond Star Pattern
// Given an integer N, print the following pattern.

// Example:
// Input: N = 5

// Output:
// *
// **
// ***
// ****
// *****
// ****
// ***
// **
// *

function halfDiamondStarPattern(n) {
    // loop1|
    
        
    for (let i = 1; i <= n; i++) {
        let row = ""
        for (let star = 1; star <= i; star++) {
            row += "*"
        }
        console.log(row)
    }

    // loop2
    for (let i = 1; i <= n; i++) {
        let row = ""
        for (let star = 1; star <= n - i; star++) {
            row += "*"
        }

        console.log(row)
    }
}

halfDiamondStarPattern(3);