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

interface CampaignWithCount extends Campaign {
  _count: {
    recipients: number
  }
}

interface CampaignListProps {
  campaigns: CampaignWithCount[]
}

export function CampaignList({ campaigns }: CampaignListProps) {
  return (
    <div className="rounded-[0.375rem] border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Recipients</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Scheduled</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell className="font-medium">{campaign.name}</TableCell>
              <TableCell>{campaign.subject}</TableCell>
              <TableCell>{campaign._count.recipients}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(campaign.status)}>
                  {campaign.status}
                </Badge>
              </TableCell>
              <TableCell>{format(campaign.createdAt, 'MMM d, yyyy')}</TableCell>
              <TableCell>
                {campaign.scheduledAt
                  ? format(campaign.scheduledAt, 'MMM d, yyyy')
                  : '-'}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/campaigns/${campaign.id}/edit`} className="flex items-center">
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    {campaign.status === 'draft' && (
                      <DropdownMenuItem className="flex items-center">
                        <Send className="mr-2 h-4 w-4" />
                        Send Now
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem className="flex items-center text-destructive focus:text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
  )
}

function getStatusVariant(status: string) {
  switch (status) {
    case 'draft':
      return 'secondary'
    case 'scheduled':
      return 'destructive'
    case 'sending':
      return 'default'
    case 'sent':
      return 'default'
    default:
      return 'secondary'
  }
} 