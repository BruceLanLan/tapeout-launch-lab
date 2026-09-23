const COLORS = {
  pump: "#ff5a3c",
  four: "#47b4ff",
  flap: "#e08a3c",
  pons: "#e06a9f",
  long: "#3d7cdb",
  virtuals: "#c9a227",
  tapehub: "#3dff8f",
  tapehubFour: "#f4f1e6",
};
const DASH = {
  flap: [7, 3],
  pons: [2, 2.5],
  long: [9, 3, 2, 3],
  virtuals: [5, 3],
  tapehub: [8, 4],
};
const PADS = [
  { id: "pump", name: "Pump.fun", chain: "Solana", kind: "赌场盘", mechanism: "Bonding curve → PumpSwap", floatAtT0: "~100%", teamAlloc: "协议不锁，dev 可买可砸", lp: "毕业 LP 烧毁", blurb: "分钟级价格发现。毕业后几乎全部流通，典型路径是暴涨后数小时内回吐。", defaultOn: true },
  { id: "four", name: "Four.meme", chain: "BNB Chain", kind: "赌场盘", mechanism: "Bonding curve → PancakeSwap", floatAtT0: "~100%", teamAlloc: "创建时可同笔买入", lp: "约 18 BNB + 20% 供给进 PCS", blurb: "BNB 链主发射口，机制与 Pump 同类。优势是通道，不是供给结构。", defaultOn: true },
  { id: "flap", name: "Flap", chain: "BSC / RH / X Layer", kind: "叙事盘", mechanism: "Bonding curve，可配 bStocks 分红", floatAtT0: "~100%", teamAlloc: "可配税与 vault", lp: "填满后迁 PCS", blurb: "升级的是报价资产，不是供给函数。筹码第一天仍是满的。", defaultOn: false },
  { id: "pons", name: "Pons", chain: "Robinhood Chain", kind: "赌场盘", mechanism: "V2 curve → Uniswap v4", floatAtT0: "~100%", teamAlloc: "无预留；creator 吃 70% 交易费", lp: "毕业永久锁定", blurb: "Robinhood 链上的 Pump.fun。供给仍然一次放完。", defaultOn: false },
  { id: "long", name: "LONG", chain: "Robinhood Chain", kind: "叙事盘", mechanism: "直接与股票代币组池", floatAtT0: "~100%", teamAlloc: "24h ticker 预订", lp: "NVDA / AAPL 等做 quote", blurb: "Meme 相对英伟达定价。quote 有 beta，meme 侧照样可以砸穿。", defaultOn: false },
  { id: "virtuals", name: "Virtuals", chain: "Base", kind: "叙事盘", mechanism: "Curve 收到 42k VIRTUAL → Uni v2", floatAtT0: "高（Pegasus 95% 进 LP）", teamAlloc: "Unicorn 可留 25% 团队", lp: "锁 10 年", blurb: "防抽池，不防高流通。", defaultOn: true },
  { id: "tapehub", name: "TapeHub 现状", chain: "BNB Chain", kind: "排放盘", mechanism: "晶体管认购 → 矿机减半挖矿", floatAtT0: "5%（95% 要挖 1908 天）", teamAlloc: "协议禁止预留", lp: "募资 99% + 5% 代币，永久锁", blurb: "买的是产币权。盘口薄，慢熊是默认路径。", defaultOn: true },
  { id: "tapehubFour", name: "TapeHub + Four.meme", chain: "BNB Chain", kind: "排放盘", mechanism: "同一套排放 + Four 路由深度", floatAtT0: "仍是 5%", teamAlloc: "协议禁止预留", lp: "永锁底池 + Four 发现 / 深度", blurb: "供给函数不变，交易层变厚。", defaultOn: true },
];
const HORIZONS = [
  { id: "24h", label: "24 小时", hours: 24 },
  { id: "7d", label: "7 天", hours: 24 * 7 },
  { id: "30d", label: "30 天", hours: 24 * 30 },
  { id: "108d", label: "108 天", hours: 24 * 108 },
  { id: "1y", label: "1 年", hours: 24 * 365 },
  { id: "5y", label: "1908 天", hours: 24 * 1908 },
];
const PRESETS = [
  { id: "casino", label: "秒盘对照", params: { demand: 0.38, minerDump: 0.75, fuelBurn: 0.05, raiseBnb: 100, fourMeme: false, horizonHours: 24 } },
  { id: "slowbear", label: "现状慢熊", params: { demand: 0.28, minerDump: 0.7, fuelBurn: 0.08, raiseBnb: 80, fourMeme: false, horizonHours: 24 * 108 } },
  { id: "future", label: "未来主叙事", params: { demand: 0.72, minerDump: 0.38, fuelBurn: 0.18, raiseBnb: 140, fourMeme: true, horizonHours: 24 * 365 } },
  { id: "halving", label: "五年减半", params: { demand: 0.62, minerDump: 0.35, fuelBurn: 0.16, raiseBnb: 120, fourMeme: true, horizonHours: 24 * 1908 } },
];
const STAGES = [
  { start: 0, days: 3 }, { start: 3, days: 5 }, { start: 8, days: 10 },
  { start: 18, days: 30 }, { start: 48, days: 60 }, { start: 108, days: 120 },
  { start: 228, days: 240 }, { start: 468, days: 480 }, { start: 948, days: 960 },
];
const MINEABLE = 950_000_000, PER_STAGE = MINEABLE / 9, LP_TOKENS = 50_000_000;
const TOTAL = 1_000_000_000, FLOOR = 0.008;
const CASINO = {
  pump: { peakH: 0.07, peakX: (d) => (d < 0.28 ? 2.2 + d * 4 : 7 + d * 38), dumpTau: 1.15, dumpTo: (d) => (d < 0.28 ? 0.03 : 0.055 + d * 0.18), longTau: 28, floor: (d) => (d < 0.45 ? 0.012 : 0.04 + d * 0.12) },
  four: { peakH: 0.22, peakX: (d) => (d < 0.28 ? 2 + d * 3.5 : 5.5 + d * 30), dumpTau: 2.1, dumpTo: (d) => (d < 0.28 ? 0.04 : 0.07 + d * 0.2), longTau: 40, floor: (d) => (d < 0.45 ? 0.018 : 0.05 + d * 0.14), secondPump: { at: 36, width: 14, gain: (d) => (d > 0.62 ? 1.55 + (d - 0.62) * 2 : 1) } },
  flap: { peakH: 0.3, peakX: (d) => (d < 0.28 ? 1.8 + d * 3 : 4.5 + d * 22), dumpTau: 2.4, dumpTo: (d) => 0.08 + d * 0.18, longTau: 50, floor: (d) => 0.045 + d * 0.1 },
  pons: { peakH: 0.05, peakX: (d) => (d < 0.28 ? 2.4 + d * 5 : 8 + d * 42), dumpTau: 0.9, dumpTo: (d) => (d < 0.28 ? 0.025 : 0.05 + d * 0.16), longTau: 22, floor: (d) => (d < 0.45 ? 0.01 : 0.03 + d * 0.1) },
  long: { peakH: 0.18, peakX: (d) => (d < 0.28 ? 2 + d * 4 : 6 + d * 28), dumpTau: 2.6, dumpTo: (d) => 0.1 + d * 0.2, longTau: 70, floor: (d) => 0.07 + d * 0.12 },
  virtuals: { peakH: 16, peakX: (d) => (d < 0.3 ? 1.5 + d * 2 : 2.6 + d * 10), dumpTau: 42, dumpTo: (d) => 0.22 + d * 0.28, longTau: 380, floor: (d) => 0.12 + d * 0.28 },
};

