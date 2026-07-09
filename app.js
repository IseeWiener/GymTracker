'use strict';

// ═══════════════════════════════════════════════════════
//  CUSTOM CONFIRM DIALOG
// ═══════════════════════════════════════════════════════
function showConfirm({ icon='⚠️', title, msg, okLabel='OK', okColor='var(--red)', cancelLabel='Abbrechen', onOk }) {
  document.getElementById('confirm-icon').textContent  = icon;
  document.getElementById('confirm-title').textContent = title;
  document.getElementById('confirm-msg').textContent   = msg;
  const okBtn     = document.getElementById('confirm-ok');
  const cancelBtn = document.getElementById('confirm-cancel');
  okBtn.textContent     = okLabel;
  okBtn.style.background = okColor;
  okBtn.style.color      = okColor === 'var(--accent)' ? '#000' : '#fff';
  cancelBtn.textContent  = cancelLabel;
  const overlay = document.getElementById('confirm-overlay');
  overlay.classList.add('open');
  const close = () => overlay.classList.remove('open');
  okBtn.onclick     = () => { close(); onOk(); };
  cancelBtn.onclick = close;
  overlay.onclick   = e => { if (e.target === overlay) close(); };
}

// ═══════════════════════════════════════════════════════
//  EXERCISE DATABASE
// ═══════════════════════════════════════════════════════
const EXERCISES = [
  // ── Brust ──────────────────────────────────────────────
  { id:'bench',        name:'Bankdrücken',             muscle:'Brust',         cat:'Brust',     icon:'🏋️' },
  { id:'incline',      name:'Schrägbankdrücken',        muscle:'Brust (oben)',  cat:'Brust',     icon:'🏋️' },
  { id:'decline',      name:'Flachbank KH',             muscle:'Brust (unten)', cat:'Brust',     icon:'🏋️' },
  { id:'fly',          name:'Kabelzug Fliegende',       muscle:'Brust',         cat:'Brust',     icon:'🏋️' },
  { id:'pec_deck',     name:'Butterfly / Pec Deck',     muscle:'Brust',         cat:'Brust',     icon:'🏋️' },
  { id:'dips_chest',   name:'Dips (brustbetont)',       muscle:'Brust / Tri',   cat:'Brust',     icon:'🏋️' },
  { id:'cable_cross',  name:'Kabelzug Crossover',       muscle:'Brust',         cat:'Brust',     icon:'🏋️' },
  { id:'push_up',      name:'Liegestütze',              muscle:'Brust',         cat:'Brust',     icon:'🏋️' },
  // ── Schultern ──────────────────────────────────────────
  { id:'ohp',          name:'Schulterdrücken',          muscle:'Schultern',     cat:'Schultern', icon:'🏋️' },
  { id:'lateral',      name:'Seitheben',                muscle:'Schultern',     cat:'Schultern', icon:'🏋️' },
  { id:'front_raise',  name:'Frontheben',               muscle:'Schultern',     cat:'Schultern', icon:'🏋️' },
  { id:'face_pull',    name:'Face Pulls',               muscle:'Schultern',     cat:'Schultern', icon:'🏋️' },
  { id:'shrug',        name:'Shrugs',                   muscle:'Trapez',        cat:'Schultern', icon:'🏋️' },
  { id:'arnold_press', name:'Arnold Press',             muscle:'Schultern',     cat:'Schultern', icon:'🏋️' },
  { id:'upright_row',  name:'Aufrechtes Rudern',        muscle:'Schultern',     cat:'Schultern', icon:'🏋️' },
  // ── Arme ───────────────────────────────────────────────
  { id:'triceps_kabel',name:'Trizeps Kabelzug',         muscle:'Trizeps',       cat:'Arme',      icon:'💪' },
  { id:'skull',        name:'Skull Crushers',           muscle:'Trizeps',       cat:'Arme',      icon:'💪' },
  { id:'tri_overhead', name:'Trizeps Overhead',         muscle:'Trizeps',       cat:'Arme',      icon:'💪' },
  { id:'dips_tri',     name:'Dips (trizepsbetont)',     muscle:'Trizeps',       cat:'Arme',      icon:'💪' },
  { id:'tri_kickback', name:'Trizeps Kickback',         muscle:'Trizeps',       cat:'Arme',      icon:'💪' },
  { id:'curl',         name:'Bizeps Curls',             muscle:'Bizeps',        cat:'Arme',      icon:'💪' },
  { id:'hammer',       name:'Hammer Curls',             muscle:'Bizeps',        cat:'Arme',      icon:'💪' },
  { id:'conc_curl',    name:'Konzentrations Curls',     muscle:'Bizeps',        cat:'Arme',      icon:'💪' },
  { id:'cable_curl',   name:'Kabelzug Curls',           muscle:'Bizeps',        cat:'Arme',      icon:'💪' },
  { id:'preacher',     name:'Preacher Curls',           muscle:'Bizeps',        cat:'Arme',      icon:'💪' },
  { id:'reverse_curl', name:'Reverse Curls',            muscle:'Unterarme',     cat:'Arme',      icon:'💪' },
  // ── Beine ──────────────────────────────────────────────
  { id:'squat',        name:'Kniebeuge',                muscle:'Quadrizeps',    cat:'Beine',     icon:'🦵' },
  { id:'leg_press',    name:'Beinpresse',               muscle:'Quadrizeps',    cat:'Beine',     icon:'🦵' },
  { id:'lunges',       name:'Ausfallschritte',          muscle:'Beine',         cat:'Beine',     icon:'🦵' },
  { id:'leg_ext',      name:'Beinstrecker',             muscle:'Quadrizeps',    cat:'Beine',     icon:'🦵' },
  { id:'leg_curl',     name:'Beincurl',                 muscle:'Hamstrings',    cat:'Beine',     icon:'🦵' },
  { id:'rdl',          name:'Rumänisches Kreuzheben',   muscle:'Hamstrings',    cat:'Beine',     icon:'🦵' },
  { id:'calf',         name:'Wadenheben',               muscle:'Waden',         cat:'Beine',     icon:'🦵' },
  { id:'hip_thrust',   name:'Hip Thrust',               muscle:'Gesäß',         cat:'Beine',     icon:'🦵' },
  { id:'sumo_squat',   name:'Sumo Kniebeuge',           muscle:'Innenschenkel', cat:'Beine',     icon:'🦵' },
  { id:'step_up',      name:'Step Ups',                 muscle:'Beine',         cat:'Beine',     icon:'🦵' },
  // ── Rücken ─────────────────────────────────────────────
  { id:'dead',         name:'Kreuzheben',               muscle:'Rücken / Beine',cat:'Rücken',    icon:'🔱' },
  { id:'pullup',       name:'Klimmzüge',                muscle:'Rücken',        cat:'Rücken',    icon:'🔱' },
  { id:'chinup',       name:'Chin Ups',                 muscle:'Rücken / Bizeps',cat:'Rücken',   icon:'🔱' },
  { id:'row_kabel',    name:'Rudern Kabelzug',          muscle:'Rücken',        cat:'Rücken',    icon:'🔱' },
  { id:'row_lh',       name:'Rudern Langhantel',        muscle:'Rücken',        cat:'Rücken',    icon:'🔱' },
  { id:'tbar_row',     name:'T-Bar Row',                muscle:'Rücken',        cat:'Rücken',    icon:'🔱' },
  { id:'lat_pull',     name:'Latziehen',                muscle:'Rücken',        cat:'Rücken',    icon:'🔱' },
  { id:'seated_row',   name:'Rudern sitzend (Maschine)',muscle:'Rücken',        cat:'Rücken',    icon:'🔱' },
  { id:'hyperext',     name:'Hyperextensions',          muscle:'Unterer Rücken',cat:'Rücken',    icon:'🔱' },
  { id:'good_morning', name:'Good Mornings',            muscle:'Unterer Rücken',cat:'Rücken',    icon:'🔱' },
  // ── Core ───────────────────────────────────────────────
  { id:'plank',        name:'Plank',                    muscle:'Core',          cat:'Core',      icon:'🔥' },
  { id:'crunch',       name:'Crunches',                 muscle:'Bauch',         cat:'Core',      icon:'🔥' },
  { id:'leg_raise',    name:'Beinheben',                muscle:'Bauch',         cat:'Core',      icon:'🔥' },
  { id:'ab_wheel',     name:'Ab Wheel',                 muscle:'Core',          cat:'Core',      icon:'🔥' },
  { id:'russian_twist',name:'Russian Twists',           muscle:'Seitliche Bauch',cat:'Core',     icon:'🔥' },
  { id:'cable_crunch', name:'Kabelzug Crunch',          muscle:'Bauch',         cat:'Core',      icon:'🔥' },
  { id:'side_plank',   name:'Seitstütz',                muscle:'Seitliche Bauch',cat:'Core',     icon:'🔥' },
];
const CATEGORIES = ['Alle','Brust','Schultern','Arme','Beine','Rücken','Core'];

// Helper: get all exercises including user-created ones
function getAllExercises() {
  return [...EXERCISES, ...(state.customExercises || [])];
}

// ═══════════════════════════════════════════════════════
//  DEFAULT PLANS  (Plan → Workouts → Übungen)
// ═══════════════════════════════════════════════════════
const DEFAULT_PLANS = [
  {
    id:'ppl', name:'Push / Pull / Legs', icon:'💪', isDefault:true,
    workouts:[
      { id:'ppl-push', name:'Push Day', icon:'💪',
        exercises:[
          {id:'bench',sets:3,reps:10},{id:'incline',sets:3,reps:10},
          {id:'ohp',sets:3,reps:10},{id:'lateral',sets:3,reps:10},
          {id:'triceps_kabel',sets:3,reps:10},{id:'skull',sets:3,reps:10}
        ]},
      { id:'ppl-pull', name:'Pull Day', icon:'🔱',
        exercises:[
          {id:'pullup',sets:3,reps:10},{id:'row_kabel',sets:3,reps:10},
          {id:'lat_pull',sets:3,reps:10},{id:'face_pull',sets:3,reps:10},
          {id:'curl',sets:3,reps:10},{id:'hammer',sets:3,reps:10}
        ]},
      { id:'ppl-legs', name:'Leg Day', icon:'🦵',
        exercises:[
          {id:'squat',sets:3,reps:10},{id:'leg_press',sets:3,reps:10},
          {id:'rdl',sets:3,reps:10},{id:'leg_curl',sets:3,reps:10},
          {id:'leg_ext',sets:3,reps:10},{id:'calf',sets:3,reps:10}
        ]},
    ]
  },
  {
    id:'ul', name:'Upper / Lower', icon:'🏋️', isDefault:true,
    workouts:[
      { id:'ul-upper', name:'Upper Body', icon:'🏋️',
        exercises:[
          {id:'bench',sets:3,reps:10},{id:'row_lh',sets:3,reps:10},
          {id:'ohp',sets:3,reps:10},{id:'pullup',sets:3,reps:10},
          {id:'curl',sets:3,reps:10},{id:'triceps_kabel',sets:3,reps:10}
        ]},
      { id:'ul-lower', name:'Lower Body', icon:'🦵',
        exercises:[
          {id:'squat',sets:3,reps:10},{id:'dead',sets:3,reps:10},
          {id:'lunges',sets:3,reps:10},{id:'leg_curl',sets:3,reps:10},
          {id:'calf',sets:3,reps:10}
        ]},
    ]
  },
  {
    id:'bro', name:'Bro Split', icon:'💪', isDefault:true,
    workouts:[
      { id:'bro-chest', name:'Brusttag', icon:'🏋️',
        exercises:[
          {id:'bench',sets:3,reps:10},{id:'incline',sets:3,reps:10},
          {id:'pec_deck',sets:3,reps:10},{id:'cable_cross',sets:3,reps:10},
          {id:'dips_chest',sets:3,reps:10}
        ]},
      { id:'bro-back', name:'Rückentag', icon:'🔱',
        exercises:[
          {id:'pullup',sets:3,reps:10},{id:'row_lh',sets:3,reps:10},
          {id:'lat_pull',sets:3,reps:10},{id:'tbar_row',sets:3,reps:10},
          {id:'hyperext',sets:3,reps:10}
        ]},
      { id:'bro-shoulder', name:'Schultertag', icon:'🏋️',
        exercises:[
          {id:'ohp',sets:3,reps:10},{id:'lateral',sets:3,reps:10},
          {id:'front_raise',sets:3,reps:10},{id:'face_pull',sets:3,reps:10},
          {id:'shrug',sets:3,reps:10}
        ]},
      { id:'bro-arms', name:'Armtag', icon:'💪',
        exercises:[
          {id:'curl',sets:3,reps:10},{id:'hammer',sets:3,reps:10},
          {id:'preacher',sets:3,reps:10},{id:'triceps_kabel',sets:3,reps:10},
          {id:'skull',sets:3,reps:10},{id:'tri_overhead',sets:3,reps:10}
        ]},
      { id:'bro-legs', name:'Beintag', icon:'🦵',
        exercises:[
          {id:'squat',sets:3,reps:10},{id:'leg_press',sets:3,reps:10},
          {id:'rdl',sets:3,reps:10},{id:'leg_curl',sets:3,reps:10},
          {id:'leg_ext',sets:3,reps:10},{id:'calf',sets:3,reps:10}
        ]},
    ]
  },
  {
    id:'fb', name:'Fullbody', icon:'⚡', isDefault:true,
    workouts:[
      { id:'fb-a', name:'Fullbody A', icon:'⚡',
        exercises:[
          {id:'squat',sets:3,reps:10},{id:'bench',sets:3,reps:10},
          {id:'row_kabel',sets:3,reps:10},{id:'ohp',sets:3,reps:10},
          {id:'curl',sets:3,reps:10},{id:'plank',sets:3,reps:10}
        ]},
      { id:'fb-b', name:'Fullbody B', icon:'⚡',
        exercises:[
          {id:'dead',sets:3,reps:10},{id:'incline',sets:3,reps:10},
          {id:'pullup',sets:3,reps:10},{id:'lateral',sets:3,reps:10},
          {id:'triceps_kabel',sets:3,reps:10},{id:'leg_raise',sets:3,reps:10}
        ]},
    ]
  },
];

