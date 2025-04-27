import React, { useState, useEffect } from 'react';
import VideoCard from '../components/VideoCard';
import { videos } from '../data/videos';
import { useNavigate } from 'react-router-dom';

const categories = [
  'All', 'Gaming', 'Music', 'React JS', 'Cooking', 'Comedy',
  'Travel', 'Sports', 'News', 'Technology', 'Education', 'Pets'
];

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredVideos, setFilteredVideos] = useState(videos);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulating filtered videos based on selected category
    if (selectedCategory === 'All') {
      setFilteredVideos(videos);
    } else {
      // This is a mock implementation since we don't have real categorization
      const shuffled = [...videos].sort(() => 0.5 - Math.random());
      setFilteredVideos(shuffled.slice(0, 6));
    }
  }, [selectedCategory]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="w-full overflow-x-hidden">
      {/* Category filter tabs */}
      <div className="sticky top-14 z-10 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 py-2">
        <div className="flex overflow-x-auto hide-scrollbar px-4 gap-2">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(category)}
              className={`
                whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-medium transition-colors
                ${selectedCategory === category
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-700'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Video grid */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;