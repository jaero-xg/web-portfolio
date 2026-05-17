import { useEffect } from "react";

interface WorkPanelProps {
  project: {
    num: string;
    year: string;
    title: string;
    desc: string;
    tags: string[];
    thumbnail?: string;
    links: { type: "github" | "live" | "figma"; href: string }[];
  } | null;
  onClose: () => void;
}

// SVG icons
const IconGithub = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const IconLive = () => (
  <svg
    width="15"
    height="15"
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
);

const IconFigma = () => (
  <svg
    width="15"
    height="15"
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
);

const IconClose = () => (
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
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const LABEL: Record<string, string> = {
  github: "GitHub",
  live: "Live",
  figma: "Figma",
};

export default function WorkPanel({ project, onClose }: WorkPanelProps) {
  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`panel-backdrop${project ? " active" : ""}`}
        onClick={onClose}
      />

      {/* Panel */}
      <aside className={`work-panel${project ? " active" : ""}`}>
        {project && (
          <>
            <div className="panel-header">
              <span className="panel-num">{project.num}</span>
              <button
                className="panel-close"
                onClick={onClose}
                aria-label="Close"
              >
                <IconClose />
              </button>
            </div>

            {/* Thumbnail */}
            <div className="panel-thumb">
              {project.thumbnail ? (
                <img src={project.thumbnail} alt={project.title} />
              ) : (
                <div className="panel-thumb-placeholder">
                  <span>{project.num}</span>
                </div>
              )}
            </div>

            <div className="panel-body">
              <p className="panel-year">{project.year}</p>
              <h2 className="panel-title">{project.title}</h2>
              <p className="panel-desc">{project.desc}</p>

              <div className="panel-tags">
                {project.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>

              <div className="panel-actions">
                {project.links.map((link) => (
                  <a
                    key={link.type}
                    href={link.href}
                    target="_blank"
                    rel="noopener"
                    className="panel-btn"
                  >
                    {link.type === "github" && <IconGithub />}
                    {link.type === "live" && <IconLive />}
                    {link.type === "figma" && <IconFigma />}
                    {LABEL[link.type]}
                  </a>
                ))}
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
