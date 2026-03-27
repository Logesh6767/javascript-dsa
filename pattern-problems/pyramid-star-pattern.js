// Problem Statement: Given an integer N, print the following pattern : 
// Here, N = 5.

//     *
//    ***
//   *****
//  *******
// *********

// function printStarPattern(n) {
//     for (let i = 0; i < n; i++) {

//     let row = ""

//         for (let left = 0; left < n - i - 1; left++) {
//             row += " "
//         }
//         // i * 2 + 1
//         for (let star = 0; star < i * 2 + 1; star++) {
//             row += "*"
//         }

//         for (let right = 0; right < n - i - 1; right++) {
//             row += " "
//         }

//         console.log(row)
//     }   
// }

function printStarPattern(n) {
    // loop until i = n
    for (let i = 0; i <= n; i++) {
        // declare variable "star" for holding the row
        let star = ""

        // loop statement for printing spaces before the star(s)
        for (let left = 0; left <= n - i - 1; left++) {
            // add space to the star variable
            star += " "
        }

        // loop statement 2 for printing star(s)
        for (let print = 0; print < 2 * i - 1; print++) {
            // add star to the star variable
            star += "*"
        }

        // loop statement 3 for printing spaces after the star(s)
        for (let right = 0; right <= n - i - 1; right++) {
            // add space to the star variable
            star += " "
        }
        // log the star variable
        console.log(star)
    // end of parent loop       
    }     
}

printStarPattern(5)