// jshint esversion: 9

let dots = [];
const fps = 200;

function preload() {}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 100; i++) {
    dots.push(new Dot(random(5, width - 5), random(5, height - 5)));
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  frameRate(fps);
  background(22);
  dots.forEach((d) => {
    d.update(dots);
  });
}
