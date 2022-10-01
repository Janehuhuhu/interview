var twoSum = function (nums, target) {
  let index1 = -1
  let index2 = -1
  for (let i = 0; i < nums.length; i++) {
    // if (nums[i] <= target) {
    index2 = nums.findIndex(j => j === target - nums[i])
    console.log('gggg', index2)
    if (index2 !== -1 && index2 !== i) {
      index1 = i
      break;
    }
    // }
  }
  return [index1, index2]
}

console.log(twoSum([-1, -2, -3, -4, -5], -8))