import { useEffect, useRef } from 'react';

/*  ─── Watercolor Gingham + Stars Background ─────────────────
    Draws a soft pastel plaid / gingham pattern with scattered
    watercolor-style five-pointed stars.  Everything is pure
    canvas – no images needed.
    ─────────────────────────────────────────────────────────── */

/* colour palette (pastel watercolour feel) */
const STAR_COLORS = [
  'rgba(134,182,222,0.72)',   // soft blue
  'rgba(230,145,120,0.68)',   // coral / salmon
  'rgba(248,206,120,0.72)',   // warm yellow
  'rgba(180,210,140,0.62)',   // olive green
  'rgba(240,175,160,0.65)',   // peach pink
  'rgba(200,175,220,0.55)',   // lavender hint
  'rgba(230,190,130,0.65)',   // sandy gold
];

const GINGHAM_COLS = [
  'rgba(160,200,230,0.18)',   // blue band
  'rgba(200,220,160,0.14)',   // green-yellow band
  'rgba(248,230,170,0.16)',   // warm yellow band
  'rgba(220,195,225,0.12)',   // faint lilac band
];

/* ─── helpers ────────────────────────────────────────────── */

/** seeded-ish deterministic random so the pattern stays stable */
function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Draw a soft 5-pointed star at (cx, cy) */
function drawStar(ctx, cx, cy, outerR, innerR, color, rotation = 0) {
  const spikes = 5;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rotation);

  ctx.beginPath();
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = (Math.PI / spikes) * i - Math.PI / 2;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();

  /* watercolour fill — radial gradient with soft edge */
  const grad = ctx.createRadialGradient(0, 0, innerR * 0.2, 0, 0, outerR * 1.1);
  grad.addColorStop(0, color);
  grad.addColorStop(0.55, color);
  grad.addColorStop(1, color.replace(/[\d.]+\)$/, '0.12)'));
  ctx.fillStyle = grad;
  ctx.filter = 'blur(1.2px)';
  ctx.fill();

  /* very faint stroke for watercolour edge bleed */
  ctx.filter = 'blur(0.5px)';
  ctx.strokeStyle = color.replace(/[\d.]+\)$/, '0.18)');
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.restore();
}

/** Paint the full canvas tile */
function paint(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.width / dpr;
  const h = canvas.height / dpr;
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);

  /* ── 1. Creamy base ──────────────────────────────────────── */
  ctx.fillStyle = '#F7F4EE';
  ctx.fillRect(0, 0, w, h);

  /* ── 2. Gingham / plaid bands ────────────────────────────── */
  const bandW = 36;
  const gap = bandW;

  /* horizontal bands */
  for (let y = 0; y < h; y += bandW + gap) {
    const ci = Math.floor(y / (bandW + gap)) % GINGHAM_COLS.length;
    ctx.fillStyle = GINGHAM_COLS[ci];
    ctx.fillRect(0, y, w, bandW);
  }

  /* vertical bands */
  for (let x = 0; x < w; x += bandW + gap) {
    const ci = Math.floor(x / (bandW + gap)) % GINGHAM_COLS.length;
    ctx.fillStyle = GINGHAM_COLS[ci];
    ctx.fillRect(x, 0, bandW, h);
  }

  /* intersections get a slightly stronger tint */
  ctx.globalCompositeOperation = 'multiply';
  for (let y = 0; y < h; y += bandW + gap) {
    for (let x = 0; x < w; x += bandW + gap) {
      const ci = (Math.floor(x / (bandW + gap)) + Math.floor(y / (bandW + gap))) % GINGHAM_COLS.length;
      ctx.fillStyle = GINGHAM_COLS[ci].replace(/[\d.]+\)$/, '0.10)');
      ctx.fillRect(x, y, bandW, bandW);
    }
  }
  ctx.globalCompositeOperation = 'source-over';

  /* ── 3. Subtle paper-grain noise overlay ─────────────────── */
  const rng = mulberry32(42);
  ctx.globalCompositeOperation = 'overlay';
  for (let i = 0; i < 18000; i++) {
    const nx = rng() * w;
    const ny = rng() * h;
    const a = rng() * 0.04;
    ctx.fillStyle = `rgba(140,130,115,${a})`;
    ctx.fillRect(nx, ny, 1.2, 1.2);
  }
  ctx.globalCompositeOperation = 'source-over';
}

/* ─── Component ──────────────────────────────────────────── */
export default function WatercolorBg() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      /* use the full scrollable height of the document */
      const w = document.documentElement.scrollWidth;
      const h = document.documentElement.scrollHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      paint(canvas);
    };

    resize();

    /* repaint on resize / orientation change */
    window.addEventListener('resize', resize);

    /* observe body size changes (e.g. modals, accordions) */
    const ro = new ResizeObserver(resize);
    ro.observe(document.body);

    return () => {
      window.removeEventListener('resize', resize);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
}
