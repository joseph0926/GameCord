import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

const authHandler = () => {
  return {};
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
