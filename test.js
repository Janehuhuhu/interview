/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    // let left = 0
    // let right = nums.length
    const arr = nums.sort((a, b) => a - b)
    let res = []
    if (!arr || arr.length < 3) return res
    for (let i = 0; i < arr.length - 2; i++) {
        // 第一个数大于 0，后面的数都比它大，肯定不成立了
        if (arr[i] > 0) break
        // 去掉重复情况
        if (i > 0 && arr[i] === arr[i - 1]) continue
        let left = i + 1
        let right = arr.length - 1
        if (i === 2) {
            console.log('asss', left, right)
        }
        while (left < right) {
            if (i === 2) {
                console.log('ggg', arr[i], arr[left], arr[right])
            }
            if (arr[i] + arr[left] + arr[right] === 0) {
                if (i === 2) {
                    console.log('rrrr', arr[i], arr[left], arr[right])
                }
                res.push([arr[i], arr[left], arr[right]])
                left++
                right--
                // 现在要增加 left，减小 right，但是不能重复，比如: [-2, -1, -1, -1, 3, 3, 3], i = 0, left = 1, right = 6, [-2, -1, 3] 的答案加入后，需要排除重复的 -1 和 3
                while (left < right && arr[left] === arr[left - 1]) {
                    left++
                }
                while (left < right && arr[right] === arr[right + 1]) {
                    right--
                }
            } else if (arr[i] + arr[left] + arr[right] > 0) {
                right--
            } else {
                left++
            }
        }
    }
    return res
};
console.log(threeSum([-1, 0, 1, 2, -1, -4, -2, -3, 3, 0, 4]))