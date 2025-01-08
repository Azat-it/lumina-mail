"use client";

import { Card, CardContent } from "@workspace/ui/components/card";
import { Label } from "@workspace/ui/components/label";
import CampaignEditor from "@/components/editor/campaign-editor";
import { Preview } from "@/components/editor/preview";
import { CampaignData, ViewMode } from "@/types/campaign";

interface EditorSectionProps {
  campaign: CampaignData;
  view: ViewMode;
  onContentChange: (content: string) => void;
}

export function EditorSection({ campaign, view, onContentChange }: EditorSectionProps) {
  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: view === "split" ? "1fr 1fr" : "1fr",
      }}
    >
      {(view === "write" || view === "split") && (
        <Card>
          <CardContent className="pt-6">
            <Label>Email Content</Label>
            <div className="mt-2">
              <CampaignEditor
                content={campaign.content}
                onChange={onContentChange}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {(view === "preview" || view === "split") && (
        <Card>
          <CardContent className="pt-6">
            <Label>Preview</Label>
            <div className="mt-2">
              <Preview {...campaign} />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 