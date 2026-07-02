// Shared interactions: reveals, counters, spotlight, marquee, clock, progress, hero rotator.
export function initShared(): void {
  // scroll reveal
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }),
    { threshold: 0.12 }
  );
  document.querySelectorAll<HTMLElement>('.rv').forEach((el) => io.observe(el));

  // card spotlight
  document.querySelectorAll<HTMLElement>('.card').forEach((c) => {
    c.addEventListener('mousemove', (e: MouseEvent) => {
      const r = c.getBoundingClientRect();
      c.style.setProperty('--mx', `${e.clientX - r.left}px`);
      c.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });

  // scroll progress
  const prog = document.getElementById('progress');
  if (prog) {
    window.addEventListener('scroll', () => {
      const h = document.documentElement;
      prog.style.width = `${(h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100}%`;
    }, { passive: true });
  }

  // marquee seamless loop
  const track = document.getElementById('track');
  if (track) track.innerHTML += track.innerHTML;

  // mumbai clock
  const clockEl = document.getElementById('clock');
  if (clockEl) {
    const tick = () => {
      clockEl.textContent = 'Mumbai · ' + new Date().toLocaleTimeString('en-IN',
        { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' });
    };
    tick(); setInterval(tick, 30_000);
  }

  // hero rotator
  const rot = document.getElementById('rot');
  if (rot) {
    const roles = [
      'yorbit.in · 262 users in month one.',
      'caas.ai · 4,400+ govt schemes indexed.',
      'rasaynx.com · B2B chemical discovery.',
      'four tier-1 banks · systems in production.'
    ];
    let i = 0;
    setInterval(() => {
      rot.style.transition = 'opacity .4s, transform .4s';
      rot.style.opacity = '0'; rot.style.transform = 'translateY(8px)';
      setTimeout(() => {
        i = (i + 1) % roles.length;
        rot.textContent = roles[i];
        rot.style.transition = 'none'; rot.style.transform = 'translateY(-8px)';
        requestAnimationFrame(() => {
          rot.style.transition = 'opacity .4s, transform .4s';
          rot.style.opacity = '1'; rot.style.transform = 'none';
        });
      }, 400);
    }, 3400);
  }

  // animated counters (home stats)
  const stats = document.querySelector('.stats');
  if (stats) {
    const count = (el: HTMLElement, to: number, dur: number, fmt?: (v: number) => string) => {
      const t0 = performance.now();
      const frame = (t: number) => {
        const p = Math.min((t - t0) / dur, 1);
        const v = Math.round(to * (1 - Math.pow(1 - p, 3)));
        el.textContent = fmt ? fmt(v) : String(v);
        if (p < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    };
    const sio = new IntersectionObserver((es) => {
      if (es[0]?.isIntersecting) {
        const g = (id: string) => document.getElementById(id) as HTMLElement | null;
        const c1 = g('c1'); if (c1) count(c1, 4, 900);
        const c2 = g('c2'); if (c2) count(c2, 997, 1400, (v) => (v / 10).toFixed(1));
        const c3 = g('c3'); if (c3) count(c3, 4400, 1600, (v) => v.toLocaleString('en-IN'));
        const c4 = g('c4'); if (c4) count(c4, 262, 1300);
        sio.disconnect();
      }
    }, { threshold: 0.4 });
    sio.observe(stats);
  }
}
