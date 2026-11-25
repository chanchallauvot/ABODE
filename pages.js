/* ABODE pages: shell, home, shop, product, bundles, cart, checkout */
function shell(){
  $('#hdr').innerHTML=`<a class="skip" href="#view">Skip to content</a><div class="ann">Free delivery &amp; setup on orders over <b>₹800/mo</b> · Set up in 72 hours · Free style swap every 6 months</div>
  <header class="top"><div class="wrap nav">
   <button class="iconbtn burger" id="burger" aria-label="Open menu">${IC.menu}</button>
   <a class="logo" href="#home" aria-label="ABODE home"><img src="img/x/logo.png" alt="ABODE"></a>
   <nav aria-label="Main"><a href="#home" data-nav="home">Home</a><a href="#shop" data-nav="shop">Shop</a><a href="#bundles" data-nav="bundles">Bundles</a><a href="#build" data-nav="build">Build a room</a><a href="#inspo" data-nav="inspo">Inspo</a><a href="#how" data-nav="how">How it works</a><a href="#about" data-nav="about">About</a></nav>
   <div class="navr"><button class="iconbtn" id="sopen" aria-label="Search">${IC.search}</button><a class="iconbtn" href="#account" aria-label="My account">${IC.user}</a><button class="iconbtn" id="cartbtn" aria-label="Cart" data-opencart>${IC.cart}<span class="count" id="cc">0</span></button></div>
  </div></header>
  <div class="searchbar" id="sbar" role="dialog" aria-label="Search"><form id="sform" role="search"><span aria-hidden="true">${IC.search}</span><input id="sq" placeholder="Search sofas, lamps, vibes…" aria-label="Search products" autocomplete="off"><button type="button" class="iconbtn" id="sclose" aria-label="Close search">✕</button></form><div class="sugg" id="sugg"></div></div>
  <div class="mnav" id="mnav"><button class="btn sm ghost" id="mclose" style="align-self:flex-end;margin-bottom:10px">Close</button><a href="#home">Home</a><a href="#shop">Shop</a><a href="#bundles">Bundles</a><a href="#build">Build a room</a><a href="#quiz">Vibe quiz</a><a href="#inspo">Inspo</a><a href="#how">How it works</a><a href="#about">About</a><a href="#help">Help</a><a href="#account">My Abode</a></div>`;
  const sb=$('#sbar'),sq=$('#sq');
  const sugg=()=>{const q=sq.value.trim().toLowerCase();const L=q?P.filter(p=>(p.name+' '+p.catName+' '+p.style).toLowerCase().includes(q)).slice(0,6):[];
   $('#sugg').innerHTML=q?(L.length?L.map(p=>`<a href="#p-${p.id}"><img src="${W(p.id)}" alt=""><span><b>${esc(p.name)}</b><br><span class="small muted">${esc(p.catName)} · ${inr(p.price.m12)}/mo</span></span></a>`).join('')+`<p class="small" style="padding:10px"><a class="link" href="#shop" id="sall">See all results →</a></p>`:`<p class="muted" style="padding:10px">No matches for "${esc(q)}". Try "sofa" or "pink".</p>`):`<p class="small muted" style="padding:10px">Popular: <a class="link" href="#c-living">Sofas</a> · <a class="link" href="#c-bedroom">Beds</a> · <a class="link" href="#c-decor">Lamps</a></p>`};
  const close=()=>sb.classList.remove('open');
  $('#sopen').onclick=()=>{sb.classList.add('open');sugg();setTimeout(()=>sq.focus(),50)};$('#sclose').onclick=close;
  sq.oninput=sugg;sb.addEventListener('click',e=>{if(e.target.closest('a'))close();if(e.target.id==='sall'||e.target.closest('#sall'))SH.q=sq.value.trim()});
  $('#sform').onsubmit=e=>{e.preventDefault();Object.assign(SH,{need:'',room:'',cat:'',style:'',price:'',q:sq.value.trim()});close();if(location.hash==='#shop')route();else location.hash='shop'};
  $('#burger').onclick=()=>$('#mnav').classList.add('open');$('#mclose').onclick=()=>$('#mnav').classList.remove('open');
  $('#mnav').onclick=e=>{if(e.target.tagName==='A')$('#mnav').classList.remove('open')};
  $('#ftr').innerHTML=`<footer><div class="wrap"><div class="fgrid">
   <div><img src="img/x/logo.png" alt="ABODE" style="height:34px"><p style="margin-top:12px;max-width:26em">Design-led furniture on rent. Delivered and set up in 72 hours, swapped when you move.</p>
    <form class="news" id="news"><input type="email" placeholder="Email for new drops" aria-label="Email address" required><button class="btn sm dark">Join</button></form><p class="tiny" id="newsmsg" role="status" style="min-height:20px"></p></div>
   <div><h4>Shop</h4><a href="#c-living">Living room</a><a href="#c-bedroom">Bedroom</a><a href="#c-decor">Decor</a><a href="#bundles">Bundles</a><a href="#build">Build a room</a></div>
   <div><h4>ABODE</h4><a href="#about">Our story</a><a href="#how">How it works</a><a href="#inspo">Inspo &amp; tips</a><a href="#quiz">Vibe quiz</a><a href="#ea1">Behind the build (EA1)</a></div>
   <div><h4>Help</h4><a href="#help">FAQs</a><a href="#help-delivery">Delivery &amp; setup</a><a href="#help-policies">Deposit &amp; terms</a><a href="#account">My Abode</a></div>
   <div><h4>Contact</h4><p style="margin:4px 0">hello@abode.rent</p><p style="margin:4px 0">+91 80 4718 2026</p><p style="margin:4px 0">@abode.rent</p><p style="margin:4px 0">Fort, Mumbai 400001</p></div>
  </div><div class="fbot"><span>© 2026 ABODE. A space that feels like yours.</span><span>Student concept by Asmi, Chanchal, Jia &amp; Mahi · Minor in Digital Strategies. Reviews and contact details are illustrative.</span></div></div></footer>`;
  $('#news').onsubmit=e=>{e.preventDefault();$('#newsmsg').textContent='You\'re on the list.';e.target.reset()};
}
/* splash (first visit per session) */
function splash(){let seen=false;try{seen=sessionStorage.getItem('abode_splash')}catch(e){}
 if(seen||(location.hash&&location.hash!=='#home'))return;
 const s=document.createElement('div');s.className='splash';s.setAttribute('role','presentation');
 s.innerHTML=`<i class="blob b1"></i><i class="blob b2"></i><i class="blob b3"></i>${[[213,'f1'],[118,'f2'],[87,'f3'],[152,'f4']].map(([id,c])=>`<img class="fly ${c}" src="${W(id)}" alt="">`).join('')}<div class="in"><img class="slogo" src="img/x/logo.png" alt="ABODE"><p>Furniture on rent, with personality.</p></div><button type="button">Skip intro</button>`;
 document.body.appendChild(s);document.body.style.overflow='hidden';
 const go=()=>{if(s.classList.contains('out'))return;s.classList.add('out');document.body.style.overflow='';try{sessionStorage.setItem('abode_splash','1')}catch(e){}setTimeout(()=>s.remove(),900)};
 s.onclick=go;window.addEventListener('wheel',go,{once:true,passive:true});window.addEventListener('keydown',go,{once:true});window.addEventListener('touchmove',go,{once:true,passive:true});setTimeout(go,3000)}
