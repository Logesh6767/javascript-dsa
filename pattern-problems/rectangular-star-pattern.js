// Problem Statement: Given an integer N, print the following pattern.

// Example 1:
// Input: N = 3
// Output: 
//    ***
//    ***
//    *** 

// Example 2:
// Input: N = 6
// Output: 
//    ******
//    ******
//    ******
//    ******
//    ******
//    ******

function printStarPattern(n) {
    // loop statement that prints each "n" number of rows
    for (let i = 0; i < n; i++) {
        let row = ""
        // inner loop statement that prints each "n" number of stars in a row
        for (let j = 0; j < n; j++) {
            // print "*"
            row += "* "
        // end of inner loop
        }
        console.log(row)
    // end of outer loop
    }
}

printStarPattern(6);