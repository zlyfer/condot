// jshint esversion: 9

class Dot {
  constructor(x = random(5, width - 5), y = random(5, height - 5)) {
    this.id = Math.floor(Math.random() * 99999999);
    this.pos = createVector(x, y);
    this.vel = createVector(0, fps < 120 ? 0.4 : 0.2);
    this.vel.rotate(random(-PI, PI));
    this.connections = [];
  }

  update(dots) {
    this.move();
    this.draw();
    this.drawConnections(dots);
  }

  move() {
    this.pos.add(this.vel);
    if (this.pos.x < 5 || this.pos.x > width - 5) this.vel.x *= -1;
    if (this.pos.y < 5 || this.pos.y > height - 5) this.vel.y *= -1;
    if (this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height)
      this.pos = createVector(random(5, width - 5), random(5, height - 5));
  }

  draw() {
    push();
    noFill();
    strokeWeight(3);
    stroke(theme.dots);
    translate(this.pos.x, this.pos.y);
    point(0, 0);
    pop();
  }

  drawConnections(dots) {
    dots.forEach((d) => {
      if (d.connections.includes(this.id)) return;
      let distance = d.pos.dist(this.pos);
      if (d !== this && distance < connectionDistance) {
        if (!this.connections.includes(d.id)) this.connections.push(d.id);
        push();
        strokeWeight(map(distance, 0, connectionDistance, 0.5, 0.1));
        stroke(theme.connection, map(distance, 0, connectionDistance, 255, 0));
        line(this.pos.x, this.pos.y, d.pos.x, d.pos.y);
        pop();
      } else {
        this.connections = this.connections.filter((c) => c !== d.id);
      }
    });
  }
}
