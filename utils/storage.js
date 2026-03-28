import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'befit_v1';

export async function loadData() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { workouts: [] };
  } catch {
    return { workouts: [] };
  }
}

export function saveData(data) {
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
