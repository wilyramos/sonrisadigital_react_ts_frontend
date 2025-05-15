import React from 'react';

export default function Heading({ children }: { children: React.ReactNode }) {
    return (
        <h1 className="text-lg md:text-xl font-bold text-gray-600 border-b border-gray-200 pb-1 ">
            {children}
        </h1>
    );
}
