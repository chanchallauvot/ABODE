/* ABODE fun layer: Bias lens (shows the behavioural nudges used on each page) + playful cursor */
const BIAS=[
 ['.proof','Social proof','Ratings and renter counts reassure first-time visitors.'],
 ['.marquee','Reciprocity','Free delivery, swaps and fast deposits are shown before we ask for anything.'],
 ['.bcard .price,.bpin .price','Anchoring','The struck-out full price makes the bundle price feel smaller.'],
 ['.bcard .save','Loss aversion','Savings are framed in ₹ per month, so skipping the bundle feels like losing money.'],
 ['.bcard .socialp','Social proof','"536 renters" signals that others already chose this room.'],
 ['.bcard .bact .btn:not(.ghost),.bpin .bact .btn:not(.ghost)','Bundling','One click for a whole room cuts decision fatigue and lifts order value.'],
 ['.badge.Bestseller','Bandwagon effect','"Bestseller" nudges people toward what others pick.'],
 ['.badge.Staff','Authority','A "Staff Pick" borrows the stylist\'s credibility.'],
 ['.plans','Decoy effect','The 6-month plan sits close to 12 months in price, making 12 months look like the obvious deal.'],
 ['.plan .d','Unit pricing','Showing ₹/day makes the monthly rent feel tiny.'],
 ['.plan.on','Default effect','12 months is pre-selected. Most people keep the default.'],
 ['.pairs','Cross-sell','Matching pieces with an extra 10% off raise basket size.'],
 ['.ship','Goal gradient','The progress bar to ₹800 makes people add one more thing to unlock free delivery.'],
 ['.addon','Gap filler','Add-ons are priced below the ₹299 delivery fee, so adding one feels free.'],
 ['.calc','Anchoring','Comparing against buying new makes renting look like the smart choice.'],
 ['.rstrip','Social proof','Reviews from people in similar flats and cities.'],
 ['.wheel','Curiosity gap','A rotating showcase keeps the eye moving and invites a click.'],
 ['.stickybuy','Commitment','The add-to-cart bar stays with you while you scroll.']
];
let LENS=false;try{LENS=sessionStorage.getItem('abode_lens')==='1'}catch(e){}
function applyBias(){
  $$('.btag').forEach(t=>t.remove());$$('[data-biased]').forEach(e=>e.removeAttribute('data-biased'));
  if(!LENS){updLens(0);return}
  let n=0;const seen=new Set();
  BIAS.forEach(([sel,name,why])=>{$$(sel).forEach((el,i)=>{if(i>2||el.closest('.drawer:not(.open)'))return;
    el.setAttribute('data-biased','');const t=document.createElement('span');t.className='btag';t.tabIndex=0;t.innerHTML=`<b>${name}</b><span>${why}</span>`;el.appendChild(t);seen.add(name);n++})});
  updLens(seen.size)}
function updLens(n){const b=$('#lensbtn');if(!b)return;b.classList.toggle('on',LENS);b.setAttribute('aria-pressed',LENS);
  b.innerHTML=`<span class="lb">🧠</span><span>Bias lens</span><span class="ls">${LENS?`${n} on this page`:'off'}</span>`;document.body.classList.toggle('lens',LENS)}
function lensInit(){
  const b=document.createElement('button');b.id='lensbtn';b.className='lensbtn';b.type='button';
  b.title='Show the behavioural nudges used on this page';document.body.appendChild(b);
  b.onclick=()=>{LENS=!LENS;try{sessionStorage.setItem('abode_lens',LENS?'1':'0')}catch(e){};applyBias();if(LENS)toast('Bias lens on: every nudge on this page is labelled. Hover a label for the why.')};
  let tm=null;
  const obs=new MutationObserver(()=>{if(!LENS)return;clearTimeout(tm);tm=setTimeout(()=>{obs.disconnect();applyBias();watch()},250)});
  const watch=()=>{obs.observe($('#view'),{childList:true,subtree:true});obs.observe($('#drawer'),{childList:true,subtree:true})};watch();
  updLens(0)}

/* playful cursor: a dot plus a ring that grows into a "rent me" bubble over furniture */
function cursorInit(){
  if(!matchMedia('(hover:hover) and (pointer:fine)').matches||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const d=document.createElement('div');d.className='cdot';const r=document.createElement('div');r.className='cring';r.innerHTML='<span></span>';
  d.style.opacity=r.style.opacity=0;document.body.append(d,r);document.body.classList.add('fancycursor');
  let x=innerWidth/2,y=innerHeight/2,rx=x,ry=y;
  addEventListener('mousemove',e=>{d.style.opacity=r.style.opacity=1;x=e.clientX;y=e.clientY;d.style.transform=`translate(${x}px,${y}px)`;
    const t=e.target;const card=t.closest&&t.closest('.pop,.bcard,.lc,.ob,.disc,.mini,.iroom,.cat');const link=t.closest&&t.closest('a,button,select,input,label,[role=tab]');
    r.classList.toggle('big',!!card);r.classList.toggle('link',!card&&!!link);
    r.firstChild.textContent=card?(card.classList.contains('iroom')?'peek':card.classList.contains('bcard')?'whole room':'rent me'):''},{passive:true});
  addEventListener('mousedown',()=>r.classList.add('down'));addEventListener('mouseup',()=>r.classList.remove('down'));
  document.addEventListener('mouseleave',()=>{d.style.opacity=r.style.opacity=0});document.addEventListener('mouseenter',()=>{d.style.opacity=r.style.opacity=1});
  (function loop(){rx+=(x-rx)*.18;ry+=(y-ry)*.18;r.style.transform=`translate(${rx}px,${ry}px)`;requestAnimationFrame(loop)})()}
