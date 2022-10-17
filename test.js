/**
 * @param {number[]} nums
 * @return {number}
 */
 var majorityElement = function(nums) {
  const map = new Map()
  let res
  nums.forEach(item => {
      if (map.has(item)) {
          map.set(item, map.get(item) + 1)
      } else {
          map.set(item, 1)
      }
  })

  const threshold = Math.floor(nums.length / 2)
  map.forEach((value, key) => {
    console.log('sssss', key, value, threshold)
      if (value > threshold) {
         res = key
      }
  })
  return res

};
console.time()
console.log(majorityElement([3,2,3]))
console.timeEnd()
