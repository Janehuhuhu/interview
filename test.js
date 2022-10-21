/**
 * @param {number} n
 * @return {number[]}
 */
 var countBits = function(n) {
  const arr = []
  for (let i = 0; i < n+1; i++) {
      arr.push(count(i))
  }
  return arr

  function count(n) {
      let num = 0
      while(n) {
          n &= (n - 1)
          num++
      }
      console.log(num)
      return num
  }
};
console.log(countBits(2))