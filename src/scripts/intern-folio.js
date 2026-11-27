import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { folio } from '../data/internFolio';

gsap.registerPlugin(ScrollTrigger);

const stage = document.querySelector('.folio-stage');
const track = document.querySelector('[data-folio-track]');
const panels = [...document.querySelectorAll('.folio-panel')];
const rail = document.querySelector('[data-rail]');
const menu = document.querySelector('#folio-menu');
const menuOpen = document.querySelector('[data-menu-open]');
const menuClose = document.querySelector('[data-menu-close]');
let horizontalTrigger;

function setRailTone(panel) {
  rail.dataset.tone = panel?.dataset.railTone === 'light'
    ? 'light-on-dark'
    : panel?.classList.contains('tone-stone') ? 'stone' : 'dark';
}

function updateTime() {
  const clock = document.querySelector('[data-local-time]');
  if (!clock) return;
  clock.textContent = new Intl.DateTimeFormat('en-GB', {
    timeZone: folio.timezone,
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  }).format(new Date());
}
updateTime();
window.setInterval(updateTime, 1000);

let menuClosing = false;
const menuMotionReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

function closeMenu(afterClose) {
  if (!menu.open || menuClosing) return;
  menuClosing = true;
  menu.classList.remove('is-visible');
  const finish = () => {
    menu.close();
    menuClosing = false;
    menuOpen.setAttribute('aria-expanded', 'false');
    menuOpen.focus({ preventScroll: true });
    afterClose?.();
  };
  if (menuMotionReduced.matches) finish();
  else window.setTimeout(finish, 700);
}
menuOpen.addEventListener('click', () => {
  menu.showModal();
  // Commit the closed style before starting the transition.
  void menu.offsetWidth;
  menu.classList.add('is-visible');
  menuOpen.setAttribute('aria-expanded', 'true');
  menuClose.focus();
});
menuClose.addEventListener('click', () => closeMenu());
menu.addEventListener('close', () => menuOpen.setAttribute('aria-expanded', 'false'));
menu.addEventListener('cancel', (event) => {
  event.preventDefault();
  closeMenu();
});
menu.addEventListener('click', (event) => {
  if (event.target === menu) closeMenu();
});

function goToPanel(id) {
  const index = panels.findIndex((panel) => panel.id === id);
  if (index < 0) return;
  if (horizontalTrigger) {
    const progress = index / (panels.length - 1);
    const top = horizontalTrigger.start + (horizontalTrigger.end - horizontalTrigger.start) * progress;
    window.scrollTo({ top, behavior: 'smooth' });
  } else {
    panels[index].scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }
}
document.querySelectorAll('[data-panel-link]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const id = link.getAttribute('href')?.slice(1);
    if (!id) return;
    event.preventDefault();
    if (menu.open) closeMenu(() => goToPanel(id));
    else goToPanel(id);
  });
});

const preview = document.querySelector('[data-project-preview]');
const previewLabel = preview?.querySelector('.preview-label');
const educationDemo = preview?.querySelector('.preview-education-demo');
educationDemo?.querySelector('iframe')?.addEventListener('load', () => {
  educationDemo.classList.add('is-loaded');
});
document.querySelectorAll('[data-work-item]').forEach((link) => {
  const activate = () => {
    preview.dataset.visual = link.dataset.visual;
    previewLabel.textContent = link.dataset.previewTitle;
  };
  link.addEventListener('pointerenter', activate);
  link.addEventListener('focus', activate);
});

const demoResizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    entry.target.style.setProperty('--demo-scale', entry.contentRect.width / 1366);
  }
});
document.querySelectorAll('[data-demo-viewport]').forEach((viewport) => demoResizeObserver.observe(viewport));

const desktopMotion = gsap.matchMedia();
desktopMotion.add('(min-width: 1024px) and (orientation: landscape) and (prefers-reduced-motion: no-preference)', () => {
  const distance = () => track.scrollWidth - window.innerWidth;
  const movement = gsap.to(track, {
    x: () => -distance(),
    ease: 'none',
    modifiers: { x: (value) => `${Math.round(Number.parseFloat(value))}px` },
    scrollTrigger: {
      trigger: stage,
      start: 'top top',
      end: () => `+=${distance()}`,
      pin: true,
      scrub: 0.8,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const index = Math.min(panels.length - 1, Math.round(self.progress * (panels.length - 1)));
        setRailTone(panels[index]);
      },
    },
  });
  horizontalTrigger = movement.scrollTrigger;

  gsap.fromTo('.portrait-frame',
    { yPercent: 4 },
    { yPercent: -4, ease: 'none', scrollTrigger: {
      trigger: '#about',
      containerAnimation: movement,
      start: 'left right',
      end: 'right left',
      scrub: true,
    } },
  );

  return () => {
    horizontalTrigger = undefined;
    gsap.set(track, { clearProps: 'transform' });
    gsap.set('.portrait-frame', { clearProps: 'transform' });
  };
});

const railObserver = new IntersectionObserver((entries) => {
  if (horizontalTrigger) return;
  const current = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (current) setRailTone(current.target);
}, { threshold: [0.25, 0.5, 0.75] });
panels.forEach((panel) => railObserver.observe(panel));
setRailTone(panels[0]);
