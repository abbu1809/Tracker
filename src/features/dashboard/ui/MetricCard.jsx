import React from 'react';

export function MetricCard({
  title,
  value,
  subvalue,
  icon: Icon,
  progress,
  badgeText,
}) {
  return (
    <div className="bg-white border border-[#f0f0f0] hover:border-[#e0e0e0] rounded-3xl p-5 sm:p-6 transition-all duration-150 flex flex-col justify-between">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-[#707070] tracking-tight">{title}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-bold text-[#141414] tracking-tight leading-none">
              {value}
            </span>
            {subvalue && (
              <span className="text-xs font-medium text-[#707070]">
                {subvalue}
              </span>
            )}
          </div>
        </div>

        {Icon && (
          <div className="w-9 h-9 bg-[#f3f3f3] text-[#141414] flex items-center justify-center squircle-icon shrink-0">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="mt-5 pt-3.5 border-t border-[#f0f0f0]">
        {typeof progress === 'number' ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-medium text-[#707070]">
              <span>Completion</span>
              <span className="font-semibold text-[#141414]">{progress}%</span>
            </div>
            <div className="h-1.5 w-full bg-[#f0f0f0] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#141414] rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              />
            </div>
          </div>
        ) : badgeText ? (
          <div className="text-xs font-medium text-[#707070]">
            {badgeText}
          </div>
        ) : null}
      </div>
    </div>
  );
}
