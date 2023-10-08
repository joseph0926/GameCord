import { getCurrentUser } from '@/actions/user';
import PostTab from '@/components/post/PostTab';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getJoinedDate } from '@/lib/utils';
import { SignedIn, currentUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

const ProfilePage = async ({
  params,
  searchParams
}: {
  params: { profileId: string };
  searchParams: { [key: string]: string | undefined };
}) => {
  const clerkUser = await currentUser();
  const profile = await getCurrentUser();
  if (!profile) {
    redirect('/sign-in');
  }

  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Image src={profile.imageUrl} alt="profile" width={140} height={140} className="rounded-full object-cover" />
          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900">{profile.name}</h2>
            <p className="paragraph-regular text-dark100_light900">({profile.email})</p>
            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">{getJoinedDate(new Date(profile.createdAt))}</div>
          </div>
        </div>
        <div className="flex justify-end max-md:mb-5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {clerkUser && clerkUser.id === profile.profileId && (
              <Link href="/profile/edit">
                <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
                  Edit Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>
      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="posts" className="flex-1">
          <TabsList className="background-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger value="posts" className="tab">
              Posts
            </TabsTrigger>
            <TabsTrigger value="comments" className="tab">
              Comments
            </TabsTrigger>
          </TabsList>
          <TabsContent value="posts">
            <PostTab searchParams={searchParams} profileId={profile.id} clerkId={clerkUser!.id} />
          </TabsContent>
          <TabsContent value="comments">Comments</TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ProfilePage;
