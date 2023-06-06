let grid;
let pomme;
let bloc;
let snake;
let gameOver = false;
let speed = 200;
let score = 0;
let X = 20;
let Y = 20;
let audio = new Audio("./misc/cw_sound39.wav");
let gameOverSound = new Audio("./misc/lose.mp3");
let backgroundMusic = new Audio("./misc/bgsound.mp3");
backgroundMusic.loop = true;
let blocCounter = 0;

function start() {
  document.body.style.backgroundColor = "#738e0c";
  createGrid();
  createScore();
  initializeSnake();
  initializePomme();
  initializeBloc();
  startGameLoop();

  document.body.style.display = "flex";
  document.body.style.alignItems = "center";
  document.body.style.justifyContent = "space-evenly";
}
function createGrid() {
  // Création de la grille
  grid = new Grid("Grid00", 50, 50, X, Y, 15, 15, "#9ec311");

  // Création de la div "bordure"
  let bordureDiv = document.createElement("div");
  bordureDiv.id = "Bordure";
  bordureDiv.style.position = "relative";
  bordureDiv.style.display = "flex";
  bordureDiv.style.margin = "0 auto";
  bordureDiv.style.alignItems = "flex-end";
  bordureDiv.style.justifyContent = "center";
  bordureDiv.style.paddingBottom = "20px";

  bordureDiv.style.backgroundColor = "#9ea4b4";
  bordureDiv.style.minWidth = "440px";
  bordureDiv.style.minHeight = "440px";
  bordureDiv.style.borderRadius = "25px";

  bordureDiv.appendChild(grid.object);

  // Création du texte SNAKE BOY
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
  document.body.appendChild(bordureDiv);
}
//création de la section comprenant la grid
function createScore() {
  let gameSection = document.createElement("section");
  gameSection.id = "Game";
  gameSection.style.display = "flex";
  gameSection.style.justifyContent = "space-evenly";

  let fondDiv = document.createElement("div");
  fondDiv.id = "fond";
  fondDiv.style.display = "flex";
  fondDiv.style.flexDirection = "column";
  fondDiv.style.alignItems = "center";
  fondDiv.style.justifyContent = "center";
  fondDiv.style.backgroundColor = "#9ea4b4";
  fondDiv.style.width = "30%";
  fondDiv.style.height = "400px";
  fondDiv.style.zIndex = "1";
  fondDiv.style.left = "500px";
  fondDiv.style.top = "30px";
  fondDiv.style.borderRadius = "25px";

  //creation de la div score
  let scoreElement = document.createElement("div");
  scoreElement.id = "Score";
  scoreElement.innerHTML = "Score: " + score;
  scoreElement.style.color = "white";
  scoreElement.style.zIndex = "2";
  scoreElement.style.fontSize = "1.7rem";
  scoreElement.style.fontFamily = "Gill Sans";
  scoreElement.style.fontStyle = "italic";
  scoreElement.style.marginBottom = "30px";
  scoreElement.style.left = "50%";
  scoreElement.style.top = "50%";

  //création de la div speed
  let speedElement = document.createElement("div");
  speedElement.id = "Speed";
  speedElement.innerHTML = "Speed: " + speed;
  speedElement.style.color = "white";
  speedElement.style.zIndex = "2";
  speedElement.style.fontSize = "1.7rem";
  speedElement.style.fontFamily = "Gill Sans";
  speedElement.style.fontStyle = "italic";
  speedElement.style.marginBottom = "30px";
  speedElement.style.left = "50%";
  speedElement.style.top = "50%";

  //creation du bouton pour la musique.
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
  gameSection.appendChild(fondDiv);
  document.body.appendChild(gameSection);
  document.body.appendChild(fondDiv);
  document.body.appendChild(SoundButton);
  fondDiv.appendChild(speedElement);
  fondDiv.appendChild(scoreElement);
  fondDiv.appendChild(SoundButton);

  let rulesDiv = document.createElement("div");
  rulesDiv.style.display = "flex";
  rulesDiv.style.flexDirection = "column";
  rulesDiv.style.alignItems = "center";
  rulesDiv.style.justifyContent = "center";
  rulesDiv.style.backgroundColor = "white";
  rulesDiv.style.width = "90%";
  rulesDiv.style.borderRadius = "25px";
  rulesDiv.style.marginTop = "10px";

  let rulesTable = document.createElement("table");
  rulesTable.style.width = "80%";
  rulesTable.style.height = "100%";

  let ruleRow1 = document.createElement("tr");
  let ruleCell1 = document.createElement("td");
  ruleCell1.textContent =
    "Les pommes blanche du jardin d’éden vous tendent les bras. A vous de les manger.";

  ruleRow1.appendChild(ruleCell1);
  rulesTable.appendChild(ruleRow1);

  rulesDiv.appendChild(rulesTable);
  fondDiv.appendChild(rulesDiv);

  // Ajout de la règle 2
  let ruleRow2 = document.createElement("tr");
  let ruleCell2 = document.createElement("td");
  ruleCell2.textContent = "Évitez les anges gris qui veulent vous arrêter !";
  ruleCell2.style.backgroundColor = "grey";
  ruleCell2.style.color = "White";
  ruleCell2.style.margin = " 5px";
  ruleCell2.style.borderRadius = "10px";
  ruleRow2.appendChild(ruleCell2);
  rulesTable.appendChild(ruleRow2);

  rulesDiv.appendChild(rulesTable);
  fondDiv.appendChild(rulesDiv);
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

// Création du serpent avec emplacement sur la grille.
function initializeSnake() {
  snake = new Snake(grid, grid.columns - 10, 10);
  snake.draw();
}

// Initialisation de la pomme
function initializePomme() {
  pomme = new Pomme(grid);
  pomme.generate();
}
// Initialisation du bloc
function initializeBloc() {
  bloc = new Bloc(grid);
  bloc.generate();
}
//démarre le jeu.
function startGameLoop() {
  function movement() {
    if (gameOver) {
      return; // Sortir de la fonction si le jeu est terminé
    }

    setTimeout(() => {
      snake.move();
      snake.draw();
      // Vérification de la collision avec la pomme
      if (pomme.checkCollision(snake)) {
        // Incrémentation du score
        score += 100;
        speed -= 5;
        updateScore();
        updateSpeed();

        // Vérification du compteur de blocs
        blocCounter++;
        if (blocCounter >= 3) {
          bloc.generate();
          blocCounter = 0;
        }
      }

      movement();
      if (bloc.checkCollision(snake)) {
        gameOver = true;
        gameOverSound.play();

        setTimeout(function () {
          location.reload();
        }, 2000);
      }
    }, speed);
  }

  movement();
}

// Mettre à jour l'affichage du score
function updateScore() {
  let scoreElement = document.getElementById("Score");
  scoreElement.innerHTML = "Score: " + score;
}
// Mettre à jour l'affichage du score
function updateSpeed() {
  let scoreElement = document.getElementById("Speed");
  scoreElement.innerHTML = "speed: " + speed;
}
