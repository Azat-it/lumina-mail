"use client";

import { BaseTemplate } from "@workspace/email/emails/basic-layout";
import { renderAsync } from "@react-email/render";
import { useEffect, useState } from "react";

interface PreviewProps {
  content: string;
  subject?: string;
  title?: string;
  previewText?: string;
  ctaText?: string;
  ctaUrl?: string;
}

export function Preview({
  content,
  subject,
  title,
  previewText,
  ctaText,
  ctaUrl
}: PreviewProps) {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    const renderEmail = async () => {
      const rendered = await renderAsync(
        <BaseTemplate
          previewText={previewText || subject || "Email Preview"}
          headerTitle={title || subject}
        >
          <div dangerouslySetInnerHTML={{ __html: content }} />
          {ctaText && ctaUrl && (
            <div className="flex justify-center mt-4">
              <a
                href={ctaUrl}
                className="bg-black text-white px-6 py-3 rounded text-sm font-medium no-underline"
              >
                {ctaText}
              </a>
            </div>
          )}
        </BaseTemplate>
      );
      setHtml(rendered);
    };

    renderEmail();
  }, [content, subject, title, previewText, ctaText, ctaUrl]);

  return (
    <div className="h-[600px] rounded overflow-hidden border">
      <div className="h-[600px] bg-gray-50">
        <iframe
          srcDoc={html}
          className="w-full h-full"
          sandbox="allow-same-origin"
          title="Email Preview"
        />
      </div>
    </div>
  );
} 