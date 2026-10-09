import { loadFromStorage, saveToStorage } from '../../../utils/storage';
import { INITIAL_QUESTIONS } from '../../../utils/sampleData';

export const questionsApi = {
  getAll: () => {
    return loadFromStorage(INITIAL_QUESTIONS);
  },

  create: (newQuestion) => {
    const list = loadFromStorage(INITIAL_QUESTIONS);
    const item = {
      id: `q-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      createdAt: new Date().toISOString(),
      completedAt: newQuestion.status === 'Completed' ? new Date().toISOString() : null,
      ...newQuestion,
    };
    const updated = [item, ...list];
    saveToStorage(updated);
    return { item, list: updated };
  },

  update: (id, updates) => {
    const list = loadFromStorage(INITIAL_QUESTIONS);
    const updated = list.map((q) => {
      if (q.id === id) {
        const isNowCompleted = updates.status === 'Completed' && q.status !== 'Completed';
        const isNoLongerCompleted = updates.status && updates.status !== 'Completed' && q.status === 'Completed';

        return {
          ...q,
          ...updates,
          completedAt: isNowCompleted
            ? new Date().toISOString()
            : isNoLongerCompleted
            ? null
            : q.completedAt,
        };
      }
      return q;
    });
    saveToStorage(updated);
    return updated;
  },

  delete: (id) => {
    const list = loadFromStorage(INITIAL_QUESTIONS);
    const updated = list.filter((q) => q.id !== id);
    saveToStorage(updated);
    return updated;
  },

  resetToDefault: () => {
    saveToStorage(INITIAL_QUESTIONS);
    return INITIAL_QUESTIONS;
  },

  clearAll: () => {
    saveToStorage([]);
    return [];
  }
};
