'use client';

import {
  MDXEditor,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  CodeToggle,
  headingsPlugin,
  listsPlugin,
  linkPlugin,
  quotePlugin,
  markdownShortcutPlugin,
  ListsToggle,
  linkDialogPlugin,
  CreateLink,
  InsertImage,
  InsertTable,
  tablePlugin,
  imagePlugin,
  ConditionalContents,
  Separator,
  InsertThematicBreak,
  diffSourcePlugin,
  MDXEditorMethods,
} from '@mdxeditor/editor';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Ref } from 'react';

import '@mdxeditor/editor/style.css';
import './dark-editor.css';

interface Props {
  value: string;
  editorRef: Ref<MDXEditorMethods> | null;
  fieldChange: (value: string) => void;
}

const Editor = ({ value, editorRef, fieldChange }: Props) => {
  const { resolvedTheme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <MDXEditor
        key={resolvedTheme}
        markdown={value}
        ref={editorRef}
        onChange={fieldChange}
        className="markdown-editor dark-editor w-full rounded-md bg-background shadow-sm ring-offset-background"
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          quotePlugin(),
          markdownShortcutPlugin(),
          tablePlugin(),
          imagePlugin(),
          diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: '' }),
          toolbarPlugin({
            toolbarContents: () => (
              <ConditionalContents
                options={[
                  {
                    fallback: () => (
                      <div className="flex items-center gap-1 border-b p-2">
                        <UndoRedo />
                        <Separator orientation="vertical" className="h-6" />
                        <BoldItalicUnderlineToggles />
                        <CodeToggle />
                        <Separator orientation="vertical" className="h-6" />
                        <ListsToggle />
                        <Separator orientation="vertical" className="h-6" />
                        <CreateLink />
                        <InsertImage />
                        <Separator orientation="vertical" className="h-6" />
                        <InsertTable />
                        <InsertThematicBreak />
                      </div>
                    ),
                  },
                ]}
              />
            ),
          }),
        ]}
      />
    </motion.div>
  );
};

export default Editor;
