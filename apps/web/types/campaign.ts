export interface CampaignData {
  subject: string;
  content: string;
  title: string;
  previewText: string;
  ctaText?: string;
  ctaUrl?: string;
  status: "draft" | "ready";
  lastUpdated?: number;
}

export type ViewMode = "write" | "preview" | "split"; 