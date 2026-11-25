/* ABODE pages 2: login, account, builder, quiz, inspo, how, about, help, 404 */
const TIPS=[
 {h:'Hang mirrors opposite windows',t:'A mirror facing a window bounces daylight around and makes a small rented room feel almost twice as big. Floor mirrors need zero drilling, so your deposit stays safe.'},
 {h:'Follow the 60-30-10 colour rule',t:'60% of the room in one main colour (walls, big pieces), 30% in a second (sofa, bedding), 10% in a bold accent (cushions, a lamp, a rug). Instant pulled-together look.'},
 {h:'Layer three kinds of light',t:'One overhead light is a mood killer. Add a floor lamp for ambient glow, a table lamp for tasks, and something tiny and warm for evenings. Bonus: warm 2700K bulbs.'},
 {h:'Size your rug up, not down',t:'A rug should be big enough for at least the front legs of your sofa and chairs to sit on it. Too-small rugs make rooms look smaller and furniture look like it is floating.'},
 {h:'Leave 45 cm in front of the sofa',t:'Keep about 45 cm (an arm\'s reach) between your sofa and coffee table, and 75–90 cm for walkways. Your shins will thank you.'},
 {h:'Style in odd numbers',t:'Groups of three or five look more natural than pairs. Try a tall vase, a medium candle and a small object on a shelf, at different heights.'},
 {h:'Hang art at eye level',t:'The centre of a frame should sit roughly 145 cm from the floor. Renting? Use removable adhesive strips or simply lean art on a shelf or dresser.'},
 {h:'Pick one statement piece per room',t:'Let one bold piece (a banana sofa, a checkerboard bed) be the star and keep everything around it calmer. Too many stars and nobody shines.'},
 {h:'Hide the boring with plants',t:'A tall plant in an ugly corner, trailing pothos on a shelf, or a mushroom planter on your desk adds life fast. Pothos and snake plants forgive forgetful waterers.'},
 {h:'Go curvy in small spaces',t:'Round coffee tables, curved sofas and blob mirrors soften tight rooms and are easier to walk around than sharp corners.'},
 {h:'Make the bed a headboard moment',t:'A great headboard does the heavy lifting in a bedroom, so you can keep walls blank (and deposit-friendly).'},
 {h:'Zone a studio with rugs and lamps',t:'In a one-room flat, a rug marks the living zone, a lamp marks the reading nook, and a swing or bean bag becomes a chill corner. No walls required.'},
];
function tipCard(t,i){return `<div class="tip rv"><span class="n">${String(i+1).padStart(2,'0')}</span><h3>${esc(t.h)}</h3><p>${esc(t.t)}</p></div>`}
/* ---------------- LOGIN ---------------- */
function vLogin(){if(S.user){location.hash='account';return ''}
 return `<div class="wrap band"><div class="auth"><div class="art" aria-hidden="true"><div class="doodle spin" style="left:8%;top:8%">${DOOD.star('#f6d55c',60)}</div><div class="doodle wiggle" style="right:10%;bottom:10%">${DOOD.flower('#f4a6c0',70)}</div><div class="door" id="door"><div class="frame"></div><div class="leaf"><div class="knob"></div></div><div class="sign">ABODE</div></div><p class="disp" style="position:absolute;bottom:26px;color:#fff;font-size:24px;text-align:center;width:100%" id="doortxt">Knock knock. It's you.</p></div>
 <div class="form" id="authf"></div></div></div>`}
function loginAfter(){if(S.user)return;const F=$('#authf');let phone='',name='',mode='login';
 const s1=()=>{F.innerHTML=`<h1 style="font-size:52px">${mode==='login'?'Welcome back!':'Move in. No lease drama.'}</h1><p class="muted">${mode==='login'?'Log in with your mobile number. We\'ll text you a one-time code.':'Create your ABODE account in under a minute.'}</p>
  ${mode==='signup'?`<div class="field" id="f-nm"><label for="nm">Your name</label><input id="nm" autocomplete="name"><span class="em">We need something to call you (nicknames welcome).</span></div>`:''}
  <div class="field" id="f-ph"><label for="ph">Mobile number</label><div style="display:flex;gap:8px"><input value="+91" disabled style="width:70px;text-align:center"><input id="ph" inputmode="numeric" maxlength="10" autocomplete="tel" style="flex:1"></div><span class="em">That number looks a digit short (or long). Try a 10-digit number.</span></div>
  <button class="btn full" id="sendotp">Send OTP</button><div class="or">or</div><button class="btn full ghost" id="google">Continue with Google</button>
  <p class="small" style="margin-top:16px">${mode==='login'?'New here? <button class="linkbtn" id="sw" style="color:var(--red)">Create an account</button>':'Already have one? <button class="linkbtn" id="sw" style="color:var(--red)">Log in</button>'} · <a href="#checkout">Just checking out? Continue as guest</a></p>`;
  $('#sw').onclick=()=>{mode=mode==='login'?'signup':'login';s1()};
  $('#google').onclick=()=>{done('Google friend','9800000000')};
  $('#sendotp').onclick=()=>{phone=$('#ph').value.trim();const okp=/^[6-9]\d{9}$/.test(phone);$('#f-ph').classList.toggle('err',!okp);let okn=true;if(mode==='signup'){name=$('#nm').value.trim();okn=name.length>1;$('#f-nm').classList.toggle('err',!okn)}if(okp&&okn)s2()}};
 const s2=()=>{F.innerHTML=`<h1 style="font-size:52px">Check your texts</h1><p class="muted">We sent a 4-digit code to +91 ${phone.slice(0,5)} ${phone.slice(5)}.</p><div class="otp" id="otp">${[0,1,2,3].map(i=>`<input inputmode="numeric" maxlength="1" aria-label="Digit ${i+1}">`).join('')}</div><div class="alert" id="otperr" hidden style="margin-top:12px">That OTP ghosted us. Double-check and try again?</div><button class="btn full" id="verify" style="margin-top:16px">Open the door</button><p class="small muted" style="margin-top:10px">Prototype: any 4 digits work. <button class="linkbtn" id="back">Change number</button></p>`;
  const ins=$$('#otp input');ins[0].focus();ins.forEach((x,i)=>{x.oninput=()=>{x.value=x.value.replace(/\D/g,'');if(x.value&&ins[i+1])ins[i+1].focus()};x.onkeydown=e=>{if(e.key==='Backspace'&&!x.value&&ins[i-1])ins[i-1].focus()}});
  $('#back').onclick=s1;$('#verify').onclick=()=>{const code=ins.map(x=>x.value).join('');if(code.length<4){$('#otperr').hidden=false;return}done(name||'Friend',phone)}};
 const done=(n,p)=>{S.user={name:n,phone:p,since:new Date().toLocaleDateString('en-IN',{month:'short',year:'numeric'})};save('user');$('#door').classList.add('open');$('#doortxt').textContent='Come on in, '+n.split(' ')[0]+'!';setTimeout(()=>location.hash='account',1300)};
 s1()}
