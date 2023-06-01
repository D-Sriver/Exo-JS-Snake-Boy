// Création Grille
// Son Id
// Position x et y dans le navigateur
// Nombre de colonne, nombre de ligne
// Largeur colonne, largeur ligne
let grid00 = new Grid("Grid00", 100, 100, 5, 5, 25, 25);
let grid01 = new Grid("Grid01", 410, 100, 11, 11, 25, 25);
let grid02 = new Grid("Grid02", 100, 410, 11, 11, 25, 25);
let grid03 = new Grid("Grid03", 410, 410, 11, 11, 25, 25);

function start() {
  create(grid00, myFunctionMouseMove00, myFunctionClick00);
  create(grid01, myFunctionMouseMove01, myFunctionClick01);
  create(grid02, myFunctionMouseMove02, myFunctionClick02);
  create(grid03, myFunctionMouseMove03, myFunctionClick03);
}
function create(grid, myFunctionMouseMove, myFunctionClick) {
  // Ajout de l'objet grille dans la page (le body)
  document.body.appendChild(grid.object);
  // Récupère la cellule 1,1 (colonne, ligne)
  // Changement de la couleur de fond
  for (let counter = 0; counter < 10; ++counter) {
    let column = Math.floor(Math.random() * grid.columns);
    let row = Math.floor(Math.random() * grid.rows);
    let cell = grid.getCellFromColumnRow(column, row);

    cell.style.backgroundColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  }
  // Ajout d'un abonnement à l'événement "déplacement souris" sur la grille
  grid.object.addEventListener("mousemove", myFunctionMouseMove);
  // Ajout d'un abonnement à l'événement "clic souris" sur la grille
  grid.object.addEventListener("click", myFunctionClick);
}
function myFunctionMouseMove00(e) {
  myFunctionMouseMove(grid00, e);
}
function myFunctionMouseMove01(e) {
  myFunctionMouseMove(grid01, e);
}
function myFunctionMouseMove02(e) {
  myFunctionMouseMove(grid02, e);
}
function myFunctionMouseMove03(e) {
  myFunctionMouseMove(grid03, e);
}
function myFunctionMouseMove(grid, e) {
  let x = e.clientX;
  let y = e.clientY;
  let cell = grid.getCellFromMousePosition(x, y);
  let coor = "Mouse move : (" + x + "," + y + ") - " + cell.id + " Column : " + cell.column + " Row : " + cell.row;

  document.getElementById("MouseMove").innerHTML = coor;

}
function myFunctionClick00(e) {
  myFunctionClick(grid00, e);
}
function myFunctionClick01(e) {
  myFunctionClick(grid01, e);
}
function myFunctionClick02(e) {
  myFunctionClick(grid02, e);
}
function myFunctionClick03(e) {
  myFunctionClick(grid03, e);
}
function myFunctionClick(grid, e) {
  let x = e.clientX;
  let y = e.clientY;
  let cell = grid.getCellFromMousePosition(x, y);
  let coor = "Mouse click : (" + x + "," + y + ") - " + cell.id + " Column : " + cell.column + " Row : " + cell.row;

  document.getElementById("Click").innerHTML = coor;
}
