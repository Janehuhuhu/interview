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