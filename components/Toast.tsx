// Toast Notification Component
// QRT Innovation Team - titanXboarPRIME

import React, { useEffect } from 'react';

export interface ToastProps {
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, duration = 4000, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ',
    };

    const colors = {
        success: 'bg-green-500/20 border-green-500 text-green-400',
        error: 'bg-red-500/20 border-red-500 text-red-400',
        warning: 'bg-yellow-500/20 border-yellow-500 text-yellow-400',
        info: 'bg-blue-500/20 border-blue-500 text-blue-400',
    };

    return (
        <div className="fixed top-4 right-4 z-50 animate-slide-down">
            <div className={`${colors[type]} border rounded-lg p-4 min-w-[300px] max-w-md shadow-lg backdrop-blur-sm`}>
                <div className="flex items-start gap-3">
                    <span className="text-xl flex-shrink-0">{icons[type]}</span>
                    <p className="flex-1 text-sm font-medium">{message}</p>
                    <button
                        onClick={onClose}
                        className="flex-shrink-0 hover:opacity-70 transition-opacity"
                    >
                        ✕
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Toast;
