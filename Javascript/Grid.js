class Grid {
  constructor(id, x, y, columns, rows, width, height, backgroundColor) {
    function createDiv(
      id,
      borderColor,
      left,
      top,
      width,
      height,
      backgroundColor
    ) {
      let div = document.createElement("div");

      div.id = id;
      div.style.margin = "0px";
      div.style.borderStyle = "solid";
      div.style.borderWidth = "1px";
      div.style.borderColor = borderColor;
      div.style.backgroundColor = backgroundColor;
      div.style.padding = "0px";
      div.style.position = "absolute";
      div.style.left = left + "px";
      div.style.top = top + "px";
      div.style.width = width + "px";
      div.style.height = height + "px";
      return div;
    }
    this.x = x;
    this.y = y;
    this.columns = columns;
    this.rows = rows;
    this.width = width;
    this.height = height;
    // DIV mère qui encapsulera les DIVs filles
    this.object = createDiv(
      id,
      "green",
      x,
      y,
      columns * (width + 2),
      rows * (height + 2),
      backgroundColor
    );
    // Création des DIVs filles
    let top = 0;
    for (let row = 0; row < rows; ++row) {
      let left = 0;
      for (let column = 0; column < columns; ++column) {
        let div = createDiv(
          id + "_C" + column + "R" + row,
          "black",
          left,
          top,
          width,
          height,
          backgroundColor
        );

        div.column = column;
        div.row = row;
        this.object.appendChild(div);
        left += width + 2;
      }
      top += height + 2;
    }
  }
  // Méthode pour récupérer une cellule (une des DIVs filles) à la colonne et ligne
  getCellFromColumnRow(column, row) {
    let id = this.object.id + "_C" + column + "R" + row;

    return document.getElementById(id);
  }
  // Méthode pour récupérer une cellule (une des DIVs filles) à la position (x, y) de la souris
  getCellFromMousePosition(x, y) {
    let column = Math.floor((x - this.x) / (this.width + 2));
    let row = Math.floor((y - this.y) / (this.height + 2));
    let id;

    if (column < 0) {
      column = 0;
    }
    if (row < 0) {
      row = 0;
    }
    if (column >= this.columns) {
      column = this.columns - 1;
    }
    if (row >= this.rows) {
      row = this.rows - 1;
    }
    id = this.object.id + "_C" + column + "R" + row;
    console.log(id, column, row);
    return document.getElementById(id);
  }
}
