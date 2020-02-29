function writeTextUI() {
  textSize(vMax*2);
  fill(0);
  noStroke
  colH1 = color(355, 0, 20);
  nextButton = createButton("Suivant")
  nextButton.class("select");
  nextButton.position(width - (16 * vMax), height - (7 * vMax));
  nextButton.style('font-size', '1.7vmax');
  nextButton.style('height', '5vmax');
  nextButton.mousePressed(nextGrid);
}

function writeRestartUI() {
  textSize(vMax*2);
  fill(0);
  noStroke();
  nextButton.remove();
  nextButton = createButton("Recommencez")
  nextButton.class("select");
  nextButton.position(width - (16 * vMax), height - (7 * vMax));
  nextButton.style('font-size', '1.5vmax');
  nextButton.style('height', '5vmax');
  nextButton.style('background-color', 'indianred');
  nextButton.mousePressed(restart);
}

function restart() {
  stage = 0;
  dimensionCalc();
  writeTextUI();
  nextGrid();
}
