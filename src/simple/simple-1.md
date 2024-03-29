## 力扣热门 100 题（简单）

### 1. 两数之和

_给定一个整数数组 `nums`  和一个整数目标值 `target`，请你在该数组中找出 和为目标值 `target ` 的那   两个   整数，并返回它们的数组下标。
你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现_

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  let index1 = -1;
  let index2 = -1;
  const numsMap = new Map();
  nums.forEach((item, index) => numsMap.set(item, index));
  for (let i = 0; i < nums.length; i++) {
    index2 = numsMap.get(target - nums[i]);
    if (index2 && index2 !== i) {
      index1 = i;
      break;
    }
  }
  return [index1, index2];
};
```

思路：

- 使用哈希表(Map)，可以将寻找 `target - x` 的时间复杂度降低到从 O(N) 降低到 O(1)， `findIndex` 复杂度为 _O(N)_, `map.get` 复杂度为 _O(1)_
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
  if (s.length % 2) return false;
  const map = new Map([
    [")", "("],
    ["}", "{"],
    ["]", "["],
  ]);
  const tempArr = [];
  for (let i of s) {
    if (map.has(i)) {
      if (tempArr.pop() !== map.get(i)) return false;
    } else {
      tempArr.push(i);
    }
  }
  return !tempArr.length;
};
```

思路：

- 成对出现的元素首要考虑的方法是栈
- 用元素长度直接判断，节约后续处理内存
- `map` 类型的数据可以用 `has` 判断有无

<br>

### 3. 爬楼梯

假设你正在爬楼梯。需要 `n` 阶你才能到达楼顶。每次你可以爬 `1` 或 `2` 个台阶。你有多少种不同的方法可以爬到楼顶呢？

```js
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  let preValue = 0;
  let curValue = 0;
  let total = 1;
  for (let i = 1; i <= n; i++) {
    preValue = curValue; // 0 1 1
    curValue = total; // 1 1 2
    total = preValue + curValue; // 1 2 3
  }
  return total;
};
```

思路：

- 我们用 `f(x)` 表示爬到第 `x` 级台阶的方案数，考虑最后一步可能跨了一级台阶，也可能跨了两级台阶, 所以最终结果是 _f(x)=f(x−1)+f(x−2)_
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
var inorderTraversal = function (root) {
  const res = [];
  const inorder = function (root) {
    if (!root) return;
    inorder(root.left);
    res.push(root.val);
    inorder(root.right);
    return res;
  };
  inorder(root);
  return res;
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
var isSymmetric = function (root) {
  const check = function (p, q) {
    if (!p && !q) return true;
    if (!p || !q) return false;
    return p.val === q.val && check(p.left, q.right) && check(p.right, q.left);
  };
  return check(root, root);
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
var maxDepth = function (root) {
  if (!root) return 0;
  const left = maxDepth(root.left);
  const right = maxDepth(root.right);
  return Math.max(left, right) + 1;
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
var singleNumber = function (nums) {
  const arr = new Set();
  for (let i = 0; i < nums.length; i++) {
    if (arr.has(nums[i])) {
      arr.delete(nums[i]);
    } else {
      arr.add(nums[i]);
    }
  }
  return [...arr][0];
};
```

思路：

- 使用集合存储数字。遍历数组中的每个数字，如果集合中没有该数字，则将该数字加入集合，如果集合中已经有该数字，则将该数字从集合中删除，最后剩下的数字就是只出现一次的数字。

<br>

### 8. 环形链表

给你一个链表的头节点 `head` ，判断链表中是否有环。
如果链表中有某个节点，可以通过连续跟踪 `next` 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 `pos` 来表示链表尾连接到链表中的位置（索引从 `0` 开始）。注意：`pos` 不作为参数进行传递  。仅仅是为了标识链表的实际情况。
如果链表中存在环  ，则返回 `true` 。 否则，返回 `false`

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
var hasCycle = function (head) {
  if (head === null || head.next === null) {
    return false;
  }
  let slow = head;
  let fast = head.next;

  while (slow !== fast) {
    if (fast === null || fast.next === null) {
      return false;
    }
    slow = slow.next;
    fast = fast.next.next;
  }
  return true;
};
```

思路：

- 假想「乌龟」和「兔子」在链表上移动，「兔子」跑得快，「乌龟」跑得慢。当「乌龟」和「兔子」从链表上的同一个节点开始移动时，如果该链表中没有环，那么「兔子」将一直处于「乌龟」的前方；如果该链表中有环，那么「兔子」会先于「乌龟」进入环，并且一直在环内移动。等到「乌龟」进入环时，由于「兔子」的速度快，它一定会在某个时刻与乌龟相遇，即套了「乌龟」若干圈。

- 我们可以根据上述思路来解决本题。具体地，我们定义两个指针，一快一慢。慢指针每次只移动一步，而快指针每次移动两步。初始时，慢指针在位置 head，而快指针在位置 head.next。这样一来，如果在移动的过程中，快指针反过来追上慢指针，就说明该链表为环形链表。否则快指针将到达链表尾部，该链表不为环形链表。

<br>

### 9. 相交链表

给你两个单链表的头节点 `headA` 和 `headB` ，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 `null` 。

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
var getIntersectionNode = function (headA, headB) {
  if (!headA || !headB) return null;
  const arr = new Set();
  let temp = headA;
  while (temp !== null) {
    arr.add(temp);
    temp = temp.next;
  }
  temp = headB;
  while (temp !== null) {
    if (arr.has(temp)) {
      return temp;
    }
    temp = temp.next;
  }
  return null;
};
```

思路：

- 链表是否为空用 `temp !== null`, 用 `!temp` 可能会报错
- 首先遍历链表 `headA`，并将链表 `headA` 中的每个节点加入哈希集合中。然后遍历链表 `headB`，对于遍历到的每个节点，判断该节点是否在哈希集合中： - 如果当前节点不在哈希集合中，则继续遍历下一个节点； - 如果当前节点在哈希集合中，则后面的节点都在哈希集合中，即从当前节点开始的所有节点都在两个链表的相交部分，因此在链表 `headB` 中遍历到的第一个在哈希集合中的节点就是两个链表相交的节点，返回该节点。
  如果链表 `headB` 中的所有节点都不在哈希集合中，则两个链表不相交，返回 `null`。

<br>

### 10. 买卖股票的最佳时机

给定一个数组 `prices` ，它的第  `i` 个元素  `prices[i]` 表示一支给定股票第 `i` 天的价格。
你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润

```js
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let max = 0;
  let min = Infinity;
  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < min) {
      min = prices[i];
    } else if (max < prices[i] - min) {
      max = prices[i] - min;
    }
  }
  return max;
};
```

思路：

- 一次遍历，找到最低点为基准，如果后续遍历元素比比最低点小，则以当前点为基准，如果比他大且和基准的差值大于已有差值，则替换

<br>

### 11. 多数元素

给定一个大小为 `n` 的数组 `nums` ，返回其中的多数元素。多数元素是指在数组中出现次数 大于 `⌊ n/2 ⌋` 的元素。

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  const map = new Map();
  let res;
  nums.forEach((item) => {
    if (map.has(item)) {
      map.set(item, map.get(item) + 1);
    } else {
      map.set(item, 1);
    }
  });

  const threshold = Math.floor(nums.length / 2);
  map.forEach((value, key) => {
    if (value > threshold) {
      res = key;
    }
  });
  return res;
};
```

