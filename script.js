// Animace sekcí při scrollu
(function(){
  const sections=document.querySelectorAll('main section');
  const observer=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.style.transform='translateY(0)';
        e.target.style.opacity=1;
      }
    });
  },{threshold:0.08});
  sections.forEach(s=>{
    s.style.opacity=0;
    s.style.transform='translateY(18px)';
    s.style.transition='opacity .7s ease, transform .7s ease';
    observer.observe(s);
  });
})();

// Horní slideshow
(function(){
  const slidesEl=document.getElementById('slides');
  const slides=Array.from(slidesEl.children);
  const total=slides.length;
  let i=0,timeout=null;
  const dots=document.getElementById('dots');
  slides.forEach((_,idx)=>{
    const b=document.createElement('button');
    b.className='dot-btn';
    b.onclick=()=>{goTo(idx);reset();};
    dots.appendChild(b);
  });
  const dotBtns=Array.from(dots.children);
  function update(){
    slidesEl.style.transform=`translateX(-${i*100}%)`;
    dotBtns.forEach((b,idx)=>b.classList.toggle('active',idx===i));
  }
  function goTo(idx){i=(idx+total)%total;update();}
  function next(){goTo(i+1);}
  function reset(){clearInterval(timeout);timeout=setInterval(next,4200);}
  document.getElementById('next').onclick=()=>{next();reset();};
  document.getElementById('prev').onclick=()=>{goTo(i-1);reset();};
  update();reset();
})();

// Spodní 3D slideshow (vozový park)
(function(){
  const track=document.getElementById('wc-track');
  const prev=document.getElementById('wc-prev');
  const next=document.getElementById('wc-next');
  if(!track)return;
  const items=Array.from(track.children);
  let idx=2;
  function clamp(i){return (i+items.length)%items.length;}
  function render(){
    items.forEach(it=>it.className='wc-item');
    const p2=clamp(idx-2),p1=clamp(idx-1),a=clamp(idx),n1=clamp(idx+1),n2=clamp(idx+2);
    items[p2].classList.add('prev2');
    items[p1].classList.add('prev1');
    items[a].classList.add('active');
    items[n1].classList.add('next1');
    items[n2].classList.add('next2');
  }
  function go(d){idx=clamp(idx+d);render();}
  prev.onclick=()=>go(-1);
  next.onclick=()=>go(1);
  render();
  setInterval(()=>go(1),4000);
})();

// Tmavý režim
(function(){
  const btn=document.getElementById('darkToggle');
  if(!btn)return;
  const saved=localStorage.getItem('deniska-dark');
  if(saved==='1')document.body.classList.add('dark');
  function refresh(){
    const isDark=document.body.classList.contains('dark');
    btn.textContent=isDark?'☀️':'🌙';
  }
  refresh();
  btn.onclick=()=>{
    document.body.classList.toggle('dark');
    localStorage.setItem('deniska-dark',document.body.classList.contains('dark')?'1':'0');
    refresh();
  };
})();

// Přepínač jazyků
(function(){
  const langBtn = document.getElementById('langToggle');
  const supportedLangs = ['cs', 'en']; // můžeš přidat např. 'de', 'fr'
  let current = localStorage.getItem('deniska-lang') || 'cs';

  function switchLang() {
      const nextIndex = (supportedLangs.indexOf(current) + 1) % supportedLangs.length;
    current = supportedLangs[nextIndex];
    localStorage.setItem('deniska-lang', current);
    applyLang();
  }

  function applyLang() {
    if (current === 'en') {
      document.documentElement.lang = 'en';
      langBtn.textContent = '🇬🇧';
          translateToEnglish();
    } else {
      document.documentElement.lang = 'cs';
      langBtn.textContent = '🌐';
          translateToCzech();
    }
  }

  function translateToEnglish() {
    document.querySelector('h1').textContent = 'Deniska Transport — Professional Passenger and Transfer Services';
    document.querySelector('h2').textContent = 'Contact & Reservations';
    // 👉 přidej další texty podle potřeby
  }

  function translateToCzech() {
    document.querySelector('h1').textContent = 'Autodoprava Deniska — profesionální přeprava osob a transfery';
    document.querySelector('h2').textContent = 'Kontakt & rezervace';
  }

  langBtn.addEventListener('click', switchLang);
  applyLang();
})();

