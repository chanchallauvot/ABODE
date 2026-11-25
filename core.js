/* ABODE core: data, state, cart, helpers, routing */
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const inr=n=>'₹'+Math.round(n).toLocaleString('en-IN');
const FREE=800, DELIVERY=299, CARE_FEE=49;
let P=[],BY={},BUN=[],BUNBY={};
function load(k,d){try{const v=localStorage.getItem('abode_'+k);return v?JSON.parse(v):d}catch(e){return d}}
function save(k){try{localStorage.setItem('abode_'+k,JSON.stringify(S[k]))}catch(e){}}
const S={cart:load('cart',[]),wish:load('wish',[]),user:load('user',null),orders:load('orders',[]),saved:load('saved',[]),care:false};
const W=id=>`img/t/${id}.webp`, Bg=id=>`img/b/${id}.webp`, T=W, HT=W;
const STYLE={minimal:'Minimal',cutesy:'Cutesy',quirky:'Quirky'};
const NEEDS={first:'First flat',wfh:'WFH corner',host:'Hosting the gang',small:'Small-space saver',cosy:'Cosy nights in'};
const ROOMS={living:'Living room',bedroom:'Bedroom',decor:'Decor'};
const PLAN={3:'3 months',6:'6 months',12:'12 months'};
const CN=[['Cream','#f5f0e6'],['Oat','#e7dfd2'],['Sand','#c9b8a3'],['Ivory','#ffffff'],['Blush','#f4b6c2'],['Bubblegum','#f472a6'],['Peach','#f2b8a8'],['Rose','#b5546a'],['Merlot','#6d1a2c'],['Cherry','#c1121f'],['ABODE red','#940501'],['Tomato','#e04a2f'],['Tangerine','#f28c28'],['Butter','#f6e2a1'],['Lemon','#f6d55c'],['Sage','#9caf88'],['Olive','#6b7a4b'],['Forest','#3f6b3a'],['Mint','#9ee0d0'],['Aqua','#5ec2d0'],['Sky','#96baec'],['Powder blue','#c7d6ea'],['Cobalt','#1d4ed8'],['Navy','#1d3557'],['Lilac','#c3b1e1'],['Walnut','#5a3825'],['Oak','#c9a36b'],['Cocoa','#7a4a2b'],['Brass','#c8a35b'],['Chrome','#c9c9c9'],['Grey','#8a8a8a'],['Charcoal','#262626']];
function cname(h){const t=hx(h);let best=CN[0],bd=1e9;for(const c of CN){const v=hx(c[1]);const d=(v[0]-t[0])**2+(v[1]-t[1])**2+(v[2]-t[2])**2;if(d<bd){bd=d;best=c}}return best[0]}
function hx(h){h=h.replace('#','');return[0,2,4].map(i=>parseInt(h.substr(i,2),16))}
function rnd(seed){let s=seed*9301+49297;return()=>{s=(s*9301+49297)%233280;return s/233280}}
function planPrice(p,plan){return p.price['m'+plan]}
function rating(p){const r=rnd(p.id);return{avg:(4.3+r()*0.6).toFixed(1),n:40+Math.floor(r()*460)}}
const RN=['Ananya','Kabir','Ishita','Rohan','Meher','Aarav','Zoya','Vihaan','Tanya','Arjun','Sana','Neel','Riya','Dev','Kiara','Yash','Aisha','Kunal','Pooja','Advait','Nikita','Sid'];
const RC=['Bengaluru','Pune','Mumbai','Gurugram','Hyderabad','Noida','Navi Mumbai','Delhi'];
const RT={
 minimal:['Exactly the calm I wanted in my rented 1BHK. Looks way pricier than the monthly rent.','Delivery guys set it up in 20 mins and took all the packaging. Zero stress.','Clean lines, solid build. My landlord thinks I bought it. I did not correct him.','Swapped from my old grey everything to this and the flat finally feels like mine.'],
 cutesy:['I screamed when it arrived. Cuter in person, and so soft.','My Instagram has never looked better. Every friend asks where it is from.','Rented for 6 months, already extending. My room feels like a hug now.','Exactly the colour in the photos, which never happens. 10/10 would rent again.'],
 quirky:['Every single guest takes a photo with it. Best conversation starter ever.','I was nervous it would be too much. It is the perfect amount of too much.','Weird in the best way. My flatmates fight over who gets to use it.','Built properly, not flimsy at all. And it makes me laugh every morning.']};
