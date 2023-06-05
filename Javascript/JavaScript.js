let grid;
let pomme;
let snake;
let x = 350;
let score = 0;
let audio = new Audio("./misc/cw_sound39.wav");
let backgroundMusic = new Audio("./misc/bgsound.mp3");
backgroundMusic.loop = true;

function start() {
  document.body.style.backgroundColor = "#738e0c";
  createGrid();
  createScore();
  initializeSnake();
  initializePomme();
  startGameLoop();

  document.body.style.display = "flex";
  document.body.style.flexDirection = "column";
  document.body.style.alignItems = "center";
  document.body.style.justifyContent = "center";
  document.body.style.height = "100vh";
}
function createGrid() {
  // Création de la grille
  grid = new Grid("Grid00", 50, 50, 20, 20, 15, 15, "#9ec311");
  // Création de la div "bordure"
  let bordureDiv = document.createElement("div");
  bordureDiv.id = "Bordure";
  bordureDiv.style.display = "flex";
  bordureDiv.style.alignItems = "center";
  bordureDiv.style.justifyContent = "center";
  bordureDiv.style.backgroundColor = "#9ea4b4";
  bordureDiv.style.minWidth = "440px";
  bordureDiv.style.minHeight = "440px";
  bordureDiv.style.borderRadius = "25px";

  // Ajout de la div "grid" à l'intérieur de la div "bordure"
  bordureDiv.appendChild(grid.object);

  // Création de l'élément texte
  let texteElement = document.createElement("div");
  texteElement.id = "Texte";
  texteElement.innerHTML = "SNAKE BOY";
  texteElement.style.color = "white";
  texteElement.style.fontFamily = "Gill Sans";
  texteElement.style.fontSize = "x-large";
  texteElement.style.position = "absolute";
  texteElement.style.top = "50%";
  texteElement.style.left = "50%";
  texteElement.style.transform = "translate(-50%, -50%)";

  bordureDiv.appendChild(texteElement);

  // Ajout de la bordure div à la page
  document.body.appendChild(bordureDiv);
}

function createScore() {
  // Création de la bordure div
  let bordureDiv = document.createElement("div");
  bordureDiv.id = "fond";
  bordureDiv.style.backgroundColor = "#9ea4b4";
  bordureDiv.style.width = "200px";
  bordureDiv.style.height = "200px";
  bordureDiv.style.zIndex = "1";
  bordureDiv.style.left = "500px";
  bordureDiv.style.top = "30px";
  bordureDiv.style.borderRadius = "25px";

  // Création de l'élément score
  let scoreElement = document.createElement("div");
  scoreElement.id = "Score";
  scoreElement.innerHTML = "Score: " + score;
  scoreElement.style.color = "white";
  scoreElement.style.zIndex = "2";
  scoreElement.style.fontSize = "1.3rem";
  scoreElement.style.fontFamily = "Gill Sans";
  scoreElement.style.fontStyle = "italic";
  scoreElement.style.left = "560px";
  scoreElement.style.top = "40px";

  SoundButton = document.createElement("button");
  SoundButton.textContent = "Lancer la musique";
  SoundButton.style.zIndex = "2";
  SoundButton.style.backgroundColor = "#9ea4b4";
  SoundButton.style.color = "white";
  SoundButton.style.left = "535px";
  SoundButton.style.borderRadius = "20px";
  SoundButton.style.backgroundColor = "#9bbc0f";
  SoundButton.style.padding = "4px";
  SoundButton.style.top = "70px";

  SoundButton.addEventListener("click", launchMusic);

  document.body.appendChild(scoreElement);
  document.body.appendChild(bordureDiv);
  document.body.appendChild(SoundButton);
}
function launchMusic() {
  if (backgroundMusic.paused) {
    backgroundMusic.play();
    audio.muted = false;
    SoundButton.textContent = "Couper la musique";
  } else {
    backgroundMusic.load();
    audio.muted = true;
    SoundButton.textContent = "Relancer la musique";
  }
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
    }
  }, x);
}

function updateScore() {
  // Mettre à jour l'affichage du score
  let scoreElement = document.getElementById("Score");
  scoreElement.innerHTML = "Score: " + score;
}
