const links = Array.from(document.querySelectorAll(".nav-link[href^='#']"));
const sections = links
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
const mobileMenu = document.querySelector(".mobile-menu");

document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

function closeMobileMenu({ restoreFocus = false } = {}) {
  if (!mobileMenu) return;

  document.body.classList.remove("nav-open");
  mobileMenu.setAttribute("aria-expanded", "false");
  mobileMenu.setAttribute("aria-label", "Open navigation");
  if (restoreFocus) mobileMenu.focus();
}

function setActiveLink(id) {
  links.forEach((link) => {
    const active = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("active", active);
    if (active) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function updateActiveSection() {
  if (!sections.length) return;

  const atPageEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
  if (atPageEnd) {
    setActiveLink(sections[sections.length - 1].id);
    return;
  }

  const readingLine = window.scrollY + Math.min(window.innerHeight * 0.42, window.innerHeight - 120);
  const current = sections.reduce((active, section) => {
    return section.getBoundingClientRect().top + window.scrollY <= readingLine ? section : active;
  }, sections[0]);

  setActiveLink(current.id);
}

let scrollFrame = 0;
function scheduleActiveSectionUpdate() {
  if (scrollFrame) return;
  scrollFrame = window.requestAnimationFrame(() => {
    scrollFrame = 0;
    updateActiveSection();
  });
}

window.addEventListener("scroll", scheduleActiveSectionUpdate, { passive: true });
window.addEventListener("resize", scheduleActiveSectionUpdate);
updateActiveSection();

document.querySelectorAll("[data-toggle]").forEach((button) => {
  const target = document.getElementById(button.dataset.toggle);
  if (!target) return;

  button.addEventListener("click", () => {
    const expanded = target.classList.toggle("is-collapsed") === false;
    button.setAttribute("aria-expanded", String(expanded));
    const indicator = button.querySelector("span");
    if (indicator) indicator.textContent = expanded ? "−" : "+";
  });
});

mobileMenu?.addEventListener("click", () => {
  const open = document.body.classList.toggle("nav-open");
  mobileMenu.setAttribute("aria-expanded", String(open));
  mobileMenu.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});

document.addEventListener("click", (event) => {
  if (!document.body.classList.contains("nav-open")) return;
  if (event.target instanceof Element && event.target.closest(".site-header")) return;
  closeMobileMenu();
});

const desktopNavigation = window.matchMedia("(min-width: 761px)");
desktopNavigation.addEventListener("change", (event) => {
  if (event.matches) closeMobileMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || !document.body.classList.contains("nav-open")) return;
  closeMobileMenu({ restoreFocus: true });
});

document.querySelector(".site-header")?.addEventListener("click", (event) => {
  if (event.target instanceof Element && event.target.closest("a")) closeMobileMenu();
});
