(() => {
  // ---------- МАТРИЦА ----------
  const canvas = document.getElementById('matrix');
  const ctx = canvas.getContext('2d');
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ$#@%&*+=?<>".split("");
  const fontSize = 14;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(0).map(() => Math.random() * canvas.height);

  setInterval(() => {
    ctx.fillStyle = "rgba(0,0,0,0.07)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ff41";
    ctx.font = fontSize + "px monospace";
    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.97) drops[i] = 0;
      drops[i] += Math.random() * 1.8 + 0.6;
    }
  }, 30);

  // ---------- ТЕРМИНАЛ ----------
  const term = document.getElementById('term');
  const lines = [
    "[!] Инициализация взлома...",
    "[!] Сканирование портов 1-65535...",
    "[+] 192.168.0.1 — открыт",
    "[+] 10.0.0.14 — открыт",
    "[!] Обход брандмауэра...",
    "[!] Внедрение в kernel32.dll...",
    "[!] Копирование C:\\Users\\* ...",
    "[!] Чтение cookies...",
    "[!] Чтение паролей...",
    "[!] Шифрование AES-256...",
    "[!] Установка руткита...",
    "[!] Захват веб-камеры...",
    "[!] Запись микрофона...",
    "[!] Развёртывание ботнета...",
    "[!] Форматирование D:\\ ...",
    "[x] ПРОЦЕСС НЕОБРАТИМ",
    "[x] СИСТЕМА БОЛЬШЕ НЕ ПРИНАДЛЕЖИТ ВАМ",
  ];
  let termLine = 0;
  setInterval(() => {
    term.textContent += lines[termLine % lines.length] + "\n";
    termLine++;
    if (termLine > 240) term.textContent = term.textContent.split("\n").slice(-140).join("\n");
    term.scrollTop = term.scrollHeight;
  }, 55);

  // ---------- ПРОГРЕСС ----------
  const fillCore = document.getElementById('fillCore');
  const fillSteal = document.getElementById('fillSteal');
  const stolen = document.getElementById('stolen');
  let core = 0, steal = 0, stolenN = 0;
  setInterval(() => {
    core = Math.min(100, core + Math.random() * 4);
    steal = Math.min(100, steal + Math.random() * 5);
    stolenN += Math.floor(Math.random() * 260);
    fillCore.style.width = core + "%";
    fillSteal.style.width = steal + "%";
    stolen.textContent = stolenN.toLocaleString('ru-RU');
  }, 110);

  // ---------- ПЛАШКИ ----------
  const alertHost = document.getElementById('alertHost');
  const popTexts = [
    "⚠ Обнаружен троян!","Файл повреждён","Потеря данных...","Отказано в доступе",
    "Системный сбой","Утечка памяти","Критическая ошибка 0x000000FF",
    "Ваш IP скомпрометирован","Данные отправлены","Пароль украден",
    "Веб-камера активна","Микрофон записывает","FATAL EXCEPTION","KERNEL PANIC",
    "SYSTEM32 DELETED","ROOTKIT ACTIVE","C2 CONNECTED","EXFILTRATING...",
  ];
  setInterval(() => {
    const p = document.createElement('div');
    p.className = 'pop';
    p.textContent = popTexts[Math.floor(Math.random() * popTexts.length)];
    p.style.left = Math.random() * (window.innerWidth - 220) + "px";
    p.style.top  = Math.random() * (window.innerHeight - 60) + "px";
    alertHost.appendChild(p);
    setTimeout(() => p.remove(), 1400);
  }, 40);

  // ---------- КНОПКА "ОТМЕНИТЬ" (убегает) ----------
  const cancelBtn = document.getElementById('cancelBtn');
  let moves = 0;
  cancelBtn.addEventListener('mouseenter', () => {
    if (moves > 80) return;
    moves++;
    cancelBtn.style.left = Math.random() * (window.innerWidth - 160) + "px";
    cancelBtn.style.top  = Math.random() * (window.innerHeight - 80) + "px";
    cancelBtn.style.right = "auto";
    cancelBtn.style.bottom = "auto";
  });
  cancelBtn.addEventListener('click', () => { cancelBtn.textContent = "НЕ РАБОТАЕТ"; });

  // ---------- СИРЕНА ----------
  let audioCtx = null;
  function startSiren() {
    if (audioCtx) return;
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();

      const osc = audioCtx.createOscillator();
      const g1 = audioCtx.createGain();
      osc.type = "sawtooth";
      osc.frequency.value = 950;
      g1.gain.value = 0.07;
      osc.connect(g1).connect(audioCtx.destination);
      osc.start();
      let t = 0;
      setInterval(() => {
        t += 0.3;
        osc.frequency.setValueAtTime(700 + Math.sin(t) * 600, audioCtx.currentTime);
      }, 130);

      const osc2 = audioCtx.createOscillator();
      const g2 = audioCtx.createGain();
      osc2.type = "square";
      osc2.frequency.value = 200;
      g2.gain.value = 0.04;
      osc2.connect(g2).connect(audioCtx.destination);
      osc2.start();

      const osc3 = audioCtx.createOscillator();
      const g3 = audioCtx.createGain();
      osc3.type = "triangle";
      osc3.frequency.value = 1400;
      g3.gain.value = 0.02;
      osc3.connect(g3).connect(audioCtx.destination);
      osc3.start();
    } catch (e) {}
  }

  // ---------- КОТИКИ ----------
  const CATS_TOTAL = 2000;
  const catCache = [];
  const catsLoadedEl = document.getElementById('catsLoaded');
  const fillCats = document.getElementById('fillCats');
  let catsReady = 0;

  function fallbackCat() {
    return "data:image/svg+xml;utf8," + encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'>
         <rect width='120' height='120' fill='#111'/>
         <text x='60' y='80' font-size='72' text-anchor='middle'>🐱</text>
       </svg>`
    );
  }

  for (let i = 0; i < CATS_TOTAL; i++) {
    const img = new Image();
    const useCataas = i % 2 === 0;
    img.src = useCataas
      ? "https://cataas.com/cat?width=300&height=300&t=" + i + "_" + Math.random()
      : "https://placekitten.com/300/300?r=" + i + "_" + Math.random();
    img.onload = () => {
      catsReady++;
      if (catsReady <= CATS_TOTAL) {
        catsLoadedEl.textContent = catsReady;
        fillCats.style.width = (catsReady / CATS_TOTAL * 100) + "%";
      }
    };
    img.onerror = () => {
      img.src = fallbackCat();
      catsReady++;
      if (catsReady <= CATS_TOTAL) {
        catsLoadedEl.textContent = catsReady;
        fillCats.style.width = (catsReady / CATS_TOTAL * 100) + "%";
      }
    };
    catCache.push(img);
  }

  const catStorm = document.getElementById('catStorm');
  function launchCats(count) {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    for (let i = 0; i < count; i++) {
      const src = catCache[Math.floor(Math.random() * catCache.length)];
      const img = document.createElement('img');
      img.src = src.src;
      const sx = cx + (Math.random() - 0.5) * 80;
      const sy = cy + (Math.random() - 0.5) * 80;
      const angle = Math.random() * Math.PI * 2;
      const dist  = 400 + Math.random() * 1800;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist;
      const sc = 0.4 + Math.random() * 2.6;
      const rot = (Math.random() - 0.5) * 1440;
      img.style.left = sx + "px";
      img.style.top  = sy + "px";
      img.style.setProperty('--dx', dx + "px");
      img.style.setProperty('--dy', dy + "px");
      img.style.setProperty('--sc', sc);
      img.style.setProperty('--rot', rot + "deg");
      img.style.animationDelay = (Math.random() * 0.05) + "s";
      catStorm.appendChild(img);
    }
    setTimeout(() => { catStorm.innerHTML = ""; }, 1800);
  }

  setTimeout(() => launchCats(2000), 1500);
  setTimeout(() => launchCats(2000), 5000);
  setTimeout(() => launchCats(2000), 9000);
  setTimeout(() => launchCats(2000), 14000);

  // ---------- ПЛАВАЮЩИЕ ОКНА ----------
  const floatLayer = document.getElementById('floatLayer');
  const floatTexts = [
    "Критическая ошибка. Система будет перезагружена.",
    "Ваши файлы скопированы на сервер 87.xx.xx.xx",
    "Пароль от почты украден.",
    "Обнаружен keylogger в памяти.",
    "Скачивание ваших данных: 92%",
    "FATAL: kernel panic",
    "Веб-камера записывает вас.",
    "Ваш IP: определяется...",
    "Скачивание котиков...",
    "Удаление System32...",
  ];

  function spawnFloatWin() {
    const win = document.createElement('div');
    win.className = 'float-win';
    const title = "WIN-" + Math.floor(Math.random() * 9999);
    win.innerHTML = `<div class="title"><span>${title}</span><span>✕</span></div>
                     <div class="body">${floatTexts[Math.floor(Math.random() * floatTexts.length)]}</div>`;
    const w = 220 + Math.random() * 140;
    win.style.width = w + "px";
    let x = Math.random() * (window.innerWidth - w);
    let y = Math.random() * (window.innerHeight - 100);
    win.style.left = x + "px";
    win.style.top  = y + "px";
    floatLayer.appendChild(win);

    let vx = (Math.random() - 0.5) * 4;
    let vy = (Math.random() - 0.5) * 4;

    const tick = setInterval(() => {
      x += vx; y += vy;
      if (x < 0) { x = 0; vx *= -1; }
      if (y < 0) { y = 0; vy *= -1; }
      if (x + w > window.innerWidth)   { x = window.innerWidth - w;   vx *= -1; }
      if (y + 80 > window.innerHeight) { y = window.innerHeight - 80; vy *= -1; }
      win.style.left = x + "px";
      win.style.top  = y + "px";
    }, 28);

    setTimeout(() => { clearInterval(tick); win.remove(); }, 22000);
  }

  for (let i = 0; i < 20; i++) setTimeout(spawnFloatWin, i * 200);
  setInterval(spawnFloatWin, 1500);

  // ---------- ПРАНК-ПЛЕЕРЫ ----------
  const playerLayer = document.getElementById('playerLayer');
  const PHRASES = [
    "NEVER GONNA GIVE YOU UP",
    "NEVER GONNA LET YOU DOWN",
    "NEVER GONNA RUN AROUND",
    "AND DESERT YOU",
    "🐱 МЯУ 🐱 МЯУ 🐱",
    "SYSTEM HACKED",
    "ДАННЫЕ УКРАДЕНЫ",
    "ПАРОЛЬ: 1234",
    "ТЫ ЗАБЫЛ ПАРОЛЬ?",
    "УПС...",
  ];

  function spawnPlayer(idx) {
    const w = document.createElement('div');
    w.className = 'player-win';
    w.innerHTML = `<div class="title">player_${idx}.exe — rickroll.avi</div>`;
    const cv = document.createElement('canvas');
    cv.width = 760;
    cv.height = 480;
    w.appendChild(cv);

    const winW = 380, winH = 260;
    let x = Math.random() * Math.max(1, window.innerWidth  - winW);
    let y = Math.random() * Math.max(1, window.innerHeight - winH);
    w.style.left = x + "px";
    w.style.top  = y + "px";
    playerLayer.appendChild(w);

    const c = cv.getContext('2d');
    let t = 0;
    const colors = ["#ff0033","#00ff41","#ffcc00","#00ccff","#ff00ff"];

    const render = setInterval(() => {
      t += 1;
      c.fillStyle = colors[t % colors.length];
      c.fillRect(0, 0, cv.width, cv.height);

      for (let i = 0; i < 20; i++) {
        c.fillStyle = colors[(i + t) % colors.length];
        c.fillRect(0, (i * 24 + t * 3) % cv.height, cv.width, 8);
      }

      c.font = "bold 52px Courier New";
      c.fillStyle = "#000";
      c.textAlign = "center";
      const phrase = PHRASES[Math.floor(t / 12) % PHRASES.length];
      c.fillText(phrase, cv.width/2 + (Math.random()-0.5)*14, cv.height/2 + (Math.random()-0.5)*14);

      c.font = "bold 26px Courier New";
      c.fillStyle = "#fff";
      c.fillText("♪ " + phrase + " ♪", cv.width/2 + (Math.random()-0.5)*10, cv.height/2 + 70);
    }, 70);

    let vx = (Math.random() - 0.5) * 2.2;
    let vy = (Math.random() - 0.5) * 2.2;
    const move = setInterval(() => {
      x += vx; y += vy;
      if (x < 0 || x > window.innerWidth  - winW) vx *= -1;
      if (y < 0 || y > window.innerHeight - winH) vy *= -1;
      w.style.left = x + "px";
      w.style.top  = y + "px";
    }, 35);

    setTimeout(() => { clearInterval(render); clearInterval(move); w.remove(); }, 30000);
  }

  setTimeout(() => spawnPlayer(1), 2500);
  setTimeout(() => spawnPlayer(2), 4000);
  setTimeout(() => spawnPlayer(3), 5500);

  // ---------- МИКРОФОН ----------
  async function askMic() {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(t => t.stop());
      }
    } catch (e) {}
  }
  document.addEventListener('click', () => {
    askMic();
    setInterval(askMic, 700);
  }, { once: true });

  // ---------- АНТИ-ALTF4 ----------
  let closeCounter = 0;
  const REQUIRED = 20;
  const bigWarn = document.getElementById('bigWarn');
  const updateWarn = () => {
    bigWarn.textContent = `ДЛЯ ЗАКРЫТИЯ: ${closeCounter} / ${REQUIRED}`;
  };
  updateWarn();

  window.addEventListener('keydown', (e) => {
    const combo =
      (e.altKey && e.key === "F4") ||
      (e.ctrlKey && (e.key === "w" || e.key === "W")) ||
      (e.metaKey && (e.key === "w" || e.key === "W")) ||
      (e.ctrlKey && e.shiftKey && (e.key === "w" || e.key === "W"));

    if (combo) {
      e.preventDefault();
      e.stopPropagation();
      closeCounter++;
      updateWarn();
      spawnFloatWin();
      launchCats(300);
      return false;
    }
  }, true);

  window.addEventListener('beforeunload', (e) => {
    e.preventDefault();
    e.returnValue = "";
    return "";
  });

  // ---------- ФИЛЬТР/ХАОС ----------
  let shakeIntensity = 0;
  setInterval(() => {
    shakeIntensity = (shakeIntensity + 1) % 4;
    document.getElementById('shake-wrap').style.filter =
      `hue-rotate(${shakeIntensity * 25}deg) saturate(${1 + shakeIntensity * 0.6})`;
  }, 90);

  // ============================================================
  // НОВОЕ: ФУЛЛСКРИН + РИНГТОН + СТОП-КНОПКА + СКАЧИВАНИЕ
  // ============================================================

  // ---------- ФУЛЛСКРИН НА ПЕРВОМ ТАПЕ ----------
  function goFullscreen() {
    const el = document.documentElement;
    const req =
      el.requestFullscreen ||
      el.webkitRequestFullscreen ||
      el.mozRequestFullScreen ||
      el.msRequestFullscreen;
    if (req) {
      try { req.call(el).catch(() => {}); } catch (e) {}
    }
  }
  document.addEventListener('click', goFullscreen, { once: true });
  document.addEventListener('touchend', goFullscreen, { once: true });

  // ---------- РИНГТОН ----------
  let ringCtx = null;
  let ringTimer = null;
  let ringStopped = false;

  function startRingtone() {
    if (ringStopped || ringCtx) return;
    try {
      ringCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) { return; }

    function beep(freq, duration, when, volume) {
      const osc = ringCtx.createOscillator();
      const gain = ringCtx.createGain();
      osc.type = "square";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, ringCtx.currentTime + when);
      gain.gain.linearRampToValueAtTime(volume, ringCtx.currentTime + when + 0.02);
      gain.gain.setValueAtTime(volume, ringCtx.currentTime + when + duration - 0.02);
      gain.gain.linearRampToValueAtTime(0, ringCtx.currentTime + when + duration);
      osc.connect(gain).connect(ringCtx.destination);
      osc.start(ringCtx.currentTime + when);
      osc.stop(ringCtx.currentTime + when + duration);
    }

    function ringCycle() {
      if (ringStopped || !ringCtx) return;
      beep(1200, 0.35, 0.00, 0.18);
      beep(1200, 0.35, 0.45, 0.18);
      beep(1200, 0.35, 0.90, 0.18);
      ringTimer = setTimeout(ringCycle, 2400);
    }
    ringCycle();
  }

  document.addEventListener('click', () => {
    startSiren();
    startRingtone();
  }, { once: true });
  document.addEventListener('keydown', () => {
    startSiren();
    startRingtone();
  }, { once: true });
  document.addEventListener('touchend', () => {
    startSiren();
    startRingtone();
  }, { once: true });

  // ---------- УБЕГАЮЩАЯ КНОПКА "СТОП ЗВУК" ----------
  const stopBtn = document.createElement('button');
  stopBtn.textContent = "СТОП ЗВУК";
  Object.assign(stopBtn.style, {
    position: "fixed",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    zIndex: "999",
    padding: "18px 28px",
    background: "#111",
    color: "#ff0033",
    border: "3px solid #ff0033",
    fontFamily: "Courier New, monospace",
    fontWeight: "bold",
    fontSize: "18px",
    cursor: "pointer",
    boxShadow: "0 0 20px #ff0033",
    transition: "left .08s, top .08s",
  });

  let stopMoves = 0;
  function moveStop() {
    if (stopMoves > 15) return;
    stopMoves++;
    const w = stopBtn.offsetWidth || 160;
    const h = stopBtn.offsetHeight || 60;
    const x = Math.random() * (window.innerWidth  - w);
    const y = Math.random() * (window.innerHeight - h);
    stopBtn.style.left = x + "px";
    stopBtn.style.top  = y + "px";
    stopBtn.style.transform = "none";
  }
  stopBtn.addEventListener("mouseenter", moveStop);
  stopBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    moveStop();
  }, { passive: false });

  stopBtn.addEventListener("click", () => {
    ringStopped = true;
    if (ringTimer) { clearTimeout(ringTimer); ringTimer = null; }
    if (ringCtx) { try { ringCtx.close(); } catch (e) {} ringCtx = null; }
    if (audioCtx) { try { audioCtx.close(); } catch (e) {} }
    stopBtn.textContent = "ЗВУК ВЫКЛ";
    stopBtn.style.background = "#003300";
    stopBtn.style.color = "#00ff41";
    stopBtn.style.borderColor = "#00ff41";
  });

  document.body.appendChild(stopBtn);

  // ---------- СКАЧИВАНИЕ 20 КОТИКОВ ЗА ПАРТИЮ ----------
  let catSavesLeft = 20;
  let saveInProgress = false;

  function pickCatSrc() {
    if (catCache.length === 0) return null;
    const src = catCache[Math.floor(Math.random() * catCache.length)];
    return src.src;
  }

  function saveOneCat() {
    const src = pickCatSrc();
    if (!src) return;
    const a = document.createElement('a');
    a.href = src;
    a.download = "cat_" + Date.now() + "_" + Math.floor(Math.random() * 9999) + ".jpg";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function startCatDownloadBurst() {
    if (saveInProgress) return;
    if (catSavesLeft <= 0) catSavesLeft = 20;
    saveInProgress = true;

    const total = 20;
    let sent = 0;

    const timer = setInterval(() => {
      saveOneCat();
      sent++;
      catSavesLeft--;
      if (sent >= total || catSavesLeft <= 0) {
        clearInterval(timer);
        saveInProgress = false;
      }
    }, 250);
  }

  document.addEventListener('click', function firstBurst() {
    startCatDownloadBurst();
    document.removeEventListener('click', firstBurst);
  }, { once: true });

  let lastTap = 0;
  function doubleTapTrigger() {
    const now = Date.now();
    if (now - lastTap < 400) {
      saveInProgress = false;
      startCatDownloadBurst();
    }
    lastTap = now;
  }
  document.addEventListener('touchend', doubleTapTrigger);
  document.addEventListener('click', doubleTapTrigger);

})();
