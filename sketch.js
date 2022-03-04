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
    linesMin: 0,
    linesMax: 50,
  },
  dark: {
    background: 0,
    dots: 255,
    linesMin: 50,
    linesMax: 255,
  },
  mLight: {
    background: 240,
    dots: 22,
    linesMin: 22,
    linesMax: 72,
  },
  mDark: {
    background: 22,
    dots: 220,
    linesMin: 220,
    linesMax: 150,
  },
};
var theme = mediaQuery.matches ? themes.mDark : themes.mLight;

let dots = [];

function preload() {}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < (windowWidth * windowHeight) / Math.pow(144, 2); i++) {
    dots.push(new Dot(random(5, width - 5), random(5, height - 5)));
  }

  mediaQuery.addEventListener("change", (e) => {
    if (e.matches) {
      theme = themes.mDark;
    } else {
      theme = themes.mLight;
    }
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  frameRate(fps);
  background(theme.background);
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
