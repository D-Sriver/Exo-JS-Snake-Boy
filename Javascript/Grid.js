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
      "#306230",
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
          "#8bac0f",
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
}
