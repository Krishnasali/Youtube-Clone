import React, { useState } from 'react';
import { Menu, Search, Bell, User, X, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type HeaderProps = {
  toggleSidebar: () => void;
};

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleMobileSearch = () => {
    setMobileSearch(!mobileSearch);
    if (!mobileSearch) {
      setTimeout(() => document.getElementById('mobile-search-input')?.focus(), 100);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-zinc-900 shadow-sm">
      <div className="flex items-center justify-between h-14 px-4">
        {/* Left section with logo */}
        {!mobileSearch && (
          <div className="flex items-center">
            <button 
              onClick={toggleSidebar}
              className="p-2 mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700"
            >
              <Menu className="h-6 w-6 text-gray-700 dark:text-gray-200" />
            </button>
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => navigate('/')}
            >
              <div className="flex items-center">
                <div className="text-red-600 font-bold text-2xl">You</div>
                <div className="text-black dark:text-white font-bold text-2xl">Tube</div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile search bar */}
        {mobileSearch && (
          <div className="flex items-center w-full">
            <button 
              onClick={toggleMobileSearch}
              className="p-2 mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700"
            >
              <ChevronLeft className="h-6 w-6 text-gray-700 dark:text-gray-200" />
            </button>
            <form onSubmit={handleSearch} className="flex-1">
              <input
                id="mobile-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="w-full py-2 px-4 bg-gray-100 dark:bg-zinc-800 rounded-full outline-none"
              />
            </form>
          </div>
        )}

        {/* Desktop search bar */}
        {!mobileSearch && (
          <div className="hidden md:flex items-center flex-1 max-w-xl mx-4">
            <form 
              onSubmit={handleSearch} 
              className={`flex flex-1 relative ${searchFocused ? 'ring-1 ring-blue-500' : ''}`}
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search"
                className="w-full py-2 px-4 bg-gray-100 dark:bg-zinc-800 rounded-l-full outline-none"
              />
              <button 
                type="submit"
                className="bg-gray-200 dark:bg-zinc-700 px-4 rounded-r-full hover:bg-gray-300 dark:hover:bg-zinc-600"
              >
                <Search className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            </form>
          </div>
        )}

        {/* Right section with icons */}
        {!mobileSearch && (
          <div className="flex items-center">
            <button 
              onClick={toggleMobileSearch}
              className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700"
            >
              <Search className="h-6 w-6 text-gray-700 dark:text-gray-200" />
            </button>
            <button className="p-2 mx-1 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700">
              <Bell className="h-6 w-6 text-gray-700 dark:text-gray-200" />
            </button>
            <button className="p-2 ml-1 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700">
              <User className="h-6 w-6 text-gray-700 dark:text-gray-200" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;