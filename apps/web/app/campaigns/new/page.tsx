"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@workspace/ui/components/button";
import { useMediaQuery } from '@/hooks/use-media-query';
import { useSessionStorage } from '@/hooks/use-session-storage';
import { CampaignData, ViewMode } from '@/types/campaign';
import { CampaignHeader } from '@/components/campaigns/header';
import { CampaignForm } from '@/components/campaigns/form';
import { EditorSection } from '@/components/campaigns/editor-section';

const initialCampaign: CampaignData = {
  subject: "",
  content: "",
  title: "",
  previewText: "",
  ctaText: "",
  ctaUrl: "",
  status: "draft",
  lastUpdated: Date.now()
};

export default function NewCampaignPage() {
  const [campaign, setCampaign] = useSessionStorage<CampaignData>("draft-campaign", initialCampaign);
  const [view, setView] = useSessionStorage<ViewMode>("campaign-view", "split");
  const [lastSavedText, setLastSavedText] = useState("Not saved yet");
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (isMobile && view === "split") {
      setView("write");
    }
  }, [isMobile, view, setView]);

  useEffect(() => {
    if (campaign.lastUpdated) {
      setLastSavedText(`Last saved ${new Date(campaign.lastUpdated).toLocaleTimeString()}`);
    }
  }, [campaign.lastUpdated]);

  const updateCampaign = useCallback((field: keyof CampaignData, value: string) => {
    setCampaign(prev => {
      // Don't update if value hasn't changed
      if (prev[field] === value) return prev;

      const updates: Partial<CampaignData> = {
        [field]: value,
        lastUpdated: Date.now(),
      };

      // Handle subject line updates
      if (field === 'subject') {
        updates.previewText = value;
        if (!prev.title) {
          updates.title = value;
        }
      }

      return { ...prev, ...updates };
    });
  }, [setCampaign]);

  const handleSave = async (isDraft = true) => {
    const updatedCampaign = {
      ...campaign,
      status: isDraft ? "draft" : "ready",
    };
    console.log("Saving campaign:", updatedCampaign);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <CampaignHeader
        lastSavedText={lastSavedText}
        view={view}
        setView={setView}
        onClear={() => setCampaign(initialCampaign)}
        isMobile={isMobile}
      />

      <div className="flex-1 container max-w-[1400px] mx-auto py-6">
        <div className="space-y-6">
          <CampaignForm
            campaign={campaign}
            onUpdate={updateCampaign}
          />

          <EditorSection
            campaign={campaign}
            view={view}
            onContentChange={(content) => updateCampaign('content', content)}
          />

          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() => handleSave(true)}
            >
              Save as Draft
            </Button>
            <Button
              onClick={() => handleSave(false)}
            >
              Send Campaign
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 