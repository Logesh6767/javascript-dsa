// Frequency Counter - sameFrequency
// Write a function called sameFrequency. Given two positive integers, find out if the two numbers have the same frequency of digits.

// Your solution MUST have the following complexities:

// Time: O(N)

// Sample Input:

// sameFrequency(182,281) // true
// sameFrequency(34,14) // false
// sameFrequency(3589578, 5879385) // true
// sameFrequency(22,222) // false

//Took me 22 mins to solve without help

function sameFrequency(num1, num2){
    let digits1 = num1.toString().split('')
    let digits2 = num2.toString().split('')
    if (digits1.length !== digits2.length) return false
    //declare a obj to store the frequenct of digits1
    let frequencyOfDigits1 = {}
    let frequencyOfDigits2 = {}
    //loop through digits1 and store the frequencies of values
    for (let val of digits1) {
        //increament the frequency corresponding to the value
        frequencyOfDigits1[val] = (frequencyOfDigits1[val] || 0) + 1
    }
    //loop through digits2 and store the frequencies of values
    for (let val of digits2) {
        //increament the frequency corresponding to the value
        frequencyOfDigits2[val] = (frequencyOfDigits2[val] || 0) + 1
    }   
    //loop through keys in obj
    for (let key in frequencyOfDigits1) {
        //check if both the frequencies of the digits1 and 2 has same frequencies-=
        if (!(key in frequencyOfDigits2)) {
            return false
        }
    }
    return true         
}
console.log(sameFrequency(182,286))