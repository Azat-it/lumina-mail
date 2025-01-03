import Link from 'next/link'
import { prisma } from '@/lib/db'
import { Button } from '@workspace/ui/components/button'
import { Plus } from 'lucide-react'
import { CampaignList } from './campaign-list'
import { CampaignStats } from './campaign-stats'

export default async function CampaignsPage() {
  const campaigns = await prisma.campaign.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      _count: {
        select: {
          recipients: true,
        },
      },
    },
  })

  const stats = {
    total: campaigns.length,
    draft: campaigns.filter(c => c.status === 'draft').length,
    scheduled: campaigns.filter(c => c.status === 'scheduled').length,
    sent: campaigns.filter(c => c.status === 'sent').length,
  }

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
          <p className="text-sm text-muted-foreground">
            Create and manage your email campaigns
          </p>
        </div>
        <Link href="/campaigns/new" className="shrink-0">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Campaign
          </Button>
        </Link>
      </div>

      <CampaignStats stats={stats} />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Campaigns</h2>
        </div>
        <CampaignList campaigns={campaigns} />
      </div>
    </div>
  )
} 