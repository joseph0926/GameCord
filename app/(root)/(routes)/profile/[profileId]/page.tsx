import { getCurrentUser } from '@/actions/user';
import PostTab from '@/components/post/PostTab';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getJoinedDate } from '@/lib/utils';
import { SignedIn, currentUser } from '@clerk/nextjs';
import { UserRole } from '@prisma/client';
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
      <div className="flex items-start justify-around">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Image src={profile.imageUrl} alt="profile" width={140} height={140} className="rounded-full object-cover" />
          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900">{profile.name}</h2>
            <p className="paragraph-regular text-dark100_light900">({profile.email})</p>
            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">{getJoinedDate(new Date(profile.createdAt))}</div>
          </div>
        </div>
        <div className="flex justify-end max-md:mb-5 sm:mt-3">
          <SignedIn>
            <div className="flex flex-col gap-4">
              {clerkUser && clerkUser.id === profile.profileId && (
                <Link href="/profile/edit">
                  <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
                    Edit Profile
                  </Button>
                </Link>
              )}
              {profile.role === UserRole.TOP && (
                <Link href="/profile/create-game">
                  <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
                    Create Game
                  </Button>
                </Link>
              )}
            </div>
          </SignedIn>
        </div>
      </div>
      <div className="mt-10 flex w-full gap-10">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="background-light800_dark400 min-h-[42px] w-full p-1">
            <TabsTrigger value="posts" className="tab flex-1">
              Posts
            </TabsTrigger>
            <TabsTrigger value="comments" className="tab flex-1">
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