/* ---------------- HOME ---------------- */
const HERO=[213,147,109];
function vHome(){
  const hb=BUN.filter(b=>b.home);
  const catTiles=[['sofa','Sofas',213],['bed','Beds',152],['lamp','Lamps',118],['carpet','Rugs',99],['coffee','Tables',233],['wardrobe','Wardrobes',190],['beanbag','Bean bags',87],['mirror','Mirrors',32],['swing','Swings',129],['chair','Chairs',262]];
  return `<section class="hero"><div class="wrap herogrid">
   <div class="htext">
    <span class="eyebrow rv">Furniture on rent, with personality</span>
    <h1 class="herologo rv"><img src="img/x/logo.png" alt="ABODE"><span class="sr">ABODE: rented doesn't have to look rented</span></h1>
    <p class="herotag rv">Rented doesn't have to <span class="red">look rented.</span></p>
    <p class="lede rv">Pick your vibe. We deliver and set it up in 72 hours. Swap it when you move.</p>
    <div class="ctas rv"><a class="btn" href="#bundles">Shop room bundles</a><a class="btn ghost" href="#quiz">Find my vibe</a></div>
    <div class="proof rv" data-bias="Social proof"><span><span class="stars">★★★★★</span> 4.8 from 2,340 renters</span><span>Deposit back in 7 days</span></div>
   </div>
   <div class="wheel rv" id="wheel" aria-label="Featured pieces">
    <svg class="ring" viewBox="0 0 300 300" aria-hidden="true"><defs><path id="cp" d="M150,150 m-132,0 a132,132 0 1,1 264,0 a132,132 0 1,1 -264,0"/></defs><text><textPath href="#cp">SOFAS ✦ SWINGS ✦ LAMPS ✦ RUGS ✦ BEDS ✦ MIRRORS ✦ BEAN BAGS ✦ TABLES ✦ </textPath></text></svg>
    <div class="orbit" id="orbit"></div>
    <a class="disc" id="wdisc" href="#shop"><img id="wimg" alt=""></a>
    <a class="wlab" id="wlab" href="#shop"><b id="wn"></b><span id="wp"></span></a>
   </div>
  </div></section>
  <div class="marquee" aria-hidden="true"><div class="mq">${Array(2).fill(['Free delivery over ₹800/mo','Set up in 72 hours','Deposit back in 7 days','Free style swap every 6 months','Bundles save 15%','Cash on delivery','No-cost cancellation in 48 hrs']).flat().map(t=>`<span>${t}</span><i>✦</i>`).join('')}</div></div>
  <section class="band soft"><div class="wrap">
   <div class="sh"><div><h2 class="rv">Whole rooms. One click.</h2><p class="lede rv">Three vibes, styled by us. Every bundle saves 15% a month.</p></div><a class="link rv" href="#bundles">All 9 bundles →</a></div>
   <div class="bgrid">${hb.map(bcard).join('')}</div>
  </div></section>
  <section class="band"><div class="wrap">
   <div class="center"><h2 class="rv">Same room. Your vibe.</h2><p class="lede rv">Tap a vibe and watch the room change.</p></div>
   <div class="vibes rv" role="tablist" aria-label="Choose a vibe">${['minimal','cutesy','quirky'].map((v,i)=>`<button role="tab" aria-selected="${!i}" class="${i?'':'on'}" data-v="${v}">${STYLE[v]}</button>`).join('')}</div>
   <div class="vroom vibe-minimal rv" id="vroom" aria-live="polite"></div>
  </div></section>
  <section class="band soft"><div class="wrap">
   <div class="sh"><div><h2 class="rv">Bestsellers</h2><p class="lede rv">The pieces renters keep coming back for.</p></div><div class="carbtns"><button data-car="-1" aria-label="Previous">‹</button><button data-car="1" aria-label="Next">›</button></div></div>
   <div class="car"><div class="track" id="best">${(()=>{const B=P.filter(p=>p.badge==='Bestseller'),out=[],seen={};B.forEach(p=>{if(!seen[p.cat]){seen[p.cat]=1;out.push(p)}});B.forEach(p=>{if(!out.includes(p))out.push(p)});return out.slice(0,12)})().map(mcard).join('')}</div></div>
  </div></section>
  <section class="band"><div class="wrap">
   <div class="sh"><h2 class="rv">Shop by category</h2><a class="link rv" href="#shop">Shop everything →</a></div>
   <div class="cats">${catTiles.map(([c,l,id])=>`<a class="cat rv" href="#shop" data-gocat="${c}"><img src="${W(id)}" alt=""><b>${l}</b></a>`).join('')}</div>
  </div></section>
  <section class="band soft"><div class="wrap">
   <div class="center" style="margin-bottom:40px"><h2 class="rv">Why ABODE</h2></div>
   <div class="claims">
    <div class="claim rv"><span class="ic">${IC.spark}</span><h3>Furniture with personality</h3><p>188 pieces in three vibes. Shop by style, not just by sofa size.</p><div class="tp"><b>Abode Fresh Promise:</b> deep-cleaned and 32-point checked, or replaced in 48 hours.</div></div>
    <div class="claim rv"><span class="ic">${IC.swap}</span><h3>Swap your style, not your flat</h3><p>A free style swap every 6 months and a free move within your city every year.</p><div class="tp"><b>In writing:</b> clause 7 of your rental agreement.</div></div>
    <div class="claim rv"><span class="ic">${IC.shield}</span><h3>No surprises at checkout</h3><p>Rent, deposit and delivery shown on every product. Decor needs no deposit.</p><div class="tp"><b>Deposit back in 7 days</b>, or we add ₹100 a day.</div></div>
   </div>
   <h3 class="howh rv">How it works</h3>
   <div class="feats steps">${[['spark','Pick your vibe','Shop by room or style, or take the 30-second quiz.'],['cal','Choose a plan','3, 6 or 12 months. Longer plans cost less.'],['truck','We set it up','Delivered and assembled in 72 hours.'],['swap','Swap or return','Moving or bored? We swap it or pick it up.']].map(([i,h,t])=>`<div class="feat rv"><div class="ic">${IC[i]}</div><h3>${h}</h3><p>${t}</p></div>`).join('')}</div>
  </div></section>
  <section class="band soft"><div class="wrap">
   <div class="calc rv"><div><span class="eyebrow">Rent vs buy</span><h2>Do the maths.</h2><p class="muted">How long will you stay in this city? We compare renting a full bedroom with buying it new.</p>
    <label for="mon" class="small"><b id="monl">12 months</b></label><input id="mon" type="range" min="3" max="36" step="1" value="12" aria-label="Months in this city"></div>
    <div class="bars" id="bars" aria-live="polite"></div></div>
  </div></section>
  <section class="band"><div class="wrap">
   <div class="sh"><h2 class="rv">Renters say</h2><div class="carbtns"><button data-scroll="-1" aria-label="Previous reviews">‹</button><button data-scroll="1" aria-label="Next reviews">›</button></div></div>
   <div class="rstrip" id="rstrip">${P.filter(p=>p.badge==='Bestseller').slice(0,10).map(p=>{const r=reviews(p)[0];return `<div class="rcard"><span class="stars">${'★'.repeat(r.s)}</span><p>"${esc(r.t)}"</p><div class="who"><span class="av" style="background:${AVC[p.id%6]}">${r.n[0]}</span><span><b>${r.n}</b> · ${r.c}<br><a class="muted" href="#p-${p.id}">${esc(p.name)}</a></span></div></div>`}).join('')}</div>
   <p class="concept">Concept reviews for this student prototype.</p>
  </div></section>
  <section class="band redband"><div class="wrap center"><h2 class="rv">Not sure what your vibe is?</h2><p class="lede rv" style="color:#f4d7d6">Four quick questions. One room picked for you.</p><a class="btn light rv" href="#quiz">Take the vibe quiz</a></div></section>`;
}
let WT=null;
function wheel(){const W0=$('#wheel');if(!W0)return;const ids=[213,147,109,87,99,132,233,42].filter(i=>BY[i]);let k=0,paused=false;
  $('#orbit').innerHTML=ids.map((id,i)=>`<button class="ob" style="--a:${i*360/ids.length}deg" data-k="${i}" aria-label="${esc(BY[id].name)}"><img src="${W(id)}" alt=""></button>`).join('');
  const show=i=>{k=(i+ids.length)%ids.length;const p=BY[ids[k]];const im=$('#wimg');im.classList.remove('in');void im.offsetWidth;im.src=W(p.id);im.alt=p.name;im.classList.add('in');
    $('#wn').textContent=p.name;$('#wp').textContent=`${inr(p.price.m12)}/mo · ${p.catName}`;$('#wdisc').href=$('#wlab').href='#p-'+p.id;
    $$('#orbit .ob').forEach((b,j)=>b.classList.toggle('on',j===k))};
  $$('#orbit .ob').forEach(b=>b.onclick=()=>{show(+b.dataset.k);paused=true;setTimeout(()=>paused=false,5000)});
  W0.onmouseenter=()=>paused=true;W0.onmouseleave=()=>paused=false;
  show(0);clearInterval(WT);WT=setInterval(()=>{if(!document.body.contains(W0)){clearInterval(WT);return}if(!paused)show(k+1)},2200)}
