// Rotate Matrix 90°
// Example:
// Input
// 1 2 3
// 4 5 6
// 7 8 9

// Output (90° clockwise)
// 7 4 1
// 8 5 2
// 9 6 3

function rotateMatrix(matrix) {
    // loop statement for iterating through parent array from 0 to end
    for (let i = 0; i < matrix.length; i++) {
        // loop statement for iterating through child array from 1 to end
        for (let j = i; j < matrix.length; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
        // end child loop
        }
    // end parent loop
    }

    // reverse the array
    for (let i = 0; i < matrix.length; i++) {
        matrix[i].reverse()
    }

    return matrix
}

let matrix = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
]

console.log(rotateMatrix(matrix))