class Snake {
  constructor(grid, startColumn, startRow) {
    this.grid = grid;
    this.cells = [];
    this.direction = "right";
    // Initialisation du serpent
    this.init(startColumn, startRow);
    // Ajout de l'écouteur d'événement pour les touches de flèches
    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowUp":
          this.direction = "up";
          break;
        case "ArrowDown":
          this.direction = "down";
          break;
        case "ArrowLeft":
          this.direction = "left";
          break;
        case "ArrowRight":
          this.direction = "right";
          break;
      }
    });
  }

  init(startColumn, startRow) {
    // Ajout du serpent
    let cell = this.grid.getCellFromColumnRow(startColumn, startRow);
    cell.style.backgroundColor = "#9bbc0f	";
    this.cells.push(cell);
  }

  draw() {
    // Dessin du serpent sur la grille
    for (let i = 0; i < this.cells.length; i++) {
      let cell = this.cells[i];
      cell.style.backgroundColor = "#3f4e07		";
    }
  }

  move() {
    // Déplacement du serpent continue
    let head = this.cells[0];
    let newHead;

    switch (this.direction) {
      case "up":
        newHead = this.grid.getCellFromColumnRow(head.column, head.row - 1);
        break;
      case "down":
        newHead = this.grid.getCellFromColumnRow(head.column, head.row + 1);
        break;
      case "left":
        newHead = this.grid.getCellFromColumnRow(head.column - 1, head.row);
        break;
      case "right":
        newHead = this.grid.getCellFromColumnRow(head.column + 1, head.row);
        break;
    }

    // Vérifie si il y a collision avec le mur
    if (this.checkCollision(newHead)) {
      alert("Game Over");
      // gameOverSound.play();

      setTimeout(function () {
        location.reload();
      }, 200);
      return;
    }
    // Ajout de la nouvelle tête du serpent
    newHead.style.backgroundColor = "#0f380f";
    this.cells.unshift(newHead);

    // Suppression de la dernière queue du serpent
    let tail = this.cells.pop();
    tail.style.backgroundColor = "";
  }

  checkCollision(cell) {
    // Vérification si la cellule est en dehors de la grille
    if (
      !cell ||
      cell.column < 0 ||
      cell.column >= this.grid.columns ||
      cell.row < 0 ||
      cell.row >= this.grid.rows
    ) {
      return true;
    }
    return false;
  }
  // Agrandit le snake
  grow() {
    const tail = this.cells[this.cells.length - 1];
    const newPart = this.grid.getCellFromColumnRow(tail.column, tail.row);
    this.cells.push(newPart);
  }
}
