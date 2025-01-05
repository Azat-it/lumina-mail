export type ViewMode = "write" | "preview" | "split";

export type CampaignData = {
  id?: number;
  subject: string;
  content: string;
  title: string;
  previewText: string;
  ctaText?: string;
  ctaUrl?: string;
  status: "draft" | "ready";
  lastUpdated: number;
}; 