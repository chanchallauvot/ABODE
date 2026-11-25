/* ABODE router + boot */
const ROUTES={home:[vHome,homeAfter],shop:[vShop,shopAfter],bundles:[vBundles],build:[vBuild,buildAfter],cart:[vCart,cartAfter],checkout:[vCheckout,checkoutAfter],done:[vDone,doneAfter],login:[vLogin,loginAfter],account:[vAccount,accountAfter],quiz:[vQuiz,quizAfter],inspo:[vInspo,inspoAfter],how:[vHow],about:[vAbout],help:[vHelp,helpAfter],ea1:[vEA1,ea1After]};
let lastRoute='';
let NAVN=0;
function addBack(h){if(h==='home')return;const b=document.createElement('button');b.type='button';b.className='backbtn';b.innerHTML='<span aria-hidden="true">←</span> Back';
  b.onclick=()=>{if(NAVN>1)history.back();else location.hash='#home'};
  const c=$('#view .crumbs');if(c){c.classList.add('hasback');c.prepend(b)}else{const w=document.createElement('div');w.className='wrap backrow';w.appendChild(b);$('#view').prepend(w)}}
function route(){NAVN++;
  let h=location.hash.slice(1)||'home',key=h,html='',after=null;
  try{
    if(h.startsWith('p-')){html=vProduct(+h.slice(2));after=productAfter;key='shop'}
    else if(h.startsWith('b-')){html=vBundle(h.slice(2));after=bundleAfter;key='bundles'}
    else if(h.startsWith('c-')){const r=h.slice(2);if(ROOMS[r]){Object.assign(SH,{room:r,cat:'',need:'',style:'',price:'',q:''})}html=vShop();after=shopAfter;key='shop'}
    else if(h.startsWith('help-')){html=vHelp();after=helpAfter;key='help'}
    else if(h.startsWith('inspo-')){html=vInspo();after=()=>{inspoAfter();setTimeout(()=>$('#'+h)?.scrollIntoView({behavior:'smooth'}),60)};key='inspo'}
    else if(h.startsWith('ea1-')){EA.tab=h.slice(4);html=vEA1();after=ea1After;key='ea1'}
    else if(ROUTES[h]){html=ROUTES[h][0]();after=ROUTES[h][1]}
    else html=v404();
  }catch(err){console.error(err);html=v404()}
  $('#view').innerHTML=html;
  if(after)try{after()}catch(err){console.error(err)}
  $$('[data-nav]').forEach(a=>a.classList.toggle('cur',a.dataset.nav===key));
  if(h!==lastRoute&&!h.startsWith('help-')&&!h.startsWith('inspo-'))window.scrollTo(0,0);
  lastRoute=h;$('#drawer').classList.remove('open');$('#sbar')?.classList.remove('open');document.body.style.overflow='';updateCount();reveal();addBack(h);if(LENS)setTimeout(applyBias,80);
  document.title=({home:'ABODE · Furniture on rent'}[h])||('ABODE · '+(h.startsWith('p-')&&BY[+h.slice(2)]?BY[+h.slice(2)].name:h.replace(/-.*/,'').replace(/^./,c=>c.toUpperCase())));
}
fetch('data.json').then(r=>r.json()).then(d=>{
  P=d.products;BUN=d.bundles;P.forEach(p=>BY[p.id]=p);BUN.forEach(b=>BUNBY[b.id]=b);
  S.cart=S.cart.filter(l=>l.kind==='b'?BUNBY[l.id]:BY[l.id]);
  shell();splash();lensInit();
  $('#drawer').addEventListener('click',e=>{if(e.target.classList.contains('scrim')||e.target.closest('#cclose'))$('#drawer').classList.remove('open')});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){$('#drawer').classList.remove('open');$('#sbar').classList.remove('open');$('#mnav').classList.remove('open')}});
  $$('[data-nav="shop"]').forEach(a=>a.addEventListener('click',()=>Object.assign(SH,{room:'',cat:'',need:'',style:'',price:'',q:''})));
  window.addEventListener('hashchange',route);route();
}).catch(err=>{$('#view').innerHTML='<div class="wrap band"><div class="empty"><div class="disp">Our furniture is stuck in traffic.</div><p class="muted">The catalogue did not load. Please refresh the page.</p></div></div>';console.error(err)});