/* ---------------- ACCOUNT ---------------- */
let ATAB='rentals';
function vAccount(){if(!S.user)return `<div class="wrap band"><div class="empty"><div style="display:grid;place-items:center">${DOOD.house(110)}</div><div class="disp">My Abode is locked.</div><p class="muted">Log in to see your rentals, deliveries, saved rooms and deposit.</p><a class="btn" href="#login">Log in or sign up</a></div></div>`;
 return `<div class="wrap"><div class="crumbs"><a href="#home">Home</a> / My Abode</div><h1 style="font-size:clamp(34px,4vw,52px);margin-bottom:18px">Hey ${esc(S.user.name.split(' ')[0])}, welcome home.</h1>
 <div class="acct"><aside class="house">${[['rentals','🛋','My rentals'],['orders','📦','Orders & delivery'],['saved','💾','Saved rooms'],['swap','🔁','Swap shop'],['refer','🎁','Refer a flatmate'],['deposit','🧾','Deposit tracker'],['profile','⚙️','Profile']].map(([k,i,l])=>`<button data-at="${k}" class="${ATAB===k?'on':''}"><span aria-hidden="true">${i}</span>${l}</button>`).join('')}<button id="logout" style="color:var(--mute)"><span aria-hidden="true">🚪</span>Log out</button></aside><div class="card" id="apane"></div></div></div>`}
