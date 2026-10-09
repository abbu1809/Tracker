import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '../../../components/ui/Badge';

export function RecentQuestionsList({ questions = [], onStatusChange }) {
  const recent = questions.slice(0, 5);

  return (
    <div className="bg-white border border-[#f0f0f0] rounded-3xl p-6 sm:p-7 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-[#141414] tracking-tight">Recent Activity.</h3>
          <p className="text-xs text-[#707070] mt-0.5">Recently logged and updated topics</p>
        </div>
        <Link
          to="/questions"
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#141414] hover:text-[#0066ff] transition-colors"
        >
          View all
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {recent.length === 0 ? (
        <div className="py-8 text-center text-xs text-[#adadad]">
          No questions logged yet.
        </div>
      ) : (
        <div className="divide-y divide-[#f0f0f0]">
          {recent.map((q) => (
            <div
              key={q.id}
              className="py-3.5 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
            >
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant={q.category}>{q.category}</Badge>
                  <Badge variant={q.difficulty}>{q.difficulty}</Badge>
                  <span className="text-[11px] text-[#adadad]">
                    {new Date(q.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <p className="text-sm font-semibold text-[#141414] truncate group-hover:text-[#0066ff] transition-colors">
                  {q.title}
                </p>
              </div>

              <div className="shrink-0 self-start sm:self-center">
                <select
                  value={q.status}
                  onChange={(e) => onStatusChange?.(q.id, e.target.value)}
                  aria-label={`Update status for ${q.title}`}
                  className="text-xs font-semibold py-1.5 px-3 rounded-full bg-[#f3f3f3] hover:bg-[#e8e8e8] text-[#141414] focus:outline-none focus:ring-1 focus:ring-[#141414] cursor-pointer"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
