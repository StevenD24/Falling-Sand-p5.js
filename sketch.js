function make2DArray(cols, rows) {
  arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let grid;
let w = 10;
let cols, rows;

function setup() {
  createCanvas(600, 600);
  cols = width / 10;
  rows = height / 10;
  grid = make2DArray(cols, rows);

  // initialize every grid index as 0
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = 0;
    }
  }
}

function draw() {
  background(0);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      stroke(255);
      fill(grid[i][j] * 255);
      let x = i * w;
      let y = j * w;
      square(x, y, w);
    }
  }
}
