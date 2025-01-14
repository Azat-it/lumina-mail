"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@workspace/ui/components/button";
import { useMediaQuery } from '@/hooks/use-media-query';
import { useSessionStorage } from '@/hooks/use-session-storage';
import { CampaignData, ViewMode } from '@/types/campaign';
import { CampaignHeader } from '@/components/campaigns/header';
import { CampaignForm } from '@/components/campaigns/form';
import { EditorSection } from '@/components/campaigns/editor-section';
import { saveCampaign } from "@/app/actions/campaigns";
import { toast } from "sonner"
import { sendEmails } from "@/app/actions/emails";

const initialCampaign: CampaignData = {
  id: undefined,
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
  const [isSaving, setIsSaving] = useState(false);
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
    try {
      setIsSaving(true);
      const result = await saveCampaign({
        id: campaign.id,
        subject: campaign.subject,
        content: campaign.content,
        title: campaign.title,
        previewText: campaign.previewText,
        ctaText: campaign.ctaText,
        ctaUrl: campaign.ctaUrl,
        status: isDraft ? "draft" : "scheduled",
      });

      if (!result.success) {
        throw new Error(result.error);
      }
      setCampaign(prev => ({
        ...prev,
        id: result.data?.id,
        lastUpdated: result.data?.updatedAt?.getTime() ?? Date.now(),
      }));

      toast.success(isDraft ? "Draft saved" : "Campaign ready to send");
    } catch (error) {
      console.error("Failed to save campaign:", error);
      toast.error("Failed to save campaign");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSend = async () => {
    if (!campaign.id) {
      toast.error("Campaign not found");
      return;
    }

    setIsSaving(true);
    try {
      await sendEmails({
        campaignId: campaign.id,
        subject: campaign.subject,
        content: campaign.content,
        from: 'Lumina Mail <onboarding@resend.dev>',
        previewText: campaign.previewText,
        title: campaign.title,
        ctaText: campaign.ctaText || undefined,
        ctaUrl: campaign.ctaUrl || undefined,
      });
      toast.success("Campaign is being sent");
    } catch (error) {
      console.error("Failed to send campaign:", error);
      toast.error("Failed to send campaign");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <CampaignHeader
        mode="create"
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
              disabled={isSaving}
            >
              {isSaving ? "Loading..." : "Save as Draft"}
            </Button>
            <Button
              onClick={() => handleSend()}
              disabled={isSaving}
            >
              {isSaving ? "Loading..." : "Send Campaign"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 