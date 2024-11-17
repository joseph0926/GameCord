import {
  Home,
  Users,
  User,
  PenSquare,
  GamepadIcon,
  Hash,
  Headphones,
  Trophy,
} from 'lucide-react';

export const sidebarLinks = [
  {
    icon: Home,
    route: '/',
    label: 'Home',
  },
  {
    icon: GamepadIcon,
    route: '/games',
    label: 'Games',
  },
  {
    icon: Users,
    route: '/communities',
    label: 'Communities',
  },
  {
    icon: Headphones,
    route: '/voice-channels',
    label: 'Voice Channels',
  },
  {
    icon: Trophy,
    route: '/achievements',
    label: 'Achievements',
  },
  {
    icon: Hash,
    route: '/tags',
    label: 'Tags',
  },
  {
    icon: User,
    route: '/profile',
    label: 'Profile',
  },
  {
    icon: PenSquare,
    route: '/create-post',
    label: 'Create Post',
  },
];

export const hotPosts = [
  { _id: '1', title: 'Best strategies for Elden Ring final boss' },
  { _id: '2', title: 'New Starfield mod adds multiplayer support' },
  { _id: '3', title: 'Hidden easter eggs in Baldurs Gate 3' },
  { _id: '4', title: 'Counter-Strike 2 pro tips and tricks' },
  { _id: '5', title: 'League of Legends Season 14 meta analysis' },
];

export const popularTags = [
  { _id: '1', name: 'rpg', posts: 1200 },
  { _id: '2', name: 'fps', posts: 950 },
  { _id: '3', name: 'mmorpg', posts: 800 },
  { _id: '4', name: 'indie', posts: 600 },
  { _id: '5', name: 'esports', posts: 450 },
];

export const posts = [
  {
    _id: '1',
    title: 'Looking for Valorant teammates (Diamond+)',
    description: 'Seeking active players for regular competitive matches',
    tags: [{ _id: '1', name: 'FPS' }],
    author: {
      _id: '1',
      name: 'ProGamer123',
      image:
        'https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg',
    },
    upvotes: 45,
    answers: 12,
    views: 380,
    createdAt: new Date(),
  },
  {
    _id: '2',
    title: 'Guide: How to improve aim in FPS games',
    description:
      'Comprehensive guide for improving your aim with practical exercises',
    tags: [
      { _id: '1', name: 'FPS' },
      { _id: '2', name: 'Guide' },
    ],
    author: {
      _id: '2',
      name: 'AimMaster',
      image:
        'https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg',
    },
    upvotes: 156,
    answers: 34,
    views: 2100,
    createdAt: new Date('2024-11-01'),
  },
];
