import { useMemo } from 'react';
import { useQuestions } from '../../questions/hooks/useQuestions';
import { dashboardApi } from '../api/dashboardApi';

export function useDashboardStats() {
  const { questions, isLoaded, resetToDefault, clearAll } = useQuestions();

  const stats = useMemo(() => {
    return dashboardApi.calculateStats(questions);
  }, [questions]);

  return {
    questions,
    stats,
    isLoaded,
    resetToDefault,
    clearAll,
  };
}