function accountAfter(){if(!S.user)return;
 const all=S.orders.flatMap(o=>o.items.map(l=>({...l,oid:o.id,date:o.date})));
 const pane=()=>{const A=$('#apane');
  if(ATAB==='rentals')A.innerHTML=`<h2 style="font-size:32px">My rentals</h2>${all.length?all.map(l=>{const d=lineData(l);const left=Math.max(1,(l.plan||12)*30-9);return `<div class="line"><img src="${d.img}" alt=""><div><div class="nm">${esc(d.name)}</div><div class="small muted">${esc(d.sub)} · order ${l.oid}</div><div class="small" style="margin-top:6px"><b>${left} days left</b> on your plan</div></div><div style="display:flex;flex-direction:column;gap:6px"><button class="btn sm ghost" data-ext>Extend</button><button class="btn sm ghost" data-swp>Swap</button></div></div>`}).join(''):`<div class="empty" style="padding:30px"><div class="disp" style="font-size:26px">No rentals yet. The flat is echoing.</div><p class="muted">Your rented pieces will live here once you order.</p><a class="btn" href="#bundles">Start with a bundle</a></div>`}`;
  if(ATAB==='orders')A.innerHTML=`<h2 style="font-size:32px">Orders &amp; delivery</h2>${S.orders.length?S.orders.map((o,i)=>`<div class="card" style=";margin:12px 0"><div class="tot"><b>Order ${o.id}</b><span class="small muted">${o.date}</span></div><div class="small">Setup slot: <b>${esc(o.slot)}</b> · ${esc(o.pay)} · ${inr(o.m)}/mo</div><div class="truck"><div class="road"></div><div class="tk" style="left:${i?88:38}%">${IC.truck}</div></div><div class="dots"><span>Confirmed</span><span>Quality check</span><span>Out for delivery</span><span>Set up</span></div></div>`).join(''):'<p class="muted">No orders yet. Your delivery tracker will show up here.</p>'}`;
  if(ATAB==='saved')A.innerHTML=`<h2 style="font-size:32px">Saved rooms</h2>${S.saved.length?S.saved.map((s,i)=>`<div class="card" style=";margin:12px 0"><b>${esc(s.name)}</b> <span class="small muted">· ${s.items.length} pieces · ${inr(s.price)}/mo</span><div style="display:flex;gap:8px;margin:10px 0;flex-wrap:wrap">${s.items.map(id=>`<img src="${W(id)}" alt="${esc(BY[id].name)}" style="width:70px;border-radius:10px">`).join('')}</div><button class="btn sm" data-rentsaved="${i}">Rent this room</button></div>`).join(''):`<p class="muted">Rooms you design in <a href="#build">Build your Abode</a> can be saved here for later.</p>`}${S.wish.length?`<h3 style="margin-top:20px">Wishlist</h3><div class="track" style="margin-top:8px">${S.wish.map(id=>mcard(BY[id])).join('')}</div>`:''}`;
  if(ATAB==='swap')A.innerHTML=`<h2 style="font-size:32px">Swap shop</h2><p>Bored of minimal? Got a new flatmate who hates pink? Every 6 months you get <b>one free style swap</b>: we take back up to 3 pieces and bring new ones of the same rent or less.</p><div class="note" style="margin:12px 0">Your next free swap unlocks on <b>${new Date(Date.now()+150*864e5).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</b>. Swaps before that cost a flat ₹299.</div><a class="btn" href="#quiz">Re-take the vibe quiz</a> <a class="btn ghost" href="#shop">Browse new pieces</a>`;
  if(ATAB==='refer'){const code='ABODE-'+S.user.name.split(' ')[0].toUpperCase().slice(0,6)+'500';A.innerHTML=`<h2 style="font-size:32px">Refer a flatmate</h2><p>Give ₹500, get ₹500. When your friend rents anything for 3+ months with your code, you both get ₹500 off your next month.</p><div style="display:flex;gap:10px;align-items:center;margin:16px 0;flex-wrap:wrap"><span class="disp" style="font-size:30px;background:var(--blue2);padding:8px 18px;border-radius:14px">${code}</span><button class="btn sm" id="copyc">Copy code</button></div><p class="small muted">You've referred 0 friends so far. Your future flatmates are out there.</p>`;$('#copyc').onclick=()=>{try{navigator.clipboard.writeText(code).then(()=>toast('Code copied. Go spread the vibe.'),()=>toast('Copy blocked here. Your code is '+code))}catch(e){toast('Your code is '+code)}}}
  if(ATAB==='deposit'){const dep=S.orders.reduce((a,o)=>a+o.dep,0);A.innerHTML=`<h2 style="font-size:32px">Deposit tracker</h2><div class="facts"><div class="fact"><b>${inr(dep)}</b>Held safely</div><div class="fact"><b>7 days</b>Refund time, guaranteed</div><div class="fact"><b>₹100/day</b>If we're late</div></div><p>Your deposit is refunded to the original payment method within 7 working days of pickup, minus only documented damage beyond normal wear. Got Abode Care? Small accidents are on us.</p>`}
  if(ATAB==='profile')A.innerHTML=`<h2 style="font-size:32px">Profile</h2><div class="field"><label>Name</label><input id="pn" value="${esc(S.user.name)}"></div><div class="field"><label>Mobile</label><input value="+91 ${esc(S.user.phone)}" disabled></div><p class="small muted">Member since ${esc(S.user.since)}</p><button class="btn" id="psave">Save</button>`;
  $$('[data-ext]',A).forEach(b=>b.onclick=()=>toast('Extension request sent. Same rent, more months of joy.'));
  $$('[data-swp]',A).forEach(b=>b.onclick=()=>{ATAB='swap';$$('[data-at]').forEach(x=>x.classList.toggle('on',x.dataset.at==='swap'));pane()});
  $$('[data-rentsaved]',A).forEach(b=>b.onclick=()=>{const s=S.saved[+b.dataset.rentsaved];const disc=s.items.length>=5?15:s.items.length>=3?10:0;s.items.forEach(id=>addLine({kind:'p',id,plan:12,mode:'rent',color:BY[id].colors[0],disc}))});
  const ps=$('#psave');if(ps)ps.onclick=()=>{S.user.name=$('#pn').value.trim()||S.user.name;save('user');toast('Saved. Looking good.');route()}};
 $$('[data-at]').forEach(b=>b.onclick=()=>{ATAB=b.dataset.at;$$('[data-at]').forEach(x=>x.classList.remove('on'));b.classList.add('on');pane()});
 $('#logout').onclick=()=>{S.user=null;save('user');toast('Logged out. Come back soon!');location.hash='home'};pane()}
