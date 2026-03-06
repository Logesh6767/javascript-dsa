// Problem Statement: Given an integer N, print the following pattern : 
// Here, N = 5.

//     *
//    ***
//   *****
//  *******
// *********

function printStarPattern(n) {
    for (let i = 0; i < n; i++) {

    let row = ""

        for (let left = 0; left < n - i - 1; left++) {
            row += " "
        }
        // i * 2 + 1
        for (let star = 0; star < i * 2 + 1; star++) {
            row += "*"
        }

        for (let right = 0; right < n - i - 1; right++) {
            row += " "
        }

        console.log(row)
    }   
}

printStarPattern(5)