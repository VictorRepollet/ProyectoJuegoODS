// ============================================================
// home.js — Lógica de la página de inicio (index.html)
// Incluye: preview animado del juego + contador global ODS
// ============================================================

/* ── Preview animado del juego en el canvas ────────────────
   Muestra un personaje rebotando que recoge comida y la
   entrega a NPCs, ilustrando la mecánica del juego.
──────────────────────────────────────────────────────────── */
(function iniciarPreview() {
  const canvas = document.getElementById('preview-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const W   = canvas.width;
  const H   = canvas.height;

  // ── Estado del preview ──────────────────────────────────
  const personaje = { x: 80, y: 60, vx: 1.2, vy: 0.8, size: 10 };

  const alimentos = [
    { x: 20,  y: 30, r: 5 },
    { x: 160, y: 70, r: 5 },
    { x: 100, y: 20, r: 5 },
    { x: 50,  y: 90, r: 5 },
  ];

  const npcs = [
    { x: 170, y: 40 },
    { x: 10,  y: 80 },
  ];

  // ── Bucle de dibujo ─────────────────────────────────────
  function dibujar() {
    // Fondo
    ctx.fillStyle = '#0a1a0a';
    ctx.fillRect(0, 0, W, H);

    // Grid de fondo decorativo
    ctx.strokeStyle = 'rgba(74, 222, 128, .06)';
    ctx.lineWidth   = 0.5;
    for (let x = 0; x < W; x += 20) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += 20) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    // NPCs (personas necesitadas)
    npcs.forEach((n) => {
      // Cuerpo
      ctx.fillStyle = '#60a5fa';
      ctx.fillRect(n.x, n.y, 10, 14);
      // Cabeza
      ctx.fillStyle = 'rgba(96, 165, 250, .3)';
      ctx.beginPath();
      ctx.arc(n.x + 5, n.y - 6, 5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Alimentos
    alimentos.forEach((a) => {
      ctx.fillStyle = '#4ade80';
      ctx.beginPath();
      ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // Personaje principal
    const p = personaje;
    ctx.fillStyle = '#facc15';
    ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size * 1.4);
    // Halo
    ctx.fillStyle = 'rgba(250, 204, 21, .25)';
    ctx.beginPath();
    ctx.arc(p.x, p.y - p.size * 0.5, p.size * 0.7, 0, Math.PI * 2);
    ctx.fill();

    // Mover personaje (rebota en los bordes)
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 5 || p.x > W - 5) p.vx *= -1;
    if (p.y < 5 || p.y > H - 5) p.vy *= -1;

    requestAnimationFrame(dibujar);
  }

  dibujar();
})();


/* ── Contador global de personas alimentadas ───────────────
   Lee las puntuaciones guardadas en localStorage y suma
   el total para mostrarlo en el contador del menú (US-24).
──────────────────────────────────────────────────────────── */
(function actualizarContador() {
  const el = document.getElementById('contador-global');
  if (!el) return;

  try {
    const puntuaciones = JSON.parse(localStorage.getItem('puntuaciones') || '[]');
    const total = puntuaciones.reduce((acum, p) => acum + (p.puntos || 0), 0);
    el.textContent = total.toLocaleString('es-ES');
  } catch {
    el.textContent = '0';
  }
})();
