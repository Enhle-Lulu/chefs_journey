import React from "react";

interface LoadingSpinnerProps {
    text?: string;
}

export function LoadingSpinner({ text = 'Loading...'}: LoadingSpinnerProps) {
    return(
        <div className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            {text && (
                <p className="text-gray-600 text-center">{text}</p>
            )}
        </div>
    );
}