function reviews(p){const r=rnd(p.id*7);const t=RT[p.style];return[0,1,2].map(i=>({n:RN[Math.floor(r()*RN.length)],c:RC[Math.floor(r()*RC.length)],s:r()>.25?5:4,t:t[(p.id+i)%t.length],m:['3','6','12'][Math.floor(r()*3)]}))}
const AVC=['#940501','#96baec','#cf4a30','#2f7d4f','#7a5fa8','#e8a33d'];
/* ---------- cart ---------- */
function lineData(l){
  if(l.kind==='b'){const b=BUNBY[l.id];return{name:b.name,img:W(b.items[0]),monthly:b.price*l.qty,buy:0,dep:b.items.reduce((a,i)=>a+BY[i].deposit,0)*l.qty,sub:`Bundle · ${b.items.length} pieces · 12-month plan`,url:'#b-'+b.id}}
  const p=BY[l.id];
  if(l.mode==='buy')return{name:p.name,img:W(p.id),monthly:0,buy:p.buy*l.qty,dep:0,sub:`Buy`,url:'#p-'+p.id};
  const base=planPrice(p,l.plan),d=Math.round(base*(l.disc||0)/100);
  return{name:p.name,img:W(p.id),monthly:(base-d)*l.qty,base:base*l.qty,buy:0,dep:p.deposit*l.qty,sub:`Rent · ${PLAN[l.plan]}${l.disc?` · ${l.disc}% bundle saving`:''}`,url:'#p-'+p.id}
}
function totals(){let m=0,b=0,dep=0,saved=0;for(const l of S.cart){const d=lineData(l);m+=d.monthly;b+=d.buy;dep+=d.dep;if(d.base)saved+=d.base-d.monthly;if(l.kind==='b'){const bb=BUNBY[l.id];saved+=bb.save*l.qty}}
  const pre=m+b, deliv=S.cart.length&&pre<FREE?DELIVERY:0, care=S.care&&m>0?CARE_FEE:0;
  return{m,b,dep,pre,deliv,care,saved,gap:Math.max(0,FREE-pre),due:m+b+dep+deliv+care,count:S.cart.reduce((a,l)=>a+l.qty,0)}}