// --- Language Switcher ---
(function () {
  const langBtn = document.getElementById("langToggle");
  if (!langBtn) return;

  // Překladová data
  const translations = {
    en: {
      "Autodoprava Deniska — profesionální přeprava osob a transfery":
        "Deniska Transport — professional passenger transport and transfers",
      "Diskrétní a spolehlivé služby přepravy: transfery na letiště, osobní přepravy mezi městy, pronájem vozidla s řidičem pro svatby a oslavy nebo přeprava menšího nákladu. Moderní vozový park a zkušený řidič — komfort, bezpečí a přesnost.":
        "Discreet and reliable transport services: airport transfers, intercity travel, car rental with driver for weddings and events, or small cargo transport. Modern fleet and experienced driver — comfort, safety and precision.",
      "Objednat transfer": "Book transfer",
      "Zobrazit ceník": "View price list",
      "Rychlá hotline": "Quick hotline",
      "Naše služby": "Our Services",
      "Komplexní nabídka přepravy přizpůsobená vašim požadavkům — od jednoduchých transferů po dlouhodobé pronájmy s řidičem.":
        "Comprehensive transport services tailored to your needs — from simple transfers to long-term rentals with driver.",
      "Transfery mezi městy": "Intercity Transfers",
      "Přímé spoje bez přestupů: pohodlí, bezpečí a přesný odhad času příjezdu.":
        "Direct routes without transfers: comfort, safety, and accurate arrival times.",
      "Transfery na letiště": "Airport Transfers",
      "Načasování dle vašeho letu, pomoc s zavazadly a profesionální chování řidiče.":
        "Timed to your flight, assistance with luggage, and professional driver conduct.",
      "Svatební a společenské události": "Weddings and Events",
      "Elegantní vozy s řidičem pro svatby, oslavy a VIP dopravu.":
        "Elegant vehicles with driver for weddings, celebrations and VIP transport.",
      "Malý náklad": "Small Cargo",
      "Možnost převozu menšího nákladu v rámci služeb – bezpečně a diskrétně.":
        "Possibility of transporting small cargo – safely and discreetly.",
      "Ceník (orientační)": "Price List (indicative)",
      "Níže uvedené ceny jsou reprezentativním příkladem. Ceny jsou smluvní a mohou se lišit podle konkrétní objednávky. Všechny ceny jsou uvedeny bez DPH.":
        "Prices below are representative examples. Prices are contractual and may vary depending on the specific booking. All prices exclude VAT.",
      "Osobní vůz: Škoda Kodiaq (max 4 osoby)":
        "Passenger car: Škoda Kodiaq (max 4 persons)",
      "Minivan: Mercedes třídy V (max 6 osob)":
        "Minivan: Mercedes V-Class (max 6 persons)",
      "Pronájem vozidla s řidičem (svatby, oslavy)":
        "Vehicle rental with driver (weddings, events)",
      "Základní sazba": "Base rate",
      "V ceně zahrnuto": "Included",
      "paušál 50 km za každou započatou hodinu":
        "flat 50 km for each started hour",
      "Čekání": "Waiting time",
      "Každá další započatá hodina": "Each additional started hour",
      "Ceny zahrnují poplatky za parkování a případné vjezdy na letiště.":
        "Prices include parking and potential airport access fees.",
      "Vozový park": "Fleet",
      "Pečlivě udržované vozy od standardních osobních až po minivany pro skupiny. Všechny vozy jsou pojištěné a pravidelně kontrolované.":
        "Well-maintained vehicles from standard cars to minivans for groups. All vehicles are insured and regularly serviced.",
      "Kontakt & rezervace": "Contact & Reservations",
      "Pro rezervace a cenovou nabídku nám zavolejte nebo napište. Preferujeme přímou domluvu pro upřesnění trasy, počtu osob a časů.":
        "For booking or price quote, call or email us. We prefer direct communication to specify route, number of passengers and times.",
      "Odeslat": "Send",
      "Jméno a příjmení": "Full name",
      "Telefon": "Phone",
      "Zpráva / požadavek": "Message / request",
      "Rezervace": "Booking",
      "Ceník": "Price list",
      "Služby": "Services",
      "Kontakt": "Contact",
      "Brno – Bratislava": "Brno – Bratislava",
      "Brno – Vídeň": "Brno – Vienna",
      "Brno – Praha": "Brno – Prague",
      "Kč": "CZK",
    },
  };

  let currentLang = localStorage.getItem("lang") || "cs";
  function translatePage(lang) {
    const dict = translations[lang];
    if (!dict) return;

    // textové uzly
    document.querySelectorAll("h1,h2,h3,h4,p,strong,button,a,div,span,label,textarea,input,li").forEach(el => {
      const original = el.textContent.trim();
      if (dict[original]) el.textContent = dict[original];
    });

    // placeholdery
    document.querySelectorAll("input[placeholder],textarea[placeholder]").forEach(el => {
      const ph = el.getAttribute("placeholder");
      if (dict[ph]) el.setAttribute("placeholder", dict[ph]);
    });

    // Změna měny
    if (lang === "en") {
      document.querySelectorAll('.price-row strong[data-translate^="pricing_price"]').forEach(el => {
        const originalText = el.textContent;
        el.textContent = originalText.replace(/Kč/g, "CZK");
      });
    } else if (lang === "cs") {
      document.querySelectorAll('.price-row strong[data-translate^="pricing_price"]').forEach(el => {
        const originalText = el.textContent;
        el.textContent = originalText.replace(/CZK/g, "Kč");
      });
    }
  }

  function toggleLang() {
    currentLang = currentLang === "cs" ? "en" : "cs";
    localStorage.setItem("lang", currentLang);
    langBtn.textContent = currentLang === "cs" ? "🌐" : "🇨🇿";
    translatePage(currentLang);
  }
  langBtn.addEventListener("click", toggleLang);
  // Inicializace
  if (currentLang !== "cs") translatePage(currentLang);
})();

