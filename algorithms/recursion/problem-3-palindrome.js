// isPalindrome
// Write a recursive function called isPalindrome which returns true if the string passed to it is a palindrome (reads the same forward and backward). Otherwise it returns false.

// isPalindrome('awesome') // false
// isPalindrome('foobar') // false
// isPalindrome('tacocat') // true
// isPalindrome('amanaplanacanalpanama') // true
// isPalindrome('amanaplanacanalpandemonium') // false

function isPalindrome(text){
    if (text.length <= 1) return true
    if (text[0] !== text[text.length - 1]) return false
    return isPalindrome(text.slice(1,-1))
}

console.log(isPalindrome('tacocat'))