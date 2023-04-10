/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    const h = board.length
    const w = board[0].length
    const visited = new Array(h).fill(new Array(w).fill(false))
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    // const visited = new Array(h);
    // for (let i = 0; i < visited.length; ++i) {
    //     visited[i] = new Array(w).fill(false);
    // }
    console.log(visited)

    function check(i, j, s, k) {
        if (board[i][j] !== s.charAt(k)) {
            return false
        } else if (k === s.length - 1) {
            return true
        }
        visited[i][j] = true

        let res = false
        for (let [dx, dy] of directions) {
            const newi = i + dx
            const newj = j + dy
            if (newi >= 0 && newi < h && newj >= 0 && newj < w) {
                if (!visited[newi][newj]) {
                    const flag = check(newi, newj, s, k + 1)
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
            const flag = check(i, j, word, 0)
            if (flag) {
                return true
            }
        }
    }
    return false
}

console.log('aaa', exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]],
"ABCCED"))