function homeAfter(){
  wheel();
  const set=v=>{const ids={minimal:[210,222,113,93,24],cutesy:[212,227,115,96,32],quirky:[220,233,121,102,41]}[v];
    $('#vroom').className='vroom vibe-'+v+' rv in';
    $('#vroom').innerHTML=look(ids,5,'row',true)};
  set('minimal');
  $$('.vibes button').forEach(b=>b.onclick=()=>{$$('.vibes button').forEach(x=>{x.classList.remove('on');x.setAttribute('aria-selected','false')});b.classList.add('on');b.setAttribute('aria-selected','true');set(b.dataset.v)});
  const calc=()=>{const m=+$('#mon').value;$('#monl').textContent=m+' months in this city';const rent=1069*m+1600,buy=58000,resale=Math.round(buy*Math.max(.25,.7-m*.015)),own=buy-resale+3500;
   const mx=Math.max(rent,own);$('#bars').innerHTML=`<div class="row"><div class="small"><b>Rent with ABODE</b></div><div class="bar" style="width:${Math.max(30,rent/mx*100)}%;background:var(--red)">${inr(rent)}</div></div><div class="row"><div class="small"><b>Buy new, resell later</b></div><div class="bar" style="width:${Math.max(30,own/mx*100)}%;background:#8e8e93">${inr(own)}</div></div><p class="small muted" style="margin-top:14px">${rent<own?`Renting saves about <b style="color:var(--ink)">${inr(own-rent)}</b> and ₹58,000 upfront.`:`Staying this long? Buying may cost less.`}</p>`};
  $('#mon').oninput=calc;calc();
  $$('[data-scroll]').forEach(b=>b.onclick=()=>$('#rstrip').scrollBy({left:+b.dataset.scroll*360,behavior:'smooth'}));
  $$('[data-car]').forEach(b=>b.onclick=()=>$('#best').scrollBy({left:+b.dataset.car*324,behavior:'smooth'}));
  $$('[data-gocat]').forEach(a=>a.onclick=()=>{const c=a.dataset.gocat;Object.assign(SH,{need:'',style:'',price:'',q:'',cat:c,room:P.find(p=>p.cat===c).room})});
}
/* ---------------- SHOP ---------------- */
const SH={need:'',room:'',cat:'',style:'',price:'',sort:'rec',q:''};
const SORTS={rec:'Recommended',low:'Price: low to high',high:'Price: high to low',new:'New arrivals',rated:'Top rated'};
const PRICES={'0-149':'Under ₹150','150-399':'₹150–399','400-799':'₹400–799','800-5000':'₹800+'};
function shopList(){
  let L=P.filter(p=>(!SH.need||p.needs.includes(SH.need))&&(!SH.room||p.room===SH.room)&&(!SH.cat||p.cat===SH.cat)&&(!SH.style||p.style===SH.style));
  if(SH.price){const[a,b]=SH.price.split('-').map(Number);L=L.filter(p=>p.price.m12>=a&&p.price.m12<=b)}
  if(SH.q){const q=SH.q.toLowerCase();L=L.filter(p=>(p.name+' '+p.tag+' '+p.catName+' '+p.style+' '+p.desc).toLowerCase().includes(q))}
  const rank={Bestseller:0,'Staff Pick':1,'Value Pack':2,New:3,'':4};
  if(SH.sort==='rec')L.sort((a,b)=>rank[a.badge]-rank[b.badge]||(a.id*37%101)-(b.id*37%101));
  if(SH.sort==='low')L.sort((a,b)=>a.price.m12-b.price.m12);
  if(SH.sort==='high')L.sort((a,b)=>b.price.m12-a.price.m12);
  if(SH.sort==='new')L.sort((a,b)=>(b.badge==='New')-(a.badge==='New'));
  if(SH.sort==='rated')L.sort((a,b)=>rating(b).avg-rating(a).avg);
  return L}
const CATORDER=['sofa','bed','coffee','tv','dining','chair','wardrobe','nightstand','dresser','lamp','carpet','mirror','vase','beanbag','swing'];
function vShop(){
  const cats=CATORDER.filter(c=>P.some(p=>p.cat===c&&(!SH.room||p.room===SH.room)));
  const title=SH.q?`"${esc(SH.q)}"`:SH.cat?esc(P.find(p=>p.cat===SH.cat).catName):SH.room?ROOMS[SH.room]:'Shop';
  return `<div class="wrap shophead"><div class="crumbs" style="margin:0 0 14px"><a href="#home">Home</a> / Shop</div><h1 style="font-size:clamp(44px,5vw,72px)">${title}</h1></div>
  <div class="catbar"><div class="wrap in" role="tablist" aria-label="Rooms and categories">
   <button class="chip ${!SH.room&&!SH.cat?'on':''}" data-room="">All</button>${Object.entries(ROOMS).map(([k,v])=>`<button class="chip ${SH.room===k&&!SH.cat?'on':''}" data-room="${k}">${v}</button>`).join('')}<span style="width:1px;background:var(--line);margin:4px 6px;flex:none"></span>${cats.map(c=>`<button class="chip ${SH.cat===c?'on':''}" data-cat="${c}">${esc(P.find(p=>p.cat===c).catName)}</button>`).join('')}
  </div></div>
  <div class="wrap"><div class="toolbar">
   ${dd('need','Need',NEEDS)}${dd('style','Vibe',STYLE)}${dd('price','Price',PRICES)}
   <span class="sp"></span><span class="small muted" id="cnt" role="status"></span>
   <label class="small" style="display:flex;align-items:center;gap:8px">Sort <select id="sort">${Object.entries(SORTS).map(([k,v])=>`<option value="${k}" ${SH.sort===k?'selected':''}>${v}</option>`).join('')}</select></label>
  </div><div class="actf" id="actf"></div><div id="pg"></div></div><div style="height:80px"></div>`}
