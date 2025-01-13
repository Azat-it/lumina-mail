import { verifyUnsubscribeToken } from "@/lib/unsubscribe";
import { prisma } from "@/lib/db";
import Resubscribe from "./resubscribe";

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const awaitedSearchParams = await searchParams;
  const email = awaitedSearchParams.email;
  const token = awaitedSearchParams.token;
  const userId = awaitedSearchParams.userId;

  if (!email || !token || !userId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full p-6 text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Unsubscribe Link</h1>
          <p className="text-muted-foreground mb-4">
            The unsubscribe link appears to be invalid or expired.
          </p>
        </div>
      </div>
    );
  }

  const isValid = verifyUnsubscribeToken(email, userId, token);
  if (!isValid) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full p-6 text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Unsubscribe Link</h1>
          <p className="text-muted-foreground mb-4">
            The unsubscribe link appears to be invalid or expired.
          </p>
        </div>
      </div>
    );
  }

  // Update contact status
  await prisma.contact.update({
    where: {
      email_userId: {
        email,
        userId,
      },
    },
    data: {
      status: "unsubscribed",
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Successfully Unsubscribed</h1>
        <p className="text-muted-foreground mb-4">
          You have been successfully unsubscribed from our mailing list.
          You will no longer receive emails from us.
        </p>
        <Resubscribe email={email} userId={userId} />
      </div>
    </div>
  );
} 