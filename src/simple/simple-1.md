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

### 7. 只出现一次的数字
给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    const arr = new Set()
    for (let i = 0; i < nums.length; i++) {
        if (arr.has(nums[i])) {
            arr.delete(nums[i])
        } else {
            arr.add(nums[i])
        }
    }
    return [...arr][0]
};
```
思路：
- 使用集合存储数字。遍历数组中的每个数字，如果集合中没有该数字，则将该数字加入集合，如果集合中已经有该数字，则将该数字从集合中删除，最后剩下的数字就是只出现一次的数字。

<br>

### 8. 环形链表
给你一个链表的头节点 `head` ，判断链表中是否有环。
如果链表中有某个节点，可以通过连续跟踪 `next` 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 `pos` 来表示链表尾连接到链表中的位置（索引从 `0` 开始）。注意：`pos` 不作为参数进行传递 。仅仅是为了标识链表的实际情况。
如果链表中存在环 ，则返回 `true` 。 否则，返回 `false`
```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    if (head === null || head.next === null) {
        return false
    }
    let slow = head
    let fast = head.next

    while(slow !== fast) {
        if (fast === null || fast.next === null) {
            return false
        }
        slow = slow.next
        fast = fast.next.next
    }
    return true
};
```
思路：
- 假想「乌龟」和「兔子」在链表上移动，「兔子」跑得快，「乌龟」跑得慢。当「乌龟」和「兔子」从链表上的同一个节点开始移动时，如果该链表中没有环，那么「兔子」将一直处于「乌龟」的前方；如果该链表中有环，那么「兔子」会先于「乌龟」进入环，并且一直在环内移动。等到「乌龟」进入环时，由于「兔子」的速度快，它一定会在某个时刻与乌龟相遇，即套了「乌龟」若干圈。

- 我们可以根据上述思路来解决本题。具体地，我们定义两个指针，一快一慢。慢指针每次只移动一步，而快指针每次移动两步。初始时，慢指针在位置 head，而快指针在位置 head.next。这样一来，如果在移动的过程中，快指针反过来追上慢指针，就说明该链表为环形链表。否则快指针将到达链表尾部，该链表不为环形链表。

<br>

### 9.
```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    if (!headA || !headB) return null
    const arr = new Set()
    let temp = headA
    while(temp !== null) {
        arr.add(temp)
        temp = temp.next
    }
    temp = headB
    while(temp !== null) {
        if (arr.has(temp)) {
            return temp
        }
        temp = temp.next
    }
    return null  
};
```
思路：
- 链表是否为空用 `temp !== null`, 用 `!temp` 可能会报错
- 首先遍历链表 `headA`，并将链表 `headA` 中的每个节点加入哈希集合中。然后遍历链表 `headB`，对于遍历到的每个节点，判断该节点是否在哈希集合中：
    - 如果当前节点不在哈希集合中，则继续遍历下一个节点；
    - 如果当前节点在哈希集合中，则后面的节点都在哈希集合中，即从当前节点开始的所有节点都在两个链表的相交部分，因此在链表 `headB` 中遍历到的第一个在哈希集合中的节点就是两个链表相交的节点，返回该节点。
如果链表 `headB` 中的所有节点都不在哈希集合中，则两个链表不相交，返回 `null`。