import { Member, Server, User } from '@prisma/client';

type ServerWithMembersWithUser = Server & {
  members: (Member & { user: User })[];
};
