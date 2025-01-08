"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@workspace/ui/components/button";
import { useMediaQuery } from '@/hooks/use-media-query';
import { CampaignData, ViewMode } from '@/types/campaign';
import { CampaignHeader } from '@/components/campaigns/header';
import { CampaignForm } from '@/components/campaigns/form';
import { EditorSection } from '@/components/campaigns/editor-section';
import { saveCampaign } from "@/app/actions/campaigns";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Campaign } from "@prisma/client";
import { sendEmails } from "@/app/actions/emails";

interface EditCampaignPageProps {
  campaign: Campaign;
}

function convertToClientCampaign(campaign: Campaign): CampaignData {
  return {
    id: campaign.id,
    subject: campaign.subject,
    content: campaign.content,
    title: campaign.title,
    previewText: campaign.previewText,
    ctaText: campaign.ctaText || undefined,
    ctaUrl: campaign.ctaUrl || undefined,
    status: campaign.status as "draft" | "scheduled" | "sending" | "sent",
    lastUpdated: campaign.updatedAt.getTime(),
  };
}

export function EditCampaignPage({ campaign: initialCampaign }: EditCampaignPageProps) {
  const router = useRouter();
  const [campaign, setCampaign] = useState<CampaignData>(convertToClientCampaign(initialCampaign));
  const [view, setView] = useState<ViewMode>("split");
  const [lastSavedText, setLastSavedText] = useState(`Last saved ${new Date(campaign.lastUpdated).toLocaleTimeString()}`);
  const [isSaving, setIsSaving] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (isMobile && view === "split") {
      setView("write");
    }
  }, [isMobile, view, setView]);

  const updateCampaign = useCallback((field: keyof CampaignData, value: string) => {
    setCampaign(prev => {
      if (prev[field] === value) return prev;

      const updates: Partial<CampaignData> = {
        [field]: value,
        lastUpdated: Date.now(),
      };

      if (field === 'subject') {
        updates.previewText = value;
        if (!prev.title) {
          updates.title = value;
        }
      }

      const newCampaign = { ...prev, ...updates };
      setLastSavedText(`Last saved ${new Date(newCampaign.lastUpdated).toLocaleTimeString()}`);
      return newCampaign;
    });
  }, []);

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

      toast.success(isDraft ? "Draft saved" : "Campaign ready to send");
      if (!isDraft) {
        router.push("/campaigns");
      }
    } catch (error) {
      console.error("Failed to save campaign:", error);
      toast.error("Failed to save campaign");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSend = async () => {
    setIsSaving(true);
    try {
      await sendEmails({
        campaignId: campaign.id?.toString() || '',
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
        mode="edit"
        lastSavedText={lastSavedText}
        view={view}
        setView={setView}
        onClear={() => setCampaign(convertToClientCampaign(initialCampaign))}
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