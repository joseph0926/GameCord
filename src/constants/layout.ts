import {
  GamepadIcon,
  Hash,
  Headphones,
  Home,
  PenSquare,
  Trophy,
  User,
  Users,
} from 'lucide-react';

export const sidebarLinks = [
  {
    icon: Home,
    href: '/',
    label: '홈',
  },
  {
    icon: GamepadIcon,
    href: '/games',
    label: '게임',
  },
  {
    icon: Users,
    href: '/communities',
    label: '커뮤니티',
  },
  {
    icon: Headphones,
    href: '/voice-channels',
    label: '음성채널',
  },
  {
    icon: Trophy,
    href: '/achievements',
    label: '업적',
  },
  {
    icon: Hash,
    href: '/tags',
    label: '태그',
  },
  {
    icon: User,
    href: '/profile',
    label: '프로필',
  },
  {
    icon: PenSquare,
    href: '/create-post',
    label: '글쓰기',
  },
];

export const hotPosts = [
  { _id: '1', title: '엘든 링 최종 보스 공략법' },
  { _id: '2', title: '스타필드 멀티플레이어 모드 추가' },
  { _id: '3', title: '발더스 게이트 3 숨겨진 이스터에그' },
  { _id: '4', title: '카운터-스트라이크 2 프로팁' },
  { _id: '5', title: '리그 오브 레전드 시즌 14 메타 분석' },
];

export const popularTags = [
  { _id: '1', name: 'RPG', posts: 1200 },
  { _id: '2', name: 'FPS', posts: 950 },
  { _id: '3', name: 'MMORPG', posts: 800 },
  { _id: '4', name: '인디게임', posts: 600 },
  { _id: '5', name: 'E스포츠', posts: 450 },
];

export const posts = [
  {
    _id: '1',
    title: '발로란트 팀원 구합니다 (다이아몬드 이상)',
    description: '정기적인 경쟁전 참여할 활성 유저 구합니다',
    tags: [{ _id: '1', name: 'FPS' }],
    author: {
      _id: '1',
      name: '프로게이머123',
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
    title: '가이드: FPS 게임 조준 실력 향상하기',
    description: '실전 연습을 포함한 종합적인 조준 실력 향상 가이드',
    tags: [
      { _id: '1', name: 'FPS' },
      { _id: '2', name: '가이드' },
    ],
    author: {
      _id: '2',
      name: '에임마스터',
      image:
        'https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg',
    },
    upvotes: 156,
    answers: 34,
    views: 2100,
    createdAt: new Date('2024-11-01'),
  },
];
