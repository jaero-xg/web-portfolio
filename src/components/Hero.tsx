import { useState, useEffect } from "react";

const JOB_TITLES = [
  "Frontend Developer",
  "UI/UX Designer",
  "AR Developer",
  "Mobile App Dev",
];

export default function Hero() {
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);

  // Initialize GitHub Calendar
  useEffect(() => {
    // @ts-ignore
    if (typeof GitHubCalendar !== "undefined") {
      try {
        // @ts-ignore
        new GitHubCalendar("#github-graph", "jaero-xg", { responsive: true });
      } catch (error) {
        console.error("Failed to initialize GitHub Calendar graph:", error);
      }
    }
  }, []);

  // Typewriter loop — fixed: capture char before increment, add cleanup, small
  // initial delay so setDisplayedTitle("") settles before typing starts
  useEffect(() => {
    const currentText = JOB_TITLES[titleIndex];
    let charIndex = 0;
    let timer: ReturnType<typeof setTimeout>;

    setDisplayedTitle("");

    const type = () => {
      if (charIndex < currentText.length) {
        const char = currentText.charAt(charIndex);
        charIndex++;
        setDisplayedTitle((prev) => prev + char);
        timer = setTimeout(type, 60);
      } else {
        timer = setTimeout(() => {
          setTitleIndex((prev) => (prev + 1) % JOB_TITLES.length);
        }, 2000);
      }
    };

    // Small delay so the empty-string reset renders before typing begins
    timer = setTimeout(type, 50);

    return () => clearTimeout(timer);
  }, [titleIndex]);

  return (
    <header className="doc-header">
      <div className="header-grid">
        <div className="header-left">
          <h1 className="doc-name">
            <span className="name-line">John Amer</span>
            <span className="name-line">R. Royo</span>
          </h1>
          <div className="doc-status">
            <span className="status-dot"></span>
            <span className="status-text">Available for work</span>
          </div>
        </div>
        <div className="header-right">
          <div className="role-block">
            <span className="role-label">Current Role</span>
            <span className="role-value" id="jobTitle">
              {displayedTitle}
            </span>
          </div>
          <div className="role-block">
            <span className="role-label">Location</span>
            <span className="role-value">Romblon, Philippines</span>
          </div>
          <div className="role-block">
            <span className="role-label">Experience</span>
            <span className="role-value">1+ Years</span>
          </div>
        </div>
      </div>
    </header>
  );
}
