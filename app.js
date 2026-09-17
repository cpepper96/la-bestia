import {parts} from './parts.js';
import {layers, imageSize} from './layers.js';

const $ = selector => document.querySelector(selector);
const NS = 'http://www.w3.org/2000/svg';
const field = $('#scene');
const equipped = 'assets/acuna-equipped.png';
const underlay = 'assets/acuna-underlay.png';
const naturalHead = 'assets/acuna-head-natural.png';
const {width, height} = imageSize;
const el = (tag, attrs = {}) => {
  const node = document.createElementNS(NS, tag);
  for (const [name, value] of Object.entries(attrs)) node.setAttribute(name, value);
  return node;
};
const photo = source => el('image', {href:source, width, height, 'pointer-events':'none'});
const svg = el('svg', {
  viewBox:'-320 -120 1664 1720', role:'group',
  'aria-label':'Ronald Acuña Jr. in a navy Braves jersey with fitted highlighter-yellow gear and a classic 13 chain'
});
svg.classList.add('photo-stage');
field.append(svg);
const defs = el('defs');
svg.append(defs);

function contours(layer, color, hit = false) {
  const group = el('g');
  for (const path of layer.paths || []) group.append(el('path', {d:path, fill:color}));
  for (const stroke of layer.strokes || []) {
    group.append(el('path', {d:stroke.d, fill:'none', stroke:color,
      'stroke-width':hit ? Math.max(18, stroke.width) : stroke.width,
      'stroke-linecap':'round', 'stroke-linejoin':'round'}));
  }
  return group;
}
function mask(id) {
  const node = el('mask', {id, x:0, y:0, width, height, maskUnits:'userSpaceOnUse', 'mask-type':'luminance'});
  defs.append(node);
  return node;
}

// The unchanged portion and every removable part partition one master image.
// The inpainted underlay is visible only where an original part has moved away.
const bodyMask = mask('body-mask');
bodyMask.append(el('rect', {width, height, fill:'white'}));
for (const part of parts) {
  const erased = contours(layers[part.id], 'black');
  // A small reveal margin removes antialiased garment edges as parts move.
  erased.querySelectorAll('path').forEach(path => {
    path.setAttribute('stroke', 'black');
    path.setAttribute('stroke-width', path.getAttribute('fill') === 'none' ? 16 : 12);
    path.setAttribute('stroke-linejoin', 'round');
  });
  for (const d of layers[part.id].erasePaths || []) erased.append(el('path', {d, fill:'black'}));
  bodyMask.append(erased);
}
const body = el('g', {id:'body-layer'});
body.append(photo(underlay));
const bodyTop = photo(equipped);
bodyTop.setAttribute('mask', 'url(#body-mask)');
body.append(bodyTop);
// Show only the corrected portrait region; the original body and gear stay aligned.
const headClip = el('clipPath', {id:'helmetless-head-clip', clipPathUnits:'userSpaceOnUse'});
headClip.append(el('rect', {x:595, y:165, width:265, height:245}));
defs.append(headClip);
const bareHead = photo(naturalHead);
bareHead.id = 'helmetless-head';
bareHead.setAttribute('clip-path', 'url(#helmetless-head-clip)');
bareHead.style.opacity = '0';
body.append(bareHead);
const helmet = parts.find(part => part.id === 'helmet');
const complete = photo(equipped);
complete.id = 'assembled-master';
body.append(complete);
svg.append(body);

let selected = null;
let filter = 'all';
let target = 0;
let amount = 0;
let isolated = false;
let cycling = false;
let zoom = 1;
let pan = [0, 0];
let dragged = false;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

parts.forEach((part, index) => {
  const layer = layers[part.id];
  part.visible = true;
  const partition = mask('mask-' + part.id);
  partition.append(contours(layer, 'white'));
  // Only one layer owns each pixel if equipment contours overlap.
  for (const previous of parts.slice(0, index)) partition.append(contours(layers[previous.id], 'black'));
  const group = el('g', {role:'button', tabindex:0, 'aria-label':part.name, 'data-part':part.id});
  group.classList.add('gear-sprite');
  const image = photo(equipped);
  image.setAttribute('mask', `url(#mask-${part.id})`);
  group.append(image);
  const hit = contours(layer, 'transparent', true);
  hit.classList.add('gear-hit');
  hit.setAttribute('pointer-events', 'all');
  group.append(hit);
  group.addEventListener('click', () => { if (!dragged) select(part.id); });
  group.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); select(part.id);
    }
  });
  part.node = group;
  part.image = image;
  svg.append(group);
});

