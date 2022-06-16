const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

let tileCount = 20
let tileSize = canvas.width / tileCount - 2
let score = 0
let gameOver = false

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

function drawGame() {
    clear()
    moveSnake()
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

function drawApple() {
    ctx.fillStyle = 'red'
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize)
}

function drawSnake() {
    ctx.fillStyle = 'green'
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x * tileCount, snake[i].y * tileCount, tileSize, tileSize)
    }
    
    ctx.fillStyle = 'blue'
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize)

    snake.push(new snakePart(headX, headY))
    if (snake.length > snakeLength){
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
        score++
    }
}

document.body.addEventListener('keydown', keyDown)

function keyDown(e) {
    switch (e.keyCode) {
        // Left
        case 37:
            if (xVect === 1) {
                break;
            }
            xVect = -1
            yVect = 0
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

drawGame()