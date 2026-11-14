/* Kâşifin Atlası — etkileşim. Bağımlılık: GSAP + ScrollTrigger (yalnız Yöntem paftası için, yoksa da çalışır). */
(() => {
  'use strict';
  const doc = document.documentElement;
  const azHareket = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ---------------- Dil ---------------- */
  const sozlukEl = $('#sozluk');
  const S = sozlukEl ? JSON.parse(sozlukEl.textContent) : { t: {}, h: {} };
  const DILLER = ['tr', 'en'];
  let dil = doc.lang === 'en' ? 'en' : 'tr';

  function hrefCoz(anahtar, i) {
    const [k, hash] = anahtar.split('#');
    const yol = S.h[k] ? S.h[k][i] : null;
    return yol ? yol + (hash ? '#' + hash : '') : null;
  }

  function dilUygula(yeni, adresiGuncelle) {
    if (!DILLER.includes(yeni)) return;
    const i = DILLER.indexOf(yeni);
    $$('[data-i18n]').forEach(el => { const v = S.t[el.dataset.i18n]; if (v) el.textContent = v[i]; });
    $$('[data-i18n-html]').forEach(el => { const v = S.t[el.dataset.i18nHtml]; if (v) el.innerHTML = v[i]; });
    $$('[data-i18n-attr]').forEach(el => {
      el.dataset.i18nAttr.split(';').forEach(cift => {
        const [ad, k] = cift.split(':');
        const v = S.t[k];
        if (v) el.setAttribute(ad, v[i]);
      });
    });
    $$('[data-i18n-href]').forEach(el => { const y = hrefCoz(el.dataset.i18nHref, i); if (y) el.setAttribute('href', y); });
    $$('.dil button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.dil === yeni)));
    doc.lang = yeni;
    const sayfa = doc.dataset.sayfa;
    if (sayfa && S.t['meta.' + sayfa + '.t']) {
      document.title = S.t['meta.' + sayfa + '.t'][i];
      const md = $('meta[name="description"]');
      if (md) md.setAttribute('content', S.t['meta.' + sayfa + '.d'][i]);
    }
    if (adresiGuncelle && doc.dataset[yeni] && sayfa !== '404') {
      const hedef = doc.dataset[yeni] + location.hash;
      if (hedef !== location.pathname + location.hash) history.replaceState(null, '', hedef);
    }
    dil = yeni;
    try { localStorage.setItem('dil', yeni); } catch (e) { /* özel pencere */ }
  }

  $$('.dil button').forEach(b => b.addEventListener('click', () => {
    if (b.dataset.dil !== dil) dilUygula(b.dataset.dil, true);
  }));
  try {
    const kayitli = localStorage.getItem('dil');
    if (kayitli && kayitli !== dil && DILLER.includes(kayitli)) dilUygula(kayitli, true);
  } catch (e) { /* yok say */ }

  /* ---------------- Canlı saat (Europe/Istanbul) ---------------- */
  const saatBicim = new Intl.DateTimeFormat('tr-TR', { timeZone: 'Europe/Istanbul', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  const saatler = $$('[data-saat]');
  function saatYaz() {
    const s = saatBicim.format(new Date());
    saatler.forEach(el => { el.textContent = (el.dataset.saat === 'kisa' || azHareket ? s.slice(0, 5) : s) + ' TRT'; });
  }
  if (saatler.length) { saatYaz(); setInterval(saatYaz, azHareket ? 30000 : 1000); }

  /* ---------------- İmleç koordinatı (hero) ---------------- */
  const imlec = $('[data-imlec]');
  const sahne = $('.hero-sahne');
  if (imlec && sahne && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let bekliyor = false, sx = 0, sy = 0;
    sahne.addEventListener('pointermove', e => {
      const r = sahne.getBoundingClientRect();
      sx = Math.max(0, Math.round(e.clientX - r.left)); sy = Math.max(0, Math.round(e.clientY - r.top));
      if (!bekliyor) {
        bekliyor = true;
        requestAnimationFrame(() => { imlec.textContent = `X ${String(sx).padStart(4, '0')} · Y ${String(sy).padStart(4, '0')}`; bekliyor = false; });
      }
    }, { passive: true });
  }

  /* ---------------- Üst bar: küçülme + etkin bölüm ---------------- */
  const ust = $('#ust');
  if (ust) {
    const isaret = document.createElement('div');
    isaret.style.cssText = 'position:absolute;top:48px;left:0;width:1px;height:1px;pointer-events:none';
    document.body.prepend(isaret);
    new IntersectionObserver(([g]) => ust.classList.toggle('kucuk', !g.isIntersecting)).observe(isaret);
  }
  const navBag = $$('.hap a[data-hedef]');
  if (navBag.length && $('#isler')) {
    const bolumler = navBag.map(a => document.getElementById(a.dataset.hedef)).filter(Boolean);
    const io = new IntersectionObserver(girdiler => {
      girdiler.forEach(g => {
        if (g.isIntersecting) navBag.forEach(a => a.setAttribute('aria-current', String(a.dataset.hedef === g.target.id)));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    bolumler.forEach(b => io.observe(b));
  }

  /* ---------------- Mobil menü ---------------- */
  const menu = $('#mobil-menu');
  const menuAc = $('.menu-ac');
  if (menu && menuAc && typeof menu.showModal === 'function') {
    let hedef = null;
    menuAc.addEventListener('click', () => { menu.showModal(); menuAc.setAttribute('aria-expanded', 'true'); });
    menu.addEventListener('close', () => {
      menuAc.setAttribute('aria-expanded', 'false');
      if (hedef) { hedef.tabIndex = -1; hedef.focus({ preventScroll: true }); hedef = null; } else menuAc.focus();
    });
    $$('a[data-kapat]', menu).forEach(a => a.addEventListener('click', () => {
      hedef = a.pathname === location.pathname && a.hash ? document.getElementById(a.hash.slice(1)) : null;
    }));
    $$('[data-kapat]', menu).forEach(el => el.addEventListener('click', () => menu.close()));
    menu.addEventListener('click', e => { if (e.target === menu) menu.close(); });
  }

  /* ---------------- E-posta kopyala ---------------- */
  $$('[data-kopyala]').forEach(b => b.addEventListener('click', async () => {
    const yazi = $('.kopyala-yazi', b);
    const durum = $('#kopyala-durum');
    const i = DILLER.indexOf(dil);
    try {
      await navigator.clipboard.writeText(b.dataset.kopyala);
      if (yazi) yazi.textContent = S.t['il.kopyalandi'][i];
      if (durum) durum.textContent = S.t['il.kopyalandi'][i];
      setTimeout(() => { if (yazi) yazi.textContent = S.t['il.kopyala'][DILLER.indexOf(dil)]; }, 2200);
    } catch (e) {
      window.location.href = 'mailto:' + b.dataset.kopyala;
    }
  }));

  /* ---------------- Dither (Atkinson, iki renk) ---------------- */
  const KOBALT = [0x24, 0x33, 0xD6], KAGIT = [0xF4, 0xEF, 0xE4];
  const yardimci = document.createElement('canvas');
  const yctx = yardimci.getContext('2d', { willReadFrequently: true });

  function kapsamaKaynak(img, w, h) {
    const st = getComputedStyle(img);
    const nw = img.naturalWidth, nh = img.naturalHeight;
    if (st.objectFit !== 'cover') return [0, 0, nw, nh];
    const olcek = Math.max(w / nw, h / nh);
    const kw = w / olcek, kh = h / olcek;
    const [px, py] = st.objectPosition.split(' ').map(v => parseFloat(v) / 100);
    return [(nw - kw) * (isNaN(px) ? .5 : px), (nh - kh) * (isNaN(py) ? .5 : py), kw, kh];
  }

  function ditherCiz(canvas, img, hucre) {
    const r = img.getBoundingClientRect();
    const w = Math.max(1, Math.round(r.width / hucre)), h = Math.max(1, Math.round(r.height / hucre));
    yardimci.width = w; yardimci.height = h;
    const [sx, sy, sw, sh] = kapsamaKaynak(img, r.width, r.height);
    yctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
    const veri = yctx.getImageData(0, 0, w, h);
    const p = veri.data;
    const l = new Float32Array(w * h);
    for (let i = 0; i < w * h; i++) l[i] = Math.min(1, Math.max(0, (p[i * 4] - 36) / 208));
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = y * w + x;
        const eski = l[i];
        const yeni = eski < .5 ? 0 : 1;
        const hata = (eski - yeni) / 8;
        if (x + 1 < w) l[i + 1] += hata;
        if (x + 2 < w) l[i + 2] += hata;
        if (y + 1 < h) {
          if (x > 0) l[i + w - 1] += hata;
          l[i + w] += hata;
          if (x + 1 < w) l[i + w + 1] += hata;
        }
        if (y + 2 < h) l[i + 2 * w] += hata;
        const c = yeni ? KAGIT : KOBALT;
        p[i * 4] = c[0]; p[i * 4 + 1] = c[1]; p[i * 4 + 2] = c[2]; p[i * 4 + 3] = 255;
      }
    }
    canvas.width = w; canvas.height = h;
    canvas.getContext('2d').putImageData(veri, 0, 0);
  }

  function netles(img, hucreler, adim, bitince, hazirCanvas) {
    const kap = img.closest('[data-dither], .hero-sahne');
    if (!kap) { bitince && bitince(); return; }
    let canvas = hazirCanvas;
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.className = 'dither';
      canvas.setAttribute('aria-hidden', 'true');
      img.closest('picture').after(canvas);
    }
    let i = 0;
    const sonraki = () => {
      if (i < hucreler.length) {
        try { ditherCiz(canvas, img, hucreler[i]); } catch (e) { i = hucreler.length; }
        i++;
        setTimeout(sonraki, adim);
      } else {
        img.classList.remove('dither-bekliyor');
        canvas.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 220, easing: 'ease-out' }).onfinish = () => canvas.remove();
        bitince && bitince();
      }
    };
    sonraki();
  }

  function gorselHazir(img) {
    return new Promise(res => {
      if (img.complete && img.naturalWidth) res(); else { img.addEventListener('load', res, { once: true }); img.addEventListener('error', res, { once: true }); }
    }).then(() => (img.decode ? img.decode().catch(() => {}) : null));
  }

  /* ---------------- Hero açılışı ---------------- */
  function harfleriBol() {
    const h1 = $('.hero-ad');
    if (!h1 || azHareket) return;
    let n = 0;
    $$('.satir', h1).forEach(s => {
      const metin = s.textContent;
      s.textContent = '';
      for (const ch of metin) {
        const sp = document.createElement('span');
        sp.className = 'harf'; sp.setAttribute('aria-hidden', 'true');
        sp.style.setProperty('--h', n++);
        sp.textContent = ch;
        s.appendChild(sp);
      }
    });
  }

  // Görsel hemen boyanır (LCP); netleşme üstündeki krem perdede (HTML'de hazır canvas) oynar.
  const heroImg = $('.hero-gorsel');
  const perde = $('.hero-sahne canvas.perde');
  if (heroImg && !azHareket) {
    harfleriBol();
    gorselHazir(heroImg).then(() => {
      requestAnimationFrame(() => $('.hero-ad').classList.add('girdi'));
      netles(heroImg, [16, 10, 6, 3], 150, () => $$('.takimyildiz').forEach(s => s.classList.add('cizildi')), perde);
    });
  } else if (perde) {
    perde.hidden = true;
  }

  /* ---------------- Bölüm görselleri: dither'dan gravüre ---------------- */
  const figler = $$('[data-dither] img').filter(i => !i.classList.contains('hero-gorsel'));
  if (figler.length && !azHareket && 'IntersectionObserver' in window) {
    figler.forEach(i => i.classList.add('dither-bekliyor'));
    const io = new IntersectionObserver(girdiler => {
      girdiler.forEach(g => {
        if (!g.isIntersecting) return;
        io.unobserve(g.target);
        gorselHazir(g.target).then(() => netles(g.target, [12, 7, 4, 2], 120));
      });
    }, { threshold: .15 });
    figler.forEach(i => io.observe(i));
  }

  /* ---------------- Basit belirme ---------------- */
  const belirler = $$('.belir');
  if (belirler.length && !azHareket) {
    const io = new IntersectionObserver(g => g.forEach(x => { if (x.isIntersecting) { x.target.classList.add('gorundu'); io.unobserve(x.target); } }), { threshold: .2 });
    belirler.forEach(b => io.observe(b));
  } else belirler.forEach(b => b.classList.add('gorundu'));

  /* ---------------- Yöntem paftası (GSAP ScrollTrigger) ---------------- */
  window.addEventListener('load', () => {
    const harita = $('.yontem-harita');
    if (!harita || azHareket || !window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1280px)', () => {
      const maske = $('.yol-maske', harita);
      const yol = $('#yol', harita);
      const duraklar = [1, 2, 3, 4, 5].map(n => $('#durak-' + n, harita));
      const kartlar = $$('.adim', harita);
      const liderler = $$('.lider-yol', harita);
      if (!maske || !yol) return;
      // Durakların yol üzerindeki oranı
      const uzunluk = yol.getTotalLength();
      const oranlar = duraklar.map(d => {
        if (!d) return 0;
        const b = d.getBBox(); const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
        let en = 0, enK = Infinity;
        for (let s = 0; s <= 200; s++) {
          const pt = yol.getPointAtLength(uzunluk * s / 200);
          const k = (pt.x - cx) ** 2 + (pt.y - cy) ** 2;
          if (k < enK) { enK = k; en = s / 200; }
        }
        return en;
      });
      gsap.set(maske, { strokeDasharray: '1 1', strokeDashoffset: 1 });
      gsap.set(duraklar.filter(Boolean), { opacity: 0, transformOrigin: '50% 50%', scale: .6 });
      gsap.set(kartlar, { opacity: 0, y: 12 });
      gsap.set(liderler, { strokeDasharray: '1 1', strokeDashoffset: 1 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: harita, start: 'top 75%', end: 'bottom 55%', scrub: .6 } });
      tl.to(maske, { strokeDashoffset: 0, ease: 'none', duration: 1 }, 0);
      oranlar.forEach((o, i) => {
        if (duraklar[i]) tl.to(duraklar[i], { opacity: 1, scale: 1, duration: .06, ease: 'none' }, o);
        if (liderler[i]) tl.to(liderler[i], { strokeDashoffset: 0, duration: .08, ease: 'none' }, o + .02);
        if (kartlar[i]) tl.to(kartlar[i], { opacity: 1, y: 0, duration: .08, ease: 'none' }, o + .05);
      });
      return () => { gsap.set([maske, liderler, duraklar.filter(Boolean), kartlar], { clearProps: 'all' }); };
    });
  });
})();
