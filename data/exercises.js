export const EXERCISE_LIBRARY = [
  { id: 'bench', name: 'Bench Press', category: 'Chest', unit: 'kg' },
  { id: 'squat', name: 'Squat', category: 'Legs', unit: 'kg' },
  { id: 'deadlift', name: 'Deadlift', category: 'Back', unit: 'kg' },
  { id: 'ohp', name: 'Overhead Press', category: 'Shoulders', unit: 'kg' },
  { id: 'row', name: 'Barbell Row', category: 'Back', unit: 'kg' },
  { id: 'pullup', name: 'Pull-up', category: 'Back', unit: 'reps' },
  { id: 'dip', name: 'Dip', category: 'Chest', unit: 'reps' },
  { id: 'curl', name: 'Bicep Curl', category: 'Arms', unit: 'kg' },
  { id: 'tricep', name: 'Tricep Pushdown', category: 'Arms', unit: 'kg' },
  { id: 'lunge', name: 'Lunge', category: 'Legs', unit: 'kg' },
  { id: 'legpress', name: 'Leg Press', category: 'Legs', unit: 'kg' },
  { id: 'calfr', name: 'Calf Raise', category: 'Legs', unit: 'kg' },
  { id: 'lateralr', name: 'Lateral Raise', category: 'Shoulders', unit: 'kg' },
  { id: 'plank', name: 'Plank', category: 'Core', unit: 'sec' },
  { id: 'crunch', name: 'Crunch', category: 'Core', unit: 'reps' },
  { id: 'run', name: 'Running', category: 'Cardio', unit: 'km' },
  { id: 'bike', name: 'Cycling', category: 'Cardio', unit: 'km' },
  { id: 'rowing', name: 'Rowing Machine', category: 'Cardio', unit: 'm' },
];

export const CATEGORIES = ['All', ...Array.from(new Set(EXERCISE_LIBRARY.map(e => e.category)))];
