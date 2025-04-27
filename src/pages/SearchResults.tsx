import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import { Search, SlidersHorizontal } from 'lucide-react';
import { videos } from '../data/videos';
import { Video } from '../types';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Simulate search results based on query
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      if (query) {
        // Filter videos that contain the query in title or channel name (case insensitive)
        const filteredVideos = videos.filter(video => 
          video.title.toLowerCase().includes(query.toLowerCase()) || 
          video.channelName.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filteredVideos);
      } else {
        setResults([]);
      }
      setIsLoading(false);
    }, 500);
  }, [query]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Search info header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Search size={20} className="text-gray-500 dark:text-gray-400 mr-3" />
          <h1 className="text-xl font-medium text-gray-900 dark:text-white">
            {query ? `Results for "${query}"` : 'Search results'}
          </h1>
          <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">
            {results.length} results
          </span>
        </div>
        <button
          onClick={toggleFilters}
          className="flex items-center px-3 py-2 bg-gray-100 dark:bg-zinc-800 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700"
        >
          <SlidersHorizontal size={16} className="mr-2" />
          <span>Filters</span>
        </button>
      </div>

      {/* Filters section (toggled) */}
      {showFilters && (
        <div className="bg-gray-100 dark:bg-zinc-800 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Upload date
              </label>
              <select className="w-full p-2 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-md">
                <option>Any time</option>
                <option>Today</option>
                <option>This week</option>
                <option>This month</option>
                <option>This year</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Type
              </label>
              <select className="w-full p-2 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-md">
                <option>All</option>
                <option>Video</option>
                <option>Channel</option>
                <option>Playlist</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Duration
              </label>
              <select className="w-full p-2 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-md">
                <option>Any duration</option>
                <option>Under 4 minutes</option>
                <option>4-20 minutes</option>
                <option>Over 20 minutes</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700">
              Apply filters
            </button>
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      )}

      {/* No results message */}
      {!isLoading && results.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16">
          <Search size={48} className="text-gray-400 dark:text-gray-500 mb-4" />
          <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            No results found
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
            Try different keywords or check your spelling
          </p>
        </div>
      )}

      {/* Results list */}
      {!isLoading && results.length > 0 && (
        <div className="space-y-4">
          {results.map((video) => (
            <VideoCard key={video.id} video={video} layout="row" />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;