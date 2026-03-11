// =============================================
// BRAWL ARENA — Complete Mobile Game Engine
// =============================================

(function() {
'use strict';

// ─── CONSTANTS ───
const MAP_W = 2400;
const MAP_H = 1800;
const TILE = 60;
const COLS = MAP_W / TILE;
const ROWS = MAP_H / TILE;
const AMMO_RELOAD_MS = 1200;
const SUPER_COST = 100;
const SHOWDOWN_PLAYERS = 10;

// ─── CHARACTER DEFINITIONS ───
const CHARACTERS = {
  blaze: {
    name: 'BLAZE', color: '#ff6b6b', accent: '#ff3333', skin: '#ffcc99',
    role: 'Fire Warrior', icon: '🔥',
    hp: 4800, speed: 3.2, damage: 420, range: 7, reload: 0.4,
    projSpeed: 9, projCount: 3, spread: 0.25,
    superDmg: 800, superRange: 4,
    desc: 'Launches triple fireballs that scorch enemies',
    attack: 'HP', defense: 'MED', utility: 'LOW'
  },
  volt: {
    name: 'VOLT', color: '#ffd700', accent: '#ffaa00', skin: '#e8d5b7',
    role: 'Electric Mage', icon: '⚡',
    hp: 3800, speed: 3.6, damage: 520, range: 8, reload: 0.6,
    projSpeed: 12, projCount: 1, spread: 0,
    superDmg: 600, superRange: 5,
    desc: 'Fast lightning bolts that chain between enemies',
    attack: 'HP', defense: 'LOW', utility: 'HP'
  },
  thorn: {
    name: 'THORN', color: '#2ecc71', accent: '#27ae60', skin: '#a0d468',
    role: 'Nature Guardian', icon: '🌿',
    hp: 5600, speed: 2.8, damage: 360, range: 6, reload: 0.5,
    projSpeed: 7, projCount: 1, spread: 0,
    superDmg: 300, superRange: 6,
    desc: 'Throws seed bombs that explode on impact',
    attack: 'MED', defense: 'HP', utility: 'MED'
  },
  frost: {
    name: 'FROST', color: '#74b9ff', accent: '#0984e3', skin: '#dfe6e9',
    role: 'Ice Archer', icon: '🧊',
    hp: 3400, speed: 3.4, damage: 480, range: 10, reload: 0.7,
    projSpeed: 11, projCount: 1, spread: 0,
    superDmg: 200, superRange: 5,
    desc: 'Long-range ice arrows that slow enemies',
    attack: 'HP', defense: 'LOW', utility: 'HP'
  },
  shadow: {
    name: 'SHADOW', color: '#a29bfe', accent: '#6c5ce7', skin: '#c8b6ff',
    role: 'Stealth Assassin', icon: '🗡️',
    hp: 3000, speed: 4.2, damage: 600, range: 4, reload: 0.3,
    projSpeed: 10, projCount: 2, spread: 0.12,
    superDmg: 0, superRange: 0,
    desc: 'Rapid dual daggers — super grants invisibility',
    attack: 'HP', defense: 'LOW', utility: 'HP'
  },
  titan: {
    name: 'TITAN', color: '#e17055', accent: '#d63031', skin: '#fab1a0',
    role: 'Heavy Tank', icon: '🔨',
    hp: 7200, speed: 2.4, damage: 700, range: 3, reload: 0.6,
    projSpeed: 0, projCount: 0, spread: 0,
    superDmg: 1200, superRange: 4,
    desc: 'Devastating melee hammer — super slams the ground',
    attack: 'HP', defense: 'HP', utility: 'LOW'
  }
};

const GAME_MODES = [
  { id: 'showdown', name: 'SHOWDOWN', icon: '🌍', desc: '10-player Battle Royale — Last brawler standing wins!', color: '#e17055' },
  { id: 'gemgrab', name: 'GEM GRAB', icon: '💎', desc: '3v3 — Collect 10 gems from the mine to win!', color: '#a29bfe' }
];

// ─── UTILITY ───
function dist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }
function lerp(a, b, t) { return a + (b - a) * t; }
function rand(min, max) { return Math.random() * (max - min) + min; }
function randInt(min, max) { return Math.floor(rand(min, max + 1)); }
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function angleToward(from, to) { return Math.atan2(to.y - from.y, to.x - from.x); }

// ─── PROCEDURAL SOUND ───
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;
function ensureAudio() { if (!audioCtx) audioCtx = new AudioCtx(); }
function playSound(type) {
  try {
    ensureAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    const now = audioCtx.currentTime;
    if (type === 'shoot') {
      osc.type = 'sawtooth'; osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.1);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.start(now); osc.stop(now + 0.1);
    } else if (type === 'hit') {
      osc.type = 'square'; osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.08);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now); osc.stop(now + 0.08);
    } else if (type === 'kill') {
      osc.type = 'sawtooth'; osc.frequency.setValueAtTime(500, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.3);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now); osc.stop(now + 0.3);
    } else if (type === 'super') {
      osc.type = 'sine'; osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.2);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now); osc.stop(now + 0.3);
    }
  } catch(e) {}
}

