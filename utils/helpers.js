export function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function getPR(workouts, exId) {
  const entries = workouts.filter(w => w.exId === exId);
  if (entries.length === 0) return null;
  let pr = 0;
  entries.forEach(e => e.sets.forEach(s => {
    const v = parseFloat(s.weight) || parseFloat(s.reps) || 0;
    if (v > pr) pr = v;
  }));
  return pr;
}

export function getProgressData(workouts, exId) {
  const entries = workouts.filter(w => w.exId === exId);
  const byDay = {};
  entries.forEach(e => {
    const day = e.date.slice(0, 10);
    const best = Math.max(...e.sets.map(s => parseFloat(s.weight) || parseFloat(s.reps) || 0));
    if (!byDay[day] || best > byDay[day]) byDay[day] = best;
  });
  return Object.entries(byDay).sort((a, b) => a[0].localeCompare(b[0]));
}
