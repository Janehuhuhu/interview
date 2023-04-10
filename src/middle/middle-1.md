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

<br>

### 11. 寻找重复数
```
给定一个包含 n + 1 个整数的数组 nums ，其数字都在 [1, n] 范围内（包括 1 和 n），可知至少存在一个重复的整数。

假设 nums 只有 一个重复的整数 ，返回 这个重复的数 。

你设计的解决方案必须 不修改 数组 nums 且只用常量级 O(1) 的额外空间。

示例 1：
输入：nums = [1,3,4,2,2]
输出：2
```

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums) {
    const arr = new Set()

    for (let i of nums) {
        if (arr.has(i)) {
            return i
        } else {
            arr.add(i)
        }
    }
};
```

<br>

### 12. 最长递增子序列
```
给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。

子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。

 
示例 1：
输入：nums = [10,9,2,5,3,7,101,18]
输出：4
解释：最长递增子序列是 [2,3,7,101]，因此长度为 4
```

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
 var lengthOfLIS = function(nums) {
  let deps = new Array(nums.length)
  deps.fill(1)
  let res = 0
  
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
        if (nums[i] > nums[j]) {
            deps[i] = Math.max(deps[i], deps[j] + 1)
        }
    }
    res = Math.max(res, deps[i])
  }
  return res
};
```
解题思路：
- 动态规划：dp[i] = max(dp[i], dp[j] + 1) for j in [0, i)， dp[i] 的值代表 nums 以 nums[i] 结尾的最长子序列长度，j range[0,i)

<br>

### 13. 完全平方数
```
给你一个整数 n ，返回 和为 n 的完全平方数的最少数量 。

完全平方数 是一个整数，其值等于另一个整数的平方；换句话说，其值等于一个整数自乘的积。例如，1、4、9 和 16 都是完全平方数，而 3 和 11 不是。

示例 1：
输入：n = 12
输出：3 
解释：12 = 4 + 4 + 4
```

```js
/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function(n) {
    const arr = new Array(n + 1).fill(0)
    for (let i = 1; i <= n; i++) {
        let min = Number.MAX_VALUE
        for (let j = 1; j * j <= i; j++) {
            min = Math.min(min, arr[i - j * j])
        }
        arr[i] = min + 1 
    }
    return arr[n]
};
```

解题思路：
动态规划： arr[i]表示最少需要多少个数的平方来表示整数 i。j 为一个一个平方值的试，最终拿到最小值加上 j 的本身的平方值即1.

<br>

### 14. 最长连续序列
```
给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。

请你设计并实现时间复杂度为 O(n) 的算法解决此问题。

示例 1：
输入：nums = [100,4,200,1,3,2]
输出：4
解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。
```

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
  if (!nums.length) return 0
  const arr = [...new Set(nums.sort((a,b) => a - b))]
  const res = new Array(arr.length).fill(1)
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === arr[i - 1] + 1) {
      res[i] = res[i - 1] + 1
    }
  }
  return Math.max(...res)
};
```

解题思路
动态规划：
- 去重，因为两个相等的值不算是连续序列
- 初始化，每个值都对应一个连续序列数
- 遍历，如果后一个等于前一个值加1，则当前值为前一个结果+1，否则重新计数
- 找出最大值

<br>

### 15. 两数相加
```
给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。

请你将两个数相加，并以相同形式返回一个表示和的链表。

你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

示例 1：
输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[7,0,8]
解释：342 + 465 = 807.
```

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let prev = new ListNode(0)
    let cur = prev
    let last = 0
    while(l1 != null || l2 != null || last) {
        const x = l1 == null ? 0 : l1.val
        const y = l2 == null ? 0 : l2.val
        const sum = x + y + last

        last = parseInt(sum / 10)
        cur.next = new ListNode(sum % 10)
        cur = cur.next
        if (l1 != null) {
            l1 = l1.next
        }
        if (l2 != null) {
            l2 = l2.next
        }
    }
    return prev.next
};
```

解题思路
- 一定要let prev = new ListNode(0)；let cur = prev，这样才能return出初始节点
- 节点存不存在一定要用 null 判断，且用 == 而非 ===
- 不要使用 && 给节点next赋值，因为结果可能为布尔值，导致一直循环

<br>

