import { Member, Profile, Server } from '@prisma/client';

export type SidebarLink = {
  imgURL: string;
  route: string;
  label: string;
};

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};
