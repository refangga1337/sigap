/* SiGap — manajemen stok toko. Vanilla JS, offline-first, no build. */
'use strict';
const APP_VERSION = '2.1.0';

/* ---------- Icons ---------- */
const ICON_PATHS = {
  boxes:'M3 8.4 12 3l9 5.4V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z|M3 8.4 12 13.8l9-5.4|M12 13.8V22',
  bar:'M3 3v18h18|M7 15l4-5 4 3 5-7',
  scan:'M3 7V5a2 2 0 0 1 2-2h2|M17 3h2a2 2 0 0 1 2 2v2|M21 17v2a2 2 0 0 1-2 2h-2|M7 21H5a2 2 0 0 1-2-2v-2|M7 12h10',
  cart:'M6 6h15l-1.8 9.4a2 2 0 0 1-2 1.6H9.2a2 2 0 0 1-2-1.6L5.2 3H2|8.5 21a1 1 0 1 0 .001 0|17.5 21a1 1 0 1 0 .001 0',
  grid:'M3 3h7v7H3z|M14 3h7v7h-7z|M14 14h7v7h-7z|M3 14h7v7H3z',
  settings:'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z|M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 8.9 19a1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 5 8.9a1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9.5a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z',
  plus:'M12 5v14|M5 12h14',
  minus:'M5 12h14',
  search:'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z|m21 21-4.3-4.3',
  alert:'M12 9v4|M12 17h.01|M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z',
  clock:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z|M12 6v6l4 2',
  calendar:'M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z|M16 1v4|M8 1v4|M3 9h18',
  truck:'M1 3h15v13H1z|M16 8h4l3 4v5h-7z|5.5 21a2 2 0 1 0 .001 0|18.5 21a2 2 0 1 0 .001 0',
  users:'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2|M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z|M23 21v-2a4 4 0 0 0-3-3.9|M16 3.1a4 4 0 0 1 0 7.8',
  tag:'M20.6 13.4 12 22l-9-9V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z|7 7h.01',
  store:'M3 9l1.5-5h15L21 9|M3 9v2a3 3 0 0 0 6 0V9|M9 9v2a3 3 0 0 0 6 0V9|M15 9v2a3 3 0 0 0 6 0V9|M5 13v8h14v-8|M9 21v-5h6v5',
  arrowLeft:'M19 12H5|M12 19l-7-7 7-7',
  arrowRight:'M5 12h14|M12 5l7 7-7 7',
  check:'M20 6 9 17l-5-5',
  x:'M18 6 6 18|M6 6l12 12',
  trash:'M3 6h18|M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6|M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2',
  edit:'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7|M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z',
  upload:'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4|M17 8l-5-5-5 5|M12 3v12',
  download:'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4|M7 10l5 5 5-5|M12 15V3',
  file:'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z|M14 2v6h6|M8 13h8|M8 17h5',
  fileplus:'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z|M14 2v6h6|M12 18v-6|M9 15h6',
  truckin:'M1 3h15v13H1z|M16 8h4l3 4v5h-7z|5.5 21a2 2 0 1 0 .001 0',
  printer:'M6 9V2h12v7|M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2|M6 14h12v8H6z',
  banknote:'M2 6h20v12H2z|M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z|M6 10v0|M18 14v0',
  trending:'M23 6l-9.5 9.5-5-5L1 18|M17 6h6v6',
  trendingDown:'M23 18l-9.5-9.5-5 5L1 6|M17 18h6v-6',
  package:'M16.5 9.4 7.5 4.2|M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z|M3.3 7 12 12l8.7-5|M12 22V12',
  camera:'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z|M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
  xcircle:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z|M15 9l-6 6|M9 9l6 6',
  checkcircle:'M22 11.1V12a10 10 0 1 1-5.9-9.1|M22 4 12 14.01l-3-3',
  alertcircle:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z|M12 8v4|M12 16h.01',
  logout:'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4|M16 17l5-5-5-5|M21 12H9',
  filter:'M22 3H2l8 9.5V19l4 2v-8.5z',
  sliders:'M4 21v-7|M4 10V3|M12 21v-9|M12 8V3|M20 21v-5|M20 12V3|M1 14h6|M9 8h6|M17 16h6',
  user:'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2|M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
  lock:'M5 11h14v11H5z|M8 11V7a4 4 0 0 1 8 0v4',
  barcode:'M3 5v14|M6 5v14|M9 5v14|M13 5v14|M15 5v14|M17 5v14|M20 5v14|M22 5v14',
  chartdown:'M3 3v18h18|M21 9l-5 5-4-4-4 4',
  refresh:'M23 4v6h-6|M1 20v-6h6|M3.5 9A9 9 0 0 1 18.5 5L23 10|M1 14l4.5 5A9 9 0 0 0 20.5 15',
  wallet:'M20 12V8H6a2 2 0 0 1 0-4h12v4|M4 6v12a2 2 0 0 0 2 2h14v-5|M18 12a2 2 0 1 0 0 4h4v-4z',
  shuffle:'M16 3h5v5|M4 20 21 3|M21 16v5h-5|M15 15l6 6|M4 4l5 5',
  copy:'M20 9H11a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2Z|M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1',
  megaphone:'M3 11v2a1 1 0 0 0 1 1h2l4 4V6L6 10H4a1 1 0 0 0-1 1Z|M14 8a5 5 0 0 1 0 8|M17 5a9 9 0 0 1 0 14',
  eye:'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z|M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  dots:'M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z|M19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z|M5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z',
  home:'M3 9.5 12 3l9 6.5V21H3z|M9 21v-8h6v8',
  history:'M3 12a9 9 0 1 0 3-6.7|M3 3v6h6|M12 7v5l3 2',
  duplicate:'M8 8h12v12H8z|M4 16V4h12',
  percent:'M19 5 5 19|M6.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5|M17.5 20a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5',
  receipt:'M5 2h14v20l-3-2-2 2-2-2-2 2-2-2-3 2z|M9 7h6|M9 11h6|M9 15h4',
  pinch:'M2 9a3 3 0 0 1 3-3h0a2 2 0 0 1 2 2v2|M14 8V6a2 2 0 0 1 4 0v7a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6V9a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2',
  menu:'M4 6h16|M4 12h16|M4 18h16',
};
function icon(name, cls){
  const d = ICON_PATHS[name] || ICON_PATHS.boxes;
  const paths = d.split('|').map(p=>`<path d="${p}"/>`).join('');
  return `<svg class="${cls||''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
}

/* ---------- Utils ---------- */
const $ = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>[...r.querySelectorAll(s)];
const esc = s => String(s==null?'':s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const debounce=(f,ms=300)=>{let t;return(...a)=>{clearTimeout(t);t=setTimeout(()=>f(...a),ms)}};
const uid = ()=> Date.now().toString(36)+Math.random().toString(36).slice(2,8);
const round2 = n => Math.round((Number(n)||0)*100)/100;
function rupiah(n){
  n = Math.round(Number(n)||0);
  const sign = n<0?'-':''; n=Math.abs(n);
  return sign+'Rp '+n.toLocaleString('id-ID');
}
function fmtNum(n){ return (Number(n)||0).toLocaleString('id-ID'); }
function fmtDate(ts){
  const d = new Date(ts||Date.now());
  return d.toLocaleDateString('id-ID',{day:'2-digit',month:'short',year:'numeric'});
}
function fmtDateTime(ts){ return new Date(ts||Date.now()).toLocaleString('id-ID',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'}); }
function todayKey(t=Date.now()){ return new Date(t).toISOString().slice(0,10); }
function dayStart(t=Date.now()){ const d=new Date(t); d.setHours(0,0,0,0); return d.getTime(); }
function plusDays(ts,n){ const d=new Date(ts); d.setDate(d.getDate()+n); return d.getTime(); }

/* ---------- Storage ---------- */
const KEY='sigap.db.v2';
const load = ()=>{ try{ return JSON.parse(localStorage.getItem(KEY))||null }catch(e){ return null } };
const save = db => localStorage.setItem(KEY, JSON.stringify(db));
const clone = o => JSON.parse(JSON.stringify(o));
let DB = load();
let ROUTE = { view:'dashboard', params:{} };
let CUR_BIZ = (DB&&DB.session&&DB.session.init && DB.settings && DB.settings.currentBiz) || null;

/* ---------- Seed ---------- */
function seedDb(){
  const now = Date.now();
  const bizId = 'bz_toko';
  const catM = 'cat_minuman', catS = 'cat_sembako', catK = 'cat_kopi';
  const p1='pr_teh', p2='pr_beras', p3='pr_kopi', p4='pr_gula';
  const sup1='sp_utama';
  return {
    meta:{version:2,createdAt:now},
    settings:{currentBiz:bizId, theme:'dark', lowstockAlert:true, expiryAlert:true, profitAlert:false},
    biz:{
      [bizId]:{id:bizId,name:'Toko Berkah Jaya',owner:'Refangga',address:'Jl. Merdeka No. 12',phone:'08123456789',
        currency:'IDR',symbol:'Rp',taxPct:0,priceMode:'markup',opnameAt:now,receiptHeader:'Toko Berkah Jaya',receiptFooter:'Terima kasih telah berbelanja',cashierName:'Kasir 1'}
    },
    cats:{
      [catM]:{id:catM,bizId,name:'Minuman'},[catS]:{id:catS,bizId,name:'Sembako'},[catK]:{id:catK,bizId,name:'Kopi'}
    },
    products:{
      [p1]:{id:p1,bizId,name:'Teh Botol 350ml',catId:catM,barcode:'8991234567890',price:5000,cost:3500,minStock:10,stock:40,unit:'pcs',uom:'pcs',sellBy:'pcs',expiryTracks:[],active:true,createdAt:now},
      [p2]:{id:p2,bizId,name:'Beras 5kg',catId:catS,barcode:'8991234500017',price:72000,cost:65000,minStock:4,stock:12,unit:'karung',uom:'karung',sellBy:'karung',expiryTracks:[],active:true,createdAt:now},
      [p3]:{id:p3,bizId,name:'Kopi Sachet',catId:catK,barcode:'8991234500024',price:2500,cost:1600,minStock:15,stock:6,unit:'sachet',uom:'sachet',sellBy:'sachet',expiryTracks:[],active:true,createdAt:now},
      [p4]:{id:p4,bizId,name:'Gula Pasir 1kg',catId:catS,barcode:'8991234500031',price:16000,cost:14000,minStock:6,stock:20,unit:'pack',uom:'pack',sellBy:'pack',expiryTracks:[],active:true,createdAt:now}
    },
    movements:[
      {id:uid(),bizId,type:'in',productId:p1,qty:40,ref:'stok awal',by:'owner',at:now-864e5,balance:40,cost:3500},
      {id:uid(),bizId,type:'out',productId:p1,qty:0,ref:'seed',by:'owner',at:now-864e5},
      {id:uid(),bizId,type:'in',productId:p2,qty:12,ref:'stok awal',by:'owner',at:now-864e5,balance:12,cost:65000},
      {id:uid(),bizId,type:'in',productId:p3,qty:6,ref:'stok awal',by:'owner',at:now-864e5,balance:6,cost:1600},
      {id:uid(),bizId,type:'in',productId:p4,qty:20,ref:'stok awal',by:'owner',at:now-864e5,balance:20,cost:14000}
    ],
    sales:[], purchases:[], suppliers:{ [sup1]:{id:sup1,bizId,name:'PT Sumber Rejeki',contact:'Budi',phone:'08129876543',address:'Jakarta',terms:'30 hari'} },
    stocktakes:{}, cashiers:{}, opnames:{}, audits:[], expenses:[]
  };
}

/* ---------- Session helpers ---------- */
const bizKey = id => DB.settings.currentBiz;
function curBiz(){ const id = CUR_BIZ || (DB&&DB.settings&&DB.settings.currentBiz); return DB.biz[id]; }
function bizProducts(bid){ return Object.values(DB.products).filter(p=>p.bizId===bid); }
function bizMoves(bid){ return Object.values(DB.movements).filter(m=>m.bizId===bid); }
function logAudit(action, detail){ DB.audits.unshift({id:uid(),at:Date.now(),user:'owner',action,detail}); DB.audits=DB.audits.slice(0,400); }
function notify(kind,msg){ const t=$('#toast'); t.textContent=msg; t.className='show '+kind; clearTimeout(notify._t); notify._t=setTimeout(()=>t.className='',2600); }

/* ---------- Auth (PIN) ---------- */
async function sha256(s){
  if(crypto.subtle){ const b=await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)); return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('') }
  let h=0; for(let i=0;i<s.length;i++){ h=((h<<5)-h+s.charCodeAt(i))|0 } return 'fb'+Math.abs(h).toString(16);
}
const PIN_TRIES_KEY='sigap.pin.tries';
function pinTries(){ try{ return JSON.parse(localStorage.getItem(PIN_TRIES_KEY))||{n:0,lock:0} }catch(e){ return {n:0,lock:0} } }
function setPinTries(o){ localStorage.setItem(PIN_TRIES_KEY, JSON.stringify(o)) }

function authGate(){
  const loggedIn = DB.session && DB.session.init;
  if(DB.settings.pin && !loggedIn){
    return `<div class="wrap" style="padding-top:12vh">
      <div class="center" style="margin-bottom:22px">
        <div class="brand" style="justify-content:center;font-size:24px"><span class="logo">${icon('lock')}</span> SiGap</div>
        <p class="muted" style="margin-top:8px">Masukkan PIN untuk membuka</p>
      </div>
      <div class="card" style="max-width:360px;margin:0 auto">
        <div class="field"><label class="lab">PIN</label>
          <input id="pinInput" class="input mono" type="password" inputmode="numeric" maxlength="8" autocomplete="off" style="font-size:22px;text-align:center;letter-spacing:.35em" autofocus>
          <div id="pinErr" class="err hidden"></div></div>
        <button class="btn btn-primary btn-block" id="pinGo">Buka</button>
        ${DB.settings.pinHint?`<p class="help center" style="margin-top:10px">Hint: ${esc(DB.settings.pinHint)}</p>`:''}
        <button class="btn btn-ghost btn-block" style="margin-top:8px" id="pinForgot">Lupa PIN</button>
      </div>
    </div>`;
  }
  if(!DB.session||!DB.session.init) return VIEWS.onboarding();
  return null;
}
function bindAuthGate(){
  const inp=$('#pinInput'); if(!inp) return;
  const submit=async()=>{
    const t=pinTries();
    if(t.lock && Date.now()<t.lock){ const s=Math.ceil((t.lock-Date.now())/1000); $('#pinErr').textContent=`Terkunci, coba lagi ${s}s`; $('#pinErr').classList.remove('hidden'); return }
    const h=await sha256('pin:'+inp.value);
    if(h===DB.settings.pin){
      setPinTries({n:0,lock:0}); DB.session={init:true,at:Date.now()}; save(DB); render();
    } else {
      const n=t.n+1; const lock = n>=5 ? Date.now()+30000 : 0;
      setPinTries({n: n>=5?0:n, lock});
      $('#pinErr').textContent = n>=5?'Salah 5x. Terkunci 30 detik.':'PIN salah'; $('#pinErr').classList.remove('hidden');
      inp.value='';
    }
  };
  inp.addEventListener('keydown',e=>{ if(e.key==='Enter') submit() });
  $('#pinGo').onclick=submit;
  $('#pinForgot').onclick=async()=>{
    const ph=await sha256('pin:'+prompt('Isi PIN baru (lupa PIN):')||'');
    if(ph && ph!==await sha256('pin:')){ DB.settings.pin=ph; DB.settings.pinHint=''; save(DB); notify('ok','PIN direset'); render() }
  };
  setTimeout(()=>inp.focus(),80);
}
function lockNow(){ if(DB.settings.pin){ DB.session=null; save(DB); render(); notify('ok','Terkunci') } }

/* ---------- App shell ---------- */
const TABS=[
  ['dashboard','Beranda','home'],
  ['products','Stok','boxes'],
  ['scan','Scan','scan'],
  ['reports','Laporan','bar'],
  ['more','Lainnya','grid'],
];
let CURRENT_TAB='dashboard';

function shell(content, opts={}){
  const badgeCount = lowStockList().length;
  return `<div class="topbar"><div class="row">
      <div class="brand"><span class="logo">${icon('boxes')}</span> SiGap</div>
      <div class="spacer"></div>
      <button class="iconbtn" id="topSearch" aria-label="Cari">${icon('search')}</button>
      <button class="iconbtn badge-dot ${badgeCount?'warn':''}" id="topAlert" data-n="${badgeCount}" aria-label="Perlu perhatian">${icon('box')||icon('alert')}</button>
      ${DB.settings.pin?`<button class="iconbtn" id="topLock" aria-label="Kunci">${icon('lock')}</button>`:''}
    </div></div>
    <main class="wrap">${content}</main>
    <nav class="tabbar" role="tablist">
      ${TABS.map(([id,label,ic])=>`<button class="tab ${CURRENT_TAB===id?'active':''}" data-tab="${id}" role="tab" aria-label="${label}">${icon(ic)}<span>${label}</span></button>`).join('')}
    </nav>`;
}
function shellBind(){
  $$('.tabbar .tab').forEach(b=>b.onclick=()=>{ go(b.dataset.tab) });
  const s=$('#topSearch'); if(s) s.onclick=()=>go('search');
  const a=$('#topAlert'); if(a) a.onclick=()=>go('notifs');
  const l=$('#topLock'); if(l) l.onclick=lockNow;
}

/* ---------- Router ---------- */
const VIEWS={};
function go(view, params={}){ ROUTE={view,params}; render(); window.scrollTo(0,0) }
function render(){
  const gate=authGate();
  const app=$('#app');
  if(gate){
    if(DB.settings.pin && (!DB.session||!DB.session.init)){ app.innerHTML=gate; bindAuthGate(); return }
    app.innerHTML=shell(gate); shellBind(); VIEWS._bind_onboarding&&VIEWS._bind_onboarding(); return
  }
  const fn = VIEWS[ROUTE.view] || VIEWS.dashboard;
  CURRENT_TAB = ({products:'products',product:'products',scan:'scan',reports:'reports',report:'reports'})[ROUTE.view] || ({dashboard:'dashboard',notifs:'dashboard',search:'dashboard'})[ROUTE.view] || (TABS.some(t=>t[0]===ROUTE.view)?ROUTE.view:'more');
  const inner = fn(ROUTE.params) || '';
  app.innerHTML = shell(inner);
  shellBind();
  (VIEWS['_bind_'+ROUTE.view]||(()=>{}))(ROUTE.params);
}

/* ---------- Data ops ---------- */
function lowStockList(){ const b=curBiz(); if(!b) return []; return bizProducts(b.id).filter(p=>p.active!==false && p.stock<=p.minStock) }
function stockValue(){ const b=curBiz(); return bizProducts(b.id).reduce((a,p)=>a+p.stock*p.price,0) }
function expiredList(){ const b=curBiz(); const items=[]; bizProducts(b.id).forEach(p=>(p.expiryTracks||[]).forEach(t=>{ if(t.remaining>0 && t.exp<t.expirDate) items.push({productId:p.id,p,t}) })); return items.sort((a,b2)=>a.t.exp-b2.t.exp) }
function expiringList(){ const list=[]; const b=curBiz(); const cut=plusDays(Date.now(),30); bizProducts(b.id).forEach(p=>(p.expiryTracks||[]).forEach(t=>{ if(t.remaining>0 && t.exp>=t.expirDate && t.exp<=cut) list.push({productId:p.id,p,t}) })); return list.sort((x,y)=>x.t.exp-y.t.exp) }
function salesToday(){ const b=curBiz(); const s=dayStart(); return DB.sales.filter(x=>x.bizId===b.id && x.at>=s).reduce((a,x)=>a+round2(x.qty*x.price),0) }
function txnToday(){ const b=curBiz(); const s=dayStart(); return DB.sales.filter(x=>x.bizId===b.id && x.at>=s).length }
function cancelToday(){ const b=curBiz(); const s=dayStart(); return DB.sales.filter(x=>x.bizId===b.id && x.canceled && x.at>=s).length }
function grToday(){ const b=curBiz(); const s=dayStart(); return DB.sales.filter(x=>x.bizId===b.id && !x.canceled && x.showGR && x.at>=s).reduce((a,x)=>a+round2(x.qty*x.price),0) }
function stockCount(){ const b=curBiz(); return bizProducts(b.id).reduce((a,p)=>a+p.stock,0) }
function stockMovesToday(){ const b=curBiz(); const s=dayStart(); return bizMoves(b.id).filter(m=>m.at>=s && m.type==='in').reduce((a,m)=>a+m.qty,0) }
function expireTodayCount(){ const b=curBiz(); const s=dayStart(); const e=s+864e5; return bizProducts(b.id).reduce((a,p)=>a+(p.expiryTracks||[]).filter(t=>t.exp>=s && t.exp<e).reduce((x,t)=>x+t.remaining,0),0) }

function setStock(pid, delta, reason, extra={}){
  const p=DB.products[pid]; if(!p) return 0;
  p.stock = Math.max(0, p.stock + delta);
  DB.movements.unshift({id:uid(),bizId:p.bizId,productId:pid,type:delta>=0?'in':'out',qty:Math.abs(delta),ref:reason||'adjust',by:'owner',at:Date.now(),balance:p.stock,...extra});
  save(DB); return p.stock;
}
function deductFifo(pid, qty){
  const p=DB.products[pid]; if(!p) return;
  let need=qty;
  (p.expiryTracks||[]).filter(t=>t.remaining>0).sort((a,b)=>a.exp-b.exp).forEach(t=>{
    const take=Math.min(t.remaining,need); t.remaining-=take; need-=take;
  });
  if(need>0){
    const exp=(p.expiryTracks||[]).filter(t=>t.remaining>0)[0];
    if(!exp){ p.expiryTracks.push({batch:1,exp:null,expirDate:null,remaining:0}); }
  }
}
function productByBarcode(bc){
  const b=curBiz(); const list=bizProducts(b.id).filter(p=>p.active!==false);
  return list.find(p=>p.barcode===bc) || (bc.length>4 ? list.find(p=>p.barcode && p.barcode.endsWith(bc)) : null) || null;
}

/* ---------- Modals / sheet ---------- */
function openSheet(title, inner, opts={}){
  closeSheet();
  const ov=document.createElement('div'); ov.className='overlay'; ov.id='ovl';
  const sh=document.createElement('div'); sh.className='sheet'+(opts.side?' side':''); sh.id='sh';
  const grip = opts.side?'':`<div class="grip"></div>`;
  sh.innerHTML = `${grip}<div class="sheet-title">${opts.icon?icon(opts.icon):''}<span>${esc(title)}</span><span class="spacer"></span><button class="iconbtn" id="sheetX" aria-label="Tutup">${icon('x')}</button></div>${inner}`;
  document.body.append(ov, sh);
  requestAnimationFrame(()=>{ ov.classList.add('open'); sh.classList.add('open') });
  ov.onclick=closeSheet; $('#sheetX').onclick=closeSheet;
  return sh;
}
function closeSheet(){ const o=$('#ovl'), s=$('#sh'); if(o)o.remove(); if(s)s.remove() }
function confirmSheet(title, msg, okLabel, cb, danger=true){
  openSheet(title, `<p class="muted" style="margin-bottom:16px">${esc(msg)}</p>
    <div class="btn-row"><button class="btn btn-ghost" id="cfNo">Batal</button><button class="btn ${danger?'btn-danger':'btn-primary'}" id="cfYes">${esc(okLabel)}</button></div>`);
  $('#cfNo').onclick=closeSheet;
  $('#cfYes').onclick=()=>{ closeSheet(); cb() };
}

/* ---------- Onboarding ---------- */
let ONB={step:1,name:'',addr:'',type:'Minuman',pin:''};
VIEWS.onboarding = () => {
  const s=ONB.step;
  return `<div class="wrap" style="max-width:460px;padding-top:20px">
    <div class="hero"><h2>Selamat datang di SiGap</h2><p>Atur stok, harga, dan laporan toko lo — cepat, offline, aman.</p></div>
    <div class="card">
      ${s===1?`<h3 style="margin-bottom:12px">1. Data toko</h3>
        <div class="field"><label class="lab">Nama toko</label><input id="onbName" class="input" placeholder="mis. Toko Berkah Jaya" value="${esc(ONB.name)}"></div>
        <div class="field"><label class="lab">Alamat</label><input id="onbAddr" class="input" placeholder="Jl. ..." value="${esc(ONB.addr)}"></div>
        <button class="btn btn-primary btn-block" id="onbNext">Lanjut</button>`
      :s===2?`<h3 style="margin-bottom:12px">2. Jenis toko</h3>
        <div class="field"><label class="lab">Jenis</label><select id="onbType" class="select">
          ${['Minimarket','Sembako','Apotek','Bangunan','Elektronik','F&B','Laundry','Lainnya'].map(t=>`<option ${ONB.type===t?'selected':''}>${t}</option>`).join('')}
        </select></div>
        <div class="note">Kategori & produk contoh akan dibuat untuk jenis ini.</div>
        <button class="btn btn-primary btn-block" id="onbNext" style="margin-top:12px">Lanjut</button>`
      :`<h3 style="margin-bottom:12px">3. Kunci aplikasi</h3>
        <div class="field"><label class="lab">PIN (4–6 digit)</label><input id="onbPin" class="input mono" type="password" inputmode="numeric" maxlength="6" placeholder="••••"></div>
        <div class="note">PIN melindungi data toko di HP ini.</div>
        <button class="btn btn-primary btn-block" id="onbDone" style="margin-top:12px">Mulai</button>`}
    </div>
  </div>`;
};
VIEWS._bind_onboarding = () => {
  const s=ONB.step;
  if(s===1){ const b=$('#onbNext'); if(b) b.onclick=()=>{ ONB.name=$('#onbName').value.trim()||'Toko Baru'; ONB.addr=$('#onbAddr').value.trim(); ONB.step=2; render() } }
  else if(s===2){ const b=$('#onbNext'); if(b) b.onclick=()=>{ ONB.type=$('#onbType').value; ONB.step=3; render() } }
  else { const b=$('#onbDone'); if(b) b.onclick=async()=>{
    const pin=$('#onbPin').value.trim();
    DB=seedDb(); DB.biz.bz_toko.name=ONB.name||'Toko Baru'; DB.biz.bz_toko.address=ONB.addr||''; DB.biz.bz_toko.receiptHeader=ONB.name||'Toko Baru';
    if(pin) DB.settings.pin=await sha256('pin:'+pin);
    else DB.settings.pin=null;
    DB.session={init:true,at:Date.now()}; save(DB); ONB={step:1,name:'',addr:'',type:'Minuman',pin:''}; go('dashboard'); notify('ok','Toko siap dipakai');
  } }
};

/* ---------- Dashboard ---------- */
VIEWS.dashboard = () => {
  const b=curBiz(); const low=lowStockList(); const exp=expiredList(); const expd=expiringList();
  const orderNum=Object.values(DB.purchases).filter(p=>p.bizId===b.id && p.status==='ordered').length;
  const opnameAge=b.opnameAt?Math.floor((Date.now()-b.opnameAt)/864e5):0;
  const greeting = new Date().getHours()<11?'Selamat pagi':new Date().getHours()<15?'Selamat siang':new Date().getHours()<19?'Selamat sore':'Selamat malam';
  const alerts=[];
  if(low.length) alerts.push({icon:'alert',cls:'warn',text:`${low.length} produk stok menipis`,go:['stock',{}]});
  if(exp.length) alerts.push({icon:'clock',cls:'danger',text:`${exp.length} produk expired`,go:['expired',{}]});
  if(expd.length) alerts.push({icon:'calendar',cls:'warn',text:`${expd.length} expired ≤30 hari`,go:['expiring',{}]});
  if(orderNum) alerts.push({icon:'truck',cls:'info',text:`${orderNum} PO belum selesai`,go:['po',{}]});
  if(opnameAge>7 && opnameAge>0) alerts.push({icon:'package',cls:'warn',text:`Opname terakhir ${opnameAge} hari lalu`,go:['opname',{}]});
  const profitToday = DB.sales.filter(x=>x.bizId===b.id && !x.canceled && x.at>=dayStart()).reduce((a,x)=>a+round2((x.price-x.cost)*x.qty),0);
  return `<div style="margin:6px 0 14px">
      <div class="muted" style="font-size:12.5px">${b.name}</div>
      <h2 style="font-size:19px;margin-top:2px">${greeting}, ${esc(b.owner)}</h2>
    </div>
    <div class="kpis">
      <div class="kpi"><div class="label">${icon('banknote')}Penjualan hari ini</div><div class="val">${rupiah(salesToday())}</div><div class="foot">${txnToday()} transaksi</div></div>
      <div class="kpi ok"><div class="label">${icon('trending')}Laba hari ini</div><div class="val">${rupiah(profitToday)}</div><div class="foot">gross</div></div>
      <div class="kpi ${cancelToday()?'danger':''}"><div class="label">${icon('xcircle')}Dibatalkan</div><div class="val">${cancelToday()}</div><div class="foot">tx hari ini</div></div>
      <div class="kpi"><div class="label">${icon('receipt')}GR</div><div class="val">${rupiah(grToday())}</div><div class="foot">return</div></div>
      <div class="kpi ${low.length?'warn':''}"><div class="label">${icon('boxes')}Stok menipis</div><div class="val">${low.length}</div><div class="foot">produk</div></div>
      <div class="kpi"><div class="label">${icon('clock')}Expired hari ini</div><div class="val">${expireTodayCount()}</div><div class="foot">unit</div></div>
      <div class="kpi"><div class="label">${icon('package')}Stock in hari ini</div><div class="val">${stockMovesToday()}</div><div class="foot">unit</div></div>
      <div class="kpi"><div class="label">${icon('wallet')}Nilai stok</div><div class="val">${rupiah(stockValue())}</div><div class="foot">${stockCount()} unit</div></div>
    </div>
    ${alerts.length?`<h3 class="sub">Perlu perhatian</h3>${alerts.slice(0,4).map(a=>`<button class="list-item" data-alert='${JSON.stringify(a.go)}'>
        <div class="thumb ${a.cls}">${icon(a.icon)}</div><div class="li-main"><div class="li-title" style="white-space:normal">${a.text}</div></div><div class="li-right">${icon('arrowRight')}</div></button>`).join('')}`:''}
    <h3 class="sub">Aksi cepat</h3>
    <div class="btn-row"><button class="btn btn-primary" data-q="stock">${icon('plus')}Stock in</button><button class="btn btn-ghost" data-q="opname">${icon('package')}Opname</button></div>
    ${b.priceMode==='markup'?`<div class="note" style="margin-top:10px">Mode harga: <b>markup</b> — jual = HPP + margin. Ubah di Pengaturan.</div>`:''}`;
};
VIEWS._bind_dashboard = () => {
  $$('[data-alert]').forEach(el=>el.onclick=()=>{ const [v,p]=JSON.parse(el.dataset.alert); go(v,p) });
  $$('[data-q]').forEach(el=>el.onclick=()=>go(el.dataset.q));
};

/* ---------- Products / Stok ---------- */
let PFILTER={cat:'all',q:'',sort:'name'};
VIEWS.products = () => {
  const b=curBiz();
  let list=bizProducts(b.id).filter(p=>p.active!==false);
  if(PFILTER.cat!=='all') list=list.filter(p=>p.catId===PFILTER.cat);
  if(PFILTER.q){ const q=PFILTER.q.toLowerCase(); list=list.filter(p=>p.name.toLowerCase().includes(q)||(p.barcode||'').includes(q)) }
  list.sort((x,y)=>PFILTER.sort==='stock'?x.stock-y.stock:PFILTER.sort==='value'?y.stock*y.price-x.stock*x.price:x.name.localeCompare(y.name));
  const cats=Object.values(DB.cats).filter(c=>c.bizId===b.id);
  const chips=[{id:'all',name:`Semua (${bizProducts(b.id).length})`},...cats.map(c=>({id:c.id,name:c.name}))];
  return `<div class="section-title"><h2>Stok Produk</h2><button class="btn btn-primary btn-sm" id="addProd">${icon('plus')}Tambah</button></div>
    <div class="chips chip-h" style="margin-bottom:12px">${chips.map(c=>`<button class="chip ${PFILTER.cat===c.id?'on':''}" data-cat="${c.id}">${esc(c.name)}</button>`).join('')}</div>
    <div class="input-group" style="margin-bottom:12px">
      <div style="position:relative;flex:1"><div style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--fg3)">${icon('search')}</div>
        <input id="qProd" class="input" style="padding-left:38px" placeholder="Cari nama / barcode" value="${esc(PFILTER.q)}"></div>
      <button class="iconbtn" id="sortBtn">${icon('filter')}</button>
    </div>
    <div style="font-size:12px;color:var(--fg3);margin-bottom:8px">${list.length} produk · nilai ${rupiah(list.reduce((a,p)=>a+p.stock*p.price,0))}</div>
    ${list.length?list.map(p=>`<button class="list-item" data-prod="${p.id}">
        <div class="thumb ${p.stock<=p.minStock?'warn':''}">${icon('package')}</div>
        <div class="li-main"><div class="li-title">${esc(p.name)}</div><div class="li-sub">${esc(p.barcode||'-')} · ${rupiah(p.price)}</div></div>
        <div class="li-right"><span class="li-val" style="color:${p.stock<=p.minStock?'var(--warn)':'var(--fg)'}">${p.stock}</span><span class="pill ${p.stock<=p.minStock?'warn':''}">${p.stock<=p.minStock?'menipis':'ada'}</span></div>
      </button>`).join('')
    :`<div class="empty"><div class="ico">${icon('boxes')}</div><h3>Belum ada produk</h3><p>Tambahkan produk atau import CSV.</p><button class="btn btn-primary" id="addProd2">${icon('plus')}Tambah produk</button></div>`}`;
};
VIEWS._bind_products = () => {
  $$('[data-cat]').forEach(b=>b.onclick=()=>{ PFILTER.cat=b.dataset.cat; render() });
  $$('[data-prod]').forEach(b=>b.onclick=()=>go('product',{id:b.dataset.prod}));
  const q=$('#qProd'); if(q){ q.oninput=debounce(()=>{ PFILTER.q=q.value; render(); const nq=$('#qProd'); if(nq){ nq.focus(); nq.setSelectionRange(nq.value.length,nq.value.length) } },300) }
  $('#sortBtn').onclick=()=>openSheet('Urutkan', `<div class="btn-row" style="flex-direction:column">
    <button class="btn btn-ghost btn-block" data-sort="name">Nama A–Z</button>
    <button class="btn btn-ghost btn-block" data-sort="stock">Stok terendah</button>
    <button class="btn btn-ghost btn-block" data-sort="value">Nilai stok tertinggi</button></div>`);
  const sBind=()=>$$('[data-sort]').forEach(b=>b.onclick=()=>{ PFILTER.sort=b.dataset.sort; closeSheet(); render() }); 
  if($('#ovl')) sBind();
  const a=$('#addProd')||$('#addProd2'); if(a) a.onclick=()=>go('product-new');
};

/* ---------- Product detail ---------- */
VIEWS.product = ({id}) => {
  const p=DB.products[id]; if(!p) return `<div class="empty"><h3>Produk tidak ada</h3></div>`;
  const b=curBiz(); const cat=DB.cats[p.catId];
  const margin=p.cost?Math.round((p.price-p.cost)/p.cost*100):0;
  const moves=bizMoves(b.id).filter(m=>m.productId===id).slice(0,25);
  const exp=p.expiryTracks||[];
  const profit=p.price-p.cost;
  return `<div class="row-between" style="margin:6px 0 12px">
      <button class="iconbtn" id="back">${icon('arrowLeft')}</button>
      <div style="display:flex;gap:8px"><button class="iconbtn" id="editP">${icon('edit')}</button><button class="iconbtn warn" id="delP">${icon('trash')}</button></div>
    </div>
    <div class="card">
      <div class="row-between"><div><h2 style="font-size:18px">${esc(p.name)}</h2><div class="muted mono" style="font-size:12.5px;margin-top:3px">${esc(p.barcode||'tanpa barcode')}</div></div><span class="pill ${p.stock<=p.minStock?'warn':'ok'}">stok ${p.stock}</span></div>
      <div class="divider"></div>
      <div class="stats-grid">
        <div><div class="muted" style="font-size:11.5px">Harga jual</div><div style="font-weight:800">${rupiah(p.price)}</div></div>
        <div><div class="muted" style="font-size:11.5px">HPP</div><div style="font-weight:800">${rupiah(p.cost)}</div></div>
        <div><div class="muted" style="font-size:11.5px">Margin</div><div style="font-weight:800;color:${margin>=0?'var(--accent)':'var(--danger)'}">${margin}%</div></div>
        <div><div class="muted" style="font-size:11.5px">Min. stok</div><div style="font-weight:800">${p.minStock}</div></div>
      </div>
      ${cat?`<div style="margin-top:10px"><span class="pill">${icon('tag')}${esc(cat.name)}</span></div>`:''}
    </div>
    <div class="btn-row" style="margin-top:10px"><button class="btn btn-primary" id="stockIn">${icon('plus')}Stock in</button><button class="btn btn-ghost" id="stockOut">${icon('minus')}Stock out</button></div>
    ${exp.length?`<h3 class="sub">Batch expiry</h3>${exp.filter(t=>t.remaining>0).sort((a,b2)=>a.exp-b2.exp).map(t=>`<div class="list-item"><div class="thumb ${t.exp<t.expirDate?'danger':'warn'}">${icon('clock')}</div><div class="li-main"><div class="li-title">${fmtDate(t.exp)}</div><div class="li-sub">sisa ${t.remaining} · exp ${fmtDate(t.expirDate||t.exp)}</div></div></div>`).join('')}`:''}
    <h3 class="sub">Riwayat mutasi</h3>
    ${moves.length?moves.map(m=>`<div class="list-item"><div class="thumb ${m.type==='in'?'ok':'warn'}">${icon(m.type==='in'?'plus':'minus')}</div>
        <div class="li-main"><div class="li-title">${m.type==='in'?'Masuk':'Keluar'} ${m.qty}</div><div class="li-sub">${esc(m.ref||'-')} · ${fmtDateTime(m.at)}</div></div>
        <div class="li-right"><span class="muted mono">${m.balance!=null?m.balance:''}</span></div></div>`).join('')
    :`<p class="muted" style="font-size:13px">Belum ada mutasi.</p>`}`;
};
VIEWS._bind_product = ({id}) => {
  const p=DB.products[id];
  $('#back').onclick=()=>go('products');
  $('#editP').onclick=()=>go('product-edit',{id});
  $('#delP').onclick=()=>confirmSheet('Hapus produk',`Hapus "${p.name}"? Riwayat tetap tersimpan.`,'Hapus',()=>{ p.active=false; logAudit('hapus produk',p.name); save(DB); go('products'); notify('ok','Produk dihapus') });
  $('#stockIn').onclick=()=>quickStock(id,'in');
  $('#stockOut').onclick=()=>quickStock(id,'out');
};
function quickStock(id,type){
  const p=DB.products[id];
  openSheet(type==='in'?'Stock in':'Stock out', `
    <div class="field"><label class="lab">Jumlah (${esc(p.unit)})</label><input id="qsQty" class="input mono" type="number" min="1" value="1"></div>
    ${type==='in'?`<div class="field"><label class="lab">HPP / satuan</label><input id="qsCost" class="input mono" type="number" value="${p.cost}"></div>
      <div class="field"><label class="lab">Expired (opsional)</label><input id="qsExp" class="input" type="date"></div>`:''}
    <div class="field"><label class="lab">Catatan</label><input id="qsRef" class="input" placeholder="${type==='in'?'beli/supplier':'rusak/hilang'}"></div>
    <button class="btn btn-primary btn-block" id="qsGo">Simpan</button>`);
  $('#qsGo').onclick=()=>{
    const qty=parseInt($('#qsQty').value,10); if(!qty||qty<=0) return notify('err','Jumlah tidak valid');
    if(type==='in'){
      const cost=parseInt($('#qsCost').value,10)||p.cost; p.cost=cost;
      const expD=$('#qsExp').value;
      const exp=expD?new Date(expD).getTime():null;
      setStock(id,qty,$('#qsRef').value||'stock in',{cost});
      if(exp) p.expiryTracks.push({batch:(p.expiryTracks.length||0)+1,exp,expirDate:exp,remaining:qty});
      notify('ok',`+${qty} ${p.name}`);
    } else {
      deductFifo(id,qty); setStock(id,-qty,$('#qsRef').value||'stock out'); notify('ok',`-${qty} ${p.name}`);
    }
    closeSheet(); render();
  };
}

/* ---------- Product form ---------- */
function productForm(p, isNew){
  const b=curBiz(); const cats=Object.values(DB.cats).filter(c=>c.bizId===b.id);
  return `<div class="row-between" style="margin:6px 0 12px"><button class="iconbtn" id="back">${icon('arrowLeft')}</button><h2 style="font-size:17px">${isNew?'Produk baru':'Edit produk'}</h2><span style="width:40px"></span></div>
    <div class="card">
      <div class="field"><label class="lab">Nama produk</label><input id="pfName" class="input" value="${esc(p.name)}" placeholder="Nama produk"></div>
      <div class="field"><label class="lab">Barcode</label><div class="input-group"><input id="pfBarcode" class="input mono" value="${esc(p.barcode)}" placeholder="scan / ketik"><button class="btn btn-ghost" id="pfScan">${icon('scan')}</button></div></div>
      <div class="field"><label class="lab">Kategori</label><select id="pfCat" class="select"><option value="">— tanpa kategori —</option>${cats.map(c=>`<option value="${c.id}" ${p.catId===c.id?'selected':''}>${esc(c.name)}</option>`).join('')}</select></div>
      <div class="field-row"><div class="field"><label class="lab">HPP</label><input id="pfCost" class="input mono" type="number" value="${p.cost||''}" placeholder="0"></div>
        <div class="field"><label class="lab">Harga jual</label><input id="pfPrice" class="input mono" type="number" value="${p.price||''}" placeholder="0"></div></div>
      <div class="field-row"><div class="field"><label class="lab">Stok awal</label><input id="pfStock" class="input mono" type="number" value="${p.stock||0}" ${isNew?'':'disabled'}></div>
        <div class="field"><label class="lab">Min. stok</label><input id="pfMin" class="input mono" type="number" value="${p.minStock||5}"></div></div>
      <div class="field"><label class="lab">Satuan</label><select id="pfUnit" class="select">${['pcs','pack','box','kg','liter','karung','sachet','botol'].map(u=>`<option ${p.unit===u?'selected':''}>${u}</option>`).join('')}</select></div>
      <button class="btn btn-primary btn-block" id="pfSave">${icon('check')}Simpan</button>
    </div>`;
}
VIEWS['product-new'] = () => productForm({name:'',barcode:'',catId:'',cost:'',price:'',stock:0,minStock:5,unit:'pcs'}, true);
VIEWS['product-edit'] = ({id}) => productForm(DB.products[id], false);
function bindProductForm(isNew, id){
  $('#back').onclick=()=>history.length>1?go(isNew?'products':'product',isNew?{}:{id}):go('products');
  $('#pfScan').onclick=()=>openScanner(bc=>{ $('#pfBarcode').value=bc; closeSheet() });
  $('#pfSave').onclick=()=>{
    const name=$('#pfName').value.trim(); if(!name) return notify('err','Nama wajib');
    const cost=parseInt($('#pfCost').value,10)||0, price=parseInt($('#pfPrice').value,10)||0;
    if(price<cost) notify('err','Harga jual di bawah HPP');
    const data={name,barcode:$('#pfBarcode').value.trim(),catId:$('#pfCat').value||null,cost,price,minStock:parseInt($('#pfMin').value,10)||0,unit:$('#pfUnit').value};
    if(isNew){
      const nid='pr_'+uid(); const b=curBiz();
      DB.products[nid]={id:nid,bizId:b.id,stock:parseInt($('#pfStock').value,10)||0,expiryTracks:[],active:true,createdAt:Date.now(),uom:data.unit,sellBy:data.unit,...data};
      DB.movements.unshift({id:uid(),bizId:b.id,productId:nid,type:'in',qty:DB.products[nid].stock,ref:'produk baru',by:'owner',at:Date.now(),balance:DB.products[nid].stock});
      logAudit('tambah produk',name); notify('ok','Produk ditambahkan');
    } else { Object.assign(DB.products[id],data); logAudit('edit produk',name); notify('ok','Tersimpan') }
    save(DB); go(isNew?'products':'product',isNew?{}:{id});
  };
}
VIEWS._bind_product_new = () => bindProductForm(true);
VIEWS._bind_product_edit = ({id}) => bindProductForm(false, id);

/* ---------- Scanner ---------- */
let SCAN_STATE={stream:null, raf:null, detector:null, onResult:null, active:false};
function openScanner(cb){
  SCAN_STATE.onResult=cb;
  openSheet('Scan barcode', `
    <div class="scan-box"><video id="vid" playsinline muted></video><div class="frame"><div class="rect"></div></div></div>
    <div class="scan-status" id="scanStatus">${icon('camera')}<span>Menyiapkan kamera…</span></div>
    <div class="field" style="margin-top:10px"><label class="lab">Atau ketik manual</label><div class="input-group">
      <input id="manBc" class="input mono" inputmode="numeric" placeholder="kode barcode"><button class="btn btn-ghost" id="manGo">${icon('check')}</button></div></div>
    <button class="btn btn-ghost btn-block" id="torchBtn" style="margin-top:8px">${icon('eye')}Senter</button>
    <p class="help">Arahkan kamera ke barcode. Butuh HTTPS & izin kamera.</p>`);
  $('#manGo').onclick=()=>{ const v=$('#manBc').value.trim(); if(v){ closeSheet(); SCAN_STATE.onResult(v) } };
  $('#manBc').addEventListener('keydown',e=>{ if(e.key==='Enter') $('#manGo').click() });
  startScan();
}
async function startScan(){
  const vid=$('#vid'); const st=$('#scanStatus');
  SCAN_STATE.active=true;
  try{
    SCAN_STATE.stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'}}});
    vid.srcObject=SCAN_STATE.stream; await vid.play();
    if('BarcodeDetector' in window){
      SCAN_STATE.detector=new BarcodeDetector({formats:['ean_13','ean_8','upc_a','upc_e','code_128','code_39','itf','qr_code']});
      st.innerHTML=`${icon('scan')}<span>Deteksi aktif — arahkan ke barcode</span>`;
      const loop=async()=>{
        if(!SCAN_STATE.active) return;
        try{
          const codes=await SCAN_STATE.detector.detect(vid);
          if(codes.length){
            const v=codes[0].rawValue; st.innerHTML=`${icon('checkcircle')}<span>${esc(v)}</span>`;
            stopScan(); const cb=SCAN_STATE.onResult; closeSheet();
            if(navigator.vibrate) navigator.vibrate(60);
            setTimeout(()=>cb&&cb(v),120); return;
          }
        }catch(e){}
        SCAN_STATE.raf=requestAnimationFrame(loop);
      };
      loop();
    } else {
      st.innerHTML=`${icon('alert')}<span>Browser tanpa BarcodeDetector — pakai ketik manual</span>`;
    }
    $('#torchBtn').onclick=async()=>{
      const t=SCAN_STATE.stream.getVideoTracks()[0]; const cap=t.getCapabilities&&t.getCapabilities();
      if(cap&&cap.torch){ const on=!t._torch; try{ await t.applyConstraints({advanced:[{torch:on}]}); t._torch=on }catch(e){} }
      else notify('err','Senter tidak didukung');
    };
  }catch(e){
    st.innerHTML=`${icon('xcircle')}<span>Kamera gagal: ${esc(e.message||e.name)}</span>`;
  }
}
function stopScan(){
  SCAN_STATE.active=false;
  if(SCAN_STATE.raf){ (window.cancelAnimationFrame||clearTimeout)(SCAN_STATE.raf) }
  if(SCAN_STATE.stream) SCAN_STATE.stream.getTracks().forEach(t=>t.stop());
  SCAN_STATE.stream=null;
}
VIEWS.scan = () => {
  const b=curBiz(); const recent=bizMoves(b.id).filter(m=>m.type==='in'||m.type==='out').slice(0,10); 
  return `<div class="section-title"><h2>Scan</h2></div>
    <div class="card">
      <p class="muted" style="font-size:13px;margin:0 0 12px">Scan untuk stock in / out atau cari produk cepat.</p>
      <button class="btn btn-primary btn-block" id="scanStart">${icon('scan')}Mulai scan</button>
      <div class="btn-row" style="margin-top:10px"><button class="btn btn-ghost" id="scanKasir">${icon('cart')}Kasir</button><button class="btn btn-ghost" id="scanOpname">${icon('package')}Opname</button></div>
    </div>
    <h3 class="sub">Tips</h3>
    <div class="note">Barcode EAN-13/UPC-A dikenali otomatis. Stok berkurang setelah transaksi tersimpan (FIFO per batch expiry).</div>`;
};
VIEWS._bind_scan = () => {
  $('#scanStart').onclick=()=>openScanner(bc=>{ const p=productByBarcode(bc); if(p) go('product',{id:p.id}); else { notify('err','Barcode belum terdaftar'); go('product-new') } });
  $('#scanKasir').onclick=()=>go('kasir');
  $('#scanOpname').onclick=()=>go('opname');
};

/* ---------- Kasir / POS ---------- */
let POS={items:[], query:'', customer:''};
VIEWS.kasir = () => {
  const total=POS.items.reduce((a,i)=>a+i.qty*i.price,0);
  const b=curBiz();
  return `<div class="row-between" style="margin:6px 0 12px"><button class="iconbtn" id="back">${icon('arrowLeft')}</button><h2 style="font-size:17px">Kasir</h2><button class="iconbtn" id="posScan">${icon('scan')}</button></div>
    <div class="input-group" style="margin-bottom:12px"><input id="posQ" class="input" placeholder="Cari / barcode" value="${esc(POS.query)}"><button class="btn btn-ghost" id="posAdd">${icon('search')}</button></div>
    <div id="posResults"></div>
    ${POS.items.length?`<div class="card" style="margin-top:6px">
      ${POS.items.map((it,idx)=>`<div class="row-between" style="padding:8px 0;border-bottom:1px solid var(--line)">
        <div><div style="font-weight:700">${esc(it.name)}</div><div class="muted" style="font-size:12px">${rupiah(it.price)} × ${it.qty}</div></div>
        <div style="display:flex;align-items:center;gap:6px">
          <button class="iconbtn" data-pmin="${idx}">${icon('minus')}</button><span class="mono" style="min-width:22px;text-align:center">${it.qty}</span><button class="iconbtn" data-pplus="${idx}">${icon('plus')}</button>
        </div></div>`).join('')}
      <div class="row-between" style="margin-top:12px"><b>Total</b><b style="font-size:18px">${rupiah(total)}</b></div>
      <div class="btn-row" style="margin-top:12px"><button class="btn btn-ghost" id="posClear">Kosongkan</button><button class="btn btn-primary" id="posPay">${icon('check')}Bayar</button></div>
    </div>`:`<div class="empty"><div class="ico">${icon('cart')}</div><h3>Keranjang kosong</h3><p>Cari produk atau scan barcode.</p></div>`}`;
};
function posSearch(q){
  if(!q) return [];
  const b=curBiz(); const ql=q.toLowerCase();
  return bizProducts(b.id).filter(p=>p.active!==false && p.stock>0 && (p.name.toLowerCase().includes(ql)||(p.barcode||'').includes(q))).slice(0,8);
}
function renderPosResults(){
  const box=$('#posResults'); if(!box) return;
  const res=posSearch(POS.query);
  box.innerHTML=res.map(p=>`<button class="list-item" data-padd="${p.id}"><div class="thumb">${icon('package')}</div><div class="li-main"><div class="li-title">${esc(p.name)}</div><div class="li-sub">${rupiah(p.price)} · stok ${p.stock}</div></div></button>`).join('');
  $$('[data-padd]').forEach(b=>b.onclick=()=>addPosItem(b.dataset.padd));
}
function addPosItem(pid){
  const p=DB.products[pid]; if(!p) return;
  const ex=POS.items.find(i=>i.productId===pid);
  if(ex){ if(ex.qty+1>p.stock) return notify('err','Stok tidak cukup'); ex.qty++ }
  else { if(p.stock<1) return notify('err','Stok habis'); POS.items.push({productId:pid,name:p.name,price:p.price,cost:p.cost,qty:1}) }
  POS.query=''; render();
}
VIEWS._bind_kasir = () => {
  $('#back').onclick=()=>go('dashboard');
  $('#posScan').onclick=()=>openScanner(bc=>{ const p=productByBarcode(bc); if(p) addPosItem(p.id); else notify('err','Barcode belum terdaftar') });
  const q=$('#posQ'); q.oninput=debounce(()=>{ POS.query=q.value; renderPosResults() },250);
  $('#posAdd').onclick=()=>{ POS.query=q.value; renderPosResults() };
  q.addEventListener('keydown',e=>{ if(e.key==='Enter'){ const r=posSearch(q.value)[0]; if(r) addPosItem(r.id) } });
  renderPosResults();
  $$('[data-padd]').forEach(b=>b.onclick=()=>addPosItem(b.dataset.padd));
  $$('[data-pplus]').forEach(b=>b.onclick=()=>{ const it=POS.items[+b.dataset.pplus]; const p=DB.products[it.productId]; if(it.qty+1<=p.stock) it.qty++; else notify('err','Stok tidak cukup'); render() });
  $$('[data-pmin]').forEach(b=>b.onclick=()=>{ const i=+b.dataset.pmin; POS.items[i].qty--; if(POS.items[i].qty<=0) POS.items.splice(i,1); render() });
  const cl=$('#posClear'); if(cl) cl.onclick=()=>{ POS.items=[]; render() };
  const pay=$('#posPay'); if(pay) pay.onclick=checkout;
};
function checkout(){
  const b=curBiz(); const total=POS.items.reduce((a,i)=>a+i.qty*i.price,0);
  openSheet('Pembayaran', `<div class="row-between" style="margin-bottom:14px"><span>Total</span><b style="font-size:20px">${rupiah(total)}</b></div>
    <div class="field"><label class="lab">Uang diterima</label><input id="payCash" class="input mono" type="number" value="${total}" inputmode="numeric"></div>
    <div class="field"><label class="lab">Metode</label><select id="payMethod" class="select"><option>Tunai</option><option>QRIS</option><option>Transfer</option><option>Kartu</option></select></div>
    <div id="payChange" class="note" style="margin-bottom:12px">Kembalian ${rupiah(0)}</div>
    <button class="btn btn-primary btn-block" id="payGo">${icon('check')}Proses pembayaran</button>`);
  const cash=$('#payCash'); const upd=()=>{ const ch=Math.max(0,(parseInt(cash.value,10)||0)-total); $('#payChange').textContent='Kembalian '+rupiah(ch); $('#payChange').style.color=ch>=0?'var(--accent)':'var(--danger)' };
  cash.oninput=upd; upd();
  $('#payGo').onclick=()=>{
    const cashV=parseInt(cash.value,10)||0; if(cashV<total) return notify('err','Uang kurang');
    const trx='TRX-'+uid().toUpperCase().slice(0,8);
    const sale={id:uid(),trx,bizId:b.id,at:Date.now(),cashier:b.cashierName||'Kasir',method:$('#payMethod').value,paid:cashV,change:cashV-total,total,canceled:false,showGR:true};
    POS.items.forEach(it=>{ DB.sales.unshift({id:uid(),saleId:sale.id,bizId:b.id,at:Date.now(),productId:it.productId,name:it.name,qty:it.qty,price:it.price,cost:it.cost,canceled:false,showGR:true,trx});
      deductFifo(it.productId,it.qty); const p=DB.products[it.productId]; p.stock=Math.max(0,p.stock-it.qty);
      DB.movements.unshift({id:uid(),bizId:b.id,productId:it.productId,type:'out',qty:it.qty,ref:'jual '+trx,by:'kasir',at:Date.now(),balance:p.stock});
    });
    logAudit('penjualan',`${trx} ${rupiah(total)}`); save(DB); closeSheet(); POS.items=[]; render(); notify('ok','Pembayaran sukses');
    setTimeout(()=>go('receipt',{sale:sale.id}),150);
  };
}

/* ---------- Receipt ---------- */
VIEWS.receipt = ({sale:saleId}) => {
  const b=curBiz(); const items=DB.sales.filter(x=>x.saleId===saleId);
  const s=items[0]; if(!s) return `<div class="empty"><h3>Struk tidak ditemukan</h3></div>`;
  const total=items.reduce((a,x)=>a+x.qty*x.price,0);
  return `<div class="row-between" style="margin:6px 0 12px"><button class="iconbtn" id="back">${icon('arrowLeft')}</button><h2 style="font-size:17px">Struk</h2><span style="width:40px"></span></div>
    <div class="card mono" id="receiptBody" style="font-size:12.5px;line-height:1.6">
      <div class="center"><div style="font-weight:800;font-size:15px">${esc(b.receiptHeader||b.name)}</div><div class="muted" style="font-size:11px">${esc(b.address||'')}</div><div class="divider"></div></div>
      <div style="font-size:11px" class="muted">${s.trx} · ${fmtDateTime(s.at)}<br>Kasir: ${esc(s.cashier)}</div>
      <div class="divider"></div>
      ${items.map(x=>`<div class="row-between"><span>${esc(x.name)} ×${x.qty}</span><span>${rupiah(x.qty*x.price)}</span></div>`).join('')}
      <div class="divider"></div>
      <div class="row-between"><b>Total</b><b>${rupiah(total)}</b></div>
      <div class="row-between"><span>Bayar</span><span>${rupiah(s.paid)}</span></div>
      <div class="row-between"><span>Kembali</span><span>${rupiah(s.change)}</span></div>
      <div class="divider"></div><div class="center" style="font-size:11px">${esc(b.receiptFooter||'')}</div>
    </div>
    <div class="btn-row" style="margin-top:12px"><button class="btn btn-ghost" id="rcPrint">${icon('printer')}Cetak</button><button class="btn btn-primary" id="rcNew">Transaksi baru</button></div>
    <button class="btn btn-danger-soft btn-block" id="rcCancel" style="margin-top:10px">${icon('xcircle')}Batalkan transaksi</button>`;
};
VIEWS._bind_receipt = ({sale:saleId}) => {
  $('#back').onclick=()=>go('dashboard');
  $('#rcNew').onclick=()=>{ POS.items=[]; go('kasir') };
  $('#rcPrint').onclick=()=>{ const w=window.open('','_blank'); w.document.write(`<pre style="font-family:monospace;font-size:12px">${$('#receiptBody').innerText}</pre>`); w.print() };
  $('#rcCancel').onclick=()=>confirmSheet('Batalkan transaksi','Stok dikembalikan & transaksi ditandai batal.','Batalkan',()=>{
    DB.sales.filter(x=>x.saleId===saleId).forEach(x=>{ x.canceled=true; x.showGR=false; const p=DB.products[x.productId]; if(p){ p.stock+=x.qty; DB.movements.unshift({id:uid(),bizId:x.bizId,productId:x.productId,type:'in',qty:x.qty,ref:'batal '+x.trx,by:'owner',at:Date.now(),balance:p.stock}) } });
    logAudit('batal transaksi',saleId); save(DB); notify('ok','Transaksi dibatalkan'); render();
  });
};

/* ---------- Suppliers & PO ---------- */
VIEWS.suppliers = () => {
  const b=curBiz(); const list=Object.values(DB.suppliers).filter(s=>s.bizId===b.id);
  return `<div class="row-between" style="margin:6px 0 12px"><button class="iconbtn" id="back">${icon('arrowLeft')}</button><h2 style="font-size:17px">Supplier</h2><button class="iconbtn" id="addSup">${icon('plus')}</button></div>
    ${list.length?list.map(s=>`<div class="list-item"><div class="thumb">${icon('truck')}</div><div class="li-main"><div class="li-title">${esc(s.name)}</div><div class="li-sub">${esc(s.contact||'')} ${s.phone?'· '+esc(s.phone):''}</div></div></div>`).join('')
    :`<div class="empty"><div class="ico">${icon('truck')}</div><h3>Belum ada supplier</h3><p>Tambah supplier untuk bikin PO.</p></div>`}`;
};
VIEWS._bind_suppliers = () => {
  $('#back').onclick=()=>go('more');
  $('#addSup').onclick=()=>{
    openSheet('Supplier baru', `<div class="field"><label class="lab">Nama</label><input id="spName" class="input"></div>
      <div class="field"><label class="lab">Kontak</label><input id="spContact" class="input"></div>
      <div class="field"><label class="lab">Telepon</label><input id="spPhone" class="input"></div>
      <div class="field"><label class="lab">Termin</label><input id="spTerms" class="input" placeholder="COD / 30 hari"></div>
      <button class="btn btn-primary btn-block" id="spSave">Simpan</button>`);
    $('#spSave').onclick=()=>{ const nm=$('#spName').value.trim(); if(!nm) return notify('err','Nama wajib');
      const id='sp_'+uid(); DB.suppliers[id]={id,bizId:curBiz().id,name:nm,contact:$('#spContact').value,phone:$('#spPhone').value,terms:$('#spTerms').value,address:''};
      save(DB); closeSheet(); render(); notify('ok','Supplier ditambah') };
  };
};
let POITEM=[];
VIEWS.po = () => {
  const b=curBiz(); const list=Object.values(DB.purchases).filter(p=>p.bizId===b.id).sort((x,y)=>y.at-x.at);
  return `<div class="row-between" style="margin:6px 0 12px"><button class="iconbtn" id="back">${icon('arrowLeft')}</button><h2 style="font-size:17px">Purchase Order</h2><button class="iconbtn" id="newPO">${icon('plus')}</button></div>
    ${list.length?list.map(p=>`<button class="list-item" data-po="${p.id}"><div class="thumb ${p.status==='received'?'ok':'info'}">${icon('truck')}</div>
      <div class="li-main"><div class="li-title">${esc(p.supName||'Tanpa supplier')}</div><div class="li-sub">${p.items.length} item · ${fmtDate(p.at)}</div></div>
      <div class="li-right"><span class="pill ${p.status==='received'?'ok':'warn'}">${p.status==='received'?'diterima':p.status==='ordered'?'order':'draft'}</span></div></button>`).join('')
    :`<div class="empty"><div class="ico">${icon('truck')}</div><h3>Belum ada PO</h3><p>Buat PO untuk restock dari supplier.</p><button class="btn btn-primary" id="newPO2">Buat PO</button></div>`}`;
};
VIEWS._bind_po = () => {
  $('#back').onclick=()=>go('more');
  const n=$('#newPO')||$('#newPO2'); if(n) n.onclick=()=>go('po-new');
  $$('[data-po]').forEach(b=>b.onclick=()=>go('po-detail',{id:b.dataset.po}));
};
VIEWS['po-new'] = () => {
  const b=curBiz(); const sups=Object.values(DB.suppliers).filter(s=>s.bizId===b.id); const prods=bizProducts(b.id);
  const total=POITEM.reduce((a,i)=>a+i.qty*i.cost,0);
  return `<div class="row-between" style="margin:6px 0 12px"><button class="iconbtn" id="back">${icon('arrowLeft')}</button><h2 style="font-size:17px">PO baru</h2><span style="width:40px"></span></div>
    <div class="field"><label class="lab">Supplier</label><select id="poSup" class="select">${sups.map(s=>`<option value="${s.id}">${esc(s.name)}</option>`).join('')||'<option value="">— tanpa supplier —</option>'}</select></div>
    <h3 class="sub">Item</h3>
    ${POITEM.map((it,idx)=>`<div class="list-item"><div class="thumb">${icon('package')}</div><div class="li-main"><div class="li-title">${esc(it.name)}</div><div class="li-sub">${rupiah(it.cost)} × ${it.qty}</div></div>
      <button class="iconbtn" data-rm="${idx}">${icon('x')}</button></div>`).join('')}
    <div class="input-group" style="margin:10px 0"><select id="poProd" class="select">${prods.map(p=>`<option value="${p.id}">${esc(p.name)}</option>`).join('')}</select>
      <input id="poQty" class="input mono" type="number" value="1" min="1" style="max-width:90px"><button class="btn btn-ghost" id="poAdd">${icon('plus')}</button></div>
    <div class="row-between" style="margin-bottom:12px"><b>Total</b><b>${rupiah(total)}</b></div>
    <button class="btn btn-primary btn-block" id="poSave">${icon('check')}Simpan & order</button>`;
};
VIEWS._bind_po_new = () => {
  $('#back').onclick=()=>go('po');
  const add=()=>{ const pid=$('#poProd').value; const qty=parseInt($('#poQty').value,10)||1; const p=DB.products[pid]; if(!p) return;
    POITEM.push({productId:pid,name:p.name,qty,cost:p.cost}); render() };
  $('#poAdd').onclick=add; $$('#poProd option').length||null;
  $$('[data-rm]').forEach(b=>b.onclick=()=>{ POITEM.splice(+b.dataset.rm,1); render() });
  $('#poSave').onclick=()=>{
    if(!POITEM.length) return notify('err','PO kosong');
    const sid=$('#poSup').value; const sup=DB.suppliers[sid];
    const id='po_'+uid();
    DB.purchases.push({id,bizId:curBiz().id,supplierId:sid||null,supName:sup?sup.name:'',items:clone(POITEM),status:'ordered',at:Date.now()});
    POITEM=[]; save(DB); go('po'); notify('ok','PO dibuat');
  };
};
VIEWS['po-detail'] = ({id}) => {
  const po=DB.purchases.find(x=>x.id===id); if(!po) return `<div class="empty"><h3>PO tidak ada</h3></div>`;
  const total=po.items.reduce((a,i)=>a+i.qty*i.cost,0);
  return `<div class="row-between" style="margin:6px 0 12px"><button class="iconbtn" id="back">${icon('arrowLeft')}</button><h2 style="font-size:17px">${esc(po.supName||'PO')}</h2><span class="pill ${po.status==='received'?'ok':'warn'}">${po.status}</span></div>
    ${po.items.map(i=>`<div class="list-item"><div class="thumb">${icon('package')}</div><div class="li-main"><div class="li-title">${esc(i.name)}</div><div class="li-sub">${rupiah(i.cost)} × ${i.qty}</div></div></div>`).join('')}
    <div class="row-between" style="margin:12px 0"><b>Total</b><b>${rupiah(total)}</b></div>
    ${po.status!=='received'?`<button class="btn btn-primary btn-block" id="poRecv">${icon('check')}Barang diterima</button>`:''}`;
};
VIEWS._bind_po_detail = ({id}) => {
  $('#back').onclick=()=>go('po');
  const r=$('#poRecv'); if(r) r.onclick=()=>confirmSheet('Terima barang','Stok akan bertambah & PO ditutup.','Terima',()=>{
    const po=DB.purchases.find(x=>x.id===id); if(!po) return;
    po.items.forEach(i=>{ const p=DB.products[i.productId]; if(p){ p.stock+=i.qty; p.cost=i.cost; DB.movements.unshift({id:uid(),bizId:p.bizId,productId:i.productId,type:'in',qty:i.qty,ref:'PO '+id.slice(-6),by:'owner',at:Date.now(),balance:p.stock,cost:i.cost}) } });
    po.status='received'; logAudit('terima PO',id); save(DB); notify('ok','Stok bertambah'); render();
  });
};

/* ---------- Opname ---------- */
VIEWS.opname = () => {
  const b=curBiz(); const prods=bizProducts(b.id);
  return `<div class="row-between" style="margin:6px 0 12px"><button class="iconbtn" id="back">${icon('arrowLeft')}</button><h2 style="font-size:17px">Opname</h2><button class="iconbtn" id="opScan">${icon('scan')}</button></div>
    <div class="note" style="margin-bottom:12px">Sistem: ${prods.length} produk · ${stockCount()} unit · ${rupiah(stockValue())}</div>
    ${prods.slice(0,50).map(p=>`<div class="list-item"><div class="thumb">${icon('package')}</div><div class="li-main"><div class="li-title">${esc(p.name)}</div><div class="li-sub">sistem ${p.stock} ${esc(p.unit)}</div></div>
      <input class="input mono" data-op="${p.id}" style="max-width:88px;text-align:center" type="number" min="0" placeholder="${p.stock}"></div>`).join('')}
    <button class="btn btn-primary btn-block" id="opSave" style="margin-top:6px">${icon('check')}Simpan opname</button>`;
};
VIEWS._bind_opname = () => {
  $('#back').onclick=()=>go('dashboard');
  $('#opScan').onclick=()=>openScanner(bc=>{ const p=productByBarcode(bc); if(p){ const el=$(`[data-op="${p.id}"]`); if(el){ el.focus(); el.scrollIntoView({block:'center',behavior:'smooth'}) } } else notify('err','Barcode belum terdaftar') });
  $('#opSave').onclick=()=>{
    let adj=0; $$('[data-op]').forEach(inp=>{ if(inp.value==='') return; const p=DB.products[inp.dataset.op]; const fisik=parseInt(inp.value,10); if(isNaN(fisik)) return; const d=fisik-p.stock; if(d!==0){ p.stock=fisik; DB.movements.unshift({id:uid(),bizId:p.bizId,productId:p.id,type:d>0?'in':'out',qty:Math.abs(d),ref:'opname',by:'owner',at:Date.now(),balance:fisik}); adj++ } });
    curBiz().opnameAt=Date.now(); logAudit('opname',`${adj} penyesuaian`); save(DB); notify('ok',`${adj} penyesuaian`); go('dashboard');
  };
};

/* ---------- Expiry ---------- */
VIEWS.expired = () => {
  const list=expiredList();
  return `<div class="row-between" style="margin:6px 0 12px"><button class="iconbtn" id="back">${icon('arrowLeft')}</button><h2 style="font-size:17px">Expired</h2><span class="pill danger">${list.length}</span></div>
    ${list.length?list.map(x=>`<div class="list-item"><div class="thumb danger">${icon('clock')}</div><div class="li-main"><div class="li-title">${esc(x.p.name)}</div><div class="li-sub">exp ${fmtDate(x.t.exp)} · sisa ${x.t.remaining}</div></div>
      <button class="btn btn-danger-soft btn-xs" data-exp="${x.productId}" data-batch="${x.t.batch}">Tarik</button></div>`).join('')
    :`<div class="empty"><div class="ico">${icon('checkcircle')}</div><h3>Tidak ada expired</h3></div>`}`;
};
VIEWS._bind_expired = () => {
  $('#back').onclick=()=>go('more');
  $$('[data-exp]').forEach(b=>b.onclick=()=>{ const p=DB.products[b.dataset.exp]; const t=(p.expiryTracks||[]).find(x=>String(x.batch)===b.dataset.batch); if(!t||!t.remaining) return;
    const q=t.remaining; t.remaining=0; setStock(p.id,-q,'expired'); notify('ok',`${q} ${p.name} ditarik`); render() });
};
VIEWS.expiring = () => {
  const list=expiringList();
  return `<div class="row-between" style="margin:6px 0 12px"><button class="iconbtn" id="back">${icon('arrowLeft')}</button><h2 style="font-size:17px">Hampir expired (≤30h)</h2><span class="pill warn">${list.length}</span></div>
    ${list.length?list.map(x=>`<div class="list-item"><div class="thumb warn">${icon('calendar')}</div><div class="li-main"><div class="li-title">${esc(x.p.name)}</div><div class="li-sub">exp ${fmtDate(x.t.exp)} · sisa ${x.t.remaining}</div></div>
      <span class="pill warn">${Math.max(0,Math.ceil((x.t.exp-Date.now())/864e5))}h</span></div>`).join('')
    :`<div class="empty"><div class="ico">${icon('calendar')}</div><h3>Aman</h3></div>`}`;
};
VIEWS._bind_expiring = () => { $('#back').onclick=()=>go('more') };

/* ---------- Kas / Expense ---------- */
VIEWS.cash = () => {
  const b=curBiz(); const list=Object.values(DB.expenses).filter(e=>e.bizId===b.id).sort((x,y)=>y.at-x.at);
  const totalOut=list.reduce((a,e)=>a+e.amount,0);
  return `<div class="row-between" style="margin:6px 0 12px"><button class="iconbtn" id="back">${icon('arrowLeft')}</button><h2 style="font-size:17px">Kas Keluar</h2><button class="iconbtn" id="addExp">${icon('plus')}</button></div>
    <div class="kpi danger" style="margin-bottom:12px"><div class="label">${icon('wallet')}Total pengeluaran</div><div class="val">${rupiah(totalOut)}</div></div>
    ${list.length?list.map(e=>`<div class="list-item"><div class="thumb danger">${icon('banknote')}</div><div class="li-main"><div class="li-title">${esc(e.note||e.category)}</div><div class="li-sub">${esc(e.category)} · ${fmtDate(e.at)}</div></div><div class="li-right"><span class="li-val" style="color:var(--danger)">${rupiah(e.amount)}</span></div></div>`).join('')
    :`<div class="empty"><div class="ico">${icon('wallet')}</div><h3>Belum ada pengeluaran</h3></div>`}`;
};
VIEWS._bind_cash = () => {
  $('#back').onclick=()=>go('more');
  $('#addExp').onclick=()=>{
    openSheet('Pengeluaran', `<div class="field"><label class="lab">Kategori</label><select id="exCat" class="select"><option>Operasional</option><option>Gaji</option><option>Sewa</option><option>Listrik</option><option>Lainnya</option></select></div>
      <div class="field"><label class="lab">Jumlah</label><input id="exAmt" class="input mono" type="number"></div>
      <div class="field"><label class="lab">Catatan</label><input id="exNote" class="input"></div>
      <button class="btn btn-primary btn-block" id="exSave">Simpan</button>`);
    $('#exSave').onclick=()=>{ const amt=parseInt($('#exAmt').value,10); if(!amt) return notify('err','Jumlah tidak valid');
      DB.expenses.unshift({id:uid(),bizId:curBiz().id,at:Date.now(),category:$('#exCat').value,amount:amt,note:$('#exNote').value}); save(DB); closeSheet(); render(); notify('ok','Tercatat') };
  };
};

/* ---------- Reports ---------- */
let RANGE=7;
VIEWS.reports = () => {
  const b=curBiz(); const since=dayStart()-((RANGE-1)*864e5);
  const days=[]; for(let i=RANGE-1;i>=0;i--){ const t=dayStart()-i*864e5; const d=DB.sales.filter(x=>x.bizId===b.id && !x.canceled && x.at>=t && x.at<t+864e5); days.push({t,rev:d.reduce((a,x)=>a+x.qty*x.price,0)}) }
  const max=Math.max(1,...days.map(d=>d.rev));
  const rev=days.reduce((a,d)=>a+d.rev,0);
  const trx=DB.sales.filter(x=>x.bizId===b.id && !x.canceled && x.at>=since).length;
  const gr=DB.sales.filter(x=>x.bizId===b.id && !x.canceled && x.showGR && x.at>=since).reduce((a,x)=>a+x.qty*x.price,0);
  const exp=Object.values(DB.expenses).filter(e=>e.bizId===b.id && e.at>=since).reduce((a,e)=>a+e.amount,0);
  const cog=DB.sales.filter(x=>x.bizId===b.id && !x.canceled && x.at>=since).reduce((a,x)=>a+x.cost*x.qty,0);
  const laba=rev-gr-cog-exp;
  return `<div class="section-title"><h2>Laporan</h2></div>
    <div class="chips" style="margin-bottom:12px">${[1,7,30,90].map(r=>`<button class="chip ${RANGE===r?'on':''}" data-range="${r}">${r===1?'Hari ini':r+' hari'}</button>`).join('')}</div>
    <div class="card"><div class="chart">${days.map(d=>`<div class="col"><div class="chart-val">${Math.round(d.rev/1000)}k</div><div class="bar"><i style="height:${Math.round(d.rev/max*100)}%"></i></div><small>${new Date(d.t).getDate()}</small></div>`).join('')}</div></div>
    <h3 class="sub">Ringkasan ${RANGE===1?'hari ini':RANGE+' hari'}</h3>
    <div class="card">
      <div class="stat-line"><span>Omzet</span><span>${rupiah(rev)}</span></div>
      <div class="stat-line"><span>Transaksi</span><span>${trx}</span></div>
      <div class="stat-line"><span>GR</span><span style="color:var(--danger)">-${rupiah(gr)}</span></div>
      <div class="stat-line"><span>HPP</span><span style="color:var(--danger)">-${rupiah(cog)}</span></div>
      <div class="stat-line"><span>Biaya</span><span style="color:var(--danger)">-${rupiah(exp)}</span></div>
      <div class="stat-line"><b>Laba bersih</b><b style="color:${laba>=0?'var(--accent)':'var(--danger)'}">${rupiah(laba)}</b></div>
    </div>
    <h3 class="sub">Produk terlaris</h3>
    ${topProducts(b.id,since,5).map(x=>`<div class="list-item"><div class="li-main"><div class="li-title">${esc(x.name)}</div><div class="li-sub">${x.qty} terjual</div></div><div class="li-right"><span class="li-val">${rupiah(x.rev)}</span></div></div>`).join('')||'<p class="muted" style="font-size:13px">Belum ada data.</p>'}`;
};
function topProducts(bid, since, n){
  const map={}; DB.sales.filter(x=>x.bizId===bid && !x.canceled && x.at>=since).forEach(x=>{ const o=map[x.productId]||(map[x.productId]={name:x.name,qty:0,rev:0}); o.qty+=x.qty; o.rev+=x.qty*x.price });
  return Object.values(map).sort((a,b)=>b.qty-a.qty).slice(0,n);
}
VIEWS._bind_reports = () => { $$('[data-range]').forEach(b=>b.onclick=()=>{ RANGE=+b.dataset.range; render() }) };

/* ---------- Search ---------- */
VIEWS.search = () => `<div class="section-title"><h2>Cari</h2></div>
  <input id="gq" class="input" placeholder="Produk, transaksi, supplier…" autofocus>
  <div id="gres" style="margin-top:14px"></div>`;
VIEWS._bind_search = () => { const q=$('#gq'); q.oninput=debounce(()=>{
  const b=curBiz(); const ql=q.value.toLowerCase(); const box=$('#gres'); if(!ql){ box.innerHTML=''; return }
  const prods=bizProducts(b.id).filter(p=>p.name.toLowerCase().includes(ql)||(p.barcode||'').includes(ql)).slice(0,6);
  const sups=Object.values(DB.suppliers).filter(s=>s.bizId===b.id && s.name.toLowerCase().includes(ql)).slice(0,4);
  box.innerHTML = (prods.map(p=>`<button class="list-item" data-rp="${p.id}"><div class="thumb">${icon('package')}</div><div class="li-main"><div class="li-title">${esc(p.name)}</div><div class="li-sub">stok ${p.stock}</div></div></button>`).join('')
    +sups.map(s=>`<div class="list-item"><div class="thumb">${icon('truck')}</div><div class="li-main"><div class="li-title">${esc(s.name)}</div><div class="li-sub">supplier</div></div></div>`).join(''))
    || '<p class="muted">Tidak ada hasil.</p>';
  $$('[data-rp]').forEach(b=>b.onclick=()=>go('product',{id:b.dataset.rp}));
},250) };

/* ---------- Notifs ---------- */
VIEWS.notifs = () => {
  const low=lowStockList(), exp=expiredList(), expd=expiringList(), opIdx=Object.values(DB.purchases).filter(p=>p.status==='ordered');
  return `<div class="row-between" style="margin:6px 0 12px"><button class="iconbtn" id="back">${icon('arrowLeft')}</button><h2 style="font-size:17px">Perlu perhatian</h2><span></span></div>
    ${low.length?`<h3 class="sub">Stok menipis (${low.length})</h3>${low.map(p=>`<button class="list-item" data-p="${p.id}"><div class="thumb warn">${icon('alert')}</div><div class="li-main"><div class="li-title">${esc(p.name)}</div><div class="li-sub">sisa ${p.stock} ≤ min ${p.minStock}</div></div></button>`).join('')}`:''}
    ${exp.length?`<h3 class="sub">Expired (${exp.length})</h3>${exp.map(x=>`<button class="list-item" data-p="${x.productId}"><div class="thumb danger">${icon('clock')}</div><div class="li-main"><div class="li-title">${esc(x.p.name)}</div><div class="li-sub">exp ${fmtDate(x.t.exp)}</div></div></button>`).join('')}`:''}
    ${!low.length&&!exp.length&&!expd.length&&!opIdx.length?'<div class="empty"><div class="ico">'+icon('checkcircle')+'</div><h3>Semua aman</h3></div>':''}`;
};
VIEWS._bind_notifs = () => { $('#back').onclick=()=>go('dashboard'); $$('[data-p]').forEach(b=>b.onclick=()=>go('product',{id:b.dataset.p})) };

/* ---------- More menu ---------- */
VIEWS.more = () => {
  const b=curBiz();
  const items=[
    ['suppliers','Supplier','truck',`${Object.values(DB.suppliers).filter(s=>s.bizId===b.id).length} supplier`],
    ['po','Purchase Order','truckin',`${Object.values(DB.purchases).filter(p=>p.bizId===b.id).length} PO`],
    ['opname','Opname stok','package','penyesuaian fisik'],
    ['expired','Expired','clock',`${expiredList().length} produk`],
    ['expiring','Hampir expired','calendar',`${expiringList().length} produk`],
    ['cash','Kas keluar','wallet','pengeluaran'],
    ['reports','Laporan','bar','omzet & laba'],
    ['kasir','Kasir / POS','cart','transaksi jual'],
    ['stocktakes','Stock opname batch','history','riwayat opname'],
    ['audit','Log audit','history','aktivitas'],
    ['settings','Pengaturan','settings','toko & PIN'],
  ];
  return `<div class="section-title"><h2>Lainnya</h2></div>
    <div class="card row-between" style="margin-bottom:12px"><div><div style="font-weight:700">${esc(b.name)}</div><div class="muted" style="font-size:12px">${esc(b.owner||'')} · ${esc(b.phone||'')}</div></div><button class="iconbtn" id="editBiz">${icon('edit')}</button></div>
    ${items.map(([v,label,ic,sub])=>`<button class="list-item" data-go="${v}"><div class="thumb">${icon(ic)}</div><div class="li-main"><div class="li-title">${label}</div><div class="li-sub">${sub}</div></div><div class="li-right">${icon('arrowRight')}</div></button>`).join('')}`;
};
VIEWS._bind_more = () => { $$('[data-go]').forEach(b=>b.onclick=()=>go(b.dataset.go)); $('#editBiz').onclick=()=>go('settings') };

/* ---------- Stocktakes ---------- */
VIEWS.stocktakes = () => {
  const b=curBiz(); const list=Object.values(DB.stocktakes).filter(s=>s.bizId===b.id).sort((x,y)=>y.at-x.at);
  return `<div class="row-between" style="margin:6px 0 12px"><button class="iconbtn" id="back">${icon('arrowLeft')}</button><h2 style="font-size:17px">Riwayat opname</h2></div>
    ${list.length?list.map(s=>`<div class="list-item"><div class="thumb"><b>${s.at+1}</b></div><div class="li-main"><div class="li-title">${fmtDateTime(s.at)}</div><div class="li-sub">${fmtDate(s.at)}</div></div></div>`).join('')
    :`<div class="empty"><div class="ico">${icon('history')}</div><h3>Belum ada opname</h3></div>`}`;
};
VIEWS._bind_stocktakes = () => { $('#back').onclick=()=>go('more') };

/* ---------- Audit ---------- */
VIEWS.audit = () => `<div class="row-between" style="margin:6px 0 12px"><button class="iconbtn" id="back">${icon('arrowLeft')}</button><h2 style="font-size:17px">Log audit</h2></div>
  ${DB.audits.length?DB.audits.slice(0,100).map(a=>`<div class="list-item"><div class="thumb">${icon('history')}</div><div class="li-main"><div class="li-title">${esc(a.action)}</div><div class="li-sub">${esc(a.detail||'')} · ${fmtDateTime(a.at)}</div></div></div>`).join('')
  :`<div class="empty"><div class="ico">${icon('history')}</div><h3>Kosong</h3></div>`}`;
VIEWS._bind_audit = () => { $('#back').onclick=()=>go('more') };

/* ---------- Settings ---------- */
VIEWS.settings = () => {
  const s=DB.settings; const b=curBiz();
  return `<div class="row-between" style="margin:6px 0 12px"><button class="iconbtn" id="back">${icon('arrowLeft')}</button><h2 style="font-size:17px">Pengaturan</h2><span></span></div>
    <h3 class="sub">Toko</h3>
    <div class="card">
      <div class="field"><label class="lab">Nama toko</label><input id="stName" class="input" value="${esc(b.name)}"></div>
      <div class="field"><label class="lab">Pemilik</label><input id="stOwner" class="input" value="${esc(b.owner||'')}"></div>
      <div class="field"><label class="lab">Alamat</label><input id="stAddr" class="input" value="${esc(b.address||'')}"></div>
      <div class="field"><label class="lab">Telepon</label><input id="stPhone" class="input" value="${esc(b.phone||'')}"></div>
      <div class="field"><label class="lab">Mode harga</label><select id="stPriceMode" class="select"><option value="markup" ${b.priceMode==='markup'?'selected':''}>Markup (HPP + margin)</option><option value="fixed" ${b.priceMode==='fixed'?'selected':''}>Harga tetap</option></select></div>
      <button class="btn btn-primary btn-block" id="stSave">${icon('check')}Simpan</button>
    </div>
    <h3 class="sub">Keamanan</h3>
    <div class="card">
      <div class="setting-row"><div class="sr-main"><div class="sr-title">PIN aplikasi</div><div class="sr-desc">${s.pin?'Aktif':'Nonaktif'}</div></div><div class="switch"><input type="checkbox" id="pinOn" ${s.pin?'checked':''}><span class="track"></span><span class="knob"></span></div></div>
      <div class="setting-row"><div class="sr-main"><div class="sr-title">Kunci otomatis 5 menit</div><div class="sr-desc">Terkunci saat idle</div></div><div class="switch"><input type="checkbox" id="autoLock" ${s.autoLock?'checked':''}><span class="track"></span><span class="knob"></span></div></div>
    </div>
    <h3 class="sub">Notifikasi</h3>
    <div class="card">
      <div class="setting-row"><div class="sr-main"><div class="sr-title">Stok menipis</div><div class="sr-desc">Peringatan stok ≤ minimum</div></div><div class="switch"><input type="checkbox" id="lowAlert" ${s.lowstockAlert?'checked':''}><span class="track"></span><span class="knob"></span></div></div>
      <div class="setting-row"><div class="sr-main"><div class="sr-title">Expired</div><div class="sr-desc">Peringatan produk kedaluwarsa</div></div><div class="switch"><input type="checkbox" id="expAlert" ${s.expiryAlert?'checked':''}><span class="track"></span><span class="knob"></span></div></div>
    </div>
    <h3 class="sub">Backup</h3>
    <div class="btn-row"><button class="btn btn-ghost" id="expJson">${icon('download')}Export</button><button class="btn btn-ghost" id="impJson">${icon('upload')}Import</button><button class="btn btn-ghost" id="expCsv">${icon('file')}CSV</button></div>
    <div class="divider"></div>
    <button class="btn btn-danger-soft btn-block" id="resetAll">${icon('trash')}Reset semua data</button>
    <p class="muted center" style="font-size:11.5px;margin-top:14px">SiGap v${APP_VERSION} · offline-first</p>`;
};
VIEWS._bind_settings = () => {
  $('#back').onclick=()=>go('more');
  $('#stSave').onclick=()=>{ const b=curBiz(); b.name=$('#stName').value.trim()||b.name; b.owner=$('#stOwner').value; b.address=$('#stAddr').value; b.phone=$('#stPhone').value; b.priceMode=$('#stPriceMode').value; save(DB); notify('ok','Pengaturan tersimpan') };
  $('#pinOn').onchange=async e=>{ if(e.target.checked){ const ph=await sha256('pin:'+prompt('PIN baru (4–6 digit):')||''); if(ph){ DB.settings.pin=ph; save(DB); notify('ok','PIN aktif') } else e.target.checked=false } else { DB.settings.pin=null; save(DB); notify('ok','PIN nonaktif') } render() };
  $('#autoLock').onchange=e=>{ DB.settings.autoLock=e.target.checked; save(DB) };
  $('#lowAlert').onchange=e=>{ DB.settings.lowstockAlert=e.target.checked; save(DB) };
  $('#expAlert').onchange=e=>{ DB.settings.expiryAlert=e.target.checked; save(DB) };
  $('#expJson').onclick=()=>{ const blob=new Blob([JSON.stringify(DB,null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=`sigap-backup-${todayKey()}.json`; a.click() };
  $('#expCsv').onclick=()=>{ const b=curBiz(); const rows=[['nama','barcode','kategori','hpp','harga','stok','min']]; bizProducts(b.id).forEach(p=>rows.push([p.name,p.barcode||'',(DB.cats[p.catId]||{}).name||'',p.cost,p.price,p.stock,p.minStock]));
    const csv=rows.map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n'); const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'})); a.download=`produk-${todayKey()}.csv`; a.click() };
  $('#impJson').onclick=()=>{ const inp=document.createElement('input'); inp.type='file'; inp.accept='.json'; inp.onchange=()=>{ const f=inp.files[0]; const r=new FileReader(); r.onload=()=>{ try{ const d=JSON.parse(r.result); if(!d.biz||!d.products) throw 0; DB=d; save(DB); notify('ok','Backup dimuat'); go('dashboard') }catch(e){ notify('err','File tidak valid') } }; r.readAsText(f) }; inp.click() };
  $('#resetAll').onclick=()=>confirmSheet('Reset semua','Semua data toko di HP ini akan dihapus.','Reset',()=>{ localStorage.removeItem(KEY); DB=seedDb(); DB.session={init:false}; save(DB); ONB={step:1,name:'',addr:'',type:'Minuman',pin:''}; go('onboarding') });
};

/* ---------- Boot ---------- */
function boot(){
  if(!DB){ DB=seedDb(); DB.session={init:false}; save(DB) }
  if(!DB.session) DB.session={init:false};
  if(!DB.audits) DB.audits=[];
  if(!DB.expenses) DB.expenses=[];
  if(!DB.settings.autoLock===undefined) DB.settings.autoLock=false;
  CUR_BIZ=DB.settings.currentBiz;
  const deep = new URLSearchParams(location.search).get('v');
  let idleT;
  const resetIdle=()=>{ clearTimeout(idleT); if(DB.settings.pin && DB.settings.autoLock && DB.session&&DB.session.init) idleT=setTimeout(lockNow, 300000) };
  ['click','keydown','touchstart'].forEach(ev=>document.addEventListener(ev, resetIdle, {passive:true}));
  render();
  if(deep && VIEWS[deep]) go(deep);
  if('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(()=>{});
}
boot();

/* expose for debugging */
window.SIGAP={go,DB:()=>DB,route:()=>ROUTE};