function dd(k,l,opts){const cur=SH[k];return `<div class="dd" data-dd="${k}"><button class="${cur?'on':''}" aria-haspopup="true" aria-expanded="false">${cur?esc(opts[cur]):l} <span aria-hidden="true">▾</span></button><div class="menu" role="menu"><button role="menuitem" data-set="${k}" data-v="" class="${cur?'':'on'}">Any ${l.toLowerCase()}</button>${Object.entries(opts).map(([v,t])=>`<button role="menuitem" data-set="${k}" data-v="${v}" class="${cur===v?'on':''}">${esc(t)}</button>`).join('')}</div></div>`}
function shopAfter(){
  const rerender=()=>{const y=window.scrollY;$('#view').innerHTML=vShop();shopAfter();window.scrollTo(0,Math.min(y,$('.catbar').offsetTop))};
  const draw=()=>{const L=shopList();$('#cnt').textContent=`${L.length} piece${L.length===1?'':'s'}`;
   const act=[['need',NEEDS],['style',STYLE],['price',PRICES]].filter(([k])=>SH[k]).map(([k,o])=>`<button data-clear="${k}" aria-label="Remove ${esc(o[SH[k]])} filter">${esc(o[SH[k]])} ✕</button>`).join('')+(SH.q?`<button data-clear="q">"${esc(SH.q)}" ✕</button>`:'');
   $('#actf').innerHTML=act;
   const ok=x=>(!SH.style||x.vibe===SH.style)&&(!SH.room||x.room===SH.room||x.room==='mixed');const hasCat=x=>SH.cat&&x.items.some(i=>BY[i]&&BY[i].cat===SH.cat);const pool=BUN.filter(x=>ok(x)&&hasCat(x));const pool2=pool.length?pool:BUN.filter(ok);const pk=(pool2.length?pool2:BUN);const b=pk[((SH.cat||SH.room||'').length+(SH.need||'').length)%pk.length];
   const pin=SH.q?'':`<div class="bpin vibe-${b.vibe} rv"><a class="collage" href="#b-${b.id}" aria-label="${esc(b.name)}">${collage(b.items)}</a><div class="bd"><span class="sticker" style="align-self:flex-start">Bundle · save ${inr(b.save)}/mo</span><h3>${esc(b.name)}</h3><p class="muted" style="margin:0">${esc(b.line)} ${b.items.length} pieces, one click.</p><div class="price"><span class="pricebig">${inr(b.price)}/mo</span><span class="strike">${inr(b.full)}</span></div><div class="bact"><button class="btn sm" data-addb="${b.id}" data-img="${W(b.items[0])}">Rent this room</button><a class="btn sm ghost" href="#build">Build your own</a></div></div></div>`;
   $('#pg').innerHTML=pin+(L.length?`<div class="pgrid">${L.map(card).join('')}</div>`:`<div class="empty"><div class="disp">Nothing here yet.</div><p class="muted">No pieces match these filters.</p><button class="btn" id="clr2">Clear filters</button></div>`);
   const c2=$('#clr2');if(c2)c2.onclick=()=>{Object.assign(SH,{need:'',room:'',cat:'',style:'',price:'',q:''});rerender()};
   $$('[data-clear]').forEach(x=>x.onclick=()=>{SH[x.dataset.clear]='';rerender()});reveal()};
  $$('.catbar [data-room]').forEach(b=>b.onclick=()=>{SH.room=b.dataset.room;SH.cat='';rerender()});
  $$('.catbar [data-cat]').forEach(b=>b.onclick=()=>{SH.cat=b.dataset.cat;SH.room=P.find(p=>p.cat===SH.cat).room;rerender()});
  $$('.dd').forEach(d=>{const t=$('button',d);t.onclick=e=>{e.stopPropagation();const o=!d.classList.contains('open');$$('.dd').forEach(x=>{x.classList.remove('open');$('button',x).setAttribute('aria-expanded','false')});if(o){d.classList.add('open');t.setAttribute('aria-expanded','true')}}});
  $$('[data-set]').forEach(b=>b.onclick=()=>{SH[b.dataset.set]=b.dataset.v;rerender()});
  document.onclick=e=>{if(!e.target.closest('.dd'))$$('.dd').forEach(x=>x.classList.remove('open'))};
  $('#sort').onchange=e=>{SH.sort=e.target.value;draw()};draw();
}
/* ---------------- PRODUCT ---------------- */
const PAIR={sofa:['coffee','lamp'],coffee:['sofa','carpet'],tv:['sofa','lamp'],dining:['chair','vase'],chair:['coffee','lamp'],bed:['nightstand','carpet'],nightstand:['bed','lamp'],dresser:['mirror','chair'],wardrobe:['mirror','nightstand'],mirror:['dresser','vase'],vase:['coffee','lamp'],beanbag:['carpet','lamp'],carpet:['sofa','beanbag'],lamp:['sofa','nightstand'],swing:['carpet','beanbag']};
function pairsFor(p){return PAIR[p.cat].map((c,i)=>{const L=P.filter(x=>x.cat===c&&x.style===p.style);return L[(p.id+i)%L.length]}).filter(Boolean)}
const PDP={};
function vProduct(id){
  const p=BY[id];if(!p)return v404();
  Object.assign(PDP,{id,plan:12,mode:'rent',color:p.colors[0],img:0,pairs:[]});
  const r=rating(p),rv=reviews(p),pr=pairsFor(p);
  return `<div class="wrap"><nav class="crumbs" aria-label="Breadcrumb"><a href="#home">Home</a> / <a href="#c-${p.room}">${ROOMS[p.room]}</a> / <a href="#shop" data-cat="${p.cat}">${esc(p.catName)}</a></nav>
  <div class="pdp"><div class="gal"><div class="main vibe-${p.style}">${p.badge?`<span class="badge ${p.badge.split(' ')[0]}">${esc(p.badge)}</span>`:''}<img id="mainimg" src="${W(p.id)}" alt="${esc(p.name)}"></div>
   <div class="thumbs"><button class="on" data-im="0" aria-label="Product photo"><img src="${W(p.id)}" alt=""></button><button data-im="1" aria-label="Photo in a room"><img src="${Bg(p.id)}" alt=""></button></div></div>
  <div class="buybox"><span class="eyebrow" style="margin:0">${STYLE[p.style]} · ${esc(p.catName)}</span><h1 style="margin-top:8px">${esc(p.name)}</h1><div class="tagl">${esc(p.tag)}</div>
   <div class="small" style="display:flex;gap:14px;align-items:center;flex-wrap:wrap"><a href="#" id="toRev"><span class="stars">★★★★★</span> <b>${r.avg}</b> <span class="muted">(${r.n})</span></a><button class="linkbtn" data-wish="${p.id}" style="color:var(--ink)">${S.wish.includes(p.id)?'♥ Saved':'♡ Save'}</button></div>
   <p class="muted" style="margin-top:14px">${esc(p.desc)}</p>


   ${p.buy?`<div class="lbl">Rent or buy</div><div class="mode" role="tablist"><button class="on" data-mode="rent" role="tab" aria-selected="true">Rent</button><button data-mode="buy" role="tab" aria-selected="false">Buy · ${inr(p.buy)}</button></div>`:''}
   <div id="planbox"></div>
   <div class="facts"><div class="fact"><b>72 hrs</b>Set up at home</div><div class="fact"><b>Free swap</b>Every 6 months</div><div class="fact"><b>${p.deposit?inr(p.deposit):'₹0'}</b>Refundable deposit</div></div>
   <div class="pairs"><b>Pairs well with</b> <span class="small muted">· add both, save 10%</span>
    ${pr.map(x=>`<div class="pair"><label><input type="checkbox" data-pair="${x.id}"><img src="${W(x.id)}" alt=""><span><b>${esc(x.name)}</b><br><span class="small muted">${inr(x.price.m12)}/mo</span></span></label><a class="small link" href="#p-${x.id}">View</a></div>`).join('')}
    <div id="pairsave" class="small" style="margin-top:10px" aria-live="polite"></div></div>
   <div class="field" style="margin:4px 0"><label for="pin">Check delivery</label><div style="display:flex;gap:8px"><input id="pin" inputmode="numeric" maxlength="6" placeholder="Pincode" style="flex:1"><button class="btn sm dark" id="pinbtn">Check</button></div><span class="small" id="pinmsg" aria-live="polite"></span></div>
   <div class="acc">
    <details open><summary>Details</summary><div><dl class="spec"><dt>Material</dt><dd>${esc(p.mat)}</dd><dt>Size (W×D×H)</dt><dd>${esc(p.dims)} cm</dd><dt>Best for</dt><dd>${p.needs.map(n=>NEEDS[n]).join(', ')}</dd><dt>Condition</dt><dd>Abode Fresh: deep-cleaned and checked</dd></dl></div></details>
    <details><summary>Care</summary><div><ul style="padding-left:18px;margin:0">${p.care.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div></details>
    <details><summary>Setup &amp; use</summary><div><ul style="padding-left:18px;margin:0">${p.howto.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div></details>
    <details id="revd"><summary>Reviews (${r.n})</summary><div>${rv.map(x=>`<div style="padding:10px 0"><span class="stars">${'★'.repeat(x.s)}${'☆'.repeat(5-x.s)}</span><p style="margin:4px 0;color:var(--ink)">"${esc(x.t)}"</p><span class="small">${x.n} · ${x.c}</span></div>`).join('')}<p class="concept">Concept reviews.</p></div></details>
   </div>
  </div></div>
  <section class="band" style="padding-bottom:40px"><div class="sh"><h2>You might also like</h2></div><div class="car"><div class="track">${P.filter(x=>x.cat===p.cat&&x.id!==p.id).sort((a,b)=>(b.style===p.style)-(a.style===p.style)).slice(0,8).map(x=>mcard(x)).join('')}</div></div></section></div>
  <div class="stickybuy" id="sbuy" aria-hidden="true"><div class="wrap in"><img src="${W(p.id)}" alt=""><div style="flex:1"><b>${esc(p.name)}</b><div class="small muted" id="sbp"></div></div><button class="btn" id="sbadd">Add to cart</button></div></div>`}
