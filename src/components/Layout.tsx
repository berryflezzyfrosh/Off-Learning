import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Award, FileText, Menu, X, Wifi, WifiOff } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Certificates', href: '/certificates', icon: Award },
    { name: 'Resources', href: '/resources', icon: FileText },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Online/Offline indicator */}
      <div className={`fixed top-0 left-0 right-0 z-50 p-2 text-center text-sm ${
        isOnline ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      }`}>
        <div className="flex items-center justify-center">
          {isOnline ? <Wifi size={16} className="mr-2" /> : <WifiOff size={16} className="mr-2" />}
          {isOnline ? 'Online - All features available' : 'Offline - Using cached content'}
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-12 left-4 z-40">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md bg-white shadow-md hover:bg-gray-50 transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`} style={{ top: '40px' }}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 px-4 bg-primary-600">
            <BookOpen className="w-8 h-8 text-white mr-2" />
            <h1 className="text-xl font-bold text-white">LearnCode</h1>
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-200">
                        <div className="text-xs text-gray-500 text-center">
              <div className="mb-2">
                <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                  <div className="bg-primary-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <span>Overall Progress: 0%</span>
              </div>
              <div>Offline Learning App v1.0</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          style={{ top: '40px' }}
        />
      )}

      {/* Main content */}
      <div className="lg:pl-64" style={{ paddingTop: '40px' }}>
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
