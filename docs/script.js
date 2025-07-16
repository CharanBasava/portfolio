// EmailJS setup
(function () {
  emailjs.init("EprfWFNmtGyqlblH1"); // Your EmailJS public key
})();

document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm("service_0c8yt0w", "template_c3b9j8c", this)
    .then(function () {
      alert("✅ Message sent successfully!");
      document.getElementById("contact-form").reset();
    }, function (error) {
      alert("❌ Failed to send message.\n" + JSON.stringify(error));
    });
});

// Cursor Effect
const canvas = document.getElementById("cursor-effect");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 4 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.alpha = 1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= 0.02;
  }

  draw() {
    ctx.beginPath();
    // Using an explicit rgba color instead of template literal to avoid issues with some environments
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(59, 130, 246, ${this.alpha})`; // Tailwind blue-500
    ctx.fill();
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle, index) => {
    particle.update();
    particle.draw();
    if (particle.alpha <= 0) {
      particles.splice(index, 1);
    }
  });
  requestAnimationFrame(animate);
}

window.addEventListener("mousemove", (e) => {
  for (let i = 0; i < 4; i++) {
    particles.push(new Particle(e.clientX, e.clientY));
  }
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

animate();

// Dark Mode Toggle
const toggleDark = document.getElementById("toggleDark");
const html = document.documentElement;

// Load saved preference
if (localStorage.getItem("theme") === "dark") {
  html.classList.add("dark");
}

toggleDark.addEventListener("click", () => {
  html.classList.toggle("dark");

  if (html.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

// Disable right-click and common developer shortcuts
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  alert("Right-click is disabled on this site.");
});

document.addEventListener("keydown", function (e) {
  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
    (e.ctrlKey && e.key === "U")
  ) {
    e.preventDefault();
    alert("This action is disabled on this site.");
  }
});

// Mobile Menu Toggle
const menuBtn = document.getElementById("menu-btn");
const navMenu = document.getElementById("nav-menu");

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("hidden");
});

// Close mobile menu on link click
const navLinks = document.querySelectorAll("#nav-menu a");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (window.innerWidth < 768) {
      navMenu.classList.add("hidden");
    }
  });
});

// Loading Screen
window.addEventListener("load", () => {
  const loader = document.getElementById("loading-screen");
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = "0";
      loader.style.transition = "opacity 0.5s ease";
      setTimeout(() => loader.remove(), 500);
    }, 1500);
  }
});