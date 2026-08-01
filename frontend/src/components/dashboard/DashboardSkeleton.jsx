import React from 'react';

export const DashboardSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Top Banner Skeleton */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 h-28 flex justify-between items-center">
        <div className="space-y-3 w-2/3">
          <div className="h-4 w-40 bg-slate-800 rounded-lg" />
          <div className="h-7 w-96 bg-slate-800 rounded-xl" />
          <div className="h-3 w-80 bg-slate-800/60 rounded-lg" />
        </div>
        <div className="flex gap-3">
          <div className="h-10 w-32 bg-slate-800 rounded-xl" />
          <div className="h-10 w-36 bg-slate-800 rounded-xl" />
        </div>
      </div>

      {/* 6 Stats Skeleton Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-3">
            <div className="flex justify-between items-center">
              <div className="h-3 w-20 bg-slate-800 rounded" />
              <div className="w-8 h-8 rounded-xl bg-slate-800" />
            </div>
            <div className="h-8 w-16 bg-slate-800 rounded-lg" />
            <div className="h-3 w-24 bg-slate-800/60 rounded" />
          </div>
        ))}
      </div>

      {/* 4 Charts Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center">
              <div className="h-4 w-44 bg-slate-800 rounded" />
              <div className="h-3 w-20 bg-slate-800/60 rounded" />
            </div>
            <div className="h-64 w-full bg-slate-950/60 rounded-xl border border-slate-800/50 flex items-center justify-center">
              <div className="text-xs font-mono text-slate-600">LOADING ANALYTICS STREAM...</div>
            </div>
          </div>
        ))}
      </div>

      {/* Table & Alerts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="h-5 w-48 bg-slate-800 rounded" />
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 w-full bg-slate-950/60 rounded-xl border border-slate-800/40" />
            ))}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="h-5 w-40 bg-slate-800 rounded" />
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 w-full bg-slate-950/60 rounded-xl border border-slate-800/40" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
