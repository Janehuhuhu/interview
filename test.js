/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
 var moveZeroes = function(nums) {
  let count = 0
  while(count < nums.length) {
    console.log('count', count)
      if (nums[count] === 0) {
        nums.push(nums[count])
        nums.splice(count, 1)
      } else {
        count++
      }
  }
  return nums
};
console.log(moveZeroes([0,0,1]))