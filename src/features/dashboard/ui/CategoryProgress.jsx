import React from 'react';
import { Code2, GitBranch, Layers, Laptop } from 'lucide-react';

export function CategoryProgress({ stats }) {
  const items = [
    {
      name: 'DSA Problems',
      icon: Code2,
      completed: stats.dsa.completed,
      total: stats.dsa.total,
    },
    {
      name: 'Git Workflows',
      icon: GitBranch,
      completed: stats.interview.git.completed,
      total: stats.interview.git.total,
    },
    {
      name: 'Technical Concepts',
      icon: Layers,
      completed: stats.interview.technical.completed,
      total: stats.interview.technical.total,
    },
    {
      name: 'Machine Coding',
      icon: Laptop,
      completed: stats.machineCoding.completed,
      total: stats.machineCoding.total,
    },
  ];

  return (
    <div className="bg-white border border-[#f0f0f0] rounded-3xl p-6 sm:p-7 space-y-12">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-[#141414] tracking-tight">Category Breakdown.</h3>
          <p className="text-xs text-[#707070] mt-0.5">Progress across core preparation tracks</p>
        </div>
        <span className="text-xs font-semibold text-[#707070] bg-[#f3f3f3] px-3 py-1 rounded-full">
          Weekly Target
        </span>
      </div>

      <div className="space-y-4 pt-1">
        {items.map((item) => {
          const Icon = item.icon;
          const percentage = item.total > 0 ? Math.round((item.completed / item.total) * 100) : 0;

          return (
            <div key={item.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-[#f3f3f3] text-[#141414] flex items-center justify-center squircle-icon">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-semibold text-[#141414]">{item.name}</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium text-[#707070]">
                  <span className="font-bold text-[#141414]">{item.completed}</span>
                  <span>/</span>
                  <span>{item.total}</span>
                  <span className="text-[#adadad] font-normal">({percentage}%)</span>
                </div>
              </div>

              <div className="h-1.5 w-full bg-[#f0f0f0] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#141414] rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