const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
function cumulativeMined(day) {
  if (day <= 0) return 0;
  let acc = 0;
  const d = Math.min(day, 1908);
  for (const s of STAGES) {
    const overlap = Math.min(d, s.start + s.days) - s.start;
    if (overlap <= 0) continue;
    acc += (PER_STAGE / s.days) * Math.min(overlap, s.days);
  }
  return Math.min(acc, MINEABLE);
}
function sampleTimes(horizonHours) {
  const out = [0];
  const push = (h) => { if (h > 0 && h <= horizonHours) out.push(h); };
  for (let m = 5; m <= Math.min(horizonHours * 60, 360); m += 5) push(m / 60);
  for (let m = 370; m <= Math.min(horizonHours * 60, 2880); m += 10) push(m / 60);
  for (let h = 50; h <= Math.min(horizonHours, 336); h += 2) push(h);
  for (let h = 342; h <= Math.min(horizonHours, 2880); h += 6) push(h);
  for (let h = 2904; h <= horizonHours; h += 24) push(h);
  if (out[out.length - 1] !== horizonHours) out.push(horizonHours);
  return out;
}
function casinoPrice(t, demand, spec) {
  const peakX = spec.peakX(demand), dumpTo = spec.dumpTo(demand), floor = spec.floor(demand);
  let px;
  if (t <= spec.peakH) {
    const u = t / spec.peakH;
    px = 1 + (peakX - 1) * (1 - Math.pow(1 - u, 1.35));
  } else {
    const since = t - spec.peakH;
    const dumped = peakX * (dumpTo + (1 - dumpTo) * Math.exp(-since / spec.dumpTau));
    if (demand < 0.42) px = dumped * Math.exp(-since / spec.longTau) + floor * 0.15;
    else {
      const rec = floor * (1 + 0.35 * demand * Math.log10(1 + since / 24));
      const mix = 1 - Math.exp(-since / (spec.dumpTau * 8));
      px = dumped * (1 - mix) + rec * mix;
    }
  }
  if (spec.secondPump) {
    const { at, width, gain } = spec.secondPump;
    const g = gain(demand);
    if (g > 1.01 && t > at) {
      const u = clamp((t - at) / width, 0, 1);
      const bump = 1 + (g - 1) * Math.sin(Math.min(u, 1) * Math.PI);
      const fade = t > at + width ? Math.exp(-(t - at - width) / (width * 1.8)) : 1;
      px *= 1 + (bump - 1) * fade;
    }
  }
  return Math.max(px, FLOOR);
}
function casinoCirc(t, pad) {
  if (pad === "virtuals") return 12 + clamp(t / 18, 0, 1) * 70;
  return 20 + clamp(t / 0.35, 0, 1) * 78;
}
function simulateTape(times, params, depth, demandBoost) {
  const dump = clamp(params.minerDump, 0, 0.95);
  const burn = clamp(params.fuelBurn, 0, 1 - dump);
  const quote0 = Math.max(params.raiseBnb, 1) * 0.99;
  const amm = { token: LP_TOKENS * depth, quote: quote0 * depth };
  const p0 = amm.quote / amm.token;
  let lastDay = 0, minedTotal = 0, burned = 0;
  const price = [], circ = [];
  const persist = 8 + 48 * params.demand * demandBoost;
  for (const h of times) {
    const day = h / 24;
    if (day > lastDay) {
      const minedNow = cumulativeMined(day) - minedTotal;
      minedTotal += minedNow;
      if (minedNow * dump > 0) {
        const k = amm.token * amm.quote;
        amm.token += minedNow * dump;
        amm.quote = k / amm.token;
      }
      const attention = 0.28 + 0.72 * params.demand * Math.exp(-h / (24 * persist));
      const buy = quote0 * 0.012 * params.demand * demandBoost * attention * (day - lastDay);
      if (buy > 0) {
        const k = amm.token * amm.quote;
        amm.quote += buy;
        amm.token = k / amm.quote;
      }
      const wantBurn = minedNow * burn;
      const daySpan = day - lastDay;
      if (wantBurn > 0 && burn > 0 && amm.token > 1) {
        const burnt = Math.min(wantBurn, amm.token * burn * 0.005 * daySpan);
        if (burnt > 0) {
          const k = amm.token * amm.quote;
          amm.token -= burnt;
          amm.quote = k / amm.token;
          burned += burnt;
        }
      }
      lastDay = day;
    }
    price.push(Math.max(amm.quote / amm.token / p0, FLOOR));
    circ.push(clamp(((LP_TOKENS + minedTotal - burned) / TOTAL) * 100, 5, 100));
  }
  return { price, circ };
}
function runSim(params) {
  const times = sampleTimes(params.horizonHours);
  const th = simulateTape(times, params, 1, 1);
  const th4 = simulateTape(times, params, 6.2, 2.35);
  return times.map((tHours, i) => ({
    tHours,
    tPlot: Math.max(tHours, 0.05),
    prices: {
      pump: casinoPrice(tHours, params.demand, CASINO.pump),
      four: casinoPrice(tHours, params.demand, CASINO.four),
      flap: casinoPrice(tHours, params.demand, CASINO.flap),
      pons: casinoPrice(tHours, params.demand, CASINO.pons),
      long: casinoPrice(tHours, params.demand, CASINO.long),
      virtuals: casinoPrice(tHours, params.demand, CASINO.virtuals),
      tapehub: th.price[i],
      tapehubFour: th4.price[i],
    },
    circPct: {
      pump: casinoCirc(tHours, "pump"),
      four: casinoCirc(tHours, "four"),
      flap: casinoCirc(tHours, "flap"),
      pons: casinoCirc(tHours, "pons"),
      long: casinoCirc(tHours, "long"),
      virtuals: casinoCirc(tHours, "virtuals"),
      tapehub: th.circ[i],
      tapehubFour: th4.circ[i],
    },
  }));
}
function formatHorizon(hours) {
  if (hours < 1) return `${Math.round(hours * 60)} 分`;
  if (hours < 48) return `${Number(hours.toFixed(hours < 10 ? 1 : 0))} 小时`;
  const days = hours / 24;
  if (days < 14) return `${Number(days.toFixed(days < 3 ? 1 : 0))} 天`;
  if (days < 370) return `${Math.round(days)} 天`;
  return `${(days / 365).toFixed(1)} 年`;
}
function nearest(series, hours) {
  let best = series[0], bestD = 1e18;
  for (const p of series) {
    const d = Math.abs(p.tHours - hours);
    if (d < bestD) { best = p; bestD = d; }
  }
  return best;
}
function maxDrawdown(series, id) {
  let peak = 0, dd = 0;
  for (const p of series) {
    const v = p.prices[id];
    if (v > peak) peak = v;
    if (peak > 0) dd = Math.min(dd, v / peak - 1);
  }
  return dd;
}

