document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  function openMenu() {
    // compute the natural height and set max-height to allow smooth expand
    const fullHeight = navLinks.scrollHeight; // includes padding when open
    navLinks.style.maxHeight = fullHeight + "px";
    navLinks.classList.add("open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.textContent = "✕"; // close icon
  }

  function closeMenu() {
    navLinks.style.maxHeight = "0";
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰"; // hamburger icon
  }

  // Toggle behaviour
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    if (expanded) closeMenu();
    else openMenu();
  });

  // Close the menu if user clicks a link (good UX) or on resize to desktop
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") closeMenu();
  });

  // Optional: if window gets resized above breakpoint, clear inline styles
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navLinks.style.maxHeight = "";
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    } else {
      // if menu is open and viewport shrinks, keep it usable
      if (menuToggle.getAttribute("aria-expanded") === "true") {
        navLinks.style.maxHeight = navLinks.scrollHeight + "px";
      }
    }
  });
});
