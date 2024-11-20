import { CreatePostForm } from '@/components/post/create-post-form';
import { Card, CardContent } from '@/components/ui/card';
import { Gamepad, Users, MessagesSquare } from 'lucide-react';

export default function CreatePost() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center gap-3">
        <Gamepad className="h-10 w-10 text-primary" />
        <div>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-foreground">
            게임 포스트 작성
          </h1>
          <p className="text-lg text-muted-foreground">
            게이머들과 함께 나누고 싶은 이야기를 공유해보세요
          </p>
        </div>
      </div>

      <Card className="border-none bg-muted/50 p-4">
        <CardContent className="flex items-center gap-6 p-0">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">
              현재 접속중인 게이머: 1,234명
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MessagesSquare className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">
              오늘 작성된 포스트: 89개
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6">
        <CreatePostForm />
      </div>
    </div>
  );
}
