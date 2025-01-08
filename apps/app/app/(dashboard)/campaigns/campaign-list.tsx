"use client";

import Link from 'next/link'
import { Campaign } from '@prisma/client'
import { format } from 'date-fns'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@workspace/ui/components/table';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu'
import {
  MoreHorizontal,
  Pencil,
  Send,
  Trash2,
} from 'lucide-react'
import { deleteCampaign } from '@/app/actions/campaigns'
import { toast } from 'sonner'
import { PreviewDialog } from '@/components/campaigns/preview-dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@workspace/ui/components/alert-dialog";
import { useState } from 'react';
import { sendEmails } from '@/app/actions/emails';

interface CampaignWithCount extends Campaign {
  _count: {
    recipients: number
  }
}

interface CampaignListProps {
  campaigns: CampaignWithCount[]
}

export function CampaignList({ campaigns }: CampaignListProps) {
  const [campaignToDelete, setCampaignToDelete] = useState<number | null>(null);

  const handleDelete = async () => {
    if (!campaignToDelete) return;

    try {
      const result = await deleteCampaign(campaignToDelete);
      if (!result.success) {
        throw new Error(result.error);
      }
      toast.success("Campaign deleted");
      setCampaignToDelete(null);
    } catch (error) {
      console.error("Failed to delete campaign:", error);
      toast.error("Failed to delete campaign");
    }
  };

  const handleSend = async (campaign: CampaignWithCount) => {
    try {
      await sendEmails({
        campaignId: campaign.id,
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
    }
  };

  return (
    <>
      <div className="rounded-[0.375rem] border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Recipients</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[120px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((campaign) => (
              <TableRow key={campaign.id}>
                <TableCell className="font-medium">{campaign.title}</TableCell>
                <TableCell>{campaign.subject}</TableCell>
                <TableCell>{campaign._count.recipients}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(campaign.status)}>
                    {getStatusLabel(campaign.status)}
                  </Badge>
                </TableCell>
                <TableCell>{format(campaign.createdAt, 'MMM d, yyyy')}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <PreviewDialog
                      content={campaign.content}
                      subject={campaign.subject}
                      ctaText={campaign.ctaText || undefined}
                      ctaUrl={campaign.ctaUrl || undefined}
                      previewText={campaign.previewText}
                    />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {campaign.status === 'draft' && (
                          <>
                            <DropdownMenuItem asChild>
                              <Link href={`/campaigns/${campaign.id}`} className="flex items-center">
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="flex items-center"
                              onClick={() => handleSend(campaign)}
                            >
                              <Send className="mr-2 h-4 w-4" />
                              Send Now
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuItem
                          className="flex items-center text-destructive focus:text-destructive"
                          onClick={() => setCampaignToDelete(campaign.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {campaigns.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No campaigns found. Create your first campaign to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!campaignToDelete} onOpenChange={() => setCampaignToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the campaign.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

function getStatusVariant(status: string) {
  switch (status) {
    case 'draft':
      return 'secondary'
    case 'sending':
      return 'outline'
    case 'sent':
      return 'default'
    case 'error':
      return 'destructive'
    default:
      return 'secondary'
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case 'draft':
      return 'Draft'
    case 'sending':
      return 'Sending...'
    case 'sent':
      return 'Sent'
    case 'error':
      return 'Error'
    default:
      return status
  }
} 