var Game = function() {
    // dom元素
    var gameDiv;
    var newxDiv;
    var timeDiv;
    var scoreDiv;
    var resultDiv;
    // 分数
    var score = 0;
    // 游戏矩阵
    var gameData = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    // 当前方块
    var cur;
    // 下一个方块
    var next;
    // divs
    var nextDivs = [];
    var gameDivs = [];
    // 初始化div
    var initDiv = function(container, data, divs) {
        for (var i = 0; i < data.length; i++) {
            var div = [];
            for (var j = 0;j < data[0].length; j++) {
                var newNode = document.createElement('div');
                newNode.className = 'none';
                newNode.style.top = (i * 20) + 'px';
                newNode.style.left = (j * 20) + 'px';
                container.appendChild(newNode);
                div.push(newNode);
            }
            divs.push(div);
        }
    };
    // 刷新div
    var refreshDiv = function(data, divs) {
        for(var i = 0; i < data.length; i++) {
            for(var j = 0; j< data[0].length; j++) {
                if (data[i][j] == 0) {
                    divs[i][j].className = 'none';
                } else if (data[i][j] == 1) {
                    divs[i][j].className = 'done';
                } else if (data[i][j] == 2) {
                    divs[i][j].className = 'current';
                }
            }
        }
    };
    // 检测点是否合法
    var check = function(pos, x, y) {
        if (pos.x + x < 0) {
            return false;
        } else if (pos.x + x >= gameData.length) {
            return false;
        } else if (pos.y + y < 0) {
            return false;
        } else if (pos.y + y >= gameData[0].length) {
            return false;
        } else if (gameData[pos.x + x][pos.y + y] === 1) {
            return false
        } else {
            return true;
        }
    };
    // 检测数据是否合法
    var isValid = function(pos, data) {
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[0].length; j++) {
                if (data[i][j] != 0) {
                    if (!check(pos, i, j)) {
                        return false;
                    }
                }
            }
        }
        return true;
    };
    // 清除数据
    var clearData = function() {
        for (var i = 0; i < cur.data.length; i++) {
            for (var j = 0; j < cur.data[0].length; j++) {
                if (check(cur.origin, i, j)) {
                    gameData[cur.origin.x + i][cur.origin.y + j] = 0;
                }
            }
        }
    };
    // 设置数据
    var setData  = function() {
        for (var i = 0; i < cur.data.length; i++) {
            for (var j = 0; j < cur.data[0].length; j++) {
                if (check(cur.origin, i, j)) {
                    gameData[cur.origin.x + i][cur.origin.y + j] = cur.data[i][j];
                }
            }
        }
    };
    // down
    var down = function() {
        if (cur.canDown(isValid)) {
            clearData();
            cur.down();
            setData();
            refreshDiv(gameData, gameDivs);
            return true;
        } else {
            return false;
        }
    };
    // left
    var left = function() {
        if (cur.canLeft(isValid)) {
            clearData();
            cur.left();
            setData();
            refreshDiv(gameData, gameDivs);
        }
    };
    // right
    var right = function() {
        if (cur.canRight(isValid)) {
            clearData();
            cur.right();
            setData();
            refreshDiv(gameData, gameDivs);
        }
    };
    // rotate
    var rotate = function() {
        if (cur.canRotate(isValid)) {
            clearData();
            cur.rotate();
            setData();
            refreshDiv(gameData, gameDivs);
        }
    };
    // 方块移动到底部，给他固定
    var fixed = function() {
        for (var i = 0; i < cur.data.length; i++) {
            for (var j = 0; j < cur.data[0].length; j++) {
                if (check(cur.origin, i, j)) {
                    if (gameData[cur.origin.x + i][cur.origin.y + j] == 2) {
                        gameData[cur.origin.x + i][cur.origin.y + j] = 1;
                    }
                }
            }
        }
        refreshDiv(gameData, gameDivs);
    };
    // 使用下一个方块
    var performNext = function(type, dir) {
        cur = next;
        setData();
        next = SquareFactory.prototype.make(type, dir);
        refreshDiv(gameData, gameDivs);
        refreshDiv(next.data, nextDivs);
    };
    // 消除同行
    var checkClear = function() {
        // 消除的行数  算分数
        var line = 0;
        for (var i = gameData.length - 1; i >= 0; i--) {
            var clear = true;
            for (var j = 0; j < gameData[0].length; j++) {
                if (gameData[i][j] != 1) {
                    clear = false;
                    break;
                }
            };
            if (clear) {
                line += 1;
                for (var m = i; m > 0; m--) {
                    for (n = 0; n < gameData[0].length; n++) {
                        gameData[m][n] = gameData[m-1][n];
                    }
                };
                for (n = 0; n < gameData[0].length; n++) {
                    gameData[0][n] = 0;
                }
                i++;
            }
        }
        return line;
    };
    // 检查游戏结束
    var checkGameOver = function() {
        var gameOver = false;
        for (var i = 0; i < gameData[0].length; i++) {
            if (gameData[1][i] == 1) {
                gameOver = true;
            }
        }
        return gameOver;
    };
    // 刷新得分情况
    var addScore = function(line) {
        var s = 0;
        switch (line) {
            case 1:
                s = 10; break;
            case 2:
                s = 30; break;
            case 3:
                s = 60; break;
            case 4:
                s = 100; break;
            default: 
                break;
        }
        score = score + s;
        scoreDiv.innerHTML = score;
    };
    // 游戏结束
    var gameOver = function(win) {
        if (win) {
            resultDiv.innerHTML = '你赢了！！！'
        } else {
            resultDiv.innerHTML = 'You Lose !!!';
            resultDiv.style.color = 'green'
        }
    };
    // 底部增加行
    var addTailLines = function(lines) {
        for (var i = 0; i < gameData.length; i++) {
            gameData[i] = gameData[i + lines.length];
        }
        for (var i = 0; i < lines.length; i++) {
            gameData[gameData.length - lines.length + i] = lines[i];
        }
        cur.origin.x = cur.origin.x - lines.length;
        if (cur.origin.x < 0) {
            cur.origin.x = 0;
        }
        refreshDiv(gameData, gameDivs);
    }
    // 初始化
    var init = function(doms, type, dir) {
        gameDiv = doms.gameDiv;
        nextDiv = doms.nextDiv;
        timeDiv = doms.timeDiv;
        scoreDiv = doms.scoreDiv;
        resultDiv = doms.resultDiv;
        // console.log(SquareFactory);
        console.log(type);
        console.log(dir);
        next = SquareFactory.prototype.make(type, dir);
       
        initDiv(gameDiv, gameData, gameDivs);
        initDiv(nextDiv, next.data, nextDivs);
        refreshDiv(next.data, nextDivs);
    };
    // 设置时间
    var setTime = function(time) {
        timeDiv.innerHTML = time;
    }
    // 导出接口
    this.init = init;
    this.down = down;
    this.left = left;
    this.right = right;
    this.rotate = rotate;
    this.fall = function() {while(down());};
    this.fixed = fixed;
    this.performNext = performNext;
    this.checkClear = checkClear;
    this.checkGameOver = checkGameOver;
    this.setTime = setTime;
    this.addScore = addScore;
    this.gameOver = gameOver;
    this.addTailLines = addTailLines;
}