/* ==== Překlad + měna (finální stabilní verze) ==== */
(function(){
  const oldBtn = document.getElementById('langToggle');
  if (!oldBtn) return;

  const btn = oldBtn.cloneNode(true);
  oldBtn.parentNode.replaceChild(btn, oldBtn);

  const LANG_KEY = 'deniska-lang';
  let current = localStorage.getItem(LANG_KEY) || 'cs';
  const html = document.documentElement;

  const dict = {
    en: {
      "Autodoprava Deniska — profesionální přeprava osob a transfery":"Deniska Transport — professional passenger transport and transfers",
      "Diskrétní a spolehlivé služby přepravy: transfery na letiště, osobní přepravy mezi městy, pronájem vozidla s řidičem pro svatby a oslavy nebo přeprava menšího nákladu. Moderní vozový park a zkušený řidič — komfort, bezpečí a přesnost.":"Discreet and reliable transport services: airport transfers, intercity travel, car rental with driver for weddings and events, or small cargo transport. Modern fleet and experienced driver — comfort, safety and precision.",
      "Objednat transfer":"Book transfer",
      "Zobrazit ceník":"View price list",
      "Rychlá hotline":"Quick hotline",
      "Naše služby":"Our Services",
      "Komplexní nabídka přepravy přizpůsobená vašim požadavkům — od jednoduchých transferů po dlouhodobé pronájmy s řidičem.":"Comprehensive transport services tailored to your needs — from simple transfers to long-term rentals with driver.",
      "Transfery mezi městy":"Intercity Transfers",
      "Přímé spoje bez přestupů: pohodlí, bezpečí a přesný odhad času příjezdu.":"Direct routes without transfers: comfort, safety, and accurate arrival times.",
      "Transfery na letiště":"Airport Transfers",
      "Načasování dle vašeho letu, pomoc s zavazadly a profesionální chování řidiče.":"Timed to your flight, assistance with luggage, and professional driver conduct.",
      "Svatební a společenské události":"Weddings and Events",
      "Elegantní vozy s řidičem pro svatby, oslavy a VIP dopravu.":"Elegant vehicles with driver for weddings, celebrations and VIP transport.",
      "Malý náklad":"Small Cargo",
      "Možnost převozu menšího nákladu v rámci služeb – bezpečně a diskrétně.":"Possibility of transporting small cargo – safely and discreetly.",
      "Ceník (orientační)":"Price List (indicative)",
      "Níže uvedené ceny jsou reprezentativním příkladem. Ceny jsou smluvní a mohou se lišit podle konkrétní objednávky. Všechny ceny jsou uvedeny bez DPH.":"Prices below are representative examples. Prices are contractual and may vary depending on the specific booking. All prices exclude VAT.",
      "Osobní vůz: Škoda Kodiaq (max 4 osoby)":"Passenger car: Škoda Kodiaq (max 4 persons)",
      "Minivan: Mercedes třídy V (max 6 osob)":"Minivan: Mercedes V-Class (max 6 persons)",
      "Pronájem vozidla s řidičem (svatby, oslavy)":"Vehicle rental with driver (weddings, events)",
      "Základní sazba":"Base rate",
      "V ceně zahrnuto":"Included",
      "paušál 50 km za každou započatou hodinu":"flat 50 km for each started hour",
      "Čekání":"Waiting time",
      "Každá další započatá hodina":"Each additional started hour",
      "Ceny zahrnují poplatky za parkování a případné vjezdy na letiště.":"Prices include parking and potential airport access fees.",
      "Vozový park":"Fleet",
      "Pečlivě udržované vozy od standardních osobních až po minivany pro skupiny. Všechny vozy jsou pojištěné a pravidelně kontrolované.":"Well-maintained vehicles from standard cars to minivans for groups. All vehicles are insured and regularly serviced.",
      "Kontakt & rezervace":"Contact & Reservations",
      "Pro rezervace a cenovou nabídku nám zavolejte nebo napište. Preferujeme přímou domluvu pro upřesnění trasy, počtu osob a časů.":"For booking or price quote, call or email us. We prefer direct communication to specify route, number of passengers and times.",
      "Odeslat":"Send",
      "Jméno a příjmení":"Full name",
      "Telefon":"Phone",
      "Zpráva / požadavek":"Message / request",
      "Rezervace":"Booking",
      "Ceník":"Price list",
      "Služby":"Services",
      "Kontakt":"Contact",
      "Brno – Bratislava":"Brno – Bratislava",
      "Brno – Vídeň":"Brno – Vienna",
      "Brno – Praha":"Brno – Prague",
      "© Autodoprava Deniska — Všechna práva vyhrazena":"© Deniska Transport — All rights reserved",
      "IČO: 09235787 • DIČ: CZ7409214065 • Ceny jsou smluvní, tento ceník je orientační.":"Company ID: 09235787 • VAT ID: CZ7409214065 • Prices are contractual; this pricelist is indicative."
    },
    placeholders: {
      en: {
        "Jméno a příjmení":"Full name",
        "Telefon":"Phone",
        "Email":"Email",
        "Zpráva / požadavek":"Message / request"
      }
    },
    currency: { cs:"Kč", en:"CZK" }
  };

  function saveOriginals(){
    document.querySelectorAll('h1,h2,h3,h4,p,li,button,a,strong,span,div').forEach(el=>{
      if(el.children && el.children.length>0) return;
      if(!el.dataset.orig) el.dataset.orig = el.textContent;
    });
    document.querySelectorAll('input[placeholder],textarea[placeholder]').forEach(el=>{
      if(!el.dataset.origPh) el.dataset.origPh = el.getAttribute('placeholder')||'';
    });
  }

  function translate(lang){
    const t = dict[lang]||{};
    const ph = (dict.placeholders||{})[lang]||{};
    document.querySelectorAll('h1,h2,h3,h4,p,li,button,a,strong,span,div').forEach(el=>{
      if(el.children && el.children.length>0) return;
      const orig = el.dataset.orig || el.textContent;
      if(lang==='cs'){ el.textContent = el.dataset.orig; }
      else if(t[orig]) el.textContent = t[orig];
    });
    document.querySelectorAll('input[placeholder],textarea[placeholder]').forEach(el=>{
      const orig = el.dataset.origPh || el.getAttribute('placeholder')||'';
      if(lang==='cs') el.setAttribute('placeholder',orig);
      else if(ph[orig]) el.setAttribute('placeholder',ph[orig]);
    });
    replaceCurrency(lang);
  }

  function replaceCurrency(lang){
    const from = lang==='en'?dict.currency.cs:dict.currency.en;
    const to   = lang==='en'?dict.currency.en:dict.currency.cs;
    document.querySelectorAll('p,div,strong,li,span').forEach(el=>{
      if(el.children && el.children.length>0) return;
      el.textContent = el.textContent.replace(new RegExp(`\\b${from}\\b`,'g'), to);
    });
  }

  function apply(lang){
    saveOriginals();
    translate(lang);
    html.lang = lang;
    btn.textContent = (lang==='cs'?'EN':'CZ');
    localStorage.setItem(LANG_KEY, lang);
  }

  btn.addEventListener('click',()=>{
    current = (current==='cs'?'en':'cs');
    apply(current);
  });

  apply(current);
})();

