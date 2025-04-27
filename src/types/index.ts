export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channelName: string;
  channelAvatar: string;
  views: number;
  timestamp: string;
  duration: string;
  videoUrl: string;
}

export interface Comment {
  id: string;
  user: string;
  avatar: string;
  content: string;
  likes: number;
  timestamp: string;
  replies?: Comment[];
}

export interface Channel {
  id: string;
  name: string;
  avatar: string;
  subscribers: number;
  verified: boolean;
}