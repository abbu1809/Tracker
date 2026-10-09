import React, { useState } from 'react';
import {
  BookOpen,
  Code2,
  GitPullRequest,
  Laptop,
  Plus,
  RotateCcw,
} from 'lucide-react';
import { useDashboardStats } from '../hooks/useDashboardStats';
import { useQuestions } from '../../questions/hooks/useQuestions';
import { MetricCard } from './MetricCard';
import { ProgressRing } from './ProgressRing';
import { CategoryProgress } from './CategoryProgress';
import { RecentQuestionsList } from './RecentQuestionsList';
import { QuestionFormModal } from '../../questions/ui/QuestionFormModal';
import { Button } from '../../../components/ui/Button';

export function DashboardPage() {
  const { stats, questions, resetToDefault } = useDashboardStats();
  const { addQuestion, toggleStatus } = useQuestions();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-8 sm:space-y-10 animate-in fade-in duration-200">
      {/* Editorial Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#141414] tracking-tight leading-none">
              Interview Practice Tracker.
            </h1>
            <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#edfcf2] text-[#0e7039] border border-[#d3f8df]">
              Live
            </span>
          </div>
          <p className="text-sm font-normal text-[#707070] max-w-2xl leading-relaxed">
            A gallery-clean dashboard to systematically track weekly DSA problems, Git workflows, technical concepts, and machine-coding challenges.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-end shrink-0">
          <Button
            variant="outline"
            onClick={resetToDefault}
            icon={RotateCcw}
            className="text-xs"
            title="Restore default demo questions"
          >
            Reset Demo
          </Button>

          <Button
            variant="primary"
            onClick={() => setIsModalOpen(true)}
            icon={Plus}
          >
            Add Question
          </Button>
        </div>
      </div>

      {/* Rearranged Hero Section: Progress Feature Card + 2x2 Metric Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left: Featured Progress Overview Card (Soft Canvas Fill) */}
        <div className="lg:col-span-5 bg-[#f3f3f3] rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#707070]">
                Overall Completion
              </span>
              <span className="w-2 h-2 rounded-full bg-[#0066ff]" />
            </div>
            <h2 className="text-2xl font-bold text-[#141414] tracking-tight mt-1">
              Weekly Progress.
            </h2>
            <p className="text-xs text-[#707070] mt-1">
              Real-time completion percentage calculated across all stored interview questions.
            </p>
          </div>

          {/* Central Donut */}
          <div className="py-6 flex items-center justify-center">
            <ProgressRing percentage={stats.completionRate} size={150} strokeWidth={11} />
          </div>

          {/* 3 Metric Pills */}
          <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-[#e0e0e0] text-center">
            <div className="p-3 rounded-2xl bg-white border border-[#e0e0e0]">
              <span className="block text-[11px] font-semibold text-[#707070]">Solved</span>
              <span className="text-lg font-bold text-[#0e7039] leading-tight">
                {stats.completed}
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-[#e0e0e0]">
              <span className="block text-[11px] font-semibold text-[#707070]">Active</span>
              <span className="text-lg font-bold text-[#935b0d] leading-tight">
                {stats.inProgress}
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-[#e0e0e0]">
              <span className="block text-[11px] font-semibold text-[#707070]">Pending</span>
              <span className="text-lg font-bold text-[#141414] leading-tight">
                {stats.pending}
              </span>
            </div>
          </div>
        </div>

        {/* Right: 2x2 Primary KPI Matrix */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Card 1: Total Questions */}
          <MetricCard
            title="Total Questions"
            value={stats.total}
            subvalue={`${stats.completed} solved`}
            icon={BookOpen}
            badgeText={`${stats.inProgress} active · ${stats.pending} pending`}
          />

          {/* Card 2: Completed DSA Problems */}
          <MetricCard
            title="DSA Problems"
            value={stats.dsa.completed}
            subvalue={`of ${stats.dsa.total}`}
            icon={Code2}
            progress={stats.dsa.rate}
          />

          {/* Card 3: Completed Interview Questions (Git + Technical) */}
          <MetricCard
            title="Interview Questions"
            value={stats.interview.completed}
            subvalue={`of ${stats.interview.total}`}
            icon={GitPullRequest}
            progress={stats.interview.rate}
          />

          {/* Card 4: Machine-Coding Status */}
          <MetricCard
            title="Machine-Coding"
            value={`${stats.machineCoding.completed}/${stats.machineCoding.total}`}
            subvalue="completed"
            icon={Laptop}
            progress={stats.machineCoding.rate}
          />
        </div>
      </div>

      {/* Row 2: Category Breakdown + Difficulty Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Category Progress Breakdown */}
        <div className="lg:col-span-7">
          <CategoryProgress stats={stats} />
        </div>

        {/* Difficulty Matrix + Machine Coding Status */}
        <div className="lg:col-span-5 bg-white border border-[#f0f0f0] rounded-3xl p-6 sm:p-7 space-y-5">
          <div>
            <h3 className="text-base font-bold text-[#141414] tracking-tight">Difficulty Matrix.</h3>
            <p className="text-xs text-[#707070] mt-0.5">Problem completion grouped by difficulty</p>
          </div>

          <div className="space-y-2.5">
            {/* Easy */}
            <div className="p-3.5 rounded-2xl bg-[#f3f3f3] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#141414]" />
                <span className="font-semibold text-[#141414]">Easy</span>
              </div>
              <span className="font-bold text-[#141414]">
                {stats.difficulty.easy.completed} / {stats.difficulty.easy.total} solved
              </span>
            </div>

            {/* Medium */}
            <div className="p-3.5 rounded-2xl bg-[#f3f3f3] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#707070]" />
                <span className="font-semibold text-[#141414]">Medium</span>
              </div>
              <span className="font-bold text-[#141414]">
                {stats.difficulty.medium.completed} / {stats.difficulty.medium.total} solved
              </span>
            </div>

            {/* Hard */}
            <div className="p-3.5 rounded-2xl bg-[#f3f3f3] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0066ff]" />
                <span className="font-semibold text-[#141414]">Hard</span>
              </div>
              <span className="font-bold text-[#141414]">
                {stats.difficulty.hard.completed} / {stats.difficulty.hard.total} solved
              </span>
            </div>
          </div>

          {/* Machine-coding status summary box */}
          <div className="p-4 rounded-2xl bg-[#f3f3f3] text-xs text-[#141414] space-y-1">
            <span className="font-bold flex items-center gap-1.5">
              <Laptop className="w-3.5 h-3.5 text-[#141414]" /> Machine Coding Status:
            </span>
            <p className="text-[#707070] leading-relaxed">
              {stats.machineCoding.completed} solved · {stats.machineCoding.inProgress} in development · {stats.machineCoding.pending} queued.
            </p>
          </div>
        </div>
      </div>

      {/* Row 3: Full-Width Recent Activity */}
      <div>
        <RecentQuestionsList questions={questions} onStatusChange={toggleStatus} />
      </div>

      {/* Add / Edit Question Modal */}
      <QuestionFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitQuestion={addQuestion}
      />
    </div>
  );
}
