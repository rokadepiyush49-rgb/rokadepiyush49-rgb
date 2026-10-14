/** Calendar maths for the contribution world. */

export const DAY = 86400000;
export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const iso = (d) => d.toISOString().slice(0, 10);
const parse = (s) => new Date(`${s}T00:00:00Z`);

/** Sunday-first week columns, like GitHub's own graph. */
export function buildCalendar({ range, days }) {
  const start = parse(range.from);
  const end = parse(range.to);
  const gridStart = new Date(start.getTime() - start.getUTCDay() * DAY);

  const weeks = [];
  let max = 0;
  let total = 0;
  for (let t = gridStart.getTime(); t <= end.getTime(); t += 7 * DAY) {
    const col = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(t + d * DAY);
      const key = iso(date);
      const inRange = date >= start && date <= end;
      const count = inRange ? days[key] || 0 : null;
      if (count) {
        total += count;
        max = Math.max(max, count);
      }
      col.push({ date: key, count });
    }
    weeks.push(col);
  }

  const months = [];
  let last = '';
  weeks.forEach((col, i) => {
    const first = col.find((c) => c.count !== null);
    if (!first) return;
    const m = first.date.slice(0, 7);
    if (m !== last) {
      last = m;
      months.push({ col: i, label: MONTHS[Number(m.slice(5, 7)) - 1] });
    }
  });
  // drop a label that would collide with the next one
  const spaced = months.filter((m, i) => !months[i + 1] || months[i + 1].col - m.col >= 3);

  return { weeks, months: spaced, max, total };
}

/** 0..4, quartiles of the busiest day (GitHub-style). */
export function level(count, max) {
  if (!count) return 0;
  if (max <= 4) return Math.min(4, count);
  const q = max / 4;
  if (count <= Math.max(1, q * 0.5)) return 1;
  if (count <= q) return 2;
  if (count <= q * 2) return 3;
  return 4;
}

/** Everything derived from the real day map; nothing invented. */
export function deriveStats({ days }) {
  const entries = Object.entries(days)
    .filter(([, v]) => v > 0)
    .sort((a, b) => (a[0] < b[0] ? -1 : 1));

  let best = { date: null, count: 0 };
  for (const [d, c] of entries) if (c > best.count) best = { date: d, count: c };

  let longest = 0;
  let run = 0;
  let prev = null;
  for (const [d] of entries) {
    const t = parse(d).getTime();
    run = prev !== null && t - prev === DAY ? run + 1 : 1;
    longest = Math.max(longest, run);
    prev = t;
  }
  return { activeDays: entries.length, bestDay: best, longestStreak: longest };
}

export function prettyDay(isoDate) {
  if (!isoDate) return '—';
  const [, m, d] = isoDate.split('-');
  return `${MONTHS[Number(m) - 1]} ${Number(d)}`;
}
