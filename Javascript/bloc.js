class Bloc {
  constructor(grid) {
    this.grid = grid;
    this.cell = null;
  }

  generate() {
    // Génère une position aléatoire pour le Bloc
    let column = Math.floor(Math.random() * this.grid.columns);
    let row = Math.floor(Math.random() * this.grid.rows);
    this.cell = this.grid.getCellFromColumnRow(column, row);

    // Vérifie si le Bloc est généré sur une cellule est occupée par le serpent
    const snakeCells = snake.cells;
    const isSnakeCell = snakeCells.some((cell) => cell === this.cell);

    if (isSnakeCell) {
      this.generate(); // Génère une nouvelle position pour le Bloc
    } else {
      this.cell.style.backgroundColor = "red";
    }
  }

  checkCollision(snake) {
    // Vérifie si la tête du serpent est sur la même cellule que le Bloc
    if (snake.cells[0] === this.cell) {
      // Supprime le Bloc et ajoute une nouvelle Bloc
      this.cell.style.backgroundColor = "yellow";
      return true;
    }
  }
}
