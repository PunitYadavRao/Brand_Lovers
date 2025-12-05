import React, { useEffect } from 'react';
import { cn } from '@/utils/utils';


const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    footer,
    size = 'md',
    className = '',
}) => {

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);


    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
    };

    return (
        <div className="fixed inset-0 z-[var(--z-modal)] overflow-y-auto">

            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity animate-fadeIn"
                onClick={onClose}
            />


            <div className="flex min-h-full items-center justify-center p-4">
                <div
                    className={cn(
                        'relative bg-white rounded-lg shadow-xl w-full animate-scaleIn',
                        sizes[size],
                        className
                    )}
                    onClick={(e) => e.stopPropagation()}
                >

                    {title && (
                        <div className="flex items-center justify-between p-6 border-b">
                            <h3 className="text-xl font-semibold">{title}</h3>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    )}


                    <div className="p-6">
                        {children}
                    </div>


                    {footer && (
                        <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50 rounded-b-lg">
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