思路：

- 循环遍历数组 `nums` 并将数组中的每个元素加入哈希映射中。在这之后，我们遍历哈希映射中的所有键值对，返回值最大的键

<br>

### 12. 反转链表

给你单链表的头节点 `head` ，请你反转链表，并返回反转后的链表。

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
 * @return {ListNode}
 */
var reverseList = function (head) {
  let prev = null;
  let cur = head;
  while (cur) {
    const next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }
  return prev;
};
```

思路:

- 在遍历链表时，将当前节点的 `next` 指针改为指向前一个节点。由于节点没有引用其前一个节点，因此必须事先存储其前一个节点。在更改引用之前，还需要存储后一个节点。最后返回新的头引用。

<br>

### 13. 翻转二叉树

给你一棵二叉树的根节点 `root` ，翻转这棵二叉树，并返回其根节点。

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
 * @return {TreeNode}
 */
var invertTree = function (root) {
  if (root === null) {
    return null;
  }
  const left = invertTree(root.left);
  const right = invertTree(root.right);
  root.left = right;
  root.right = left;
  return root;
};
```

思路：

- 递归：我们从根节点开始，递归地对树进行遍历，并从叶子节点先开始翻转。如果当前遍历到的节点 `root` 的左右两棵子树都已经翻转，那么我们只需要交换两棵子树的位置，即可完成以 `root` 为根节点的整棵子树的翻转

<br>

### 14. 回文链表

给你一个单链表的头节点 `head` ，请你判断该链表是否为回文链表。如果是，返回 `true` ；否则，返回 `false` 。

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
 * @return {boolean}
 */
