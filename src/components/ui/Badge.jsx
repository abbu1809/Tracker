import React from 'react';

const VARIANT_MAP = {
  // Statuses
  Completed: 'bg-[#edfcf2] text-[#0e7039] border border-[#d3f8df]',
  'In Progress': 'bg-[#fef8e7] text-[#935b0d] border border-[#feecba]',
  Pending: 'bg-[#f3f3f3] text-[#707070] border border-[#e5e5e5]',

  // Difficulties
  Easy: 'bg-[#f3f3f3] text-[#141414] border border-[#e5e5e5]',
  Medium: 'bg-[#f3f3f3] text-[#141414] border border-[#e5e5e5]',
  Hard: 'bg-[#141414] text-white border border-[#141414]',

  // Categories
  DSA: 'bg-[#f3f3f3] text-[#141414] border border-[#e5e5e5]',
  Git: 'bg-[#f3f3f3] text-[#141414] border border-[#e5e5e5]',
  Technical: 'bg-[#f3f3f3] text-[#141414] border border-[#e5e5e5]',
  'Machine Coding': 'bg-[#f3f3f3] text-[#141414] border border-[#e5e5e5]',

  // Special accent badge (like badge-popular)
  Popular: 'bg-[#0066ff] text-white border border-[#0066ff]',
  default: 'bg-[#f3f3f3] text-[#707070] border border-[#e5e5e5]',
};

export function Badge({ children, variant, showDot = false, className = '' }) {
  const badgeStyle = VARIANT_MAP[variant] || VARIANT_MAP.default;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold tracking-tight ${badgeStyle} ${className}`}
    >
      {showDot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            variant === 'Completed'
              ? 'bg-[#0e7039]'
              : variant === 'In Progress'
              ? 'bg-[#935b0d]'
              : 'bg-[#adadad]'
          }`}
        />
      )}
      {children}
    </span>
  );
}
