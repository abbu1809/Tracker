import React from 'react';
import { ExternalLink, Edit2, Trash2 } from 'lucide-react';
import { Badge } from '../../../components/ui/Badge';

export function QuestionTable({ questions, onEdit, onDelete, onStatusChange }) {
  return (
    <div className="bg-white border border-[#f0f0f0] rounded-3xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#f0f0f0] bg-[#f3f3f3] text-[11px] font-bold text-[#707070] uppercase tracking-wider">
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 min-w-[260px]">Question Title</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Difficulty</th>
              <th className="py-3 px-4">Resource</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f0f0] text-xs">
            {questions.map((q) => (
              <tr key={q.id} className="hover:bg-[#f3f3f3]/60 transition-colors">
                {/* Status Column */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <select
                    value={q.status}
                    onChange={(e) => onStatusChange(q.id, e.target.value)}
                    aria-label={`Change status for ${q.title}`}
                    className="text-xs font-semibold py-1 px-3 rounded-full bg-[#f3f3f3] text-[#141414] hover:bg-[#e8e8e8] focus:outline-none focus:ring-1 focus:ring-[#141414] cursor-pointer"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>

                {/* Title and notes */}
                <td className="py-3.5 px-4">
                  <div className="font-bold text-[#141414] leading-snug">{q.title}</div>
                  {q.notes && (
                    <div className="text-[11px] text-[#707070] line-clamp-1 mt-0.5">{q.notes}</div>
                  )}
                </td>

                {/* Category */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <Badge variant={q.category}>{q.category}</Badge>
                </td>

                {/* Difficulty */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <Badge variant={q.difficulty}>{q.difficulty}</Badge>
                </td>

                {/* Link */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  {q.link ? (
                    <a
                      href={q.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-[#0066ff] hover:underline"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Link
                    </a>
                  ) : (
                    <span className="text-[#adadad]">—</span>
                  )}
                </td>

                {/* Actions */}
                <td className="py-3.5 px-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onEdit(q)}
                      className="w-7 h-7 rounded-full bg-[#f3f3f3] hover:bg-[#e8e8e8] flex items-center justify-center text-[#707070] hover:text-[#141414] transition-colors cursor-pointer"
                      title="Edit question"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete question: "${q.title}"?`)) {
                          onDelete(q.id);
                        }
                      }}
                      className="w-7 h-7 rounded-full bg-[#fdf2f2] hover:bg-[#fde8e8] flex items-center justify-center text-[#d92d20] transition-colors cursor-pointer"
                      title="Delete question"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
