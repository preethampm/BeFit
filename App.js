import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import { colors, MAX_WIDTH } from './constants/theme';
import { loadData, saveData } from './utils/storage';
import BottomTabBar from './components/BottomTabBar';
import LogScreen from './screens/LogScreen';
import HistoryScreen from './screens/HistoryScreen';
import ProgressScreen from './screens/ProgressScreen';
import LibraryScreen from './screens/LibraryScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState('log');
  const [data, setData] = useState({ workouts: [] });
  const [isLoading, setIsLoading] = useState(true);

  const [selectedExercise, setSelectedExercise] = useState(null);
  const [sets, setSets] = useState([{ reps: '', weight: '' }]);
  const [note, setNote] = useState('');
  const [logSuccess, setLogSuccess] = useState(false);

  useEffect(() => {
    async function init() {
      const loaded = await loadData();
      setData(loaded);
      setIsLoading(false);
    }
    init();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveData(data);
    }
  }, [data, isLoading]);

  function logWorkout() {
    if (!selectedExercise) return;
    const validSets = sets.filter(s => s.reps !== '');
    if (validSets.length === 0) return;
    const entry = {
      id: Date.now(),
      date: new Date().toISOString(),
      exId: selectedExercise.id,
      sets: validSets,
      note,
    };
    setData(d => ({ ...d, workouts: [entry, ...d.workouts] }));
    setSelectedExercise(null);
    setSets([{ reps: '', weight: '' }]);
    setNote('');
    setLogSuccess(true);
    setTimeout(() => setLogSuccess(false), 2000);
  }

  function deleteWorkout(id) {
    setData(d => ({ ...d, workouts: d.workouts.filter(w => w.id !== id) }));
  }

  function handleSelectExercise(exercise) {
    setSelectedExercise(exercise);
    setActiveTab('log');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          <View style={styles.content}>
            {activeTab === 'log' && (
              <LogScreen
                onLogWorkout={logWorkout}
                selectedExercise={selectedExercise}
                setSelectedExercise={setSelectedExercise}
                sets={sets}
                setSets={setSets}
                note={note}
                setNote={setNote}
                logSuccess={logSuccess}
              />
            )}
            {activeTab === 'history' && (
              <HistoryScreen
                workouts={data.workouts}
                onDelete={deleteWorkout}
              />
            )}
            {activeTab === 'progress' && (
              <ProgressScreen
                workouts={data.workouts}
              />
            )}
            {activeTab === 'library' && (
              <LibraryScreen
                onSelectExercise={handleSelectExercise}
              />
            )}
          </View>
          <BottomTabBar activeTab={activeTab} onTabChange={setActiveTab} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
    maxWidth: MAX_WIDTH,
    alignSelf: 'center',
    width: '100%',
  },
  content: {
    flex: 1,
  },
});
