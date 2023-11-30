import { getServersWithGames } from '@/actions/server';
import LeftSidebar from './LeftSidebar';

const LeftSidebarWrapper = async () => {
  const servers = await getServersWithGames();

  return <LeftSidebar servers={servers} />;
};

export default LeftSidebarWrapper;
