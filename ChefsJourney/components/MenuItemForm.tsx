import React, { useState } from "react";
import { MenuItem } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface MenuItemFormProps {
    onSubmit: (item: Omit<MenuItem, 'id'>) => void;
    courses: readonly string[];
}

export function MenuItemForm({onSubmit, courses }: MenuItemFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        course: '' as 'starter' | 'main' | 'desserts' | '',
        price: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Dish name is required';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }

        if (!formData.course.trim()) {
            newErrors.course = 'Please select a course';
        }

        if (!formData.price.trim()) {
            newErrors.price = 'Price is required';
        } else {
            const priceNum = parseFloat(formData.price);
            if (isNaN(priceNum) || priceNum <= 0) {
                newErrors.price = 'Please enter a valid price';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        onSubmit({
            name: formData.name.trim(),
            description: formData.description.trim(),
            course: formData.course as 'starter' | 'main' | 'dessert',
            price: parseFloat(formData.price)
        });

        //Reset form
        setFormData ({
            name: '',
            description: '',
            course: '',
            price: '',
        });
        setErrors({});
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({...prev, [field]: value}));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({...prev, [field]: ''}));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Dish Name */}
            <div className="space-y-2">
                <Label htmlFor="name"> Dish Name *</Label>
                <Input
                  id= "name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter dish name..."
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                    <p className="text-sm text-red-500">{errors.name}</p>
                )}
            </div>

            {/* Description */}
            <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Input
                  id= "description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the dish..."
                  className={errors.description ? 'border-red-500' : ''}
                />
                {errors.description && (
                    <p className="text-sm text-red-500">{errors.description}</p>
                )}
            </div>

            {/* Course Selector */}
            <div className="space-y-2">
                <Label>Course *</Label>
                <Select
                  value={formData.course}
                  onValueChange={(value: string) => handleInputChange('course', value)}
                >
                    <SelectTrigger className={errors.course ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select a course..."/>
                    </SelectTrigger>
                    <SelectContent>
                        {courses.map(course => (
                            <SelectItem key={course} value={course} className="capitalize">
                                {course.charAt(0).toUpperCase() + course.slice(1)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.course && (
                    <p className="text-sm text-red-500">{errors.course}</p>
                )}
            </div>

            {/* Price */}
            <div className="space-y-2">
                <Label htmlFor="price">Price (R) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder= "0.00"
                  className={errors.description ? 'border-red-500' : ''}
                />
                {errors.price && (
                    <p className="text-sm text-red-500">{errors.price}</p>
                )}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
                Add Menu Item
            </Button>
        </form>
    );
}