var isPalindrome = function (head) {
  const arr = [];
  while (head !== null) {
    arr.push(head.val);
    head = head.next;
  }
  for (let i = 0, j = arr.length - 1; i < j; i++, j--) {
    if (arr[i] !== arr[j]) {
      return false;
    }
  }
  return true;
};
```

思路：

- 正确的比较方式是：_node_1.val == node_2.val_，而 _node_1 == node_2_ 是错误的。所以不能逆序再比较
- 思路： 复制链表值到数组列表中。使用双指针法判断是否为回文。

<br>

### 15. 移动零

给定一个数组 `nums`，编写一个函数将所有 `0` 移动到数组的末尾，同时保持非零元素的相对顺序。请注意 ，必须在不复制数组的情况下原地对数组进行操作。

```js
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  let j = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[j++] = nums[i];
    }
  }
  for (let i = j; i < nums.length; i++) {
    nums[i] = 0;
  }
  return nums;
};
```

思路：

- 第一次遍历，将非零元素全部移动到左侧。第二次遍历将剩下位置置零

<br>

### 16. 比特位计数

给你一个整数 `n` ，对于 `0 <= i <= n` 中的每个 `i` ，计算其二进制表示中 `1` 的个数 ，返回一个长度为 `n + 1` 的数组 `ans` 作为答案。

```js
/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function (n) {
  const arr = [];
  for (let i = 0; i < n + 1; i++) {
    arr.push(count(i));
  }
  return arr;

  function count(n) {
    let num = 0;
    while (n) {
      n &= n - 1;
      num++;
    }
    return num;
  }
};
```

思路：

- 对于任意整数 `x`，令 `x=x & (x−1)`，该运算将 `x` 的二进制表示的最后一个 `1` 变成 `0`。因此，对 `x` 重复该操作，直到 `x` 变成 `0`，则操作次数即为 `x` 的「一比特数」

<br>

### 17. 找到所有数组中消失的数字

给你一个含 `n` 个整数的数组 `nums` ，其中 `nums[i]` 在区间 `[1, n]` 内。请你找出所有在 `[1, n]` 范围内但没有出现在 `nums` 中的数字，并以数组的形式返回结果。

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function (nums) {
  const set = new Set(nums);
  const arr = [];
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    arr.push(i + 1);
  }
  for (let i = 0; i < arr.length; i++) {
    if (!set.has(arr[i])) {
      res.push(arr[i]);
    }
  }
  return res;
};
```

思路：

- 哈希表

<br>

### 18. 汉明距离

两个整数之间的 汉明距离 指的是这两个数字对应二进制位不同的位置的数目。给你两个整数 `x` 和 `y`，计算并返回它们之间的汉明距离。

```js
/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance = function (x, y) {
  let res = 0;
  let z = x ^ y;
  while (z !== 0) {
    z &= z - 1;
    res++;
  }
  return res;
};
```

思路：

- 先按位异或，再按上题 `Brian Kernighan` 算法计算
  - &：按位与，两位同时为“1”，结果才为“1”，否则为 0
  - ^: 按位异或，如果两个相应位为“异”（值不同），则该位结果为 1，否则为 0
  - |：按位或，参加运算的两个对象只要有一个为 1，其值为 1

<br>

### 19. 二叉树的直径

给定一棵二叉树，你需要计算它的直径长度。一棵二叉树的直径长度是任意两个结点路径长度中的最大值。这条路径可能穿过也可能不穿过根结点。

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
var diameterOfBinaryTree = function (root) {
  let ans = 1;
  const depth = function (node) {
    if (node === null) {
      return 0;
    }
    const left = depth(node.left);
    const right = depth(node.right);
    ans = Math.max(ans, left + right + 1);
    return Math.max(left, right) + 1;
  };
  depth(root);
  return ans - 1;
};
```

思路：

- 直径：指的是两个节点之间的路径长度，即从一个节点到达另一个节点需要穿过的路径长度。一条路径的长度为该路径经过的节点数减一，所以求直径（即求路径长度的最大值）等效于求路径经过节点数的最大值减一
- 树的深度：左儿子为根的子树的深度 L + 右儿子为根的子树的深度 R + 1, 通过深度递归计算树的深度
- 路径经过节点数的最大值：L + R + 1

<br>

### 20. 合并二叉树

给你两棵二叉树： `root1` 和 `root2` 。想象一下，当你将其中一棵覆盖到另一棵之上时，两棵树上的一些节点将会重叠（而另一些不会）。你需要将这两棵树合并成一棵新二叉树。合并的规则是：如果两个节点重叠，那么将这两个节点的值相加作为合并后节点的新值；否则，不为 `null` 的节点将直接作为新二叉树的节点。返回合并后的二叉树

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
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {TreeNode}
 */
var mergeTrees = function (root1, root2) {
  if (root1 === null) {
    return root2;
  }
  if (root2 === null) {
    return root1;
  }
  root1.val += root2.val;
  root1.left = mergeTrees(root1.left, root2.left);
  root1.right = mergeTrees(root1.right, root2.right);
  return root1;
};
```

思路：

- 递归，注意要把为 `null` 的情况先抛出来，避免访问左右节点报错
