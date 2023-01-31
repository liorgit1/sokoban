const WALL = 'WALL'
const FLOOR = 'FLOOR'
const GAMER = 'GAMER'
const TARGET = 'TARGET'
const BOX = 'BOX'
const NOTHING = 'NOTHING'
const BOX_IMG = '📦'
const GLUE = 'GLUE'
const GLUE_ING = '🌕'
const GOLD = 'GOLD'
const GOLD_ING = '🥇'
const CLOCK = 'CLOCK'
const CLOCK_ING = '⏰'
const TARGET_IMG = '🎯'
const GAMER_IMG = '<img src="img/gamer.png" />'
const GLUED_IMG = '<img src="img/gamer-purple.png" />'

var gSteps
var score
var gBoard
var gGamerPos
var gIsOn
var clockStepCounter
var glueInterval
var goldInterval
var gClockInterval
var gIsGlued = false




function onInitGame() {
    // document.querySelector('button').hidden = true
    resetGeme()
    resetIntervals()

}

function resetGeme() {
    gGamerPos = { i: 8, j: 11 }
    gBoard = buildBoard()
    renderBoard(gBoard)
    gIsOn = true
    clockStepCounter = 11
    score = 100
    gSteps = 0
    document.querySelector('.winModal').hidden = true
    document.querySelector('.score').innerText = score
    document.querySelector('.steps').innerText = gSteps
}
function resetIntervals() {
    clearIntervals()
    glueInterval = setInterval(placeElement, 10000, GLUE, GLUE_ING)
    goldInterval = setInterval(placeElement, 10000, GOLD, GOLD_ING)
    gClockInterval = setInterval(placeElement, 10000, CLOCK, CLOCK_ING)

}

// Render the board to an HTML table
function renderBoard(board) {

    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n';
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]

            var cellClass = getClassName({ i: i, j: j })


            if (currCell.type === FLOOR) cellClass += ' floor';
            else if (currCell.type === WALL) cellClass += ' wall';
            else if (currCell.type === NOTHING) cellClass += ' nothing'
            else if (currCell.type === TARGET) cellClass += ' target'

            // cellClass += (currCell.type === FLOOR) ? ' floor' : ' wall';

            // cellClass += (currCell.type === FLOOR) ? ' floor'== ' wall' ? " nothing" : " target":

            strHTML += `\t<td class="cell   ${cellClass} 
                "  onclick="moveTo(${i},${j} )" >\n`


            if (currCell.gameElement === GAMER) strHTML += GAMER_IMG
            else if (currCell.gameElement === BOX) {
                strHTML += `${BOX_IMG}
                \t</td>\n`;
            } else if (currCell.type === TARGET) {
                strHTML += `${TARGET_IMG}
                \t</td>\n`;
            }
        }
        strHTML += '</tr>\n';

        // console.log('strHTML is:');
        // console.log(strHTML);
        var elBoard = document.querySelector('.board')
        elBoard.innerHTML = strHTML;
    }
}

// Returns the class name for a specific cell
function getClassName(pos) {
    // var cellClass = 'cell-' + pos.i + '-' + pos.j;
    var cellClass = `cell-${pos.i}-${pos.j}`
    return cellClass;
}

