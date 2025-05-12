import React from 'react';

export default function Heading({ children }: { children: React.ReactNode }) {
    return (
        <h1 className="text-2xl md:text-3xl font-bold text-gray-600 tracking-tight border-b border-gray-200 pb-2 mb-6 animate-fadeIn">
            {children}
        </h1>
    );
}
