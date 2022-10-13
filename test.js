/**
 * @param {number[]} nums
 * @return {number}
 */
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
console.timeEnd()
