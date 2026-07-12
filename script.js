const links = Array.from(document.querySelectorAll(".nav-link[href^='#']"));
const sections = links
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
const mobileMenu = document.querySelector(".mobile-menu");

function setActiveLink(id) {
  links.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible) {
      setActiveLink(visible.target.id);
    }
  },
  {
    rootMargin: "-24% 0px -62% 0px",
    threshold: [0.15, 0.35, 0.6],
  }
);

sections.forEach((section) => observer.observe(section));

document.querySelectorAll("[data-toggle]").forEach((button) => {
  const target = document.getElementById(button.dataset.toggle);
  if (!target) return;
  const openLabel = button.textContent.trim();
  const closedLabel = button.dataset.closedLabel || openLabel;

  button.addEventListener("click", () => {
    target.classList.toggle("is-collapsed");
    button.textContent = target.classList.contains("is-collapsed") ? closedLabel : "Hide";
  });
});

mobileMenu?.addEventListener("click", () => {
  const open = document.body.classList.toggle("nav-open");
  mobileMenu.setAttribute("aria-expanded", String(open));
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
    mobileMenu?.setAttribute("aria-expanded", "false");
  });
});
