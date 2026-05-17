"use client";

import { useEffect, useState } from "react";

/* ─── Types ──────────────────────────────────────────────────────────────────── */
interface ContributionDay {
  date: string;
  count: number;
}

interface GitActivityProps {
  /** Your GitHub username */
  username: string;
  /**
   * Supply contribution data yourself (e.g. from github-calendar-api or
   * a server-side fetch). Each entry is { date: "YYYY-MM-DD", count: number }.
   * If omitted the component renders placeholder skeleton cells.
   */
  contributions?: ContributionDay[];
  /** Optionally override the "View on GitHub" href */
  githubUrl?: string;
}

interface Stats {
  total: number;
  streak: number;
  activeRepos: number;
  best: number;
}

/* ─── Helpers ────────────────────────────────────────────────────────────────── */
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const WEEKS = 53;
const SHOW_DAY_LABELS = [1, 3, 5]; // Mon, Wed, Fri

function level(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 6) return 2;
  if (count <= 12) return 3;
  return 4;
}

/**
 * Convert a flat ContributionDay[] into a 2-D grid[week][day] aligned to
 * today's weekday so the rightmost column ends on today.
 */
function buildGrid(
  contributions: ContributionDay[],
  today: Date,
): (number | null)[][] {
  const map = new Map(contributions.map((d) => [d.date, d.count]));
  const todayDay = today.getDay();

  const grid: (number | null)[][] = [];
  for (let w = 0; w < WEEKS; w++) {
    const week: (number | null)[] = [];
    for (let d = 0; d < 7; d++) {
      // future cells in the final partial week
      if (w === WEEKS - 1 && d > todayDay) {
        week.push(null);
        continue;
      }
      const offset = (WEEKS - 1 - w) * 7 + (todayDay - d);
      const date = new Date(today);
      date.setDate(date.getDate() - offset);
      const key = date.toISOString().slice(0, 10);
      week.push(map.get(key) ?? 0);
    }
    grid.push(week);
  }
  return grid;
}

function computeStats(grid: (number | null)[][], today: Date): Stats {
  let total = 0;
  let best = 0;
  let streak = 0;
  let streakBroken = false;
  const todayDay = today.getDay();

  for (let w = WEEKS - 1; w >= 0; w--) {
    const startD = w === WEEKS - 1 ? todayDay : 6;
    for (let d = startD; d >= 0; d--) {
      const v = grid[w][d];
      if (v === null) continue;
      total += v;
      if (v > best) best = v;
      if (!streakBroken) {
        if (v > 0) streak++;
        else streakBroken = true;
      }
    }
  }

  // Rough active-repos estimate: weeks with 3+ distinct "burst" days
  const activeRepos = Math.min(
    12,
    grid.filter((week) => week.filter((v) => v !== null && v > 3).length >= 2)
      .length,
  );

  return { total, streak, activeRepos, best };
}

function buildMonthLabels(today: Date): { week: number; label: string }[] {
  const labels: { week: number; label: string }[] = [];
  const seen = new Set<number>();
  const todayDay = today.getDay();

  for (let w = 0; w < WEEKS; w++) {
    for (let d = 0; d < 7; d++) {
      if (w === WEEKS - 1 && d > todayDay) continue;
      const offset = (WEEKS - 1 - w) * 7 + (todayDay - d);
      const date = new Date(today);
      date.setDate(date.getDate() - offset);
      const m = date.getMonth();
      if (!seen.has(m)) {
        seen.add(m);
        labels.push({ week: w, label: MONTHS[m] });
        break;
      }
    }
  }
  return labels;
}

