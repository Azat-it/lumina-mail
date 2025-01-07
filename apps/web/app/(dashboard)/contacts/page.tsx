import Link from 'next/link'
import { prisma } from '@/lib/db'
import { Button } from '@workspace/ui/components/button'
import { Plus } from 'lucide-react'
import { ContactList } from './contact-list'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { ContactStats } from './contact-stats'

export default async function ContactsPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  if (!session?.user?.id) {
    return { success: false, error: "Not authenticated" };
  }

  const contacts = await prisma.contact.findMany({
    where: {
      userId: session.user.id
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const stats = {
    total: contacts.length,
    subscribed: contacts.filter(c => c.status === 'subscribed').length,
    unsubscribed: contacts.filter(c => c.status === 'unsubscribed').length,
  }

  return (
    <div className="container max-w-[1400px] mx-auto flex flex-col gap-8 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
          <p className="text-sm text-muted-foreground">
            Manage your contacts
          </p>
        </div>
        <Link href="/contacts/new" className="shrink-0 group">
          <Button>
            <Plus className="h-4 w-4 group-hover:rotate-180 transition duration-150" />
            New Contact
          </Button>
        </Link>
      </div>

      <ContactStats stats={stats} />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Contacts</h2>
        </div>
        <ContactList contacts={contacts} />
      </div>
    </div>
  )
} 