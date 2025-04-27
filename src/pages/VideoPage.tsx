import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import CommentSection from '../components/CommentSection';
import VideoCard from '../components/VideoCard';
import { ThumbsUp, ThumbsDown, Share2, Save, MoreHorizontal, CheckCircle } from 'lucide-react';
import { videos, comments, channels } from '../data/videos';
import { Video, Channel } from '../types';
import { formatViewCount, formatSubscriberCount, formatTimeAgo } from '../utils/formatters';

const VideoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<Video | null>(null);
  const [channel, setChannel] = useState<Channel | null>(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [likeStatus, setLikeStatus] = useState<'liked' | 'disliked' | null>(null);
  const [recommendedVideos, setRecommendedVideos] = useState<Video[]>([]);

  useEffect(() => {
    // Find the video with the matching ID
    const foundVideo = videos.find(v => v.id === id);
    if (foundVideo) {
      setVideo(foundVideo);
      
      // Find the channel for this video
      const foundChannel = channels.find(c => c.name === foundVideo.channelName);
      if (foundChannel) {
        setChannel(foundChannel);
      }
      
      // Get recommended videos (excluding current video)
      const filtered = videos.filter(v => v.id !== id);
      // Shuffle and take first 8
      const shuffled = [...filtered].sort(() => 0.5 - Math.random());
      setRecommendedVideos(shuffled.slice(0, 8));
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Reset states
    setIsDescriptionExpanded(false);
    setLikeStatus(null);
  }, [id]);

  const toggleSubscription = () => {
    setIsSubscribed(!isSubscribed);
  };

  const handleLike = () => {
    setLikeStatus(likeStatus === 'liked' ? null : 'liked');
  };

  const handleDislike = () => {
    setLikeStatus(likeStatus === 'disliked' ? null : 'disliked');
  };

  if (!video || !channel) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main content */}
        <div className="lg:w-2/3">
          {/* Video player */}
          <VideoPlayer videoUrl={video.videoUrl} thumbnail={video.thumbnail} />
          
          {/* Video info */}
          <div className="mt-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              {video.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-3 pb-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <img 
                  src={channel.avatar} 
                  alt={channel.name} 
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-3">
                  <div className="flex items-center">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {channel.name}
                    </h3>
                    {channel.verified && (
                      <CheckCircle size={14} className="ml-1 text-gray-500 dark:text-gray-400 fill-gray-500 dark:fill-gray-400" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatSubscriberCount(channel.subscribers)}
                  </p>
                </div>
                <button 
                  onClick={toggleSubscription}
                  className={`ml-4 px-4 py-2 rounded-full text-sm font-medium ${
                    isSubscribed
                      ? 'bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-200'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  {isSubscribed ? 'Subscribed' : 'Subscribe'}
                </button>
              </div>
              
              <div className="flex items-center mt-4 sm:mt-0">
                <div className="flex items-center bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <button 
                    onClick={handleLike}
                    className={`flex items-center px-4 py-2 ${
                      likeStatus === 'liked' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <ThumbsUp size={18} className="mr-2" />
                    <span>23K</span>
                  </button>
                  <div className="h-10 w-px bg-gray-300 dark:bg-gray-700"></div>
                  <button 
                    onClick={handleDislike}
                    className={`px-4 py-2 ${
                      likeStatus === 'disliked' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <ThumbsDown size={18} />
                  </button>
                </div>
                
                <button className="ml-2 flex items-center px-4 py-2 bg-gray-100 dark:bg-zinc-800 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700">
                  <Share2 size={18} className="mr-2" />
                  <span className="hidden sm:inline">Share</span>
                </button>
                
                <button className="ml-2 flex items-center px-4 py-2 bg-gray-100 dark:bg-zinc-800 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700">
                  <Save size={18} className="mr-2" />
                  <span className="hidden sm:inline">Save</span>
                </button>
                
                <button className="ml-2 p-2 bg-gray-100 dark:bg-zinc-800 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700">
                  <MoreHorizontal size={18} />
                </button>
              </div>
            </div>
            
            {/* Video description */}
            <div className="mt-4 bg-gray-100 dark:bg-zinc-800 rounded-lg p-3">
              <div className="flex space-x-2 text-sm text-gray-700 dark:text-gray-300 mb-2">
                <span>{formatViewCount(video.views)}</span>
                <span>•</span>
                <span>{formatTimeAgo(video.timestamp)}</span>
              </div>
              
              <div className={`text-sm text-gray-800 dark:text-gray-200 ${isDescriptionExpanded ? '' : 'line-clamp-2'}`}>
                <p>
                  {isDescriptionExpanded ? (
                    <>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      <br /><br />
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </>
                  ) : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
                </p>
              </div>
              
              <button 
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {isDescriptionExpanded ? 'Show less' : 'Show more'}
              </button>
            </div>
          </div>
          
          {/* Comments section */}
          <CommentSection comments={comments} />
        </div>
        
        {/* Recommended videos */}
        <div className="lg:w-1/3">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Recommended videos
          </h3>
          <div className="space-y-3">
            {recommendedVideos.map((video) => (
              <VideoCard key={video.id} video={video} layout="row" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;