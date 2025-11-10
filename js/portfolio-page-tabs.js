const tabButtons = document.querySelectorAll(".tabs-button-portfolio");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active from all buttons
    tabButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // Hide all content
    tabContents.forEach((content) => (content.style.display = "none"));

    // Show selected content
    const target = btn.getAttribute("data-tab");
    document.getElementById(target).style.display = "flex";
  });
});
