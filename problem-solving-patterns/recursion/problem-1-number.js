// Write a function factorial which accepts a number and returns the factorial of that number. A factorial is the product of an integer and all the integers below it; e.g., factorial four ( 4! ) is equal to 24, because 4 * 3 * 2 * 1 equals 24.  factorial zero (0!) is always 1.
//factorial(1) // 1
// factorial(2) // 2
// factorial(4) // 24
// factorial(7) // 5040

function factorial(num){
   if (num <= 1) return 1
   return num * factorial(num-1)
}

// productOfArray([1,2,3]) // 6
// productOfArray([1,2,3,10]) // 60
function productOfArray(arr) {
    if (!arr.length) return 1
    return arr[0] * productOfArray(arr.slice(1))
}

// SAMPLE INPUT/OUTPUT
// recursiveRange(6) // 21
// recursiveRange(10) // 55 

function recursiveRange(num){
   if (num === 1) return 1
   return num + recursiveRange(num-1)
}

// fib(4) // 3
// fib(10) // 55
// fib(28) // 317811
// fib(35) // 9227465

function fib(n){
  if (n === 1) return 1
  if (n === 0) return 0
  return fib(n-1) + fib(n-2)
}
console.log(fib(4))