function productAfter(){
  const p=BY[PDP.id];if(!p)return;
  const price=()=>PDP.mode==='buy'?inr(p.buy):inr(p.price['m'+PDP.plan])+'/mo';
  const plans=()=>{
   if(PDP.mode==='buy'){$('#planbox').innerHTML=`<div class="lbl">Price</div><div class="plan on"><div class="t">Yours to keep</div><div class="m">${inr(p.buy)}</div><div class="d">One-time · 7-day returns</div></div><button class="btn full" id="addbtn" style="margin-top:14px">Add to cart · ${inr(p.buy)}</button>`}
   else{const tags={3:'',6:'',12:'Best value'};
    $('#planbox').innerHTML=`<div class="lbl"><span>Plan</span><span class="muted" style="font-weight:400">Longer = cheaper</span></div><div class="plans" role="radiogroup" aria-label="Rental plan">${[3,6,12].map(m=>{const v=p.price['m'+m];return `<button class="plan ${PDP.plan===m?'on':''}" data-plan="${m}" role="radio" aria-checked="${PDP.plan===m}">${tags[m]?`<span class="tag">${tags[m]}</span>`:''}<div class="t">${PLAN[m]}</div><div class="m">${inr(v)}<span class="small" style="font-weight:500">/mo</span></div><div class="d">${inr(Math.round(v*12/365))}/day</div></button>`}).join('')}</div>
    <p class="small muted" style="margin:10px 0 14px">${PDP.plan===12?`Saves ${inr((p.price.m3-p.price.m12)*12)} a year vs 3 months.`:`12 months costs ${inr(p.price['m'+PDP.plan]-p.price.m12)}/mo less.`} ${p.deposit?`Refundable deposit ${inr(p.deposit)}.`:'No deposit on decor.'}</p>
    <button class="btn full" id="addbtn">Add to cart · ${inr(p.price['m'+PDP.plan])}/mo</button>`}
   $$('[data-plan]').forEach(b=>b.onclick=()=>{PDP.plan=+b.dataset.plan;plans()});
   $('#addbtn').onclick=e=>add(e.currentTarget);$('#sbp').textContent=price();pairSave()};
  const add=el=>{const pairs=PDP.pairs.slice();const disc=pairs.length&&PDP.mode==='rent'?10:0;
    addLine({kind:'p',id:p.id,plan:PDP.mode==='buy'?0:PDP.plan,mode:PDP.mode,color:PDP.color,disc},el);
    pairs.forEach(id=>addLine({kind:'p',id,plan:PDP.plan||12,mode:'rent',color:BY[id].colors[0],disc}))};
  const pairSave=()=>{const ids=PDP.pairs;const el=$('#pairsave');if(!ids.length||PDP.mode==='buy'){el.innerHTML=PDP.mode==='buy'&&ids.length?'Bundle savings apply to rentals.':'';return}
   const pl=PDP.plan||12;const full=[p.id,...ids].reduce((a,i)=>a+BY[i].price['m'+pl],0);el.innerHTML=`<span class="save">You save ${inr(full-Math.round(full*.9))}/mo on these ${ids.length+1}.</span>`};
  plans();
  $$('[data-pair]').forEach(c=>c.onchange=()=>{PDP.pairs=$$('[data-pair]').filter(x=>x.checked).map(x=>+x.dataset.pair);pairSave()});
  $$('[data-im]').forEach(b=>b.onclick=()=>{$$('[data-im]').forEach(x=>x.classList.remove('on'));b.classList.add('on');const m=$('#mainimg');m.src=b.dataset.im==='1'?Bg(p.id):W(p.id);m.classList.toggle('photo',b.dataset.im==='1')});
  $$('[data-pc]').forEach(b=>b.onclick=()=>{$$('[data-pc]').forEach(x=>{x.classList.remove('on');x.setAttribute('aria-pressed','false')});b.classList.add('on');b.setAttribute('aria-pressed','true');PDP.color=b.dataset.pc;$('#cnm').textContent=cname(PDP.color)});
  $$('[data-mode]').forEach(b=>b.onclick=()=>{$$('[data-mode]').forEach(x=>{x.classList.remove('on');x.setAttribute('aria-selected','false')});b.classList.add('on');b.setAttribute('aria-selected','true');PDP.mode=b.dataset.mode;plans()});
  $('#toRev').onclick=e=>{e.preventDefault();const d=$('#revd');d.open=true;d.scrollIntoView({behavior:'smooth',block:'center'})};
  $('#pinbtn').onclick=()=>{$('#pinmsg').innerHTML=pinCheck($('#pin').value.trim())};$('#pin').onkeydown=e=>{if(e.key==='Enter')$('#pinbtn').click()};
  $('#sbadd').onclick=e=>add(e.currentTarget);
  const sb=$('#sbuy'),ab=()=>$('#addbtn');
  const io2=new IntersectionObserver(es=>{const v=!es[0].isIntersecting&&es[0].boundingClientRect.top<0;sb.classList.toggle('show',v);sb.setAttribute('aria-hidden',!v)});io2.observe($('#planbox'));
  const cl=$('[data-cat]');if(cl)cl.onclick=()=>{SH.cat=p.cat;SH.room=p.room};
}
function pinCheck(v){if(!/^\d{6}$/.test(v))return '<span style="color:var(--red)">Pincodes have 6 digits.</span>';
 const c={4:'Mumbai, Pune & Navi Mumbai',5:'Bengaluru & Hyderabad',1:'Delhi NCR'}[v[0]];
 return c?`<span style="color:var(--ok)">✓ Delivered and set up in ${c} within 72 hours.</span>`:'<span style="color:var(--red)">Not in your city yet. Join the list in the footer.</span>'}