/* ---------------- BUILD YOUR ABODE ---------------- */
const BLD={step:1,room:'',vibes:[],pick:{}};
const ROOMCATS={living:['sofa','coffee','tv','chair','dining','carpet','lamp','vase','mirror'],bedroom:['bed','nightstand','wardrobe','dresser','carpet','lamp','mirror','beanbag'],mixed:['sofa','bed','coffee','nightstand','wardrobe','lamp','carpet','beanbag','swing']};
const SLOT={sofa:[4,34,52],bed:[4,30,56],coffee:[40,64,24],tv:[56,40,40],chair:[66,48,22],dining:[52,40,40],carpet:[22,72,44],lamp:[80,14,16],vase:[48,52,10],mirror:[86,20,12],nightstand:[64,52,16],wardrobe:[70,8,26],dresser:[58,26,30],beanbag:[62,58,22],swing:[70,8,26]};
function vBuild(){return `<div class="wrap"><div class="crumbs"><a href="#home">Home</a> / Build your Abode</div><div class="sh" style="margin-bottom:0"><div><h1 style="font-size:clamp(44px,5vw,72px)">Build a room</h1><p class="lede" style="margin-bottom:0">Pick the pieces. 3+ saves 10%, 5+ saves 15%.</p></div></div><div class="steps2" id="bst"></div><div id="bbody"></div></div>`}
function buildAfter(){
 const st=()=>$('#bst').innerHTML=['Pick a room','Pick your vibe','Fill your room','Review'].map((s,i)=>`<span class="${BLD.step===i+1?'on':BLD.step>i+1?'done':''}">${i+1}. ${s}</span>`).join('');
 const sel=()=>Object.values(BLD.pick).filter(Boolean);
 const price=()=>{const ids=sel();const full=ids.reduce((a,i)=>a+BY[i].price.m12,0);const d=ids.length>=5?15:ids.length>=3?10:0;return{ids,full,d,price:Math.round(full*(1-d/100))}};
 const s1=()=>{$('#bbody').innerHTML=`<div class="pickgrid">${[['living','Living room','Sofa, coffee table, TV unit and all the hangout bits.',213],['bedroom','Bedroom','Bed, nightstand, wardrobe and your get-ready corner.',152],['mixed','Studio / mix it up','One room that does it all. Perfect for 1RK and studio flats.',87]].map(([k,t,d,im])=>`<button class="pick ${BLD.room===k?'on':''}" data-room="${k}" aria-pressed="${BLD.room===k}"><img class="pk" src="${W(im)}" alt=""><b>${t}</b><span class="muted">${d}</span></button>`).join('')}</div><div style="margin-top:20px"><button class="btn" id="bn1" ${BLD.room?'':'disabled'}>Next: pick your vibe</button></div>`;
  $$('[data-room]').forEach(b=>b.onclick=()=>{if(BLD.room!==b.dataset.room)BLD.pick={};BLD.room=b.dataset.room;s1()});$('#bn1').onclick=()=>{BLD.step=2;go()}};
 const s2=()=>{$('#bbody').innerHTML=`<p class="muted">Pick one or mix a few.</p><div class="pickgrid">${[['minimal','Calm, warm, gallery-clean.'],['cutesy','Soft, pink, squishy.'],['quirky','Loud, playful, slightly unhinged.']].map(([k,d])=>`<button class="pick ${BLD.vibes.includes(k)?'on':''}" data-vb="${k}" style="background:var(--${k.slice(0,3)})" aria-pressed="${BLD.vibes.includes(k)}"><b>${STYLE[k]}</b><span>${d}</span></button>`).join('')}</div><div style="margin-top:20px;display:flex;gap:10px"><button class="btn ghost" id="bb2">Back</button><button class="btn" id="bn2" ${BLD.vibes.length?'':'disabled'}>Next: fill your room</button></div>`;
  $$('[data-vb]').forEach(b=>b.onclick=()=>{const v=b.dataset.vb,i=BLD.vibes.indexOf(v);if(i>-1)BLD.vibes.splice(i,1);else BLD.vibes.push(v);s2()});$('#bb2').onclick=()=>{BLD.step=1;go()};$('#bn2').onclick=()=>{BLD.step=3;go()}};
 const preview=()=>{const pr=price();const v=BLD.vibes.length===1?BLD.vibes[0]:'minimal';
  return `<div class="canvasroom vibe-${v}">${pr.ids.length?look(pr.ids,12,'grid'):`<p class="disp" style="position:absolute;inset:0;display:grid;place-items:center;color:var(--mute);font-size:22px;text-align:center;padding:20px">Your room is a blank canvas.<br>Tap pieces to move them in.</p>`}</div>
  <div class="card" style="margin-top:14px"><div class="tier"><span class="${pr.ids.length>=3&&pr.ids.length<5?'on':''}">3+ pieces · 10% off</span><span class="${pr.ids.length>=5?'on':''}">5+ pieces · 15% off</span></div>
  <div class="tot"><span>${pr.ids.length} piece${pr.ids.length===1?'':'s'}</span><span>${pr.d?`<span class="strike">${inr(pr.full)}</span> `:''}<b>${inr(pr.price)}/mo</b></span></div>${pr.d?`<span class="save">You save ${inr(pr.full-pr.price)} every month</span>`:`<span class="small muted">${pr.ids.length<3?`Add ${3-pr.ids.length} more for 10% off.`:''}</span>`}
  <div class="tot small" style="margin-top:8px"><span>Per day</span><span>${inr(pr.price*12/365)}</span></div><button class="btn full" id="bdone" style="margin-top:12px" ${pr.ids.length?'':'disabled'}>Review my room</button></div>`};
 const s3=()=>{const cats=ROOMCATS[BLD.room];
  $('#bbody').innerHTML=`<div class="builder"><div>${cats.map(c=>{const L=P.filter(p=>p.cat===c&&BLD.vibes.includes(p.style));if(!L.length)return '';return `<div class="catrow"><div class="sh" style="margin-bottom:6px"><h3>${esc(L[0].catName)} <span class="small muted">· pick one</span></h3>${BLD.pick[c]?`<button class="linkbtn" data-clear="${c}">Clear</button>`:''}</div><div class="track">${L.map(p=>`<div class="mini ${BLD.pick[c]===p.id?'sel':''}" data-pk="${c}" data-id="${p.id}" role="button" tabindex="0" aria-pressed="${BLD.pick[c]===p.id}" aria-label="${esc(p.name)}, ${inr(p.price.m12)} a month">${BLD.pick[c]===p.id?'<span class="tickmark">✓</span>':''}<img src="${W(p.id)}" alt="" loading="lazy"><h4>${esc(p.name)}</h4><div class="pm">${inr(p.price.m12)}/mo</div></div>`).join('')}</div></div>`}).join('')}</div><div class="roompreview" id="rp">${preview()}</div></div>`;
  const bind=()=>{const b=$('#bdone');if(b)b.onclick=()=>{BLD.step=4;go()}};
  $$('[data-pk]').forEach(el=>{const f=()=>{const c=el.dataset.pk,id=+el.dataset.id;BLD.pick[c]=BLD.pick[c]===id?null:id;const y=window.scrollY;s3();window.scrollTo(0,y)};el.onclick=f;el.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();f()}}});
  $$('[data-clear]').forEach(b=>b.onclick=()=>{BLD.pick[b.dataset.clear]=null;s3()});bind()};
 const s4=()=>{const pr=price();
  $('#bbody').innerHTML=`<div class="builder"><div class="card"><h2 style="font-size:32px">Your ${BLD.room==='mixed'?'studio':BLD.room==='living'?'living room':'bedroom'}</h2>${pr.ids.map(id=>{const p=BY[id];return `<div class="line"><img src="${W(id)}" alt=""><div><div class="nm">${esc(p.name)}</div><div class="small muted">${esc(p.catName)} · ${STYLE[p.style]}</div></div><b>${inr(p.price.m12)}/mo</b></div>`}).join('')}
   <div class="field" style="margin-top:14px"><label for="rname">Name your room (for saving)</label><input id="rname" value="My ${BLD.vibes.map(v=>STYLE[v]).join(' + ')} ${BLD.room==='mixed'?'studio':BLD.room}"></div>
   <div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn ghost" id="bb4">Back to editing</button><button class="btn ghost" id="bsave">Save to My Abode</button><button class="btn" id="brent" data-img="${pr.ids[0]?W(pr.ids[0]):''}">Rent the whole room · ${inr(pr.price)}/mo</button></div></div><div class="roompreview">${preview()}</div></div>`;
  const bd=$('#bdone');if(bd)bd.remove();
  $('#bb4').onclick=()=>{BLD.step=3;go()};
  $('#bsave').onclick=()=>{if(!S.user){toast('Log in to save rooms. It takes 20 seconds.','Log in',()=>location.hash='login');return}S.saved.unshift({name:$('#rname').value||'My room',items:pr.ids,price:pr.price});save('saved');toast('Saved to My Abode.','See it',()=>{ATAB='saved';location.hash='account'})};
  $('#brent').onclick=e=>{pr.ids.forEach((id,i)=>addLine({kind:'p',id,plan:12,mode:'rent',color:BY[id].colors[0],disc:pr.d},i?null:e.currentTarget))}};
 const go=()=>{st();[s1,s2,s3,s4][BLD.step-1]();window.scrollTo({top:0,behavior:'smooth'})};go()}
