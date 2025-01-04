import { Button, Heading, Text } from "@react-email/components";
import * as React from "react";
import { BaseTemplate } from "./basic-layout";
import { Markdown } from "@react-email/markdown";
interface CampaignEmailProps {
  title: string;
  previewText?: string;
  mainText: string;
  ctaText?: string;
  ctaUrl?: string;
}

const defaultMainText = `Hello Google Play Developer,

We strive to make Google Play a safe and trusted experience for users.
\n
We've added clarifications to our Target API Level policy. Because this is a clarification, our enforcement standards and practices for this policy remain the same.
\n
We’re noting exceptions to the Target API Level policy, which can be found in our updated Help Center article.These exceptions include permanently private apps and apps that target automotive or wearables form factors and are bundled within the same package. Learn more
\n
We’re also extending the deadline to give you more time to adjust to these changes. Now, apps that target API level 29 or below will start experiencing reduced distribution starting Jan 31, 2023 instead of Nov 1, 2022. If you need more time to update your app, you can request an extension to keep your app discoverable to all users until May 1, 2023.`;

export default ({
  title = "Lumina Mail",
  previewText = "Lumina Mail Campaign",
  mainText = defaultMainText,
  ctaText = "Learn More",
  ctaUrl = "https://luminamail.com",
}: CampaignEmailProps) => {
  return (
    <BaseTemplate
      headerTitle={title}
      previewText={previewText}
    >
      <Markdown
        markdownCustomStyles={{
          p: {
            fontSize: "14px",
          },
        }}
      >{mainText}</Markdown>
      {ctaText && ctaUrl && (
        <div className="flex justify-center mt-4">
          <Button
            href={ctaUrl}
            className="bg-black text-white px-6 py-3 rounded text-sm font-medium no-underline"
          >
            {ctaText}
          </Button>
        </div>
      )}
    </BaseTemplate>
  );
}; 