function addLine(l,el){
  const same=S.cart.find(x=>x.kind===l.kind&&x.id===l.id&&x.plan===l.plan&&x.mode===l.mode&&x.color===l.color&&(x.disc||0)===(l.disc||0));
  const before=totals().pre;
  if(same)same.qty+=l.qty||1;else S.cart.push({qty:1,...l});
  save('cart');updateCount(true);
  if(el)fly(el);
  const t=totals();
  if(before<FREE&&t.pre>=FREE){confetti();toast('Free delivery unlocked 🎉','View cart',openCart)}
  else toast(`Added. ${t.gap?inr(t.gap)+' to free delivery':'Free delivery unlocked'}`,'View cart',openCart);
}
function quickAdd(id,el){const p=BY[id];addLine({kind:'p',id,plan:12,mode:'rent',color:p.colors[0]},el)}
function updateCount(b){const c=$('#cc');if(!c)return;const n=totals().count;c.textContent=n;c.style.display=n?'grid':'none';if(b){c.classList.remove('bump');void c.offsetWidth;c.classList.add('bump')}}
function fly(el){try{const img=el.closest('[data-img]')?.dataset.img;if(!img)return;const r=el.getBoundingClientRect(),t=$('#cartbtn').getBoundingClientRect();const f=document.createElement('img');f.src=img;f.className='flyer';f.style.left=r.left+'px';f.style.top=r.top-40+'px';document.body.appendChild(f);requestAnimationFrame(()=>{f.style.left=t.left+'px';f.style.top=t.top+'px';f.style.transform='scale(.2)';f.style.opacity='.4'});setTimeout(()=>f.remove(),800)}catch(e){}}
function toggleWish(id,btn){const i=S.wish.indexOf(id);if(i>-1)S.wish.splice(i,1);else S.wish.push(id);save('wish');if(btn){btn.classList.toggle('on',i<0);btn.setAttribute('aria-pressed',i<0)}toast(i<0?'Saved to wishlist':'Removed from wishlist')}
/* ---------- UI helpers ---------- */
let tt;function toast(msg,act,fn){const t=$('#toast');t.innerHTML=`<span>${esc(msg)}</span>${act?`<button id="tact">${esc(act)}</button>`:''}`;t.classList.add('show');if(act)$('#tact').onclick=()=>{t.classList.remove('show');fn()};clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('show'),3600)}
function confetti(){const c=document.createElement('div');c.className='confetti';const cols=['#940501','#96baec','#f6d55c','#f4a6c0','#cf4a30'];for(let i=0;i<70;i++){const s=document.createElement('i');s.style.left=Math.random()*100+'%';s.style.background=cols[i%5];s.style.animationDelay=Math.random()*.6+'s';s.style.animationDuration=1.6+Math.random()*1.4+'s';c.appendChild(s)}document.body.appendChild(c);setTimeout(()=>c.remove(),3600)}
const IC={
 heart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7.5-4.6-9.5-9.3C1 8 3.3 4.5 7 4.5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.7 0 6 3.5 4.5 7.2C19.5 16.4 12 21 12 21z"/></svg>',
 cart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6.2"/><circle cx="10" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/></svg>',
 user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>',
 search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>',
 menu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
 truck:'<svg viewBox="0 0 24 24" fill="none" stroke="#940501" stroke-width="2" width="28" height="28"><path d="M2 6h11v9H2zM13 9h4l4 4v2h-8z"/><circle cx="6" cy="17" r="2" fill="#fff4e2"/><circle cx="17" cy="17" r="2" fill="#fff4e2"/></svg>',
 swap:'<svg viewBox="0 0 24 24" fill="none" stroke="#940501" stroke-width="2" width="28" height="28"><path d="M4 8h13l-3-3M20 16H7l3 3"/></svg>',
 shield:'<svg viewBox="0 0 24 24" fill="none" stroke="#940501" stroke-width="2" width="28" height="28"><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m8.5 12 2.5 2.5 4.5-5"/></svg>',
 cal:'<svg viewBox="0 0 24 24" fill="none" stroke="#940501" stroke-width="2" width="28" height="28"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
 spark:'<svg viewBox="0 0 24 24" fill="none" stroke="#940501" stroke-width="2" width="28" height="28"><path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M19 5l-4 4M9 15l-4 4"/></svg>',
};
/* doodles */
const DOOD={
 star:(c='#96baec',s=70)=>`<svg width="${s}" height="${s}" viewBox="0 0 100 100"><path d="M50 4 61 38 96 38 68 59 79 94 50 72 21 94 32 59 4 38 39 38z" fill="${c}" stroke="#262626" stroke-width="3" stroke-linejoin="round"/></svg>`,
 squig:(c='#940501',w=140)=>`<svg width="${w}" height="40" viewBox="0 0 140 40"><path d="M4 20c12-18 22 18 34 0s22 18 34 0 22 18 34 0 22 18 30 0" fill="none" stroke="${c}" stroke-width="6" stroke-linecap="round"/></svg>`,
 flower:(c='#f4a6c0',s=80)=>`<svg width="${s}" height="${s}" viewBox="0 0 100 100"><g fill="${c}" stroke="#262626" stroke-width="3">${[0,72,144,216,288].map(a=>`<ellipse cx="50" cy="26" rx="16" ry="22" transform="rotate(${a} 50 50)"/>`).join('')}</g><circle cx="50" cy="50" r="13" fill="#f6d55c" stroke="#262626" stroke-width="3"/></svg>`,
 arrow:(c='#262626',w=110)=>`<svg width="${w}" height="70" viewBox="0 0 110 70"><path d="M6 60C30 10 70 4 100 22" fill="none" stroke="${c}" stroke-width="4" stroke-linecap="round"/><path d="M88 10l13 12-17 6" fill="none" stroke="${c}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
 house:(s=90)=>`<svg width="${s}" height="${s}" viewBox="0 0 100 100"><path d="M14 46 50 14l36 32v42H14z" fill="#fff4e2" stroke="#262626" stroke-width="4" stroke-linejoin="round"/><path d="M40 88V62h20v26" fill="#96baec" stroke="#262626" stroke-width="4"/><path d="M8 50 50 12l42 38" fill="none" stroke="#940501" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
 heart:(c='#cf4a30',s=60)=>`<svg width="${s}" height="${s}" viewBox="0 0 100 100"><path d="M50 86S10 62 10 34c0-14 11-24 23-24 8 0 14 4 17 11 3-7 9-11 17-11 12 0 23 10 23 24 0 28-40 52-40 52z" fill="${c}" stroke="#262626" stroke-width="4"/></svg>`,
};
/* ---------- product card ---------- */
function card(p){
  return `<article class="pop vibe-${p.style} rv" data-img="${W(p.id)}">
  <a class="cover" href="#p-${p.id}" aria-label="${esc(p.name)}, ${inr(p.price.m12)} a month" tabindex="-1"></a><div class="ph"><img src="${W(p.id)}" alt="" loading="lazy"></div>
  <div class="bd">${p.badge?`<span class="badge ${p.badge.split(' ')[0]}">${esc(p.badge)}</span>`:''}
   <button class="heart ${S.wish.includes(p.id)?'on':''}" data-wish="${p.id}" aria-label="Save ${esc(p.name)} to wishlist" aria-pressed="${S.wish.includes(p.id)}">${IC.heart}</button>
   <span class="meta">${STYLE[p.style]} · ${esc(p.catName)}</span>
   <h3><a href="#p-${p.id}">${esc(p.name)}</a></h3>
   <div class="row"><span class="pm">${inr(p.price.m12)}<small>/mo</small></span><button class="qa" data-qa="${p.id}" aria-label="Add ${esc(p.name)} to cart">+</button></div></div></article>`}
