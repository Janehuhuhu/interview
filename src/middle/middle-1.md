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