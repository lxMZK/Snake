const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

let tileCount = 20
let tileSize = canvas.width / tileCount - 2
let score = 0
let start = false
let gameOver = false
let pause = false
let colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'white']
let levels = ['easy', 'normal', 'hard']
let menu = [{ options: colors, selection: 4 },
{ options: colors, selection: 3 },
{ options: colors, selection: 0 },
{ options: levels, values: [.5, 1, 2], selection: 1 }]
let cursor = 0

class snakePart {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

let speed = 7
let headX = 10
let headY = 10
let xVect = 0
let yVect = 0
let snakeLength = 2
let snake = []

let appleX = 5
let appleY = 5

function initGame() {
    clear()
    ctx.fillStyle = 'white'
    ctx.font = '26px VT323'
    ctx.fillText('Press any arrow key/button to begin!', 15, 180)
    ctx.font = '19px VT323'
    ctx.fillText('Press Esc at any time to access the menu', 44, 200)
}

function drawGame() {
    if (pause) {
        return;
    }
    moveSnake()
    checkCollision()
    if (gameOver) {
        return;
    }
    clear()
    checkApple()
    drawApple()
    drawSnake()
    drawScore()
    setTimeout(drawGame, 1000 / speed)
}

function clear() {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function drawScore() {
    ctx.fillStyle = 'white'
    ctx.font = '10px Verdana'
    ctx.fillText('Score: ' + score, canvas.width - 50, 10)
}

function drawMenu() {
    clear()
    ctx.fillStyle = 'white'
    ctx.font = '50px Verdana'
    ctx.fillText('Menu', 10, 50)

    ctx.font = '20px Verdana'
    ctx.fillText('Snake Head Color:     ' + menu[0].options[menu[0].selection], 40, 75)
    ctx.fillText('Snake Body Color:     ' + menu[1].options[menu[1].selection], 40, 95)
    ctx.fillText('Apple Color:               ' + menu[2].options[menu[2].selection], 40, 115)
    ctx.fillText('Difficulty:                   ' + menu[3].options[menu[3].selection], 40, 135)
    ctx.fillText('>', 20, cursor * tileCount + 75)
}

function drawApple() {
    ctx.fillStyle = menu[2].options[menu[2].selection]
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize)
}

function drawSnake() {
    ctx.fillStyle = menu[1].options[menu[1].selection]
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x * tileCount, snake[i].y * tileCount, tileSize, tileSize)
    }

    ctx.fillStyle = menu[0].options[menu[0].selection]
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize)

    snake.push(new snakePart(headX, headY))
    if (snake.length > snakeLength) {
        snake.shift()
    }
}

function moveSnake() {
    headX += xVect
    headY += yVect
}

function checkApple() {
    if (appleX === headX && appleY === headY) {
        appleX = Math.floor(Math.random() * tileCount)
        appleY = Math.floor(Math.random() * tileCount)
        snakeLength++
        score += menu[3].values[menu[3].selection] * 2
        speed += menu[3].values[menu[3].selection]
    }
}

function checkCollision() {
    if (xVect === 0 && yVect === 0) {
        return
    }

    if (headX < 0 || headX * tileCount >= canvas.width) {
        gameOver = true
    } else if (headY < 0 || headY * tileCount >= canvas.height) {
        gameOver = true
    } else {
        gameOver = false
    }

    for (let i = 0; i < snake.length; i++) {
        if (headX === snake[i].x && headY === snake[i].y) {
            gameOver = true
            break;
        }
    }

    ctx.fillStyle = 'white'
    ctx.font = '50px Verdana'
    ctx.fillText('GAME OVER', 35, 200)
}

document.body.addEventListener('keydown', keyDown)

function keyDown(e) {
    if (!start) {
        start = !start
        drawGame()
    }
    if (gameOver) {
        if (e.keyCode === 27) {
            snake = []
            xVect = 0
            yVect = 0
            headX = 10
            headY = 10
            snakeLength = 2
            score = 0
            gameOver = false
            drawGame()
            return;
        }
    }
    if (pause) {
        switch (e.keyCode) {
            // Escape
            case 27:
                pause = !pause
                drawGame()
                break;
            // Left
            case 37:
                menu[cursor].selection--
                if (menu[cursor].selection < 0) {
                    menu[cursor].selection = menu[cursor].options.length - 1
                }
                break;
            // Up
            case 38:
                if (cursor === 0) {
                    break;
                }
                cursor--
                break;
            // Right
            case 39:
                menu[cursor].selection++
                if (menu[cursor].selection >= menu[cursor].options.length) {
                    menu[cursor].selection = 0
                }
                break;
            // Down
            case 40:
                if (cursor === menu.length - 1) {
                    break;
                }
                cursor++
                break;
        }
        drawMenu()
    } else {
        switch (e.keyCode) {
            // Escape
            case 27:
                pause = !pause
                drawMenu()
                drawGame()
                break;
            // Left
            case 37:
                if (xVect === 1) {
                    break;
                }
                xVect = -1
                yVect = 0
                console.log(e)
                break;
            // Up
            case 38:
                if (yVect === 1) {
                    break;
                }
                xVect = 0
                yVect = -1
                break;
            // Right
            case 39:
                if (xVect === -1) {
                    break;
                }
                xVect = 1
                yVect = 0
                break;
            // Down
            case 40:
                if (yVect === -1) {
                    break;
                }
                xVect = 0
                yVect = 1
                break;
        }
    }
}

document.getElementById('left').addEventListener('click', function () {
    let e = { keyCode: 37 }
    keyDown(e)
})
document.getElementById('up').addEventListener('click', function () {
    let e = { keyCode: 38 }
    keyDown(e)
})
document.getElementById('right').addEventListener('click', function () {
    let e = { keyCode: 39 }
    keyDown(e)
})
document.getElementById('down').addEventListener('click', function () {
    let e = { keyCode: 40 }
    keyDown(e)
})

initGame()