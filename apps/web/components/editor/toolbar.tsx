"use client";

import { type Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link,
  List,
  ListOrdered,
  Type,
  Palette,
} from "lucide-react";
import { Toggle } from "@workspace/ui/components/toggle";
import { Button } from "@workspace/ui/components/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";
import { Input } from "@workspace/ui/components/input";
import { useState } from "react";

interface ToolbarProps {
  editor: Editor | null;
}

const headings = [
  { label: "Paragraph", value: "paragraph" },
  { label: "Heading 1", value: "h1" },
  { label: "Heading 2", value: "h2" },
  { label: "Heading 3", value: "h3" },
];

const colors = [
  { label: "Default", value: "#000000" },
  { label: "Gray", value: "#64748b" },
  { label: "Red", value: "#ef4444" },
  { label: "Green", value: "#22c55e" },
  { label: "Blue", value: "#3b82f6" },
  { label: "Purple", value: "#a855f7" },
];

export function Toolbar({ editor }: ToolbarProps) {
  const [linkUrl, setLinkUrl] = useState("");

  if (!editor) return null;

  return (
    <div className="border rounded-t p-1 flex flex-wrap gap-1">
      <Popover>
        <PopoverTrigger asChild>
          <Toggle size="sm">
            <Type className="h-4 w-4" />
          </Toggle>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-1">
          {headings.map((heading) => (
            <Button
              key={heading.value}
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                if (heading.value === "paragraph") {
                  editor.chain().focus().setParagraph().run();
                } else {
                  editor.chain().focus().toggleHeading({
                    level: parseInt(heading.value[1] || "1") as 1 | 2 | 3,
                  }).run();
                }
              }}
            >
              {heading.label}
            </Button>
          ))}
        </PopoverContent>
      </Popover>

      <div className="w-px h-6 bg-border mx-1" />

      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("underline")}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
      >
        <Underline className="h-4 w-4" />
      </Toggle>

      <div className="w-px h-6 bg-border mx-1" />

      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>

      <div className="w-px h-6 bg-border mx-1" />

      <Toggle
        size="sm"
        pressed={editor.isActive({ textAlign: "left" })}
        onPressedChange={() => editor.chain().focus().setTextAlign("left").run()}
      >
        <AlignLeft className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive({ textAlign: "center" })}
        onPressedChange={() => editor.chain().focus().setTextAlign("center").run()}
      >
        <AlignCenter className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive({ textAlign: "right" })}
        onPressedChange={() => editor.chain().focus().setTextAlign("right").run()}
      >
        <AlignRight className="h-4 w-4" />
      </Toggle>

      <div className="w-px h-6 bg-border mx-1" />

      <Popover>
        <PopoverTrigger asChild>
          <Toggle size="sm">
            <Palette className="h-4 w-4" />
          </Toggle>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-1">
          {colors.map((color) => (
            <Button
              key={color.value}
              variant="ghost"
              className="w-full justify-start gap-2"
              onClick={() => editor.chain().focus().setColor(color.value).run()}
            >
              <div className="h-4 w-4 rounded-full" style={{ backgroundColor: color.value }} />
              {color.label}
            </Button>
          ))}
        </PopoverContent>
      </Popover>

      <div className="w-px h-6 bg-border mx-1" />

      <Popover>
        <PopoverTrigger asChild>
          <Toggle
            size="sm"
            pressed={editor.isActive("link")}
          >
            <Link className="h-4 w-4" />
          </Toggle>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="flex space-x-2">
            <Input
              placeholder="Paste link"
              value={linkUrl}
              onChange={e => setLinkUrl(e.target.value)}
            />
            <Button
              onClick={() => {
                if (linkUrl) {
                  editor.chain().focus().setLink({ href: linkUrl }).run();
                }
                setLinkUrl("");
              }}
            >
              Add
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
} 