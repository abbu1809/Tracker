import React, { useState } from 'react';
import { Laptop, Plus, ExternalLink, Trash2 } from 'lucide-react';
import { useQuestions } from '../../questions/hooks/useQuestions';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { QuestionFormModal } from '../../questions/ui/QuestionFormModal';

export function MachineCodingPage() {
  const { questions, addQuestion, updateQuestion, deleteQuestion, toggleStatus } = useQuestions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const machineCodingQuestions = questions.filter((q) => q.category === 'Machine Coding');
  const completed = machineCodingQuestions.filter((q) => q.status === 'Completed').length;
  const inProgress = machineCodingQuestions.filter((q) => q.status === 'In Progress').length;
  const pending = machineCodingQuestions.filter((q) => q.status === 'Pending').length;
  const total = machineCodingQuestions.length;
  const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const handleOpenAdd = () => {
    setEditingItem({
      category: 'Machine Coding',
      difficulty: 'Medium',
      status: 'Pending',
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = (data) => {
    if (editingItem && editingItem.id) {
      updateQuestion(editingItem.id, data);
    } else {
      addQuestion({ ...data, category: 'Machine Coding' });
    }
  };

  return (
    <div className="space-y-8 sm:space-y-10 animate-in fade-in duration-200">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#141414] tracking-tight leading-none">
              Machine Coding Rounds.
            </h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#f3f3f3] text-[#141414] border border-[#e0e0e0]">
              Frontend
            </span>
          </div>
          <p className="text-sm font-normal text-[#707070] max-w-2xl leading-relaxed">
            Build production-ready frontend components, debounce/throttles, infinite scroll, and mini-applications.
          </p>
        </div>

        <Button variant="primary" onClick={handleOpenAdd} icon={Plus}>
          Add Challenge
        </Button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#f0f0f0] rounded-3xl p-5 sm:p-6">
          <span className="text-xs font-semibold text-[#707070]">Total Challenges</span>
          <p className="text-3xl sm:text-4xl font-bold text-[#141414] tracking-tight mt-1">{total}</p>
          <p className="text-xs text-[#707070] mt-2">{pending} pending</p>
        </div>
        <div className="bg-white border border-[#f0f0f0] rounded-3xl p-5 sm:p-6">
          <span className="text-xs font-semibold text-[#707070]">Completed</span>
          <p className="text-3xl sm:text-4xl font-bold text-[#0e7039] tracking-tight mt-1">{completed}</p>
          <p className="text-xs text-[#0e7039] font-medium mt-2">Ready for review</p>
        </div>
        <div className="bg-white border border-[#f0f0f0] rounded-3xl p-5 sm:p-6">
          <span className="text-xs font-semibold text-[#707070]">In Progress</span>
          <p className="text-3xl sm:text-4xl font-bold text-[#935b0d] tracking-tight mt-1">{inProgress}</p>
          <p className="text-xs text-[#935b0d] font-medium mt-2">Active development</p>
        </div>
        <div className="bg-white border border-[#f0f0f0] rounded-3xl p-5 sm:p-6">
          <span className="text-xs font-semibold text-[#707070]">Completion Rate</span>
          <p className="text-3xl sm:text-4xl font-bold text-[#141414] tracking-tight mt-1">{rate}%</p>
          <div className="h-1.5 w-full bg-[#f0f0f0] rounded-full overflow-hidden mt-3">
            <div
              className="h-full bg-[#141414] rounded-full transition-all duration-300"
              style={{ width: `${rate}%` }}
            />
          </div>
        </div>
      </div>

      {/* Challenges Grid */}
      {machineCodingQuestions.length === 0 ? (
        <div className="bg-[#f3f3f3] rounded-3xl p-10 sm:p-14 text-center space-y-4 max-w-lg mx-auto">
          <div className="w-12 h-12 mx-auto bg-white rounded-full flex items-center justify-center text-[#141414] border border-[#e0e0e0]">
            <Laptop className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[#141414]">No machine coding challenges yet.</h3>
            <p className="text-xs text-[#707070] leading-relaxed max-w-sm mx-auto">
              Add common frontend interview components such as Autocomplete, Infinite Scroll, Star Rating, or Modal Manager.
            </p>
          </div>
          <div className="pt-2">
            <Button variant="primary" onClick={handleOpenAdd} icon={Plus}>
              Add First Challenge
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {machineCodingQuestions.map((q) => (
            <div
              key={q.id}
              className="bg-white border border-[#f0f0f0] hover:border-[#e0e0e0] rounded-3xl p-5 sm:p-6 transition-all duration-150 flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-1.5">
                    <Badge variant={q.difficulty}>{q.difficulty}</Badge>
                    <Badge variant={q.status} showDot>
                      {q.status}
                    </Badge>
                  </div>

                  <select
                    value={q.status}
                    onChange={(e) => toggleStatus(q.id, e.target.value)}
                    aria-label={`Change status for ${q.title}`}
                    className="text-xs font-semibold py-1.5 px-3 rounded-full bg-[#f3f3f3] hover:bg-[#e8e8e8] text-[#141414] focus:outline-none focus:ring-1 focus:ring-[#141414] cursor-pointer"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <h3 className="text-base font-bold text-[#141414] leading-snug">
                  {q.title}
                </h3>

                {q.notes && (
                  <div className="p-3.5 rounded-2xl bg-[#f3f3f3] text-xs font-mono text-[#141414] leading-relaxed whitespace-pre-wrap">
                    {q.notes}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-[#707070] pt-3.5 mt-4 border-t border-[#f0f0f0]">
                <span className="text-[11px] text-[#adadad]">Added {new Date(q.createdAt).toLocaleDateString()}</span>
                <div className="flex items-center gap-3">
                  {q.link && (
                    <a
                      href={q.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0066ff] font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Preview
                    </a>
                  )}
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete challenge: "${q.title}"?`)) {
                        deleteQuestion(q.id);
                      }
                    }}
                    className="w-7 h-7 rounded-full bg-[#fdf2f2] hover:bg-[#fde8e8] flex items-center justify-center text-[#d92d20] transition-colors cursor-pointer"
                    title="Delete challenge"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <QuestionFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitQuestion={handleFormSubmit}
        initialData={editingItem}
      />
    </div>
  );
}
