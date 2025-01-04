"use client";

import { EditorContent } from "@tiptap/react";
import { Toolbar } from "./toolbar";
import { EditorInstance } from "@/lib/editor";
import { useEffect } from "react";

interface EditorProps {
  content?: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor = ({ content, onChange, placeholder }: EditorProps) => {
  const editor = EditorInstance(placeholder || "", content || "", onChange);

  // Update content when it changes externally (like clearing draft)
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