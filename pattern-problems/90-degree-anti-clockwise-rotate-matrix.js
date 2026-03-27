// Rotate Matrix 90°
// Example:
// Input
// 1 2 3
// 4 5 6
// 7 8 9

// Output (90° anti-clockwise)
// 3 6 9
// 2 5 8
// 1 4 7

function rotateMatrix(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = i; j < matrix.length; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
        }
    }

    for (let i = 0; i < matrix.length; i++) {
        let top = 0
        let bottom = matrix.length - 1
        while (top < bottom) {
            [matrix[top][i], matrix[bottom][i]] = [matrix[bottom][i], matrix[top][i]]
            top++
            bottom--
        }
        
    }
    return matrix
}

let matrix = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
]

console.log(rotateMatrix(matrix))

function flattenArray(arr) {
    let result = []
    
    for (let val of arr) {
        if(Array.isArray(val)) {
            result = result.concat(flattenArray(val))
        } else {
            result.push(val)
        }
    }

    return result
}

function prefixSum(arr) {
    let sum = 0
    let result = []

    for ( let val of arr) {
        sum += val
        result.push(sum)
    }

    return result
}