### 15. 最小路径和
```
给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。

说明：每次只能向下或者向右移动一步。

 

示例 1：
输入：grid = [[1,3,1],[1,5,1],[4,2,1]]
输出：7
解释：因为路径 1→3→1→1→1 的总和最小。
```

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
    const m = grid.length
    const n = grid[0].length
    const dfs = new Array(m).fill(0).map(item => new Array(n).fill(0))
    dfs[m - 1][n - 1] = grid[m - 1][n - 1]
    for (let i = m - 1; i >=0; i--) {
        for (let j = n - 1; j >=0; j--) {
            if (i === m - 1 && j !== n - 1) {
                 // 最后一行
                dfs[i][j] = grid[i][j] + dfs[i][j + 1]
            } else if (i !== m - 1 && j === n - 1) {
                // 最后一列
                dfs[i][j] = grid[i][j] + dfs[i + 1][j]
            } else if (i !== m - 1 && j !== n - 1) {
                // 中间位置
                dfs[i][j] = grid[i][j] + Math.min(dfs[i + 1][j], dfs[i][j + 1])
            }
        }
    }
    return dfs[0][0]
};
```

解题思路
动态规划：创建二维数组,与原始网格的大小相同，dp[i][j] 表示从终点出发到 (i,j) 位置的最小路径和


<br>

### 16. 最大子数组和
```
给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

子数组 是数组中的一个连续部分。

示例 1：
输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
输出：6
解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
```

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
 var maxSubArray = function(nums) {
  const dfs = new Array(nums.length)
  dfs[0] = nums[0]
  let res = Number.MIN_SAFE_INTEGER
  for (let i = 1; i < nums.length; i++) {
     if(dfs[i - 1] > 0) {
         dfs[i] = dfs[i - 1] + nums[i]
     } else {
         dfs[i] = nums[i]
     }
  }

  for (let i of dfs) {
      res = Math.max(res, i)
  }
  return res
};
```

解题思路
动态规划：dp[i]：表示以 nums[i] 结尾 的 连续 子数组的最大和
- 如果 dp[i - 1] > 0，那么可以把 nums[i] 直接接在 dp[i - 1] 表示的那个数组的后面，得到和更大的连续子数组；
- 如果 dp[i - 1] <= 0，那么 nums[i] 加上前面的数 dp[i - 1] 以后值不会变大。于是 dp[i] 「另起炉灶」，此时单独的一个 nums[i] 的值，就是 dp[i]

<br>

### 17. 子集
```
给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。

解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。

示例 1：
输入：nums = [1,2,3]
输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
```

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var subsets = function(nums) {
  let res = [[]]
  for (let i = 0; i < nums.length; i++) {
      const temp = JSON.parse(JSON.stringify(res))
      const next = temp.map(item => {
        item.push(nums[i])
        return item
      })
      res = res.concat(next)
  }
  return res
};
```

解题思路:
- 每添加一个元素，创建一个子集合next, 为之前每个集合中的子集加该元素，然后合并。举个例子，原本集合为[]，增加元素1，则为[[],[1]]，增加元素2，则为[[],[1],[2],[1,2]],以此类推
- 注意每次遍历创建子集合的时候，一定要深拷贝原集合，避免修改新子集合的时候影响原集合中元素。因为每个集合中的元素都为引用类型

<br>

### 18. 颜色分类
```
给定一个包含红色、白色和蓝色、共 n 个元素的数组 nums ，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。

必须在不使用库内置的 sort 函数的情况下解决这个问题。

示例 1：
输入：nums = [2,0,2,1,1,0]
输出：[0,0,1,1,2,2]
```

```js
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {
    let index= 0

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) {
            let temp = nums[index]
            nums[index] = 0
            nums[i] = temp
            index++
        }
    } 
    for (let i = index; i < nums.length; i++) {
        if (nums[i] === 1) {
            let temp = nums[index]
            nums[index] = 1
            nums[i] = temp
            index++
        }
    } 
    return nums
};
```
解题思路
对数组进行两次遍历。在第一次遍历中，我们将数组中所有的 0 交换到数组的头部。在第二次遍历中，我们将数组中所有的1 交换到头部的0 之后。此时，所有的 2 都出现在数组的尾部，这样我们就完成了排序


<br>

### 19. 全排列
```
给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。

示例 1：

输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    const res = []
    // depth: 深度或第i个位置
    // path: 每个可能的排列
    // res: 最终结果
    // used: 每加一层，这层能填充的可能数值减少，记录之前几层已经用过的值
    function backtrack(depth, path, used) {
        if (depth === nums.length) {
            // 浅拷贝，避免后面pop值后被修改
            res.push(path.slice())
            return res
        }
        // 每到一层，遍历每个没有使用过的元素，往排列中填充
        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue
            path.push(nums[i])
            used[i] = true
            backtrack(depth + 1, path, used)
            // 回到上一层，进行状态重置
            path.pop(nums[i])
            used[i] = false
        }
    }
    backtrack(0, [], [])
    return res
};
```
解题思路
回溯/深度遍历： 
- 把每个位置的元素当作一层，第一层即位置0可以填充所有的数组元素，第二层填充除第一层外的所有元素，第三层依次类推
详见: [回溯](https://leetcode.cn/problems/permutations/solution/quan-pai-lie-by-leetcode-solution-2/)


<br>

### 20. 旋转图像
```
给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。

