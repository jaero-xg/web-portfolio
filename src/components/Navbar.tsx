interface NavbarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  activeSection: string;
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
}

export default function Navbar({
  isMenuOpen,
  setIsMenuOpen,
  activeSection,
  isDarkMode,
  setIsDarkMode,
}: NavbarProps) {
  const handleScrollTo = (targetId: string) => {
    setIsMenuOpen(false);
    const destination = document.getElementById(targetId);
    if (destination) {
      destination.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Close menu when clicking outside (overlay effect)
  const handleOverlayClick = () => {
    if (isMenuOpen) setIsMenuOpen(false);
  };

  return (
    <>
      {/* Invisible overlay to close menu on outside click */}
      {isMenuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 98,
          }}
          onClick={handleOverlayClick}
          aria-hidden="true"
        />
      )}

      <nav className="site-nav">
        <span className="nav-logo">Amer</span>

        <div className="nav-right">
          <button
            id="hamburgerMenu"
            className={`hamburger ${isMenuOpen ? "active" : ""}`}
            aria-expanded={isMenuOpen}
            aria-controls="navLinks"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>

          <div
            id="navLinks"
            className={`nav-links ${isMenuOpen ? "active" : ""}`}
            role="navigation"
          >
            {["home", "projects", "skills", "contact"].map((sectionKey) => (
              <a
                key={sectionKey}
                href={`#${sectionKey}`}
                className={activeSection === sectionKey ? "active" : ""}
                data-section={sectionKey}
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo(sectionKey);
                }}
              >
                {sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)}
              </a>
            ))}

            <button
              id="themeToggle"
              className="theme-toggle"
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {isDarkMode ? "☀" : "☾"}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
