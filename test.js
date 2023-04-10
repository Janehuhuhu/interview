/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
    let count = 0
    for (let i = 0; i < nums.length; i++) {
        let temp = 0
        for (let j = i; j < nums.length; j++) {
            temp += nums[j]
            console.log(i, j, temp)
            if (temp === k) {
                count++
            }
        }
    }
    return count
};
console.log(subarraySum([1,-1,0],0))