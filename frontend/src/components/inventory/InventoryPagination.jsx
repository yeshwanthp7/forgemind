import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const InventoryPagination = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange
}) => {
  if (totalItems === 0) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
      {/* Items Range Summary */}
      <div className="text-slate-400">
        Showing <span className="font-bold text-slate-100">{startItem}</span> to{' '}
        <span className="font-bold text-slate-100">{endItem}</span> of{' '}
        <span className="font-bold text-cyan-400">{totalItems}</span> machines
      </div>

      {/* Page Size & Controls */}
      <div className="flex items-center gap-4">
        {/* Page Size Selector */}
        <div className="flex items-center gap-2 text-slate-400">
          <span>Rows:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-slate-200 focus:outline-none"
          >
            <option value={8}>8</option>
            <option value={12}>12</option>
            <option value={24}>24</option>
          </select>
        </div>

        {/* Page Numbers & Nav Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="p-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 disabled:opacity-40 text-slate-300 border border-slate-800 transition"
            title="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {[...Array(totalPages)].map((_, idx) => {
            const page = idx + 1;
            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`w-7 h-7 rounded-lg font-bold transition text-xs ${
                  currentPage === page
                    ? 'bg-cyan-500 text-slate-950 shadow-md'
                    : 'bg-slate-950 hover:bg-slate-800 text-slate-400 border border-slate-800'
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="p-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 disabled:opacity-40 text-slate-300 border border-slate-800 transition"
            title="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
