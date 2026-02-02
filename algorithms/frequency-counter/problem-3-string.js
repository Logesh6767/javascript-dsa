// validAnagram('', '') // true
// validAnagram('aaz', 'zza') // false
// validAnagram('anagram', 'nagaram') // true
// validAnagram("rat","car") // false) // false
// validAnagram('awesome', 'awesom') // false
// validAnagram('amanaplanacanalpanama', 'acanalmanplanpamana') // false
// validAnagram('qwerty', 'qeywrt') // true
// validAnagram('texttwisttime', 'timetwisttext') // true

// function validAnagram(str1, str2){
//   // condition to check if the lenght of strings are same in order to proceed further 
//   if (str1.length !== str2.length) {
//     return false
//   }

//   // declare two objects to store the frequencies of values in both the strs
//   let frequency1 = {};
//   let frequency2 = {};

//   // loop through str1 and store the frequencies
//   for (let val of str1) {
//     frequency1[val] = (frequency1[val] || 0) + 1
//   }
  
//   // loop through str2 and store the frequencies
//   for (let val of str2) {
//     frequency2[val] = (frequency2[val] || 0) + 1
//   }

//   // loop through each key in object1
//   for (let key in frequency1) {
//     // condition to check if the key exists in the object2
//     if (!(key in frequency2)) {
//         // if false, break the loop and return result as false
//         return false
//     }
//     // condition to check if the count of key is same in the object2
//     if (frequency1[key] !== frequency2[key]) {
//         // if false, break the loop and return result as false
//         return false
//     }
//   }
//   // end loop
//   return true  
// }

function validAnagram(str1, str2){
  // condition to check if the lenght of strings are same in order to proceed further 
  if (str1.length !== str2.length) {
    return false
  }

  // declare two objects to store the frequencies of values in both the strs
  let lookup = {};

  // loop through str1 and store the frequencies
  for (let val of str1) {
    lookup[val] = (lookup[val] || 0) + 1
  }
  
  // loop through str2 and store the frequencies
  for (let val of str2) {
    if (!(lookup[val])) {
      return false
    } else {
      lookup[val] -= 1;
    }
  }
  // end loop
  return true  
}
console.log(validAnagram('texttwisttime', 'timetwisttext'))