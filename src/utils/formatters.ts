export const formatViewCount = (views: number): string => {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M views`;
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K views`;
  } else {
    return `${views} views`;
  }
};

export const formatSubscriberCount = (subscribers: number): string => {
  if (subscribers >= 1000000) {
    return `${(subscribers / 1000000).toFixed(1)}M subscribers`;
  } else if (subscribers >= 1000) {
    return `${(subscribers / 1000).toFixed(1)}K subscribers`;
  } else {
    return `${subscribers} subscribers`;
  }
};

export const formatTimeAgo = (dateString: string): string => {
  const now = new Date();
  const past = new Date(dateString);
  const diffInMs = now.getTime() - past.getTime();
  
  const diffInSecs = Math.floor(diffInMs / 1000);
  const diffInMins = Math.floor(diffInSecs / 60);
  const diffInHours = Math.floor(diffInMins / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);
  
  if (diffInYears > 0) {
    return diffInYears === 1 ? '1 year ago' : `${diffInYears} years ago`;
  } else if (diffInMonths > 0) {
    return diffInMonths === 1 ? '1 month ago' : `${diffInMonths} months ago`;
  } else if (diffInDays > 0) {
    return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`;
  } else if (diffInHours > 0) {
    return diffInHours === 1 ? '1 hour ago' : `${diffInHours} hours ago`;
  } else if (diffInMins > 0) {
    return diffInMins === 1 ? '1 minute ago' : `${diffInMins} minutes ago`;
  } else {
    return 'Just now';
  }
};