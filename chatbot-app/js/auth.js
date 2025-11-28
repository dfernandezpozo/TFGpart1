document.addEventListener("DOMContentLoaded", () => {
 
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = registerForm
        .querySelector('input[type="text"]')
        .value.trim();
      const email = registerForm
        .querySelector('input[type="email"]')
        .value.trim();
      const password = registerForm
        .querySelector('input[type="password"]')
        .value.trim();

      if (!name || !email || !password) {
        alert("Por favor, completa todos los campos");
        return;
      }

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = users.find((u) => u.email === email);

      if (userExists) {
        alert("Ya existe un usuario con ese correo");
        return;
      }

      users.push({ name, email, password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registro exitoso, ahora puedes iniciar sesión.");
      window.location.href = "index.html";
    });
  }

  // Login
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = loginForm.querySelector('input[type="email"]').value.trim();
      const password = loginForm
        .querySelector('input[type="password"]')
        .value.trim();

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        email.style.borderColor = "red";
        return;
      }

      localStorage.setItem("loggedUser", JSON.stringify(user));
      window.location.href = "chat.html";
    });
  }

  // Logout
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedUser");
      window.location.href = "index.html";
    });
  }

  // Fondo dinámico
  const c = document.getElementById("bg");
  const ctx = c.getContext("2d");

  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;

    c.width = w * dpr;
    c.height = h * dpr;

    c.style.width = w + "px";
    c.style.height = h + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, c.width, c.height);

    const width = window.innerWidth;
    const height = window.innerHeight;

    
    const centerY = height / 2;

    for (let i = 0; i < 30; i++) {
      ctx.beginPath();
      ctx.moveTo(0, centerY);

      for (let x = 0; x < width; x += 10) {
        const y = Math.sin(x * 0.01 + t + i) * 25 + centerY + i * 6;
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = `hsla(${(i * 12 + t * 40) % 360}, 90%, 60%, 0.45)`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    t += 0.02;
    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
});
