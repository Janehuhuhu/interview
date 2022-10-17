## 力扣热门100题（简单）

### 1. 两数之和
*给定一个整数数组 `nums` 和一个整数目标值 `target`，请你在该数组中找出 和为目标值 `target ` 的那 两个 整数，并返回它们的数组下标。
你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现*

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let index1 = -1
    let index2 = -1
    const numsMap = new Map()
    nums.forEach((item, index) => numsMap.set(item, index))
    for (let i = 0; i < nums.length; i++) {
        index2 = numsMap.get(target - nums[i])
        if (index2 && index2 !== i) {
            index1 = i
            break;
        } 
        
    }
    return [index1, index2]
};
```
思路：
  - 使用哈希表(Map)，可以将寻找 `target - x` 的时间复杂度降低到从 O(N) 降低到 O(1)， `findIndex` 复杂度为 *O(N)*, `map.get` 复杂度为 *O(1)*
  - 可能为负数，所以不能简单排除比 `target` 大的数值
  - 可能为 0，所以单个值可能等于 `target`

<br>

### 2. 有效的括号
给定一个只包括 `'('，')'，'{'，'}'，'['，']'` 的字符串 `s` ，判断字符串是否有效。
```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
if (s.length % 2) return false
  const map = new Map([
    [')', '('],
    ['}', '{'],
    [']', '['],
  ])
  const tempArr = []
  for (let i of s) {
    if (map.has(i)) {
      if (tempArr.pop() !== map.get(i)) return false
    } else {
        tempArr.push(i)
    }
  }
  return !tempArr.length
};
```
思路：
- 成对出现的元素首要考虑的方法是栈
- 用元素长度直接判断，节约后续处理内存
-  `map` 类型的数据可以用 `has` 判断有无

<br>

### 3. 爬楼梯
假设你正在爬楼梯。需要 `n` 阶你才能到达楼顶。每次你可以爬 `1` 或 `2` 个台阶。你有多少种不同的方法可以爬到楼顶呢？
```js
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    let preValue = 0
    let curValue = 0
    let total = 1
    for (let i = 1; i <= n; i++) {
        preValue = curValue // 0 1 1
        curValue = total // 1 1 2
        total = preValue + curValue // 1 2 3
    }
    return total
}
```
思路：
- 我们用 `f(x)` 表示爬到第 `x` 级台阶的方案数，考虑最后一步可能跨了一级台阶，也可能跨了两级台阶, 所以最终结果是 *f(x)=f(x−1)+f(x−2)*
- 不能用递归，可能导致内存溢出

<br>

### 4. 二叉树的中序遍历
给定一个二叉树的根节点 `root` ，返回 它的 中序 遍历 。

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    const res = []
    const inorder = function(root) {
        if (!root) return
        inorder(root.left)
        res.push(root.val)
        inorder(root.right)
        return res
    }
    inorder(root)
    return res
};
```
思路：
- 按照顺序遍历即可，遇到空终止
- 前序：根节点 -> 左子树 -> 右子树；中序：左 -> 根 -> 右； 后序：左 -> 右 -> 根

<br>

### 5. 对称二叉树
给你一个二叉树的根节点 `root` ， 检查它是否轴对称。

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
    const check = function(p, q) {
        if (!p && !q) return true
        if (!p || !q) return false
        return p.val === q.val && check(p.left, q.right) && check(p.right, q.left)
    }
    return check(root, root)
};
```
思路：
- 实现这样一个递归函数，通过「同步移动」两个指针的方法来遍历这棵树，`p` 指针和 `q` 指针一开始都指向这棵树的根，随后 `p` 右移时，`q` 左移，`p` 左移时，`q` 右移。每次检查当前 `p` 和 `q` 节点的值是否相等，如果相等再判断左右子树是否对称

<br>

### 6. 二叉树的最大深度
给定一个二叉树，找出其最大深度。二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。
```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    if (!root) return 0
    const left = maxDepth(root.left)
    const right = maxDepth(root.right)
    return Math.max(left, right) + 1
};
```
思路：
- 节点为空时说明高度为 `0`，所以返回 `0`；节点不为空时则分别求左右子树的高度的最大值，同时加 `1` 表示当前节点的高度，返回该数值

<br>

### 7. 买卖股票的最佳时机
给定一个数组 `prices` ，它的第 `i` 个元素 `prices[i]` 表示一支给定股票第 `i` 天的价格。
你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润
```js
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let max = 0
    let min = Infinity
    for(let i = 0; i < prices.length; i++) {
        if (prices[i] < min) {
            min = prices[i]
        } else if (max < prices[i] - min) {
            max = prices[i] - min
        }
    }
    return max
};
```
思路：
- 一次遍历，找到最低点为基准，如果后续遍历元素比比最低点小，则以当前点为基准，如果比他大且和基准的差值大于已有差值，则替换

<br>

### 8. 多数元素
给定一个大小为 `n` 的数组 `nums` ，返回其中的多数元素。多数元素是指在数组中出现次数 大于 `⌊ n/2 ⌋` 的元素。
```js
/**
 * @param {number[]} nums
 * @return {number}
 */
 var majorityElement = function(nums) {
  const map = new Map()
  let res
  nums.forEach(item => {
      if (map.has(item)) {
          map.set(item, map.get(item) + 1)
      } else {
          map.set(item, 1)
      }
  })

  const threshold = Math.floor(nums.length / 2)
  map.forEach((value, key) => {
      if (value > threshold) {
         res = key
      }
  })
  return res
};
```
思路：
- 循环遍历数组 `nums` 并将数组中的每个元素加入哈希映射中。在这之后，我们遍历哈希映射中的所有键值对，返回值最大的键