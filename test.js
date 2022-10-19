/**
 * @param {number[]} nums
 * @return {number}
 */
<<<<<<< HEAD
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
=======
var singleNumber = function (nums) {
  const arr = new Set()
  for (let i = 0; i < nums.length; i++) {
    if (arr.has(nums[i])) {
      arr.delete(nums[i])
    } else {
      arr.add(nums[i])
    }
  }
  console.log('aa', [...arr][0])
  return arr[0]
};
console.time()
console.log(singleNumber([2, 2, 1]))
>>>>>>> fd20234e204b916e25cb736b7a3ce3ae65e43a37
console.timeEnd()
