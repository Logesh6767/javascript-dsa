// an function to add numbers add up to given of the n from 1.
function addToN (n) {
    let num = 0;
    for (let i = 1; i <= n; i++) {
        num += i;
    }
    return num;
}

function addToN2 (n) {
    //eg: 3 * (3+1) / 2
    //    3 * (4) / 2
    //    12 / 2
    //    6
    return n * (n+1) / 2;
}

const t1 = performance.now();
const result1 = addToN(100000000);
const t2 = performance.now();

const t3 = performance.now();
const result2 = addToN2(100000000);
const t4 = performance.now();

console.log(`The result 1 is ${result1} and time taken is ${(t2 - t1)/1000}`)
console.log(`The result 2 is ${result2} and time taken is ${(t4 - t3)/1000}`)