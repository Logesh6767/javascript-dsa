// Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.

// Example 1:

// Input: haystack = "sadbutsad", needle = "sad"
// Output: 0
// Explanation: "sad" occurs at index 0 and 6.
// The first occurrence is at index 0, so we return 0.
// Example 2:

// Input: haystack = "leetcode", needle = "leeto"
// Output: -1
// Explanation: "leeto" did not occur in "leetcode", so we return -1.

// var strStr = function(haystack, needle) {
//     const char = needle.length
//     let i = 0
//     for (let j = char; j <= haystack.length; j++) {
//         let word = haystack.slice(i,j)
//         console.log(word)
//         if (word != needle) {
//             i++
//         } else {
//             return i
//         }
//     }
//     return -1 
// };

var strStr = function(haystack, needle) {
    // Edge cases
    if (needle === "") return 0;
    if (needle.length > haystack.length) return -1;

    // Iterate only up to the last possible position where needle could fit
    for (let i = 0; i <= haystack.length - needle.length; i++) {
        let found = true;
        
        // Check each character of needle against haystack
        for (let j = 0; j < needle.length; j++) {
            if (haystack[i + j] !== needle[j]) {
                found = false;
                break;  // Break early if any character doesn't match
            }
        }
        
        // If all characters matched, we found our needle
        if (found) return i;
    }
    
    return -1;
};

console.log(strStr("sadbutsad", "sad"))