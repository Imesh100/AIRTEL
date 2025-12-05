export default {
  async fetch() {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Cosmic New Year Portal</title>
  <style>
    :root {
      --space: #04030f;
      --purple: #7b5cf3;
      --blue: #39c6ff;
      --glow: #9de8ff;
      --white: #f6f8ff;
      --panel: rgba(255, 255, 255, 0.06);
      --panel-border: rgba(255, 255, 255, 0.12);
      --orbit-size: min(70vw, 420px);
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      min-height: 100vh;
      font-family: "Inter", system-ui, -apple-system, sans-serif;
      color: var(--white);
      background: radial-gradient(circle at 20% 20%, rgba(71, 51, 164, 0.55), transparent 35%),
        radial-gradient(circle at 80% 10%, rgba(26, 132, 187, 0.5), transparent 35%),
        radial-gradient(circle at 70% 70%, rgba(120, 61, 214, 0.45), transparent 40%),
        radial-gradient(circle at 30% 80%, rgba(48, 189, 255, 0.45), transparent 40%),
        var(--space);
      overflow: hidden;
    }

    .overlay {
      position: fixed;
      inset: 0;
      pointer-events: none;
      background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.04), transparent 45%);
      backdrop-filter: blur(0px);
      transition: backdrop-filter 0.6s ease;
    }

    .grid {
      position: fixed;
      inset: 0;
      background: linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
      background-size: 120px 120px;
      mix-blend-mode: screen;
      opacity: 0.08;
      pointer-events: none;
    }

    header {
      padding: 32px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }

    h1 {
      margin: 0;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      font-size: clamp(24px, 3vw, 34px);
    }

    .pill {
      padding: 6px 12px;
      border-radius: 999px;
      background: linear-gradient(90deg, rgba(123, 92, 243, 0.35), rgba(57, 198, 255, 0.35));
      border: 1px solid rgba(255,255,255,0.2);
      font-size: 12px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    main {
      position: relative;
      z-index: 2;
      padding: 24px clamp(16px, 6vw, 56px) 64px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 24px;
      align-items: start;
    }

    .panel {
      background: var(--panel);
      border: 1px solid var(--panel-border);
      border-radius: 18px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
      backdrop-filter: blur(8px);
      position: relative;
      overflow: hidden;
    }

    .panel::before {
      content: "";
      position: absolute;
      inset: -40%;
      background: radial-gradient(circle at 30% 30%, rgba(123,92,243,0.08), transparent 45%),
        radial-gradient(circle at 70% 70%, rgba(57,198,255,0.08), transparent 45%);
      filter: blur(40px);
      z-index: 0;
    }

    .panel-content {
      position: relative;
      z-index: 1;
      padding: 20px;
    }

    #canvas {
      position: fixed;
      inset: 0;
      z-index: 0;
    }

    .timer {
      display: grid;
      place-items: center;
      padding: 28px;
    }

    .orbit {
      width: var(--orbit-size);
      height: var(--orbit-size);
      position: relative;
    }

    .orbit svg {
      width: 100%;
      height: 100%;
    }

    .planet {
      position: absolute;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--glow), var(--purple));
      box-shadow: 0 0 8px rgba(157, 232, 255, 0.8);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .planet.hours { width: 16px; height: 16px; }
    .planet.minutes { width: 13px; height: 13px; background: linear-gradient(135deg, var(--purple), var(--blue)); }
    .planet.seconds { width: 10px; height: 10px; background: linear-gradient(135deg, #f5f5f5, var(--blue)); box-shadow: 0 0 10px rgba(255,255,255,0.8); }

    .legend {
      margin-top: 16px;
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      justify-content: center;
      font-size: 13px;
      letter-spacing: 0.03em;
    }

    .legend span {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 10px;
      border-radius: 12px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.1);
    }

    .legend .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      display: inline-block;
    }

    .cta-row {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      align-items: center;
      margin-top: 12px;
    }

    button {
      border: 1px solid var(--panel-border);
      background: linear-gradient(135deg, rgba(123,92,243,0.22), rgba(57,198,255,0.22));
      color: var(--white);
      padding: 12px 16px;
      border-radius: 12px;
      font-size: 15px;
      letter-spacing: 0.02em;
      cursor: pointer;
      transition: transform 0.15s ease, box-shadow 0.2s ease, border 0.2s ease;
    }

    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(0,0,0,0.35), 0 0 12px rgba(157,232,255,0.3);
      border-color: rgba(255,255,255,0.3);
    }

    button.secondary {
      background: rgba(255,255,255,0.08);
    }

    .counts {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
      gap: 12px;
      margin-top: 18px;
    }

    .count {
      padding: 12px 14px;
      border-radius: 14px;
      border: 1px solid rgba(255,255,255,0.08);
      background: rgba(255,255,255,0.03);
      text-align: center;
    }

    .count strong { display: block; font-size: 28px; }
    .count small { color: rgba(255,255,255,0.7); letter-spacing: 0.04em; }

    .wish-box {
      padding: 18px;
      border-radius: 12px;
      background: rgba(255,255,255,0.04);
      border: 1px dashed rgba(255,255,255,0.2);
      margin-top: 12px;
      min-height: 56px;
    }

    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(4,3,15,0.75);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 9;
      backdrop-filter: blur(6px);
    }

    .modal {
      background: var(--panel);
      border: 1px solid var(--panel-border);
      border-radius: 16px;
      width: min(520px, 90vw);
      padding: 20px;
      position: relative;
      box-shadow: 0 18px 60px rgba(0,0,0,0.45);
    }

    .modal h3 { margin-top: 0; margin-bottom: 10px; }

    textarea {
      width: 100%;
      min-height: 120px;
      border-radius: 12px;
      padding: 12px;
      border: 1px solid rgba(255,255,255,0.2);
      background: rgba(255,255,255,0.04);
      color: var(--white);
      resize: vertical;
      font-size: 15px;
    }

    .close {
      position: absolute;
      right: 12px;
      top: 10px;
      background: transparent;
      border: none;
      font-size: 18px;
      cursor: pointer;
      color: var(--white);
    }

    .shooting-star {
      position: fixed;
      width: 4px;
      height: 4px;
      background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.9));
      border-radius: 50%;
      box-shadow: 0 0 12px rgba(255,255,255,0.8);
      pointer-events: none;
      z-index: 8;
      animation: shooting 1.4s ease-out forwards;
    }

    @keyframes shooting {
      from { transform: translate(var(--x-start), var(--y-start)) rotate(20deg); opacity: 1; }
      to { transform: translate(var(--x-end), var(--y-end)) rotate(20deg); opacity: 0; }
    }

    #portal {
      position: fixed;
      inset: 0;
      background: radial-gradient(circle at 50% 50%, rgba(157,232,255,0.22), rgba(4,3,15,0.95));
      mix-blend-mode: screen;
      opacity: 0;
      transform: scale(0.8);
      pointer-events: none;
      z-index: 10;
      transition: opacity 0.5s ease, transform 0.6s ease;
      overflow: hidden;
    }

    #portal.active {
      opacity: 1;
      transform: scale(1);
      animation: pulse 2.6s ease-in-out infinite;
    }

    @keyframes pulse {
      0% { filter: drop-shadow(0 0 20px rgba(157,232,255,0.5)); }
      50% { filter: drop-shadow(0 0 32px rgba(123,92,243,0.75)); }
      100% { filter: drop-shadow(0 0 20px rgba(157,232,255,0.5)); }
    }

    .burst-star {
      position: absolute;
      width: 6px;
      height: 6px;
      background: radial-gradient(circle, #fff, rgba(255,255,255,0));
      border-radius: 50%;
      animation: burst 1.6s ease-out forwards;
      pointer-events: none;
    }

    @keyframes burst {
      from { transform: scale(0.4); opacity: 1; }
      to { transform: scale(1.8); opacity: 0; }
    }

    .share-link {
      margin-top: 12px;
      word-break: break-all;
      font-size: 13px;
      color: var(--glow);
    }

    footer {
      text-align: center;
      padding: 18px;
      opacity: 0.8;
      font-size: 13px;
      letter-spacing: 0.05em;
    }

    @media (max-width: 720px) {
      header { padding: 24px 16px 8px; }
      main { padding: 16px; }
      :root { --orbit-size: min(90vw, 360px); }
    }
  </style>
</head>
<body>
  <canvas id="canvas"></canvas>
  <div class="overlay"></div>
  <div class="grid"></div>
  <div id="portal"></div>
  <div class="modal-backdrop" id="modal">
    <div class="modal">
      <button class="close" aria-label="Close" id="closeModal">✕</button>
      <h3>Make a wish ✨</h3>
      <p>Send your wish into the cosmos. It will streak across the sky and echo through the portal at midnight.</p>
      <textarea id="wishInput" placeholder="Type your wish here"></textarea>
      <div class="cta-row" style="justify-content:flex-end; margin-top:12px;">
        <button class="secondary" id="cancelWish">Cancel</button>
        <button id="launchWish">Launch it</button>
      </div>
    </div>
  </div>

  <header>
    <div>
      <div class="pill">Cosmic New Year Portal</div>
      <h1>Orbiting into the next midnight</h1>
    </div>
    <div class="cta-row">
      <button id="musicToggle">▶︎ Play cosmic score</button>
      <button class="secondary" id="wishButton">Make a wish</button>
    </div>
  </header>

  <main>
    <section class="panel timer">
      <div class="panel-content">
        <div class="orbit">
          <svg viewBox="0 0 360 360">
            <circle cx="180" cy="180" r="150" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="2" stroke-dasharray="6 8" />
            <circle id="orbitHours" cx="180" cy="180" r="120" fill="none" stroke="url(#grad1)" stroke-width="8" stroke-linecap="round" />
            <circle id="orbitMinutes" cx="180" cy="180" r="95" fill="none" stroke="url(#grad2)" stroke-width="6" stroke-linecap="round" />
            <circle id="orbitSeconds" cx="180" cy="180" r="70" fill="none" stroke="url(#grad3)" stroke-width="4" stroke-linecap="round" />
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="var(--purple)" stop-opacity="0.9" />
                <stop offset="100%" stop-color="var(--blue)" stop-opacity="0.9" />
              </linearGradient>
              <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="var(--glow)" stop-opacity="0.9" />
                <stop offset="100%" stop-color="var(--purple)" stop-opacity="0.9" />
              </linearGradient>
              <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="var(--white)" stop-opacity="0.9" />
                <stop offset="100%" stop-color="var(--blue)" stop-opacity="0.9" />
              </linearGradient>
            </defs>
          </svg>
          <div class="planet hours" id="planetHours"></div>
          <div class="planet minutes" id="planetMinutes"></div>
          <div class="planet seconds" id="planetSeconds"></div>
        </div>
        <div class="legend">
          <span><span class="dot" style="background:linear-gradient(135deg,var(--purple),var(--blue));"></span>Hours orbit</span>
          <span><span class="dot" style="background:linear-gradient(135deg,var(--glow),var(--purple));"></span>Minutes orbit</span>
          <span><span class="dot" style="background:linear-gradient(135deg,#fff,var(--blue));"></span>Seconds comet</span>
        </div>
        <div class="counts">
          <div class="count"><strong id="days">0</strong><small>Days</small></div>
          <div class="count"><strong id="hours">0</strong><small>Hours</small></div>
          <div class="count"><strong id="minutes">0</strong><small>Minutes</small></div>
          <div class="count"><strong id="seconds">0</strong><small>Seconds</small></div>
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-content">
        <h3>Wish log</h3>
        <p>Write a wish and fire it as a shooting star. After midnight, share it through the portal.</p>
        <div class="wish-box" id="wishBox">No wishes launched yet.</div>
        <div class="share-link" id="shareLink" hidden></div>
        <div class="cta-row">
          <button id="fireWish">Make a wish</button>
          <button class="secondary" id="resetShare" title="Clear wish link">Clear link</button>
        </div>
      </div>
    </section>
  </main>

  <footer>Stars align at the stroke of midnight. Keep your cursor drifting to feel the parallax wind.</footer>

  <script>
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    const stars = [];
    const starCount = 220;
    let mouse = { x: 0, y: 0 };

    const modal = document.getElementById('modal');
    const wishInput = document.getElementById('wishInput');
    const wishBox = document.getElementById('wishBox');
    const shareLink = document.getElementById('shareLink');
    const wishButton = document.getElementById('wishButton');
    const fireWish = document.getElementById('fireWish');
    const cancelWish = document.getElementById('cancelWish');
    const closeModal = document.getElementById('closeModal');
    const launchWish = document.getElementById('launchWish');
    const resetShare = document.getElementById('resetShare');

    const portal = document.getElementById('portal');
    const overlay = document.querySelector('.overlay');
    const musicToggle = document.getElementById('musicToggle');

    const orbitHours = document.getElementById('orbitHours');
    const orbitMinutes = document.getElementById('orbitMinutes');
    const orbitSeconds = document.getElementById('orbitSeconds');
    const planetHours = document.getElementById('planetHours');
    const planetMinutes = document.getElementById('planetMinutes');
    const planetSeconds = document.getElementById('planetSeconds');
    const dayEl = document.getElementById('days');
    const hourEl = document.getElementById('hours');
    const minuteEl = document.getElementById('minutes');
    const secondEl = document.getElementById('seconds');

    const wishParam = new URLSearchParams(location.search).get('wish');
    let wishText = wishParam ? decodeURIComponent(wishParam) : '';
    if (wishText) {
      wishBox.textContent = 'Incoming wish: ' + wishText;
    }

    function resize() {
      width = canvas.width = innerWidth * devicePixelRatio;
      height = canvas.height = innerHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    }

    function createStars() {
      stars.length = 0;
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * innerWidth,
          y: Math.random() * innerHeight,
          z: Math.random() * 1 + 0.2,
          radius: Math.random() * 2 + 0.2,
        });
      }
    }

    function drawStars() {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (const star of stars) {
        const dx = (mouse.x - innerWidth / 2) * star.z * 0.04;
        const dy = (mouse.y - innerHeight / 2) * star.z * 0.04;
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${0.5 + star.z * 0.5})`;
        ctx.arc(star.x - dx, star.y - dy, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(drawStars);
    }

    window.addEventListener('mousemove', (e) => {
      mouse = { x: e.clientX, y: e.clientY };
      overlay.style.backdropFilter = `blur(${4 + (e.clientY / innerHeight) * 6}px)`;
    });

    function toggleModal(show) {
      modal.style.display = show ? 'flex' : 'none';
      if (show) {
        wishInput.focus();
      }
    }

    wishButton.onclick = fireWish.onclick = () => toggleModal(true);
    cancelWish.onclick = closeModal.onclick = () => toggleModal(false);

    function launchShootingStar() {
      const star = document.createElement('div');
      star.className = 'shooting-star';
      const startX = Math.random() * innerWidth * 0.4;
      const startY = Math.random() * innerHeight * 0.6;
      const endX = startX + 480 + Math.random() * 320;
      const endY = startY - 120 - Math.random() * 120;
      star.style.setProperty('--x-start', `${startX}px`);
      star.style.setProperty('--y-start', `${startY}px`);
      star.style.setProperty('--x-end', `${endX}px`);
      star.style.setProperty('--y-end', `${endY}px`);
      document.body.appendChild(star);
      setTimeout(() => star.remove(), 1500);
    }

    function setWishText(text) {
      wishText = text.trim();
      if (wishText) {
        wishBox.textContent = 'Wish queued: ' + wishText;
      } else {
        wishBox.textContent = 'No wishes launched yet.';
        shareLink.hidden = true;
      }
    }

    launchWish.onclick = () => {
      setWishText(wishInput.value);
      if (wishText) {
        launchShootingStar();
      }
      toggleModal(false);
      wishInput.value = '';
    };

    resetShare.onclick = () => {
      shareLink.hidden = true;
      shareLink.textContent = '';
      const url = new URL(location.href);
      url.searchParams.delete('wish');
      history.replaceState({}, '', url.toString());
    };

    function updateShareLink() {
      if (!wishText) return;
      const url = new URL(location.href);
      url.searchParams.set('wish', encodeURIComponent(wishText));
      shareLink.hidden = false;
      shareLink.textContent = 'Shareable wish link: ' + url.toString();
    }

    function polarPosition(radius, angle) {
      return {
        x: 180 + radius * Math.cos(angle),
        y: 180 + radius * Math.sin(angle),
      };
    }

    function setPlanetPosition(el, radius, angle) {
      const { x, y } = polarPosition(radius, angle);
      el.style.transform = `translate(${x}px, ${y}px)`;
    }

    function formatArc(circleEl, fraction) {
      const r = circleEl.getAttribute('r');
      const circumference = 2 * Math.PI * r;
      circleEl.setAttribute('stroke-dasharray', `${circumference * fraction} ${circumference}`);
      const dashOffset = circumference * (1 - fraction);
      circleEl.setAttribute('stroke-dashoffset', dashOffset);
    }

    function timeToMidnight() {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      return midnight - now;
    }

    let midnightTriggered = false;

    function updateTimer() {
      const ms = timeToMidnight();
      const totalSeconds = Math.max(0, Math.floor(ms / 1000));
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      dayEl.textContent = days;
      hourEl.textContent = hours.toString().padStart(2, '0');
      minuteEl.textContent = minutes.toString().padStart(2, '0');
      secondEl.textContent = seconds.toString().padStart(2, '0');

      const hourFraction = (hours % 12) / 12 + minutes / (12 * 60);
      const minuteFraction = minutes / 60 + seconds / 3600;
      const secondFraction = seconds / 60;

      formatArc(orbitHours, hourFraction);
      formatArc(orbitMinutes, minuteFraction);
      formatArc(orbitSeconds, secondFraction);

      setPlanetPosition(planetHours, 120, hourFraction * Math.PI * 2 - Math.PI / 2);
      setPlanetPosition(planetMinutes, 95, minuteFraction * Math.PI * 2 - Math.PI / 2);
      setPlanetPosition(planetSeconds, 70, secondFraction * Math.PI * 2 - Math.PI / 2);

      const nearing = ms < 60_000;
      document.body.style.setProperty('--glow', nearing ? '#d9f6ff' : '#9de8ff');
      musicManager.setIntensity(nearing ? 1.4 : 1);

      if (ms <= 0 && !midnightTriggered) {
        midnightTriggered = true;
        triggerPortal();
      }
    }

    setInterval(updateTimer, 1000);
    updateTimer();

    function triggerPortal() {
      portal.classList.add('active');
      for (let i = 0; i < 70; i++) {
        const star = document.createElement('div');
        star.className = 'burst-star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        portal.appendChild(star);
        setTimeout(() => star.remove(), 2000);
      }
      updateShareLink();
      musicManager.celebrate();
      setTimeout(() => portal.classList.remove('active'), 3200);
    }

    const musicManager = (() => {
      let ctx = null;
      let master, pad, padGain, bellGain, bellInterval;
      const padVoices = [];

      function ensureContext() {
        if (!ctx) {
          ctx = new (window.AudioContext || window.webkitAudioContext)();
          master = ctx.createGain();
          master.gain.value = 0.16;
          master.connect(ctx.destination);

          padGain = ctx.createGain();
          padGain.gain.value = 0.12;
          padGain.connect(master);

          bellGain = ctx.createGain();
          bellGain.gain.value = 0.0;
          bellGain.connect(master);

          createPad();
        }
      }

      function createPad() {
        for (let i = 0; i < 3; i++) {
          const osc = ctx.createOscillator();
          osc.type = 'sawtooth';
          osc.frequency.value = 80 + i * 11;
          const lfo = ctx.createOscillator();
          lfo.frequency.value = 0.08 + i * 0.03;
          const lfoGain = ctx.createGain();
          lfoGain.gain.value = 12;
          lfo.connect(lfoGain).connect(osc.frequency);
          const filt = ctx.createBiquadFilter();
          filt.type = 'lowpass';
          filt.frequency.value = 1800 + i * 250;
          const gain = ctx.createGain();
          gain.gain.value = 0.035 + i * 0.01;
          osc.connect(filt).connect(gain).connect(padGain);
          osc.start();
          lfo.start();
          padVoices.push({ osc, filt, gain });
        }
      }

      function playBell(chord = false) {
        const bell = ctx.createOscillator();
        bell.type = 'triangle';
        bell.frequency.value = chord ? 880 : 660;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.22, ctx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.6);
        bell.connect(gain).connect(bellGain);
        bell.start();
        bell.stop(ctx.currentTime + 1.7);
      }

      function startBells() {
        if (bellInterval) return;
        bellInterval = setInterval(() => {
          playBell(false);
        }, 6400);
      }

      function stop() {
        if (bellInterval) clearInterval(bellInterval);
        bellInterval = null;
        master && master.gain.setValueAtTime(0, ctx.currentTime + 0.2);
      }

      return {
        start() {
          ensureContext();
          ctx.resume();
          master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
          startBells();
          musicToggle.textContent = '⏸ Pause cosmic score';
        },
        pause() {
          ctx && ctx.suspend();
          musicToggle.textContent = '▶︎ Play cosmic score';
        },
        setIntensity(mult) {
          if (!ctx) return;
          padGain.gain.setTargetAtTime(0.12 * mult, ctx.currentTime, 0.6);
          bellGain.gain.setTargetAtTime(Math.min(0.12, 0.08 * mult), ctx.currentTime, 0.4);
        },
        celebrate() {
          if (!ctx) return;
          bellGain.gain.setValueAtTime(0.18, ctx.currentTime);
          for (let i = 0; i < 4; i++) {
            setTimeout(() => playBell(true), i * 200);
          }
        },
        isRunning() {
          return ctx && ctx.state === 'running';
        },
      };
    })();

    musicToggle.onclick = () => {
      if (musicManager.isRunning()) {
        musicManager.pause();
      } else {
        musicManager.start();
      }
    };

    window.addEventListener('resize', () => {
      resize();
      createStars();
    });

    resize();
    createStars();
    drawStars();
  </script>
</body>
</html>`;

    return new Response(html, {
      headers: {
        'content-type': 'text/html; charset=UTF-8',
      },
    });
  },
};
