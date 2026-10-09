import React, { createContext, useContext, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { questionsApi } from '../api/questionsApi';

const QuestionsContext = createContext(null);

export function QuestionsProvider({ children }) {
  const [questions, setQuestions] = useState(() => questionsApi.getAll());
  const [isLoaded] = useState(true);

  const triggerCelebration = useCallback(() => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#4f46e5', '#10b981', '#f59e0b', '#ec4899'],
    });
  }, []);

  const addQuestion = useCallback((questionData) => {
    const { list } = questionsApi.create(questionData);
    setQuestions(list);
    if (questionData.status === 'Completed') {
      triggerCelebration();
    }
  }, [triggerCelebration]);

  const updateQuestion = useCallback((id, updates) => {
    const updated = questionsApi.update(id, updates);
    setQuestions(updated);
    if (updates.status === 'Completed') {
      triggerCelebration();
    }
  }, [triggerCelebration]);

  const deleteQuestion = useCallback((id) => {
    const updated = questionsApi.delete(id);
    setQuestions(updated);
  }, []);

  const toggleStatus = useCallback((id, newStatus) => {
    const updated = questionsApi.update(id, { status: newStatus });
    setQuestions(updated);
    if (newStatus === 'Completed') {
      triggerCelebration();
    }
  }, [triggerCelebration]);

  const resetToDefault = useCallback(() => {
    const defaults = questionsApi.resetToDefault();
    setQuestions(defaults);
  }, []);

  const clearAll = useCallback(() => {
    const empty = questionsApi.clearAll();
    setQuestions(empty);
  }, []);

  const value = {
    questions,
    isLoaded,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    toggleStatus,
    resetToDefault,
    clearAll,
  };

  return (
    <QuestionsContext.Provider value={value}>
      {children}
    </QuestionsContext.Provider>
  );
}

export function useQuestionsState() {
  const context = useContext(QuestionsContext);
  if (!context) {
    throw new Error('useQuestionsState must be used within a QuestionsProvider');
  }
  return context;
}
