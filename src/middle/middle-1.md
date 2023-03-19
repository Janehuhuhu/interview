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

<br>

### 6. 删除链表的倒数第 N 个结点
给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    const pre = new ListNode(0)
    pre.next = head
    let first = pre
    let end = pre.next

    for (let i = 0; i < n; i++) {
        end = end?.next
    }

    while(end) {
        first = first.next
        end = end.next
    }
    
    first.next = first?.next?.next
    return pre.next
};
```

算法：
双指针法：
- 设预先指针 pre 的下一个节点指向 head（重点，不然如果只有一个元素时无法删除），设前指针为 start，后指针为 end，二者都等于 pre
- start 先向前移动n步，之后 start 和 end 共同向前移动，此时二者的距离为 n，当 start 到尾部时，end 的位置恰好为倒数第 n 个节点
- 因为要删除该节点，所以要移动到该节点的前一个才能删除，所以循环结束条件为 start.next != null
- 删除后返回 pre.next，为什么不直接返回 head 呢，因为 head 有可能是被删掉的点

<br>

### 7. 删除链表的倒数第 N 个结点
数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
```
输入：n = 3
输出：["((()))","(()())","(())()","()(())","()()()"]
```
```js
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    const res = new Map()
    res.set(0, [''])
    res.set(1, ['()'])

    for (let i = 2; i < n + 1; i++) {
        const temp = []
        for (let j = 0; j < i; j++) {
            const start = res.get(j)
            const end = res.get(i - j - 1)
            for (let m = 0; m < start.length; m++) {
                for (let n = 0; n < end.length; n++) {
                    temp.push(`(${start[m]})${end[n]}`)
                }
            }
        }
         res.set(i, temp)
    }
    return res.get(n)
};
```

算法：
动态规划，dp[n] = ( + dp[i]的每一个元素 + ) + dp[n-1-i]的每一个元素
```
dp[0] = [""]
dp[1] = ["()"]
dp[2] = ["()()", "(())"]
还是把新增的 ( 放在最左边
对 dp[2] 来讲
) 在第 0 个位置就是 ( + dp[0] + ) + dp[1], 即 "()()"
) 在第 1 个位置就是 ( + dp[1] + ) + dp[0], 即 "(())"
得出的公式就是
dp[n] = ( + dp[i]的每一个元素 + ) + dp[n-1-i]的每一个元素
```
详见：[动态规划](https://juejin.cn/post/6945022770963021860)

<br>


### 8. 下一个排列
```
整数数组的一个 排列  就是将其所有成员以序列或线性顺序排列。

例如，arr = [1,2,3] ，以下这些都可以视作 arr 的排列：[1,2,3]、[1,3,2]、[3,1,2]、[2,3,1] 。
整数数组的 下一个排列 是指其整数的下一个字典序更大的排列。更正式地，如果数组的所有排列根据其字典顺序从小到大排列在一个容器中，那么数组的 下一个排列 就是在这个有序容器中排在它后面的那个排列。如果不存在下一个更大的排列，那么这个数组必须重排为字典序最小的排列（即，其元素按升序排列）。

例如，arr = [1,2,3] 的下一个排列是 [1,3,2] 。
类似地，arr = [2,3,1] 的下一个排列是 [3,1,2] 。
而 arr = [3,2,1] 的下一个排列是 [1,2,3] ，因为 [3,2,1] 不存在一个字典序更大的排列。
给你一个整数数组 nums ，找出 nums 的下一个排列。

必须 原地 修改，只允许使用额外常数空间。
```

```js
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function(nums) {
  if (nums.length < 2) {
    return nums
  }
  let m = nums.length - 2
  let n = nums.length - 1
   //从后向前找降序数，没有i为-1
  while(m >= 0 && nums[m + 1] <= nums[m]) {
      m--
  }
   //如果降序数存在，从后向前找第一个比降序数大的位置，并交换
  if (m >= 0) {
    while (nums[m] >= nums[n]) {
        n--
    }
    const temp = nums[m]
    nums[m] = nums[n]
    nums[n] = temp
  }
    //降序数后面的位置从大到小排个序
  const last  = nums.slice(m + 1)
  nums.splice(m + 1, last.length , ...last.reverse())
  return nums
};
```

解题思路：[下个排序](https://leetcode.cn/problems/next-permutation/solution/xia-yi-ge-pai-lie-by-leetcode-solution/)

<br>

### 9. 组合总和
```
给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。

candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。 

对于给定的输入，保证和为 target 的不同组合数少于 150 个。

输入：candidates = [2,3,6,7], target = 7
输出：[[2,2,3],[7]]
解释：
2 和 3 可以形成一组候选，2 + 2 + 3 = 7 。注意 2 可以使用多次。
7 也是一个候选， 7 = 7 。
仅有这两种组合。
```

```js
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    const arr = []
    const temp = []

    function dfs(target, candidates, index) {
        for (let i = index; i < candidates.length; i++) {
            if (candidates[i] > target) continue
            if (candidates[i] === target) {
                temp.push(candidates[i])
                arr.push(temp.slice()) // 必须浅拷贝，不然赋值后执行Pop又丢失了数值
                temp.pop()
            } else {
                temp.push(candidates[i])
                dfs(target - candidates[i], candidates, i)
                temp.pop()
            }
        }
    }
    dfs(target, candidates, 0)
    return arr                        
};
```

解题思路：
递归的方法，试着将每个元素放在数组里面，如果大于目标值，则放弃，如果等于目标值，则应该放在数组中，并作为其中一个解法输出，然后再pop出该值；如果小于目标值，则执行递归，递归后也要pop该值。最后遍历下一个元素

<br>


### 10. 组合总和
```
给你一个字符串 s ，请你统计并返回这个字符串中 回文子串 的数目。

回文字符串 是正着读和倒过来读一样的字符串。

子字符串 是字符串中的由连续字符组成的一个序列。

具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串。

示例 1：
输入：s = "abc"
输出：3
解释：三个回文子串: "a", "b", "c"
```

```js
/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function(s) {
    let res = 0
    const n = s.length
    for (i = 0; i < 2 * n - 1; i++) {
        let l = i / 2
        let r = i / 2 + i % 2
        while (l >= 0 && r < n && s.charAt(l) === s.charAt(r)) {
            --l
            ++r
            ++res
        }
    }
    return res
};
```

解题思路：
- 找到所有的回文中心，数量为 2n-1
- 顺着回文中心往外找所有符合的字串
[详情](https://leetcode.cn/problems/palindromic-substrings/solution/hui-wen-zi-chuan-by-leetcode-solution/)
