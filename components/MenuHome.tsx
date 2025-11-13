import React from "react";
import { MenuItem } from '../App';
import { MenuItemCard } from './MenuItemCard';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface MenuHomeProps {
    menuItems: MenuItem[];
}

export function MenuHome({ menuItems}: MenuHomeProps) {
    const totalItems = menuItems.length;

    // Calculates stats for each course
    const calculateAverage = (items: MenuItem[]) => {
        if (items.length === 0) return 0;
        return items.reduce((sum, item) => sum + item.price, 0) / items.length;
    };

    const groupedItems = {
        starter: menuItems.filter(item => item.course === 'starter'),
        main: menuItems.filter(item => item.course === 'main'),
        dessert: menuItems.filter(item => item.course === 'dessert'),
    };

    const starterAvg = calculateAverage(groupedItems.starter);
    const mainAvg = calculateAverage(groupedItems.main);
    const dessertAvg = calculateAverage(groupedItems.dessert);

    if (totalItems === 0) {
        return(
            <div className="p-4">
                <Card className="p-6 text-center">
                    <h3 className="mb-2">No Menu Items Yet</h3>
                    <p className="text-muted-foreground">
                        Go to Manage tab to add your first menu item.
                    </p>
                </Card>
            </div>
        );
    }

    return (
        <div className="p-4 space-y-4 max-h-screen overflow-y-auto">
            {/* Stats Card */}
            <Card className="p-4">
                <h3 className="mb-4">Menu Overview</h3>

                <div className="flex justify-between items-center mb-4">
                    <span>Total Items</span>
                    <Badge variant="secondary">{totalItems}</Badge>
                </div>

                <div className="space-y-2">
                    <h4 className="text-sm font-medium">Average Prices by Course:</h4>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="text-center p-3 bg-red-50 rounded-lg border">
                            <div className="text-red-700 font-medium">Starters</div>
                            <div className="text-lg font-semibold text-green-800">R{starterAvg.toFixed(2)}</div>
                            <div className="text-xs text-red-600">({groupedItems.starter.length} items)</div>
                        </div>
                        <div className="text-center p-3 bg-gold-50 rounded-lg border">
                            <div className="text-gold-700 font-medium">Mains</div>
                            <div className="text-1g font-semibold text-gold-800">R{mainAvg.toFixed(2)}</div>
                            <div className="text-xs text-gold-600">({groupedItems.main.length})</div>
                        </div>
                        <div className="text-center p-3 bg-brown-50 rounded-1g border">
                            <div className="text-brown-700 font-medium">Mains</div>
                            <div className="text-lg font-semibold tect-brown-800">R{dessertAvg.toFixed(2)}</div>
                            <div className="text-xs text-brown-600">({groupedItems.dessert.length})</div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Menu Sections */}
            {Object.entries(groupedItems).map(([course, items]) => (
                items.length > 0 && (
                    <div key={course} className="space-y-3">
                        <h3 className="font-semibold text-lg capitalize">{course}</h3>
                        <div>
                            {items.map(item =>(
                                <MenuItemCard
                                  key={item.id}
                                  item={item}
                                  showActions={false}
                                  showCourse={false}
                                />
                            ))}
                        </div>
                    </div>
                )
            ))}
        </div>
    );
}