/* ---------------- BUNDLES ---------------- */
function vBundles(){return `<div class="wrap"><div class="crumbs"><a href="#home">Home</a> / Bundles</div><h1 style="font-size:clamp(44px,5vw,72px)">Room bundles</h1><p class="lede">Whole rooms, styled by us. 15% off every month. Prefer to choose? <a class="link" href="#build">Build a room</a>.</p>
 ${['minimal','cutesy','quirky'].map(v=>`<h2 style="margin:70px 0 30px">${STYLE[v]}</h2><div class="bgrid">${BUN.filter(b=>b.vibe===v).map(bcard).join('')}</div>`).join('')}</div>`}
const BD={};
function vBundle(id){const b=BUNBY[id];if(!b)return v404();BD.id=id;BD.items=b.items.slice();
 return `<div class="wrap"><div class="crumbs"><a href="#home">Home</a> / <a href="#bundles">Bundles</a> / ${esc(b.name)}</div>
 <div class="pdp"><div class="gal"><div class="main bmain vibe-${b.vibe}" id="bcol"></div></div>
 <div class="buybox"><span class="eyebrow">${STYLE[b.vibe]} bundle</span><h1>${esc(b.name)}</h1><div class="tagl">${esc(b.line)}</div>
  <p class="small muted">Swap any piece. Your saving stays.</p><div id="blist"></div><div id="btot" class="card" style="margin-top:14px"></div></div></div></div>`}
function bundleAfter(){const b=BUNBY[BD.id];if(!b)return;
 const draw=()=>{const items=BD.items.map(i=>BY[i]);
  $('#bcol').innerHTML=look(BD.items,8,'board');
  $('#blist').innerHTML=items.map((p,i)=>{const alts=P.filter(x=>x.cat===p.cat&&x.id!==p.id&&x.style===b.vibe);return `<div class="line" style="grid-template-columns:72px 1fr auto"><img src="${W(p.id)}" alt=""><div><div class="nm"><a href="#p-${p.id}">${esc(p.name)}</a></div><div class="small muted">${esc(p.catName)} · ${inr(p.price.m12)}/mo</div>${alts.length?`<select data-swap="${i}" aria-label="Swap ${esc(p.name)}" style="margin-top:6px;height:38px"><option value="">Swap for…</option>${alts.map(a=>`<option value="${a.id}">${esc(a.name)} (${inr(a.price.m12)}/mo)</option>`).join('')}</select>`:''}</div><button class="linkbtn" data-rm="${i}" ${items.length<=3?'disabled':''}>Remove</button></div>`}).join('');
  const full=items.reduce((a,p)=>a+p.price.m12,0),price=Math.round(full*.85),dep=items.reduce((a,p)=>a+p.deposit,0);
  $('#btot').innerHTML=`<div class="tot"><span>Pieces bought separately</span><span class="strike">${inr(full)}/mo</span></div><div class="tot big"><span>Bundle price</span><span>${inr(price)}/mo</span></div><div class="tot"><span>Per day</span><span>${inr(price*12/365)}</span></div><div class="tot"><span>Refundable deposit</span><span>${inr(dep)}</span></div><p><span class="save">You save ${inr(full-price)} every month</span></p><button class="btn full" id="addbun" data-img="${W(items[0].id)}">Rent this room · 12 months</button><p class="small muted" style="margin-top:8px">Needs at least 3 pieces for the bundle price.</p>`;
  $$('[data-swap]').forEach(s=>s.onchange=()=>{if(s.value){BD.items[+s.dataset.swap]=+s.value;draw()}});
  $$('[data-rm]').forEach(x=>x.onclick=()=>{BD.items.splice(+x.dataset.rm,1);draw()});
  $('#addbun').onclick=e=>{if(BD.items.join()===b.items.join())addLine({kind:'b',id:b.id,plan:12,mode:'rent',color:''},e.currentTarget);else{BD.items.forEach((id,i)=>addLine({kind:'p',id,plan:12,mode:'rent',color:BY[id].colors[0],disc:15},i?null:e.currentTarget))}}};
 draw()}
/* ---------------- CART ---------------- */
function addonsFor(gap){if(gap<=0)return[];const inCart=new Set(S.cart.filter(l=>l.kind==='p').map(l=>l.id));
 const ok=p=>!inCart.has(p.id)&&['vase','lamp','carpet','nightstand','chair','mirror','coffee','beanbag'].includes(p.cat);
 const pick=(L,n)=>{const seen=new Set(),out=[];for(const p of L){if(!seen.has(p.cat)){seen.add(p.cat);out.push(p)}if(out.length===n)break}return out};
 const cross=pick(P.filter(p=>ok(p)&&p.price.m12>=gap&&p.price.m12<=Math.max(DELIVERY,gap)).sort((a,b)=>a.price.m12-b.price.m12),2);
 const below=pick(P.filter(p=>ok(p)&&p.price.m12<gap&&!cross.some(c=>c.cat===p.cat)).sort((a,b)=>b.price.m12-a.price.m12),3-cross.length);
 return[...cross,...below]}
