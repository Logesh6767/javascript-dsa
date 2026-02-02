/*
i, loop over the item from the end of its length and move towards the beginning
    j, loop over the item from beginning and move towards the item before the i (i-1)
        compare the current item, j, with the next item, j+1
            swap them if j is greater than the j+1
*/

// another swap method for better readability
function swap(arr, indx1, indx2) {
    let temp = arr[indx1]
    arr[indx1] = arr[indx2]
    arr[indx2] = temp
}

console.time("bubbleSort");

function bubbleSort(arr) {
    for(let i = arr.length; i > 0; i--) {
        let swap = false
        for(let j = 0; j < i - 1; j++) {
            if(arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
                swap = true
            }
        }
        if (!swap) break;
    }
    return arr
}

console.log(bubbleSort([45,23,42,1,76,34,32,75,32]))

console.timeEnd("bubbleSort");