// Generates the concept project thumbnails in assets/img/projects/.
// Run: node tools/generate-thumbnails.js
// Replace any SVG with a real screenshot (PNG/JPG/WebP, 16:10) when you have one.

const fs = require("fs");
const path = require("path");

const out = path.join(__dirname, "..", "assets", "img", "projects");
fs.mkdirSync(out, { recursive: true });

const C = {
  bg: "#14181d",
  panel: "#1b2026",
  line: "rgba(255,255,255,0.12)",
  faint: "rgba(255,255,255,0.06)",
  text: "rgba(255,255,255,0.55)",
  accent: "#f0b25a",
  blue: "#8fb8ff",
  green: "#6fd3a0",
};

const font = "font-family=\"JetBrains Mono, Consolas, monospace\"";

function frame(inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400" width="640" height="400">
  <defs>
    <pattern id="g" width="32" height="32" patternUnits="userSpaceOnUse">
      <path d="M32 0H0V32" fill="none" stroke="${C.faint}" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="640" height="400" fill="${C.bg}"/>
  <rect width="640" height="400" fill="url(#g)"/>
${inner}
</svg>
`;
}

const node = (x, y, w, h, label, color = C.line, labelColor = C.text) => `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${C.panel}" stroke="${color}" stroke-width="1.5"/>
  <text x="${x + w / 2}" y="${y + h / 2 + 5}" text-anchor="middle" ${font} font-size="14" fill="${labelColor}">${label}</text>`;

const link = (d, color = C.line, dash = "") =>
  `  <path d="${d}" fill="none" stroke="${color}" stroke-width="1.5" ${dash ? `stroke-dasharray="${dash}"` : ""}/>`;

const bars = (x, y, widths, color = C.line, gap = 16, h = 6) =>
  widths.map((w, i) => `  <rect x="${x}" y="${y + i * gap}" width="${w}" height="${h}" rx="3" fill="${color}"/>`).join("\n");

const thumbs = {
  "support-agent": frame(`
${node(250, 160, 140, 80, "agent", C.accent, C.accent)}
${node(70, 70, 120, 56, "chat")}
${node(70, 274, 120, 56, "human")}
${node(450, 70, 120, 56, "knowledge")}
${node(450, 274, 120, 56, "orders API")}
${link("M190 98 C230 98 230 175 250 185", C.accent)}
${link("M390 185 C420 175 420 98 450 98")}
${link("M390 215 C420 225 420 302 450 302")}
${link("M250 215 C230 225 230 302 190 302", C.line, "5 5")}
  <circle cx="320" cy="200" r="3" fill="${C.accent}"/>`),

  "document-qa": frame(`
  <rect x="118" y="78" width="200" height="250" rx="12" fill="${C.panel}" stroke="${C.line}" stroke-width="1.5" transform="rotate(-4 218 203)"/>
  <rect x="140" y="70" width="200" height="250" rx="12" fill="${C.panel}" stroke="${C.line}" stroke-width="1.5"/>
${bars(166, 100, [148, 120, 140, 96], C.line)}
  <rect x="160" y="166" width="160" height="38" rx="6" fill="rgba(240,178,90,0.14)"/>
${bars(166, 176, [140, 110], C.accent)}
${bars(166, 228, [148, 124, 136, 80], C.line)}
${link("M340 185 C380 185 380 200 410 200", C.accent)}
  <rect x="410" y="140" width="170" height="120" rx="12" fill="${C.panel}" stroke="${C.accent}" stroke-width="1.5"/>
  <text x="430" y="172" ${font} font-size="13" fill="${C.accent}">answer</text>
${bars(430, 188, [130, 110, 90], C.line)}
  <text x="430" y="246" ${font} font-size="12" fill="${C.text}">[source p.4]</text>`),

  "lead-workflow": frame(`
${node(40, 172, 110, 56, "form")}
${node(190, 172, 110, 56, "enrich")}
${node(340, 172, 110, 56, "LLM score", C.accent, C.accent)}
${node(500, 96, 110, 56, "sales")}
${node(500, 248, 110, 56, "nurture")}
${link("M150 200 H190")}
${link("M300 200 H340", C.accent)}
${link("M450 200 C475 200 475 124 500 124", C.green)}
${link("M450 200 C475 200 475 276 500 276")}
  <circle cx="170" cy="200" r="3" fill="${C.text}"/>
  <circle cx="320" cy="200" r="3" fill="${C.accent}"/>
  <text x="40" y="330" ${font} font-size="13" fill="${C.text}">trigger: new lead → routed in seconds</text>`),

  "invoice-extraction": frame(`
  <rect x="70" y="60" width="180" height="280" rx="12" fill="${C.panel}" stroke="${C.line}" stroke-width="1.5"/>
  <text x="94" y="96" ${font} font-size="15" fill="${C.text}">INVOICE</text>
${bars(94, 120, [90, 60], C.line)}
${bars(94, 180, [132, 132, 132, 132], C.line, 22)}
  <rect x="160" y="290" width="66" height="22" rx="5" fill="rgba(240,178,90,0.16)"/>
${link("M270 200 H340", C.accent)}
  <path d="M332 192 L342 200 L332 208" fill="none" stroke="${C.accent}" stroke-width="1.5"/>
  <rect x="360" y="110" width="220" height="180" rx="12" fill="${C.panel}" stroke="${C.accent}" stroke-width="1.5"/>
  <text x="380" y="142" ${font} font-size="12" fill="${C.text}">vendor</text><text x="480" y="142" ${font} font-size="12" fill="${C.text}">total</text>
  <path d="M370 154 H570" stroke="${C.line}"/>
${bars(380, 172, [70, 70, 70, 70], C.line, 28)}
${bars(480, 172, [60, 50, 64], C.green, 28)}
  <rect x="480" y="256" width="56" height="6" rx="3" fill="${C.accent}"/>`),

  "research-agent": frame(`
${node(255, 50, 130, 52, "goal", C.accent, C.accent)}
${node(80, 170, 130, 52, "search")}
${node(255, 170, 130, 52, "read")}
${node(430, 170, 130, 52, "compare")}
${node(255, 296, 130, 52, "brief", C.green, C.green)}
${link("M320 102 C320 136 145 136 145 170", C.accent)}
${link("M320 102 V170", C.accent)}
${link("M320 102 C320 136 495 136 495 170", C.accent)}
${link("M145 222 C145 260 320 260 320 296")}
${link("M320 222 V296")}
${link("M495 222 C495 260 320 260 320 296")}`),

  "content-assistant": frame(`
  <rect x="70" y="56" width="500" height="288" rx="14" fill="${C.panel}" stroke="${C.line}" stroke-width="1.5"/>
  <path d="M70 96 H570" stroke="${C.line}"/>
  <circle cx="94" cy="76" r="5" fill="${C.line}"/><circle cx="112" cy="76" r="5" fill="${C.line}"/><circle cx="130" cy="76" r="5" fill="${C.line}"/>
  <rect x="100" y="122" width="220" height="14" rx="4" fill="rgba(255,255,255,0.22)"/>
${bars(100, 158, [300, 280, 310], C.line)}
  <rect x="96" y="220" width="330" height="72" rx="8" fill="rgba(240,178,90,0.08)" stroke="${C.accent}" stroke-dasharray="5 5"/>
${bars(112, 236, [280, 250, 190], C.accent)}
  <path d="M478 150 l6 16 16 6 -16 6 -6 16 -6 -16 -16 -6 16 -6z" fill="none" stroke="${C.accent}" stroke-width="1.5"/>
  <rect x="456" y="246" width="88" height="30" rx="15" fill="${C.accent}"/>
  <text x="500" y="266" text-anchor="middle" ${font} font-size="12" fill="#1a1205">approve</text>`),

  "operations-dashboard": frame(`
  <rect x="50" y="46" width="540" height="308" rx="14" fill="${C.panel}" stroke="${C.line}" stroke-width="1.5"/>
  <path d="M170 46 V354" stroke="${C.line}"/>
${bars(74, 80, [80, 60, 70, 56, 66], C.line, 26)}
  <rect x="70" y="72" width="88" height="22" rx="6" fill="rgba(240,178,90,0.12)"/>
  <rect x="196" y="72" width="116" height="62" rx="10" fill="none" stroke="${C.line}"/>
  <rect x="330" y="72" width="116" height="62" rx="10" fill="none" stroke="${C.line}"/>
  <rect x="464" y="72" width="102" height="62" rx="10" fill="none" stroke="${C.line}"/>
${bars(210, 90, [50, 80], C.line, 18, 7)}
${bars(344, 90, [50, 70], C.line, 18, 7)}
${bars(478, 90, [44, 64], C.line, 18, 7)}
${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
    const h = [70, 110, 90, 140, 120, 170, 150, 190][i];
    return `  <rect x="${206 + i * 44}" y="${330 - h}" width="24" height="${h}" rx="4" fill="${i === 7 ? C.accent : "rgba(255,255,255,0.14)"}"/>`;
  }).join("\n")}`),

  "booking-app": frame(`
  <rect x="236" y="30" width="168" height="340" rx="26" fill="${C.panel}" stroke="${C.line}" stroke-width="1.5"/>
  <rect x="294" y="44" width="52" height="6" rx="3" fill="${C.line}"/>
  <text x="256" y="90" ${font} font-size="13" fill="${C.text}">Book a slot</text>
${[0, 1, 2, 3, 4].map((r) => [0, 1, 2, 3, 4].map((c) => {
    const sel = r === 2 && c === 3;
    return `  <rect x="${256 + c * 26}" y="${108 + r * 26}" width="20" height="20" rx="5" fill="${sel ? C.accent : "rgba(255,255,255,0.08)"}"/>`;
  }).join("\n")).join("\n")}
  <rect x="256" y="252" width="128" height="34" rx="8" fill="none" stroke="${C.line}"/>
  <text x="270" y="274" ${font} font-size="12" fill="${C.text}">10:30 AM</text>
  <rect x="256" y="300" width="128" height="40" rx="20" fill="${C.accent}"/>
  <text x="320" y="325" text-anchor="middle" ${font} font-size="13" fill="#1a1205">confirm</text>
${link("M404 200 H500", C.line, "5 5")}
${node(500, 172, 100, 56, "API")}
${link("M136 200 H236", C.line, "5 5")}
${node(36, 172, 100, 56, "admin")}`),
};

for (const [name, svg] of Object.entries(thumbs)) {
  fs.writeFileSync(path.join(out, `${name}.svg`), svg);
  console.log("wrote", name + ".svg");
}
