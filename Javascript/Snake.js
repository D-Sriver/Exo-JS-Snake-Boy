class Snake {
  constructor(grid, startColumn, startRow) {
    this.grid = grid;
    this.cells = [];
    this.direction = "right"; // Direction initiale du serpent

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
    // Ajout du premier cube du serpent à la position de départ spécifiée
    let cell = this.grid.getCellFromColumnRow(startColumn, startRow);
    cell.style.backgroundColor = "#9B9B9B";
    this.cells.push(cell);
  }

  draw() {
    // Dessin du serpent sur la grille
    for (let i = 0; i < this.cells.length; i++) {
      let cell = this.cells[i];
      cell.style.backgroundColor = "#9B9B9B";
    }
  }

  move() {
    // Déplacement du serpent dans la direction actuelle
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

    // Ajout de la nouvelle tête du serpent
    newHead.style.backgroundColor = "#9B9B9B";
    this.cells.unshift(newHead);

    // Suppression de la dernière queue du serpent
    let tail = this.cells.pop();
    tail.style.backgroundColor = "";
  }
}
