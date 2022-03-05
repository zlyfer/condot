// jshint esversion: 9

const fps = 200;

// settings:
const drawArea = 100;
const maxDraw = 8;
const drawForce = 0.008;
const connectionDistance = 150;

// theme:
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
const themes = {
  light: {
    background: 255,
    dots: 0,
    connection: 50,
  },
  dark: {
    background: 0,
    dots: 255,
    connection: 255,
  },
  mlight: {
    background: 240,
    dots: 22,
    connection: 72,
  },
  mdark: {
    background: 22,
    dots: 220,
    connection: 150,
  },
};

var theme = mediaQuery.matches ? themes.mdark : themes.mlight;
theme = themes.mdark;

var dots = [];

// function keyPressed() {}

// function mousePressed() {
//   dots.push(new Dot(mouseX, mouseY));
// }

function setup() {
  createCanvas(windowWidth, windowHeight);
  dots.push(new Dot());
  for (let i = 0; i < (windowWidth * windowHeight) / Math.pow(144, 2); i++) {
    dots.push(new Dot());
  }

  mediaQuery.addEventListener("change", (e) => {
    theme = e.matches ? themes.mdark : themes.mlight;
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  frameRate(fps);
  background(theme.background);
  // if (dots.length > 0) test();
  let inRange = 0;
  dots.forEach((d) => {
    if (dist(d.pos.x, d.pos.y, mouseX, mouseY) < drawArea) {
      inRange++;
      if (mouseIsPressed && inRange < maxDraw) {
        d.pos = p5.Vector.lerp(d.pos, createVector(mouseX, mouseY), drawForce);
      }
    }
    d.update(dots);
  });
}

// function test() {
//   push();
//   stroke("#f0f");
//   line(dots[dots.length - 1].pos.x, dots[dots.length - 1].pos.y, mouseX, mouseY);
//   pop();
// }
