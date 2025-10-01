'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon,
  HomeIcon,
  UsersIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  PresentationChartLineIcon,
  ArrowPathIcon,
  TagIcon,
  ArrowTrendingUpIcon,
  ArrowRightOnRectangleIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Welcome Center', href: '/', icon: <TagIcon className="w-5 h-5" /> },
  { name: 'Home', href: '/home', icon: <HomeIcon className="w-5 h-5" /> },
  { name: 'Directory', href: '/directory', icon: <UsersIcon className="w-5 h-5" /> },
  { name: 'People', href: '/people', icon: <UserGroupIcon className="w-5 h-5" /> },
  { name: 'Org Chart 3.0', href: '/org-chart3', icon: <PresentationChartLineIcon className="w-5 h-5" /> },
  { name: 'Org Chart 4.0', href: '/org-chart4', icon: <PresentationChartLineIcon className="w-5 h-5" /> },
  { name: 'Org Agent', href: '/org_agent', icon: <PresentationChartLineIcon className="w-5 h-5" /> },
  { name: 'Reports', href: '/reports', icon: <ArrowTrendingUpIcon className="w-5 h-5" /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile sidebar when navigating
  useEffect(() => {
    if (isMobile) {
      setMobileOpen(false);
    }
  }, [pathname, isMobile]);

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  // Calculate sidebar width based on state
  const sidebarWidth = collapsed ? 'w-20' : 'w-64';
  const mobileClass = isMobile ? (mobileOpen ? 'translate-x-0' : '-translate-x-full') : '';

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && mobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile toggle button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-30 bg-white p-2 rounded-md shadow-md text-gray-700 hover:bg-gray-100 transition-colors"
        >
          {mobileOpen ? (
            <ChevronLeftIcon className="w-5 h-5" />
          ) : (
            <ChevronRightIcon className="w-5 h-5" />
          )}
        </button>
      )}

      {/* Sidebar */}
      <div 
        className={`h-screen flex flex-col border-r border-orange-50 transition-all duration-300 ${
          collapsed && !isMobile ? 'w-20' : 'w-64'
        } ${
          isMobile ? 'fixed z-40 bg-gradient-to-b from-orange-25 to-white shadow-xl' : 'relative'
        } ${
          isMobile && !mobileOpen ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        {/* Overlay for mobile */}
        {isMobile && mobileOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={toggleSidebar}
          ></div>
        )}
        
        {/* Sidebar content */}
        <div className="flex-1 flex flex-col bg-gradient-to-b from-orange-25 to-white shadow-sm overflow-y-auto">
          <div className="flex-1 flex flex-col h-full">
            {/* Header */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-orange-50">
              {!collapsed && (
                <span className="text-xl font-quicksand font-medium text-orange-600 tracking-wide">mappin</span>
              )}
              {collapsed && !isMobile && (
                <span className="text-xl font-quicksand font-medium mx-auto text-orange-600">m</span>
              )}
              {!isMobile && (
                <button 
                  onClick={toggleSidebar}
                  className="p-1 rounded-md text-gray-500 hover:bg-gray-200 transition-colors"
                >
                  {collapsed ? (
                    <ChevronRightIcon className="w-5 h-5" />
                  ) : (
                    <ChevronLeftIcon className="w-5 h-5" />
                  )}
                </button>
              )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group ${
                      isActive 
                        ? 'bg-orange-50 text-orange-700' 
                        : 'text-gray-600 hover:bg-orange-25 hover:text-orange-600'
                    } ${collapsed && !isMobile ? 'justify-center' : ''}`}
                    title={collapsed ? item.name : ''}
                  >
                    <div className={`flex-shrink-0 ${isActive ? 'text-orange-600' : 'group-hover:text-orange-600'}`}>
                      {item.icon}
                    </div>
                    {!collapsed && (
                      <span className="ml-3 truncate">{item.name}</span>
                    )}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-orange-300 rounded-r-md" />
                    )}
                    
                    {/* Tooltip for collapsed state */}
                    {collapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-700 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                        {item.name}
                      </div>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-orange-50">
              <div className={`flex items-center gap-3 text-sm text-gray-700 ${collapsed ? 'justify-center' : ''}`}>
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="font-medium text-gray-700">FT</span>
                </div>
                {!collapsed && (
                  <div>
                    <div className="font-medium">Furkan</div>
                    <div className="text-xs text-gray-500">Admin</div>
                  </div>
                )}
              </div>
              
              {/* Logout Button */}
              <Link 
                href="/login"
                className={`flex items-center gap-2 mt-4 px-3 py-2 text-sm font-medium rounded-lg
                  bg-orange-50 hover:bg-orange-100 text-orange-600 transition-colors
                  ${collapsed ? 'justify-center' : ''}
                `}
                title={collapsed ? 'Logout' : ''}
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                {!collapsed && <span>Logout</span>}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
