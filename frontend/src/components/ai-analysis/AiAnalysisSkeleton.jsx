import React from 'react';

export const AiAnalysisSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Top Banner Skeleton */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 h-28 flex justify-between items-center">
        <div className="space-y-3 w-2/3">
          <div className="h-4 w-44 bg-slate-800 rounded-lg" />
          <div className="h-7 w-96 bg-slate-800 rounded-xl" />
          <div className="h-3 w-80 bg-slate-800/60 rounded-lg" />
        </div>
        <div className="flex gap-3">
          <div className="h-10 w-32 bg-slate-800 rounded-xl" />
          <div className="h-10 w-36 bg-slate-800 rounded-xl" />
        </div>
      </div>

      {/* Hero Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 h-80 bg-slate-900/80 border border-slate-800 rounded-3xl" />
        <div className="lg:col-span-7 grid grid-cols-2 gap-4">
          <div className="h-40 bg-slate-900/80 border border-slate-800 rounded-2xl" />
          <div className="h-40 bg-slate-900/80 border border-slate-800 rounded-2xl" />
          <div className="h-36 bg-slate-900/80 border border-slate-800 rounded-2xl" />
          <div className="h-36 bg-slate-900/80 border border-slate-800 rounded-2xl" />
        </div>
      </div>

      {/* 3 Intelligence Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-36 bg-slate-900/80 border border-slate-800 rounded-2xl" />
        ))}
      </div>
    </div>
  );
};
