'use client';

import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[ErrorBoundary] Caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0d0f14] flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full animate-in fade-in zoom-in duration-500">
            <div className="text-6xl mb-6">⚠️</div>
            <h2 className="font-display text-2xl font-bold text-white mb-2 tracking-tight">
              Interface Sync Error
            </h2>
            <p className="text-sm text-muted mb-8 leading-relaxed">
              {this.state.error?.message || 'An unexpected error occurred in the component tree.'}
              <br />
              Please try refreshing the dashboard.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-4 rounded-2xl bg-hcc text-[#0d0f14] font-black text-sm uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all shadow-xl shadow-hcc/10"
            >
              Restart Dashboard
            </button>
            <p className="mt-6 text-[10px] text-muted font-bold uppercase tracking-widest opacity-50">
              Technical details logged to system console
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
