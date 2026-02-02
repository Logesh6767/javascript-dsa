// Remove Duplicates from Sorted Array
 var removeDuplicate = function(arr) {
   if (arr.length <= 1) return arr
   let writeIndex = 1
   for (i = 1; i < arr.length; i++) {
        if (arr[i] !== arr[i - 1]) {
            arr[writeIndex] = arr[i]
            writeIndex++
        }
   }
   return arr
 }


 

 //Reverse a String
  function reverseString(s) {
    if (s <= 1) return s
    let left = 0
    let right = s.length - 1
    while (left > right) {
        let temp = s[left]
        s[left] = s[right]
        s[right] = temp
        left++
        right--
    }
    return s
  }

  // Find the Maximum Number in an Array
  // Input: [3, 7, 1, 9, 4]
  // Output: 9

  // 👉 Expectation:
  // Loop
  // Comparison
  // Variable tracking

  function findMax(nums) {
    // declare a variable to store temp max number, while being initialized at 0
    let tempMax = nums[0]
    // loop through nums starting from (left + 1)th index
    for (let right = 1; right < nums.length; right++) {
        // a condition to check if the right is greater than the left
        if (tempMax < nums[right]) {
            // if true, update the value in the temp and set the left pointer at (left + 1)
            tempMax = nums[right]
        }

    }
    // return the temp
    return tempMax
  }

  function findMaxUsingMath(nums) {
    return Math.max(...nums)
  }


  // 3️⃣ Check if a String is a Palindrome

  // Input: "madam" → true
  // Input: "hello" → false

  // 👉 Expectation:
  // Loop or reverse logic
  // Conditional return

  var isPalindrome = function(s) {
    // declare a variable for left pointer
    let left = 0
    // declare a variable for right pointer
    let right = s.length - 1
    // while left < right
    while (left < right) {
        // check if the value of left is not equal to value of right
        if (s[left] !== s[right]) {
          // if true, return false
          return false
        }
        left++
        right--
    }
    // return true
    return true
  };

  // Remove Duplicate Values from an Array
  // Input: [1, 2, 2, 3, 4, 4]
  // Output: [1, 2, 3, 4]

  // 👉 Expectation:
  // Loop
  // Temporary array or object
  // Clear logic

  // function removeDuplicate2(nums) {
  //   // declare a temp array
  //   let temp = []
  //   // loop through the input array from 0th index
  //   for (let i = 0; i < nums.length; i++) {
  //     //check if the current element does exist in the temp array
  //     let currentValue = nums[i]
  //     if (!temp.includes(currentValue)) {
  //       // if true, do nothing and continue the loop
  //       // if false, store it and continue the loop
  //       temp.push(currentValue)
  //     }  
  //   }
  //   return temp
  //   //return the temp array    
  // }

  // function removeDuplicate2(nums) {
  //   // declare a temp array
  //   let temp = []
  //   // loop through the input array from 0th index
  //   for (let i = 0; i < nums.length; i++) {
  //     //check if the current element does exist in the temp array
  //     let currentValue = nums[i]
  //     if (!temp.includes(currentValue)) {
  //       // if true, do nothing and continue the loop
  //       // if false, store it and continue the loop
  //       temp.push(currentValue)
  //     }  
  //   }
  //   return temp
  //   //return the temp array    
  // }

  function removeDuplicate2(nums) {
    // declare a temp array
    let seen = {}
    let result = []
    // loop through the input array from 0th index
    for (let i = 0; i < nums.length; i++) {
      //check if the current element does exist in the temp array
      let currentValue = nums[i]
      console.log(seen[currentValue])
      if (!seen[currentValue]) {
        seen[currentValue] = true
        result.push(currentValue)
      }
    }
    return result
    //return the temp array    
  }

  console.log(removeDuplicate2([1, 2, 2, 3, 4, 4]))