// ─── CHARACTER RENDERER ───
function drawCharacter(ctx, x, y, char, angle, scale, flash, teamColor, invisible) {
  const s = scale || 1;
  const sz = TILE * 0.7 * s;
  const c = CHARACTERS[char];
  ctx.save();
  ctx.translate(x, y);
  if (invisible) ctx.globalAlpha = 0.25;

  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.beginPath();
  ctx.ellipse(0, sz * 0.45, sz * 0.4, sz * 0.15, 0, 0, Math.PI * 2);
  ctx.fill();

  // Legs (animated based on velocity-ish via angle changes)
  const legOff = Math.sin(Date.now() * 0.008) * 4 * s;
  ctx.fillStyle = '#333';
  ctx.beginPath();
  ctx.ellipse(-sz * 0.15, sz * 0.3 + legOff, sz * 0.12, sz * 0.18, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(sz * 0.15, sz * 0.3 - legOff, sz * 0.12, sz * 0.18, 0, 0, Math.PI * 2);
  ctx.fill();

  // Body
  const bodyColor = flash > 0 ? '#fff' : c.color;
  ctx.fillStyle = bodyColor;
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2 * s;
  ctx.beginPath();
  ctx.ellipse(0, 0, sz * 0.35, sz * 0.38, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Body detail / armor line
  ctx.strokeStyle = c.accent;
  ctx.lineWidth = 2 * s;
  ctx.beginPath();
  ctx.moveTo(-sz * 0.25, -sz * 0.05);
  ctx.quadraticCurveTo(0, sz * 0.15, sz * 0.25, -sz * 0.05);
  ctx.stroke();

  // Weapon arm in direction of angle
  ctx.save();
  ctx.rotate(angle);
  // Arm
  ctx.fillStyle = c.skin;
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 1.5 * s;
  ctx.beginPath();
  ctx.ellipse(sz * 0.45, 0, sz * 0.12, sz * 0.1, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Weapon
  if (char === 'titan') {
    // Hammer
    ctx.fillStyle = '#888';
    ctx.fillRect(sz * 0.35, -sz * 0.04, sz * 0.35, sz * 0.08);
    ctx.fillStyle = '#666';
    ctx.fillRect(sz * 0.6, -sz * 0.14, sz * 0.18, sz * 0.28);
    ctx.strokeStyle = '#000';
    ctx.strokeRect(sz * 0.6, -sz * 0.14, sz * 0.18, sz * 0.28);
  } else if (char === 'shadow') {
    // Daggers
    ctx.fillStyle = '#c0c0c0';
    ctx.beginPath();
    ctx.moveTo(sz * 0.5, -sz * 0.06);
    ctx.lineTo(sz * 0.75, 0);
    ctx.lineTo(sz * 0.5, sz * 0.06);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  } else if (char === 'frost') {
    // Bow
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 2.5 * s;
    ctx.beginPath();
    ctx.arc(sz * 0.45, 0, sz * 0.22, -0.8, 0.8);
    ctx.stroke();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1 * s;
    ctx.beginPath();
    ctx.moveTo(sz * 0.45 + Math.cos(-0.8) * sz * 0.22, Math.sin(-0.8) * sz * 0.22);
    ctx.lineTo(sz * 0.45 + Math.cos(0.8) * sz * 0.22, Math.sin(0.8) * sz * 0.22);
    ctx.stroke();
  } else {
    // Gun / staff
    ctx.fillStyle = '#555';
    ctx.fillRect(sz * 0.35, -sz * 0.05, sz * 0.3, sz * 0.1);
    ctx.fillStyle = c.accent;
    ctx.fillRect(sz * 0.55, -sz * 0.07, sz * 0.12, sz * 0.14);
  }
  ctx.restore();

  // Head
  const headColor = flash > 0 ? '#fff' : c.skin;
  ctx.fillStyle = headColor;
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2 * s;
  ctx.beginPath();
  ctx.arc(0, -sz * 0.32, sz * 0.24, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Eyes
  const eyeDir = angle;
  const eyeX = Math.cos(eyeDir) * sz * 0.06;
  const eyeY = Math.sin(eyeDir) * sz * 0.04;
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.ellipse(-sz * 0.09 + eyeX, -sz * 0.34 + eyeY, sz * 0.08, sz * 0.09, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(sz * 0.09 + eyeX, -sz * 0.34 + eyeY, sz * 0.08, sz * 0.09, 0, 0, Math.PI * 2);
  ctx.fill();
  // Pupils
  ctx.fillStyle = '#111';
  const pupOff = sz * 0.03;
  ctx.beginPath();
  ctx.arc(-sz * 0.09 + eyeX + Math.cos(eyeDir) * pupOff, -sz * 0.34 + eyeY + Math.sin(eyeDir) * pupOff, sz * 0.04, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(sz * 0.09 + eyeX + Math.cos(eyeDir) * pupOff, -sz * 0.34 + eyeY + Math.sin(eyeDir) * pupOff, sz * 0.04, 0, Math.PI * 2);
  ctx.fill();

  // Character-specific head detail
  if (char === 'blaze') {
    // Flame hair
    ctx.fillStyle = '#ff3300';
    for (let i = -2; i <= 2; i++) {
      const fx = i * sz * 0.07;
      const fh = sz * (0.15 + Math.sin(Date.now() * 0.01 + i) * 0.06);
      ctx.beginPath();
      ctx.moveTo(fx - sz * 0.05, -sz * 0.52);
      ctx.lineTo(fx, -sz * 0.52 - fh);
      ctx.lineTo(fx + sz * 0.05, -sz * 0.52);
      ctx.fill();
    }
  } else if (char === 'volt') {
    // Lightning crown
    ctx.fillStyle = '#ffd700';
    ctx.beginPath();
    ctx.moveTo(-sz * 0.18, -sz * 0.52);
    ctx.lineTo(-sz * 0.1, -sz * 0.68);
    ctx.lineTo(0, -sz * 0.55);
    ctx.lineTo(sz * 0.1, -sz * 0.7);
    ctx.lineTo(sz * 0.18, -sz * 0.52);
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.stroke();
  } else if (char === 'thorn') {
    // Leaf on head
    ctx.fillStyle = '#27ae60';
    ctx.beginPath();
    ctx.ellipse(0, -sz * 0.56, sz * 0.14, sz * 0.08, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#219653';
    ctx.beginPath();
    ctx.ellipse(sz * 0.06, -sz * 0.6, sz * 0.1, sz * 0.06, 0.4, 0, Math.PI * 2);
    ctx.fill();
  } else if (char === 'frost') {
    // Ice crystal headband
    ctx.fillStyle = '#00d2ff';
    ctx.beginPath();
    ctx.moveTo(-sz * 0.14, -sz * 0.52);
    ctx.lineTo(0, -sz * 0.64);
    ctx.lineTo(sz * 0.14, -sz * 0.52);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    ctx.stroke();
  } else if (char === 'shadow') {
    // Hood
    ctx.fillStyle = '#2d1b69';
    ctx.beginPath();
    ctx.arc(0, -sz * 0.32, sz * 0.28, Math.PI, 0);
    ctx.fill();
    ctx.fillStyle = '#1a0f40';
    ctx.beginPath();
    ctx.arc(0, -sz * 0.32, sz * 0.26, Math.PI + 0.2, -0.2);
    ctx.fill();
  } else if (char === 'titan') {
    // Helmet
    ctx.fillStyle = '#888';
    ctx.beginPath();
    ctx.arc(0, -sz * 0.32, sz * 0.27, Math.PI, 0);
    ctx.fill();
    ctx.fillStyle = '#666';
    ctx.fillRect(-sz * 0.04, -sz * 0.6, sz * 0.08, sz * 0.15);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  // Mouth
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 1.5 * s;
  ctx.beginPath();
  ctx.arc(0, -sz * 0.26, sz * 0.06, 0.1, Math.PI - 0.1);
  ctx.stroke();

  // Team indicator ring
  if (teamColor) {
    ctx.strokeStyle = teamColor;
    ctx.lineWidth = 3 * s;
    ctx.beginPath();
    ctx.arc(0, 0, sz * 0.5, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.restore();
}

// ─── DRAW HELPERS ───
function drawBush(ctx, x, y) {
  ctx.fillStyle = '#2d7d2d';
  ctx.beginPath();
  ctx.arc(x + TILE * 0.5, y + TILE * 0.55, TILE * 0.45, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#35a535';
  ctx.beginPath();
  ctx.arc(x + TILE * 0.35, y + TILE * 0.4, TILE * 0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x + TILE * 0.65, y + TILE * 0.4, TILE * 0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x + TILE * 0.5, y + TILE * 0.3, TILE * 0.28, 0, Math.PI * 2);
  ctx.fill();
}

function drawWall(ctx, x, y) {
  ctx.fillStyle = '#8B7355';
  ctx.fillRect(x + 1, y + 1, TILE - 2, TILE - 2);
  ctx.fillStyle = '#A08060';
  ctx.fillRect(x + 3, y + 3, TILE - 6, TILE - 6);
  // Brick pattern
  ctx.strokeStyle = '#70604a';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x + TILE * 0.5, y + 3);
  ctx.lineTo(x + TILE * 0.5, y + TILE * 0.33);
  ctx.moveTo(x + 3, y + TILE * 0.33);
  ctx.lineTo(x + TILE - 3, y + TILE * 0.33);
  ctx.moveTo(x + TILE * 0.25, y + TILE * 0.33);
  ctx.lineTo(x + TILE * 0.25, y + TILE * 0.66);
  ctx.moveTo(x + TILE * 0.75, y + TILE * 0.33);
  ctx.lineTo(x + TILE * 0.75, y + TILE * 0.66);
  ctx.moveTo(x + 3, y + TILE * 0.66);
  ctx.lineTo(x + TILE - 3, y + TILE * 0.66);
  ctx.moveTo(x + TILE * 0.5, y + TILE * 0.66);
  ctx.lineTo(x + TILE * 0.5, y + TILE - 3);
  ctx.stroke();
}

function drawCrate(ctx, x, y, hp, maxHp) {
  const pct = hp / maxHp;
  ctx.fillStyle = '#d4a24e';
  ctx.fillRect(x + 2, y + 2, TILE - 4, TILE - 4);
  ctx.fillStyle = '#c4922e';
  ctx.fillRect(x + 5, y + 5, TILE - 10, TILE - 10);
  // Cross pattern
  ctx.fillStyle = '#a87828';
  ctx.fillRect(x + TILE * 0.45, y + 5, TILE * 0.1, TILE - 10);
  ctx.fillRect(x + 5, y + TILE * 0.45, TILE - 10, TILE * 0.1);
  // Damage cracks
  if (pct < 0.6) {
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x + TILE * 0.3, y + TILE * 0.2);
    ctx.lineTo(x + TILE * 0.5, y + TILE * 0.5);
    ctx.lineTo(x + TILE * 0.7, y + TILE * 0.35);
    ctx.stroke();
  }
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.strokeRect(x + 2, y + 2, TILE - 4, TILE - 4);
}

function drawFence(ctx, x, y) {
  ctx.fillStyle = '#c8b89a';
  for (let i = 0; i < 3; i++) {
    const px = x + 8 + i * (TILE - 16) / 2;
    ctx.fillRect(px, y + 8, 6, TILE - 16);
  }
  ctx.fillStyle = '#b0a080';
  ctx.fillRect(x + 4, y + TILE * 0.3, TILE - 8, 5);
  ctx.fillRect(x + 4, y + TILE * 0.6, TILE - 8, 5);
}

function drawGem(ctx, x, y, bounce) {
  const by = Math.sin(Date.now() * 0.004 + bounce) * 4;
  ctx.save();
  ctx.translate(x, y + by);
  // Gem shape
  ctx.fillStyle = '#a855f7';
  ctx.beginPath();
  ctx.moveTo(0, -10);
  ctx.lineTo(8, -2);
  ctx.lineTo(5, 10);
  ctx.lineTo(-5, 10);
  ctx.lineTo(-8, -2);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#7c3aed';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  // Shine
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.beginPath();
  ctx.moveTo(-2, -8);
  ctx.lineTo(3, -2);
  ctx.lineTo(0, 2);
  ctx.lineTo(-5, -3);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawPowerUp(ctx, x, y) {
  const by = Math.sin(Date.now() * 0.003) * 3;
  ctx.save();
  ctx.translate(x, y + by);
  // Glow
  const grd = ctx.createRadialGradient(0, 0, 2, 0, 0, 16);
  grd.addColorStop(0, 'rgba(255,215,0,0.5)');
  grd.addColorStop(1, 'rgba(255,215,0,0)');
  ctx.fillStyle = grd;
  ctx.fillRect(-16, -16, 32, 32);
  // Arrow up icon
  ctx.fillStyle = '#ffd700';
  ctx.beginPath();
  ctx.moveTo(0, -10);
  ctx.lineTo(7, 0);
  ctx.lineTo(3, 0);
  ctx.lineTo(3, 8);
  ctx.lineTo(-3, 8);
  ctx.lineTo(-3, 0);
  ctx.lineTo(-7, 0);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#b8860b';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.restore();
}

// ─── MAP GENERATION ───
// 0=grass, 1=wall, 2=bush, 3=crate, 4=fence, 5=water
function generateShowdownMap() {
  const grid = Array.from({length: ROWS}, () => Array(COLS).fill(0));
  // Border walls
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
    if (r === 0 || r === ROWS - 1 || c === 0 || c === COLS - 1) grid[r][c] = 1;
  }
  // Random walls
  for (let i = 0; i < 40; i++) {
    const r = randInt(2, ROWS - 3);
    const c = randInt(2, COLS - 3);
    const len = randInt(2, 5);
    const horiz = Math.random() > 0.5;
    for (let j = 0; j < len; j++) {
      const rr = horiz ? r : r + j;
      const cc = horiz ? c + j : c;
      if (rr > 0 && rr < ROWS - 1 && cc > 0 && cc < COLS - 1) grid[rr][cc] = 1;
    }
  }
  // Bushes
  for (let i = 0; i < 50; i++) {
    const r = randInt(2, ROWS - 3);
    const c = randInt(2, COLS - 3);
    if (grid[r][c] === 0) grid[r][c] = 2;
    // Cluster
    for (let d = 0; d < 3; d++) {
      const dr = r + randInt(-1, 1);
      const dc = c + randInt(-1, 1);
      if (dr > 0 && dr < ROWS - 1 && dc > 0 && dc < COLS - 1 && grid[dr][dc] === 0) grid[dr][dc] = 2;
    }
  }
  // Crates
  for (let i = 0; i < 30; i++) {
    const r = randInt(3, ROWS - 4);
    const c = randInt(3, COLS - 4);
    if (grid[r][c] === 0) grid[r][c] = 3;
  }
  // Fences
  for (let i = 0; i < 15; i++) {
    const r = randInt(2, ROWS - 3);
    const c = randInt(2, COLS - 3);
    if (grid[r][c] === 0) grid[r][c] = 4;
  }
  return grid;
}

function generateGemGrabMap() {
  const grid = Array.from({length: ROWS}, () => Array(COLS).fill(0));
  // Borders
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
    if (r === 0 || r === ROWS - 1 || c === 0 || c === COLS - 1) grid[r][c] = 1;
  }
  // Center lane walls
  const midC = Math.floor(COLS / 2);
  const midR = Math.floor(ROWS / 2);
  for (let r = 3; r < ROWS - 3; r++) {
    if (Math.abs(r - midR) > 2) {
      grid[r][midC - 3] = 1;
      grid[r][midC + 3] = 1;
    }
  }
  // Bushes near center
  for (let r = midR - 3; r <= midR + 3; r++) {
    for (let c = midC - 2; c <= midC + 2; c++) {
      if (grid[r][c] === 0 && Math.random() > 0.5) grid[r][c] = 2;
    }
  }
  // Symmetrical walls
  for (let i = 0; i < 15; i++) {
    const r = randInt(3, ROWS - 4);
    const c = randInt(2, midC - 2);
    if (grid[r][c] === 0) {
      grid[r][c] = 1;
      grid[r][COLS - 1 - c] = 1;
    }
  }
  // Crates
  for (let i = 0; i < 12; i++) {
    const r = randInt(3, ROWS - 4);
    const c = randInt(2, COLS - 3);
    if (grid[r][c] === 0) grid[r][c] = 3;
  }
  return grid;
}

// ─── MAIN GAME CLASS ───
class BrawlArena {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.minimapCanvas = document.getElementById('minimapCanvas');
    this.minimapCtx = this.minimapCanvas.getContext('2d');

    this.state = 'menu'; // menu, charSelect, modeSelect, playing, gameOver
    this.selectedChar = 'blaze';
    this.selectedMode = 'showdown';

    // Game objects
    this.grid = [];
    this.players = [];
    this.projectiles = [];
    this.particles = [];
    this.gems = [];
    this.powerUps = [];
    this.killFeed = [];
    this.damageNumbers = [];

    // Camera
    this.camX = 0;
    this.camY = 0;

    // Game state
    this.gameTime = 0;
    this.poisonRadius = 1200;
    this.poisonShrinkStart = 30;
    this.gemScores = { team1: 0, team2: 0 };
    this.nextGemSpawn = 0;
    this.shakeAmount = 0;

    // Controls
    this.keys = {};
    this.mouseX = 0;
    this.mouseY = 0;
    this.mouseDown = false;
    this.leftJoy = { active: false, id: null, sx: 0, sy: 0, cx: 0, cy: 0, dx: 0, dy: 0 };
    this.rightJoy = { active: false, id: null, sx: 0, sy: 0, cx: 0, cy: 0, dx: 0, dy: 0, firing: false };

    this.lastTime = 0;
    this.dt = 0;

    this.buildUI();
    this.bindEvents();
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.animateMenu();
    requestAnimationFrame((t) => this.loop(t));
  }

  // ─── UI BUILDING ───
  buildUI() {
    // Character cards
    const charGrid = document.getElementById('charGrid');
    charGrid.innerHTML = '';
    for (const [key, c] of Object.entries(CHARACTERS)) {
      const card = document.createElement('div');
      card.className = 'char-card' + (key === this.selectedChar ? ' selected' : '');
      card.dataset.char = key;

      const cvs = document.createElement('canvas');
      cvs.width = 60; cvs.height = 70;
      const cctx = cvs.getContext('2d');
      drawCharacter(cctx, 30, 42, key, 0, 0.7, 0, null, false);

      const nameDiv = document.createElement('div');
      nameDiv.className = 'char-name';
      nameDiv.textContent = c.icon + ' ' + c.name;

      const roleDiv = document.createElement('div');
      roleDiv.className = 'char-role';
      roleDiv.textContent = c.role;

      card.appendChild(cvs);
      card.appendChild(nameDiv);
      card.appendChild(roleDiv);

      card.addEventListener('click', () => {
        charGrid.querySelectorAll('.char-card').forEach(el => el.classList.remove('selected'));
        card.classList.add('selected');
        this.selectedChar = key;
        this.updateCharInfo(key);
      });

      charGrid.appendChild(card);
    }
    this.updateCharInfo(this.selectedChar);

    // Mode cards
    const modeGrid = document.getElementById('modeGrid');
    modeGrid.innerHTML = '';
    for (const m of GAME_MODES) {
      const card = document.createElement('div');
      card.className = 'mode-card';
      card.innerHTML = `<div class="mode-icon">${m.icon}</div><div class="mode-name">${m.name}</div><div class="mode-desc">${m.desc}</div>`;
      card.style.borderColor = m.color;
      card.addEventListener('click', () => {
        this.selectedMode = m.id;
        this.startGame();
      });
      modeGrid.appendChild(card);
    }
  }

  updateCharInfo(key) {
    const c = CHARACTERS[key];
    const panel = document.getElementById('charInfo');
    const stats = [
      { label: 'Health', val: c.hp / 72, color: '#4ecdc4' },
      { label: 'Speed', val: c.speed / 4.2, color: '#ffd93d' },
      { label: 'Attack', val: c.damage / 700, color: '#ff6b6b' },
      { label: 'Range', val: c.range / 10, color: '#74b9ff' }
    ];
    panel.innerHTML = `
      <div style="font-size:1.1em;color:${c.color};margin-bottom:6px;">${c.icon} ${c.name} — ${c.role}</div>
      <div style="font-size:0.8em;color:#a0a0c0;margin-bottom:8px;">${c.desc}</div>
      ${stats.map(s => `
        <div class="stat-bar">
          <span class="stat-label">${s.label}</span>
          <div class="stat-fill-bg"><div class="stat-fill" style="width:${s.val * 100}%;background:${s.color};"></div></div>
        </div>`).join('')}
    `;
  }

  // ─── SCREEN MANAGEMENT ───
  setScreen(name) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const el = document.getElementById(name);
    if (el) el.classList.add('active');
    this.state = name === 'mainMenu' ? 'menu' :
                 name === 'charSelect' ? 'charSelect' :
                 name === 'modeSelect' ? 'modeSelect' :
                 name === 'gameScreen' ? 'playing' :
                 name === 'gameOver' ? 'gameOver' : 'menu';
  }

  // ─── EVENTS ───
  bindEvents() {
    document.getElementById('playBtn').addEventListener('click', () => this.setScreen('charSelect'));
    document.getElementById('backCharBtn').addEventListener('click', () => this.setScreen('mainMenu'));
    document.getElementById('confirmCharBtn').addEventListener('click', () => this.setScreen('modeSelect'));
    document.getElementById('backModeBtn').addEventListener('click', () => this.setScreen('charSelect'));
    document.getElementById('menuBtn').addEventListener('click', () => { this.setScreen('mainMenu'); this.animateMenu(); });
    document.getElementById('retryBtn').addEventListener('click', () => this.startGame());

    // Keyboard
    window.addEventListener('keydown', (e) => {
      this.keys[e.key.toLowerCase()] = true;
      if (e.key === ' ' && this.state === 'playing') { e.preventDefault(); this.playerUseSuper(); }
    });
    window.addEventListener('keyup', (e) => { this.keys[e.key.toLowerCase()] = false; });

    // Mouse
    this.canvas.addEventListener('mousemove', (e) => {
      const r = this.canvas.getBoundingClientRect();
      this.mouseX = e.clientX - r.left;
      this.mouseY = e.clientY - r.top;
    });
    this.canvas.addEventListener('mousedown', (e) => {
      if (this.state === 'playing') {
        this.mouseDown = true;
        ensureAudio();
      }
    });
    this.canvas.addEventListener('mouseup', () => { this.mouseDown = false; });

    // Touch — dual joysticks
    const joyLeft = document.getElementById('joystickLeft');
    const joyRight = document.getElementById('joystickRight');

    joyLeft.addEventListener('touchstart', (e) => {
      e.preventDefault();
      ensureAudio();
      const t = e.changedTouches[0];
      this.leftJoy.active = true;
      this.leftJoy.id = t.identifier;
      this.leftJoy.sx = t.clientX;
      this.leftJoy.sy = t.clientY;
      this.leftJoy.cx = t.clientX;
      this.leftJoy.cy = t.clientY;
    }, { passive: false });
    joyLeft.addEventListener('touchmove', (e) => {
      e.preventDefault();
      for (const t of e.changedTouches) {
        if (t.identifier === this.leftJoy.id) {
          this.leftJoy.cx = t.clientX;
          this.leftJoy.cy = t.clientY;
          const dx = this.leftJoy.cx - this.leftJoy.sx;
          const dy = this.leftJoy.cy - this.leftJoy.sy;
          const d = Math.min(Math.hypot(dx, dy), 60);
          const a = Math.atan2(dy, dx);
          this.leftJoy.dx = Math.cos(a) * d / 60;
          this.leftJoy.dy = Math.sin(a) * d / 60;
        }
      }
    }, { passive: false });
    joyLeft.addEventListener('touchend', (e) => {
      for (const t of e.changedTouches) {
        if (t.identifier === this.leftJoy.id) {
          this.leftJoy.active = false;
          this.leftJoy.dx = 0;
          this.leftJoy.dy = 0;
        }
      }
    });

    joyRight.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const t = e.changedTouches[0];
      this.rightJoy.active = true;
      this.rightJoy.id = t.identifier;
      this.rightJoy.sx = t.clientX;
      this.rightJoy.sy = t.clientY;
      this.rightJoy.cx = t.clientX;
      this.rightJoy.cy = t.clientY;
      this.rightJoy.firing = true;
    }, { passive: false });
    joyRight.addEventListener('touchmove', (e) => {
      e.preventDefault();
      for (const t of e.changedTouches) {
        if (t.identifier === this.rightJoy.id) {
          this.rightJoy.cx = t.clientX;
          this.rightJoy.cy = t.clientY;
          const dx = this.rightJoy.cx - this.rightJoy.sx;
          const dy = this.rightJoy.cy - this.rightJoy.sy;
          const d = Math.hypot(dx, dy);
          if (d > 10) {
            this.rightJoy.dx = dx / d;
            this.rightJoy.dy = dy / d;
          }
        }
      }
    }, { passive: false });
    joyRight.addEventListener('touchend', (e) => {
      for (const t of e.changedTouches) {
        if (t.identifier === this.rightJoy.id) {
          if (this.rightJoy.firing) this.playerShoot();
          this.rightJoy.active = false;
          this.rightJoy.firing = false;
          this.rightJoy.dx = 0;
          this.rightJoy.dy = 0;
        }
      }
    });
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  // ─── MENU ANIMATION ───
  animateMenu() {
    const canvas = document.getElementById('menuBgCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const stars = Array.from({length: 60}, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      s: Math.random() * 0.3 + 0.1
    }));
    const drawMenu = () => {
      if (this.state !== 'menu') return;
      ctx.fillStyle = '#0d0d1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Stars
      for (const st of stars) {
        st.y += st.s;
        if (st.y > canvas.height) { st.y = 0; st.x = Math.random() * canvas.width; }
        ctx.fillStyle = `rgba(255,255,255,${0.3 + Math.sin(Date.now() * 0.002 + st.x) * 0.2})`;
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fill();
      }
      // Floating characters
      const chars = Object.keys(CHARACTERS);
      for (let i = 0; i < chars.length; i++) {
        const cx = canvas.width * 0.15 + (i % 3) * canvas.width * 0.35;
        const cy = canvas.height * 0.25 + Math.floor(i / 3) * canvas.height * 0.45;
        const by = Math.sin(Date.now() * 0.001 + i * 2) * 10;
        drawCharacter(ctx, cx, cy + by, chars[i], Math.sin(Date.now() * 0.0005 + i), 0.9, 0, null, false);
      }
      requestAnimationFrame(drawMenu);
    };
    drawMenu();
  }

  // ─── START GAME ───
  startGame() {
    this.setScreen('gameScreen');
    this.players = [];
    this.projectiles = [];
    this.particles = [];
    this.gems = [];
    this.powerUps = [];
    this.killFeed = [];
    this.damageNumbers = [];
    this.gameTime = 0;
    this.poisonRadius = 1200;
    this.gemScores = { team1: 0, team2: 0 };
    this.nextGemSpawn = 3;
    this.shakeAmount = 0;

    if (this.selectedMode === 'showdown') {
      this.grid = generateShowdownMap();
      this.setupShowdown();
    } else {
      this.grid = generateGemGrabMap();
      this.setupGemGrab();
    }
    this.buildAmmoHUD();
    this.updateHUD();
  }

  findSpawn(avoid) {
    for (let tries = 0; tries < 200; tries++) {
      const c = randInt(3, COLS - 4);
      const r = randInt(3, ROWS - 4);
      if (this.grid[r][c] !== 0 && this.grid[r][c] !== 2) continue;
      const x = c * TILE + TILE / 2;
      const y = r * TILE + TILE / 2;
      let ok = true;
      for (const a of avoid) { if (dist({x, y}, a) < TILE * 4) { ok = false; break; } }
      if (ok) return { x, y };
    }
    return { x: MAP_W / 2 + rand(-200, 200), y: MAP_H / 2 + rand(-200, 200) };
  }

  setupShowdown() {
    const charKeys = Object.keys(CHARACTERS);
    const spawns = [];

    // Player
    const ps = this.findSpawn(spawns);
    spawns.push(ps);
    this.players.push(this.makePlayer(ps.x, ps.y, this.selectedChar, true, 'none'));

    // AI bots
    for (let i = 1; i < SHOWDOWN_PLAYERS; i++) {
      const sp = this.findSpawn(spawns);
      spawns.push(sp);
      const ch = charKeys[i % charKeys.length];
      this.players.push(this.makePlayer(sp.x, sp.y, ch, false, 'none'));
    }

    // Power-ups near crates
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (this.grid[r][c] === 3 && Math.random() > 0.5) {
          this.powerUps.push({ x: c * TILE + TILE / 2, y: r * TILE + TILE / 2, active: false, crateR: r, crateC: c });
        }
      }
    }
  }

  setupGemGrab() {
    const midX = MAP_W / 2;
    const midY = MAP_H / 2;
    // Team 1 (left)
    this.players.push(this.makePlayer(midX - 400, midY, this.selectedChar, true, 'team1'));
    this.players.push(this.makePlayer(midX - 400, midY - 150, 'volt', false, 'team1'));
    this.players.push(this.makePlayer(midX - 400, midY + 150, 'thorn', false, 'team1'));
    // Team 2 (right)
    this.players.push(this.makePlayer(midX + 400, midY, 'frost', false, 'team2'));
    this.players.push(this.makePlayer(midX + 400, midY - 150, 'shadow', false, 'team2'));
    this.players.push(this.makePlayer(midX + 400, midY + 150, 'titan', false, 'team2'));
  }

  makePlayer(x, y, charType, isPlayer, team) {
    const c = CHARACTERS[charType];
    const names = ['Blazer', 'Sparky', 'Thorny', 'Icy', 'Ninja', 'Rocky', 'Storm', 'Ember', 'Shade', 'Iron'];
    return {
      x, y, vx: 0, vy: 0,
      angle: 0,
      charType,
      team,
      isPlayer,
      hp: c.hp, maxHp: c.hp,
      ammo: 3, maxAmmo: 3,
      reloadTimer: 0,
      superCharge: 0,
      speed: c.speed,
      alive: true,
      kills: 0,
      gems: 0,
      flash: 0,
      invisible: 0,
      invincible: 0,
      powerLevel: 0,
      inBush: false,
      name: isPlayer ? 'YOU' : names[randInt(0, names.length - 1)],
      // AI
      aiTarget: null,
      aiTimer: 0,
      aiWanderAngle: Math.random() * Math.PI * 2,
      aiShootCooldown: 0,
      lastShootTime: 0
    };
  }

  buildAmmoHUD() {
    const el = document.getElementById('hudAmmo');
    el.innerHTML = '';
    for (let i = 0; i < 3; i++) {
      const pip = document.createElement('div');
      pip.className = 'hud-ammo-pip full';
      pip.id = 'ammoPip' + i;
      el.appendChild(pip);
    }
  }

  // ─── PLAYER ACTIONS ───
  playerShoot() {
    const p = this.getPlayer();
    if (!p || !p.alive) return;
    this.fireWeapon(p);
  }

  playerUseSuper() {
    const p = this.getPlayer();
    if (!p || !p.alive || p.superCharge < SUPER_COST) return;
    p.superCharge = 0;
    playSound('super');
    this.activateSuper(p);
  }

  fireWeapon(p) {
    if (p.ammo <= 0) return;
    if (Date.now() - p.lastShootTime < 200) return;
    p.ammo--;
    p.lastShootTime = Date.now();
    const c = CHARACTERS[p.charType];
    playSound('shoot');

    if (c.projCount === 0) {
      // Melee (Titan)
      this.meleeAttack(p);
      return;
    }

    const baseDmg = c.damage + p.powerLevel * 50;
    for (let i = 0; i < c.projCount; i++) {
      const spreadAngle = (i - (c.projCount - 1) / 2) * c.spread;
      const angle = p.angle + spreadAngle;
      this.projectiles.push({
        x: p.x + Math.cos(angle) * 20,
        y: p.y + Math.sin(angle) * 20,
        vx: Math.cos(angle) * c.projSpeed,
        vy: Math.sin(angle) * c.projSpeed,
        owner: p,
        damage: baseDmg,
        charType: p.charType,
        radius: 6,
        life: c.range * TILE / c.projSpeed,
        maxLife: c.range * TILE / c.projSpeed
      });
    }
    // Muzzle particles
    for (let i = 0; i < 5; i++) {
      this.particles.push({
        x: p.x + Math.cos(p.angle) * 22,
        y: p.y + Math.sin(p.angle) * 22,
        vx: Math.cos(p.angle + rand(-0.5, 0.5)) * rand(1, 3),
        vy: Math.sin(p.angle + rand(-0.5, 0.5)) * rand(1, 3),
        life: 15, maxLife: 15,
        color: c.color, size: rand(2, 5)
      });
    }
  }

  meleeAttack(p) {
    const c = CHARACTERS[p.charType];
    const meleeRange = c.range * TILE;
    const baseDmg = c.damage + p.powerLevel * 50;
    // Hit everything in front arc
    for (const other of this.players) {
      if (other === p || !other.alive) continue;
      if (p.team !== 'none' && p.team === other.team) continue;
      const d = dist(p, other);
      if (d > meleeRange) continue;
      const a = angleToward(p, other);
      let diff = Math.abs(a - p.angle);
      if (diff > Math.PI) diff = Math.PI * 2 - diff;
      if (diff < Math.PI / 2) {
        this.damagePlayer(other, baseDmg, p);
      }
    }
    // Swing particles
    for (let i = 0; i < 12; i++) {
      const a = p.angle + rand(-0.6, 0.6);
      const d = rand(20, meleeRange);
      this.particles.push({
        x: p.x + Math.cos(a) * d,
        y: p.y + Math.sin(a) * d,
        vx: Math.cos(a) * 1, vy: Math.sin(a) * 1,
        life: 20, maxLife: 20,
        color: '#e17055', size: rand(3, 7)
      });
    }
    this.shakeAmount = 5;
  }

  activateSuper(p) {
    const c = CHARACTERS[p.charType];
    const range = c.superRange * TILE;

    if (p.charType === 'shadow') {
      // Invisibility
      p.invisible = 180;
      p.speed = c.speed * 1.5;
      setTimeout(() => { if (p.alive) p.speed = c.speed; }, 3000);
      return;
    }

    // AOE damage super
    for (const other of this.players) {
      if (other === p || !other.alive) continue;
      if (p.team !== 'none' && p.team === other.team) continue;
      const d = dist(p, other);
      if (d < range) {
        this.damagePlayer(other, c.superDmg + p.powerLevel * 30, p);
        // Frost super slows
        if (p.charType === 'frost') {
          const origSpeed = CHARACTERS[other.charType].speed;
          other.speed = origSpeed * 0.4;
          setTimeout(() => { if (other.alive) other.speed = origSpeed; }, 2500);
        }
      }
    }

    // Super particles
    for (let i = 0; i < 30; i++) {
      const a = rand(0, Math.PI * 2);
      const d = rand(10, range);
      this.particles.push({
        x: p.x + Math.cos(a) * d * 0.3,
        y: p.y + Math.sin(a) * d * 0.3,
        vx: Math.cos(a) * d / 20,
        vy: Math.sin(a) * d / 20,
        life: 40, maxLife: 40,
        color: c.color, size: rand(4, 10)
      });
    }

    // Thorn super heals allies
    if (p.charType === 'thorn') {
      for (const ally of this.players) {
        if (ally === p || !ally.alive) continue;
        if (ally.team === p.team && p.team !== 'none') {
          ally.hp = Math.min(ally.maxHp, ally.hp + 800);
        }
      }
    }

    this.shakeAmount = 10;
  }

  damagePlayer(target, amount, attacker) {
    if (target.invincible > 0) return;
    target.hp -= amount;
    target.flash = 8;
    target.invincible = 10;

    // Damage number
    this.damageNumbers.push({
      x: target.x + rand(-10, 10),
      y: target.y - 30,
      text: Math.round(amount).toString(),
      life: 40, maxLife: 40,
      color: '#ff6b6b'
    });

    playSound('hit');

    if (attacker) {
      attacker.superCharge = Math.min(SUPER_COST, attacker.superCharge + amount / 10);
    }

    if (target.hp <= 0) {
      target.alive = false;
      if (attacker) attacker.kills++;
      playSound('kill');
      this.shakeAmount = 8;

      // Death particles
      for (let i = 0; i < 20; i++) {
        this.particles.push({
          x: target.x, y: target.y,
          vx: rand(-4, 4), vy: rand(-4, 4),
          life: 30, maxLife: 30,
          color: CHARACTERS[target.charType].color,
          size: rand(3, 8)
        });
      }

      // Drop gems on death in gem grab
      if (this.selectedMode === 'gemgrab' && target.gems > 0) {
        for (let i = 0; i < target.gems; i++) {
          this.gems.push({
            x: target.x + rand(-30, 30),
            y: target.y + rand(-30, 30),
            bounce: Math.random() * 10
          });
        }
        target.gems = 0;
      }

      // Kill feed
      this.addKillFeed(attacker ? attacker.name : '?', target.name);
    }
  }

  addKillFeed(killer, victim) {
    this.killFeed.unshift({ text: `${killer} ✘ ${victim}`, time: 180 });
    if (this.killFeed.length > 5) this.killFeed.pop();
  }

  // ─── COLLISION ───
  isSolid(wx, wy) {
    const c = Math.floor(wx / TILE);
    const r = Math.floor(wy / TILE);
    if (c < 0 || c >= COLS || r < 0 || r >= ROWS) return true;
    const t = this.grid[r][c];
    return t === 1 || t === 3 || t === 4;
  }

  isWalkable(wx, wy) {
    return !this.isSolid(wx, wy);
  }

  moveEntity(ent, dx, dy) {
    const rad = 14;
    let nx = ent.x + dx;
    let ny = ent.y + dy;
    // X
    if (!this.isSolid(nx - rad, ent.y - rad) && !this.isSolid(nx + rad, ent.y - rad) &&
        !this.isSolid(nx - rad, ent.y + rad) && !this.isSolid(nx + rad, ent.y + rad)) {
      ent.x = nx;
    }
    // Y
    if (!this.isSolid(ent.x - rad, ny - rad) && !this.isSolid(ent.x + rad, ny - rad) &&
        !this.isSolid(ent.x - rad, ny + rad) && !this.isSolid(ent.x + rad, ny + rad)) {
      ent.y = ny;
    }
    ent.x = clamp(ent.x, rad, MAP_W - rad);
    ent.y = clamp(ent.y, rad, MAP_H - rad);
  }

  getPlayer() { return this.players.find(p => p.isPlayer); }

  // ─── UPDATE ───
  update(dt) {
    if (this.state !== 'playing') return;
    this.gameTime += dt;

    const player = this.getPlayer();

    // ── Player input ──
    if (player && player.alive) {
      let dx = 0, dy = 0;
      if (this.keys['w'] || this.keys['arrowup']) dy = -1;
      if (this.keys['s'] || this.keys['arrowdown']) dy = 1;
      if (this.keys['a'] || this.keys['arrowleft']) dx = -1;
      if (this.keys['d'] || this.keys['arrowright']) dx = 1;

      // Touch joystick override
      if (this.leftJoy.active) {
        dx = this.leftJoy.dx;
        dy = this.leftJoy.dy;
      }

      const mag = Math.hypot(dx, dy);
      if (mag > 0) {
        dx /= mag; dy /= mag;
        this.moveEntity(player, dx * player.speed, dy * player.speed);
      }

      // Aiming
      if (this.rightJoy.active) {
        if (Math.hypot(this.rightJoy.dx, this.rightJoy.dy) > 0.1) {
          player.angle = Math.atan2(this.rightJoy.dy, this.rightJoy.dx);
        }
      } else {
        // Mouse aim
        const cx = this.canvas.width / 2;
        const cy = this.canvas.height / 2;
        player.angle = Math.atan2(this.mouseY - cy, this.mouseX - cx);
      }

      // Auto-fire with mouse
      if (this.mouseDown) {
        this.playerShoot();
      }
    }

    // ── Update all players ──
    for (const p of this.players) {
      if (!p.alive) continue;

      // Ammo reload
      p.reloadTimer += dt;
      if (p.reloadTimer >= AMMO_RELOAD_MS / 1000 && p.ammo < p.maxAmmo) {
        p.ammo++;
        p.reloadTimer = 0;
      }

      // Flash / invincible countdown
      if (p.flash > 0) p.flash--;
      if (p.invincible > 0) p.invincible--;
      if (p.invisible > 0) p.invisible--;

      // Bush detection
      const col = Math.floor(p.x / TILE);
      const row = Math.floor(p.y / TILE);
      p.inBush = (col >= 0 && col < COLS && row >= 0 && row < ROWS && this.grid[row][col] === 2);

      // AI
      if (!p.isPlayer) this.updateAI(p, dt);

      // Showdown poison
      if (this.selectedMode === 'showdown') {
        const d = dist(p, { x: MAP_W / 2, y: MAP_H / 2 });
        if (d > this.poisonRadius) {
          this.damagePlayer(p, 100 * dt, null);
        }
      }
    }

    // ── Shrink poison ──
    if (this.selectedMode === 'showdown' && this.gameTime > this.poisonShrinkStart) {
      this.poisonRadius = Math.max(TILE * 5, 1200 - (this.gameTime - this.poisonShrinkStart) * 5);
    }

    // ── Update projectiles ──
    this.projectiles = this.projectiles.filter(proj => {
      proj.x += proj.vx;
      proj.y += proj.vy;
      proj.life--;

      // Hit wall
      if (this.isSolid(proj.x, proj.y)) {
        // Destroy crate
        const c = Math.floor(proj.x / TILE);
        const r = Math.floor(proj.y / TILE);
        if (r >= 0 && r < ROWS && c >= 0 && c < COLS && this.grid[r][c] === 3) {
          this.grid[r][c] = 0;
          // Spawn debris particles
          for (let i = 0; i < 8; i++) {
            this.particles.push({
              x: c * TILE + TILE / 2, y: r * TILE + TILE / 2,
              vx: rand(-3, 3), vy: rand(-3, 3),
              life: 20, maxLife: 20,
              color: '#d4a24e', size: rand(3, 6)
            });
          }
          // Reveal power-up
          for (const pu of this.powerUps) {
            if (pu.crateR === r && pu.crateC === c) pu.active = true;
          }
        }
        return false;
      }

      // Hit players
      for (const p of this.players) {
        if (p === proj.owner || !p.alive) continue;
        if (proj.owner.team !== 'none' && proj.owner.team === p.team) continue;
        if (p.invisible > 0) continue;
        if (dist(proj, p) < 22) {
          this.damagePlayer(p, proj.damage, proj.owner);
          // Impact particles
          for (let i = 0; i < 4; i++) {
            this.particles.push({
              x: proj.x, y: proj.y,
              vx: rand(-2, 2), vy: rand(-2, 2),
              life: 12, maxLife: 12,
              color: CHARACTERS[proj.charType].color,
              size: rand(2, 5)
            });
          }
          return false;
        }
      }

      return proj.life > 0;
    });

    // ── Particles ──
    this.particles = this.particles.filter(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.95;
      p.vy *= 0.95;
      p.life--;
      return p.life > 0;
    });

    // ── Damage numbers ──
    this.damageNumbers = this.damageNumbers.filter(d => {
      d.y -= 0.8;
      d.life--;
      return d.life > 0;
    });

    // ── Kill feed ──
    this.killFeed = this.killFeed.filter(k => { k.time--; return k.time > 0; });

    // ── Power-ups ──
    if (player && player.alive) {
      for (const pu of this.powerUps) {
        if (pu.active && dist(player, pu) < 24) {
          player.powerLevel++;
          player.maxHp += 200;
          player.hp = Math.min(player.maxHp, player.hp + 200);
          pu.active = false;
        }
      }
    }

    // ── Gems (Gem Grab) ──
    if (this.selectedMode === 'gemgrab') {
      // Spawn gems
      this.nextGemSpawn -= dt;
      if (this.nextGemSpawn <= 0 && this.gems.length < 20) {
        const midX = MAP_W / 2;
        const midY = MAP_H / 2;
        this.gems.push({ x: midX + rand(-80, 80), y: midY + rand(-80, 80), bounce: Math.random() * 10 });
        this.nextGemSpawn = 3 + rand(0, 2);
      }

      // Collect gems
      for (const p of this.players) {
        if (!p.alive) continue;
        this.gems = this.gems.filter(g => {
          if (dist(p, g) < 26) {
            p.gems++;
            return false;
          }
          return true;
        });
      }

      // Recalc scores
      this.gemScores.team1 = this.players.filter(p => p.team === 'team1').reduce((s, p) => s + p.gems, 0);
      this.gemScores.team2 = this.players.filter(p => p.team === 'team2').reduce((s, p) => s + p.gems, 0);
    }

    // ── Screen shake ──
    this.shakeAmount *= 0.85;

    // ── Win conditions ──
    this.checkWinCondition();

    // ── HUD ──
    this.updateHUD();
  }

  // ─── AI ───
  updateAI(p, dt) {
    p.aiTimer -= dt;
    p.aiShootCooldown -= dt;

    if (p.aiTimer <= 0) {
      p.aiTimer = rand(0.3, 1);

      // Find nearest enemy
      let closest = null;
      let closestDist = Infinity;
      for (const other of this.players) {
        if (other === p || !other.alive) continue;
        if (p.team !== 'none' && p.team === other.team) continue;
        if (other.invisible > 0) continue;
        const d = dist(p, other);
        if (d < closestDist) { closestDist = d; closest = other; }
      }

      p.aiTarget = closest;
      if (!closest) {
        p.aiWanderAngle = rand(0, Math.PI * 2);
      }
    }

    const c = CHARACTERS[p.charType];

    if (p.aiTarget && p.aiTarget.alive) {
      const d = dist(p, p.aiTarget);
      const a = angleToward(p, p.aiTarget);
      p.angle = a;

      // Move toward or away based on range
      const idealRange = c.range * TILE * 0.6;
      let moveAngle = a;
      if (d < idealRange * 0.5) moveAngle = a + Math.PI; // too close, back up
      else if (d > idealRange * 1.3) moveAngle = a; // too far, close in

      // Dodge: slight side strafe
      moveAngle += Math.sin(this.gameTime * 3 + p.x) * 0.3;

      this.moveEntity(p, Math.cos(moveAngle) * p.speed * 0.75, Math.sin(moveAngle) * p.speed * 0.75);

      // Shoot
      if (d < c.range * TILE && p.aiShootCooldown <= 0 && p.ammo > 0) {
        this.fireWeapon(p);
        p.aiShootCooldown = 0.3 + rand(0, 0.4);
      }

      // Use super
      if (p.superCharge >= SUPER_COST && d < c.superRange * TILE * 1.5) {
        p.superCharge = 0;
        this.activateSuper(p);
      }
    } else {
      // Wander
      this.moveEntity(p, Math.cos(p.aiWanderAngle) * p.speed * 0.4, Math.sin(p.aiWanderAngle) * p.speed * 0.4);
    }

    // Gem grab: AI goes for gems
    if (this.selectedMode === 'gemgrab' && this.gems.length > 0) {
      let nearestGem = null;
      let ngDist = Infinity;
      for (const g of this.gems) {
        const d = dist(p, g);
        if (d < ngDist) { ngDist = d; nearestGem = g; }
      }
      if (nearestGem && ngDist < TILE * 6) {
        const a = angleToward(p, nearestGem);
        this.moveEntity(p, Math.cos(a) * p.speed * 0.6, Math.sin(a) * p.speed * 0.6);
      }
    }
  }

  checkWinCondition() {
    if (this.selectedMode === 'showdown') {
      const alive = this.players.filter(p => p.alive);
      if (alive.length <= 1) {
        const winner = alive[0];
        this.endGame(winner && winner.isPlayer);
      }
    } else {
      if (this.gemScores.team1 >= 10 || this.gemScores.team2 >= 10) {
        const player = this.getPlayer();
        const playerTeam = player ? player.team : 'team1';
        const won = (this.gemScores.team1 >= 10 && playerTeam === 'team1') ||
                     (this.gemScores.team2 >= 10 && playerTeam === 'team2');
        this.endGame(won);
      }
      // Time limit
      if (this.gameTime > 150) {
        const player = this.getPlayer();
        const playerTeam = player ? player.team : 'team1';
        const won = (playerTeam === 'team1' && this.gemScores.team1 > this.gemScores.team2) ||
                     (playerTeam === 'team2' && this.gemScores.team2 > this.gemScores.team1);
        this.endGame(won);
      }
    }
  }

  endGame(won) {
    this.state = 'gameOver';
    this.setScreen('gameOver');
    const title = document.getElementById('resultTitle');
    const stats = document.getElementById('resultStats');
    const player = this.getPlayer();

    if (won) {
      title.textContent = '🏆 VICTORY!';
      title.className = 'result-title win';
    } else {
      title.textContent = '💀 DEFEATED';
      title.className = 'result-title lose';
    }

    const killCount = player ? player.kills : 0;
    const timeStr = Math.floor(this.gameTime) + 's';

    if (this.selectedMode === 'showdown') {
      const rank = this.players.filter(p => p.alive || p === player).length;
      stats.innerHTML = `<span>Rank:</span> #${won ? 1 : rank}<br><span>Kills:</span> ${killCount}<br><span>Time:</span> ${timeStr}`;
    } else {
      stats.innerHTML = `<span>Blue:</span> ${this.gemScores.team1} 💎 — <span>Red:</span> ${this.gemScores.team2} 💎<br><span>Kills:</span> ${killCount}<br><span>Time:</span> ${timeStr}`;
    }
  }

  // ─── HUD ───
  updateHUD() {
    const p = this.getPlayer();
    if (!p) return;

    // Timer
    const remaining = this.selectedMode === 'showdown' ? Math.max(0, 180 - this.gameTime) : Math.max(0, 150 - this.gameTime);
    const min = Math.floor(remaining / 60);
    const sec = Math.floor(remaining % 60);
    document.getElementById('hudTimer').textContent = `${min}:${sec.toString().padStart(2, '0')}`;

    // Alive / gems
    if (this.selectedMode === 'showdown') {
      document.getElementById('hudAlive').textContent = `👥 ${this.players.filter(q => q.alive).length}`;
      document.getElementById('hudMode').textContent = 'SHOWDOWN';
    } else {
      document.getElementById('hudAlive').textContent = `💎 ${this.gemScores.team1} — ${this.gemScores.team2}`;
      document.getElementById('hudMode').textContent = 'GEM GRAB';
    }

    // HP
    const hpPct = Math.max(0, p.hp / p.maxHp * 100);
    document.getElementById('hudHpBar').style.width = hpPct + '%';

    // Super
    const superPct = Math.min(100, p.superCharge / SUPER_COST * 100);
    document.getElementById('hudSuperBar').style.width = superPct + '%';

    // Ammo
    for (let i = 0; i < 3; i++) {
      const pip = document.getElementById('ammoPip' + i);
      if (pip) pip.className = 'hud-ammo-pip' + (i < p.ammo ? ' full' : '');
    }

    // Kill feed
    const kfEl = document.getElementById('killFeed');
    kfEl.innerHTML = this.killFeed.map(k => `<div>${k.text}</div>`).join('');
  }

  // ─── RENDER ───
  render() {
    if (this.state !== 'playing') return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const player = this.getPlayer();

    // Camera
    if (player) {
      this.camX = player.x - w / 2;
      this.camY = player.y - h / 2;
    }
    this.camX = clamp(this.camX, 0, MAP_W - w);
    this.camY = clamp(this.camY, 0, MAP_H - h);

    ctx.save();

    // Screen shake
    if (this.shakeAmount > 0.5) {
      ctx.translate(rand(-this.shakeAmount, this.shakeAmount), rand(-this.shakeAmount, this.shakeAmount));
    }

    ctx.translate(-this.camX, -this.camY);

    // ── Ground ──
    ctx.fillStyle = '#4a8c2a';
    ctx.fillRect(0, 0, MAP_W, MAP_H);
    // Grass texture
    ctx.fillStyle = '#52993a';
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if ((r + c) % 2 === 0) {
          ctx.fillRect(c * TILE, r * TILE, TILE, TILE);
        }
      }
    }

    // ── Poison zone (showdown) ──
    if (this.selectedMode === 'showdown') {
      // Draw poison outside the safe circle
      ctx.save();
      ctx.fillStyle = 'rgba(120, 0, 200, 0.35)';
      ctx.beginPath();
      ctx.rect(0, 0, MAP_W, MAP_H);
      ctx.arc(MAP_W / 2, MAP_H / 2, this.poisonRadius, 0, Math.PI * 2, true);
      ctx.fill();
      // Poison edge glow
      ctx.strokeStyle = 'rgba(180, 0, 255, 0.6)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(MAP_W / 2, MAP_H / 2, this.poisonRadius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // Visible tile range
    const startC = Math.max(0, Math.floor(this.camX / TILE) - 1);
    const endC = Math.min(COLS, Math.ceil((this.camX + w) / TILE) + 1);
    const startR = Math.max(0, Math.floor(this.camY / TILE) - 1);
    const endR = Math.min(ROWS, Math.ceil((this.camY + h) / TILE) + 1);

    // ── Draw tiles (walls, fences, crates first) ──
    for (let r = startR; r < endR; r++) {
      for (let c = startC; c < endC; c++) {
        const t = this.grid[r][c];
        const tx = c * TILE;
        const ty = r * TILE;
        if (t === 1) drawWall(ctx, tx, ty);
        else if (t === 3) drawCrate(ctx, tx, ty, 100, 100);
        else if (t === 4) drawFence(ctx, tx, ty);
      }
    }

    // ── Power-ups ──
    for (const pu of this.powerUps) {
      if (pu.active) drawPowerUp(ctx, pu.x, pu.y);
    }

    // ── Gems ──
    for (const g of this.gems) {
      drawGem(ctx, g.x, g.y, g.bounce);
    }

    // ── Projectiles ──
    for (const proj of this.projectiles) {
      const c = CHARACTERS[proj.charType];
      const alpha = clamp(proj.life / proj.maxLife, 0.3, 1);
      ctx.globalAlpha = alpha;

      // Projectile trail
      ctx.fillStyle = c.color;
      ctx.beginPath();
      ctx.arc(proj.x, proj.y, proj.radius, 0, Math.PI * 2);
      ctx.fill();

      // Glow
      ctx.fillStyle = c.accent;
      ctx.beginPath();
      ctx.arc(proj.x, proj.y, proj.radius * 0.5, 0, Math.PI * 2);
      ctx.fill();

      // Trail particles
      ctx.fillStyle = c.color;
      ctx.globalAlpha = alpha * 0.4;
      ctx.beginPath();
      ctx.arc(proj.x - proj.vx * 0.5, proj.y - proj.vy * 0.5, proj.radius * 0.7, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(proj.x - proj.vx, proj.y - proj.vy, proj.radius * 0.4, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = 1;
    }

    // ── Players (sorted by Y for depth) ──
    const sortedPlayers = this.players.filter(p => p.alive).sort((a, b) => a.y - b.y);
    for (const p of sortedPlayers) {
      // Skip players in bush (unless player or same team)
      const isVisible = p.isPlayer || !p.inBush || (player && p.team === player.team && p.team !== 'none');
      if (!isVisible && dist(p, player || {x:0,y:0}) > TILE * 2) continue;

      const teamCol = p.team === 'team1' ? '#4ecdc4' : p.team === 'team2' ? '#ff6b6b' : (p.isPlayer ? '#ffd93d' : null);
      drawCharacter(ctx, p.x, p.y, p.charType, p.angle, 1, p.flash, teamCol, p.invisible > 0 && !p.isPlayer);

      // Health bar above
      const hpPct = p.hp / p.maxHp;
      const barW = 40;
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(p.x - barW / 2 - 1, p.y - 38, barW + 2, 7);
      ctx.fillStyle = hpPct > 0.5 ? '#4ecdc4' : hpPct > 0.25 ? '#ffd93d' : '#ff6b6b';
      ctx.fillRect(p.x - barW / 2, p.y - 37, barW * hpPct, 5);

      // Name
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(p.name, p.x, p.y - 42);

      // Gem count in gem grab
      if (this.selectedMode === 'gemgrab' && p.gems > 0) {
        ctx.fillStyle = '#a855f7';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText('💎' + p.gems, p.x, p.y + 32);
      }
    }

    // ── Bushes on top (so they hide players) ──
    for (let r = startR; r < endR; r++) {
      for (let c = startC; c < endC; c++) {
        if (this.grid[r][c] === 2) {
          // If player is in this bush, make it transparent
          const bx = c * TILE;
          const by = r * TILE;
          if (player && player.inBush && Math.floor(player.x / TILE) === c && Math.floor(player.y / TILE) === r) {
            ctx.globalAlpha = 0.4;
          }
          drawBush(ctx, bx, by);
          ctx.globalAlpha = 1;
        }
      }
    }

    // ── Particles ──
    for (const p of this.particles) {
      ctx.globalAlpha = p.life / p.maxLife;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * (p.life / p.maxLife), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // ── Damage numbers ──
    for (const d of this.damageNumbers) {
      ctx.globalAlpha = d.life / d.maxLife;
      ctx.fillStyle = d.color;
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(d.text, d.x, d.y);
    }
    ctx.globalAlpha = 1;

    // ── Aim line for player ──
    if (player && player.alive) {
      const c = CHARACTERS[player.charType];
      ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 8]);
      ctx.beginPath();
      ctx.moveTo(player.x, player.y);
      ctx.lineTo(player.x + Math.cos(player.angle) * c.range * TILE * 0.7,
                 player.y + Math.sin(player.angle) * c.range * TILE * 0.7);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    ctx.restore();

    // ── Joystick overlays ──
    if (this.leftJoy.active) {
      this.drawJoystick(ctx, this.leftJoy.sx, this.leftJoy.sy, this.leftJoy.cx, this.leftJoy.cy, '#4ecdc4');
    }
    if (this.rightJoy.active) {
      this.drawJoystick(ctx, this.rightJoy.sx, this.rightJoy.sy, this.rightJoy.cx, this.rightJoy.cy, '#ff6b6b');
    }

    // ── Minimap ──
    this.drawMinimap();
  }

  drawJoystick(ctx, sx, sy, cx, cy, color) {
    ctx.save();
    // Base
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(sx, sy, 50, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    // Thumb
    const dx = clamp(cx - sx, -50, 50);
    const dy = clamp(cy - sy, -50, 50);
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.7;
    ctx.beginPath();
    ctx.arc(sx + dx, sy + dy, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  drawMinimap() {
    const mCtx = this.minimapCtx;
    const mw = 100, mh = 75;
    const scaleX = mw / MAP_W;
    const scaleY = mh / MAP_H;

    mCtx.fillStyle = '#1a3a0a';
    mCtx.fillRect(0, 0, mw, mh);

    // Walls
    mCtx.fillStyle = '#5a4a3a';
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (this.grid[r][c] === 1) {
          mCtx.fillRect(c * TILE * scaleX, r * TILE * scaleY, TILE * scaleX + 1, TILE * scaleY + 1);
        }
      }
    }

    // Players
    for (const p of this.players) {
      if (!p.alive) continue;
      const color = p.isPlayer ? '#ffd93d' : (p.team === 'team1' ? '#4ecdc4' : p.team === 'team2' ? '#ff6b6b' : '#ff6b6b');
      mCtx.fillStyle = color;
      mCtx.fillRect(p.x * scaleX - 1.5, p.y * scaleY - 1.5, 3, 3);
    }

    // Poison circle
    if (this.selectedMode === 'showdown') {
      mCtx.strokeStyle = 'rgba(180,0,255,0.6)';
      mCtx.lineWidth = 1;
      mCtx.beginPath();
      mCtx.arc(MAP_W / 2 * scaleX, MAP_H / 2 * scaleY, this.poisonRadius * scaleX, 0, Math.PI * 2);
      mCtx.stroke();
    }

    // Camera viewport
    mCtx.strokeStyle = 'rgba(255,255,255,0.3)';
    mCtx.lineWidth = 0.5;
    mCtx.strokeRect(this.camX * scaleX, this.camY * scaleY, this.canvas.width * scaleX, this.canvas.height * scaleY);
  }

  // ─── GAME LOOP ───
  loop(time) {
    const dt = Math.min(0.05, (time - this.lastTime) / 1000);
    this.lastTime = time;

    this.update(dt);
    this.render();

    requestAnimationFrame((t) => this.loop(t));
  }
}

// ─── BOOT ───
window.addEventListener('DOMContentLoaded', () => {
  new BrawlArena();
});

})();
