export const sidebarLinks = [
  {
    imgURL: '/icons/home.svg',
    route: '/',
    label: 'Home',
  },
  {
    imgURL: '/icons/users.svg',
    route: '/community',
    label: 'Community',
  },
  {
    imgURL: '/icons/star.svg',
    route: '/collection',
    label: 'Collections',
  },
  {
    imgURL: '/icons/suitcase.svg',
    route: '/jobs',
    label: 'Find Jobs',
  },
  {
    imgURL: '/icons/tag.svg',
    route: '/tags',
    label: 'Tags',
  },
  {
    imgURL: '/icons/user.svg',
    route: '/profile',
    label: 'Profile',
  },
  {
    imgURL: '/icons/post.svg',
    route: '/ask-post',
    label: 'Ask a post',
  },
];

export const hotPosts = [
  { _id: '1', title: 'How to create a custom hook in React?' },
  { _id: '2', title: 'How to use React Query?' },
  { _id: '3', title: 'How to use Redux?' },
  { _id: '4', title: 'How to use React Router?' },
  { _id: '5', title: 'How to use React Context?' },
];

export const popularTags = [
  { _id: '1', name: 'react', posts: 100 },
  { _id: '2', name: 'javascript', posts: 200 },
  { _id: '3', name: 'typescript', posts: 150 },
  { _id: '4', name: 'nextjs', posts: 50 },
  { _id: '5', name: 'react-query', posts: 75 },
];

// TODO: DUMMY
export const posts = [
  {
    _id: '1',
    title: 'How to learn React?',
    description: 'I want to learn React, can anyone help me?',
    tags: [
      { _id: '1', name: 'React' },
      { _id: '2', name: 'JavaScript' },
    ],
    author: {
      _id: '1',
      name: 'John Doe',
      image:
        'https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg',
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date(),
  },
  {
    _id: '2',
    title: 'How to learn JavaScript?',
    description: 'I want to learn JavaScript, can anyone help me?',
    tags: [
      { _id: '1', name: 'JavaScript' },
      { _id: '2', name: 'JavaScript' },
    ],
    author: {
      _id: '1',
      name: 'John Doe',
      image:
        'https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg',
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date('2021-09-01'),
  },
];
