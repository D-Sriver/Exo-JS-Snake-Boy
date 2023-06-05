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
  document.body.style.flexDirection = "row";
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
  bordureDiv.style.flexDirection = "column";
  bordureDiv.style.alignItems = "center";
  bordureDiv.style.justifyContent = "flex-end";
  bordureDiv.style.paddingBottom = "20px";
  bordureDiv.style.backgroundColor = "#9ea4b4";
  bordureDiv.style.minWidth = "440px";
  bordureDiv.style.minHeight = "440px";
  bordureDiv.style.borderRadius = "25px";

  // Ajout de la div "grid" à l'intérieur de la div "bordure"
  bordureDiv.appendChild(grid.object);

  // Création de l'élément texte
  let texteElement = document.createElement("div");
  texteElement.style.display = "flex";
  texteElement.id = "Texte";
  texteElement.innerHTML = "SNAKE BOY";
  texteElement.style.color = "white";
  texteElement.style.fontFamily = "Gill Sans";
  texteElement.style.fontSize = "x-large";
  texteElement.style.top = "50%";
  texteElement.style.left = "50%";

  bordureDiv.appendChild(texteElement);

  // Ajout de la bordure div à la page
  document.body.appendChild(bordureDiv);
}

function createScore() {
  let gameSection = document.createElement("section");
  gameSection.id = "Game";
  gameSection.style.display = "flex";
  gameSection.style.justifyContent = "space-between";

  let fondDiv = document.createElement("div");
  fondDiv.id = "fond";
  fondDiv.style.display = "flex";
  fondDiv.style.alignItems = "center";
  fondDiv.style.justifyContent = "center";
  fondDiv.style.backgroundColor = "#9ea4b4";
  fondDiv.style.width = "200px";
  fondDiv.style.height = "200px";
  fondDiv.style.zIndex = "1";
  fondDiv.style.left = "500px";
  fondDiv.style.top = "30px";
  fondDiv.style.borderRadius = "25px";

  let scoreElement = document.createElement("div");
  scoreElement.id = "Score";
  scoreElement.innerHTML = "Score: " + score;
  scoreElement.style.color = "white";
  scoreElement.style.zIndex = "2";
  scoreElement.style.fontSize = "1.3rem";
  scoreElement.style.fontFamily = "Gill Sans";
  scoreElement.style.fontStyle = "italic";
  scoreElement.style.left = "50%";
  scoreElement.style.top = "50%";

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

  document.body.appendChild(gameSection);
  fondDiv.appendChild(scoreElement);
  document.body.appendChild(fondDiv);
  document.body.appendChild(SoundButton);
  gameSection.appendChild(fondDiv);
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
