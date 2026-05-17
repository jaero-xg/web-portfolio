import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AIAssistant from "./components/AIAssistant";
import Footer from "./components/Footer";
import GitActivity from "./components/GitActivity";

interface ContributionDay {
  date: string;
  count: number;
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [contributions, setContributions] = useState<ContributionDay[]>([]);

  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark",
  );

  // Apply .dark to <html> on toggle
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  // Track which section is in viewport on scroll
  useEffect(() => {
    const sectionIds = ["home", "projects", "about", "skills", "contact"];

    const handleScroll = () => {
      let current = "home";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop - 150 <= window.scrollY) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch GitHub contribution data
  useEffect(() => {
    fetch("https://github-contributions-api.jogruber.de/v4/jaero-xg?y=last")
      .then((res) => res.json())
      .then((data) => {
        // API returns { contributions: [{ date, count }] }
        if (Array.isArray(data.contributions)) {
          setContributions(data.contributions);
        }
      })
      .catch(() => {
        // Silently fail — GitActivity renders a skeleton when contributions is []
      });
  }, []);

  return (
    <div className="app-container">
      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeSection={activeSection}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      <main className="resume-document">
        <Hero />

        <section className="doc-section statement-section" id="home">
          <div className="section-label">01 — Statement</div>
          <p className="statement-text">
            I'm mostly into building web systems, apps, and turning random ideas
            into actual projects. A lot of what I make starts from curiosity,
            experimenting with new tech, or simply wanting to create something
            useful and clean.
            <br />
            <br />
            Lately, I've been exploring different tools, improving my UI/design
            approach, and building projects that help me learn something new
            every time. Right now, I'm just focused on creating cool stuff,
            improving my skills, and seeing how far I can take the ideas I come
            up with.
          </p>
        </section>

        <section className="doc-section" id="projects">
          <div className="section-label">02 — Selected Work</div>
          <div className="work-list">
            <article className="work-item">
              <div className="work-meta">
                <span className="work-num">01</span>
                <span className="work-year">2026</span>
              </div>
              <div className="work-content">
                <h3 className="work-title">Agutay NHS — SHS Mini-Scheduler</h3>
                <p className="work-desc">
                  Web-based scheduling system for senior high school faculty.
                </p>
                <div className="work-tags">
                  <span>JavaScript</span>
                  <span>HTML</span>
                  <span>CSS</span>
                </div>
              </div>
              <div className="work-actions">
                <a
                  href="https://github.com/jaero-xg/ANHS-SHS-Mini-Scheduler.git"
                  target="_blank"
                  rel="noopener"
                  className="work-link"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </a>
                <a
                  href="https://agutaynhs-shs-minischeduler.netlify.app/"
                  target="_blank"
                  rel="noopener"
                  className="work-link"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
            </article>

            <article className="work-item">
              <div className="work-meta">
                <span className="work-num">02</span>
                <span className="work-year">2026</span>
              </div>
              <div className="work-content">
                <h3 className="work-title">Tech Dept Scheduler</h3>
                <p className="work-desc">
                  Department scheduling tool for IT faculty workload management.
                </p>
                <div className="work-tags">
                  <span>JavaScript</span>
                  <span>HTML</span>
                  <span>CSS</span>
                </div>
              </div>
              <div className="work-actions">
                <a
                  href="https://github.com/jaero-xg/Tech-Dept-Scheduler.git"
                  target="_blank"
                  rel="noopener"
                  className="work-link"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </a>
                <a
                  href="https://tech-dept-mini.netlify.app/"
                  target="_blank"
                  rel="noopener"
                  className="work-link"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
            </article>

            <article className="work-item">
              <div className="work-meta">
                <span className="work-num">03</span>
                <span className="work-year">2025</span>
              </div>
              <div className="work-content">
                <h3 className="work-title">Arnet V2 — Proto</h3>
                <p className="work-desc">
                  Updated UI/UX redesign for the Arnet application interface.
                </p>
                <div className="work-tags">
                  <span>Figma</span>
                </div>
              </div>
              <div className="work-actions">
                <a
                  href="https://www.figma.com/design/erCUHdoEffRxGGDBqcvEpA/ARNetV2?node-id=0-1&t=HPtrcyDCpo7NiVTi-1"
                  target="_blank"
                  rel="noopener"
                  className="work-link"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 19l7-7 3 3-7 7-3-3z" />
                    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                    <path d="M2 2l7.586 7.586" />
                    <circle cx="11" cy="11" r="2" />
                  </svg>
                </a>
                <a
                  href="https://www.figma.com/proto/erCUHdoEffRxGGDBqcvEpA/ARNetV2"
                  target="_blank"
                  rel="noopener"
                  className="work-link"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
            </article>

            <article className="work-item">
              <div className="work-meta">
                <span className="work-num">04</span>
                <span className="work-year">2024</span>
              </div>
              <div className="work-content">
                <h3 className="work-title">Arnet</h3>
                <p className="work-desc">
                  Augmented reality application for Data Communication and
                  Networking course.
                </p>
                <div className="work-tags">
                  <span>C#</span>
                  <span>Unity</span>
                  <span>Blender</span>
                </div>
              </div>
              <div className="work-actions">
                <a
                  href="https://github.com/jaero-xg/Arnet.git"
                  target="_blank"
                  rel="noopener"
                  className="work-link"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </a>
              </div>
            </article>

            <article className="work-item">
              <div className="work-meta">
                <span className="work-num">05</span>
                <span className="work-year">2023</span>
              </div>
              <div className="work-content">
                <h3 className="work-title">Odio-Flix</h3>
                <p className="work-desc">
                  Brochure-style web application with full CRUD functionality.
                </p>
                <div className="work-tags">
                  <span>PHP</span>
                  <span>JavaScript</span>
                  <span>MySQL</span>
                </div>
              </div>
              <div className="work-actions">
                <a
                  href="https://github.com/jaero-xg/Odio-Flix.git"
                  target="_blank"
                  rel="noopener"
                  className="work-link"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </a>
              </div>
            </article>

            <article className="work-item">
              <div className="work-meta">
                <span className="work-num">06</span>
                <span className="work-year">2023</span>
              </div>
              <div className="work-content">
                <h3 className="work-title">Portfolio V1</h3>
                <p className="work-desc">
                  First iteration of personal web portfolio.
                </p>
                <div className="work-tags">
                  <span>HTML</span>
                  <span>CSS</span>
                  <span>JavaScript</span>
                </div>
              </div>
              <div className="work-actions">
                <a
                  href="https://github.com/jaero-xg/portfolio-v1.git"
                  target="_blank"
                  rel="noopener"
                  className="work-link"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </a>
              </div>
            </article>
          </div>
        </section>

        <section className="doc-section" id="about">
          <div className="section-label">03 — Background</div>
          <div className="about-grid">
            <div className="about-block">
              <h4 className="block-title">Education</h4>
              <div className="edu-item">
                <div className="edu-header">
                  <span className="edu-school">Romblon State University</span>
                  <span className="edu-year">2021 — 2025</span>
                </div>
                <p className="edu-detail">BS Information Technology</p>
              </div>
              <div className="edu-item">
                <div className="edu-header">
                  <span className="edu-school">DCMM Memorial NHS</span>
                  <span className="edu-year">2019 — 2021</span>
                </div>
                <p className="edu-detail">STEM Strand</p>
              </div>
            </div>
            <div className="about-block">
              <h4 className="block-title">Experience</h4>
              <div className="exp-item">
                <div className="exp-header">
                  <span className="exp-role">University Lecturer</span>
                  <span className="exp-year">Present</span>
                </div>
                <p className="exp-detail">
                  Teaching IT courses and mentoring student projects.
                </p>
              </div>
              <div className="exp-item">
                <div className="exp-header">
                  <span className="exp-role">Internship</span>
                  <span className="exp-year">2025</span>
                </div>
                <p className="exp-detail">
                  Industry practicum in software development.
                </p>
              </div>
            </div>
            <div className="about-block">
              <h4 className="block-title">Recognition</h4>
              <div className="cert-item">
                <span className="cert-name">Certificates</span>
                <span className="cert-issuer">
                  Various Seminars &amp; Courses
                </span>
              </div>
              <div className="cert-item">
                <span className="cert-name">Academic Excellence</span>
                <span className="cert-issuer">
                  Class Valedictorian - Elementary
                  <br />
                  Rank 1 - Junior High
                  <br />
                  With Honors - Senior High
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="doc-section" id="skills">
          <div className="section-label">04 — Technical Stack</div>
          <div className="stack-grid">
            <div className="stack-category">
              <h4 className="stack-cat-title">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
                Frontend
              </h4>
              <div className="stack-items">
                <span className="stack-item">HTML</span>
                <span className="stack-item">CSS</span>
                <span className="stack-item">JavaScript</span>
                <span className="stack-item">TypeScript</span>
                <span className="stack-item">React</span>
              </div>
            </div>
            <div className="stack-category">
              <h4 className="stack-cat-title">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
                Mobile
              </h4>
              <div className="stack-items">
                <span className="stack-item">Flutter</span>
                <span className="stack-item">Dart</span>
              </div>
            </div>
            <div className="stack-category">
              <h4 className="stack-cat-title">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                Game / AR
              </h4>
              <div className="stack-items">
                <span className="stack-item">Unity</span>
                <span className="stack-item">C#</span>
                <span className="stack-item">Blender</span>
              </div>
            </div>
            <div className="stack-category">
              <h4 className="stack-cat-title">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <ellipse cx="12" cy="5" rx="9" ry="3" />
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                </svg>
                Backend
              </h4>
              <div className="stack-items">
                <span className="stack-item">PHP</span>
                <span className="stack-item">MySQL</span>
              </div>
            </div>
            <div className="stack-category">
              <h4 className="stack-cat-title">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 19l7-7 3 3-7 7-3-3z" />
                  <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                  <path d="M2 2l7.586 7.586" />
                  <circle cx="11" cy="11" r="2" />
                </svg>
                Design
              </h4>
              <div className="stack-items">
                <span className="stack-item">Figma</span>
              </div>
            </div>
          </div>
        </section>

        <GitActivity
          username="jaero-xg"
          contributions={contributions}
          githubUrl="https://github.com/jaero-xg"
        />

        <section className="doc-section" id="contact">
          <div className="section-label">06 — Contact</div>
          <div className="contact-grid">
            <a href="mailto:royojohnamer@gmail.com" className="contact-item">
              <span className="contact-label">Email</span>
              <span className="contact-value">royojohnamer@gmail.com</span>
            </a>
            <a
              href="https://github.com/jaero-xg"
              target="_blank"
              rel="noopener"
              className="contact-item"
            >
              <span className="contact-label">GitHub</span>
              <span className="contact-value">@jaero-xg</span>
            </a>
            <a
              href="https://discord.gg/9mKXtNFb"
              target="_blank"
              rel="noopener"
              className="contact-item"
            >
              <span className="contact-label">Discord</span>
              <span className="contact-value">jaero.</span>
            </a>
            <a
              href="https://www.instagram.com/not_amerrr"
              target="_blank"
              rel="noopener"
              className="contact-item"
            >
              <span className="contact-label">Instagram</span>
              <span className="contact-value">@not_amerrr</span>
            </a>
            <a
              href="https://www.facebook.com/share/1CDmH3DswR/"
              target="_blank"
              rel="noopener"
              className="contact-item"
            >
              <span className="contact-label">Facebook</span>
              <span className="contact-value">John Amer Royo</span>
            </a>
          </div>
        </section>
      </main>

      <Footer />
      <AIAssistant />
    </div>
  );
}
