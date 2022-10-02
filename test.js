var isValid = function (s) {
  const leftArr = ['(', '{', '[']
  const map = new Map([
    [')', '('],
    ['}', '{'],
    [']', '['],
  ])
  var arr = s.split('')
  const tempArr = []
  for (let i = 0; i < arr.length; i++) {
    if (leftArr.includes(arr[i])) {
      tempArr.push(arr[i])
    } else {
      const rightItem = map.get(arr[i])
      console.log('sss', tempArr)
      if (tempArr.pop() !== rightItem) return false
    }
  }
  if (tempArr.length) return false
  return true
};

console.log(isValid("[]"))