function rows() {
  const active = document.activeElement;
  const focusType = active?.dataset?.toggle ? 'toggle' : active?.dataset?.select ? 'select' : null;
  const focusId = focusType ? active.dataset[focusType] : null;
  $('#parts').innerHTML = parts.filter(part => filter === 'all' || part.category === filter).map(part =>
    `<div class="part-row ${selected === part.id ? 'selected' : ''}">
      <button class="select" data-select="${part.id}" aria-pressed="${selected === part.id}"><span class="dot" style="background:${part.color}"></span>${part.name}</button>
      <button class="switch" role="switch" aria-label="Show ${part.name}" aria-checked="${part.visible}" data-toggle="${part.id}"><span></span></button>
    </div>`).join('');
  const count = parts.filter(part => part.visible).length;
  $('#visible-count').textContent = `${count} ${count === 1 ? 'piece' : 'pieces'} visible`;
  $('#toggle-all').textContent = count ? 'Hide all' : 'Show all';
  if (focusType) $(`[data-${focusType}="${focusId}"]`)?.focus();
}
function select(id) {
  selected = id;
  const part = parts.find(part => part.id === id);
  $('#detail').hidden = !part;
  for (const entry of parts) entry.node.classList.toggle('selected', entry.id === id);
  if (part) {
    $('#detail').innerHTML = `<button class="close" aria-label="Close detail">×</button>
      <div class="eyebrow">${part.category} / ${String(parts.indexOf(part) + 1).padStart(2, '0')}</div>
      <h2>${part.item}</h2>
      <p>${part.note}</p>
      <div class="spec-label">${part.specLabel || 'Details'}</div>
      <dl class="specs">${part.specs.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join('')}</dl>
      <button class="isolate">${isolated ? 'Show the full kit' : 'Isolate this piece'}</button>`;
    $('#detail .close').onclick = () => select(null);
    $('#detail .isolate').onclick = () => {
      isolated = !isolated;
      parts.forEach(entry => entry.visible = !isolated || entry === part);
      body.style.opacity = isolated ? '.16' : '1';
      setAmount(100); select(id);
    };
  }
  rows();
}
$('#parts').onclick = event => {
  const choose = event.target.closest('[data-select]');
  const toggle = event.target.closest('[data-toggle]');
  if (choose) select(choose.dataset.select);
  if (toggle) {
    const part = parts.find(part => part.id === toggle.dataset.toggle);
    part.visible = !part.visible; rows();
  }
};
document.querySelectorAll('[data-filter]').forEach(button => {
  button.onclick = () => {
    filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(tab => {
      tab.classList.toggle('active', tab === button);
      tab.setAttribute('aria-pressed', tab === button);
    });
    rows();
  };
});
$('#toggle-all').onclick = () => {
  const show = !parts.some(part => part.visible);
  parts.forEach(part => part.visible = show);
  rows();
};
function stopCycle() {
  cycling = false;
  $('#cycle').setAttribute('aria-pressed', 'false');
}
function setAmount(value) {
  target = Math.max(0, Math.min(100, value)) / 100;
  $('#explode').value = value;
  $('#amount').innerHTML = `${Math.round(value)}<span>%</span>`;
}
$('#explode').oninput = event => { stopCycle(); setAmount(+event.target.value); };
$('#reset').onclick = () => {
  stopCycle(); setAmount(0);
  parts.forEach(part => part.visible = true);
  isolated = false; body.style.opacity = 1; select(null);
};
$('#cycle').onclick = () => {
  cycling = !cycling;
  $('#cycle').setAttribute('aria-pressed', cycling);
};

