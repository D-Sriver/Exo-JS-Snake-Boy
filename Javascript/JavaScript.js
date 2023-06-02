// Création Grille
// Son Id
// Position x et y dans le navigateur
// Nombre de colonne, nombre de ligne
// Largeur colonne, largeur ligne
// Définis la couleur de fond
let grid = new Grid("Grid00", 50, 50, 20, 20, 15, 15, "#9ec311");
let pomme = new Pomme();
let x = 250;
let score = 0;

function start() {
  create(grid);

  // Création du serpent avec emplacement sur la grille.
  let snake = new Snake(grid, grid.columns - 10, 10);
  snake.draw();

  // Initialisation de la pomme
  let pomme = new Pomme(grid);
  pomme.generate();
  // ajout du mouvement avec un interval de X
  setInterval(() => {
    snake.move();
    snake.draw();

    // Vérification de la collision avec la pomme
    if (pomme.checkCollision(snake)) {
      // Incrémentation du score
      score++;
      document.getElementById("Nombre de pomme").innerHTML =
        "Nombre de pomme mangée : " + score;
      pomme.generate();
    }
  }, x);
}

//création de la grille
function create(grid) {
  document.body.appendChild(grid.object);

  let scoreElement = document.createElement("div");
  scoreElement.id = "Nombre de pomme";
  scoreElement.innerHTML = "Nombre de pomme mangée : " + score;
  document.body.appendChild(scoreElement);
}
