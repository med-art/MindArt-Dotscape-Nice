let dots = [];
let throughDotCount = 0;
let mousePress;
let dotSize, dotQty, ringQty;
let tempwinMouseX, tempwinMouseY, tempwinMouseX2, tempwinMouseY2; // defaults
let stage = 0;
let hueDrift, brightDrift, satDrift;
let longEdge, shortEdge, circleRad, vMax, wmax, hmax;
let primaryArray = [360, 60, 240];
let colHue = 360,
  colSat = 100,
  colBri = 100;
let verifyX = 0,
  verifyY = 0;
let tintedBG;
let click;
let xintro = [],
  yintro = [];
let direction = 0;
let stage1array = [
  [1, 1, 4, 1, 1, 3, 4, 3, 1, 5, 4, 5, 1, 7, 4, 7],
  [1, 1, 2, 1, 3, 1, 4, 1, 1, 3, 4, 3, 1, 5, 4, 5, 1, 7, 2, 7, 3, 7, 4, 7],
  [1, 1, 3, 1, 2, 2, 4, 2, 1, 3, 3, 3, 2, 4, 4, 4, 1, 5, 3, 5, 2, 6, 4, 6, 1, 7, 3, 7, 2, 8, 4, 8]
];

function preload() {
  bg = loadImage('assets/paper.jpg');
  audio = loadSound('assets/audio.mp3');
  click = loadSound('assets/click.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1); // Ignores retina displays
  lineLayer = createGraphics(width, height);
  permaLine = createGraphics(width, height);
  tintedBG = createGraphics(width, height);
  colorMode(HSB, 360, 100, 100, 100);
  lineLayer.colorMode(HSB, 360, 100, 100, 100);
  permaLine.colorMode(HSB, 360, 100, 100, 100);
  dimensionCalc();
  textLayer = createGraphics(windowWidth, windowHeight);
  introLayer = createGraphics(windowWidth, windowHeight);
  introLayer.colorMode(HSB);
  introLayer.stroke(0, 0, 85);
  introLayer.strokeWeight(7);
  introLayer.fill(0, 0, 85);
  slide = 0;
  slideShow();
  makeintroDots();

  canvas.addEventListener('touchmove', moved);
  canvas.addEventListener('mousemove', moved);
  canvas.addEventListener('touchstart', touchdown);
  canvas.addEventListener('mousedown', touchdown);
  // canvas.addEventListener('touchend', touchstop);
  // canvas.addEventListener('touchleave', touchstop);
  // canvas.addEventListener('mouseup', touchstop);

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  introLayer.resizeCanvas(windowWidth, windowHeight);
  textLayer.resizeCanvas(windowWidth, windowHeight);
  lineLayer.resizeCanvas(windowWidth, windowHeight);
  permaLine.resizeCanvas(windowWidth, windowHeight);
  tintedBG.resizeCanvas(windowWidth, windowHeight);
  dimensionCalc();
  if (introState === 3) {
    removeElements();
    writeTextUI();
    stage--;
    nextGrid();
  } else if (introState < 3 && slide > 0) {
    makeintroDots();
  }
}

function dimensionCalc() {
  wmax = width / 100;
  hmax = height / 100;
  if (width > height) {
    longEdge = width;
    shortEdge = height;
    circleRad = shortEdge * 0.45;
    vMax = width / 100;
  } else {
    longEdge = height;
    shortEdge = width;
    vMax = height / 100;
    circleRad = shortEdge * 0.45;
  }
}

function stage0grid() {
  dots = [];
  let w = width / 5;
  let h = height / 9;
  let r = vMax * 2;
  dotQtyY = stage1array[stage].length / 2;
  for (let i = 0; i < stage1array[stage].length; i += 2) {
    dots[dotsCount++] = new Dot(stage1array[stage][i] * w, stage1array[stage][i + 1] * h, r);
  }
}

function stage1grid() {
  dots = [];
  if (stage === 3) {
    dotQtyX = 7;
    dotQtyY = 9;
    r = vMax * 1.2;
    let spaceX = width / dotQtyX + 4;
    let spaceY = height / dotQtyY + 4;
    for (let i = 0; i < dotQtyX; i++) {
      for (let j = 0; j < dotQtyY; j++) {
        dots[dotsCount++] = new Dot((i + 1) * (spaceX), (j + 1) * (spaceY), r);
      }
    }
  } else if (stage === 4) {
    dotQtyX = 2;
    dotQtyY = 5 * 4;
    r = vMax * 1;
    let spaceX = width / dotQtyX + 2;
    let spaceY = height / dotQtyY + 2;
    for (let i = 0; i < dotQtyX; i++) {
      for (let j = 0; j < dotQtyY; j += 4) {
        dots[dotsCount++] = new Dot(((i + 0.5) * (spaceX)) - (spaceX / 6), (j + 0.5) * (spaceY), r);
        dots[dotsCount++] = new Dot(((i + 0.5) * (spaceX)) + (spaceX / 6), (j + 0.5) * (spaceY), r);
        dots[dotsCount++] = new Dot(((i + 0.5) * (spaceX)) - (spaceX / 3), (j + 0.5) * (spaceY) + (spaceY * 2), r);
        dots[dotsCount++] = new Dot(((i + 0.5) * (spaceX)) + ((spaceX / 6) * 2), (j + 0.5) * (spaceY) + (spaceY * 2), r);
      }
    }
  } else if (stage === 5) {
    dotQtyX = 4;
    dotQtyY = 13 * 4;
    r = vMax * 0.5;
    let spaceX = width / dotQtyX + 2;
    let spaceY = height / dotQtyY + 2;
    for (let i = 0; i < dotQtyX; i++) {
      for (let j = 0; j < dotQtyY; j += 4) {
        dots[dotsCount++] = new Dot(((i + 0.5) * (spaceX)) - (spaceX / 6), (j + 0.5) * (spaceY), r);
        dots[dotsCount++] = new Dot(((i + 0.5) * (spaceX)) + (spaceX / 6), (j + 0.5) * (spaceY), r);
        dots[dotsCount++] = new Dot(((i + 0.5) * (spaceX)) - (spaceX / 3), (j + 0.5) * (spaceY) + (spaceY * 2), r);
        dots[dotsCount++] = new Dot(((i + 0.5) * (spaceX)) + ((spaceX / 6) * 2), (j + 0.5) * (spaceY) + (spaceY * 2), r);
      }
    }
  }
}

function stage2grid() {
  let r = vMax;
  ringQty = 1;
  if (stage === 6) {
    dotQty = 7;
  }
  if (stage === 7) {
    dotQty = 10;
  }
  for (let i = 0; i < ringQty; i++) {
    for (let j = 0; j < dotQty; j++) {
      let rotateVal = j * (360 / dotQty);
      let tran = (circleRad / ringQty) * (i + 1);
      let tempX = (tran * cos(radians(rotateVal))) + width / 2;
      let tempY = (tran * sin(radians(rotateVal))) + height / 2;
      dots[dotsCount++] = new Dot(tempX, tempY, r);
    }
  }
}

function stage3grid() {
  let r = longEdge / 100;
  if (stage === 8) {
    dotQty = 7;
    ringQty = 3;
    r = longEdge / 150;
  }
  for (let i = 0; i < ringQty; i++) {
    for (let j = 0; j < dotQty + (i * 3); j++) {
      let rotateVal = j * (360 / (dotQty + (i * 3)));
      let tran = (circleRad / ringQty) * (i + 1);
      let tempX = (tran * cos(radians(rotateVal))) + width / 2;
      let tempY = (tran * sin(radians(rotateVal))) + height / 2;
      r = r - (r / 100);
      dots[dotsCount++] = new Dot(tempX, tempY, r);
    }
  }
}

function stage4grid() {
  let r = longEdge / 100;
  let gap;
  let remainder;
  if (stage === 9) {
    dotQty = 50;
    r = longEdge / 180;
    gap = circleRad * 0.9;
    remainder = circleRad - gap;
  }
  if (stage === 10) {
    dotQty = 100;
    r = longEdge / 200;
    gap = circleRad * 0.7;
    remainder = circleRad - gap;
  }
  for (let i = 0; i < dotQty; i++) {
    let rotateVal = i * 137.5;
    let tran = (((gap) / dotQty) * (i + 1)) + remainder;
    let tempX = (tran * cos(radians(rotateVal))) + width / 2;
    let tempY = (tran * sin(radians(rotateVal))) + height / 2;
    r = r + ((i / 40000) * vMax);
    dots[dotsCount++] = new Dot(tempX, tempY, r);
  }
}

function stage5grid() {
  if (stage === 11) {
    x = 7;
    y = 7;
    noiseAmp = 8;
    dotSize = 5;

  } else if (stage === 12) {
    writeRestartUI();
  }
  dotQtyX = x;
  dotQtyY = y;
  spaceX = width / (dotQtyX + 2);
  spaceY = height / (dotQtyY + 2);
  for (let i = 0; i < dotQtyX; i++) {
    for (let j = 0; j < dotQtyY; j++) {
      let noiseX = int((random(-width, width) * noiseAmp) / 150);
      let noiseY = int((random(-height, height) * noiseAmp) / 150);
      let r = random((vMax * (dotSize / 10)), (vMax * (dotSize / 10)) * 2);
      dots[dotsCount++] = new Dot(noiseX + (spaceX * 1.5) + (spaceX * i), noiseY + (spaceY * 1.5) + (spaceY * j), r);
    }
  }
  noiseAmp += 10;
  x += 5;
  y += 5;
  dotSize--;
}

function nextGrid() {
  throughDotCount = 0;
  dotsCount = 0;
  click.play();
  permaLine.clear();
  lineLayer.clear();
  if (stage < 3) {
    stage0grid();
  } else if (stage >= 3 && stage < 6) {
    stage1grid();
  } else if (stage >= 6 && stage < 8) {
    stage2grid();
  } else if (stage >= 8 && stage < 9) {
    stage3grid();
  } else if (stage >= 9 && stage < 11) {
    stage4grid();
  } else if (stage >= 11 && stage < 13) {
    stage5grid();
  }
  tintedBG.image(bg, 0, 0, width, height);
  tintedBG.fill(0, (20 * stage));
  tintedBG.rect(0, 0, width, height);
  stage++;
}

function draw() {
  if (introState === 3) {
    image(tintedBG, 0, 0, width, height);
    image(lineLayer, 0, 0);
    image(permaLine, 0, 0);
    for (let i = 0; i < dotsCount; i++) {
      dots[i].show();
    }
  } else {
    blendMode(BLEND);
    background(205, 12, 64, 100);
    if (slide > 0) {
      stroke(150);
      strokeWeight(7);
      line(xintro[throughDotCount - 1], yintro[throughDotCount - 1], mouseX, mouseY);
      image(introLayer, 0, 0, width, height);
    }
    if (slide > 0) {
      textLayer.text(introText[slide - 1], width / 2, (height / 6) * (slide));
    }
    image(textLayer, 0, 0, width, height);
  }
}

function touchEnded() {
  if (slide > 0) {
    introLayer.clear();
    makeintroDots();
  }
  lineLayer.clear();
  throughDotCount = 0;
}

function touchdown(ev) {

  mousePress = 1;

  if (introState === 3) {
    for (let i = 0; i < dotsCount; i++) {
      dots[i].getCol(winMouseX, winMouseY);
      dots[i].clicked(winMouseX, winMouseY);
    }
  }
  if (introState < 3) {
    if (audio.isPlaying()) {} else {
      audio.loop(5);
    }
    if (slide === 0) {
    startUp();
    }
  }
return false;
}

function startUp(){
  click.play();
  startButton.remove();
  slide++;
  slideShow();
}

function moved(ev) {

if (!mousePress) return;

	ev.preventDefault();
  if (introState === 3) {
    for (let i = 0; i < dotsCount; i++) {
      dots[i].clicked(winMouseX, winMouseY);
    }
    hueDrift = int(random(-2, 2));
    satDrift = int(random(-2, 2));
    brightDrift = int(random(-2, 2));
    lineLayer.stroke(colHue + hueDrift, colSat + satDrift, colBri + brightDrift, 80);
    lineLayer.strokeWeight(5);
    lineLayer.clear();
    if (throughDotCount > 0) {
      lineLayer.line(tempwinMouseX, tempwinMouseY, winMouseX, winMouseY);
    }
  } else {
    introLayer.ellipse(xintro[throughDotCount], yintro[throughDotCount], 40, 40);
    if (dist(mouseX, mouseY, xintro[throughDotCount], yintro[throughDotCount]) < 30) {
      let _x = xintro[throughDotCount] + random(-200, 200);
      let y;
      if (direction) {
        _y = yintro[throughDotCount] + random(50, 110);
      } else if (!direction) {
        _y = yintro[throughDotCount] - random(50, 110);
      }
      if (_x < 100) {
        _x = _x + width / 2;
      }
      if (_x > width - 100) {
        _x = _x - width / 2
      }
      if (_y < 100) {
        direction = !direction;
      }
      if (_y > height - 100) {
        direction = !direction;
      }
      xintro.push(_x);
      yintro.push(_y);
      throughDotCount++;
      if (throughDotCount > 1) {
        introLayer.background(205, 12, 64, 0.1);
        introLayer.line(xintro[throughDotCount - 2], yintro[throughDotCount - 2], xintro[throughDotCount - 1], yintro[throughDotCount - 1]);
      }
    }
  }
  return false;
}

function makeintroDots() {
  xintro[0] = int(random(width / 10, width - (width / 10)));
  yintro[0] = int(height / 2);
  introLayer.ellipse(xintro[0], yintro[0], 40, 40);
}

function copyLine() {
  permaLine.stroke(colHue + hueDrift, colSat + hueDrift, colBri + brightDrift, 80);
  permaLine.strokeWeight(6);
  if (throughDotCount > 1) {
    permaLine.line(tempwinMouseX, tempwinMouseY, tempwinMouseX2, tempwinMouseY2);
  }
}
class Dot {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.brightness = 150;
    this.h = primaryArray[int(random(0, 3))];
    this.s = 0;
    this.b = random(45, 195);
  }
  show() {
    noStroke();
    fill(this.h, this.s, this.b * 0.9, 100);
    ellipse(this.x, this.y, this.r * 3);
    fill(this.h, this.s, this.b * 0.8, 100);
    ellipse(this.x, this.y, this.r * 2.5);
    fill(this.h, this.s, this.b * 0.7, 100);
    ellipse(this.x, this.y, this.r * 2);
  }
  getCol(x, y) {
    let d = dist(x, y, this.x, this.y);
    if (d < this.r * 4 && (this.x != verifyX || this.y != verifyY)) {
      colHue = this.h;
      this.s = 255;
    }
  }
  clicked(x, y) {
    let rMultiplier = 1;
    let d = dist(x, y, this.x, this.y);
    if (throughDotCount === 0) {
      rMultiplier = 1.2; // increase radius for first grab
    }
    if (d < this.r * 2.05 * rMultiplier && (this.x != verifyX || this.y != verifyY)) {
      verifyX = this.x;
      verifyY = this.y;
      tempwinMouseX2 = tempwinMouseX;
      tempwinMouseY2 = tempwinMouseY;
      tempwinMouseX = this.x;
      tempwinMouseY = this.y;
      throughDotCount++;
      this.brightness = 250;
      if (colHue != this.h) {
        if (abs(colHue - this.h) > 280) {
          this.h = (((this.h + colHue) / 2) - 180) % 360;;
        } else {
          this.h = ((this.h + colHue) / 2) % 360;;
        }
      }
      colHue = this.h;
      this.s = colSat;
      this.b = colBri;
      copyLine();
    }
  }
}