function buildBoard() {
    // Create the Matrix
    var board = createMat(11, 19)


    // Put FLOOR everywhere and WALL at edges
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            // Put FLOOR in a regular cell
            var cell = { type: FLOOR, gameElement: null }

            // Place Walls at edges
            if (i === 0 || i === board.length - 1 || j === 0 || j === board[0].length - 1) {
                cell.type = WALL;
            }
            // if (i === 5 && j === 0 || i === 5 && j === 11 || i === 0 && j === 5 || i === 9 && j === 5) cell.type = FLOOR
            // Add created cell to The game board
            board[i][j] = cell;
            // console.log('cell :>> ', cell);
        }
    }
    // Place the gamer at selected position
    board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;


    buildLevel1(board)

    console.log('board :>> ', board);
    return board;
}
function buildLevel1(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]
            if (
                i === 0 && j < 4 ||
                i === 0 && j > 8 ||
                i === 1 && j < 4 ||
                i === 1 && j > 8 ||
                i === 2 && j > 8 ||
                i === 2 && j < 4 ||
                i === 3 && j < 2 ||
                i === 3 && j > 9 ||
                i === 4 && j < 2 ||
                i === 4 && j > 9 ||
                (i === 5 && j > 9) && (i === 5 && j < 13) ||
                i === 9 && j < 4 || i === 10 && j > 10 ||
                i === 10 && j < 4

            ) {
                currCell.type = NOTHING
            } else if (
                i === 1 && j === 4 ||
                i === 1 && j === 8 ||
                i === 2 && j === 8 ||
                i === 2 && j === 4 ||
                (i === 3 && j > 1) && (i === 3 && j < 5) ||
                (i === 3 && j > 7) && (i === 3 && j < 10) ||
                i === 4 && j === 2 || i === 4 && j === 9 ||
                i === 5 && j < 3 || i === 5 && j === 9 ||
                i === 5 && j === 7 || i === 5 && j === 6 ||
                i === 5 && j === 4 || i === 5 && j > 12 ||
                i === 6 && j === 4 || i === 6 && j === 7 ||
                i === 6 && j === 6 ||
                (i === 6 && j > 8) && (i === 6 && j < 14) ||
                i === 8 & j < 5 ||
                (i === 8 && j > 5) && (i === 8 && j < 9) ||
                i === 8 && j === 10 || i === 8 && j === 12 || i === 8 && j === 13 || i === 9 && j === 4 ||
                i === 9 && j > 9
            ) {
                currCell.type = WALL
            }

        }

    }

    placeTargetsLvl1(board)
    placeBoxesLvl1(board)

}
function placeBoxesLvl1(board) {
    board[2][5].gameElement = BOX
    board[3][7].gameElement = BOX
    board[4][7].gameElement = BOX
    board[4][5].gameElement = BOX
    board[7][5].gameElement = BOX
    board[7][2].gameElement = BOX
}
function placeTargetsLvl1(board) {
    board[6][16].type = TARGET
    board[6][17].type = TARGET
    board[7][17].type = TARGET
    board[7][16].type = TARGET
    board[8][17].type = TARGET
    board[8][16].type = TARGET
}


function handleKey(event) {

    var i = gGamerPos.i
    var j = gGamerPos.j

    switch (event.key) {

        case 'ArrowLeft':
            // if (j === 0) moveTo(i, gBoard[0].length - 1)
            // else 
            moveTo(i, j - 1);
            break;
        case 'ArrowRight':
            // if (j === gBoard[0].length - 1) moveTo(i, 0)
            // else 
            moveTo(i, j + 1);
            break;
        case 'ArrowUp':
            // if (i === 0) moveTo(gBoard.length - 1, j)
            // else
            moveTo(i - 1, j);
            break;
        case 'ArrowDown':
            if (i === gBoard.length - 1) moveTo(0, j)
            moveTo(i + 1, j);
            break;

    }

}

