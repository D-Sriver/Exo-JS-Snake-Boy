class Snake {
  constructor(grid) {
    this.grid = grid;
    this.cells = [];

    // Initialisation du serpent
    this.init();
  }

  init() {
    // Position de départ du serpent (en haut à droite de la grille)
    let startColumn = this.grid.columns - 1;
    let startRow = 0;

    // Ajout du premier cube du serpent
    let cell = this.grid.getCellFromColumnRow(startColumn, startRow);
    cell.style.backgroundColor = "red";
    this.cells.push(cell);
  }

  // Dessin du serpent sur la grille
  draw() {
    for (let i = 0; i < this.cells.length; i++) {
      let cell = this.cells[i];
      cell.style.backgroundColor = "red";
    }
  }
}