function cartBody(page){
 const t=totals();
 if(!S.cart.length)return `<div class="empty" style="background:transparent"><div style="display:grid;place-items:center">${DOOD.house(110)}</div><div class="disp">Your cart is empty</div><p class="muted">Start with a room bundle or a single piece.</p><a class="btn" href="#bundles">Shop bundles</a> <a class="btn ghost" href="#shop">Browse everything</a></div>`;
 const pct=Math.min(100,t.pre/FREE*100);
 return `<div class="ship"><div class="small">${t.gap?`Add <b>${inr(t.gap)}</b> more for free delivery &amp; setup.`:'<b>✓ Free delivery &amp; setup</b>'}</div><div class="tr" role="progressbar" aria-valuenow="${Math.round(pct)}" aria-valuemin="0" aria-valuemax="100"><div class="fl" style="width:${pct}%"></div></div>
 ${t.gap?`<div class="small muted" style="margin-top:10px">Cheaper than the ${inr(DELIVERY)} delivery fee:</div>${addonsFor(t.gap).map(p=>`<div class="addon" data-img="${W(p.id)}"><img src="${W(p.id)}" alt=""><span style="flex:1"><b class="small">${esc(p.name)}</b><br><span class="small muted">${inr(p.price.m12)}/mo · ${p.price.m12>=t.gap?'<b style="color:var(--ok)">unlocks free delivery</b>':inr(t.gap-p.price.m12)+' to go after this'}</span></span><button class="btn sm" data-qa="${p.id}" aria-label="Add ${esc(p.name)}">Add</button></div>`).join('')}`:''}</div>
 ${S.cart.map((l,i)=>{const d=lineData(l);return `<div class="line"><a href="${d.url}"><img src="${d.img}" alt=""></a><div><div class="nm">${esc(d.name)}</div><div class="small muted">${esc(d.sub)}</div><div class="qty"><button data-q="${i}" data-d="-1" aria-label="Less">−</button><span>${l.qty}</span><button data-q="${i}" data-d="1" aria-label="More">+</button></div><br><button class="linkbtn" data-del="${i}">Remove</button></div><div style="text-align:right;white-space:nowrap"><b>${d.monthly?inr(d.monthly)+'/mo':inr(d.buy)}</b>${d.dep?`<div class="tiny muted">+${inr(d.dep)} deposit</div>`:''}</div></div>`}).join('')}
 ${page?'':''}`}
