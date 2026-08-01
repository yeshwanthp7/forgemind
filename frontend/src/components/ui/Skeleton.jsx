import React from 'react';

export const Skeleton = ({
  variant = 'text',
  width,
  height,
  circle = false,
  className = '',
  count = 1,
}) => {
  const baseStyle = 'bg-slate-800/80 animate-pulse rounded-lg';

  const variantStyles = {
    text: 'h-4 w-full',
    title: 'h-6 w-3/4 mb-2',
    avatar: 'h-10 w-10 rounded-full',
    card: 'h-44 w-full rounded-xl',
    tableRow: 'h-12 w-full',
    custom: '',
  };

  const styleProps = {};
  if (width) styleProps.width = width;
  if (height) styleProps.height = height;

  const renderSkeletonItem = (index) => (
    <div
      key={index}
      style={styleProps}
      className={`${baseStyle} ${circle ? 'rounded-full' : ''} ${
        variantStyles[variant] || variantStyles.text
      } ${className}`}
    />
  );

  if (count > 1) {
    return (
      <div className="space-y-2.5 w-full">
        {Array.from({ length: count }).map((_, i) => renderSkeletonItem(i))}
      </div>
    );
  }

  return renderSkeletonItem(0);
};

export const SkeletonCard = ({ className = '' }) => (
  <div className={`p-5 rounded-xl border border-slate-800 bg-slate-900/50 space-y-4 ${className}`}>
    <div className="flex items-center gap-3">
      <Skeleton variant="avatar" />
      <div className="space-y-1.5 grow">
        <Skeleton variant="title" width="60%" />
        <Skeleton variant="text" width="40%" />
      </div>
    </div>
    <Skeleton variant="text" count={2} />
    <div className="pt-2 flex items-center justify-between">
      <Skeleton variant="text" width="25%" />
      <Skeleton variant="text" width="20%" />
    </div>
  </div>
);
