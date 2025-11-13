import React, { useState } from 'react';
import { MenuItem } from '../App';
import { MenuItemCard } from './MenuItemCard';
import { Card } from './ui/card';
import { Button} from './ui/button';
import { Badge } from './ui/badge';

interface FilterMenuProps {
    menuItems: MenuItem[];
    courses: readonly string[];
}

export function FilterMenu({ menuItems, courses }: FilterMenuProps) {
    const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

    const filteredItems = selectedCourse
    ? menuItems.filter(item => item.course === selectedCourse)
    : menuItems;

    const getItemCountByCourse = (course: string) => {
        return menuItems.filter(item => item.course === course).length;
    };

    return (
        <div className='p-4 space-y-4 max-h-screen overflow-y-auto'>
            {/* Header */}
            <Card className="p-4">
                <h3 className='mb-3'>Guest Menu</h3>
                <p className="text-sm text-muted-foreground">
                    Filter the menu by course to see specific dishes.
                </p>
            </Card>

            {/*Filtered Controls */}
            <Card className="p-4">
                <h4 className="mb-3 font-medium">Filter by Course</h4>
                <div className='flex flex-wrap gap-2'>
                    <Button 
                      variant={selectedCourse === null ? 'default' : 'outline'}
                      size= "sm"
                      onClick={() => setSelectedCourse(null)}
                      className="flex items-center gap-2"
                    >
                        All Items
                        <Badge variant="secondary" className="ml-1">
                            {menuItems.length}
                        </Badge>  
                    </Button>
                    {courses.map(course => (
                        <Button
                          key={course}
                          variant={selectedCourse === course ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedCourse(course)}
                          className="flex items-center gap-2 capitalize"
                        >
                            {course}s
                            <Badge variant="secondary" className="ml-1">
                                {getItemCountByCourse(course)}
                            </Badge>
                        </Button>
                    ))}
                </div>
            </Card>

            {/* Filtered Results */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold">
                        {selectedCourse
                          ? `${selectedCourse.charAt(0).toUpperCase() + selectedCourse.slice(1)}s`
                          : 'All Menu Items'
                        }
                    </h3>
                    <Badge variant="outline">
                        {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}
                    </Badge>
                </div>

                { filteredItems.length === 0 ? (
                    <Card className="p-6 text-center">
                        <p className="text-muted-foreground">
                            {selectedCourse
                              ? `No ${selectedCourse}s available yet.`
                              : 'No menu items available yet.'
                            }
                        </p>
                    </Card>
                ) : (
                    <div>
                        {filteredItems.map(item => (
                            <MenuItemCard
                              key={item.id}
                              item={item}
                              showActions={false}
                              showCourse={selectedCourse === null}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}