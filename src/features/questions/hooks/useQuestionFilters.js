import { useState, useMemo } from 'react';

export function useQuestionFilters(questions) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'oldest' | 'difficulty' | 'title'

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      // Search matching title or notes
      const matchesSearch =
        !searchQuery.trim() ||
        q.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        (q.notes && q.notes.toLowerCase().includes(searchQuery.toLowerCase().trim()));

      // Category matching
      const matchesCategory =
        selectedCategory === 'ALL' || q.category === selectedCategory;

      // Difficulty matching
      const matchesDifficulty =
        selectedDifficulty === 'ALL' || q.difficulty === selectedDifficulty;

      // Status matching
      const matchesStatus =
        selectedStatus === 'ALL' || q.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesDifficulty && matchesStatus;
    }).sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortBy === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'difficulty') {
        const order = { Easy: 1, Medium: 2, Hard: 3 };
        return (order[a.difficulty] || 0) - (order[b.difficulty] || 0);
      }
      return 0;
    });
  }, [questions, searchQuery, selectedCategory, selectedDifficulty, selectedStatus, sortBy]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'ALL' ||
    selectedDifficulty !== 'ALL' ||
    selectedStatus !== 'ALL';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
    setSelectedDifficulty('ALL');
    setSelectedStatus('ALL');
    setSortBy('newest');
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedDifficulty,
    setSelectedDifficulty,
    selectedStatus,
    setSelectedStatus,
    sortBy,
    setSortBy,
    filteredQuestions,
    hasActiveFilters,
    resetFilters,
  };
}
