let grid;
let pomme;
let snake;
let x = 250;
let score = 0;

function start() {
  createGrid();
  createScore();
  initializeSnake();
  initializePomme();
  startGameLoop();
}

function createGrid() {
  // Création de la grille
  grid = new Grid("Grid00", 50, 50, 20, 20, 15, 15, "#9ec311");
  document.body.appendChild(grid.object);
}

function createScore() {
  // Création de l'élément score
  let scoreElement = document.createElement("div");
  scoreElement.id = "Score";
  scoreElement.innerHTML = "Score: " + score;
  scoreElement.style.display = "flex";
  scoreElement.style.justifyContent = "center";
  scoreElement.style.alignItems = "center";
  document.body.appendChild(scoreElement);
}

function initializeSnake() {
  // Création du serpent avec emplacement sur la grille.
  snake = new Snake(grid, grid.columns - 10, 10);
  snake.draw();
}

function initializePomme() {
  // Initialisation de la pomme
  pomme = new Pomme(grid);
  pomme.generate();
}

function startGameLoop() {
  // Ajout du mouvement avec un intervalle de X
  setInterval(() => {
    snake.move();
    snake.draw();

    // Vérification de la collision avec la pomme
    if (pomme.checkCollision(snake)) {
      // Incrémentation du score
      score += 100;
      updateScore();
      pomme.generate();
    }
  }, x);
}

function updateScore() {
  // Mettre à jour l'affichage du score
  let scoreElement = document.getElementById("Score");
  scoreElement.innerHTML = "Score: " + score;
}