function mcard(p){return card(p).replace(' rv"','"')}
const SCALE={sofa:1,bed:1.05,wardrobe:.8,dining:1,tv:.9,dresser:.75,chair:.55,coffee:.55,nightstand:.5,lamp:.7,carpet:.65,mirror:.55,vase:.35,beanbag:.6,swing:.8};
const ORDER={wardrobe:0,mirror:1,swing:2,bed:3,sofa:3,dining:3,tv:4,dresser:4,lamp:5,beanbag:6,chair:6,nightstand:7,carpet:8,coffee:9,vase:10};
function arrange(ids,total=125,cap=46){const L=ids.map(i=>BY[i]).filter(Boolean).sort((a,b)=>ORDER[a.cat]-ORDER[b.cat]);const sum=L.reduce((a,p)=>a+SCALE[p.cat],0)||1;const K=Math.min(cap,total/sum);
 return L.map((p,i)=>`<span class="ci" style="width:${(SCALE[p.cat]*K).toFixed(1)}%;z-index:${i+1}"><img src="${W(p.id)}" alt="${esc(p.name)}" loading="lazy" style="animation-delay:${i*.07}s"></span>`).join('')}
function bySize(items){return items.map(i=>BY[i]).filter(Boolean).sort((a,b)=>SCALE[b.cat]-SCALE[a.cat])}
function cut(p){const b=p.bb||[0,0,1,1],w=b[2]-b[0],h=b[3]-b[1],ar=(w*960)/(h*1200);return `<span class="cut" style="--ar:${ar.toFixed(3)};--x:${b[0]};--y:${b[1]};--w:${w.toFixed(3)};--h:${h.toFixed(3)}"><img src="${W(p.id)}" alt="${esc(p.name)}" loading="lazy"></span>`}
function look(items,n=3,cls='trio',cap=false){const L=bySize(items).slice(0,n);return `<div class="look ${cls} n${L.length}">${L.map((p,i)=>`<${cap?'a href="#p-'+p.id+'"':'span'} class="lc" style="animation-delay:${i*.06}s"><span class="li">${cut(p)}</span>${cap?`<b>${esc(p.name)}</b><small>${inr(p.price.m12)}/mo</small>`:''}</${cap?'a':'span'}>`).join('')}</div>`}
function lineup(items,n=3,H=200){let L=bySize(items).slice(0,n);if(L.length===3)L=[L[1],L[0],L[2]];
  const ars=L.map(p=>{const b=p.bb||[0,0,1,1];return (b[2]-b[0])*960/((b[3]-b[1])*1200)});const sw=L.reduce((a,p,i)=>a+SCALE[p.cat]*ars[i],0);
  return `<div class="lineup" style="--sw:${sw.toFixed(3)};--H:${H}px">${L.map((p,i)=>`<span class="lu" style="flex:${(SCALE[p.cat]*ars[i]).toFixed(3)} 1 0;animation-delay:${i*.07}s">${cut(p)}</span>`).join('')}</div>`}