// ═══════════════════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════════════════
const STORAGE_KEY = 'gymtracker_v3';
let state = {
  workouts: [],
  prs: {},
  plans: [],
  customExercises: [],
  settings: { goal:'muscle', days:[1,3,4], name:'Sportler' }
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) state = { ...state, ...JSON.parse(raw) };
    if (!state.plans) state.plans = [];
    if (!state.customExercises) state.customExercises = [];
  } catch(e) { console.warn('State load error', e); }
}
function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  catch(e) { showToast('⚠️ Speichern fehlgeschlagen'); }
}

// ═══════════════════════════════════════════════════════
//  PLAN SCREEN  (Stufe 1)
// ═══════════════════════════════════════════════════════
function renderPlans() {
  const list = document.getElementById('plan-list');
  const allPlans = [...DEFAULT_PLANS, ...state.plans];
  if (!allPlans.length) {
    list.innerHTML = '<p class="empty-hint">Noch keine Pläne vorhanden.</p>';
    return;
  }

  const lastId = state.lastUsedPlanId;
  const lastPlan = lastId ? allPlans.find(p => p.id === lastId) : null;

  let html = '';

  if (lastPlan) {
    // After first use: show last used plan + "Alle Pläne" button
    html += `<div class="sec-label">Zuletzt benutzt</div>`;
    html += buildPlanCard(lastPlan);
    // Custom plans (always visible)
    if (state.plans.length) {
      html += `<div class="sec-label">Meine Pläne</div>`;
      state.plans.filter(p => p.id !== lastId).forEach(p => { html += buildPlanCard(p); });
    }
    html += `
      <button class="btn-secondary mt8 mb8" onclick="showAllPlans()">
        <svg class="btn-icon" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
        Alle Pläne anzeigen
      </button>`;
  } else {
    // First time: show all default plans
    html += `<div class="sec-label">Standard-Pläne</div>`;
    DEFAULT_PLANS.forEach(p => { html += buildPlanCard(p); });
    if (state.plans.length) {
      html += `<div class="sec-label">Meine Pläne</div>`;
      state.plans.forEach(p => { html += buildPlanCard(p); });
    }
  }

  list.innerHTML = html;
}

function showAllPlans() {
  const list = document.getElementById('plan-list');
  const allPlans = [...DEFAULT_PLANS, ...state.plans];
  const lastId   = state.lastUsedPlanId;
  let html = '';
  html += `<div class="sec-label">Standard-Pläne</div>`;
  DEFAULT_PLANS.forEach(p => { html += buildPlanCard(p, p.id === lastId); });
  if (state.plans.length) {
    html += `<div class="sec-label">Meine Pläne</div>`;
    state.plans.forEach(p => { html += buildPlanCard(p, p.id === lastId); });
  }
  list.innerHTML = html;
}

function buildPlanCard(plan, isLast) {
  const wCount   = plan.workouts.length;
  const isCustom = !plan.isDefault;
  const lastBadge = isLast ? `<span style="font-size:10px;font-weight:700;background:var(--accent-dim);color:var(--accent);padding:2px 7px;border-radius:5px;margin-left:6px">Zuletzt</span>` : '';
  return `
    <div class="plan-card ${isCustom ? 'custom' : ''}" onclick="openPlanDetail('${plan.id}')">
      <div class="plan-icon">${plan.icon}</div>
      <div class="plan-info">
        <div class="plan-name">${plan.name}${lastBadge}</div>
        <div class="plan-meta">${wCount} Workout${wCount !== 1 ? 's' : ''}${isCustom ? ' · Eigener Plan' : ''}</div>
      </div>
      <div class="plan-arrow">›</div>
    </div>`;
}

// ═══════════════════════════════════════════════════════
//  PLAN DETAIL SCREEN  (Stufe 2)
// ═══════════════════════════════════════════════════════
let currentPlanId = null;

let highlightedWorkoutId = null;

function openPlanDetailHighlighted(planId, woId) {
  highlightedWorkoutId = woId;
  openPlanDetail(planId);
}

