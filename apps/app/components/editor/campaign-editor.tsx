"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import { Toolbar } from "./toolbar";
import { useEffect } from "react";
import { Placeholder } from "@tiptap/extension-placeholder";
import { extensions as editorExtensions } from "@/lib/editor";

interface EditorProps {
  content?: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor = ({ content, onChange, placeholder }: EditorProps) => {
  const editor = useEditor({
    extensions: [
      ...editorExtensions,
      Placeholder.configure({
        placeholder: placeholder || "",
        emptyEditorClass: 'first:before:text-muted-foreground first:before:absolute first:before:text-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none'
      })
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose max-w-full focus:outline-none p-4 rounded-b border border-input bg-white text-black transition-colors focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-[calc(600px-40px)]',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (html !== content) {
        onChange(html);
      }
    },
    autofocus: 'end',
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || "");
    }
  }, [content, editor]);

  if (!editor) return null;

  return (
    <div className="flex flex-col h-[600px] rounded overflow-hidden">
      <Toolbar editor={editor} />
      <EditorContent
        editor={editor}
        className="flex-1 overflow-auto"
      />
    </div>
  );
}

export default RichTextEditor;