你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要 使用另一个矩阵来旋转图像。

示例 1：
输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
输出：[[7,4,1],[8,5,2],[9,6,3]]
```

```js
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
    if (matrix.length === 0 || matrix.length !== matrix[0].length) {
        return
    }
    const len = matrix.length

    // 沿 / 线翻转
    for (let i = 0; i < len; i++) {
        // 注意 j 的遍历终止位置
        for (let j = 0; j < len - i; j++) {
            const temp = matrix[i][j]
            // 注意下标!!!
            matrix[i][j] = matrix[len - 1 - j][len - 1 - i]
            matrix[len - 1 - j][len - 1 - i] = temp
        }
    }

    // 水平翻转
    const mid = parseInt(len / 2)
    for (let i = 0; i < len / 2; i++) {
        for (let j = 0; j < len; j++) {
            const temp = matrix[i][j]
            matrix[i][j] = matrix[len - 1 - i][j]
            matrix[len - 1 - i][ j] = temp
        }
    }
    return matrix
};
```

解题思路
- 先沿右上 - 左下的对角线翻转（270°+ 一次镜像），再沿水平中线上下翻转（−180°+ 一次镜像），可以实现顺时针 90 度的旋转效果
- 注意兑换位置的下标和第二层的遍历截至位置，避免又替换回来


<br>

### 21. 合并区间
```
以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。

示例 1：
输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
输出：[[1,6],[8,10],[15,18]]
解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
```

```js
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    if (!intervals.length) return []
    // 升序排列
    intervals.sort((a,b) => a[0] - b[0])
    const res = []
    for (let i = 0; i < intervals.length; i++) {
        let last = res.length - 1
        if (res.length && intervals[i][0] <= res[last][1]) {
            res[last][1] = Math.max(intervals[i][1], res[last][1])
        } else {
            res.push(intervals[i])
        }
    }
    return res
};
```

解题思路
- 按照左节点进行升序排序
- 比较当前左节点与上一个序列中右节点，如果前者小于等于，则将上一个序列中的右节点替换成【当前右节点，上个序列右节点】的最大值。否则，将该节点添加到结果数组中

<br>

### 22. 单词搜索
```
给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。如果 word 存在于网格中，返回 true ；否则，返回 false 。

单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。


示例 1：
输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
输出：true
```

```js
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    const h = board.length
    const w = board[0].length
    const visited = new Array(h);
    for (let i = 0; i < visited.length; ++i) {
        visited[i] = new Array(w).fill(false);
    }    
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    function check(i, j, k) {
        let res = false
        if (board[i][j] !== word.charAt(k)) {
            return false
        } else if (k === word.length - 1) {
            return true
        }
        visited[i][j] = true
        
        for (let [dx, dy] of directions) {
            const newi = i + dx
            const newj = j + dy
            if (newi >= 0 && newi < h && newj >= 0 && newj < w) {
                if (!visited[newi][newj]) {
                    const flag = check(newi, newj, k + 1)
                    if (flag) {
                        res = true
                        break
                    }
                }
            }
        }
        visited[i][j] = false
        return res
    }

    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            const result = check(i, j, 0)
            if (result) {
                return true
            }
        }
    }
    return false
}
```

解题思路：
- 设函数 check(i,j,k) 表示判断以网格的 (i,j) 位置出发，能否搜索到单词 word[k..]，其中 
word[k..] 表示字符串 word 从第 k 个字符开始的后缀子串。如果能搜索到，则返回 true，反之返回 
false。
- 为了防止重复遍历相同的位置，需要额外维护一个与board 等大的 visited 数组，用于标识每个位置是否被访问过。每次遍历相邻位置时，需要跳过已经被访问的位置。
- 第三，为什么visit需要复位？因为当前格子作为中途某一处的起始点，并且走不通时，它是可以回退到上一个格子，并且选择其他方向重新开始的。而此时我们不希望当前格子的遍历路径影响到回退后新路径的尝试。

<br>

### 23. 和为 K 的子数组
```
给你一个整数数组 nums 和一个整数 k ，请你统计并返回 该数组中和为 k 的连续子数组的个数 。

示例 1：
输入：nums = [1,1,1], k = 2
输出：2
```

```js
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
            if (temp === k) {
                count++
            }
        }
    }
    return count
};
```

解题思路：
- 依次计算每个位置开头的子数组的和的可能性
