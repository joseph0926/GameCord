import { currentUser } from '@clerk/nextjs';
import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

const authHandler = async () => {
  const user = await currentUser();
  if (!user) throw new Error('Unauthorized');
  return { userId: user.id };
};

export const ourFileRouter = {
  serverImage: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(() => authHandler())
    .onUploadComplete(() => {}),

  messageFile: f(['image', 'pdf'])
    .middleware(() => authHandler())
    .onUploadComplete(() => {})
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