function collage(items){return lineup(items,3,215)}
function bcard(b){return `<article class="bcard vibe-${b.vibe} rv"><div class="bgc"></div><a class="collage" href="#b-${b.id}" aria-label="${esc(b.name)}">${collage(b.items)}</a>
 <span class="badge">${STYLE[b.vibe]}</span>
 <div class="bd"><h3>${esc(b.name)}</h3><p class="muted" style="margin:0">${esc(b.line)} ${b.items.length} pieces.</p>
 <div class="price"><span class="pricebig">${inr(b.price)}/mo</span><span class="strike">${inr(b.full)}</span></div>
 <span class="save">Save ${inr(b.save)} every month</span>
 <span class="socialp"><span class="stars">★</span> ${(4.7+(b.save%3)/10).toFixed(1)} · ${300+b.save} renters</span>
 <div class="bact"><button class="btn sm" data-addb="${b.id}" data-img="${W(b.items[0])}">Rent this room</button><a class="btn sm ghost" href="#b-${b.id}">Customise</a></div></div></article>`}
/* global delegated events */
document.addEventListener('click',e=>{
  const q=e.target.closest('[data-qa]');if(q){e.preventDefault();quickAdd(+q.dataset.qa,q);return}
  const w=e.target.closest('[data-wish]');if(w){e.preventDefault();toggleWish(+w.dataset.wish,w);return}
  const s=e.target.closest('[data-sw]');if(s){const box=s.parentElement;$$('button',box).forEach(b=>b.classList.remove('on'));s.classList.add('on');return}
  const ab=e.target.closest('[data-addb]');if(ab){addLine({kind:'b',id:ab.dataset.addb,plan:12,mode:'rent',color:''},ab);return}
  const oc=e.target.closest('[data-opencart]');if(oc){e.preventDefault();openCart();return}
});
/* reveal on scroll */
const io=('IntersectionObserver' in window)?new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{rootMargin:'0px 0px -40px 0px'}):null;
function reveal(){$$('.rv:not(.in)').forEach(el=>io?io.observe(el):el.classList.add('in'))}
