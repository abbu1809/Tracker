import React, { useState } from 'react';
import { ExternalLink, Edit2, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '../../../components/ui/Badge';

export function QuestionCard({ question, onEdit, onDelete, onStatusChange }) {
  const [showNotes, setShowNotes] = useState(false);

  return (
    <div className="bg-white border border-[#f0f0f0] hover:border-[#e0e0e0] rounded-3xl p-5 sm:p-6 transition-all duration-150 flex flex-col justify-between">
      <div className="space-y-3.5">
        {/* Top Badges & Status Switcher */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant={question.category}>{question.category}</Badge>
            <Badge variant={question.difficulty}>{question.difficulty}</Badge>
            <Badge variant={question.status} showDot>
              {question.status}
            </Badge>
          </div>

          {/* Quick status dropdown */}
          <div className="flex items-center gap-1.5 shrink-0">
            <select
              value={question.status}
              onChange={(e) => onStatusChange(question.id, e.target.value)}
              aria-label={`Change status for ${question.title}`}
              className="text-xs font-semibold py-1.5 px-3 rounded-full bg-[#f3f3f3] hover:bg-[#e8e8e8] text-[#141414] focus:outline-none focus:ring-1 focus:ring-[#141414] cursor-pointer"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <button
              onClick={() => onEdit(question)}
              className="w-7 h-7 rounded-full bg-[#f3f3f3] hover:bg-[#e8e8e8] flex items-center justify-center text-[#707070] hover:text-[#141414] transition-colors cursor-pointer"
              title="Edit question"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                if (window.confirm(`Delete question: "${question.title}"?`)) {
                  onDelete(question.id);
                }
              }}
              className="w-7 h-7 rounded-full bg-[#fdf2f2] hover:bg-[#fde8e8] flex items-center justify-center text-[#d92d20] transition-colors cursor-pointer"
              title="Delete question"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Question Title */}
        <h3 className="text-base font-bold text-[#141414] leading-snug break-words">
          {question.title}
        </h3>
      </div>

      {/* Meta Footer & Collapsible Notes */}
      <div className="mt-5 pt-3.5 border-t border-[#f0f0f0] space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#707070]">
          <div className="flex items-center gap-3">
            {question.link && (
              <a
                href={question.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-[#0066ff] hover:underline"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Problem link
              </a>
            )}

            {question.notes && (
              <button
                onClick={() => setShowNotes(!showNotes)}
                className="inline-flex items-center gap-1 font-semibold text-[#141414] hover:text-[#0066ff] transition-colors cursor-pointer"
              >
                {showNotes ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                {showNotes ? 'Hide notes' : 'Notes'}
              </button>
            )}
          </div>

          <span className="text-[11px] text-[#adadad] font-medium">
            Added {new Date(question.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
          </span>
        </div>

        {/* Collapsible Notes panel */}
        {showNotes && question.notes && (
          <div className="p-3.5 rounded-2xl bg-[#f3f3f3] text-xs font-mono text-[#141414] leading-relaxed whitespace-pre-wrap animate-in fade-in duration-100">
            {question.notes}
          </div>
        )}
      </div>
    </div>
  );
}
