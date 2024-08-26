import { Member, Profile, Server } from '@prisma/client';

export type SidebarLink = {
  icon: JSX.Element;
  route: string;
  label: string;
};

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};
