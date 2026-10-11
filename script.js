// Highlight the sidebar link for the section currently in view
const navLinks = document.querySelectorAll(".side-nav a");
const sections = [...navLinks].map((a) => document.querySelector(a.getAttribute("href")));

function setActive(id) {
  navLinks.forEach((a) => {
    const on = a.getAttribute("href") === `#${id}`;
    a.classList.toggle("active", on);
    if (on) {
      a.setAttribute("aria-current", "true");
      // On mobile, keep the active link visible in the horizontal bar
      const nav = a.parentElement;
      if (nav.scrollWidth > nav.clientWidth) {
        nav.scrollTo({ left: a.offsetLeft - 16, behavior: "smooth" });
      }
    } else {
      a.removeAttribute("aria-current");
    }
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  },
  { rootMargin: "-45% 0px -50% 0px" } // a section is "current" when it crosses the middle of the screen
);

sections.forEach((s) => s && observer.observe(s));

// Clear the highlight when scrolled back up to the hero
const hero = document.querySelector(".hero");
new IntersectionObserver(
  ([entry]) => { if (entry.isIntersecting) setActive(null); },
  { rootMargin: "-45% 0px -50% 0px" }
).observe(hero);
