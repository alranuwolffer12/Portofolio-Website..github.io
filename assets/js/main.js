/*-=- main.js dasar logika -=-*/

function initMobileNav() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-main-nav]");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.getAttribute("data-open") === "true";
    nav.setAttribute("data-open", String(!isOpen));
    toggle.setAttribute("aria-expanded", String(!isOpen));
  });

  /*- menutup menu nav -*/
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.setAttribute("data-open", "false");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/*- Menandai navigasi -*/

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("[data-section]");
  const navLinks = document.querySelectorAll(".sidebar_item, .main-nav a");
  if (!sections.length || !navLinks.length) return;

  const linkMap = new Map();
  navLinks.forEach((link) => {
    const href = link.getAttribute("href") || "";
    if (!href.startsWith("#")) return;
    const id = href.slice(1);
    if (!linkMap.has(id)) linkMap.set(id, []);
    linkMap.get(id).push(link);
  });

  function setActive(id) {
    navLinks.forEach((link) => link.removeAttribute("aria-current"));
    (linkMap.get(id) || []).forEach((link) => link.setAttribute("aria-current", "page"));
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0
    }
  );

  sections.forEach((section) => observer.observe(section));

  setActive(sections[0].id);
});
