import React from 'react';

export function ProgressRing({ percentage = 0, size = 140, strokeWidth = 10 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedPercentage = Math.min(100, Math.max(0, percentage));
  const strokeDashoffset = circumference - (clampedPercentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Subtle background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e0e0e0"
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Ink stroke */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#141414"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-500 ease-out"
        />
      </svg>

      {/* Center percentage indicator */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-3xl font-black text-[#141414] tracking-tight leading-none">
          {clampedPercentage}%
        </span>
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#707070] mt-1">
          Complete
        </span>
      </div>
    </div>
  );
}
