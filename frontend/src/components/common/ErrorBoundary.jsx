import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Sentinel UI Error Boundary Caught:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] w-full flex items-center justify-center p-6 bg-slate-950 text-slate-100 font-mono">
          <div className="max-w-md w-full p-6 rounded-2xl bg-slate-900 border border-rose-500/40 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center mx-auto text-rose-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Application Exception Intercepted</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {this.state.error?.message || 'A runtime rendering exception occurred in the component tree.'}
            </p>
            <button
              onClick={this.handleReset}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-2 mx-auto transition shadow-lg shadow-rose-500/20"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reload Application Core</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
