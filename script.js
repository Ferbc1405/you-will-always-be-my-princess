/* ─────────────────────────────────────────────
   script.js  –  Para Sara 💜
   ───────────────────────────────────────────── */

// ─── 1. ESTRELLAS GENERADAS ───────────────────
(function generateStars() {
  const container = document.getElementById('stars');
  const count = 160;
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.classList.add('star');
    const size = Math.random() * 2.5 + 0.5;   // 0.5 – 3 px
    s.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      --dur: ${(Math.random() * 4 + 2).toFixed(1)}s;
      --delay: ${(Math.random() * 5).toFixed(1)}s;
      --max-op: ${(Math.random() * 0.5 + 0.3).toFixed(2)};
    `;
    container.appendChild(s);
  }
})();

// ─── 2. NAVEGACIÓN ENTRE PANTALLAS ───────────
function goTo(id) {
  document.querySelectorAll('.screen.active').forEach(s => s.classList.remove('active'));
  const next = document.getElementById(id);
  if (next) {
    next.classList.add('active');
    // Reiniciar animaciones de texto
    next.querySelectorAll('.calm-text, .closing, .signature').forEach(el => {
      el.style.animation = 'none';
      void el.offsetWidth;           // reflow
      el.style.animation = '';
    });
  }
}

// ─── 3. DATOS DE "RECUERDA" ──────────────────
//  👉 Agrega aquí las rutas a las fotos de Sara
//     Ejemplo: 'images/sara1.jpg', 'images/sara2.jpg', ...
const fotos = [
  'images/sara 1.jpg',
  'images/sara 2.jpg',
  'images/sara 3.jpg',
  'images/sara 4.jpg',
  'images/sara 5.jpg',
  'images/sara 6.jpg',
  'images/sara 7.jpg',
];

const mensajes = {
  quien: [
    "Eres una de las personas más increíbles que existen.",
    "Tu forma de ser no se repite en nadie más.",
    "Tienes una luz que no siempre puedes ver… pero otros sí.",
    "Eres más de lo que crees, incluso en tus días más difíciles.",
  ],
  hermosa: [
    "Recuerda que eres hermosa, incluso en tus días más difíciles.",
    "Hay algo en ti que no se explica… solo se siente.",
    "Esa sonrisa tuya tiene el poder de cambiar un día entero.",
    "Eres bonita de una forma que va más allá de lo que ve el espejo.",
  ],
  vales: [
    "No olvides lo valiosa que eres, aunque hoy no lo sientas.",
    "El mundo es mejor porque tú estás en él.",
    "Tu presencia importa más de lo que imaginas.",
    "Vales muchísimo… y no necesitas demostrárselo a nadie.",
  ],
};

// ─── 4. MOSTRAR TARJETA DE RECUERDO ──────────
function showRemember(tipo) {
  const card   = document.getElementById('remember-card');
  const img    = document.getElementById('remember-img');
  const msg    = document.getElementById('remember-msg');

  // Elegir foto y mensaje al azar
  const foto    = fotos[Math.floor(Math.random() * fotos.length)];
  const lista   = mensajes[tipo];
  const mensaje = lista[Math.floor(Math.random() * lista.length)];

  // Fade out → actualizar → fade in
  card.classList.remove('visible');
  img.style.opacity = '0';

  setTimeout(() => {
    img.src    = foto;
    msg.textContent = mensaje;
    card.classList.add('visible');

    img.onload = () => { img.style.opacity = '1'; };
    // Si la imagen ya está en caché
    if (img.complete) img.style.opacity = '1';
  }, 300);
}

// ─── 5. MÚSICA DE FONDO ───────────────────────
const audio    = document.getElementById('bg-music');
const musicBtn  = document.getElementById('music-btn');
const musicIcon = document.getElementById('music-icon');
let musicStarted = false;

function toggleMusic() {
  if (audio.paused) {
    audio.volume = 0;
    audio.play().then(() => {
      fadeAudio(audio, 0, 0.45, 2000);
      musicIcon.textContent = '🔊';
      musicBtn.classList.add('playing');
    }).catch(() => {});
  } else {
    fadeAudio(audio, audio.volume, 0, 800, () => audio.pause());
    musicIcon.textContent = '🎵';
    musicBtn.classList.remove('playing');
  }
}

function fadeAudio(audioEl, from, to, duration, callback) {
  const steps = 30;
  const stepTime = duration / steps;
  const diff = (to - from) / steps;
  let current = from;
  const timer = setInterval(() => {
    current += diff;
    audioEl.volume = Math.min(1, Math.max(0, current));
    if ((diff > 0 && current >= to) || (diff < 0 && current <= to)) {
      clearInterval(timer);
      audioEl.volume = to;
      if (callback) callback();
    }
  }, stepTime);
}

// Auto-play suave al primer clic en la página
document.addEventListener('click', () => {
  if (!musicStarted && audio.paused) {
    musicStarted = true;
    audio.volume = 0;
    audio.play().then(() => {
      fadeAudio(audio, 0, 0.45, 3000);
      musicIcon.textContent = '🔊';
      musicBtn.classList.add('playing');
    }).catch(() => {});
  }
}, { once: true });
