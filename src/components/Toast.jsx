import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, show }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className={`
      fixed top-4 right-4 z-[9999]
      transform transition-all duration-300 ease-out
      ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
    `}>
      <div className={`
        rounded-lg shadow-xl p-4 min-w-[320px]
        ${type === 'success' 
          ? 'bg-green-100 border border-green-200 text-green-800' 
          : 'bg-red-100 border border-red-200 text-red-800'
        }
      `}>
        <div className="flex items-center gap-3">
          {type === 'success' ? (
            <CheckCircle className="w-6 h-6 text-green-600" />
          ) : (
            <XCircle className="w-6 h-6 text-red-600" />
          )}
          <p className="flex-1 font-medium">{message}</p>
          <button
            onClick={() => {
              setIsVisible(false);
              onClose();
            }}
            className="rounded-full hover:bg-black/5 p-1 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
