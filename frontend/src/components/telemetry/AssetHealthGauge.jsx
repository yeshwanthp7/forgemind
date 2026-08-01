import React from 'react';

export const AssetHealthGauge = ({ score = 85, label = "RUL Health Index" }) => {
  const radius = 52;
  const strokeWidth = 10;
  const normalizedRadius = radius - strokeWidth * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const colorClass =
    score > 80 ? '#10b981' : score > 50 ? '#f59e0b' : '#ef4444';

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative w-36 h-36 flex items-center justify-center">
        <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
          <circle
            stroke="#1e293b"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke={colorClass}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.8s ease-in-out' }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-extrabold tracking-tight text-white">{score}%</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Score</span>
        </div>
      </div>
      <span className="mt-2 text-xs font-semibold text-slate-300">{label}</span>
    </div>
  );
};
