import React from 'react';
import { BookOpen, SearchX, Plus, RotateCcw, Sparkles } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

export function EmptyState({ type = 'empty', onAddQuestion, onResetFilters, onSeedData }) {
  if (type === 'no-results') {
    return (
      <div className="bg-[#f3f3f3] rounded-3xl p-10 sm:p-14 text-center space-y-4 max-w-lg mx-auto">
        <div className="w-12 h-12 mx-auto bg-white rounded-full flex items-center justify-center text-[#707070] border border-[#e0e0e0]">
          <SearchX className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold text-[#141414]">No matching questions.</h3>
          <p className="text-xs text-[#707070] leading-relaxed max-w-sm mx-auto">
            We couldn't find any questions matching your current filters or search terms. Try clearing them to see all topics.
          </p>
        </div>
        {onResetFilters && (
          <div className="pt-2">
            <Button variant="outline" onClick={onResetFilters} icon={RotateCcw}>
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-[#f3f3f3] rounded-3xl p-10 sm:p-14 text-center space-y-4 max-w-lg mx-auto">
      <div className="w-12 h-12 mx-auto bg-white rounded-full flex items-center justify-center text-[#141414] border border-[#e0e0e0]">
        <BookOpen className="w-5 h-5" />
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-bold text-[#141414]">Your tracker is empty.</h3>
        <p className="text-xs text-[#707070] leading-relaxed max-w-sm mx-auto">
          Start logging your weekly DSA problems, Git techniques, and Technical interview topics to build momentum.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
        {onAddQuestion && (
          <Button variant="primary" onClick={onAddQuestion} icon={Plus}>
            Add First Question
          </Button>
        )}
        {onSeedData && (
          <Button variant="outline" onClick={onSeedData} icon={Sparkles}>
            Load Demo Questions
          </Button>
        )}
      </div>
    </div>
  );
}
