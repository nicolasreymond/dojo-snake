console.log("-- best snake.body made by epfl-dojo --");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

//
// Situation de départ
//
// Aide : Gestion d'une touche de clavier
// window.addEventListener("keydown", event => { console.log(event.key); ... }

const width = 20;
const gridElem = width * 2; // 20 cases * 20 cases
//let snake.body = [[9, 9], [8, 9], [7, 9]];
const appleNewPosition = () => {
  return [Math.floor(Math.random() * width), Math.floor(Math.random() * width)];
};

let snake = {
  body: [[9, 9], [8, 9], [7, 9]]
};

let apple = {
  position: appleNewPosition(),
  power: 1
};

let cmptGrow = 0;
const drawApple = () => {
  ctx.fillStyle = "red";
  ctx.fillRect(
    apple.position[0] * gridElem,
    apple.position[1] * gridElem,
    gridElem,
    gridElem
  );
};

let direction = "e";
let gameover = false;

const drawMap = () => {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 800, 800);
  ctx.font = "20px Arial";
};

const drawScore = () => {
  ctx.font = "20px Arial";
  ctx.fillStyle = "red";
  ctx.fillText("Score: " + (snake.body.length - 3) * 100, 40, 40);
};

const drawSnake = () => {
  ctx.fillStyle = "green";
  for (let element of snake.body) {
    ctx.fillRect(
      element[0] * gridElem + 2,
      element[1] * gridElem + 2,
      gridElem - 4,
      gridElem - 4
    );
  }
};

const moveSnake = () => {
  let newHead;
  //change direction
  switch (direction) {
    case "e":
      newHead = [(snake.body[0][0] + 1) % width, snake.body[0][1]];
      break;
    case "o":
      newHead = [(snake.body[0][0] - 1 + width) % width, snake.body[0][1]];
      break;
    case "s":
      newHead = [snake.body[0][0], (snake.body[0][1] + 1) % width];
      break;
    case "n":
      newHead = [snake.body[0][0], (snake.body[0][1] - 1 + width) % width];
      break;
    default:
      break;
  }

  gameover = snake.body.find(
    snakeElem => snakeElem[0] === newHead[0] && snakeElem[1] === newHead[1]
  );

  snake.body.unshift(newHead);

  if (
    snake.body[0][0] === apple.position[0] &&
    snake.body[0][1] === apple.position[1]
  ) {
    console.log("Eat !!");
    apple.position = appleNewPosition();
    cmptGrow = 3;
  }
  if (cmptGrow === 0) {
    snake.body.pop();
  } else {
    cmptGrow = cmptGrow - 1;
  }
};

const keyPushed = e => {
  switch (e.key) {
    case "ArrowRight":
      if (direction !== "o") {
        direction = "e";
      }
      break;
    case "ArrowLeft":
      if (direction !== "e") {
        direction = "o";
      }
      break;
    case "ArrowUp":
      if (direction !== "s") {
        direction = "n";
      }
      break;
    case "ArrowDown":
      if (direction !== "n") {
        direction = "s";
      }
      break;
    case "r":
      if (direction !== "n") {
        direction = "s";
      }
      break;
    default:
      break;
  }
};

window.addEventListener("keydown", keyPushed);

drawMap();
drawApple();
drawSnake();

const nextMove = () => {
  moveSnake();

  drawMap();
  drawApple();
  drawSnake();
  drawScore();

  setTimeout(() => {
    if (!gameover) {
      requestAnimationFrame(nextMove);
    } else {
      ctx.fillStyle = "red";
      ctx.font = "80px Arial";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
    }
  }, 150 - snake.body.length - 3);
};

// https://developer.mozilla.org/fr/docs/Web/API/Window/requestAnimationFrame
requestAnimationFrame(nextMove);
