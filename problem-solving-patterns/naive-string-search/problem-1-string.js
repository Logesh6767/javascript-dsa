// input = ("lorie loled", "lol")
// output = 1

function naiveSearch(long, short) {
    // declare variable for count
    let count = 0
    // loop over long string
    for ( let i = 0; i < long.length; i++) {
        // loop over short string
        for (let j = 0; j < short.length; j++) {
            // if the characters do not match, break the this inner loop
            if (long[i+j] !== short[j]) break;

            if (j === short.length - 1) count++;
        // end of inner loop
        }
    // end of outer loop
    }
    // return the count
    return count
}

console.log(naiveSearch("lorie loled", "lol"))