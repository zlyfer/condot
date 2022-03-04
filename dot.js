// jshint esversion: 9

class Dot {
  constructor(x, y) {
    this.pos = createVector(x, y);
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
    if (this.pos.x < 0 || this.pos.x > width) {
      this.pos.x = random(5, width - 5);
    }
    if (this.pos.y < 0 || this.pos.y > height) {
      this.pos.y = random(5, height - 5);
    }
  }

  draw(dots) {
    // Draw dot:
    push();
    noFill();
    strokeWeight(3);
    stroke(theme.dots);
    translate(this.pos.x, this.pos.y);
    point(0, 0);
    pop();

    dots.forEach((d) => {
      if (d !== this && d.pos.dist(this.pos) < connectionDistance) {
        push();
        strokeWeight(map(d.pos.dist(this.pos), 0, 150, 0.5, 0.1));
        stroke(map(d.pos.dist(this.pos), 0, 50, theme.linesMin, theme.linesMax));
        line(this.pos.x, this.pos.y, d.pos.x, d.pos.y);
        pop();
      }
    });
  }
}
