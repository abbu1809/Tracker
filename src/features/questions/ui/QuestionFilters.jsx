import React from 'react';
import { Search, X, RotateCcw } from 'lucide-react';
import { CATEGORIES, DIFFICULTIES, STATUSES } from '../../../utils/sampleData';

export function QuestionFilters({
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
  hasActiveFilters,
  resetFilters,
  totalResults,
}) {
  return (
    <div className="bg-white border border-[#f0f0f0] rounded-3xl p-5 sm:p-6 space-y-4">
      {/* Top Search & Sort Row */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#707070]">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search problems, topics, notes, or algorithms..."
            className="w-full rounded-2xl bg-[#f0f0f0] border-2 border-transparent pl-11 pr-9 py-2.5 text-sm font-medium text-[#141414] placeholder-[#adadad] transition-all focus:bg-white focus:border-[#141414] focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#707070] hover:text-[#141414] transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <label htmlFor="sort-select" className="text-xs font-semibold text-[#707070] whitespace-nowrap">
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-full bg-[#f3f3f3] hover:bg-[#e8e8e8] border border-[#e0e0e0] px-3.5 py-1.5 text-xs font-semibold text-[#141414] focus:outline-none focus:ring-1 focus:ring-[#141414] cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="difficulty">Difficulty (Easy → Hard)</option>
            <option value="title">Alphabetical (A - Z)</option>
          </select>
        </div>
      </div>

      {/* Segmented Filter Controls Row */}
      <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#f0f0f0]">
        {/* Category Segmented Control */}
        <div className="flex flex-wrap p-1 bg-[#f3f3f3] rounded-full gap-1">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3.5 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              selectedCategory === 'ALL'
                ? 'bg-white text-[#141414] shadow-xs'
                : 'text-[#707070] hover:text-[#141414]'
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white text-[#141414] shadow-xs'
                  : 'text-[#707070] hover:text-[#141414]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Difficulty Pill Select */}
        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          aria-label="Filter by Difficulty"
          className="rounded-full bg-white border border-[#e0e0e0] px-3.5 py-1.5 text-xs font-semibold text-[#141414] hover:bg-[#f3f3f3] focus:outline-none focus:ring-1 focus:ring-[#141414] cursor-pointer"
        >
          <option value="ALL">Difficulty: All</option>
          {DIFFICULTIES.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        {/* Status Pill Select */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          aria-label="Filter by Status"
          className="rounded-full bg-white border border-[#e0e0e0] px-3.5 py-1.5 text-xs font-semibold text-[#141414] hover:bg-[#f3f3f3] focus:outline-none focus:ring-1 focus:ring-[#141414] cursor-pointer"
        >
          <option value="ALL">Status: All</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        {/* Clear Filters Pill */}
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#707070] hover:text-[#141414] bg-[#f3f3f3] hover:bg-[#e5e5e5] px-3 py-1.5 rounded-full transition-colors ml-auto cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Reset filters
          </button>
        )}
      </div>

      {/* Result Indicator */}
      <div className="flex items-center justify-between text-xs text-[#707070] pt-0.5">
        <span>
          Showing <span className="font-bold text-[#141414]">{totalResults}</span> question
          {totalResults === 1 ? '' : 's'}
        </span>
      </div>
    </div>
  );
}
