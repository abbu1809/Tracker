import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Menu,
  X,
  Plus,
  Compass,
} from 'lucide-react';
import { useQuestions } from '../features/questions/hooks/useQuestions';
import { QuestionFormModal } from '../features/questions/ui/QuestionFormModal';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { questions, addQuestion } = useQuestions();

  const completedCount = questions.filter((q) => q.status === 'Completed').length;
  const totalCount = questions.length;

  const navLinks = [
    { to: '/', label: 'Dashboard' },
    { to: '/questions', label: 'Questions' },
    { to: '/machine-coding', label: 'Machine Coding' },
  ];

  return (
    <>
      {/* Topbar: Mobbin-style Floating Stadium Nav-Pill */}
      <header className="sticky top-0 z-40 w-full pt-3 sm:pt-4 px-4 sm:px-6 pointer-events-none">
        <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
          {/* Main Floating Stadium Bar */}
          <div className="w-full bg-[#f3f3f3] border border-[#e0e0e0] rounded-full px-3 sm:px-4 py-2 flex items-center justify-between shadow-xs">
            {/* Left: 30% Squircle Logo + Wordmark */}
            <NavLink to="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-8 h-8 bg-[#141414] text-white flex items-center justify-center font-bold text-sm squircle-icon group-hover:scale-105 transition-transform">
                <Compass className="w-4 h-4" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-bold text-sm tracking-tight text-[#141414]">
                  Interview Tracker
                </span>
                <span className="hidden lg:inline text-[11px] font-medium text-[#707070]">
                  • Weekly Prep
                </span>
              </div>
            </NavLink>

            {/* Center: Segmented Navigation Control */}
            <nav className="hidden md:flex items-center p-0.5 bg-[#e5e5e5] rounded-full">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-150 ${
                      isActive
                        ? 'bg-white text-[#141414] shadow-xs'
                        : 'text-[#707070] hover:text-[#141414]'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* Right: Counter Pill + Primary CTA Button */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#e0e0e0] rounded-full text-xs font-semibold text-[#141414]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066ff]" />
                <span>
                  {completedCount}/{totalCount}
                </span>
                <span className="text-[#707070] font-normal">Solved</span>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="h-8 px-3.5 sm:px-4 text-xs font-semibold bg-[#141414] text-white hover:bg-[#262626] rounded-full inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New</span>
              </button>

              {/* Mobile menu toggle button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-8 h-8 rounded-full bg-white border border-[#e0e0e0] flex items-center justify-center text-[#141414] hover:bg-[#e5e5e5] transition-colors"
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="max-w-6xl mx-auto mt-2 pointer-events-auto md:hidden">
            <div className="bg-[#f3f3f3] border border-[#e0e0e0] rounded-2xl p-3 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-150">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-2 text-xs font-semibold rounded-xl transition-colors ${
                      isActive
                        ? 'bg-white text-[#141414]'
                        : 'text-[#707070] hover:text-[#141414] hover:bg-[#e8e8e8]'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
              <div className="pt-2 border-t border-[#e0e0e0] flex items-center justify-between text-xs px-2 text-[#707070]">
                <span>Progress:</span>
                <span className="font-bold text-[#141414]">
                  {completedCount} of {totalCount} solved
                </span>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Quick Add Modal */}
      <QuestionFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitQuestion={addQuestion}
      />
    </>
  );
}
