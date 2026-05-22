const board = document.querySelector('.board');
const startButton = document.querySelector('#startBtn');
const startModal = document.querySelector('#startModal');
const gameOverButton = document.querySelector('#restartBtn');
const gameOverModal = document.querySelector('#gameOverModal');


const blockHeight = 50;
const blockWidth = 50;

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

// Set exact grid dimensions
board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
board.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

let blocks = [];
let snake = [
    {
        x: 2,
        y: 2
    }
];
let food = {x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows)};

let direction = 'ArrowDown';
let intervalId = null;

// Rows first (outer), then columns (inner) — matches CSS grid's left-to-right, top-to-bottom flow
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement('div');
        block.classList.add('block');
        board.appendChild(block);
        block.innerText = `${col}-${row}`;
        blocks[`${col}-${row}`] = block;
    }
}


function renderSnake(){

    let head = null;

    blocks[`${food.x}-${food.y}`].classList.add('food');

    snake.forEach((segment) => {
        blocks[`${segment.x}-${segment.y}`].classList.remove('snake');
    });

    if(direction === 'ArrowDown') head = {
        x: snake[0].x,
        y: snake[0].y + 1
    };
    else if(direction === 'ArrowUp') head = {
        x: snake[0].x,
        y: snake[0].y - 1
    };
    else if(direction === 'ArrowLeft') head = {
        x: snake[0].x - 1,
        y: snake[0].y
    };
    else if(direction === 'ArrowRight') head = {
        x: snake[0].x + 1,
        y: snake[0].y
    };

    if(head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows){
        clearInterval(intervalId);
        gameOverModal.removeAttribute('style');
    }


    if(head.x === food.x && head.y === food.y){
        blocks[`${food.x}-${food.y}`].classList.remove('food');
        food = {x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows)}
        snake.unshift(head);
    }


    snake.unshift(head);
    snake.pop();

    snake.forEach((segment) => {
        blocks[`${segment.x}-${segment.y}`].classList.add('snake');
    });
}



// gameOverButton.addEventListener('click' , () =>{
//     gameOverModal.setAttribute('style', 'display: none;');
//     intervalId = setInterval(() => {
//         renderSnake();
//     }, 300);
// })

startButton.addEventListener('click' , () =>{
    intervalId = setInterval(() => {
        renderSnake();
    }, 300);
    startModal.setAttribute('style', 'display: none;');
})

window.addEventListener('keydown' , (e) =>{
    if(e.key === 'ArrowDown') direction = 'ArrowDown';
    else if(e.key === 'ArrowUp') direction = 'ArrowUp';
    else if(e.key === 'ArrowLeft') direction = 'ArrowLeft';
    else if(e.key === 'ArrowRight') direction = 'ArrowRight';
})