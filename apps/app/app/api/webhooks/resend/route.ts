// This code is not functional


// import { headers } from "next/headers";
// import { prisma } from "@/lib/db";
// import { verifyWebhookSignature } from "@/lib/resend";

// export async function POST(req: Request) {
//   if (!process.env.RESEND_API_KEY) {
//     console.error("[Resend Webhook] Missing RESEND_API_KEY");
//     return new Response("Resend API key not configured", { status: 500 });
//   }

//   const body = await req.text();
//   const headersList = await headers();
//   const signature = headersList.get("resend-signature");

//   console.log("[Resend Webhook] Received event:", {
//     hasSignature: !!signature,
//   });

//   if (!signature) {
//     console.error("[Resend Webhook] Missing signature");
//     return new Response("Webhook signature missing", { status: 400 });
//   }

//   try {
//     // Verify webhook signature
//     const isValid = verifyWebhookSignature({
//       payload: body,
//       signature,
//       webhookSecret: process.env.RESEND_WEBHOOK_SECRET!,
//     });

//     if (!isValid) {
//       console.error("[Resend Webhook] Invalid signature");
//       return new Response("Invalid signature", { status: 400 });
//     }

//     const event = JSON.parse(body);
//     console.log("[Resend Webhook] Processing event:", {
//       type: event.type,
//       email: event.email,
//     });

//     // Extract campaign ID from email tags
//     const campaignId = event.tags?.campaign_id;
//     if (!campaignId) {
//       console.error("[Resend Webhook] Missing campaign ID");
//       return new Response("Missing campaign ID", { status: 400 });
//     }

//     // Store the event
//     await prisma.emailEvent.create({
//       data: {
//         type: event.type,
//         email: event.email,
//         metadata: JSON.stringify({
//           timestamp: event.timestamp,
//           ...event.data,
//         }),
//         campaignId: parseInt(campaignId),
//       },
//     });

//     // Update campaign recipient status if needed
//     if (event.type === "delivered" || event.type === "opened" || event.type === "clicked") {
//       await prisma.campaignRecipient.updateMany({
//         where: {
//           campaignId: parseInt(campaignId),
//           contact: {
//             email: event.email,
//           },
//         },
//         data: {
//           ...(event.type === "delivered" && { sentAt: new Date() }),
//           ...(event.type === "opened" && { openedAt: new Date() }),
//           ...(event.type === "clicked" && { clickedAt: new Date() }),
//         },
//       });
//     }

//     console.log("[Resend Webhook] Event processed successfully");
//     return new Response(null, { status: 200 });
//   } catch (error) {
//     console.error("[Resend Webhook] Error:", error);
//     return new Response(
//       "Webhook error: " + (error instanceof Error ? error.message : "Unknown error"),
//       { status: 400 }
//     );
//   }
// } 