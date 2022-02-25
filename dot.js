// jshint esversion: 9

class Dot {
  constructor(x, y) {
    this.pos = createVector(x, y);
    // this.vel = createVector(random(-1, 1), random(-1, 1));
    this.vel = createVector(0, fps < 120 ? 0.4 : 0.2);
    this.vel.rotate(random(-PI, PI));
  }

  update(dots) {
    this.move();
    this.draw(dots);
  }

  move() {
    this.pos.add(this.vel);
    if (this.pos.x < 5 || this.pos.x > width - 5) {
      this.vel.x *= -1;
    }
    if (this.pos.y < 5 || this.pos.y > height - 5) {
      this.vel.y *= -1;
    }
  }

  draw(dots) {
    // Draw dot:
    push();
    noFill();
    strokeWeight(2);
    stroke(255);
    translate(this.pos.x, this.pos.y);
    point(0, 0);
    pop();

    // Draw connection to nearby dots:
    dots.forEach((d) => {
      if (d !== this && d.pos.dist(this.pos) < 150) {
        push();
        strokeWeight(map(d.pos.dist(this.pos), 0, 150, 0.3, 0.05));
        stroke(map(d.pos.dist(this.pos), 0, 50, 0, 150));
        line(this.pos.x, this.pos.y, d.pos.x, d.pos.y);
        pop();
      }
    });
  }
}
