import { useUIStore } from '@/stores/uiStore';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useEffect } from 'react';

const toastIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const toastStyles = {
  success: 'bg-success/10 border-success text-success',
  error: 'bg-danger/10 border-danger text-danger',
  warning: 'bg-warning/10 border-warning text-warning',
  info: 'bg-primary/10 border-primary text-primary',
};

export function ToastContainer() {
  const { toasts, removeToast } = useUIStore();

  return (
    <div className="fixed top-20 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => {
        const Icon = toastIcons[toast.type];
        return (
          <div
            key={toast.id}
            className={cn(
              'pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-lg border shadow-lg',
              'min-w-[300px] max-w-md animate-in slide-in-from-right',
              toastStyles[toast.type]
            )}
          >
            <Icon size={20} className="shrink-0 mt-0.5" />
            <div className="flex-1 text-sm font-medium">
              {toast.message}
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="shrink-0 hover:opacity-70 transition-opacity"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
