import React from "react";
import { ChefHat, Utensils } from "lucide-react-native";

interface WelcomeScreenProps {
    onViewMenu: () => void;
}

export function WelcomeSreen({ onViewMenu }: WelcomeScreenProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-full px-6 py-8 text-center">
            {/* Hero Icon */}
            <div className="mb-8">
                <div className="bg-primary rounded-full p-6 mb-4 mx-auto w-24 h-24 flex items-center justify-center">
                    <ChefHat size="w-12 h-12 text-primary-foreground"/>
                </div>
            </div>

            {/* Welcome Screen Content */}
            <div className="mb-12">
                <h1 className="text-3x1 mb-4 text-primary">
                    Welcome to Chef's Journey
                </h1>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                    Experience personalised culinary artistry with carefully crafted dishes designed to create unforgettable dinig experiences
                </p>
            </div>

            {/* Feature highlights */}
            <div className="space-y-3 mb-8">
                <div className="flex items-center justify-center gap-3 text-muted-foreground">
                    <Utensils size="w-4 h-4"/>
                    <span>Artisanal Cuisine</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-muted-foreground">
                    <ChefHat size="w-4 h-4"/>
                    <span>Personal Chef Experience</span>
                </div>
            </div>

            {/* Call to Action */}
            <div className="w-full max-w-xs">
                <button
                  onClick={onViewMenu}
                  className="w-full bg-primary text-primary-foreground py-4 px-6 rounded-1g shadow-sm active:scale-95 transition-transform duration-150"
                >
                    View Menu
                </button>
            </div>

            {/* Decor */}
            <div className="mt-12 text-muted-foreground">
                <div className="w-12 h-px bg-border mx-auto"></div>
            </div>
        </div>
    );
}