// --- Jednoduchá výměna měny Kč ↔ CZK bez šahání na formuláře/atributy ---
(function () {
  // Nahradí měnu v textových uzlech podle <html lang="...">
  function swapCurrencyByLang() {
    const lang = (document.documentElement.lang || 'cs').toLowerCase();
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

    // povolíme různé mezery před měnou (NBSP, narrow NBSP, obyčejná)
    const SPACE = "[\\u00A0\\u202F\\s]*";
    const reKc  = new RegExp(SPACE + "Kč(?![\\w])", "g");   // …Kč
    const reCzk = new RegExp(SPACE + "CZK(?![\\w])", "g");  // …CZK

    let node;
    while ((node = walker.nextNode())) {
      // přeskočit prázdné/jen whitespace
      if (!node.nodeValue || !node.nodeValue.trim()) continue;

      // neřešíme text v script/style (TreeWalker je do nich nepustí), ani v contenteditable — tam šahat nechceme
      if (node.parentElement && node.parentElement.isContentEditable) continue;

      let t = node.nodeValue;

      if (lang === "en") {
        if (reKc.test(t)) t = t.replace(reKc, " CZK");
      } else {
        if (reCzk.test(t)) t = t.replace(reCzk, " Kč");
      }

      // sjednocení vícenásobných mezer
      t = t.replace(/[\u00A0\u202F]/g, " ").replace(/\s{2,}/g, " ");

      if (t !== node.nodeValue) node.nodeValue = t;
    }
  }

  // Spustit po načtení
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", swapCurrencyByLang);
  } else {
    swapCurrencyByLang();
  }

  // Navázat na tvoje tlačítko přepínače jazyka (pokud existuje)
  const langBtn = document.getElementById("langToggle");
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      // počkáme, až doběhne tvůj překlad, pak vyměníme měnu
      setTimeout(swapCurrencyByLang, 0);
    });
  }
})();