/* ---------------- QUIZ ---------------- */
const QZ=[
 {q:'Your ideal Sunday looks like…',o:[['Farmers market, then reading in silence','minimal'],['Café hopping and a 47-photo dump','cutesy'],['Thrifting something nobody else would buy','quirky'],['Rearranging my room. Again.','mix']]},
 {q:'Pick a snack.',o:[['Hummus and crackers','minimal'],['Strawberry mochi','cutesy'],['Spicy mango with chilli salt','quirky'],['Whatever my flatmate left','mix']]},
 {q:'Your phone wallpaper is…',o:[['A beige landscape','minimal'],['My pet in a tiny hat','cutesy'],['A meme only I understand','quirky'],['Still the default one','minimal']]},
 {q:'A friend walks into your room. You want them to say…',o:[['"Wow, so calm."','minimal'],['"OMG this is so cute!"','cutesy'],['"Wait, where did you GET this?"','quirky'],['"How do you keep it so tidy?"','minimal']]},
];
const QR={minimal:{t:'You\'re a Minimal Muse',d:'Calm, warm and intentional. You like fewer things, but better ones. Your flat is a deep breath.',b:'clean-slate'},cutesy:{t:'You\'re a Cutesy Cloud',d:'Soft textures, sweet colours and things that make you smile. Your room is basically a hug.',b:'soft-launch'},quirky:{t:'You\'re a Quirky Icon',d:'Bold, playful, a little chaotic and 100% memorable. Guests leave with photos and questions.',b:'main-character'}};
let QA=[];
function vQuiz(){QA=[];return `<div class="wrap band"><div class="quiz" id="qz"></div></div>`}
function quizAfter(){const Z=$('#qz');
 const q=()=>{const i=QA.length;if(i>=QZ.length)return res();const x=QZ[i];
  Z.innerHTML=`<span class="sticker">Question ${i+1} of ${QZ.length}</span><div class="qbar"><div style="width:${i/QZ.length*100}%"></div></div><h1 style="font-size:clamp(30px,4vw,46px)">${esc(x.q)}</h1><div class="qopts">${x.o.map((o,k)=>`<button class="qopt" data-qo="${k}">${esc(o[0])}</button>`).join('')}</div>${i?'<button class="linkbtn" id="qback" style="margin-top:14px">Back</button>':''}`;
  $$('[data-qo]').forEach(b=>b.onclick=()=>{QA.push(x.o[+b.dataset.qo][1]);q()});const bk=$('#qback');if(bk)bk.onclick=()=>{QA.pop();q()}};
 const res=()=>{const c={minimal:0,cutesy:0,quirky:0};QA.forEach(a=>{if(a==='mix'){c.cutesy+=.5;c.quirky+=.5}else c[a]++});const v=Object.entries(c).sort((a,b)=>b[1]-a[1])[0][0];const r=QR[v],b=BUNBY[r.b];
  Z.innerHTML=`<div class="qbar"><div style="width:100%"></div></div><span class="sticker">Your vibe</span><h1 style="margin-top:12px">${r.t}</h1><p class="lede" style="margin:12px auto">${r.d}</p><div style="max-width:420px;margin:20px auto;text-align:left">${bcard(b)}</div><div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap"><a class="btn ghost" href="#shop" id="qshop">Shop all ${STYLE[v].toLowerCase()} pieces</a><button class="btn ghost" id="qre">Retake quiz</button></div>`;
  confetti();reveal();$('#qshop').onclick=()=>{Object.assign(SH,{style:v,room:'',cat:'',need:'',price:'',q:''})};$('#qre').onclick=()=>{QA=[];q()}};
 q()}
