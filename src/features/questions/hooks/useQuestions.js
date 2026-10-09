import { useQuestionsState } from '../state/QuestionsContext';

export function useQuestions() {
  return useQuestionsState();
}
