import { Color } from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const extensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
    },
    bulletList: {
      HTMLAttributes: {
        class: 'list-disc list-outside ml-4',
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: 'list-decimal list-outside ml-4',
      },
    },
  }),
  TextStyle,
  Color,
  Link.configure({
    openOnClick: false,
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Underline,
];

export const EditorInstance = (placeholder: string, content: string, onChange: (content: string) => void) => useEditor({
  extensions: [
    ...extensions,
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