/* ---------------- INSPO ---------------- */
const INSPO=[
 [138,'Cloud nine living room','Cutesy',[[75,55,212],[37,73,227],[37,24,112],[50,86,94],[28,63,52]]],
 [139,'Pastel and pillowy','Cutesy',[[55,66,216],[32,32,31],[28,78,227],[10,36,116],[50,92,97]]],
 [141,'Merlot and blue','Quirky',[[60,55,211],[90,78,215],[57,67,229],[65,32,42],[35,87,106]]],
 [140,'Reading corner','Quirky',[[43,66,91],[12,34,40],[70,58,109],[77,79,233],[65,92,104]]],
 [196,'Primary colour bedroom','Quirky',[[30,56,157],[47,30,42],[88,57,179],[10,73,180],[24,89,104]]],
 [272,'Sunny and round','Quirky',[[45,56,212],[75,78,227],[48,60,109],[95,64,230],[87,46,118]]],
 [271,'Soft and sculptural','Minimal',[[70,62,210],[32,73,231],[55,86,101]]],
 [274,'Gallery lounge','Minimal',[[55,66,208],[38,73,222],[45,90,105]]],
 [136,'Swing in the bedroom','Minimal',[[55,53,135],[30,80,148]]],
 [137,'Curved desk nook','Minimal',[[45,50,161],[66,64,259],[70,91,93]]],
 [201,'Yellow headboard','Quirky',[[55,76,159],[95,72,182],[45,92,105]]],
 [275,'Wavy and bright','Quirky',[[22,64,269],[86,73,225],[66,62,218],[52,54,119]]],
];
function vInspo(){return `<div class="wrap"><div class="crumbs"><a href="#home">Home</a> / Inspo</div>
 <h1 style="font-size:clamp(44px,5vw,72px)">Room inspo</h1><p class="lede">Tap a room to see every piece in it, then rent the look.</p>
 <div class="ptabs">${[['ideas','Rooms'],['tips','Design tips'],['guides','Style guides']].map(([k,l])=>`<a class="chip" href="#inspo-${k}">${l}</a>`).join('')}</div>
 <div class="igrid" id="inspo-ideas">${INSPO.map(([n,t,v,h],i)=>`<button class="iroom rv" data-room="${i}" aria-label="${esc(t)}: see the ${h.length} pieces"><img src="img/x/r${n}.webp" alt="" loading="lazy"><span class="cap"><span><b>${esc(t)}</b><br><span>${v} · ${h.length} pieces</span></span><span class="arrow" aria-hidden="true">→</span></span></button>`).join('')}</div>
 <h2 id="inspo-tips" style="margin:100px 0 36px">Design tips</h2><div class="tips">${TIPS.map(tipCard).join('')}</div>
 <h2 id="inspo-guides" style="margin:100px 0 36px">Style guides</h2><div class="claims">${[
  ['minimal','Minimal','Warm neutrals, natural wood and one textured hero. Keep surfaces mostly clear.',['#e7dfd2','#c9a36b','#5a3825','#f5f0e6'],[149,208,108]],
  ['cutesy','Cutesy','Blush, butter and powder blue in soft, rounded shapes. Add one darker anchor.',['#f4b6c2','#f6e2a1','#c7d6ea','#ffffff'],[213,152,32]],
  ['quirky','Quirky','Primary colours and sculptural shapes. Let one wild piece lead each room.',['#d62839','#f6d55c','#1d4ed8','#3f6b3a'],[147,156,233]]].map(([k,t,d,c,ids])=>`<div class="claim rv" style="background:var(--${k.slice(0,3)})"><div class="arr" style="height:150px">${arrange(ids,96,40)}</div><h3 class="disp" style="font-size:34px">${t}</h3><p>${d}</p><div style="display:flex;gap:6px;margin:14px 0">${c.map(x=>`<span title="${cname(x)}" style="width:28px;height:28px;border-radius:50%;background:${x};box-shadow:0 0 0 2px #fff"></span>`).join('')}</div><button class="btn sm dark" data-guide="${k}">Shop ${t.toLowerCase()}</button></div>`).join('')}</div></div>
 <div class="modal" id="imodal" role="dialog" aria-modal="true" aria-label="Room details"><div class="mbox" id="mbox"></div></div><div style="height:100px"></div>`}
