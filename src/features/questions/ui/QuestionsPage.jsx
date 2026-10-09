import React, { useState } from 'react';
import { Plus, LayoutGrid, Table as TableIcon } from 'lucide-react';
import { useQuestions } from '../hooks/useQuestions';
import { useQuestionFilters } from '../hooks/useQuestionFilters';
import { QuestionFilters } from './QuestionFilters';
import { QuestionCard } from './QuestionCard';
import { QuestionTable } from './QuestionTable';
import { QuestionFormModal } from './QuestionFormModal';
import { EmptyState } from './EmptyState';
import { Button } from '../../../components/ui/Button';

export function QuestionsPage() {
  const {
    questions,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    toggleStatus,
    resetToDefault,
  } = useQuestions();

  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  const {
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
  } = useQuestionFilters(questions);

  const handleOpenAdd = () => {
    setEditingQuestion(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (q) => {
    setEditingQuestion(q);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (data) => {
    if (editingQuestion) {
      updateQuestion(editingQuestion.id, data);
    } else {
      addQuestion(data);
    }
  };

  return (
    <div className="space-y-8 sm:space-y-10 animate-in fade-in duration-200">
      {/* Editorial Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2">
        <div className="space-y-1.5">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#141414] tracking-tight leading-none">
            Question Tracker.
          </h1>
          <p className="text-sm font-normal text-[#707070] max-w-2xl leading-relaxed">
            Curate and monitor your interview practice problems with categorized filters, difficulty tags, and active progress tracking.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-end shrink-0">
          {/* Segmented View Toggle Pill */}
          <div className="inline-flex rounded-full bg-[#f3f3f3] p-1 border border-[#e0e0e0]">
            <button
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
              className={`p-1.5 rounded-full transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-[#141414] shadow-xs'
                  : 'text-[#707070] hover:text-[#141414]'
              }`}
              title="Card View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              aria-label="Table view"
              className={`p-1.5 rounded-full transition-all cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-[#141414] shadow-xs'
                  : 'text-[#707070] hover:text-[#141414]'
              }`}
              title="Table View"
            >
              <TableIcon className="w-4 h-4" />
            </button>
          </div>

          <Button variant="primary" onClick={handleOpenAdd} icon={Plus}>
            Add Question
          </Button>
        </div>
      </div>

      {/* Filter Toolbar */}
      {questions.length > 0 && (
        <QuestionFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          sortBy={sortBy}
          setSortBy={setSortBy}
          hasActiveFilters={hasActiveFilters}
          resetFilters={resetFilters}
          totalResults={filteredQuestions.length}
        />
      )}

      {/* Questions list or empty states */}
      {questions.length === 0 ? (
        <EmptyState
          type="empty"
          onAddQuestion={handleOpenAdd}
          onSeedData={resetToDefault}
        />
      ) : filteredQuestions.length === 0 ? (
        <EmptyState
          type="no-results"
          onResetFilters={resetFilters}
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              onEdit={handleOpenEdit}
              onDelete={deleteQuestion}
              onStatusChange={toggleStatus}
            />
          ))}
        </div>
      ) : (
        <QuestionTable
          questions={filteredQuestions}
          onEdit={handleOpenEdit}
          onDelete={deleteQuestion}
          onStatusChange={toggleStatus}
        />
      )}

      {/* Form Modal */}
      <QuestionFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitQuestion={handleFormSubmit}
        initialData={editingQuestion}
      />
    </div>
  );
}