const state = {
  presetId: "future",
  params: { ...PRESETS[2].params },
  logScale: true,
  timeLog: true,
  active: PADS.filter((p) => p.defaultOn).map((p) => p.id),
};

function drawChart(canvas, series, mode) {
  const ctx = canvas.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = canvas.clientWidth, h = canvas.clientHeight;
  canvas.width = w * dpr; canvas.height = h * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  const L = 52, R = 12, T = 10, B = 28;
  const iw = w - L - R, ih = h - T - B;
  const tMin = 0.05, tMax = state.params.horizonHours;
  const yMin = mode === "price" ? 0.03 : 0;
  const yMax = mode === "price" ? 40 : 100;
  const xOf = (t) => {
    const v = Math.max(t, tMin);
    if (state.timeLog) {
      const a = Math.log(tMin), b = Math.log(tMax);
      return L + ((Math.log(v) - a) / (b - a)) * iw;
    }
    return L + (t / tMax) * iw;
  };
  const yOf = (v) => {
    if (mode === "price" && state.logScale) {
      const a = Math.log(yMin), b = Math.log(yMax);
      return T + (1 - (Math.log(clamp(v, yMin, yMax)) - a) / (b - a)) * ih;
    }
    return T + (1 - (v - yMin) / (yMax - yMin)) * ih;
  };
  ctx.strokeStyle = "rgba(236,238,233,0.06)";
  ctx.lineWidth = 1;
  const yTicks = mode === "price" && state.logScale ? [0.03, 0.1, 0.3, 1, 3, 10, 30] : (mode === "price" ? [0, 5, 10, 20, 30] : [0, 25, 50, 75, 100]);
  ctx.font = "11px IBM Plex Sans";
  ctx.fillStyle = "#8b9188";
  for (const y of yTicks) {
    ctx.beginPath(); ctx.moveTo(L, yOf(y)); ctx.lineTo(L + iw, yOf(y)); ctx.stroke();
    const label = mode === "price" ? (y >= 10 ? `${Math.round(y)}x` : y >= 1 ? `${y.toFixed(1)}x` : `${y.toFixed(2)}x`) : `${y}%`;
    ctx.fillText(label, 4, yOf(y) + 4);
  }
  const xMarks = [tMin, 1, 24, 24 * 7, 24 * 30, 24 * 108, 24 * 365, 24 * 1908].filter((t) => t <= tMax * 1.01);
  for (const t of xMarks) ctx.fillText(formatHorizon(t === tMin ? 0 : t), xOf(t) - 10, h - 8);
  if (mode === "price") {
    ctx.strokeStyle = "rgba(236,238,233,0.2)";
    ctx.beginPath(); ctx.moveTo(L, yOf(1)); ctx.lineTo(L + iw, yOf(1)); ctx.stroke();
  }
  for (const id of state.active) {
    ctx.beginPath();
    ctx.strokeStyle = COLORS[id];
    ctx.lineWidth = id === "tapehubFour" ? 2.6 : id === "tapehub" ? 2.2 : 1.8;
    ctx.setLineDash(DASH[id] || []);
    series.forEach((p, i) => {
      const y = mode === "price" ? p.prices[id] : p.circPct[id];
      const x = xOf(p.tPlot);
      const yy = yOf(y);
      if (i === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
    });
    ctx.stroke();
    ctx.setLineDash([]);
  }
}

function render() {
  const series = runSim(state.params);
  document.getElementById("legend").innerHTML = state.active.map((id) => {
    const pad = PADS.find((p) => p.id === id);
    return `<span><i class="sw" style="background:${COLORS[id]};${DASH[id] ? "height:0;border-top:2px dashed " + COLORS[id] : ""}"></i>${pad.name}</span>`;
  }).join("");
  drawChart(document.getElementById("price"), series, "price");
  drawChart(document.getElementById("supply"), series, "circ");
  const marks = [
    { h: 1, l: "1 小时" }, { h: 24, l: "24 小时" }, { h: 24 * 7, l: "7 天" },
    { h: 24 * 30, l: "30 天" }, { h: 24 * 365, l: "1 年" },
  ].filter((m) => m.h <= state.params.horizonHours + 0.01);
  const fmt = (v) => `${v < 0.05 ? v.toFixed(3) : v.toFixed(2)}x`;
  const tone = (v) => (v >= 1.05 ? "ok" : v <= 0.6 ? "bad" : "");
  let html = `<thead><tr><th>平台</th>${marks.map((m) => `<th>${m.l}</th>`).join("")}<th>最大回撤</th><th>期末流通</th></tr></thead><tbody>`;
  for (const id of state.active) {
    const last = series[series.length - 1];
    html += `<tr><td><span class="dot" style="background:${COLORS[id]};display:inline-block;margin-right:8px"></span>${PADS.find((p) => p.id === id).name}</td>`;
    for (const m of marks) {
      const v = nearest(series, m.h).prices[id];
      html += `<td class="mono ${tone(v)}">${fmt(v)}</td>`;
    }
    html += `<td class="mono bad">${(maxDrawdown(series, id) * 100).toFixed(0)}%</td><td class="mono muted">${last.circPct[id].toFixed(0)}%</td></tr>`;
  }
  document.getElementById("table").innerHTML = html + "</tbody>";
  renderControls();
}

function renderControls() {
  const p = state.params;
  const chip = (arr, key, val, label) => `<button class="chip ${state[key] === val || (key === "horizon" && p.horizonHours === val) ? "on" : ""}" data-k="${key}" data-v="${val}">${label}</button>`;
  document.getElementById("controls").innerHTML = `
    <div class="subtle" style="letter-spacing:.12em;text-transform:uppercase;margin-bottom:8px">情景预设</div>
    <div class="row">${PRESETS.map((x) => `<button class="chip ${state.presetId === x.id ? "on" : ""}" data-preset="${x.id}">${x.label}</button>`).join("")}</div>
    <div class="subtle" style="letter-spacing:.12em;text-transform:uppercase;margin-bottom:8px">时间窗口</div>
    <div class="row">${HORIZONS.map((h) => `<button class="chip ${p.horizonHours === h.hours ? "on" : ""}" data-h="${h.hours}">${h.label}</button>`).join("")}</div>
    <label class="block">需求 / 叙事强度 <span class="val">${p.demand.toFixed(2)}</span></label>
    <input type="range" min="0" max="1" step="0.01" value="${p.demand}" data-p="demand" />
    <label class="block">矿工兑现 <span class="val">${p.minerDump.toFixed(2)}</span></label>
    <input type="range" min="0" max="0.95" step="0.01" value="${p.minerDump}" data-p="minerDump" />
    <label class="block">燃料销毁 · 从池子回购 <span class="val">${p.fuelBurn.toFixed(2)}</span></label>
    <input type="range" min="0" max="0.6" step="0.01" value="${p.fuelBurn}" data-p="fuelBurn" />
    <label class="block">募资 BNB <span class="val">${p.raiseBnb}</span></label>
    <input type="range" min="20" max="300" step="5" value="${p.raiseBnb}" data-p="raiseBnb" />
    <div class="toggle"><span>显示 Four.meme 深度路径</span><input type="checkbox" id="four" ${p.fourMeme ? "checked" : ""} /></div>
    <div class="toggle"><span>时间对数坐标</span><input type="checkbox" id="tlog" ${state.timeLog ? "checked" : ""} /></div>
    <div class="toggle"><span>价格对数坐标</span><input type="checkbox" id="plog" ${state.logScale ? "checked" : ""} /></div>
    <div class="subtle" style="letter-spacing:.12em;text-transform:uppercase;margin:12px 0 6px">对照系列</div>
    <div class="pads">${PADS.map((pad) => {
      const on = state.active.includes(pad.id);
      return `<button class="${on ? "" : "off"}" data-pad="${pad.id}"><i class="dot" style="background:${on ? COLORS[pad.id] : "#6a7068"}"></i><span style="flex:1">${pad.name}</span><span class="subtle">${pad.chain}</span></button>`;
    }).join("")}</div>
  `;
  document.querySelectorAll("[data-preset]").forEach((b) => b.onclick = () => {
    const pr = PRESETS.find((x) => x.id === b.dataset.preset);
    state.presetId = pr.id;
    state.params = { ...pr.params };
    state.timeLog = pr.params.horizonHours > 24;
    const set = new Set(state.active);
    set.add("tapehub");
    if (pr.params.fourMeme) set.add("tapehubFour"); else set.delete("tapehubFour");
    state.active = [...set];
    render();
  });
  document.querySelectorAll("[data-h]").forEach((b) => b.onclick = () => {
    state.params.horizonHours = Number(b.dataset.h);
    state.presetId = null;
    state.timeLog = state.params.horizonHours > 24;
    render();
  });
  document.querySelectorAll("input[data-p]").forEach((el) => {
    el.oninput = () => {
      state.params[el.dataset.p] = Number(el.value);
      state.presetId = null;
      render();
    };
  });
  document.getElementById("four").onchange = (e) => {
    state.params.fourMeme = e.target.checked;
    const set = new Set(state.active);
    if (e.target.checked) set.add("tapehubFour"); else set.delete("tapehubFour");
    state.active = [...set];
    render();
  };
  document.getElementById("tlog").onchange = (e) => { state.timeLog = e.target.checked; render(); };
  document.getElementById("plog").onchange = (e) => { state.logScale = e.target.checked; render(); };
  document.querySelectorAll("[data-pad]").forEach((b) => b.onclick = () => {
    const id = b.dataset.pad;
    if (state.active.includes(id)) {
      if (state.active.length === 1) return;
      state.active = state.active.filter((x) => x !== id);
    } else state.active = [...state.active, id];
    render();
  });
}

document.getElementById("padGrid").innerHTML = PADS.map((p) => `
  <article class="card">
    <div style="display:flex;justify-content:space-between;gap:8px">
      <div><b>${p.name}</b><div class="subtle">${p.chain}</div></div>
      <span class="chip on" style="padding:4px 8px">${p.kind}</span>
    </div>
    <p class="muted" style="font-size:13px;margin:10px 0 0">${p.blurb}</p>
    <p class="subtle" style="margin:8px 0 0">机制 ${p.mechanism}<br>T0 流通 ${p.floatAtT0}<br>团队 ${p.teamAlloc}<br>LP ${p.lp}</p>
  </article>
`).join("");

document.getElementById("tabs").onclick = (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  document.querySelectorAll("#tabs button").forEach((b) => b.classList.toggle("on", b === btn));
  document.getElementById("sim").classList.toggle("hidden", btn.dataset.tab !== "sim");
  document.getElementById("mech").classList.toggle("hidden", btn.dataset.tab !== "mech");
};

render();
window.addEventListener("resize", () => render());