function inspoAfter(){
 $$('[data-guide]').forEach(b=>b.onclick=()=>{Object.assign(SH,{style:b.dataset.guide,room:'',cat:'',need:'',price:'',q:''});location.hash='shop'});
 $$('.ptabs a').forEach(a=>a.onclick=e=>{e.preventDefault();$(a.getAttribute('href'))?.scrollIntoView({behavior:'smooth'})});
 const M=$('#imodal');let last=null;
 const open=i=>{const [n,t,v,h]=INSPO[i];const ids=h.map(x=>x[2]);const full=ids.reduce((a,id)=>a+BY[id].price.m12,0),pr=Math.round(full*(ids.length>=5?.85:ids.length>=3?.9:1));
  $('#mbox').innerHTML=`<button class="iconbtn close" id="mclose2" aria-label="Close">✕</button>
   <div class="mimg"><img src="img/x/r${n}.webp" alt="${esc(t)}">${h.map(([x,y],k)=>`<button class="hot" style="left:${x}%;top:${y}%" data-h="${k}" aria-label="${esc(BY[h[k][2]].name)}">${k+1}</button>`).join('')}</div>
   <div class="mlist"><span class="eyebrow">${v}</span><h2 style="font-size:44px">${esc(t)}</h2><p class="muted small">Closest matches from the ABODE range.</p>
    <div style="margin:16px 0">${h.map(([,,id],k)=>{const p=BY[id];return `<a class="mitem" href="#p-${id}" data-mi="${k}"><span class="n">${k+1}</span><img src="${W(id)}" alt=""><span style="flex:1"><b>${esc(p.name)}</b><br><span class="small muted">${esc(p.catName)} · ${inr(p.price.m12)}/mo</span></span><button class="qa" data-qa="${id}" aria-label="Add ${esc(p.name)}">+</button></a>`}).join('')}</div>
    <div class="card soft"><div class="tot"><span>All ${ids.length} pieces</span><span>${pr<full?`<span class="strike">${inr(full)}</span> `:''}<b>${inr(pr)}/mo</b></span></div>${pr<full?`<span class="save">Save ${inr(full-pr)} every month</span>`:''}<button class="btn full" id="rentlook" style="margin-top:12px" data-img="${W(ids[0])}">Rent the whole look</button></div></div>`;
  M.classList.add('open');document.body.style.overflow='hidden';$('#mclose2').focus();
  const hi=k=>{$$('.hot').forEach(x=>x.classList.toggle('on',x.dataset.h==k));$$('.mitem').forEach(x=>x.classList.toggle('on',x.dataset.mi==k))};
  $$('.hot').forEach(b=>{b.onclick=()=>{hi(b.dataset.h);$(`.mitem[data-mi="${b.dataset.h}"]`).scrollIntoView({block:'nearest',behavior:'smooth'})};b.onmouseenter=()=>hi(b.dataset.h)});
  $$('.mitem').forEach(a=>a.onmouseenter=()=>hi(a.dataset.mi));
  $$('.mitem .qa').forEach(b=>b.addEventListener('click',e=>{e.preventDefault()},true));
  $('#mclose2').onclick=close;
  $('#rentlook').onclick=e=>{const d=ids.length>=5?15:ids.length>=3?10:0;ids.forEach((id,k)=>addLine({kind:'p',id,plan:12,mode:'rent',color:BY[id].colors[0],disc:d},k?null:e.currentTarget))};
  $$('.mitem').forEach(a=>a.addEventListener('click',e=>{if(!e.target.closest('.qa'))close(true)}))};
 const close=(nav)=>{M.classList.remove('open');document.body.style.overflow='';if(last&&nav!==true)last.focus()};
 $$('[data-room]').forEach(b=>b.onclick=()=>{last=b;open(+b.dataset.room)});
 M.onclick=e=>{if(e.target===M)close()};
 document.onkeydown=e=>{if(e.key==='Escape'&&M.classList.contains('open'))close()};
}
/* ---------------- HOW IT WORKS ---------------- */
function vHow(){const s=BY[209];return `<div class="wrap"><div class="crumbs"><a href="#home">Home</a> / How it works</div><h1 style="font-size:clamp(44px,5vw,72px)">How it works</h1><p class="lede">Renting furniture, made simple.</p>
 <div class="feats" style="margin:40px 0 90px">${[['spark','Choose','Shop by room or vibe. Rent, deposit and delivery are shown upfront.'],['cal','Pick a plan','3, 6 or 12 months. Decor can also be bought.'],['truck','We set it up','Delivered and assembled in 72 hours.'],['swap','Live, swap, move','Free swap every 6 months, free move once a year.']].map(([i,h,t])=>`<div class="feat rv"><div class="ic">${IC[i]}</div><h3>${h}</h3><p>${t}</p></div>`).join('')}</div>
 <h2 style="margin-bottom:28px">Plans</h2><div class="scroll"><table><thead><tr><th>Plan</th><th>Best for</th><th>Example: ${esc(s.name)}</th><th>Perks</th></tr></thead><tbody>
 <tr><td><b>3 months</b></td><td>Internships, short stays</td><td>${inr(s.price.m3)}/mo</td><td>Lowest commitment</td></tr>
 <tr><td><b>6 months</b></td><td>A semester</td><td>${inr(s.price.m6)}/mo</td><td>One free swap</td></tr>
 <tr><td><b>12 months</b></td><td>A full lease</td><td>${inr(s.price.m12)}/mo</td><td>Two free swaps + a free move</td></tr></tbody></table></div>
 <div class="claims" style="margin:90px 0">
  <div class="claim"><h3>Deposits</h3><p>About one month's rent on furniture, none on decor. Back in 7 working days, or we add ₹100 a day.</p></div>
  <div class="claim"><h3>Abode Care (optional)</h3><p>₹49/mo covers accidental stains and scratches up to ₹5,000. Never pre-selected.</p></div>
  <div class="claim"><h3>Moving out</h3><p>One free move a year in your city. Leaving? Book a pickup with 7 days' notice.</p></div></div>
 <h2 style="margin-bottom:20px">FAQs</h2>${faq(FAQ.slice(0,5))}<div style="height:100px"></div></div>`}
/* ---------------- ABOUT ---------------- */
const FOUNDERS=[['Asmi','Chief Vibe Officer','Has moved flats four times in three years. Decides if a sofa has energy.','f0','var(--cut)'],['Chanchal','Head of Couch Research','Has sat on more sofas than anyone you know. Believes every room needs one weird lamp.','f2','var(--qui)'],['Jia','Director of Cute','Curates our cutesy range. Defends the strawberry rug at every meeting.','f3','#fff3c4'],['Mahi','Minister of Measurements','Measures every doorway twice, so your sofa actually fits.','f1','#e4f1dc']];
function vAbout(){return `<section class="hero"><div class="wrap"><span class="eyebrow rv">Our story</span><h1 class="rv">Four students. Too many flats. <span class="red">Zero fun furniture.</span></h1>
 <p class="lede rv">We've moved more times than we've changed our phone wallpapers. Rental sites gave us the same grey sofa. Buying the fun stuff wasn't an option on a student budget. So we built ABODE: rented furniture that actually looks like you.</p></div></section>
 <section class="band soft"><div class="wrap"><div class="center" style="margin-bottom:50px"><h2 class="rv">Meet the founders</h2></div><div class="fgrid4">${FOUNDERS.map(([n,r,b,img],i)=>`<div class="fcard rv"><div class="ftile" style="--c:${['#96baec','#f3a993','#f6bcc3','#b8d1f5'][i]}"><img src="img/x/${img}.webp" alt="${n}"></div><b>${n}</b><span class="frole" style="--t:${[-3,2,-2,3][i]}deg">${r}</span><p>${b}</p></div>`).join('')}</div></div></section>
 <section class="band"><div class="wrap"><div class="center" style="margin-bottom:40px"><h2 class="rv">Why we started</h2></div><div class="claims">
  <div class="claim rv"><h3>Rented felt rented</h3><p>Rental furniture in India works, but it all looks the same.</p></div>
  <div class="claim rv"><h3>Buying didn't add up</h3><p>A sofa, bed and wardrobe cost more than a year of renting them, plus moving.</p></div>
  <div class="claim rv"><h3>Taste changes</h3><p>Minimal at 21, cat sofa at 22. Swaps let your space change with you.</p></div></div></div></section>
 <section class="band soft"><div class="wrap"><div class="feats">${[['188','Pieces, three vibes'],['72 hrs','Order to set-up'],['9','Room bundles'],['5','Cities at launch']].map(([n,l])=>`<div class="feat rv center" style="background:#fff"><div class="disp red" style="font-size:56px">${n}</div><p style="margin-top:8px">${l}</p></div>`).join('')}</div>
 <div class="card" style="margin-top:24px;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;background:#fff;border:0"><div><h3>Email</h3><p class="muted">hello@abode.rent</p></div><div><h3>Call or WhatsApp</h3><p class="muted">+91 80 4718 2026</p></div><div><h3>Visit</h3><p class="muted">Kala Ghoda Studios, Fort, Mumbai</p></div><div><h3>Instagram</h3><p class="muted">@abode.rent</p></div></div><p class="concept">Student concept. Contact details are illustrative.</p></div></section>`}
