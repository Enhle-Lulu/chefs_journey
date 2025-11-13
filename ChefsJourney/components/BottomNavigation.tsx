import React from "react";

type Screen = 'home' | 'manage' | 'filter' ;

interface BottomNavigationProps {
    currentScreen: Screen;
    onScreenChange: (screen: Screen) => void;
}

export function BottomNavigation({ currentScreen, onScreenChange }: BottomNavigationProps) {
    const tabs = [
        { id: 'home' as Screen, label: 'Menu', icon: '🏠'},
        { id: 'manage' as Screen, label: 'Manage', icon: '⚙️'},
        { id: 'filter' as Screen, label: 'Filter', icon: '🔍 '},
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 px-2 py-2 shadow-lg">
           <div className="flex justify-around">
            {tabs.map(tab => (
                <button
                key={tab.id}
                onClick={() => onScreenChange(tab.id)}
                className={`flex flex-col items-center px-4 py-2 rounded-lg transition-all duration-200${
                    currentScreen === tab.id
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
                >
                    <span className={`text-lg mb-1 transition-transform duration-200${
                        currentScreen === tab.id ? 'scale-110' : ''
                    }`}>
                        {tab.icon}
                    </span>
                    <span className="text-xs font-medium">{tab.label}</span>
                </button>
            ))}
            </div> 
        </nav>
    );
}