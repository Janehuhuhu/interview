/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    let maxLen = 0
    const arr = new Set()
    let rightPos = 0
    for (let i = 0; i < s.length; i++) {
        console.log('i', i, !i)
        if (i !== 0) {
            arr.delete(s.charAt(i - 1))
        }
        while (rightPos < s.length && !arr.has(s.charAt(rightPos))) {
            arr.add(s.charAt(rightPos))
            rightPos++
        }
        maxLen = Math.max(maxLen, arr.size)
    }
    return maxLen
};
console.log(lengthOfLongestSubstring("pwwkew"))