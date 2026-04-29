'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    
    setTimeout(() => {
      removeToast(id);
    }, toast.duration || 3000);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};

// --- COMPONENTS ---

function ToastContainer({ toasts, removeToast }: { toasts: Toast[]; removeToast: (id: string) => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: () => void }) {
  const styles: Record<ToastType, string> = {
    success: 'text-sh border-sh/30 bg-sh/10',
    error: 'text-hcm border-hcm/30 bg-hcm/10',
    warning: 'text-hba border-hba/30 bg-hba/10',
    info: 'text-hcc border-hcc/30 bg-hcc/10',
  };

  const icons: Record<ToastType, string> = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <div 
      className={`
        pointer-events-auto min-w-[300px] max-w-[400px] p-4 rounded-2xl border backdrop-blur-xl
        flex items-center gap-4 shadow-2xl animate-in slide-in-from-right-10 duration-300
        ${styles[toast.type]}
      `}
    >
      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold">
        {icons[toast.type]}
      </div>
      <div className="flex-1 text-sm font-bold tracking-tight">
        {toast.message}
      </div>
      <button onClick={onRemove} className="opacity-50 hover:opacity-100 transition-opacity p-1">
        ✕
      </button>
    </div>
  );
}
