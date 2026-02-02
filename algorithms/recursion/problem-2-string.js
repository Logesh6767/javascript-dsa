// reverse
// Write a recursive function called reverse which accepts a string and returns a new string in reverse.

function reverse(str){
  if (str.length <= 0) return str
  return str[str.length - 1] + reverse(str.slice(0, -1))
}

// reverse('awesome') // 'emosewa'
// reverse('rithmschool') // 'loohcsmhtir'

console.log(reverse('rithmschool'))

//took me 8mins to solve