function moveTo(i, j) {
    if (gIsGlued) return

    var targetCell = gBoard[i][j]
    var pos = { i: i, j: j }


    // Calculate distance to make sure we are moving to a neighbor cell
    var iDiff = i - gGamerPos.i
    var jDiff = j - gGamerPos.j
    var iAbsDiff = Math.abs(i - gGamerPos.i)
    var jAbsDiff = Math.abs(j - gGamerPos.j)

    // If the clicked Cell is one of the four allowed
    if (gIsOn && ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0))) {
        if (targetCell.type !== WALL) {

            // var canMove = true
            if (targetCell.gameElement === BOX) {
                var cellBehindTarget = gBoard[i + iDiff][j + jDiff]
                if (cellBehindTarget.type !== WALL && cellBehindTarget.gameElement !== BOX) {
                    gBoard[i][j].gameElement = null
                    cellBehindTarget.gameElement = BOX
                    renderCell({ i: i + iDiff, j: j + jDiff }, BOX_IMG);
                } else return
            } else if (targetCell.gameElement === GLUE) {
                gIsGlued = true

                setTimeout(() => {
                    gIsGlued = false
                    renderCell(pos, GAMER_IMG)
                }, 5000)

                paintCell(pos, 'red', 5000)

            } else if (targetCell.gameElement === GOLD) {
                score += 100
                paintCell(pos, 'green')
            } else if (targetCell.gameElement === CLOCK) {
                clockStepCounter = -1
                paintCell(pos, 'green')
            } else if (targetCell.type === TARGET) {

            }
            // if (canMove) {

            // MOVING from current position
            // Model:
            gBoard[gGamerPos.i][gGamerPos.j].gameElement = null
            // Dom:
            if (gBoard[gGamerPos.i][gGamerPos.j].type === TARGET) renderCell(gGamerPos, TARGET_IMG)
            else renderCell(gGamerPos, '')

            // MOVING to selected position
            // Model:
            gGamerPos.i = i;
            gGamerPos.j = j;
            gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER
            // DOM:
            var gamerImg = gIsGlued ? GLUED_IMG : GAMER_IMG
            renderCell(gGamerPos, gamerImg);
            clockStepCounter++
            if (clockStepCounter > 10) {
                score--
                gSteps++
            }
            document.querySelector('.score').innerText = score
            document.querySelector('.steps').innerText = gSteps
            checkVic()

            // }
        }
    }
    // else console.log('TOO FAR', iAbsDiff, jAbsDiff)

}
function checkVic() {
    var isVic = true
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[i].length; j++) {
            const currCell = gBoard[i][j];
            if (currCell.type === TARGET && currCell.gameElement !== BOX) isVic = false
        }
    }
    if (isVic) {
        gameOver()
    }

}
function gameOver() {
    gIsOn = false
    document.querySelector('.winModal').hidden = false
    clearIntervals()

}
function clearIntervals() {
    clearInterval(glueInterval)
    clearInterval(goldInterval)
    clearInterval(gClockInterval)
}

function paintCell(pos, color, timer = 250) {
    var cellClass = getClassName(pos)
    // var currCell = document.querySelector('.' + cellClass)
    var currCell = document.querySelector(`.${cellClass}`)
    currCell.classList.add(`${color}`)
    setTimeout(() => currCell.classList.remove(`${color}`), timer)
}
function placeElement(element, elementImg) {
    var pos = getEmptyPos()
    gBoard[pos.i][pos.j].gameElement = element
    renderCell(pos, elementImg)
    setTimeout(removeElement, 5000, pos)
}
// function placeGlue() {
//     var pos = getEmptyPos()
//     placeElement(pos, GLUE, GLUE_ING)
//     setTimeout(removeElement, 5000, pos)
// }
// function placeClock() {
//     var pos = getEmptyPos()
//     placeElement(pos, CLOCK, CLOCK_ING)
//     setTimeout(removeElement, 5000, pos)
// }
// function placeGold() {
//     var pos = getEmptyPos()
//     placeElement(pos, GOLD, GOLD_ING)
//     setTimeout(removeElement, 5000, pos)
// }
// 
function removeElement(pos) {
    var i = pos.i
    var j = pos.j
    if (gBoard[i][j].gameElement !== GAMER && gBoard[i][j].gameElement !== BOX) {
        gBoard[i][j].gameElement = ''
        if (gBoard[i][j].type === TARGET) renderCell(pos, TARGET_IMG)
        else renderCell(pos, '')
    }
}
function getEmptyPos() {
    var emptyPoses = []
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[0].length; j++) {
            const cell = gBoard[i][j]
            if ((cell.type === FLOOR && !cell.gameElement) || cell.type === TARGET && !cell.gameElement) {
                emptyPoses.push({ i: i, j, j })
            }
        }
    }
    var emptyPos = emptyPoses[getRandomIntInclusive(0, emptyPoses.length - 1)]
    // console.log('emptyPoses :>> ', emptyPoses);
    // console.log('emptyPos :>> ', emptyPos);
    return emptyPos
}

function renderCell(pos, value) {
    // var cellSelector = '.' + getClassName(pos)
    var cellSelector = `.${getClassName(pos)}`
    // console.log('location :>> ', location);
    var elCell = document.querySelector(cellSelector)
    // console.log('elCell :>> ', elCell);
    elCell.innerHTML = value
}

