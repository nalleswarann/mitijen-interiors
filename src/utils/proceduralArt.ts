/**
 * Procedural SVG architectural vector art generator
 * Recreates the exact procedural artwork from the original FORMA Living implementation
 */

export function hx(h: string): string {
  return h.length === 4 ? '#' + [...h.slice(1)].map(c => c + c).join('') : h;
}

export function mix(h: string, t: number, to = 255): string {
  h = hx(h);
  const n = parseInt(h.slice(1), 16);
  const m = (v: number) => Math.round(v + (to - v) * t);
  return '#' + ((1 << 24) | (m(n >> 16) << 16) | (m((n >> 8) & 255) << 8) | m(n & 255)).toString(16).slice(1);
}

let uid = 0;

export function art(key: string, p: string[]): string {
  const [w, l, f, a] = p.map(hx);
  const id = 'g' + (++uid);
  const h = [...key].reduce((s, c) => s + c.charCodeAt(0) * 7, 13);
  const r = (n: number) => ((h * (n + 3) * 9301 + 49297) % 233280) / 233280;

  const mats: Record<string, number> = { stone: 1, oak: 1, linen: 1, metal: 1, plaster: 1 };
  let s = `<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style="width:100%;height:100%;display:block">`;

  if (mats[key]) {
    s += `<rect width="1200" height="800" fill="${w}"/>`;
    if (key === 'linen') {
      s += `<defs><pattern id="${id}" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M0 4h8M4 0v8" stroke="${a}" stroke-width=".8" opacity=".35"/></pattern></defs><rect width="1200" height="800" fill="url(#${id})"/>`;
    } else if (key === 'plaster') {
      for (let i = 0; i < 60; i++) {
        s += `<ellipse cx="${r(i) * 1200}" cy="${r(i + 60) * 800}" rx="${80 + r(i + 9) * 160}" ry="${40 + r(i + 3) * 90}" fill="${i % 2 ? l : a}" opacity=".16"/>`;
      }
    } else if (key === 'metal') {
      for (let i = 0; i < 140; i++) {
        s += `<path d="M0 ${i * 6}h1200" stroke="${i % 3 ? l : a}" stroke-width="${1 + r(i) * 2}" opacity="${.15 + r(i + 1) * .35}"/>`;
      }
    } else {
      for (let i = 0; i < 46; i++) {
        const y = i * 18 + r(i) * 10;
        s += `<path d="M0 ${y}C300 ${y + r(i + 5) * 24 - 12} 700 ${y - r(i + 7) * 24 + 12} 1200 ${y}" stroke="${i % 4 ? a : l}" stroke-width="${4 + r(i + 2) * 8}" opacity="${.2 + r(i + 1) * .3}" fill="none"/>`;
      }
    }
    return s + '</svg>';
  }

  const wx = 470 + r(1) * 300;
  const sx = 120 + r(2) * 220;
  const cx = 90 + r(3) * 120;

  s += `<defs><linearGradient id="${id}w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix(w, .25)}"/><stop offset="1" stop-color="${w}"/></linearGradient>
<linearGradient id="${id}f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${f}"/><stop offset="1" stop-color="${mix(f, .3, 0)}"/></linearGradient>
<linearGradient id="${id}l" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${l}" stop-opacity=".7"/><stop offset="1" stop-color="${l}" stop-opacity=".1"/></linearGradient></defs>
<rect width="1200" height="800" fill="url(#${id}w)"/><rect y="560" width="1200" height="240" fill="url(#${id}f)"/>
<rect x="${cx}" width="120" height="570" fill="${mix(w, .18)}"/><rect x="${cx + 95}" width="25" height="570" fill="${mix(w, .2, 0)}" opacity=".25"/>
<rect x="${wx}" y="80" width="320" height="490" fill="url(#${id}l)"/><path d="M${wx + 107} 80v490M${wx + 213} 80v490M${wx} 300h320" stroke="${mix(a, .5, 0)}" stroke-width="2"/>
<polygon points="${wx},568 ${wx + 320},568 ${wx + 470},800 ${wx - 170},800" fill="${l}" opacity=".32"/>
<rect x="${cx + 190}" y="150" width="190" height="250" fill="${mix(l, .3)}" stroke="${a}" stroke-width="4" opacity=".9"/><path d="M${cx + 215} 340C${cx + 260} 330 ${cx + 280} 370 ${cx + 350} 330" stroke="${a}" stroke-width="3" fill="none"/>
<path d="M${wx + 400} 0v230" stroke="${a}" stroke-width="3"/><circle cx="${wx + 400}" cy="250" r="34" fill="${mix(l, .2)}"/>
<ellipse cx="${sx + 210}" cy="690" rx="260" ry="26" fill="#000" opacity=".12"/><rect x="${sx}" y="470" width="420" height="120" rx="50" fill="${mix(w, .6)}"/><rect x="${sx + 30}" y="420" width="360" height="90" rx="40" fill="${mix(w, .35)}"/>
<ellipse cx="${sx + 610}" cy="700" rx="140" ry="30" fill="#000" opacity=".12"/><ellipse cx="${sx + 610}" cy="668" rx="140" ry="30" fill="${mix(a, .3)}"/><rect x="${sx + 580}" y="670" width="60" height="40" fill="${mix(a, .4, 0)}"/>
<ellipse cx="1010" cy="690" rx="46" ry="14" fill="${mix(a, .1, 0)}"/><path d="M964 690C968 610 1000 590 1010 600 1020 590 1052 610 1056 690Z" fill="${a}"/>
<path d="M1010 600C960 520 930 480 880 470M1010 600C1040 500 1070 460 1120 440M1010 600C1010 500 1005 440 1015 380" stroke="#6a7557" stroke-width="12" stroke-linecap="round" fill="none"/>
</svg>`;
  return s;
}
