export const paths = {
  home() {
    return '/';
  },
  auth(type: 'IN' | 'UP') {
    return type === 'IN' ? '/sign-in' : 'sign-up';
  },
  invite(inviteSlug: string) {
    return `/invite/${inviteSlug}`;
  },
  server(serverlSlug: string) {
    return `/server/${serverlSlug}`;
  },
  channel(serverSlug: string, channelSlug: string) {
    return `/server/${serverSlug}/channel/${channelSlug}`;
  },
  conversations(serverSlug: string, memberId: string) {
    return `/server/${serverSlug}/conversations/${memberId}`;
  },
  profile(type: 'USER' | 'GAME', profileSlug?: string) {
    return type === 'USER' ? `/profile/${profileSlug}` : '/profile/create-game';
  },
  post(type: 'CREATE' | 'FETCH' | 'ALL', postSlug?: string) {
    return type === 'ALL' ? '/post' : type === 'FETCH' ? `/post/${postSlug}` : '/create-post';
  },
  community() {
    return '/community';
  }
};
