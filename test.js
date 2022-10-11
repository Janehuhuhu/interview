var climbStairs = function (n) {
  // if (n < 1) return
  // if (n === 1) {
  //   return 1
  // } else if (n === 2) {
  //   return 2
  // } else {
  //   return climbStairs(n - 1) + climbStairs(n - 2)
  // }
  let preValue = 0
  let curValue = 1
  let total = 0
  for (let i = 1; i < n; i++) {
    total = preValue + curValue // 1 2 3 
    preValue = curValue // 1 1 2
    curValue = total // 1 2 3
  }
  return total
};
console.time()
console.log(climbStairs(20))
console.timeEnd()
