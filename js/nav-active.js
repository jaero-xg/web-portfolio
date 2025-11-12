const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");

const menuToggle = document.getElementById("menu-toggle");
const navlinks = document.getElementById("navLinks");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120; // adjust for header height
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

menuToggle.addEventListener("click", () => {
  navlinks.classList.toggle("open");
});
