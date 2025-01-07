"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { Eye } from "lucide-react";
import { Preview } from "@/components/editor/preview";

interface PreviewDialogProps {
  content: string;
  subject: string;
  previewText: string;
  ctaText?: string;
  ctaUrl?: string;
}

export function PreviewDialog({ content, subject, previewText, ctaText, ctaUrl }: PreviewDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4 mr-2" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] w-[90vw]">
        <DialogHeader>
          <DialogTitle>Campaign Preview</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <div className="font-medium">Subject</div>
            <div className="text-sm text-muted-foreground">{subject}</div>
          </div>
          <div className="space-y-2">
            <div className="font-medium">Preview Text</div>
            <div className="text-sm text-muted-foreground">{previewText}</div>
          </div>
          <div className="border rounded-lg">
            <Preview content={content} ctaText={ctaText} ctaUrl={ctaUrl} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 