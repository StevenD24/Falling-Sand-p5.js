function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}

let grid;
let w = 10;
let cols, rows;
let hueValue = 200;

function withinCols(i) {
  return i >= 0 && i <= cols - 1;
}

function withinRows(j) {
  return j >= 0 && j <= rows - 1;
}

function setup() {
  createCanvas(700, 800);
  colorMode(HSB, 360, 255, 255);
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

function mouseDragged() {
  let mouseCol = floor(mouseX / w);
  let mouseRow = floor(mouseY / w);

  let matrix = 3;
  let extent = floor(matrix / 2);
  for (let i = -extent; i <= extent; i++) {
    for (let j = -extent; j <= extent; j++) {
      if (random(1) < 0.75) {
        let col = mouseCol + i;
        let row = mouseRow + j;
        if (withinCols(col) && withinRows(row)) {
          grid[col][row] = hueValue;
        }
      }
    }
  }
  hueValue += 1;
  if (hueValue > 360) {
    hueValue = 1;
  }
}

function draw() {
  background(0);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      noStroke();
      if (grid[i][j] > 0) {
        fill(grid[i][j], 255, 255);
        let x = i * w;
        let y = j * w;
        square(x, y, w);
      }
    }
  }

  let nextGrid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      if (state > 0) {
        let below = grid[i][j + 1];
        let dir = random([-1, 1]);

        let belowL = -1;
        let belowR = -1;

        if (withinCols(i + dir)) {
          belowL = grid[i + dir][j + 1];
        }
        if (withinCols(i - dir)) {
          belowR = grid[i - dir][j + 1];
        }

        belowL = grid[i - dir][j + 1];
        belowR = grid[i + dir][j + 1];

        if (below === 0) {
          nextGrid[i][j + 1] = state;
        } else if (belowL === 0) {
          nextGrid[i - dir][j + 1] = state;
        } else if (belowR === 0) {
          nextGrid[i + dir][j + 1] = state;
        } else {
          nextGrid[i][j] = state;
        }
      }
    }
  }
  grid = nextGrid;
}