/* ---------------- HELP ---------------- */
const FAQ=[
 ['Which cities do you deliver to?','Mumbai, Navi Mumbai, Pune, Bengaluru, Hyderabad and Delhi NCR. Pop your pincode on any product page to check.'],
 ['How long is the minimum rental?','3 months. You can extend any time from My Abode at the same monthly rent.'],
 ['What does the deposit cover, and when do I get it back?','It covers damage beyond normal wear. It is usually about one month\'s rent for furniture and zero for decor, refunded within 7 working days of pickup. If we are late, we add ₹100 per day.'],
 ['Is the furniture new?','Every piece is either new or Abode Fresh: professionally deep-cleaned, sanitised and checked on 32 points before it reaches you. If anything arrives flawed, we replace it within 48 hours.'],
 ['What is a style swap?','Every 6 months you can swap up to 3 pieces for new ones of the same rent or less, free. Extra swaps cost ₹299.'],
 ['Can I buy instead of renting?','Decor pieces (mirrors, vases, rugs, lamps, bean bags and swings) can be bought outright. Furniture is rent-only for now.'],
 ['Do you offer cash on delivery?','Yes. Pay your first month and deposit by cash or UPI once our crew finishes setup. No extra fee.'],
 ['What if something breaks?','Normal wear and tear and manufacturing faults are always on us. Accidental damage is covered up to ₹5,000 if you add Abode Care (₹49/mo). Without it, we charge only documented repair costs.'],
 ['Can I cancel?','Before dispatch: full refund, no questions. After setup: you can close early by paying one month\'s rent as a closure fee.'],
 ['Do you charge for delivery?','Delivery and setup are free on carts of ₹800/mo or more. Below that, it is a flat ₹299, shown in your cart before checkout.'],
];
function faq(L){return L.map(([q,a])=>`<details><summary>${esc(q)}</summary><div class="muted">${esc(a)}</div></details>`).join('')}
function vHelp(){return `<div class="wrap"><div class="crumbs"><a href="#home">Home</a> / Help</div><h1 style="font-size:clamp(44px,5vw,72px)">Help</h1><p class="lede">Answers to the usual questions.</p>
 <div class="cartpage" style="margin-top:20px"><div>${faq(FAQ)}
  <h2 id="help-delivery" style="font-size:40px;margin:60px 0 16px">Delivery &amp; setup</h2><div class="card"><p>We deliver within 72 hours of order confirmation in our cities. Our two-person crew carries everything in, assembles it, places it where you want and takes away all packaging. Need a lift-less 4th-floor walk-up? No extra charge, we just plan an extra pair of hands.</p></div>
  <h2 id="help-policies" style="font-size:40px;margin:60px 0 16px">Rental terms, deposit &amp; damage</h2><div class="card"><ul><li><b>Minimum tenure:</b> 3 months; plans of 3, 6 and 12 months.</li><li><b>Rent:</b> billed monthly in advance; autopay optional.</li><li><b>Deposit:</b> refundable, shown on every product page, returned within 7 working days of pickup.</li><li><b>Early closure:</b> one month's rent.</li><li><b>Style swap:</b> one free swap every 6 months (up to 3 pieces).</li><li><b>Relocation:</b> one free relocation within the city per year.</li><li><b>Abode Care:</b> optional ₹49/mo, covers accidental damage up to ₹5,000.</li><li><b>Fees we never charge:</b> platform fees, packaging fees or surprise "convenience" fees.</li></ul></div></div>
 <div class="card soft" style="position:sticky;top:90px"><h3>Still stuck?</h3><p class="muted">Send us a note and a human replies within 2 hours (10am–8pm).</p><form id="hform"><div class="field" id="f-hn"><label for="hn">Name</label><input id="hn"><span class="em">Please add your name.</span></div><div class="field" id="f-hm"><label for="hm">Your question</label><textarea id="hm"></textarea><span class="em">Tell us a little more so we can help.</span></div><button class="btn full">Send</button></form><p class="small" id="hmsg" style="margin-top:10px"></p><p class="small muted">Or write to hello@abode.rent</p></div></div><div style="height:60px"></div></div>`}
function helpAfter(){$('#hform').onsubmit=e=>{e.preventDefault();const a=$('#hn').value.trim().length<2,b=$('#hm').value.trim().length<5;$('#f-hn').classList.toggle('err',a);$('#f-hm').classList.toggle('err',b);if(!a&&!b){$('#hmsg').textContent='Got it! (Prototype note: messages are not actually sent.)';e.target.reset()}};
 const h=location.hash.slice(1);if(h.startsWith('help-'))setTimeout(()=>$('#'+h)?.scrollIntoView({behavior:'smooth'}),60)}
function v404(){return `<div class="wrap band"><div class="empty"><div style="display:grid;place-items:center">${DOOD.house(110)}</div><div class="disp">Page not found</div><p class="muted">This room doesn't exist yet.</p><a class="btn" href="#home">Take me home</a></div></div>`}
