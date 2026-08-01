import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { Badge } from './Badge';

export const PageHeader = ({
  title,
  description,
  breadcrumbs = [],
  badge,
  actions,
  className = '',
}) => {
  return (
    <div className={`flex flex-col gap-3 pb-6 border-b border-slate-800/80 mb-6 ${className}`}>
      {/* Breadcrumbs Navigation */}
      {breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1.5 text-xs text-slate-400">
          <Link
            to="/overview"
            className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              {crumb.path ? (
                <Link
                  to={crumb.path}
                  className="hover:text-cyan-400 transition-colors font-medium"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-slate-200 font-medium">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      {/* Main Header Content */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 font-mono">
              {title}
            </h1>
            {badge && (
              <Badge variant={badge.variant || 'info'} glow>
                {badge.text}
              </Badge>
            )}
          </div>
          {description && (
            <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">{description}</p>
          )}
        </div>

        {/* Action Buttons */}
        {actions && (
          <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};
