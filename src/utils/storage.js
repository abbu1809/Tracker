const STORAGE_KEY = 'interview_prep_tracker_v1';

export const loadFromStorage = (fallbackData = []) => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveToStorage(fallbackData);
      return fallbackData;
    }
    return JSON.parse(raw);
  } catch (error) {
    console.error('Failed to load questions from localStorage:', error);
    return fallbackData;
  }
};

export const saveToStorage = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save questions to localStorage:', error);
  }
};

export const clearStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear localStorage:', error);
  }
};
