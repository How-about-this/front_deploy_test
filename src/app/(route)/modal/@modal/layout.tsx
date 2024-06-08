"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const ModalLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();

    const closeModal = () => {
        router.back();
    };

    useEffect(() => {
        const handleEscape = (event: any) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                {children}
                <button onClick={closeModal} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg">Close</button>
            </div>
        </div>
    );
};

export default ModalLayout;
