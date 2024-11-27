'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { MDXEditorMethods } from '@mdxeditor/editor';
import { motion } from 'motion/react';
import dynamic from 'next/dynamic';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formAnimation, itemAnimation } from '@/constants/form';
import { CreatePostSchema } from '@/schemas/post.schema';
import { TagCard } from '../card/tag-card';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';

const Editor = dynamic(() => import('@/components/editor'), {
  ssr: false,
});

export const CreatePostForm = () => {
  const editorRef = useRef<MDXEditorMethods>(null);

  const form = useForm<z.infer<typeof CreatePostSchema>>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      title: '',
      content: '',
      tags: [],
    },
  });

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: { value: string[] }
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const tagInput = e.currentTarget.value.trim();

      if (tagInput && tagInput.length < 15 && !field.value.includes(tagInput)) {
        form.setValue('tags', [...field.value, tagInput]);
        e.currentTarget.value = '';
        form.clearErrors('tags');
      } else if (tagInput.length > 15) {
        form.setError('tags', {
          type: 'manual',
          message: '태그는 15자 이내로 입력해주세요',
        });
      } else if (field.value.includes(tagInput)) {
        form.setError('tags', {
          type: 'manual',
          message: '이미 존재하는 태그입니다',
        });
      }
    }
  };

  const handleTagRemove = (tag: string, field: { value: string[] }) => {
    const newTags = field.value.filter((t) => t !== tag);

    form.setValue('tags', newTags);

    if (newTags.length === 0) {
      form.setError('tags', {
        type: 'manual',
        message: '최소 하나의 태그가 필요합니다',
      });
    }
  };

  const handleCreateQuestion = (data: z.infer<typeof CreatePostSchema>) => {
    console.log(data);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={formAnimation}
      className="w-full"
    >
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">새 게시글 작성</CardTitle>
          <CardDescription>
            게임 커뮤니티에 공유하고 싶은 이야기를 작성해보세요
          </CardDescription>
          <Separator className="my-2" />
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="flex w-full flex-col space-y-8"
              onSubmit={form.handleSubmit(handleCreateQuestion)}
            >
              <motion.div variants={itemAnimation}>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">
                        게시글 제목 <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-14 transition-all focus:ring-2 focus:ring-primary/30"
                          placeholder="게시글의 제목을 입력하세요"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        다른 게이머들이 이해하기 쉽게 구체적인 제목을
                        작성해주세요.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div variants={itemAnimation}>
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <FormLabel className="text-base font-semibold">
                        게시글 내용 <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="overflow-hidden rounded-lg border-2 border-input transition-all hover:border-primary/50">
                          <Editor
                            value={field.value}
                            editorRef={editorRef}
                            fieldChange={field.onChange}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        제목에서 언급한 내용에 대해 자세히 설명해주세요.
                        스크린샷이나 클립을 첨부하면 더 좋습니다.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div variants={itemAnimation}>
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">
                        태그 <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <Input
                            className="h-14 transition-all focus:ring-2 focus:ring-primary/30"
                            placeholder="태그 추가... (Enter로 추가)"
                            onKeyDown={(e) => handleInputKeyDown(e, field)}
                          />
                          {field.value.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="flex flex-wrap gap-2"
                            >
                              {field.value.map((tag: string) => (
                                <motion.div
                                  key={tag}
                                  layout
                                  initial={{ scale: 0.8, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0.8, opacity: 0 }}
                                >
                                  <TagCard
                                    _id={tag}
                                    name={tag}
                                    compact
                                    remove
                                    isButton
                                    handleRemove={() =>
                                      handleTagRemove(tag, field)
                                    }
                                  />
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </div>
                      </FormControl>
                      <FormDescription>
                        게시글과 관련된 게임, 장르, 주제 등을 태그로
                        추가해주세요 (최대 3개).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                variants={itemAnimation}
                className="flex justify-end pt-4"
              >
                <Button
                  type="submit"
                  size="lg"
                  className="bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  게시글 작성
                </Button>
              </motion.div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
};
