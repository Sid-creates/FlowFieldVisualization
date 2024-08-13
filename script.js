const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = "white";


ctx.lineCap = 'round';

class Particle {
  constructor(effect) {
    this.effect = effect;
    this.x = Math.floor(Math.random() * this.effect.width);
    this.y = Math.floor(Math.random() * this.effect.height);
    this.speedX;
    this.speedY;
    this.speedModifier = Math.random() * 5 + 1;
    this.history = [{ x: this.x, y: this.y }];
    this.maxLength = Math.floor(Math.random() * 310 + 10);
    this.angle = 0;
    this.lifeTime = this.maxLength * 2;
    this.hue = Math.floor(Math.random() * 360);
    this.lineWidth = Math.random() * 5 + 1;
  }

  draw(context) {
    context.beginPath();
    context.moveTo(this.history[0].x, this.history[0].y);
    for (let i = 0; i < this.history.length; i++) {
      context.lineTo(this.history[i].x, this.history[i].y);
    }
    context.lineWidth = this.lineWidth;
    context.strokeStyle = `hsl(${this.hue}, 100%, 50%)`;
    context.stroke();
  }

  update() {
    this.lifeTime--;
    if (this.lifeTime >= 1) {
      let x = Math.floor(this.x / this.effect.cellSize);
      let y = Math.floor(this.y / this.effect.cellSize);

      let index = x + y * this.effect.rows;
      this.angle = this.effect.flowField[index];

      this.speedX = Math.cos(this.angle);
      this.speedY = Math.sin(this.angle);
      this.x += this.speedX * this.speedModifier;
      this.y += this.speedY * this.speedModifier;

      this.history.push({ x: this.x, y: this.y });
      if (this.history.length > this.maxLength) {
        this.history.shift();
      }
    } else if (this.history.length > 1) {
      this.history.shift();
    } else {
      this.reset();
    }
  }
  reset() {
    this.x = Math.floor(Math.random() * this.effect.width);
    this.y = Math.floor(Math.random() * this.effect.height);
    this.history = [{ x: this.x, y: this.y }];
    this.maxLength = Math.floor(Math.random() * 310 + 10);
    this.lifeTime = this.maxLength * 2;
  }
}

class Effect {
  constructor(canvas) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.particles = [];
    this.numberOfParticles = 500; // try 5k looks cool
    this.rows;
    this.cols;
    this.flowField = [];
    this.cellSize = 20;
    this.curve = 0.9;
    this.zoom = 0.09;
    this.init();
  }
  init() {
    // Create flow field
    this.rows = Math.floor(this.width / this.cellSize);
    this.cols = Math.floor(this.height / this.cellSize);
    this.flowField = [];
    for (let y = 0; y < this.cols; y++) {
      for (let x = 0; x < this.rows; x++) {
        let angle =
          (Math.sin(x * this.zoom) + Math.cos(y * this.zoom)) * this.curve;
        this.flowField.push(angle);
      }
    }
    // Create particles
    for (let i = 0; i < this.numberOfParticles; i++) {
      this.particles.push(new Particle(this));
    }
  }
  render(context) {
    this.particles.forEach((particle) => {
      particle.draw(context);
      particle.update();
    });
  }
}

const effect = new Effect(canvas);
console.log(effect);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  effect.render(ctx);
  requestAnimationFrame(animate);
}
animate();
