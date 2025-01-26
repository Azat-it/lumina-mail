"use client";

import Link from 'next/link'
import { Contact } from '@prisma/client'
import { format } from 'date-fns'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@workspace/ui/components/table';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Checkbox } from '@workspace/ui/components/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu'
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  UserMinus,
  UserPlus,
} from 'lucide-react'
import { toast } from 'sonner'
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
import { bulkToggleSubscription, deleteContact, toggleContactSubscription } from '@/app/actions/contacts';

interface ContactListProps {
  contacts: Contact[]
}

export function ContactList({ contacts }: ContactListProps) {
  const [contactToDelete, setContactToDelete] = useState<string | null>(null);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  const handleDelete = async (id: string) => {
    if (!id) return;

    try {
      const result = await deleteContact(id);
      if (!result.success) {
        throw new Error(result.error);
      }
      toast.success("Contact deleted");
    } catch (error) {
      console.error("Failed to delete contact:", error);
      toast.error("Failed to delete contact");
    }
  };

  const handleToggleSubscription = async (id: string) => {
    try {
      const result = await toggleContactSubscription(id);
      if (!result.success) {
        throw new Error(result.error);
      }
      toast.success("Subscription status updated");
    } catch (error) {
      console.error("Failed to toggle subscription:", error);
      toast.error("Failed to update subscription status");
    }
  };

  const handleBulkToggleSubscription = async (status: "subscribed" | "unsubscribed") => {
    if (selectedContacts.length === 0) return;

    try {
      const result = await bulkToggleSubscription(selectedContacts, status);
      if (!result.success) {
        throw new Error(result.error);
      }
      toast.success(`${selectedContacts.length} contacts updated`);
      setSelectedContacts([]);
    } catch (error) {
      console.error("Failed to update contacts:", error);
      toast.error("Failed to update contacts");
    }
  };

  const toggleSelectAll = () => {
    if (selectedContacts.length === contacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(contacts.map(c => c.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedContacts.includes(id)) {
      setSelectedContacts(selectedContacts.filter(c => c !== id));
    } else {
      setSelectedContacts([...selectedContacts, id]);
    }
  };

  return (
    <>
      {selectedContacts.length > 0 && (
        <div className="flex items-center gap-2 mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleBulkToggleSubscription('subscribed')}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Subscribe Selected
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleBulkToggleSubscription('unsubscribed')}
          >
            <UserMinus className="h-4 w-4 mr-2" />
            Unsubscribe Selected
          </Button>
        </div>
      )}

      <div className="rounded-[0.375rem] border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedContacts.length === contacts.length}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Metadata</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[120px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedContacts.includes(contact.id)}
                    onCheckedChange={() => toggleSelect(contact.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{contact.name}</TableCell>
                <TableCell>{contact.metadata}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(contact.status)}>
                    {contact.status}
                  </Badge>
                </TableCell>
                <TableCell>{format(contact.createdAt, 'MMM d, yyyy')}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/contacts/${contact.id}`} className="flex items-center">
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleToggleSubscription(contact.id)}
                          className="flex items-center"
                        >
                          {contact.status === 'subscribed' ? (
                            <>
                              <UserMinus className="mr-2 h-4 w-4" />
                              Unsubscribe
                            </>
                          ) : (
                            <>
                              <UserPlus className="mr-2 h-4 w-4" />
                              Subscribe
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="flex items-center text-destructive focus:text-destructive"
                          onClick={() => setContactToDelete(contact.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <AlertDialog open={!!contactToDelete} onOpenChange={() => setContactToDelete(null)}>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the contact.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(contact.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
            {contacts.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No contacts found. Create your first contact to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

function getStatusVariant(status: string) {
  switch (status) {
    case 'subscribed':
      return 'secondary'
    case 'unsubscribed':
      return 'destructive'
    case 'pending':
      return 'default'
    default:
      return 'secondary'
  }
} 