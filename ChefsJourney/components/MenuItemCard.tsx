import React from "react";
import { MenuItem } from '../App';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Trash2 } from 'lucide-react';

interface MenuItemCardProps {
    item: MenuItem;
    onRemove?: (id: string) => void;
    showActions?: boolean;
    showCourse?: boolean;
}

export function MenuItemCard({
    item,
    onRemove,
    showActions = false,
    showCourse = true
}: MenuItemCardProps) {
    const CourseColors = {
        starter: "bg-red-100 text-red-800 border-red-200",
        main: "bg-gold-100 text-gold-800 border-gold-200",
        dessert: "bg-brown-100 text-brown-800 border-brown-200",
    };

    const handleRemove = () => {
        if (!onRemove) return;

        if (window.confirm('Are you sure you want to remove "${item.name}" from the menu?')) {
            onRemove(item.id);
        }
    };

    return(
        <Card className="p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    {showCourse && (
                        <Badge
                          variant="outline"
                          className={`text-xs capitalize ${CourseColors[item.course]}`}
                        >
                            {item.course}
                        </Badge>
                    )}
                </div>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {item.description}
                </p>
            </div>
            {showActions && onRemove && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRemove}
                  className="ml-2 h-8 w-8 p-0 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                >
                    <Trash2 size={14} />
                </Button>
            )}
          <div className="flex justify-end">
            <span className="text-lg font-semibold text-primary">
                R{item.price.toFixed(2)}
            </span>
          </div>
        </Card>
    );
}