/* ─── Skeleton placeholder grid (no data yet) ───────────────────────────────── */
function SkeletonGrid() {
  return (
    <div className="ga-cal-grid" aria-hidden="true">
      {DAYS.map((day, d) => (
        <div key={d} className="ga-cal-row">
          <div className="ga-day-label">
            {SHOW_DAY_LABELS.includes(d) ? day.slice(0, 3) : ""}
          </div>
          <div className="ga-cells">
            {Array.from({ length: WEEKS }).map((_, w) => (
              <div key={w} className="ga-cell ga-lv0 ga-skeleton" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Component ──────────────────────────────────────────────────────────────── */
export default function GitActivity({
  username,
  contributions,
  githubUrl,
}: GitActivityProps) {
  const [grid, setGrid] = useState<(number | null)[][] | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [monthLabels, setMonthLabels] = useState<
    { week: number; label: string }[]
  >([]);

  useEffect(() => {
    const today = new Date();
    const ml = buildMonthLabels(today);
    setMonthLabels(ml);

    if (contributions && contributions.length > 0) {
      const g = buildGrid(contributions, today);
      setGrid(g);
      setStats(computeStats(g, today));
    }
  }, [contributions]);

  const href = githubUrl ?? `https://github.com/${username}`;

  return (
    <section className="ga-section">
      <div className="ga-eyebrow">05 — Activity</div>

      <div className="ga-card">
        {/* ── Stats row ── */}
        <div
          className="ga-stats-row"
          role="list"
          aria-label="Contribution statistics"
        >
          {[
            {
              val: stats ? stats.total.toLocaleString() : "—",
              lbl: "contributions",
            },
            { val: stats ? stats.streak.toString() : "—", lbl: "day streak" },
            {
              val: stats ? stats.activeRepos.toString() : "—",
              lbl: "active repos",
            },
            { val: stats ? stats.best.toString() : "—", lbl: "best day" },
          ].map(({ val, lbl }) => (
            <div key={lbl} className="ga-stat-pill" role="listitem">
              <div className="ga-stat-val">{val}</div>
              <div className="ga-stat-lbl">{lbl}</div>
            </div>
          ))}
        </div>

        {/* ── Calendar ── */}
        <div className="ga-calendar-area">
          <div className="ga-cal-header">
            <span className="ga-cal-title">Last 52 weeks</span>
            <div
              className="ga-legend-row"
              aria-label="Contribution level legend"
            >
              <span>less</span>
              {([0, 1, 2, 3, 4] as const).map((lv) => (
                <div key={lv} className={`ga-legend-cell ga-lv${lv}`} />
              ))}
              <span>more</span>
            </div>
          </div>

          {/* Month labels */}
          <div className="ga-month-labels" aria-hidden="true">
            {monthLabels.map(({ label }) => (
              <span key={label} className="ga-month-lbl">
                {label}
              </span>
            ))}
          </div>

          {/* Heatmap grid */}
          {grid ? (
            <div
              className="ga-cal-grid"
              role="grid"
              aria-label="Contribution heatmap"
            >
              {DAYS.map((day, d) => (
                <div key={d} className="ga-cal-row" role="row">
                  <div className="ga-day-label" aria-label={day}>
                    {SHOW_DAY_LABELS.includes(d) ? day.slice(0, 3) : ""}
                  </div>
                  <div className="ga-cells">
                    {grid.map((week, w) => {
                      const val = week[d];
                      if (val === null) {
                        return (
                          <div
                            key={w}
                            className="ga-cell"
                            style={{ opacity: 0 }}
                          />
                        );
                      }
                      return (
                        <div
                          key={w}
                          role="gridcell"
                          className={`ga-cell ga-lv${level(val)}`}
                          title={`${val} contribution${val !== 1 ? "s" : ""}`}
                          aria-label={`${val} contribution${val !== 1 ? "s" : ""}`}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <SkeletonGrid />
          )}
        </div>

        {/* ── Footer ── */}
        <div className="ga-footer-row">
          <div className="ga-streak-badge">
            {/* flame SVG inline — no external dependency */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#639922"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 2c0 0-5 4-5 9a5 5 0 0 0 10 0c0-3-2-6-2-6s-1 3-3 3c-1 0-2-1-2-2 0-1 2-4 2-4z" />
            </svg>
            Current streak:{" "}
            <span className="ga-streak-num">{stats ? stats.streak : "—"}</span>{" "}
            days
          </div>
          <a
            className="ga-gh-link"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            View on GitHub
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
