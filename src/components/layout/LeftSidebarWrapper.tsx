import { getServers } from '@/actions/server';
import LeftSidebar from './LeftSidebar';
import { getGames } from '@/actions/game';

const LeftSidebarWrapper = async () => {
  const servers = await getServers();
  const games = await getGames();

  return <LeftSidebar servers={servers} games={games} />;
};

export default LeftSidebarWrapper;
