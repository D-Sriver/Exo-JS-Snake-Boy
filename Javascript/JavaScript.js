// Création Grille
// Son Id
// Position x et y dans le navigateur
// Nombre de colonne, nombre de ligne
// Largeur colonne, largeur ligne
// Définis la couleur de fond
let grid00 = new Grid("Grid00", 50, 50, 20, 20, 15, 15, "#9ec311");
let snake = new Snake(grid, 10, 10);

function start() {
  create(grid00, myFunctionMouseMove00, myFunctionClick00);

  // Création du serpent avec emplacement sur la grille.
  let snake = new Snake(grid00, grid00.columns - 10, 10);
  snake.draw();

  setInterval(() => {
    snake.move();
    snake.draw();
  }, 250);
}

//création de la grille
function create(grid) {
  document.body.appendChild(grid.object);
}
function myFunctionMouseMove00(e) {
  myFunctionMouseMove(grid00, e);
}

function myFunctionClick00(e) {
  myFunctionClick(grid00, e);
}