function cartFoot(){const t=totals();if(!S.cart.length)return '';
 return `<div class="tot"><span>Monthly rent</span><span>${inr(t.m)}/mo</span></div>${t.b?`<div class="tot"><span>Decor you're buying</span><span>${inr(t.b)}</span></div>`:''}<div class="tot"><span>Refundable deposit</span><span>${inr(t.dep)}</span></div><div class="tot"><span>Delivery &amp; setup</span><span>${t.deliv?inr(t.deliv):'Free'}</span></div>
 ${t.m?`<label class="check"><input type="checkbox" id="carebox" ${S.care?'checked':''}><span><b>Abode Care, ${inr(CARE_FEE)}/mo</b> (optional): covers accidental stains and scratches up to ₹5,000.</span></label>`:''}
 ${t.saved?`<div class="tot" style="color:var(--ok)"><span>Bundle savings</span><span>−${inr(t.saved)}/mo</span></div>`:''}
 <div class="tot big"><span>Due at delivery</span><span>${inr(t.due)}</span></div><p class="tiny muted" style="margin:2px 0 10px">First month + refundable deposit${t.deliv?' + delivery':''}${t.care?' + Abode Care':''}. No other fees.</p>`}
function bindCart(scope,re){
 $$('[data-q]',scope).forEach(b=>b.onclick=()=>{const l=S.cart[+b.dataset.q];l.qty=Math.max(1,l.qty+ +b.dataset.d);save('cart');updateCount();re()});
 $$('[data-del]',scope).forEach(b=>b.onclick=()=>{const [x]=S.cart.splice(+b.dataset.del,1);save('cart');updateCount();re();toast('Removed. Changed your mind?','Undo',()=>{S.cart.push(x);save('cart');updateCount();re()})});
 const cb=$('#carebox',scope);if(cb)cb.onchange=()=>{S.care=cb.checked;re()};
}
function openCart(){const d=$('#drawer');d.classList.add('open');drawCart()}
function drawCart(){const d=$('#drawer');if(!d.classList.contains('open'))return;
 $('.pb',d).innerHTML=cartBody();$('.pf',d).innerHTML=cartFoot()+(S.cart.length?`<a class="btn full" href="#checkout" id="gochk">Checkout</a><a class="btn full ghost" href="#cart" style="margin-top:8px">View full cart</a>`:'');
 $('#ctitle').textContent=`Your cart (${totals().count})`;bindCart(d,drawCart);$$('a',d).forEach(a=>a.addEventListener('click',()=>{if(a.getAttribute('href')?.startsWith('#'))d.classList.remove('open')}))}
function vCart(){return `<div class="wrap"><div class="crumbs"><a href="#home">Home</a> / Cart</div><h1 style="font-size:clamp(44px,5vw,72px);margin-bottom:28px">Your cart</h1><div class="cartpage"><div id="cbody"></div><div class="card" id="cfoot"></div></div></div>`}
function cartAfter(){const re=()=>{$('#cbody').innerHTML=cartBody(true);$('#cfoot').innerHTML=S.cart.length?cartFoot()+`<a class="btn full" href="#checkout">Checkout as guest or log in</a><p class="tiny muted" style="margin-top:10px">Pay by UPI, card, net banking or cash on delivery.</p>`:'<p class="muted">Nothing here yet.</p>';bindCart($('#view'),re)};re()}
/* ---------------- CHECKOUT ---------------- */
const CK={step:1,d:{}};
function vCheckout(){if(!S.cart.length)return `<div class="wrap band"><div class="empty"><div class="disp">Nothing to check out (yet).</div><p class="muted">Your cart is empty. Add something lovely first.</p><a class="btn" href="#shop">Go shopping</a></div></div>`;
 CK.step=1;if(S.user)Object.assign(CK.d,{name:S.user.name||'',phone:S.user.phone||''});
 return `<div class="wrap"><div class="crumbs"><a href="#cart">Cart</a> / Checkout</div><h1 style="font-size:clamp(44px,5vw,72px)">Checkout</h1>
 <div class="steps2" id="cks"></div><div class="cartpage"><div class="card" id="ckf"></div><div class="card" id="cksum"></div></div></div>`}
function checkoutAfter(){if(!S.cart.length)return;
 const sum=()=>{$('#cksum').innerHTML=`<h3 style="margin-bottom:10px">Order summary</h3>${S.cart.map(l=>{const d=lineData(l);return `<div class="tot small"><span>${esc(d.name)} × ${l.qty}</span><span>${d.monthly?inr(d.monthly)+'/mo':inr(d.buy)}</span></div>`}).join('')}<hr style="border:0;border-top:1px dashed var(--line);margin:10px 0">`+cartFoot();const cb=$('#carebox');if(cb)cb.onchange=()=>{S.care=cb.checked;sum()}};
 const steps=()=>$('#cks').innerHTML=['Your details','Delivery','Payment'].map((s,i)=>`<span class="${CK.step===i+1?'on':CK.step>i+1?'done':''}">${i+1}. ${s}</span>`).join('');
 const f=(id,label,attrs='',em='')=>`<div class="field" id="f-${id}"><label for="${id}">${label}</label><input id="${id}" value="${esc(CK.d[id]||'')}" ${attrs}><span class="em">${em}</span></div>`;
 const bad=(id,b)=>{$('#f-'+id).classList.toggle('err',b);return b};
 const s1=()=>{$('#ckf').innerHTML=`${S.user?`<div class="note" style="margin-bottom:14px">Logged in as <b>${esc(S.user.name)}</b>. Your rentals will show up in My Abode.</div>`:`<div class="note" style="margin-bottom:14px">Checking out as a <b>guest</b>. No account needed, we'll text you updates. <a href="#login">Log in instead</a></div>`}
  ${f('name','Full name','autocomplete="name"','Please tell us your name so the delivery crew knows who to ask for.')}
  <div class="row2">${f('phone','Mobile number','inputmode="numeric" maxlength="10" autocomplete="tel"','Enter a 10-digit Indian mobile number.')}${f('email','Email (for your rental agreement)','type="email" autocomplete="email"','That email doesn\'t look quite right.')}</div>
  <button class="btn full" id="n1">Continue to delivery</button>`;
  $('#n1').onclick=()=>{['name','phone','email'].forEach(k=>CK.d[k]=$('#'+k).value.trim());
   const e=[bad('name',CK.d.name.length<2),bad('phone',!/^[6-9]\d{9}$/.test(CK.d.phone)),bad('email',!/^\S+@\S+\.\S+$/.test(CK.d.email))];if(!e.some(Boolean)){CK.step=2;go()}}};
 const s2=()=>{const days=[...Array(5)].map((_,i)=>{const d=new Date();d.setDate(d.getDate()+3+i);return d.toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short'})});
  $('#ckf').innerHTML=`${f('addr','Flat, building, street','autocomplete="street-address"','We need your full address to find you.')}
  <div class="row2">${f('pin','Pincode','inputmode="numeric" maxlength="6"','')}${f('city','City','autocomplete="address-level2"','Please add your city.')}</div>
  <div class="field"><label for="slot">Delivery &amp; setup slot</label><select id="slot">${days.map(d=>`<option>${d}, 10am–1pm</option><option>${d}, 3pm–7pm</option>`).join('')}</select></div>
  <label class="check"><input type="checkbox" id="lift"><span>My building has a working lift (helps our crew plan, no extra charge either way)</span></label>
  <div style="display:flex;gap:10px"><button class="btn ghost" id="b2">Back</button><button class="btn" id="n2" style="flex:1">Continue to payment</button></div>`;
  $('#b2').onclick=()=>{CK.step=1;go()};
  $('#n2').onclick=()=>{['addr','pin','city'].forEach(k=>CK.d[k]=$('#'+k).value.trim());CK.d.slot=$('#slot').value;
   const pinOk=/^\d{6}$/.test(CK.d.pin)&&'145'.includes(CK.d.pin[0]);$('#f-pin .em').innerHTML=/^\d{6}$/.test(CK.d.pin)?'We\'re not in this area yet. We currently deliver in Mumbai, Pune, Bengaluru, Hyderabad and Delhi NCR.':'Pincodes have 6 digits.';
   const e=[bad('addr',CK.d.addr.length<6),bad('pin',!pinOk),bad('city',CK.d.city.length<2)];if(!e.some(Boolean)){CK.step=3;go()}}};
 const s3=()=>{const t=totals();$('#ckf').innerHTML=`<h3 style="margin-bottom:12px">How would you like to pay ${inr(t.due)}?</h3>
  <label class="radio"><input type="radio" name="pay" value="UPI"><span><b>UPI</b><br><span class="small muted">GPay, PhonePe, Paytm or any UPI app</span></span></label>
  <label class="radio"><input type="radio" name="pay" value="Card"><span><b>Credit / debit card</b><br><span class="small muted">Visa, Mastercard, RuPay. Autopay for monthly rent is optional.</span></span></label>
  <label class="radio"><input type="radio" name="pay" value="Net banking"><span><b>Net banking</b></span></label>
  <label class="radio"><input type="radio" name="pay" value="Cash on delivery"><span><b>Pay on delivery</b><br><span class="small muted">Pay your first month + deposit by cash or UPI when our crew finishes setup. No extra fee.</span></span></label>
  <div class="alert" id="payerr" hidden>Pick a payment method to place your order.</div>
  <label class="check"><input type="checkbox" id="terms"><span>I've read the <a href="#help-policies">rental terms</a>, including the refundable deposit and the 3-month minimum.</span></label>
  <div class="alert" id="termerr" hidden>Please accept the rental terms so we can draw up your agreement.</div>
  <div style="display:flex;gap:10px"><button class="btn ghost" id="b3">Back</button><button class="btn" id="place" style="flex:1">Place order · ${inr(t.due)}</button></div>
  <p class="tiny muted" style="margin-top:10px">This is a student prototype: no real payment is taken.</p>`;
  $('#b3').onclick=()=>{CK.step=2;go()};
  $('#place').onclick=()=>{const pay=$('input[name=pay]:checked');$('#payerr').hidden=!!pay;$('#termerr').hidden=$('#terms').checked;if(!pay||!$('#terms').checked)return;
   const t=totals(),id='AB'+Math.floor(100000+Math.random()*899999);
   S.orders.unshift({id,date:new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}),slot:CK.d.slot,pay:pay.value,items:S.cart.map(l=>({...l})),m:t.m,due:t.due,dep:t.dep,name:CK.d.name,city:CK.d.city});
   save('orders');S.cart=[];save('cart');updateCount();location.hash='done'}};
 const go=()=>{steps();[s1,s2,s3][CK.step-1]();sum();window.scrollTo({top:0,behavior:'smooth'})};go()}
function vDone(){const o=S.orders[0];if(!o)return v404();
 return `<div class="wrap band" style="text-align:center;max-width:760px"><div style="display:grid;place-items:center" class="wiggle">${DOOD.house(140)}</div><h1>Welcome home, ${esc(o.name.split(' ')[0])}.</h1><p class="lede" style="margin:12px auto">Order <b>${o.id}</b> is confirmed. Our crew arrives <b>${esc(o.slot)}</b> to set everything up. We'll WhatsApp you the crew's name and a live tracker the day before.</p>
 <div class="card" style="text-align:left;margin:20px 0"><div class="tot"><span>Monthly rent</span><span>${inr(o.m)}/mo</span></div><div class="tot"><span>Refundable deposit</span><span>${inr(o.dep)}</span></div><div class="tot big"><span>Paid / due at delivery (${esc(o.pay)})</span><span>${inr(o.due)}</span></div></div>
 <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap"><a class="btn" href="#account">Track in My Abode</a><a class="btn ghost" href="#inspo">Get styling tips while you wait</a></div>
 <p class="small muted" style="margin-top:18px">Psst: refer a flatmate from My Abode and you both get ₹500 off next month.</p></div>`}
function doneAfter(){confetti()}
