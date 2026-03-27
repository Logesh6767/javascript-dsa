// Problem: Pattern 8 - Inverted Star Pyramid
// Given an integer N, print the following pattern.

// Example:
// Input: N = 5

// Output:
// *********
//  *******
//   *****
//    ***
//     *

// Explanation:
// The number of stars decreases by 2 each row,
// while the number of leading spaces increases by 1.

function invertedStarPyramid(n) {
    for (let i = 0; i < n; i++) {

        let row = "";

        // spaces before stars
        for (let j = 0; j < i; j++) {
            row += " ";
        }

        // stars
        for (let j = 0; j < 2 * (n - i) - 1; j++) {
            row += "*";
        }

        console.log(row);
    }
}

invertedStarPyramid(5);