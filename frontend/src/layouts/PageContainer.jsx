import React from 'react';

export const PageContainer = ({
  children,
  maxWidth = 'max-w-7xl',
  className = '',
  fullWidth = false,
}) => {
  return (
    <div
      className={`w-full min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8 space-y-6 ${
        fullWidth ? '' : `${maxWidth} mx-auto`
      } ${className}`}
    >
      {children}
    </div>
  );
};
