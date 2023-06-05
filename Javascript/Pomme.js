class Pomme {
  constructor(grid) {
    this.grid = grid;
    this.cell = null;
  }

  generate() {
    // Génère une position aléatoire pour la pomme
    let column = Math.floor(Math.random() * this.grid.columns);
    let row = Math.floor(Math.random() * this.grid.rows);
    this.cell = this.grid.getCellFromColumnRow(column, row);
    // Vérifie si la pomme est générée sur une cellule occupée par le serpent
    if (this.cell.style.backgroundColor === "#0f380f") {
      this.generate();
    } else {
      this.cell.style.backgroundColor = "#f4fbd6";
    }
  }

  checkCollision(snake) {
    // Vérifie si la tête du serpent est sur la même cellule que la pomme
    if (snake.cells[0] === this.cell) {
      // Supprime la pomme et ajoute une nouvelle pomme
      this.cell.style.backgroundColor = "";
      this.generate();
      audio.play();
      snake.grow();

      return true;
    }
    return false;
  }
}
