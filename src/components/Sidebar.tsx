import React from 'react';
import { Home, Flame, Bookmark, Clock, ThumbsUp, Film, Newspaper, Gamepad2, Lightbulb, Music } from 'lucide-react';
import { NavLink } from 'react-router-dom';

type SidebarProps = {
  isOpen: boolean;
  isMinimized: boolean;
};

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, isMinimized }) => {
  const mainItems: SidebarItem[] = [
    { icon: <Home size={20} />, label: 'Home', path: '/' },
    { icon: <Flame size={20} />, label: 'Trending', path: '/trending' },
    { icon: <Bookmark size={20} />, label: 'Subscriptions', path: '/subscriptions' }
  ];

  const libraryItems: SidebarItem[] = [
    { icon: <Clock size={20} />, label: 'History', path: '/history' },
    { icon: <ThumbsUp size={20} />, label: 'Liked videos', path: '/liked' }
  ];

  const exploreItems: SidebarItem[] = [
    { icon: <Film size={20} />, label: 'Movies', path: '/movies' },
    { icon: <Newspaper size={20} />, label: 'News', path: '/news' },
    { icon: <Gamepad2 size={20} />, label: 'Gaming', path: '/gaming' },
    { icon: <Lightbulb size={20} />, label: 'Learning', path: '/learning' },
    { icon: <Music size={20} />, label: 'Music', path: '/music' }
  ];

  if (!isOpen) {
    return null;
  }

  const renderItems = (items: SidebarItem[]) => {
    return items.map((item, index) => (
      <NavLink
        key={index}
        to={item.path}
        className={({ isActive }) => `
          flex items-center py-2 px-3 mb-1 rounded-lg
          ${isActive ? 'bg-gray-200 dark:bg-zinc-800' : 'hover:bg-gray-100 dark:hover:bg-zinc-800'}
          ${isMinimized ? 'justify-center' : ''}
        `}
      >
        <span className="text-gray-700 dark:text-gray-200">{item.icon}</span>
        {!isMinimized && (
          <span className="ml-5 text-sm font-medium text-gray-700 dark:text-gray-200">{item.label}</span>
        )}
      </NavLink>
    ));
  };

  return (
    <aside 
      className={`
        fixed top-14 left-0 h-[calc(100vh-3.5rem)] bg-white dark:bg-zinc-900 overflow-y-auto
        transition-all duration-300 z-40
        ${isMinimized ? 'w-16' : 'w-56 md:w-64'}
      `}
    >
      <div className="p-2">
        <div className="mb-4">
          {renderItems(mainItems)}
        </div>

        {!isMinimized && <div className="border-t border-gray-200 dark:border-zinc-800 my-2"></div>}

        <div className="mb-4">
          {!isMinimized && (
            <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              Library
            </h3>
          )}
          {renderItems(libraryItems)}
        </div>

        {!isMinimized && <div className="border-t border-gray-200 dark:border-zinc-800 my-2"></div>}

        <div>
          {!isMinimized && (
            <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              Explore
            </h3>
          )}
          {renderItems(exploreItems)}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;