import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
  Img,
  Heading,
  Hr,
} from "@react-email/components";
import * as React from "react";

interface BaseTemplateProps {
  previewText?: string;
  children: React.ReactNode;
  unsubscribeLink?: string;
  headerTitle?: string;
}

export const BaseTemplate = ({
  previewText = "Lumina Mail Campaign",
  children,
  unsubscribeLink = "https://lumina.com",
  headerTitle = "Lumina Mail",
}: BaseTemplateProps) => {
  return (
    <Html>
      <Head>
        <title>{previewText}</title>
      </Head>
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid my-4 p-4 border-[#eaeaea] rounded-lg">
            {headerTitle && (
              <Section className="text-center">
                <Heading className="text-center">{headerTitle}</Heading>
              </Section>
            )}
            <Section>
              {children}
            </Section>

            <Hr className="my-4 border-t border-[#eaeaea]" />

            <Section>
              <Text className="text-sm text-gray-500 text-center m-0">
                This email was sent by <Link href="https://lumina-mail.com">Lumina Mail</Link>.
              </Text>
              <Text className="text-sm text-gray-500 text-center m-0">
                Copyright © {new Date().getFullYear()} Lumina Mail. All rights reserved.
              </Text>
              {!!unsubscribeLink && (
                <Text className="text-sm text-gray-500 text-center m-0">
                  If you'd like to unsubscribe, <Link href={unsubscribeLink}>click here</Link>
                </Text>
              )}
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}; 