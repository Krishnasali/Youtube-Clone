import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, ChevronDown, ChevronUp } from 'lucide-react';
import { Comment } from '../types';

type CommentSectionProps = {
  comments: Comment[];
};

const CommentSection: React.FC<CommentSectionProps> = ({ comments }) => {
  const [commentText, setCommentText] = useState('');
  const [expandedReplies, setExpandedReplies] = useState<Record<string, boolean>>({});

  const toggleReplies = (commentId: string) => {
    setExpandedReplies(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      alert('Comment submission would be implemented here');
      setCommentText('');
    }
  };

  const renderComment = (comment: Comment, isReply = false) => {
    return (
      <div key={comment.id} className={`flex ${isReply ? 'mt-3' : 'mt-4'}`}>
        <img 
          src={comment.avatar} 
          alt={comment.user} 
          className="w-8 h-8 rounded-full mr-3 flex-shrink-0"
        />
        <div className="flex-1">
          <div className="flex items-center">
            <span className="font-medium text-sm text-gray-900 dark:text-white">{comment.user}</span>
            <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{comment.timestamp}</span>
          </div>
          <p className="mt-1 text-sm text-gray-800 dark:text-gray-200">{comment.content}</p>
          <div className="flex items-center mt-1">
            <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              <ThumbsUp size={14} className="mr-1" />
              <span className="text-xs">{comment.likes}</span>
            </button>
            <button className="flex items-center ml-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              <ThumbsDown size={14} />
            </button>
            <button className="ml-3 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              Reply
            </button>
          </div>
          
          {/* Replies section */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-2">
              <button 
                onClick={() => toggleReplies(comment.id)}
                className="flex items-center text-sm text-blue-600 dark:text-blue-400 font-medium"
              >
                {expandedReplies[comment.id] ? (
                  <>
                    <ChevronUp size={16} className="mr-1" />
                    Hide replies
                  </>
                ) : (
                  <>
                    <ChevronDown size={16} className="mr-1" />
                    View {comment.replies.length} replies
                  </>
                )}
              </button>
              
              {expandedReplies[comment.id] && (
                <div className="ml-4 pl-2 border-l-2 border-gray-200 dark:border-gray-700">
                  {comment.replies.map(reply => renderComment(reply, true))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        {comments.length} Comments
      </h3>
      
      {/* Comment form */}
      <form onSubmit={handleSubmitComment} className="flex items-start mb-6">
        <img 
          src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt="Your profile" 
          className="w-10 h-10 rounded-full mr-3"
        />
        <div className="flex-1">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            className="w-full px-3 py-2 bg-transparent border-b border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 outline-none text-gray-800 dark:text-gray-200"
          />
          <div className="flex justify-end mt-2">
            <button 
              type="button" 
              className="mr-2 px-4 py-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 rounded-full"
              onClick={() => setCommentText('')}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className={`px-4 py-1.5 text-sm font-medium rounded-full ${
                commentText.trim() 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
              }`}
              disabled={!commentText.trim()}
            >
              Comment
            </button>
          </div>
        </div>
      </form>
      
      {/* Comments list */}
      <div>
        {comments.map(comment => renderComment(comment))}
      </div>
    </div>
  );
};

export default CommentSection;