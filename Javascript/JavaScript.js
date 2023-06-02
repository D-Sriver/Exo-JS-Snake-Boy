let grid;
let pomme;
let snake;
let x = 250;
let score = 0;

function start() {
  document.body.style.backgroundColor = "#738e0c";
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
  // Création de la bordure div
  let bordureDiv = document.createElement("div");
  bordureDiv.id = "Bordure";
  bordureDiv.style.backgroundColor = "#9ea4b4";
  bordureDiv.style.width = "440px";
  bordureDiv.style.height = "440px";
  bordureDiv.style.borderRadius = "25px";
  // creation du logoTexte
  let texteElement = document.createElement("div");
  texteElement.id = "Texte";
  texteElement.innerHTML = "Snake Boy";
  texteElement.style.position = "absolute";
  texteElement.style.top = "410px";
  texteElement.style.left = "175px";
  texteElement.style.width = "110px";
  texteElement.style.color = "white";
  texteElement.style.fontSize = "x-large";

  document.body.appendChild(texteElement);

  // Ajout de la bordure div à la page
  document.body.appendChild(bordureDiv);
}

function createScore() {
  // Création de l'élément score
  let scoreElement = document.createElement("div");
  scoreElement.id = "Score";
  scoreElement.innerHTML = "Score: " + score;
  scoreElement.style.color = "white";
  scoreElement.style.fontSize = "1.3rem";

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
