## 力扣热门100题（中等）

### 1. 无重复字符的最长子串
给定一个字符串 `s` ，请你找出其中不含有重复字符的最长子串的长度。
```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let maxLen = 0
    const arr = new Set()
    let rightPos = 0
    for(let i = 0; i < s.length; i++) {
        if (i !== 0) {
            arr.delete(s.charAt(i - 1))
        }
        while(rightPos < s.length && !arr.has(s.charAt(rightPos))) {
            arr.add(s.charAt(rightPos))
            rightPos++
        }
        maxLen = Math.max(maxLen, arr.size)
    }
    return maxLen
};
```
思路：
- 滑动窗口：左指针向右移动一格，表示我们开始枚举下一个字符作为起始位置，然后我们可以不断地向右移动右指针，但需要保证这两个指针对应的子串中没有重复的字符。如果有重复的，记录的哈希表删除掉左指针指向的数据，然后左指针向右移动

<br>

### 2. 最长回文子串
给你一个字符串 `s`，找到 `s` 中最长的回文子串。

```js
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    let start = 0
    let end = 0
    for (let i = 0; i < s.length; i++) {
        const [left1, right1] = expandAroundCenter(s, i, i)
        const [left2, right2] = expandAroundCenter(s, i, i + 1)
        if (right1 - left1 > end - start) {
            start = left1
            end = right1
        }
        if (right2 - left2 > end - start) {
            start = left2
            end = right2
        }
    }
    return s.substring(start, end + 1)

    function expandAroundCenter (s, left, right) {
        while(left >=0 && right < s.length && s[left] === s[right]) {
            --left
            ++right
        }
        return [left + 1, right - 1]
    }
};
```
思路：
- 边界情况即为子串长度为 *1* 或 *2* 的情况。我们枚举每一种边界情况，并从对应的子串开始不断地向两边扩展。如果两边的字母相同，我们就可以继续扩展，例如从 *P(i+1,j-1)* 扩展到 *P(i,j)*；如果两边的字母不同，我们就可以停止扩展，因为在这之后的子串都不能是回文串了。
- `string.substring(from, to)` 方法从 `from` 位置截取到 `to` 位置，`to` 可选，没有设置时默认到末尾。`substr()` 方法可在字符串中截取从开始下标开始的指定数目的字符。

<br>

### 3. 盛最多的水
给定一个长度为 `n` 的整数数组 `height` 。有 `n` 条垂线，第 `i` 条线的两个端点是 (i, 0) 和 (i, height[i]) 。找出其中的两条线，使得它们与 `x` 轴共同构成的容器可以容纳最多的水。返回容器可以储存的最大水量。
```js
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let area = 0
    let left = 0
    let right = height.length - 1
    while(left < right) {
        const curArea = Math.min(height[left], height[right]) * (right - left)
        if (curArea > area) area = curArea
        height[left] > height[right] ? right-- : left++
    }
    return area
};
```
思路：
- 双指针法：求出当前双指针对应的容器的容量；对应数字较小的那个指针以后不可能作为容器的边界了，将其丢弃，并移动对应的指针。

<br>

### 4. 三数之和
给你一个整数数组 `nums` ，判断是否存在三元组 *[nums[i], nums[j], nums[k]]* 满足 *i != j*、*i != k* 且 *j != k* ，同时还满足 *nums[i] + nums[j] + nums[k] == 0* 。请你返回所有和为 `0` 且不重复的三元组。注意：答案中不可以包含重复的三元组。
```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    // 带有负数的排序
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
        while(left < right) {
            if (arr[i] + arr[left] + arr[right] === 0) {
                res.push([arr[i], arr[left], arr[right]])
                left++
                right--
                // 现在要增加 left，减小 right，但是不能重复，比如: [-2, -1, -1, -1, 3, 3, 3], i = 0, left = 1, right = 6, [-2, -1, 3] 的答案加入后，需要排除重复的 -1 和 3
                while(left < right && arr[left] === arr[left - 1]){ 
                    left++
                }
                while(left < right && arr[right] === arr[right + 1]) {
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
```
思路：
- 算法流程:
    - 特判，对于数组长度 `n`，如果数组为 `null` 或者数组长度小于 3，返回 []。
    - 对数组进行排序。（注意包含负数的排序方法）
    - 遍历排序后数组：
        - 若 nums[i]>0nums[i]>0：因为已经排序好，所以后面不可能有三个数加和等于 00，直接返回结果。
        - 对于重复元素：跳过，避免出现重复解
        - 令左指针 `L=i+1`，右指针 `R=n−1`，当 `L<R` 时，执行循环：
            - 当 `nums[i]+nums[L]+nums[R]==0`，执行循环，判断左界和右界是否和下一位置重复，去除重复解。并同时将 `L,R` 移到下一位置，寻找新的解
            - 若和大于 `0`，说明 `nums[R]` 太大，`R` 左移
            - 若和小于 `0`，说明 `nums[L]` 太小，`L` 右移

<br>

### 5.  电话号码的字母组合
给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。
```js
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    const list = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']
    const res = []
    const path = []
    const len = digits.length
    if (len === 0) {
        return []
    } 
    if (len === 1) {
        return list[digits[0]].split('')
    }
    backtracking(digits, 0)
    return res

    function backtracking(digits, index) {
        const arr = list[digits[index]]
        if (path.length === len) {
            res.push(path.join(''))
            return
        } 
        for (let i of arr) {
            path.push(i)
            backtracking(digits, index + 1)
            path.pop()
        }
    }
};
```
思路:
- 数字和字母映射，通过一个数组来将下标和字母映射起来。
- 边界条件判定，当digits为空时，返回[]，当digits长度为1时，返回其电话按键的字母。
- 通过画图，我们可以很容易画出一棵多叉树，其叶子结点就是一对字母，利用数组path将其存储，而利用数组res存储path（需数组转字符串）。
通过递归来进行嵌套 for 循环
- 在递归过程中，若已经递归到底部，则停止递归，并将结果输出
[回溯算法](https://juejin.cn/post/7034389080456560670)