let projectile;
let resetButton;
let changeLauncher;
let running;
let ruler;
let ruler2;
let energy;
let launcherColor;

function setup() {
  createCanvas(600, 750);

  rectMode(CENTER);
  sliderm = createSlider(10, 100, 1, 0.1);
  sliderm.position(10, 10);
  sliderm.style("width", "220px");

  resetButton = createButton("Launch");
  resetButton.position(10, height - 50);
  resetButton.size(100, 40);
  resetButton.style("font-size", "20px");
  resetButton.style("background-color", color(100, 220, 200));
  resetButton.mousePressed(go);

  changeLauncher = createButton("Change Launcher");
  changeLauncher.position(width - 120, height - 90);
  changeLauncher.size(100, 80);
  changeLauncher.style("font-size", "20px");
  changeLauncher.style("background-color", color(240, 220, 100));
  changeLauncher.mousePressed(newLauncher);

  projectile = new Projectile(1, 0);
  ruler = new Ruler(width / 4, 250, 20, 400);
  ruler2 = new Ruler(width / 5, 250, 20, 400);
  energy = 1000 * round(random(4, 8), 1);

  launcherColor = color(
    22 * random(1, 10),
    22 * random(1, 10),
    22 * random(1, 10)
  );
  launcher = new Launcher(energy, launcherColor);
  running = false;
}

function draw() {
  background(230);
  fill(0);

  textSize(20);
  textAlign(LEFT, CENTER);
  textSize(16);
  noStroke();
  text("Projectile Mass: " + sliderm.value() + " g", 240, 20);
  ruler.display(mouseX, mouseY);
  ruler2.display(mouseX, mouseY);

  projectile.display();
  launcher.display();

  if (running != true) {
    projectile.m = sliderm.value();
    projectile.y = (4 * height) / 5;
    projectile.v = -sqrt((2 * launcher.Usp) / projectile.m);
  }

  if (running == true) {
    projectile.move();
  }
}

class Projectile {
  constructor(m, v) {
    this.m = m;
    this.v = v;
    this.y = (4 * height) / 5;
  }
  move() {
    this.v += 1;
    this.y += this.v;
  }
  display() {
    fill(0);
    ellipse(width / 2, this.y, sqrt(this.m), sqrt(this.m));
    rect(width / 2, this.y + 15, 4, 30);
  }
}

class Ruler {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.dragging = false;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  display(px, py) {
    fill(240, 240, 140);
    noStroke();
    if (this.dragging) {
      rect(px + this.offsetX, py + this.offsetY, this.w, this.h);
      tickMarks(
        px + this.offsetX - this.w / 2,
        py + this.offsetY - this.h / 2,
        4
      );
      this.x = px + this.offsetX;
      this.y = py + this.offsetY;
    } else {
      rect(this.x, this.y, this.w, this.h);
      tickMarks(this.x - this.w / 2, this.y - this.h / 2, 4);
    }
  }

  pressed(px, py) {
    if (
      px > this.x - this.w / 2 &&
      px < this.x + this.w / 2 &&
      py > this.y - this.h / 2 &&
      py < this.y + this.h / 2
    ) {
      this.dragging = true;
      this.offsetX = this.x - px;
      this.offsetY = this.y - py;
    }
  }

  notPressed(px, py) {
    this.dragging = false;
  }
}

class Launcher {
  constructor(e, c) {
    this.Usp = e;
    this.color = c;
  }
  display() {
    noStroke();
    fill(this.color);
    rect(width / 2, (5 * height) / 6, 10, 40);
    rect(width / 2, (5 * height) / 6 + 10, 20, 40);
    triangle(
      width / 2,
      (5 * height) / 6 + 10,
      width / 2,
      (5 * height) / 6 + 20,
      width / 2 + 40,
      (5 * height) / 6 + 30
    );
    triangle(
      width / 2 + 40,
      (5 * height) / 6 + 30,
      width / 2,
      (5 * height) / 6 + 10,
      width / 2 + 40,
      (5 * height) / 6 + 20
    );
  }
}

function go() {
  if (running) {
    resetButton.html("Launch");
    setting = 4;
  } else {
    resetButton.html("Reload");
  }
  running = !running;
}

function mousePressed() {
  ruler.pressed(mouseX, mouseY);
  ruler2.pressed(mouseX, mouseY);
}

function mouseReleased() {
  ruler.notPressed();
  ruler2.notPressed();
}

function tickMarks(x, y, s) {
  stroke(0);
  for (let i = 0; i < 101; i++) {
    line(x, y + s * i, x + 2 + 4 * ((i + 1) % 2), y + s * i);
    if (i % 10 == 0) {
      line(x, y + s * i, x + 10, y + s * i);
      noStroke();
      fill(0);
      textSize(10);
      text(100 - i, x + 10, y + s * i);
      stroke(0);
    }
  }
}

function newLauncher(){
  energy = 1000 * round(random(4, 8), 1);
   launcherColor = color(
    22 * random(1, 10),
    22 * random(1, 10),
    22 * random(1, 10)
  );
  launcher = new Launcher(energy, launcherColor);
  running = false;

}
