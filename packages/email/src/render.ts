import { render } from "@react-email/render";
import { CampaignEmail } from "../emails/campaign";

export interface RenderEmailOptions {
  title: string;
  previewText?: string;
  mainText: string;
  ctaText?: string;
  ctaUrl?: string;
}

export const renderCampaignEmail = (options: RenderEmailOptions): string => {
  return render(CampaignEmail(options));
}; 