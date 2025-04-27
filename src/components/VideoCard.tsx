import React from 'react';
import { Video } from '../types';
import { formatViewCount, formatTimeAgo } from '../utils/formatters';
import { useNavigate } from 'react-router-dom';

type VideoCardProps = {
  video: Video;
  layout?: 'grid' | 'row';
};

const VideoCard: React.FC<VideoCardProps> = ({ video, layout = 'grid' }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/video/${video.id}`);
  };

  if (layout === 'row') {
    return (
      <div 
        onClick={handleClick}
        className="flex gap-3 mb-3 cursor-pointer"
      >
        <div className="relative flex-shrink-0 w-40 h-24 md:w-48 md:h-28 rounded-lg overflow-hidden">
          <img 
            src={video.thumbnail} 
            alt={video.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
            {video.duration}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium line-clamp-2 text-gray-900 dark:text-white mb-1">
            {video.title}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            {video.channelName}
          </p>
          <div className="flex text-xs text-gray-500 dark:text-gray-400">
            <span>{formatViewCount(video.views)}</span>
            <span className="mx-1">•</span>
            <span>{formatTimeAgo(video.timestamp)}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={handleClick}
      className="cursor-pointer mb-4 transition-transform duration-200 hover:scale-[1.02]"
    >
      <div className="relative w-full rounded-xl overflow-hidden aspect-video mb-2">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
          {video.duration}
        </div>
      </div>
      
      <div className="flex">
        <div className="flex-shrink-0 mr-3">
          <img 
            src={video.channelAvatar} 
            alt={video.channelName} 
            className="w-9 h-9 rounded-full"
          />
        </div>
        <div>
          <h3 className="text-sm font-medium line-clamp-2 text-gray-900 dark:text-white mb-1">
            {video.title}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            {video.channelName}
          </p>
          <div className="flex text-xs text-gray-500 dark:text-gray-400">
            <span>{formatViewCount(video.views)}</span>
            <span className="mx-1">•</span>
            <span>{formatTimeAgo(video.timestamp)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;