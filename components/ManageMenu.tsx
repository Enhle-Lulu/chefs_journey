import React, { useState } from 'react';
import { MenuItem } from '../App';
import {MenuItemForm} from './MenuItemForm'
import { MenuItemCard } from './MenuItemCard';
import { Card } from './ui/card';
import { Button} from './ui/button';
import { Plus, X} from 'lucide-react';

interface ManageMenuProps {
    menuItems: MenuItem[]
    onAddItem: (item: Omit<MenuItem, 'id'>) => void;
    onRemoveItem: (id: string) => void;
    courses: readonly string[];
}

export function ManageMenu({ menuItems, onAddItem, onRemoveItem, courses }: ManageMenuProps) {
    const [showAddForm, setShowAddForm] = useState(false);

    const handleAddItem = (item: Omit<MenuItem, 'id'>) => {
        onAddItem(item);
        setShowAddForm(false);
    };

    return (
        <div className="p-4 space-y-4 max-h-screen overflow-y-auto">
            {/* Add New Item Button */}
            <Button
              onClick={() => setShowAddForm(true)}
              className="w-full h-12 flex items-center justify-center gap-2"
              size="lg"
            >
                <Plus size={20}/>
                Add New Menu Item
            </Button>

            {/* Add Item Form */}
            {showAddForm && (
                <Card className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3>Add New Menu Item</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowAddForm(false)}
                        >
                            <X size={16}/>
                        </Button>
                    </div>
                    <MenuItemForm
                      onSubmit={handleAddItem}
                      courses={courses}
                    />
                </Card>
            )}

            {/* Current Menu Items */}
            <div className="space-y-4">
                <h3 className="font-semibold">
                    Current Menu Items ({menuItems.length})
                </h3>
                {menuItems.length === 0 ? (
                    <Card className="p-6 text-center">
                        <p className="text-muted-foreground">
                            No menu item yet. Add your first item above.
                        </p>
                    </Card>
                ) : (
                    <div>
                        {menuItems.map(item => (
                            <MenuItemCard
                              key={item.id}
                              item={item}
                              onRemove={onRemoveItem}
                              showActions={true}
                              showCourse={true}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}