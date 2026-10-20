const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let particles = [];
let hue = 180;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
  constructor(x, y, burst = false) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * (burst ? 8 : 5) + 2;
    this.speedX = (Math.random() - 0.5) * (burst ? 6 : 2);
    this.speedY = (Math.random() - 0.5) * (burst ? 6 : 2);
    this.color = `hsl(${hue}, 100%, 65%)`;
    this.alpha = 1;
    this.decay = Math.random() * 0.02 + 0.015;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= this.decay;
    if (this.size > 0.2) this.size -= 0.05;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 15;
    ctx.shadowColor = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, Math.max(0, this.size), 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// Add particles on mouse move
window.addEventListener("mousemove", (e) => {
  hue = (hue + 2) % 360;
  for (let i = 0; i < 3; i++) {
    particles.push(new Particle(e.clientX, e.clientY));
  }
});

// Burst effect on click
window.addEventListener("click", (e) => {
  for (let i = 0; i < 25; i++) {
    particles.push(new Particle(e.clientX, e.clientY, true));
  }
});

// Continuous render loop
function animate() {
  ctx.fillStyle = "rgba(11, 15, 25, 0.25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();

    if (particles[i].alpha <= 0 || particles[i].size <= 0) {
      particles.splice(i, 1);
      i--;
    }
  }

  requestAnimationFrame(animate);
}

animate();