// Problem: Pattern 9 - Diamond Star Pattern
// Given an integer N, print the following pattern.

// Example:
// Input: N = 5

// Output:
//     *
//    ***
//   *****
//  *******
// *********
// *********
//  *******
//   *****
//    ***
//     *

// Explanation:
// The pattern first forms a normal pyramid (increasing stars),
// then forms an inverted pyramid (decreasing stars),
// creating a diamond shape.

function diamondStarPattern(n) {

    // Upper pyramid
    for (let i = 1; i <= n; i++) {

        let row = "";

        for (let space = 1; space <= n - i; space++) {
            row += " ";
        }

        for (let star = 1; star <= 2 * i - 1; star++) {
            row += "*";
        }

        console.log(row);
    }

    // Lower inverted pyramid
    for (let i = 1; i <= n; i++) {

        let row = "";

        for (let space = 1; space <= i - 1; space++) {
            row += " ";
        }

        for (let star = 1; star <= 2 * (n - i) + 1; star++) {
            row += "*";
        }

        console.log(row);
    }
}

diamondStarPattern(5);