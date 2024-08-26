import { SidebarLink } from '@/@types/custom';
import { Home, List, MessageCircle, User2 } from 'lucide-react';

export const sidebarLinks: SidebarLink[] = [
  {
    icon: <Home />,
    route: '/',
    label: 'Home'
  },
  {
    icon: <List />,
    route: '/post',
    label: 'Posts'
  },
  {
    icon: <User2 />,
    route: '/profile',
    label: 'Profile'
  },
  {
    icon: <MessageCircle />,
    route: '/server',
    label: 'Server'
  }
];

export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100
  },
  COMMENT_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100
  },
  QUESTION_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100
  },
  COMMENT_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100
  },
  TOTAL_VIEWS: {
    BRONZE: 1000,
    SILVER: 10000,
    GOLD: 100000
  }
};
