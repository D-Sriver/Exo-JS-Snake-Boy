class Snake {
  constructor(grid, startColumn, startRow) {
    this.grid = grid;
    this.cells = [];
    this.direction = "";
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
    cell.style.backgroundColor = "#9bbc0f";
    this.cells.push(cell);
  }

  draw() {
    // Dessin du serpent sur la grille
    for (let i = 0; i < this.cells.length; i++) {
      let cell = this.cells[i];
      cell.style.backgroundColor = "#3f4e07";
    }
  }

  move() {
    // Vérifier si la direction est définie avant de déplacer le serpent
    if (!this.direction) {
      return;
    }

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

    // Vérifier les collisions avec le mur ou avec la queue du serpent
    if (this.checkCollision(newHead) || this.checkSelfCollision(newHead)) {
      gameOverSound.play();
      setTimeout(function () {
        location.reload();
      }, 2000);
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

  checkSelfCollision(cell) {
    // Vérification si la cellule est en collision avec la queue du serpent
    for (let i = 1; i < this.cells.length; i++) {
      if (this.cells[i] === cell) {
        return true;
      }
    }
    return false;
  }

  grow() {
    const tail = this.cells[this.cells.length - 1];
    const newPart = this.grid.getCellFromColumnRow(tail.column, tail.row);
    this.cells.push(newPart);
  }
}