function openPlanDetail(planId) {
  const plan = [...DEFAULT_PLANS, ...state.plans].find(p => p.id === planId);
  if (!plan) return;
  currentPlanId = planId;

  document.getElementById('detail-plan-sub').textContent = plan.isDefault ? 'Standard-Plan' : 'Eigener Plan';
  document.getElementById('detail-plan-title').textContent = plan.name;

  const editBtn = document.getElementById('detail-edit-btn');
  editBtn.style.display = plan.isDefault ? 'none' : 'flex';

  renderPlanDetailCards(plan);
  // Scroll to highlighted workout
  if (highlightedWorkoutId) {
    setTimeout(() => {
      const cards = document.querySelectorAll('.detail-workout-card');
      cards.forEach(c => {
        if (c.style.borderColor.includes('accent') || c.querySelector('[style*="Als nächstes"]')) {
          c.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
      highlightedWorkoutId = null;
    }, 150);
  }
  showScreen('plan-detail');
}

function renderPlanDetailCards(plan) {
  const wrap = document.getElementById('detail-workout-list');
  wrap.innerHTML = '';

  // Merge default plan workouts with any user overrides saved in state
  const overrides = state.planOverrides?.[plan.id] || {};

  plan.workouts.forEach(baseWo => {
    // Apply user overrides if they exist for this workout
    const wo = overrides[baseWo.id]
      ? { ...baseWo, ...overrides[baseWo.id] }
      : baseWo;

    const exRows = wo.exercises.map(te => {
      const ex = getAllExercises().find(e => e.id === te.id);
      return { name: ex ? ex.name : te.id, sets: te.sets, reps: te.reps };
    });

    const totalSets = wo.exercises.reduce((s,e)=>s+e.sets,0);
    const card = document.createElement('div');
    card.className = 'detail-workout-card';
    card.id = 'dwc-' + baseWo.id;
    const isHighlighted = highlightedWorkoutId === baseWo.id;
    if (isHighlighted) card.style.borderColor = 'var(--accent)';
    card.innerHTML = `
      <div class="dwc-header">
        <div class="dwc-icon">${wo.icon || '💪'}</div>
        <div style="flex:1;min-width:0">
          <div class="dwc-name">${wo.name}${isHighlighted ? ' <span style="font-size:10px;background:var(--accent);color:#000;padding:2px 7px;border-radius:5px;margin-left:6px;font-weight:700">Als nächstes</span>' : ''}</div>
          <div class="dwc-meta">${wo.exercises.length} Übungen · ca. ${totalSets * 2} min</div>
        </div>
        <button class="dwc-edit-btn" onclick="openEditWorkout('${plan.id}','${baseWo.id}')">
          ✏️ Anpassen
        </button>
      </div>
      <div class="dwc-ex-list">
        ${exRows.map(e => `
          <div class="dwc-ex-row">
            <span class="dwc-ex-name">${e.name}</span>
            <span class="dwc-ex-sets">${e.sets} × ${e.reps}</span>
          </div>`).join('')}
      </div>`;

    const startBtn = document.createElement('button');
    startBtn.className = 'dwc-start-btn';
    startBtn.textContent = '▶  ' + wo.name + ' starten';
    startBtn.onclick = () => startWorkoutFromTemplate(wo, plan.id);
    card.appendChild(startBtn);
    wrap.appendChild(card);
  });
}

function editCurrentPlan() {
  if (currentPlanId) openEditPlan(currentPlanId);
}

// ═══════════════════════════════════════════════════════
//  EDIT WORKOUT MODAL (per Workout im Plan-Detail)
// ═══════════════════════════════════════════════════════
let editWoPlanId = null;
let editWoId     = null;
let editWoExercises = [];

function openEditWorkout(planId, woId) {
  const plan = [...DEFAULT_PLANS, ...state.plans].find(p => p.id === planId);
  if (!plan) return;
  const baseWo = plan.workouts.find(w => w.id === woId);
  if (!baseWo) return;

  const override = state.planOverrides?.[planId]?.[woId];
  const wo = override ? { ...baseWo, ...override } : baseWo;

  editWoPlanId = planId;
  editWoId     = woId;
  editWoExercises = wo.exercises.map(e => ({ ...e }));

  document.getElementById('edit-wo-title').textContent = wo.name + ' anpassen';
  document.getElementById('edit-wo-name').value = wo.name;
  renderEditWoExList();
  openModal('modal-edit-workout');
}

function renderEditWoExList() {
  const wrap = document.getElementById('edit-wo-ex-list');
  if (!editWoExercises.length) {
    wrap.innerHTML = '<p class="empty-hint" style="padding:0;margin-bottom:8px">Noch keine Übungen.</p>';
    return;
  }
  wrap.innerHTML = editWoExercises.map((te, i) => {
    const ex = getAllExercises().find(e => e.id === te.id);
    return `
      <div class="edit-ex-item">
        <div class="edit-ex-header">
          <div>
            <div class="edit-ex-name">${ex ? ex.name : te.id}</div>
            <div class="edit-ex-muscle">${ex ? ex.muscle : ''}</div>
          </div>
          <button class="edit-ex-remove" onclick="removeEditWoEx(${i})" title="Übung entfernen">×</button>
        </div>
        <div class="edit-sets-row">
          <input class="edit-set-inp" type="number" inputmode="numeric"
            value="${te.sets}" min="1" max="20"
            id="edit-sets-${i}"
            oninput="editWoExercises[${i}].sets=Math.min(20,Math.max(1,parseInt(this.value)||1))">
          <span class="edit-set-label">Sätze</span>
          <input class="edit-set-inp" type="number" inputmode="numeric"
            value="${te.reps}" min="1" max="15"
            id="edit-reps-${i}"
            oninput="editWoExercises[${i}].reps=Math.min(15,Math.max(1,parseInt(this.value)||1));if(this.value>15)this.value=15">
          <span class="edit-set-label">Wdh (max 15)</span>
        </div>
      </div>`;
  }).join('');
}

function removeEditWoEx(idx) {
  editWoExercises.splice(idx, 1);
  renderEditWoExList();
}

function openAddExToEditWo() {
  document.getElementById('edit-wo-ex-search').value = '';
  filterEditWoEx();
  openModal('modal-edit-wo-ex');
}

function filterEditWoEx() {
  const query = (document.getElementById('edit-wo-ex-search')?.value || '').toLowerCase();
  const list  = document.getElementById('edit-wo-ex-options');
  const filtered = getAllExercises().filter(e =>
    !query || e.name.toLowerCase().includes(query) || e.muscle.toLowerCase().includes(query)
  );
  list.innerHTML = filtered.map(e => `
    <div class="ex-option" onclick="addExToEditWo('${e.id}')">
      <div class="ex-opt-icon">${e.icon}</div>
      <div>
        <div class="ex-opt-name">${e.name}</div>
        <div class="ex-opt-muscle">${e.muscle}</div>
      </div>
    </div>`).join('') || '<p class="empty-hint">Keine Übung gefunden.</p>';
}

function addExToEditWo(exId) {
  editWoExercises.push({ id: exId, sets: 3, reps: 10 });
  closeModalById('modal-edit-wo-ex');
  renderEditWoExList();
}

function applyGlobalSets(val) {
  const sets = Math.min(20, Math.max(1, parseInt(val) || 1));
  editWoExercises.forEach((te, i) => {
    te.sets = sets;
    const el = document.getElementById('edit-sets-' + i);
    if (el) el.value = sets;
  });
}

function saveEditedWorkout() {
  if (!editWoExercises.length) { showToast('Mindestens eine Übung nötig'); return; }
  const name = document.getElementById('edit-wo-name').value.trim();
  if (!name) { showToast('Bitte einen Namen eingeben'); return; }

  // Read current input values
  editWoExercises.forEach((te, i) => {
    const setsEl = document.getElementById('edit-sets-' + i);
    const repsEl = document.getElementById('edit-reps-' + i);
    if (setsEl) te.sets = Math.min(20, Math.max(1, parseInt(setsEl.value) || 1));
    if (repsEl) te.reps = Math.min(15, Math.max(1, parseInt(repsEl.value) || 1));
  });

  if (!state.planOverrides) state.planOverrides = {};
  if (!state.planOverrides[editWoPlanId]) state.planOverrides[editWoPlanId] = {};
  state.planOverrides[editWoPlanId][editWoId] = { name, exercises: editWoExercises };

  saveState();
  closeModalById('modal-edit-workout');
  showToast('Workout angepasst!');

  const plan = [...DEFAULT_PLANS, ...state.plans].find(p => p.id === editWoPlanId);
  if (plan) renderPlanDetailCards(plan);
}


// ═══════════════════════════════════════════════════════
//  PLAN BUILDER MODAL
// ═══════════════════════════════════════════════════════
let editingPlanId  = null;
let planWorkouts   = []; // workouts being built in modal

function openCreatePlan() {
  editingPlanId = null;
  planWorkouts  = [];
  document.getElementById('plan-modal-title').textContent = 'Plan erstellen';
  document.getElementById('plan-name').value = '';
  document.getElementById('plan-delete-wrap').style.display = 'none';
  document.querySelectorAll('#modal-create-plan .emoji-opt').forEach((e,i) => e.classList.toggle('active', i===0));
  renderPlanWorkoutList();
  openModal('modal-create-plan');
}

function openEditPlan(id) {
  const plan = state.plans.find(p => p.id === id);
  if (!plan) return;
  editingPlanId = id;
  planWorkouts  = plan.workouts.map(w => ({ ...w, exercises: w.exercises.map(e => ({...e})) }));
  document.getElementById('plan-modal-title').textContent = 'Plan bearbeiten';
  document.getElementById('plan-name').value = plan.name;
  document.getElementById('plan-delete-wrap').style.display = 'block';
  document.querySelectorAll('#modal-create-plan .emoji-opt').forEach(el => {
    el.classList.toggle('active', el.textContent.trim() === plan.icon);
  });
  renderPlanWorkoutList();
  openModal('modal-create-plan');
}

function renderPlanWorkoutList() {
  const wrap = document.getElementById('plan-workout-list');
  if (!planWorkouts.length) {
    wrap.innerHTML = '<p class="empty-hint" style="padding:0;margin-bottom:4px">Noch keine Workouts.</p>';
    return;
  }
  wrap.innerHTML = planWorkouts.map((wo, i) => `
    <div class="tpl-ex-item">
      <div class="tpl-ex-item-header">
        <div class="tpl-ex-item-name">${wo.icon || '💪'} ${wo.name}</div>
        <button class="tpl-ex-remove" onclick="removePlanWorkout(${i})">×</button>
      </div>
      <div style="font-size:11px;color:var(--text3)">${wo.exercises.length} Übungen</div>
    </div>`).join('');
}

function removePlanWorkout(idx) {
  planWorkouts.splice(idx, 1);
  renderPlanWorkoutList();
}

function savePlan() {
  const name = document.getElementById('plan-name').value.trim();
  if (!name) { showToast('⚠️ Bitte einen Namen eingeben'); return; }
  if (!planWorkouts.length) { showToast('⚠️ Mindestens ein Workout hinzufügen'); return; }
  const icon = document.querySelector('#modal-create-plan .emoji-opt.active')?.textContent.trim() || '💪';

  if (editingPlanId) {
    const idx = state.plans.findIndex(p => p.id === editingPlanId);
    if (idx > -1) state.plans[idx] = { id: editingPlanId, name, icon, workouts: planWorkouts };
    showToast('✅ Plan aktualisiert!');
  } else {
    state.plans.push({ id: 'plan_' + Date.now(), name, icon, workouts: planWorkouts });
    showToast('✅ Plan gespeichert!');
  }
  saveState();
  closeModalById('modal-create-plan');
  renderPlans();
}

function deletePlan() {
  if (!editingPlanId) return;
  showConfirm({
    icon: '🗑️', title: 'Plan löschen',
    msg: 'Dieser Plan wird unwiderruflich gelöscht.',
    okLabel: 'Löschen', okColor: 'var(--red)',
    onOk: () => {
      state.plans = state.plans.filter(p => p.id !== editingPlanId);
      saveState();
      closeModalById('modal-create-plan');
      renderPlans();
      showScreen('plans');
      showToast('🗑️ Plan gelöscht');
    }
  });
  return;
  state.plans = state.plans.filter(p => p.id !== editingPlanId);
  saveState();
  closeModalById('modal-create-plan');
  renderPlans();
  showScreen('plans');
  showToast('🗑️ Plan gelöscht');
}

// ═══════════════════════════════════════════════════════
//  WORKOUT BUILDER (inside plan modal)
// ═══════════════════════════════════════════════════════
let pwExercises = []; // exercises for the workout being built

function openAddWorkoutToPlan() {
  pwExercises = [];
  document.getElementById('pw-name').value = '';
  document.querySelectorAll('#pw-emoji-row .emoji-opt').forEach((e,i) => e.classList.toggle('active', i===0));
  renderPwExList();
  openModal('modal-plan-workout');
}

function selectPwEmoji(el) {
  document.querySelectorAll('#pw-emoji-row .emoji-opt').forEach(e => e.classList.remove('active'));
  el.classList.add('active');
}

function renderPwExList() {
  const wrap = document.getElementById('pw-ex-list');
  if (!pwExercises.length) {
    wrap.innerHTML = '<p class="empty-hint" style="padding:0;margin-bottom:4px">Noch keine Übungen.</p>';
    return;
  }
  wrap.innerHTML = pwExercises.map((te, i) => {
    const ex = getAllExercises().find(e => e.id === te.id);
    return `
      <div class="tpl-ex-item">
        <div class="tpl-ex-item-header">
          <div class="tpl-ex-item-name">${ex ? ex.name : te.id}</div>
          <button class="tpl-ex-remove" onclick="removePwEx(${i})">×</button>
        </div>
        <div class="tpl-ex-sets-row">
          <input class="tpl-set-inp" type="number" inputmode="numeric" value="${te.sets}" min="1" max="20"
            onchange="pwExercises[${i}].sets=parseInt(this.value)||1" placeholder="Sätze">
          <span class="tpl-set-label">Sätze</span>
          <input class="tpl-set-inp" type="number" inputmode="numeric" value="${te.reps}" min="1" max="100"
            max="15" oninput="pwExercises[${i}].reps=Math.min(15,Math.max(1,parseInt(this.value)||10));if(this.value>15)this.value=15" placeholder="Wdh (max 15)">
          <span class="tpl-set-label">Wdh</span>
        </div>
      </div>`;
  }).join('');
}

function removePwEx(idx) {
  pwExercises.splice(idx, 1);
  renderPwExList();
}

function openAddExToPw() {
  filterPwEx();
  openModal('modal-pw-ex');
}

function filterPwEx() {
  const query = (document.getElementById('pw-ex-search')?.value || '').toLowerCase();
  const list  = document.getElementById('pw-ex-options');
  const filtered = getAllExercises().filter(e =>
    !query || e.name.toLowerCase().includes(query) || e.muscle.toLowerCase().includes(query)
  );
  list.innerHTML = filtered.map(e => `
    <div class="ex-option" onclick="addExToPw('${e.id}')">
      <div class="ex-opt-icon">${e.icon}</div>
      <div>
        <div class="ex-opt-name">${e.name}</div>
        <div class="ex-opt-muscle">${e.muscle}</div>
      </div>
    </div>`).join('');
}

function addExToPw(exId) {
  pwExercises.push({ id: exId, sets: 3, reps: 10 });
  closeModalById('modal-pw-ex');
  renderPwExList();
}

function saveWorkoutToPlan() {
  const name = document.getElementById('pw-name').value.trim();
  if (!name) { showToast('⚠️ Bitte einen Namen eingeben'); return; }
  if (!pwExercises.length) { showToast('⚠️ Mindestens eine Übung hinzufügen'); return; }
  const icon = document.querySelector('#pw-emoji-row .emoji-opt.active')?.textContent.trim() || '💪';
  planWorkouts.push({ id: 'wo_' + Date.now(), name, icon, exercises: pwExercises });
  closeModalById('modal-plan-workout');
  renderPlanWorkoutList();
  showToast('✅ Workout hinzugefügt');
}

// ═══════════════════════════════════════════════════════
//  WORKOUT SESSION
// ═══════════════════════════════════════════════════════
let session = null;
let elapsedInterval = null;
let timerInterval   = null;
let timerSecs      = 180;
let timerTotal     = 180;
let timerRunning   = false;
let timerStartedAt = null;  // absolute timestamp when timer started
let timerSecsAtStart = 180; // secs remaining when timer started

// Returns last used {kg, reps} — from lastUsed cache first, then history
function getLastPerformance(exId) {
  if (state.lastUsed?.[exId]) return state.lastUsed[exId];
  for (const wo of state.workouts) {
    const ex = wo.exercises.find(e => e.id === exId);
    if (!ex) continue;
    const doneSets = ex.sets.filter(s => s.done && parseFloat(s.kg) > 0 && parseInt(s.reps) > 0);
    if (doneSets.length) {
      const last = doneSets[doneSets.length - 1];
      return { kg: parseFloat(last.kg), reps: parseInt(last.reps) };
    }
  }
  return null;
}

function startWorkoutFromTemplate(wo, planId) {
  if (planId) {
    state.lastUsedPlanId = planId;
    saveState();
  }
  _doStartWorkout(wo);
}

function updateElapsed() {
  if (!session) return;
  const secs = Math.floor((Date.now() - session.startTime) / 1000);
  const str = fmtTime(secs);
  document.getElementById('elapsed-time').textContent = str;
  document.getElementById('banner-time').textContent  = str;
}

function fmtTime(s) {
  return String(Math.floor(s/60)).padStart(2,'0') + ':' + String(s%60).padStart(2,'0');
}

// Timer
function toggleTimer() {
  if (timerRunning) {
    // Pause — save remaining secs
    timerSecs = getRemainingTimerSecs();
    timerSecsAtStart = timerSecs;
    clearInterval(timerInterval); timerRunning = false;
    document.getElementById('timer-play').style.display  = '';
    document.getElementById('timer-pause').style.display = 'none';
    updateTimerDisplay();
  } else {
    timerRunning     = true;
    timerStartedAt   = Date.now();
    timerSecsAtStart = timerSecs;
    document.getElementById('timer-play').style.display  = 'none';
    document.getElementById('timer-pause').style.display = '';
    timerInterval = setInterval(() => {
      const remaining = getRemainingTimerSecs();
      if (remaining > 0) {
        timerSecs = remaining;
        updateTimerDisplay();
      } else {
        timerSecs = 0;
        updateTimerDisplay();
        resetTimer();
        showSetDoneToast();
      }
    }, 500); // check every 500ms for accuracy
    updateTimerCircle();
  }
}

// Calculate remaining time using absolute timestamps — works in background
function getRemainingTimerSecs() {
  if (!timerRunning || !timerStartedAt) return timerSecs;
  const elapsed = Math.floor((Date.now() - timerStartedAt) / 1000);
  return Math.max(0, timerSecsAtStart - elapsed);
}
function resetTimer() {
  clearInterval(timerInterval); timerRunning = false;
  timerSecs = timerTotal; timerStartedAt = null; timerSecsAtStart = timerTotal;
  updateTimerDisplay();
  updateTimerCircle();
  document.getElementById('timer-play').style.display  = '';
  document.getElementById('timer-pause').style.display = 'none';
}
function setTimer(secs) {
  clearInterval(timerInterval); timerRunning = false;
  timerSecs = secs; timerTotal = secs;
  updateTimerDisplay();
  updateTimerCircle();
  document.getElementById('timer-play').style.display  = '';
  document.getElementById('timer-pause').style.display = 'none';
  // highlight active preset
  [90,180,240].forEach(v => {
    const btn = document.getElementById('preset-'+v);
    if (btn) btn.classList.toggle('active', v === secs);
  });
}
function updateTimerDisplay() {
  document.getElementById('timer-display').textContent = fmtTime(timerSecs);
  updateTimerCircle();
}
function updateTimerCircle() {
  const el = document.getElementById('timer-progress');
  if (!el) return;
  const circumference = 301.6;
  const current  = timerRunning ? getRemainingTimerSecs() : timerSecs;
  const fraction = timerTotal > 0 ? current / timerTotal : 1;
  el.style.strokeDashoffset = circumference * (1 - fraction);
}

// ── Active exercise index ──────────────────────────────
let activeExIdx = 0;

// ── Pre-workout reorder state ───────────────────────────
let pendingWorkout  = null; // the wo template waiting to start
let reorderExList   = [];   // working copy for reorder modal

function openReorderModal(wo) {
  pendingWorkout = wo;
  reorderExList  = wo.exercises.map(e => ({ ...e }));
  document.getElementById('edit-reorder-title').textContent = wo.name + ' — Reihenfolge';
  renderReorderList();
  openModal('modal-reorder');
}

// Called from ✏️ edit modal reorder button
function openReorderFromEdit() {
  const wo = {
    id: editWoId,
    name: document.getElementById('edit-wo-name').value || 'Workout',
    exercises: editWoExercises
  };
  openReorderModal(wo);
}

function renderReorderList() {
  const wrap = document.getElementById('reorder-list');
  wrap.innerHTML = reorderExList.map((te, i) => {
    const ex = getAllExercises().find(e => e.id === te.id);
    const name = ex ? ex.name : te.id;
    return `
      <div class="reorder-ex-item">
        <div style="flex:1;min-width:0">
          <div class="reorder-ex-name">${name}</div>
          <div class="reorder-ex-meta">${te.sets} Sätze × ${te.reps} Wdh</div>
        </div>
        <button class="reorder-btn" onclick="reorderMove(${i},-1)" ${i===0?'disabled':''}>↑</button>
        <button class="reorder-btn" onclick="reorderMove(${i},1)"  ${i===reorderExList.length-1?'disabled':''}>↓</button>
      </div>`;
  }).join('');
}

function reorderMove(idx, dir) {
  const ni = idx + dir;
  if (ni < 0 || ni >= reorderExList.length) return;
  [reorderExList[idx], reorderExList[ni]] = [reorderExList[ni], reorderExList[idx]];
  renderReorderList();
}

function saveReorder() {
  if (!pendingWorkout || !editWoPlanId || !editWoId) {
    closeModalById('modal-reorder'); return;
  }
  if (!state.planOverrides) state.planOverrides = {};
  if (!state.planOverrides[editWoPlanId]) state.planOverrides[editWoPlanId] = {};
  const existing = state.planOverrides[editWoPlanId][editWoId] || {};
  state.planOverrides[editWoPlanId][editWoId] = {
    ...existing,
    exercises: reorderExList
  };
  // Also update editWoExercises so the edit modal reflects new order
  editWoExercises = reorderExList.map(e => ({ ...e }));
  saveState();
  closeModalById('modal-reorder');
  showToast('✅ Reihenfolge gespeichert!');
  // Re-render plan detail and edit modal list immediately
  const plan = [...DEFAULT_PLANS, ...state.plans].find(p => p.id === editWoPlanId);
  if (plan) renderPlanDetailCards(plan);
  renderEditWoExList();
}

function _doStartWorkout(wo) {
  if (session) {
    showConfirm({
      icon: '🏋️', title: 'Training läuft noch',
      msg: 'Du hast ein laufendes Training. Abbrechen und neu starten?',
      okLabel: 'Neu starten', okColor: 'var(--red)',
      onOk: () => { cancelWorkoutSilent(); _doStartWorkout(wo); }
    });
    return;
  }
  activeExIdx = 0;
  queueOpen   = false;
  session = { name: wo.name, startTime: Date.now(), exercises: [] };
  document.getElementById('workout-title').textContent = wo.name;
  document.getElementById('elapsed-time').textContent = '00:00';
  resetTimer();

  wo.exercises.forEach(tplEx => {
    const ex = getAllExercises().find(e => e.id === tplEx.id);
    if (!ex) return;
    const prev  = state.prs[tplEx.id];
    const last  = getLastPerformance(tplEx.id);
    // kg: use last used weight, fallback to PR
    const autoKg   = last ? String(last.kg) : (prev ? String(prev.kg) : '');
    // reps: always use the value set in the plan/edit (tplEx.reps), clamped to max 15
    const autoReps = String(Math.min(15, tplEx.reps || 10));
    session.exercises.push({
      id: tplEx.id, name: ex.name,
      templateSetCount: tplEx.sets,
      sets: Array.from({ length: tplEx.sets }, () => ({ kg: autoKg, reps: autoReps, done: false }))
    });
  });

  elapsedInterval = setInterval(updateElapsed, 1000);
  document.getElementById('active-banner').classList.remove('hidden');
  document.getElementById('banner-name').textContent = wo.name;
  renderWorkoutUI();
  showScreen('workout');
}

// ── Render active exercise + queue ──────────────────────
function renderWorkoutUI() {
  renderActiveExercise();
  renderQueue();
}

function renderActiveExercise() {
  const wrap = document.getElementById('active-ex-wrap');
  if (!session || !session.exercises.length) { wrap.innerHTML = ''; return; }

  // All exercises done — show completion banner
  const allDone = session.exercises.every(e => e.sets.every(s => s.done));
  if (allDone) {
    wrap.innerHTML = `
      <div class="all-done-card">
        <div style="font-size:36px;margin-bottom:8px">🏁</div>
        <div class="all-done-title">Alle Übungen erledigt!</div>
        <div class="all-done-sub">Stark gemacht. Training jetzt speichern.</div>
        <button class="btn-primary" style="margin:16px 0 0;width:100%" onclick="finishWorkout()">
          Training speichern
        </button>
      </div>`;
    return;
  }

  const ex   = session.exercises[activeExIdx];
  const prev = state.prs[ex.id];
  const done = ex.sets.filter(s => s.done).length;
  const total = ex.sets.length;

  const card = document.createElement('div');
  card.className = 'active-ex-card';
  card.innerHTML = `
    <div class="active-ex-header">
      <div style="flex:1;min-width:0">
        <div class="active-ex-num">Übung ${activeExIdx + 1} von ${session.exercises.length} · ${done}/${total} Sätze</div>
        <div class="active-ex-name">${ex.name}</div>
        ${prev ? `<div class="active-ex-prev">PR: ${prev.kg} kg × ${prev.reps}</div>` : ''}
      </div>
      <button class="add-set-btn" style="margin-left:8px" onclick="addSet(${activeExIdx})">+ Satz</button>
    </div>
    <div class="col-hdr"><span></span><span>kg</span><span>Wdh</span><span></span></div>
    <div id="active-sets"></div>`;
  wrap.innerHTML = '';
  wrap.appendChild(card);
  ex.sets.forEach((set, si) => renderActiveSetRow(si, set));
}

function renderActiveSetRow(setIdx, setData) {
  const exIdx   = activeExIdx;
  const isExtra = !!setData.extra;
  const row     = document.createElement('div');
  row.className = 'set-row';
  row.id        = `set-${exIdx}-${setIdx}`;

  // Extra sets: show check + small × remove button side by side
  // Template sets: show check only
  const checkBtn = `<div class="set-check ${setData.done ? 'done' : ''}"
       onclick="toggleSetDone(this,${exIdx},${setIdx})">
       <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
     </div>`;
  const removeBtn = isExtra
    ? `<div class="set-remove-sm" onclick="removeSet(${exIdx},${setIdx})" title="Satz entfernen">×</div>`
    : '';

  row.innerHTML = `
    <div class="set-num ${isExtra ? 'set-num-extra' : ''}">${setIdx + 1}</div>
    <input class="set-inp" type="number" inputmode="decimal" placeholder="—"
      min="0" step="0.25"
      value="${setData.kg || ''}"
      onchange="updateSet(${exIdx},${setIdx},'kg',this.value);this.value=session.exercises[${exIdx}].sets[${setIdx}].kg||''"
      oninput="if(this.value<0)this.value=0">
    <input class="set-inp" type="number" inputmode="numeric" placeholder="—"
      min="0" max="15"
      value="${setData.reps || ''}"
      onchange="updateSet(${exIdx},${setIdx},'reps',this.value);this.value=session.exercises[${exIdx}].sets[${setIdx}].reps||''"
      oninput="if(this.value<0)this.value=0;if(this.value>15)this.value=15">
    <div style="display:flex;align-items:center;gap:4px">${checkBtn}${removeBtn}</div>`;
  document.getElementById('active-sets').appendChild(row);
}

let queueOpen = false;

function toggleQueue() {
  queueOpen = !queueOpen;
  const body    = document.getElementById('queue-body');
  const chevron = document.getElementById('queue-chevron');
  if (body)    body.classList.toggle('open', queueOpen);
  if (chevron) chevron.classList.toggle('open', queueOpen);
}

function renderQueue() {
  const wrap = document.getElementById('queue-wrap');
  if (!session || session.exercises.length <= 1) { wrap.innerHTML = ''; return; }

  const others = session.exercises
    .map((ex, i) => ({ ex, i }))
    .filter(({ i }) => i !== activeExIdx);

  if (!others.length) { wrap.innerHTML = ''; return; }

  const pending = others.filter(({ ex }) => ex.sets.some(s => !s.done));
  const done    = others.filter(({ ex }) => ex.sets.every(s => s.done));
  const pendingCount = pending.length;

  // Tab label
  const tabLabel = pendingCount > 0
    ? `Noch ${pendingCount} Übung${pendingCount !== 1 ? 'en' : ''}`
    : 'Alle Übungen erledigt';

  let listHtml = '<div class="queue-list">';
  if (pending.length) {
    listHtml += `<div class="queue-header">Ausstehend</div>`;
    listHtml += pending.map(({ ex, i }) => {
      const doneSets = ex.sets.filter(s => s.done).length;
      return `<div class="queue-item" onclick="switchActiveExercise(${i})">
        <div class="queue-num">${i + 1}</div>
        <div class="queue-name">${ex.name}</div>
        <div class="queue-sets-info">${doneSets}/${ex.sets.length} Sätze</div>
        <span style="color:var(--text3);font-size:16px;margin-left:4px">›</span>
      </div>`;
    }).join('');
  }
  if (done.length) {
    listHtml += `<div class="queue-header">Erledigt</div>`;
    listHtml += done.map(({ ex, i }) =>
      `<div class="queue-item queue-done" onclick="switchActiveExercise(${i})">
        <div class="queue-num">${i + 1}</div>
        <div class="queue-name">${ex.name}</div>
        <div class="queue-sets-info">✓ fertig</div>
      </div>`
    ).join('');
  }
  listHtml += '</div>';

  wrap.innerHTML = `
    <div class="queue-toggle-tab" onclick="toggleQueue()">
      <div class="queue-toggle-label">
        <span>Weitere Übungen</span>
        ${pendingCount > 0 ? `<span class="queue-pending-badge">${pendingCount} offen</span>` : ''}
      </div>
      <span class="queue-chevron ${queueOpen ? 'open' : ''}" id="queue-chevron">▾</span>
    </div>
    <div class="queue-body ${queueOpen ? 'open' : ''}" id="queue-body">
      ${listHtml}
    </div>`;
}

function switchActiveExercise(idx) {
  activeExIdx = idx;
  renderWorkoutUI();
  // Scroll to top of workout screen
  document.getElementById('screen-workout').scrollTo({ top: 0, behavior: 'smooth' });
}

// Keep addSet working for active exercise
function findFirstOpenExIdx() {
  if (!session) return -1;
  return session.exercises.findIndex(ex => ex.sets.some(s => !s.done));
  // returns -1 if all done — callers must handle this
}

// renderSetRow replaced by renderActiveSetRow

function addSet(exIdx) {
  const ex   = session.exercises[exIdx];
  const last = ex.sets.length > 0 ? ex.sets[ex.sets.length - 1] : null;
  const newSet = {
    kg:    last ? last.kg   : '',
    reps:  last ? last.reps : '10',
    done:  false,
    extra: true   // user-added → can be removed
  };
  ex.sets.push(newSet);
  renderWorkoutUI();
}
function removeSet(exIdx, setIdx) {
  const ex = session?.exercises[exIdx];
  if (!ex) return;
  if (!ex.sets[setIdx]?.extra) return; // only remove user-added sets
  ex.sets.splice(setIdx, 1);
  renderWorkoutUI();
}

function updateSet(exIdx, setIdx, field, val) {
  const ex = session?.exercises[exIdx];
  if (!ex?.sets[setIdx]) return;
  // Clamp values: no negatives, reps max 15
  let num = parseFloat(val);
  if (isNaN(num) || num < 0) num = 0;
  if (field === 'reps' && num > 15) num = 15;
  if (field === 'kg')   num = Math.round(num * 4) / 4; // nearest 0.25
  ex.sets[setIdx][field] = String(num || '');
}
function toggleSetDone(el, exIdx, setIdx, forceState) {
  const isDone = forceState !== undefined ? forceState : !el.classList.contains('done');
  if (session?.exercises[exIdx]?.sets[setIdx])
    session.exercises[exIdx].sets[setIdx].done = isDone;
  if (isDone) {
    resetTimer();
    toggleTimer();
    checkExerciseComplete(exIdx);
  } else {
    renderWorkoutUI();
  }
}

function checkExerciseComplete(exIdx) {
  const ex = session?.exercises[exIdx];
  if (!ex) return;
  const allDone = ex.sets.length > 0 && ex.sets.every(s => s.done);
  renderWorkoutUI();
  if (!allDone) return;

  // Check if ALL exercises are done
  const allExDone = session.exercises.every(e => e.sets.every(s => s.done));
  if (allExDone) {
    setTimeout(() => {
      renderWorkoutUI(); // re-render to collapse active card
      showToast('🏁 Alle Übungen erledigt! Training speichern?');
    }, 600);
    return;
  }

  // Advance to next open exercise
  setTimeout(() => {
    const nextIdx = findNextOpenExIdx(exIdx);
    if (nextIdx !== -1 && nextIdx !== exIdx) {
      activeExIdx = nextIdx;
      renderWorkoutUI();
      document.getElementById('screen-workout').scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, 500);
}

// Find next open exercise — never falls back to 0 if all done
function findNextOpenExIdx(currentIdx) {
  if (!session) return -1;
  // Search forward from current position
  for (let i = currentIdx + 1; i < session.exercises.length; i++) {
    if (session.exercises[i].sets.some(s => !s.done)) return i;
  }
  // Wrap around to beginning
  for (let i = 0; i < currentIdx; i++) {
    if (session.exercises[i].sets.some(s => !s.done)) return i;
  }
  return -1; // all done
}

// Find next undone set across all exercises — returns {exIdx, setIdx, el} or null
function findNextOpenSet() {
  if (!session) return null;
  // Only look in active exercise for the toast
  const ex = session.exercises[activeExIdx];
  if (!ex) return null;
  for (let si = 0; si < ex.sets.length; si++) {
    if (!ex.sets[si].done) {
      const el = document.querySelector(`#set-${activeExIdx}-${si} .set-check`);
      return el ? { exIdx: activeExIdx, setIdx: si, el } : null;
    }
  }
  return null;
}

function showSetDoneToast() {
  const allExDone = session?.exercises.every(e => e.sets.every(s => s.done));
  if (allExDone) return; // suppress toast — checkExerciseComplete handles this
  const next = findNextOpenSet();
  if (!next) { showToast('✅ Alle Sätze erledigt!'); return; }
  const t = document.getElementById('toast');
  t.innerHTML = `
    <span>Satz geschafft?</span>
    <button onclick="confirmSetDone(true)"  style="background:#000;color:var(--accent);border:none;border-radius:6px;padding:4px 10px;font-size:12px;font-weight:700;cursor:pointer;margin-left:8px">✓ Ja</button>
    <button onclick="confirmSetDone(false)" style="background:#000;color:#fff;border:none;border-radius:6px;padding:4px 10px;font-size:12px;font-weight:700;cursor:pointer;margin-left:6px">✗ Nein</button>`;
  t.style.opacity = '1';
  t.style.pointerEvents = 'all';
  clearTimeout(toastTimer);
  // auto-dismiss after 8 seconds if no action
  toastTimer = setTimeout(() => { t.style.opacity = '0'; }, 8000);
}

function confirmSetDone(yes) {
  const t = document.getElementById('toast');
  t.style.opacity = '0';
  t.style.pointerEvents = 'none';
  clearTimeout(toastTimer);
  if (!yes) return;
  const next = findNextOpenSet();
  if (next) toggleSetDone(next.el, next.exIdx, next.setIdx, true);
}

// ═══════════════════════════════════════════════════════
//  CUSTOM EXERCISES
// ═══════════════════════════════════════════════════════
let customExCat = 'Brust';

function openCreateCustomExercise() {
  document.getElementById('custom-ex-name').value   = '';
  document.getElementById('custom-ex-muscle').value = '';
  customExCat = 'Brust';
  document.querySelectorAll('#custom-ex-cats .cat-tab').forEach((b,i) =>
    b.classList.toggle('active', i === 0));
  document.querySelectorAll('#modal-custom-ex .emoji-opt').forEach((e,i) =>
    e.classList.toggle('active', i === 0));
  openModal('modal-custom-ex');
}

function selectCustomCat(el, cat) {
  customExCat = cat;
  document.querySelectorAll('#custom-ex-cats .cat-tab').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
}

function saveCustomExercise() {
  const name   = document.getElementById('custom-ex-name').value.trim();
  const muscle = document.getElementById('custom-ex-muscle').value.trim();
  if (!name)   { showToast('⚠️ Name eingeben'); return; }
  if (!muscle) { showToast('⚠️ Muskelgruppe eingeben'); return; }
  const icon = document.querySelector('#modal-custom-ex .emoji-opt.active')?.textContent.trim() || '💪';
  const id   = 'custom_' + Date.now();
  if (!state.customExercises) state.customExercises = [];
  state.customExercises.push({ id, name, muscle, cat: customExCat, icon, isCustom: true });
  saveState();
  closeModalById('modal-custom-ex');
  showToast(`✅ "${name}" gespeichert!`);
  filterExercises(); // refresh list
}

// Add exercise modal (in active workout)
let currentExFilter = 'Alle';
function openAddExercise() {
  currentExFilter = 'Alle';
  buildCategoryTabs();
  filterExercises();
  document.getElementById('ex-search').value = '';
  openModal('modal-add-ex');
}
function buildCategoryTabs() {
  document.getElementById('ex-category-tabs').innerHTML = CATEGORIES.map(c =>
    `<button class="cat-tab ${c===currentExFilter?'active':''}" onclick="setExFilter('${c}',this)">${c}</button>`
  ).join('');
}
function setExFilter(cat, el) {
  currentExFilter = cat;
  document.querySelectorAll('#ex-category-tabs .cat-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  filterExercises();
}
function filterExercises() {
  const query = (document.getElementById('ex-search')?.value||'').toLowerCase();
  const list  = document.getElementById('exercise-options');
  const filtered = getAllExercises().filter(e =>
    (currentExFilter==='Alle'||e.cat===currentExFilter) &&
    (!query||e.name.toLowerCase().includes(query)||e.muscle.toLowerCase().includes(query))
  );
  list.innerHTML = filtered.map(e => `
    <div class="ex-option" onclick="addExerciseToSession('${e.id}')">
      <div class="ex-opt-icon">${e.icon}</div>
      <div>
        <div class="ex-opt-name">${e.name}${e.isCustom ? ' <span style="font-size:10px;color:var(--accent);background:var(--accent-dim);padding:1px 5px;border-radius:4px;margin-left:4px">Eigene</span>' : ''}</div>
        <div class="ex-opt-muscle">${e.muscle}</div>
      </div>
    </div>`).join('') || '<p class="empty-hint">Keine Übung gefunden.</p>';
}
function addExerciseToSession(exId) {
  closeModalById('modal-add-ex');
  if (!session) return;
  const ex = getAllExercises().find(e => e.id === exId);
  if (!ex) return;
  const prev = state.prs[exId];
  const last = getLastPerformance(exId);
  const autoKg   = last ? String(last.kg)   : (prev ? String(prev.kg) : '');
  const autoReps = last ? String(last.reps) : '10';
  // Default 3 sets when adding exercise mid-workout
  session.exercises.push({ id:exId, name:ex.name, templateSetCount:3, sets:[
    {kg:autoKg, reps:autoReps, done:false},
    {kg:autoKg, reps:autoReps, done:false},
    {kg:autoKg, reps:autoReps, done:false}
  ]});
  activeExIdx = session.exercises.length - 1;
  renderWorkoutUI();
  document.getElementById('screen-workout').scrollTo({ top: 0, behavior: 'smooth' });
}

// Finish / Cancel
function finishWorkout() {
  if (!session) return;
  const doneSets = session.exercises.flatMap(e => e.sets.filter(s => s.done));
  if (!doneSets.length) {
    showConfirm({
      icon: '💾', title: 'Noch nichts abgehakt',
      msg: 'Du hast noch keine Sätze abgehakt. Training trotzdem speichern?',
      okLabel: 'Speichern', okColor: 'var(--accent)',
      onOk: () => _finishWorkoutConfirmed()
    });
    return;
  }
  _finishWorkoutConfirmed();
}
function _finishWorkoutConfirmed() {
  const doneSets = session.exercises.flatMap(e => e.sets.filter(s => s.done));

  clearInterval(elapsedInterval); clearInterval(timerInterval); timerRunning = false;
  const duration = Math.floor((Date.now()-session.startTime)/1000);
  const workout = {
    id: Date.now(),
    name: document.getElementById('workout-title').textContent || session.name,
    date: new Date().toISOString(),
    duration,
    exercises: session.exercises
  };
  const newPRs = [];
  if (!state.lastUsed) state.lastUsed = {};
  session.exercises.forEach(ex => {
    // Save last used kg+reps (any done set) for auto-fill next time
    const doneSets = ex.sets.filter(s => s.done && parseFloat(s.kg) >= 0 && parseInt(s.reps) > 0);
    if (doneSets.length) {
      const last = doneSets[doneSets.length - 1];
      state.lastUsed[ex.id] = { kg: parseFloat(last.kg), reps: parseInt(last.reps) };
    }
    ex.sets.forEach(set => {
      const kg = parseFloat(set.kg), reps = parseInt(set.reps);
      if (!set.done||isNaN(kg)||isNaN(reps)) return;
      if (!state.prs[ex.id]||kg>state.prs[ex.id].kg) {
        state.prs[ex.id] = { kg, reps, date:new Date().toISOString() };
        newPRs.push(ex.name);
      }
    });
  });
  state.workouts.unshift(workout);
  saveState();
  session = null;
  document.getElementById('active-banner').classList.add('hidden');
  showToast(newPRs.length ? `🏆 PR: ${newPRs.slice(0,2).join(', ')}` : '✅ Training gespeichert!');
  refreshDashboard(); refreshProgress();
  showScreen('home');
}
function cancelWorkout() {
  if (!session) return;
  showConfirm({
    icon: '🚪', title: 'Training abbrechen',
    msg: 'Alle Daten dieses Trainings gehen verloren.',
    okLabel: 'Abbrechen', okColor: 'var(--red)',
    onOk: () => { cancelWorkoutSilent(); showScreen('home'); }
  });
  return;
  cancelWorkoutSilent();
  showScreen('home');
}
function cancelWorkoutSilent() {
  clearInterval(elapsedInterval); clearInterval(timerInterval);
  timerRunning = false; session = null;
  document.getElementById('active-banner').classList.add('hidden');
  document.getElementById('active-ex-wrap').innerHTML = '';
  document.getElementById('queue-wrap').innerHTML = '';
}

// ═══════════════════════════════════════════════════════
//  DASHBOARD
// ═══════════════════════════════════════════════════════
function refreshDashboard() {
  const now = new Date();
  const dow = now.getDay();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - (dow===0?6:dow-1));
  weekStart.setHours(0,0,0,0);

  const ww = state.workouts.filter(w => new Date(w.date) >= weekStart);
  const vol = ww.reduce((s,w)=>s+calcVol(w),0);

  document.getElementById('dash-workouts').textContent = ww.length;
  document.getElementById('dash-total').textContent    = state.workouts.length;
  document.getElementById('dash-vol').innerHTML = vol.toLocaleString('de-DE')+' <span class="stat-unit">kg</span>';
  document.getElementById('dash-prs').textContent = Object.keys(state.prs).length;

  const list = document.getElementById('history-list');
  if (!state.workouts.length) {
    list.innerHTML = '<p class="empty-hint">Noch kein Training gespeichert.</p>'; return;
  }
  const showAll = list.dataset.showAll === '1';
  const visibleW = showAll ? state.workouts : state.workouts.slice(0, 3);
  // Next workout suggestion banner
  const next = getNextWorkoutSuggestion();
  const nextHtml = next ? `
    <div style="background:var(--accent-dim);border:.5px solid var(--accent-mid);border-radius:var(--radius-md);
      margin:0 16px 12px;padding:12px 14px;display:flex;align-items:center;justify-content:space-between;cursor:pointer"
      onclick="openPlanDetailHighlighted('${next.plan.id}','${next.workout.id}')">
      <div>
        <div style="font-size:10px;font-weight:700;color:var(--accent);letter-spacing:.06em;text-transform:uppercase">Als nächstes</div>
        <div style="font-size:14px;font-weight:700;color:var(--text);margin-top:2px">${next.workout.icon || '💪'} ${next.workout.name}</div>
        <div style="font-size:11px;color:var(--text3);margin-top:2px">${next.plan.name}</div>
      </div>
      <span style="font-size:22px;color:var(--accent)">▶</span>
    </div>` : '';

  // Inject next suggestion before list
  const nextEl = document.getElementById('next-workout-banner');
  if (nextEl) nextEl.innerHTML = nextHtml;

  list.innerHTML = visibleW.map(w => {
    const d = new Date(w.date).toLocaleDateString('de-DE',{weekday:'short',day:'numeric',month:'short'});
    return `<div class="workout-row" id="wo-${w.id}">
      <div class="wicon" style="background:var(--accent-dim)">🏋️</div>
      <div class="winfo">
        <div class="wname">${w.name}</div>
        <div class="wmeta">${d} · ${Math.floor(w.duration/60)} min · ${w.exercises.length} Übungen</div>
      </div>
      <div class="wbadge">${calcVol(w).toLocaleString('de-DE')} kg</div>
    </div>`;
  }).join('');
  visibleW.forEach(w => {
    const el = document.getElementById('wo-' + w.id);
    if (el) addLongPressDelete(el, w.id);
  });
  if (state.workouts.length > 3) {
    list.innerHTML += showAll
      ? `<button class="show-more-btn" onclick="toggleShowAll('history-list')">▲ Weniger anzeigen</button>`
      : `<button class="show-more-btn" onclick="toggleShowAll('history-list')">+ ${state.workouts.length - 3} weitere anzeigen</button>`;
  }
}

function calcVol(w) {
  return w.exercises.reduce((s,ex)=>s+ex.sets.reduce((s2,set)=>
    s2+(set.done?(parseFloat(set.kg)||0)*(parseInt(set.reps)||0):0),0),0);
}

// ═══════════════════════════════════════════════════════
//  PROGRESS
// ═══════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════
//  PROGRESS CHART
// ═══════════════════════════════════════════════════════
let chartExId = null; // currently selected exercise in chart

// ── Data helpers ────────────────────────────────────────

// Max kg of done sets for one exercise in one workout
function maxKgForEx(wo, exId) {
  const ex = wo.exercises.find(e => e.id === exId);
  if (!ex) return null;
  const done = ex.sets.filter(s => s.done && parseFloat(s.kg) > 0);
  if (!done.length) return null;
  return Math.max(...done.map(s => parseFloat(s.kg)));
}

// Avg kg of done sets for one exercise (for single-exercise chart)
function avgKgForEx(wo, exId) {
  const ex = wo.exercises.find(e => e.id === exId);
  if (!ex) return null;
  const done = ex.sets.filter(s => s.done && parseFloat(s.kg) > 0);
  if (!done.length) return null;
  return done.reduce((s, set) => s + parseFloat(set.kg), 0) / done.length;
}

// Build data points for a single exercise (avg kg per session)
function getExerciseHistory(exId) {
  return [...state.workouts].reverse()
    .map(wo => {
      const avg = avgKgForEx(wo, exId);
      if (avg === null) return null;
      return {
        date:  wo.date,
        value: Math.round(avg * 10) / 10,
        label: new Date(wo.date).toLocaleDateString('de-DE', { day:'numeric', month:'short' }),
        unit:  'kg (Ø)'
      };
    }).filter(Boolean);
}

// Category: avg of max-kg per exercise trained in this session
// Gesamt: avg of all category averages (each category weighted equally)
function getCategoryHistory(cat) {
  const allEx = getAllExercises();

  return [...state.workouts].reverse()
    .map(wo => {
      let avg = null;

      if (cat === 'Gesamt') {
        const cats = ['Brust','Schultern','Arme','Beine','Rücken','Core'];
        const catAvgs = cats.map(c => {
          const ids = allEx.filter(e => e.cat === c).map(e => e.id);
          const maxKgs = ids.map(id => maxKgForEx(wo, id)).filter(v => v !== null);
          return maxKgs.length ? maxKgs.reduce((a,b) => a+b,0) / maxKgs.length : null;
        }).filter(v => v !== null);
        if (!catAvgs.length) return null;
        avg = catAvgs.reduce((a,b) => a+b,0) / catAvgs.length;
      } else {
        const ids = allEx.filter(e => e.cat === cat).map(e => e.id);
        const maxKgs = ids.map(id => maxKgForEx(wo, id)).filter(v => v !== null);
        if (!maxKgs.length) return null;
        avg = maxKgs.reduce((a,b) => a+b,0) / maxKgs.length;
      }

      return {
        date:  wo.date,
        value: Math.round(avg * 10) / 10,
        label: new Date(wo.date).toLocaleDateString('de-DE', { day:'numeric', month:'short' }),
        unit:  'kg (Ø Max)'
      };
    }).filter(Boolean);
}

// ── SVG chart renderer ───────────────────────────────────
function buildSvgChart(points, unit) {
  const W = 320, H = 150, PAD = { top:18, right:16, bottom:30, left:46 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  const vals   = points.map(p => p.value);
  const minVal = Math.min(...vals);
  const maxVal = Math.max(...vals);
  const range  = maxVal - minVal || 1;

  const toX = i => PAD.left + i * (chartW / Math.max(points.length - 1, 1));
  const toY = v => PAD.top + chartH - ((v - minVal) / range) * chartH;

  // Smooth bezier path
  function bezierPath(pts) {
    if (pts.length < 2) return `M${pts[0].x},${pts[0].y}`;
    let d = `M${pts[0].x},${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i-1], curr = pts[i];
      const cpx = (prev.x + curr.x) / 2;
      d += ` C${cpx},${prev.y} ${cpx},${curr.y} ${curr.x},${curr.y}`;
    }
    return d;
  }

  const coordPts = points.map((p, i) => ({ x: toX(i), y: toY(p.value) }));
  const pathD    = bezierPath(coordPts);
  const areaD    = `${pathD} L${toX(points.length-1)},${PAD.top+chartH} L${toX(0)},${PAD.top+chartH} Z`;

  // Y labels (3 levels) — format large numbers
  const fmt = v => v >= 1000 ? (v/1000).toFixed(1)+'t' : Math.round(v)+'';
  const yLevels = [minVal, minVal + range/2, maxVal];
  const yLabels = yLevels.map(v => ({ y: toY(v), label: fmt(v) }));

  // X labels: first, mid, last
  const xIdxs  = points.length <= 2 ? [0, points.length-1]
    : [0, Math.floor((points.length-1)/2), points.length-1];
  const xLabels = xIdxs.map(i => ({ x: toX(i), label: points[i].label }));

  const dots = coordPts.map(p =>
    `<circle cx="${p.x}" cy="${p.y}" r="3.5"
      fill="var(--accent)" stroke="#0d0d0d" stroke-width="1.5"/>`
  ).join('');

  const grid = yLabels.map(l =>
    `<line x1="${PAD.left}" y1="${l.y}" x2="${W-PAD.right}" y2="${l.y}"
      stroke="rgba(255,255,255,.05)" stroke-width="1"/>`
  ).join('');

  return `
    <svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"
      style="width:100%;height:auto;display:block;overflow:visible">
      <defs>
        <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--accent)" stop-opacity="0.18"/>
          <stop offset="100%" stop-color="var(--accent)" stop-opacity="0"/>
        </linearGradient>
      </defs>
      ${grid}
      <path d="${areaD}" fill="url(#cg)"/>
      <path d="${pathD}" fill="none" stroke="var(--accent)"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      ${dots}
      ${yLabels.map(l => `
        <text x="${PAD.left-6}" y="${l.y+4}" text-anchor="end"
          font-size="9" fill="rgba(255,255,255,.4)">${l.label}</text>`).join('')}
      ${xLabels.map(l => `
        <text x="${l.x}" y="${H-4}" text-anchor="middle"
          font-size="9" fill="rgba(255,255,255,.4)">${l.label}</text>`).join('')}
    </svg>`;
}

function renderChart(exId) {
  chartExId = exId;
  document.querySelectorAll('.chart-pill').forEach(p =>
    p.classList.toggle('active', p.dataset.exid === exId));

  const wrap = document.getElementById('chart-wrap');
  const isCatOrTotal = exId.startsWith('__cat__') || exId === '__total__';

  let points, title, sub, unit;

  if (exId === '__total__') {
    points = getCategoryHistory('Gesamt');
    title  = 'Gesamtentwicklung';
    unit   = 'kg (Ø)';
  } else if (exId.startsWith('__cat__')) {
    const cat = exId.replace('__cat__', '');
    points = getCategoryHistory(cat);
    title  = cat + ' — Ø Maximalgewicht';
    unit   = 'kg (Ø Max)';
  } else {
    points = getExerciseHistory(exId);
    const ex = getAllExercises().find(e => e.id === exId);
    title = ex?.name || exId;
    unit  = 'kg (Ø)';
  }

  if (points.length < 2) {
    wrap.innerHTML = `<div class="chart-empty">
      <p>Mindestens 2 Trainings nötig für <strong>${title}</strong>.</p>
    </div>`;
    return;
  }

  const first = points[0].value, last = points[points.length-1].value;
  const delta = last - first;
  const deltaStr = (delta >= 0 ? '+' : '') + delta.toFixed(1) + ' kg';
  const deltaColor = delta >= 0 ? 'var(--accent)' : '#e24b4a';
  const lastStr = last.toFixed(1) + ' kg';

  wrap.innerHTML = `
    <div class="chart-card">
      <div class="chart-card-header">
        <div>
          <div class="chart-card-title">${title}</div>
          <div class="chart-card-sub">${points.length} Einträge · zuletzt ${lastStr}</div>
        </div>
        <div class="chart-delta" style="color:${deltaColor}">${deltaStr}</div>
      </div>
      <div class="chart-unit-label">${unit}</div>
      ${buildSvgChart(points, unit)}
    </div>`;
}

let chartCatFilter = 'Gesamt';

function buildChartPicker() {
  const picker = document.getElementById('chart-picker');
  if (!picker) return;

  // Find logged categories
  const loggedCats = new Set();
  state.workouts.forEach(wo => {
    wo.exercises.forEach(ex => {
      if (ex.sets.some(s => s.done && parseFloat(s.kg) > 0)) {
        const found = getAllExercises().find(e => e.id === ex.id);
        if (found) loggedCats.add(found.cat);
      }
    });
  });

  if (!loggedCats.size) {
    picker.innerHTML = '';
    document.getElementById('chart-wrap').innerHTML = `
      <div class="chart-empty">
        <div style="font-size:28px;margin-bottom:8px">📊</div>
        <p>Starte dein erstes Training und hake Sätze ab —<br>dann erscheint hier dein Fortschritts-Diagramm.</p>
        <button class="btn-primary" style="margin:14px auto 0;width:auto;padding:10px 20px;font-size:13px"
          onclick="showScreen('plans')">Training starten</button>
      </div>`;
    return;
  }

  // Tabs: Gesamt + each logged category — one tap = show chart directly
  const tabs = ['Gesamt', ...loggedCats].map(cat =>
    `<button class="cat-tab ${cat === chartCatFilter ? 'active' : ''}"
      onclick="setChartCat('${cat}')">${cat}</button>`
  ).join('');

  picker.innerHTML = `<div class="chart-cat-tabs">${tabs}</div>`;
  renderChartForCat(chartCatFilter);
}

function setChartCat(cat) {
  chartCatFilter = cat;
  buildChartPicker();
}

function renderChartForCat(cat) {
  chartExId = cat === 'Gesamt' ? '__total__' : '__cat__' + cat;
  renderChart(chartExId);
}

function refreshProgress() {
  document.getElementById('prog-total').textContent = state.workouts.length;
  document.getElementById('prog-prs').textContent   = Object.keys(state.prs).length;

  const prList = document.getElementById('pr-list');
  const entries = Object.entries(state.prs);
  if (!entries.length) {
    prList.innerHTML = '<p class="empty-hint">Noch keine PRs gesetzt.</p>';
  } else {
    const sorted = entries.sort((a,b)=>new Date(b[1].date)-new Date(a[1].date));
    const showAllP = prList.dataset.showAll === '1';
    const visibleP = showAllP ? sorted : sorted.slice(0, 3);
    prList.innerHTML = visibleP.map(([id,pr]) => {
      const ex = getAllExercises().find(e=>e.id===id);
      const d  = new Date(pr.date).toLocaleDateString('de-DE',{day:'numeric',month:'short'});
      return `<div class="pr-row">
        <div>
          <div class="pr-name">${ex?ex.name:id}<span class="pr-tag">PR</span></div>
          <div class="pr-meta">${d} · ${pr.reps} Wdh</div>
        </div>
        <div><span class="pr-kg">${pr.kg}</span> <span class="pr-unit">kg</span></div>
      </div>`;
    }).join('');
    if (sorted.length > 3) {
      prList.innerHTML += showAllP
        ? `<button class="show-more-btn" onclick="toggleShowAll('pr-list')">▲ Weniger anzeigen</button>`
        : `<button class="show-more-btn" onclick="toggleShowAll('pr-list')">+ ${sorted.length - 3} weitere PRs</button>`;
    }
  }

  const histEl = document.getElementById('prog-history');
  if (!state.workouts.length) {
    histEl.innerHTML = '<p class="empty-hint">Noch keine Workouts.</p>';
  } else {
    const showAllH = histEl.dataset.showAll === '1';
    const visibleH = showAllH ? state.workouts : state.workouts.slice(0, 3);
    histEl.innerHTML = visibleH.map(w => {
      const d = new Date(w.date).toLocaleDateString('de-DE',{day:'numeric',month:'short',weekday:'short'});
      return `<div class="hist-row" id="hist-${w.id}">
        <div><div class="hist-name">${w.name}</div><div class="hist-meta">${d} · ${Math.floor(w.duration/60)} min</div></div>
        <div style="font-size:12px;color:var(--text3)">${calcVol(w).toLocaleString('de-DE')} kg</div>
      </div>`;
    }).join('');
    visibleH.forEach(w => {
      const el = document.getElementById('hist-' + w.id);
      if (el) addLongPressDelete(el, w.id);
    });
    if (state.workouts.length > 3) {
      histEl.innerHTML += showAllH
        ? `<button class="show-more-btn" onclick="toggleShowAll('prog-history')">▲ Weniger anzeigen</button>`
        : `<button class="show-more-btn" onclick="toggleShowAll('prog-history')">+ ${state.workouts.length - 3} weitere anzeigen</button>`;
    }
  }

  buildHeatmap();
  buildChartPicker();
}

function buildHeatmap() {
  const container  = document.getElementById('heatmap');
  container.innerHTML = '';
  const prDates    = new Set(Object.values(state.prs).map(p=>p.date?.split('T')[0]));
  const trainDates = new Set(state.workouts.map(w=>w.date.split('T')[0]));
  for (let i=69;i>=0;i--) {
    const d = new Date(); d.setDate(d.getDate()-i);
    const key  = d.toISOString().split('T')[0];
    const cell = document.createElement('div');
    cell.className='hm-cell'; cell.title=key;
    cell.style.background = prDates.has(key)
      ? 'var(--accent)'
      : trainDates.has(key)
        ? 'rgba(0,232,122,.3)'
        : '#1a1a1a';
    if (!prDates.has(key)&&!trainDates.has(key)) cell.style.border='.5px solid #252525';
    container.appendChild(cell);
  }
}

// ═══════════════════════════════════════════════════════
//  SETTINGS
// ═══════════════════════════════════════════════════════
function loadSettingsUI() {
  const s = state.settings;
  document.getElementById('profile-name').value = s.name||'';
  // Reminder time
  // Update notification status
  if ('Notification' in window) updateNotifUI(Notification.permission);
  const t = s.reminderTime || '17:30';
  const rtEl = document.getElementById('reminder-time');
  const rdEl = document.getElementById('reminder-display');
  const rlEl = document.getElementById('reminder-label');
  if (rtEl) rtEl.value = t;
  if (rdEl) rdEl.textContent = t;
  if (rlEl) rlEl.textContent = t + ' Uhr';
  document.querySelectorAll('.goal-card').forEach(c=>c.classList.toggle('active',c.dataset.goal===s.goal));
  document.querySelectorAll('.day-btn').forEach(b=>b.classList.toggle('active',s.days.includes(parseInt(b.dataset.day))));

  const initials = (s.name||'GT').split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2)||'GT';
  document.getElementById('profile-avatar').textContent = initials;
  document.getElementById('avatar-btn').textContent     = initials;
  if (state.workouts.length) {
    const first = new Date(state.workouts[state.workouts.length-1].date);
    document.getElementById('profile-since').textContent =
      'Dabei seit '+first.toLocaleDateString('de-DE',{month:'long',year:'numeric'});
  }
  renderCustomExercisesList();
}
// ─── Time Picker ─────────────────────────────────────────
function openTimePicker() {
  const t = (state.settings.reminderTime || '17:30').split(':');
  document.getElementById('tp-hours').value = String(parseInt(t[0]||17)).padStart(2,'0');
  document.getElementById('tp-mins').value  = String(parseInt(t[1]||30)).padStart(2,'0');
  openModal('modal-time');
}

function adjustTime(field, delta) {
  const el  = document.getElementById(field === 'h' ? 'tp-hours' : 'tp-mins');
  const max = field === 'h' ? 23 : 59;
  let val = (parseInt(el.value) || 0) + delta;
  if (val < 0)   val = max;
  if (val > max) val = 0;
  el.value = String(val).padStart(2,'0');
}

function clampTimeInput(el, min, max) {
  let v = parseInt(el.value);
  if (isNaN(v)) return;
  if (v < min) v = min;
  if (v > max) v = max;
  el.value = String(v).padStart(2,'0');
}

function confirmTimePicker() {
  const h = String(parseInt(document.getElementById('tp-hours').value)||0).padStart(2,'0');
  const m = String(parseInt(document.getElementById('tp-mins').value)||0).padStart(2,'0');
  const val = h + ':' + m;
  saveReminderTime(val);
  closeModalById('modal-time');
}

function saveReminderTime(val) {
  state.settings.reminderTime = val;
  saveState();
  const display = document.getElementById('reminder-display');
  const label   = document.getElementById('reminder-label');
  if (display) display.textContent = val;
  if (label)   label.textContent   = val + ' Uhr';
  scheduleReminder(val);
}

// ─── Push Notifications ───────────────────────────────────
const SUPABASE_URL  = 'https://vijzeggqkkgahluwodsg.supabase.co';
const SUPABASE_KEY  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpanplZ2dxa2tnYWhsdXdvZHNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI5MDMxOTIsImV4cCI6MjA5ODQ3OTE5Mn0.cAQJ3SZEbjLXEpHi9KKzE7NYciy0CrlNmU6xKSA1GxU';
const VAPID_PUBLIC  = 'BDAkrEtybAo51LVRwHXlfBWgPHqwLE1VWdU2Jhltbj4Hu2gjulrIHMw9H-QaIVTPyatE_19IRxhmZGe33Wsd9Ng';

async function subscribeWebPush(time) {
  if (!('Notification' in window) || !('serviceWorker' in navigator)) return;
  if (Notification.permission !== 'granted') return;

  const reg = await navigator.serviceWorker.ready;

  // Get or create push subscription
  let sub = await reg.pushManager.getSubscription();
  if (!sub) {
    sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC)
    });
  }

  // Save subscription to Supabase
  const subId = localStorage.getItem('gymtracker_sub_id');
  const method = subId ? 'PATCH' : 'POST';
  const url = subId
    ? `${SUPABASE_URL}/rest/v1/push_subscriptions?id=eq.${subId}`
    : `${SUPABASE_URL}/rest/v1/push_subscriptions`;

  const res = await fetch(url, {
    method,
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': 'Bearer ' + SUPABASE_KEY,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({
      subscription: sub.toJSON(),
      reminder_time: time || '17:30',
      reminder_days: state.settings.days || [1,3,4],
      enabled: state.settings.notificationsEnabled
    })
  });

  if (res.ok) {
    const data = await res.json();
    if (!subId && data[0]?.id) {
      localStorage.setItem('gymtracker_sub_id', data[0].id);
    }
    showToast('🔔 Reminder gespeichert!');
  } else {
    console.error('Push sub error:', await res.text());
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64  = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(base64);
  return Uint8Array.from([...raw].map(c => c.charCodeAt(0)));
}

function scheduleReminder(time) {
  if (!('Notification' in window) || !('serviceWorker' in navigator)) return;
  if (Notification.permission !== 'granted') return;
  subscribeWebPush(time).catch(e => console.warn('Push subscribe error:', e));
}

async function sendTestNotification() {
  if (!('Notification' in window)) { showToast('⚠️ Nicht unterstützt'); return; }
  if (Notification.permission !== 'granted') { showToast('❌ Zuerst Reminder aktivieren'); return; }
  const reg = await navigator.serviceWorker.ready;
  reg.showNotification('GymTracker 💪 Test', {
    body: 'Benachrichtigungen funktionieren!',
    icon: './icon-192.png',
    badge: './icon-192.png',
    tag: 'gym-test',
    vibrate: [200, 100, 200],
  });
  showToast('🔔 Test gesendet — schau in deine Notifications!');
}

function requestNotificationPermission() {
  if (!('Notification' in window)) {
    showToast('⚠️ Nicht unterstützt'); return;
  }
  if (Notification.permission === 'granted') {
    showToast('🔔 Bereits aktiv!');
    updateNotifUI('granted'); return;
  }
  Notification.requestPermission().then(p => {
    updateNotifUI(p);
    if (p === 'granted') {
      showToast('🔔 Aktiviert!');
      scheduleReminder(state.settings.reminderTime || '17:30');
    } else {
      showToast('❌ In Browser-Einstellungen erlauben');
    }
  });
}

function toggleNotification() {
  if (!('Notification' in window)) { showToast('⚠️ Nicht unterstützt'); return; }

  if (state.settings.notificationsEnabled) {
    // Turn OFF
    state.settings.notificationsEnabled = false;
    saveState();
    updateNotifUI(Notification.permission);
    // Tell Supabase to disable
    const subId = localStorage.getItem('gymtracker_sub_id');
    if (subId) {
      fetch(`${SUPABASE_URL}/rest/v1/push_subscriptions?id=eq.${subId}`, {
        method: 'PATCH',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': 'Bearer ' + SUPABASE_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ enabled: false })
      }).catch(() => {});
    }
    showToast('🔕 Reminder deaktiviert');
    return;
  }

  // Turn ON
  if (Notification.permission === 'denied') {
    showToast('❌ Blockiert — in Browser-Einstellungen erlauben');
    return;
  }
  if (Notification.permission === 'granted') {
    state.settings.notificationsEnabled = true;
    saveState();
    updateNotifUI('granted');
    scheduleReminder(state.settings.reminderTime || '17:30');
    showToast('🔔 Reminder aktiviert!');
  } else {
    Notification.requestPermission().then(p => {
      if (p === 'granted') {
        state.settings.notificationsEnabled = true;
        saveState();
        updateNotifUI('granted');
        scheduleReminder(state.settings.reminderTime || '17:30');
        showToast('🔔 Reminder aktiviert!');
      } else {
        showToast('❌ Erlaubnis verweigert');
      }
    });
  }
}

function updateNotifUI(permission) {
  const toggle = document.getElementById('notif-toggle');
  const status = document.getElementById('notif-status');
  if (!toggle || !status) return;
  const thumb = toggle.querySelector('.toggle-thumb');
  // Green only if BOTH browser permission granted AND user enabled it
  const isOn = permission === 'granted' && state.settings.notificationsEnabled === true;
  toggle.classList.toggle('on', isOn);
  if (thumb) thumb.style.left = isOn ? '22px' : '3px';
  if (isOn) {
    status.textContent = 'Aktiv · ' + (state.settings.reminderTime || '17:30') + ' Uhr';
  } else if (permission === 'denied') {
    status.textContent = 'Blockiert — in Browser-Einstellungen ändern';
  } else if (permission === 'granted') {
    status.textContent = 'Deaktiviert — tippen zum Aktivieren';
  } else {
    status.textContent = 'Tippen zum Aktivieren';
  }
}

// ── Custom Exercises Management ─────────────────────────
function renderCustomExercisesList() {
  const wrap = document.getElementById('custom-ex-manage-list');
  if (!wrap) return;
  const exs = state.customExercises || [];
  if (!exs.length) {
    wrap.innerHTML = '<p class="empty-hint" style="padding:0">Noch keine eigenen Übungen.</p>';
    return;
  }
  wrap.innerHTML = exs.map((ex, i) => `
    <div style="display:flex;align-items:center;gap:10px;background:var(--bg3);border-radius:10px;padding:10px 12px;margin-bottom:6px">
      <span style="font-size:18px">${ex.icon}</span>
      <div style="flex:1">
        <div style="font-size:13px;font-weight:600;color:var(--text)">${ex.name}</div>
        <div style="font-size:11px;color:var(--text3)">${ex.muscle} · ${ex.cat}</div>
      </div>
      <button onclick="deleteCustomExercise(${i})"
        style="background:rgba(226,75,74,.1);border:.5px solid rgba(226,75,74,.3);color:var(--red);border-radius:8px;padding:4px 10px;font-size:12px;cursor:pointer;font-family:inherit">
        ×
      </button>
    </div>`).join('');
}

function deleteCustomExercise(idx) {
  showConfirm({
    icon: '🗑️', title: 'Übung löschen',
    msg: `"${state.customExercises[idx].name}" wird gelöscht.`,
    okLabel: 'Löschen', okColor: 'var(--red)',
    onOk: () => {
      state.customExercises.splice(idx, 1);
      saveState();
      renderCustomExercisesList();
      showToast('🗑️ Übung gelöscht');
    }
  });
}

function selectGoal(el) {
  document.querySelectorAll('.goal-card').forEach(c=>c.classList.remove('active'));
  el.classList.add('active'); state.settings.goal=el.dataset.goal; saveState();
}
function toggleDay(el) {
  el.classList.toggle('active');
  const day=parseInt(el.dataset.day), idx=state.settings.days.indexOf(day);
  if(idx>-1) state.settings.days.splice(idx,1); else state.settings.days.push(day);
  saveState();
}

function toggleSwitch(el) {
  el.classList.toggle('on');
  el.querySelector('.toggle-thumb').style.left = el.classList.contains('on') ? '22px' : '3px';
}
document.getElementById('profile-name').addEventListener('input', function() {
  state.settings.name = this.value; saveState();
  const i=(this.value.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2))||'GT';
  document.getElementById('profile-avatar').textContent = i;
  document.getElementById('avatar-btn').textContent     = i;
  document.getElementById('greeting-name').textContent  = this.value.split(' ')[0]||'Sportler';
});

// ═══════════════════════════════════════════════════════
//  SCREEN NAVIGATION
// ═══════════════════════════════════════════════════════
const NAV_SCREENS = ['home','plans','progress','settings'];

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
    s.scrollTop = 0;  // always scroll to top
  });
  const screen = document.getElementById('screen-'+id);
  screen.classList.add('active');
  screen.scrollTop = 0;
  document.querySelectorAll('.nav-item').forEach(n=>
    n.classList.toggle('active', n.dataset.screen===id));
  if (id==='home')        refreshDashboard();
  if (id==='plans')       renderPlans();
  if (id==='progress')    refreshProgress();
  if (id==='settings')    loadSettingsUI();
  if (id==='plan-detail') screen.scrollTop = 0;
}

// ═══════════════════════════════════════════════════════
//  MODALS
// ═══════════════════════════════════════════════════════
function openModal(id) {
  const el = document.getElementById(id);
  el.classList.add('open');
  const box = el.querySelector('.modal-box');
  if (box) {
    box.scrollTop = 0;
    addSwipeDownToClose(box, () => closeModalById(id));
  }
  // When keyboard opens, scroll search input into view
  const searchInput = el.querySelector('.search-input');
  if (searchInput) {
    searchInput.addEventListener('focus', () => {
      setTimeout(() => {
        searchInput.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Also resize modal to sit above keyboard
        const box = el.querySelector('.modal-box');
        if (box) box.style.maxHeight = '55vh';
      }, 300);
    }, { once: false });
    searchInput.addEventListener('blur', () => {
      const box = el.querySelector('.modal-box');
      if (box) box.style.maxHeight = '';
    }, { once: false });
  }
}

function addSwipeDownToClose(el, onClose) {
  let startY = 0;
  let isDragging = false;
  el.addEventListener('touchstart', e => {
    startY = e.touches[0].clientY;
    isDragging = true;
  }, { passive: true });
  el.addEventListener('touchend', e => {
    if (!isDragging) return;
    const dy = e.changedTouches[0].clientY - startY;
    isDragging = false;
    // Swipe down > 80px and modal is scrolled to top → close
    if (dy > 80 && el.scrollTop <= 5) onClose();
  }, { passive: true });
}
function closeModalById(id, e) {
  if (!e||e.target===document.getElementById(id))
    document.getElementById(id).classList.remove('open');
}
function selectEmoji(el) {
  el.closest('.emoji-row').querySelectorAll('.emoji-opt').forEach(e=>e.classList.remove('active'));
  el.classList.add('active');
}

// ═══════════════════════════════════════════════════════
//  DATA
// ═══════════════════════════════════════════════════════
function exportData() {
  const blob = new Blob([JSON.stringify(state,null,2)],{type:'application/json'});
  const a = document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download='gymtracker_'+new Date().toISOString().split('T')[0]+'.json';
  a.click(); showToast('📤 Export gestartet!');
}
function clearData() {
  showConfirm({
    icon: '💣', title: 'Alle Daten löschen',
    msg: 'Workouts, PRs, Pläne — alles wird gelöscht. Nicht rückgängig machbar.',
    okLabel: 'Alles löschen', okColor: 'var(--red)',
    onOk: () => {
      localStorage.removeItem(STORAGE_KEY);
      state={workouts:[],prs:{},plans:[],settings:{goal:'muscle',days:[1,3,4],name:'Sportler'}};
      refreshDashboard(); refreshProgress(); loadSettingsUI(); showToast('🗑️ Daten gelöscht');
    }
  });
  return;
  localStorage.removeItem(STORAGE_KEY);
  state={workouts:[],prs:{},plans:[],settings:{goal:'muscle',days:[1,3,4],unit:'kg',name:'Sportler'}};
  refreshDashboard(); refreshProgress(); loadSettingsUI(); showToast('🗑️ Daten gelöscht');
}

function toggleShowAll(elId) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.dataset.showAll = el.dataset.showAll === '1' ? '0' : '1';
  // re-render the relevant section
  if (elId === 'history-list') refreshDashboard();
  else refreshProgress();
}

// ═══════════════════════════════════════════════════════
//  TOAST & GREETING
// ═══════════════════════════════════════════════════════
let toastTimer=null;
function showToast(msg) {
  const t=document.getElementById('toast');
  t.textContent=msg; t.style.opacity='1';
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>{ t.style.opacity='0'; },2800);
}
function setGreeting() {
  const h=new Date().getHours();
  document.getElementById('greeting-sub').textContent =
    h<12?'Guten Morgen 👋':h<18?'Guten Tag 👋':'Guten Abend 👋';
  document.getElementById('greeting-name').textContent =
    (state.settings.name||'Sportler').split(' ')[0];
  // Fix initials on every load
  const name = state.settings.name || 'GT';
  const initials = name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2) || 'GT';
  const avatarBtn = document.getElementById('avatar-btn');
  if (avatarBtn) avatarBtn.textContent = initials;
}

// ═══════════════════════════════════════════════════════
//  SERVICE WORKER
// ═══════════════════════════════════════════════════════
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then(reg => {
      reg.update();
      reg.addEventListener('updatefound', () => {
        const newSW = reg.installing;
        newSW.addEventListener('statechange', () => {
          if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
            showUpdateBanner();
          }
        });
      });
    }).catch(e => console.warn('SW failed', e));
    navigator.serviceWorker.addEventListener('controllerchange', () => window.location.reload());
  });
}

function showUpdateBanner() {
  const b = document.getElementById('update-banner');
  if (b) b.classList.remove('hidden');
}

function applyUpdate() {
  document.getElementById('update-banner')?.classList.add('hidden');
  navigator.serviceWorker.getRegistration().then(reg => {
    if (reg?.waiting) reg.waiting.postMessage({ type: 'SKIP_WAITING' });
  });
}

async function checkForUpdates() {
  if (!('serviceWorker' in navigator)) { showToast('⚠️ Nicht unterstützt'); return; }
  showToast('🔄 Suche nach Updates...');
  try {
    const reg = await navigator.serviceWorker.getRegistration();
    if (!reg) { showToast('⚠️ Kein Service Worker aktiv'); return; }
    await reg.update();
    if (reg.waiting) {
      showUpdateBanner();
      showToast('🆕 Update gefunden!');
    } else {
      showToast('✅ App ist bereits aktuell!');
    }
  } catch(e) {
    showToast('❌ Update-Suche fehlgeschlagen');
  }
}


// ═══════════════════════════════════════════════════════
//  SWIPE NAVIGATION
// ═══════════════════════════════════════════════════════
const MAIN_SCREENS = ['home', 'plans', 'progress', 'settings'];
let swipeStartX = 0;
let swipeStartY = 0;
let swipeStartTime = 0;
const SWIPE_MIN_X   = 35;   // min horizontal distance px
const SWIPE_MAX_Y   = 100;  // max vertical drift px
const SWIPE_MAX_MS  = 600;  // max duration ms
const SWIPE_EDGE    = 40;   // ignore swipes starting too close to edge (scrollbars)

// Keyboard resize — keep modal above keyboard
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', () => {
    const openModal = document.querySelector('.modal-overlay.open');
    if (!openModal) return;
    const box = openModal.querySelector('.modal-box');
    if (!box) return;
    const active = document.activeElement;
    const isTyping = active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA');
    if (isTyping) {
      // Keyboard is open — shrink modal so it fits above keyboard
      const kbHeight = window.innerHeight - window.visualViewport.height;
      box.style.maxHeight = `calc(90vh - ${kbHeight}px)`;
      // Scroll active input into view inside modal
      setTimeout(() => active.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
    } else {
      box.style.maxHeight = '';
    }
  });
}

// Resync timer when app comes back from background
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && timerRunning) {
    // Recalculate remaining time
    timerSecs = getRemainingTimerSecs();
    if (timerSecs <= 0) {
      resetTimer();
      showSetDoneToast();
    } else {
      updateTimerDisplay();
      updateTimerCircle();
    }
  }
});

function initSwipe() {
  const app = document.getElementById('app');

  app.addEventListener('touchstart', e => {
    const t = e.touches[0];
    swipeStartX    = t.clientX;
    swipeStartY    = t.clientY;
    swipeStartTime = Date.now();
  }, { passive: true });

  app.addEventListener('touchend', e => {
    const t = e.changedTouches[0];
    const dx   = t.clientX - swipeStartX;
    const dy   = t.clientY - swipeStartY;
    const dt   = Date.now() - swipeStartTime;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    // Must be fast enough, horizontal enough, not from edge
    if (dt > SWIPE_MAX_MS) return;
    if (absX < SWIPE_MIN_X) return;
    if (absY > SWIPE_MAX_Y) return;
    if (absX < absY * 1.2) return; // more vertical than horizontal
    // Ignore if touch started on an interactive element (button, input, select)
    const target = document.elementFromPoint(swipeStartX, swipeStartY);
    if (target && target.closest('button, input, select, textarea, .set-check, .set-remove-sm, .toggle, .timer-btn, .preset-btn, .nav-item, .modal-overlay, .queue-toggle-tab')) return;
    // Only navigate on main screens
    const activeScreen = document.querySelector('.screen.active');
    if (!activeScreen) return;
    const screenId = activeScreen.id.replace('screen-', '');
    const idx = MAIN_SCREENS.indexOf(screenId);
    if (idx === -1) return;

    if (dx < 0) {
      // Swipe left → next screen
      if (idx < MAIN_SCREENS.length - 1) showScreen(MAIN_SCREENS[idx + 1]);
    } else {
      // Swipe right → previous screen
      if (idx > 0) showScreen(MAIN_SCREENS[idx - 1]);
    }
  }, { passive: true });
}

// ═══════════════════════════════════════════════════════
//  DEMO DATA (for testing — call seedDemoData() in console)
// ═══════════════════════════════════════════════════════
function seedDemoData() {
  const exercises = [
    {id:'bench', name:'Bankdrücken'},
    {id:'squat', name:'Kniebeuge'},
    {id:'ohp',   name:'Schulterdrücken'},
  ];
  const weights = {
    bench: [70,72,75,75,77,80,80,82,85],
    squat: [90,95,100,100,105,107,110,112,115],
    ohp:   [45,47,50,50,52,55,55,57,60],
  };
  state.workouts = [];
  for (let i = 8; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i * 4);
    const wEx = exercises.map(ex => ({
      id: ex.id, name: ex.name,
      sets: [{ kg: String(weights[ex.id][8-i]), reps: '8', done: true }]
    }));
    state.workouts.push({
      id: Date.now() + i,
      name: 'Push Day',
      date: date.toISOString(),
      duration: 3000,
      exercises: wEx
    });
  }
  state.prs = {
    bench: { kg:85, reps:8, date: new Date().toISOString() },
    squat: { kg:115, reps:8, date: new Date().toISOString() },
    ohp:   { kg:60,  reps:8, date: new Date().toISOString() },
  };
  saveState();
  refreshDashboard();
  refreshProgress();
  showToast('✅ Demo-Daten geladen!');
}

// ═══════════════════════════════════════════════════════
//  BACK BUTTON / DOUBLE-TAP TO EXIT
// ═══════════════════════════════════════════════════════
let lastBackPress = 0;

// Android hardware back button
window.addEventListener('popstate', () => {
  const now = Date.now();
  if (now - lastBackPress < 2000) {
    // Second press within 2s → exit
    window.history.go(-1);
  } else {
    lastBackPress = now;
    showToast('⬅ Nochmal drücken zum Beenden');
    window.history.pushState(null, '', window.location.href);
  }
});

// Push initial state so popstate fires on back press
window.history.pushState(null, '', window.location.href);

// ═══════════════════════════════════════════════════════
//  ONBOARDING
// ═══════════════════════════════════════════════════════
let obSelectedPlanId = 'ppl';
let obSelectedGoal   = 'muscle';

function checkOnboarding() {
  if (state.settings.onboardingDone) return;
  const planList = document.getElementById('ob-plan-list');
  if (planList) {
    // Only show the 3 main plans in onboarding (not Bro Split)
    const obPlans = DEFAULT_PLANS.filter(p => ['ppl','ul','fb'].includes(p.id));
    planList.innerHTML = obPlans.map(p => `
      <div class="ob-plan-card ${p.id === 'ppl' ? 'selected' : ''}"
        id="ob-plan-${p.id}" onclick="obSelectPlan('${p.id}',this)">
        <span class="ob-plan-icon">${p.icon}</span>
        <div>
          <div class="ob-plan-name">${p.name}</div>
          <div class="ob-plan-sub">${p.workouts.length} Workouts</div>
        </div>
      </div>`).join('');
  }
  document.getElementById('onboarding').classList.remove('hidden');
}

function obSelectGoal(el) {
  document.querySelectorAll('#ob-step-2 .goal-card').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  obSelectedGoal = el.dataset.goal;
}

function obSelectPlan(id, el) {
  obSelectedPlanId = id;
  document.querySelectorAll('.ob-plan-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
}

function obNext(step) {
  if (step === 1) {
    const name = document.getElementById('ob-name').value.trim();
    if (!name) { showToast('Bitte deinen Namen eingeben'); return; }
    state.settings.name = name;
  }
  document.getElementById('ob-step-' + step).classList.add('hidden');
  document.getElementById('ob-step-' + (step + 1)).classList.remove('hidden');
  document.querySelectorAll('.ob-dot').forEach((d, i) => d.classList.toggle('active', i === step));
}

function obFinish() {
  state.settings.goal           = obSelectedGoal;
  state.settings.onboardingDone = true;
  if (obSelectedPlanId !== 'custom') {
    state.lastUsedPlanId = obSelectedPlanId;
  }
  saveState();
  document.getElementById('onboarding').classList.add('hidden');
  setGreeting();
  refreshDashboard();
  if (obSelectedPlanId === 'custom') {
    showToast("Willkommen! Erstelle deinen eigenen Plan unter Pläne.");
    setTimeout(() => showScreen('plans'), 800);
  } else {
    showToast("Willkommen! Viel Erfolg beim Training!");
  }
}

// ═══════════════════════════════════════════════════════
//  NEXT WORKOUT SUGGESTION
// ═══════════════════════════════════════════════════════
function getNextWorkoutSuggestion() {
  if (!state.workouts.length || !state.lastUsedPlanId) return null;
  const plan = [...DEFAULT_PLANS, ...state.plans].find(p => p.id === state.lastUsedPlanId);
  if (!plan || !plan.workouts.length) return null;
  const lastWo  = state.workouts[0];
  const lastIdx = plan.workouts.findIndex(w => w.name === lastWo.name);
  const nextIdx = lastIdx >= 0 ? (lastIdx + 1) % plan.workouts.length : 0;
  return { plan, workout: plan.workouts[nextIdx] };
}

// ═══════════════════════════════════════════════════════
//  LONG PRESS TO DELETE WORKOUT
// ═══════════════════════════════════════════════════════
let longPressTimer = null;

function addLongPressDelete(el, workoutId) {
  const startPress = () => {
    longPressTimer = setTimeout(() => {
      showConfirm({
        icon: '🗑️', title: 'Training löschen',
        msg: 'Dieses Training wird unwiderruflich gelöscht.',
        okLabel: 'Löschen', okColor: 'var(--red)',
        onOk: () => {
          state.workouts = state.workouts.filter(w => w.id !== workoutId);
          saveState();
          refreshDashboard();
          refreshProgress();
          showToast('Training gelöscht');
        }
      });
    }, 600);
  };
  const cancelPress = () => clearTimeout(longPressTimer);
  // Touch (mobile)
  el.addEventListener('touchstart', startPress, { passive: true });
  el.addEventListener('touchend',   cancelPress, { passive: true });
  el.addEventListener('touchmove',  cancelPress, { passive: true });
  // Mouse (PC)
  el.addEventListener('mousedown', startPress);
  el.addEventListener('mouseup',   cancelPress);
  el.addEventListener('mouseleave',cancelPress);
}

// ═══════════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════════
loadState();
setGreeting();
refreshDashboard();
checkOnboarding();
initSwipe();
