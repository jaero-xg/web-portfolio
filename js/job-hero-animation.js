const jobTitles = [
  "Frontend Developer",
  "UI/UX Designer",
  "AR Developer",
  "Mobile App Dev", // suggested extra — sounds modern and versatile
];

let currentIndex = 0;
const jobTitleElement = document.getElementById("job-title");

function changeJobTitle() {
  currentIndex = (currentIndex + 1) % jobTitles.length;
  jobTitleElement.style.animation = "none"; // reset animation
  void jobTitleElement.offsetWidth; // force reflow
  jobTitleElement.textContent = jobTitles[currentIndex];
  jobTitleElement.style.animation = "scrollUp 0.5s ease forwards";
}

// Change every 3 seconds
setInterval(changeJobTitle, 3000);
