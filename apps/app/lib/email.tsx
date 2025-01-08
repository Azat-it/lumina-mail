import { renderAsync } from "@react-email/render";
import { BaseTemplate } from "@workspace/email/emails/basic-layout";
import { generateUnsubscribeUrl } from "./unsubscribe";

interface RenderEmailOptions {
  content: string;
  subject: string;
  previewText?: string;
  title?: string;
  ctaText?: string;
  ctaUrl?: string;
  email: string;
  userId: string;
}

export async function renderEmail({ content, subject, previewText, title, ctaText, ctaUrl, email, userId }: RenderEmailOptions) {
  const unsubscribeUrl = generateUnsubscribeUrl(email, userId);

  return await renderAsync(
    <BaseTemplate
      previewText={previewText || subject}
      headerTitle={title || subject}
      unsubscribeLink={unsubscribeUrl}
    >
      <div dangerouslySetInnerHTML={{ __html: content }} />
      {ctaText && ctaUrl && (
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <a
            href={ctaUrl}
            style={{
              background: '#000000',
              color: '#ffffff',
              padding: '12px 24px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            {ctaText}
          </a>
        </div>
      )}
    </BaseTemplate>
  );
} 