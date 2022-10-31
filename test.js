/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
    let start = 0
    let end = 0
    console.log('s', s.length)

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
        console.log('sss', i, start, end)
    }
    return s.substring(start, end + 1)


    function expandAroundCenter(s, left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            --left
            ++right
        }
        return [left + 1, right - 1]
    }
};
console.log(longestPalindrome("babad"))