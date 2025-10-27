import React, { useEffect, useState } from 'react';
import { MenuHome } from './components/MenuHome';
import { ManageMenu } from './components/ManageMenu';
import { FilterMenu } from './components/FilterMenu';
import { WelcomeSreen } from './components/WelcomeScreen';
import { BottomNavigation } from './components/BottomNavigation';
import { LoadingSpinner } from './components/LoadingSpinner';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: 'starter' | 'main' | 'dessert';
  price: number;
}

type Screen = 'welcome' | 'home' | 'manage' | 'filter';

const courses = [ 'starter', 'main', 'desserts'] as const;

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [isLoading, setLoading] = useState(true);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    //Placeholder data for view
    {
      id: '1',
      name: 'Truffle Arancini',
      description: 'Crispy risotto balls with black truffle and parmesan',
      course: 'starter',
      price: 85.50
    },
    {
      id: '2',
      name: 'Wagyu Beef Tenderloin',
      description: 'Grilled to perfection with seasonal vegetables and red wine',
      course: 'main',
      price: 245.00
    },
    {
      id: '3',
      name: 'Dark Chocolate Souffle',
      description: 'Rich chocolate souffle with vanilla bean ice cream',
      course:'main',
      price: 65.00
    }
  ]);

  useEffect(() => {
    const initializeApp = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setLoading(false);
    };

    initializeApp();
  }, []);

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: Date.now().toString(),
    };
    setMenuItems(prev => [...prev, newItem]);
  };

  const removeMenuItem = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeSreen onViewMenu={() => setCurrentScreen('home')} />;
      case 'home':
        return <MenuHome menuItems={menuItems}/>;
      case 'manage':
        return (
          <ManageMenu
            menuItems={menuItems}
            onAddItem={addMenuItem}
            onRemoveItem={removeMenuItem}
            courses={courses}
          />
        );
      case 'filter':
        return <FilterMenu menuItems={menuItems} courses={courses}/>;
      default:
        return <MenuHome menuItems={menuItems} />;
    }
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gray-50 flex flex-col'>
        <LoadingSpinner text="Loading Chef Christoffel's Menu..." />
      </div>
    );
  }

  //Welcome Screen
  if (currentScreen === 'welcome') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto">
        <main className="flex-1">
          {renderScreen()}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto relative">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 shadow-sm">
        <h1 className="text-center text-xl font-semibold text-primary">
          Chef Christoffel's Menu 
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-20">
        {renderScreen()}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation
        currentScreen={currentScreen}
        onScreenChange={setCurrentScreen}
      />
    </div>
  );
}

