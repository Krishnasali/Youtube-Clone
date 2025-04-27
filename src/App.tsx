import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import VideoPage from './pages/VideoPage';
import SearchResults from './pages/SearchResults';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(window.innerWidth < 1024);
  const location = useLocation();

  // Manage sidebar state based on screen size
  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < 768;
      const isMediumScreen = window.innerWidth >= 768 && window.innerWidth < 1024;
      
      setIsSidebarOpen(!isSmallScreen);
      setIsSidebarMinimized(isMediumScreen);
    };

    // Initialize based on current size
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, [location]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-gray-900 dark:text-white">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} isMinimized={isSidebarMinimized} />
        
        {/* Main content */}
        <main className={`flex-1 transition-all duration-300 ${
          isSidebarOpen 
            ? isSidebarMinimized 
              ? 'ml-16' 
              : 'ml-0 md:ml-56 lg:ml-64' 
            : 'ml-0'
        }`}>
          {children}
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        } />
        <Route path="/video/:id" element={
          <MainLayout>
            <VideoPage />
          </MainLayout>
        } />
        <Route path="/search" element={
          <MainLayout>
            <SearchResults />
          </MainLayout>
        } />
        <Route path="*" element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        } />
      </Routes>
    </Router>
  );
};

export default App;