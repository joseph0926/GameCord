'use client';

import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { useForm } from 'react-hook-form';
import { commentSchema } from '@/lib/validations/comment';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Editor } from '@tinymce/tinymce-react';
import { useRef, useState } from 'react';
import { Button } from '../ui/button';
import { useTheme } from 'next-themes';
import { createComment } from '@/actions/comment';
import { useOrigin } from '@/hooks/useOrigin';

type CommentFormProps = {
  postId: string;
  authorId: string;
};

const CommentForm = ({ postId, authorId }: CommentFormProps) => {
  const origin = useOrigin();
  const { theme } = useTheme();
  const editorRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: ''
    }
  });

  const submitHandler = async (values: z.infer<typeof commentSchema>) => {
    setIsLoading(true);

    try {
      await createComment({
        content: values.comment,
        authorId,
        postId,
        path: `${origin}/post/${postId}`
      });

      form.reset();

      if (editorRef.current) {
        const editor = editorRef.current as any;

        editor.setContent('');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">댓글을 작성해주세요.</h4>
      </div>
      <Form {...form}>
        <form className="mt-6 flex w-full flex-col gap-10" onSubmit={form.handleSubmit(submitHandler)}>
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="mt-3.5">
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    onInit={(evt, editor) => {
                      // @ts-ignore
                      editorRef.current = editor;
                    }}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                    init={{
                      height: 350,
                      menubar: false,
                      plugins: [
                        'advlist',
                        'autolink',
                        'lists',
                        'link',
                        'image',
                        'charmap',
                        'preview',
                        'anchor',
                        'searchreplace',
                        'visualblocks',
                        'codesample',
                        'fullscreen',
                        'insertdatetime',
                        'media',
                        'table'
                      ],
                      toolbar:
                        'undo redo | ' +
                        'codesample | bold italic forecolor | alignleft aligncenter |' +
                        'alignright alignjustify | bullist numlist',
                      content_style: 'body { font-family:Inter; font-size:16px }',
                      skin: theme === 'dark' ? 'oxide-dark' : 'oxide',
                      content_css: theme === 'dark' ? 'dark' : 'light'
                    }}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit" className="primary-gradient w-fit text-white" disabled={isLoading}>
              {isLoading ? '작성중...' : '작성'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CommentForm;
