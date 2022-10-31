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

### 3.
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