function frame() {
  svg.style.transform = `translate(${pan[0]}px,${pan[1]}px) scale(${zoom})`;
  $('#zoom-level').textContent = Math.round(zoom * 100) + '%';
}
function setZoom(value) { zoom = Math.max(.7, Math.min(2.5, value)); frame(); }
$('#zoom-in').onclick = () => setZoom(zoom + .2);
$('#zoom-out').onclick = () => setZoom(zoom - .2);
$('#reset-camera').onclick = () => { pan = [0, 0]; setZoom(1); };
const pointers = new Map();
let gesture = null;
function startGesture() {
  const points = [...pointers.values()];
  gesture = points.length > 1
    ? {type:'pinch', distance:Math.hypot(points[0][0]-points[1][0], points[0][1]-points[1][1]), zoom}
    : points.length ? {type:'pan', origin:points[0], pan:[...pan]} : null;
}
field.addEventListener('pointerdown', event => {
  if (event.button > 0) return;
  pointers.set(event.pointerId, [event.clientX, event.clientY]);
  dragged = false; startGesture();
  if (!event.target.closest('.gear-sprite')) field.setPointerCapture(event.pointerId);
});
field.addEventListener('pointermove', event => {
  if (!pointers.has(event.pointerId)) return;
  pointers.set(event.pointerId, [event.clientX, event.clientY]);
  const points = [...pointers.values()];
  if (gesture?.type === 'pinch' && points.length > 1) {
    dragged = true;
    setZoom(gesture.zoom * Math.hypot(points[0][0]-points[1][0], points[0][1]-points[1][1]) / Math.max(gesture.distance, 1));
  } else if (gesture?.type === 'pan') {
    const dx = event.clientX - gesture.origin[0], dy = event.clientY - gesture.origin[1];
    if (Math.hypot(dx, dy) > 5) {
      dragged = true; pan = [gesture.pan[0]+dx, gesture.pan[1]+dy]; frame();
    }
  }
});
for (const type of ['pointerup', 'pointercancel']) {
  field.addEventListener(type, event => { pointers.delete(event.pointerId); startGesture(); });
}
field.addEventListener('wheel', event => { event.preventDefault(); setZoom(zoom - event.deltaY * .001); }, {passive:false});
$('#reference-list').innerHTML = parts.map(part => `<details class="reference-entry"><summary>${part.name}</summary><p>${part.evidence}</p><div class="source-links">${part.sources.map(source => `<a href="${source.url}" target="_blank" rel="noreferrer">${source.label} ↗</a>`).join('')}</div></details>`).join('');
$('#sources').onclick = () => $('#sources-dialog').showModal();
$('#sources-dialog .close').onclick = () => $('#sources-dialog').close();
$('#sources-dialog').onclick = event => {
  if (event.target !== $('#sources-dialog')) return;
  const rect = event.target.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) event.target.close();
};

let last = 0;
function render(time) {
  requestAnimationFrame(render);
  const elapsed = Math.min((time-last)/1000, .1); last = time;
  if (cycling) setAmount(Math.round((Math.sin(time*.00065)*.5+.5)*100));
  amount = reducedMotion ? target : amount + (target-amount) * (1-Math.exp(-elapsed*10));
  if (Math.abs(target-amount) < .00005) amount = target;
  const intact = amount === 0 && parts.every(part => part.visible);
  complete.style.display = intact ? '' : 'none';
  bareHead.style.opacity = helmet.visible ? String(Math.min(1, amount * 12)) : '1';
  svg.dataset.assembled = String(intact);
  svg.dataset.explosion = amount.toFixed(4);
  for (const part of parts) {
    part.node.style.display = part.visible ? '' : 'none';
    part.node.setAttribute('aria-hidden', !part.visible);
    part.image.style.opacity = intact ? '0' : '1';
    const [dx, dy] = layers[part.id].offset;
    part.node.setAttribute('transform', `translate(${dx*amount} ${dy*amount})`);
  }
}
rows(); frame(); setAmount(0); requestAnimationFrame(render);
Promise.all([equipped, underlay, naturalHead].map(src => new Promise((resolve, reject) => {
  const image = new Image(); image.onload = resolve; image.onerror = reject; image.src = src;
}))).then(() => $('#loading')?.remove()).catch(() => {
  $('#loading').textContent = 'The image could not load. Reload to try again.';
});
