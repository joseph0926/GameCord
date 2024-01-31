import { SidebarLink } from '@/@types/custom';

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: '/images/home.svg',
    route: '/',
    label: 'Home'
  },
  {
    imgURL: '/images/star.svg',
    route: '/post',
    label: 'Posts'
  },
  {
    imgURL: '/images/user.svg',
    route: '/profile',
    label: 'Profile'
  },
  {
    imgURL: '/images/message.svg',
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
