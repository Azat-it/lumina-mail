"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@workspace/ui/components/table";
import { Badge } from "@workspace/ui/components/badge";
import { Input } from "@workspace/ui/components/input";
import { Contact } from "@prisma/client";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import { Pencil } from "lucide-react";
import { DeleteContact } from "./delete-contact";

interface SearchContactsProps {
  contacts: Contact[];
}

export function SearchContacts({ contacts }: SearchContactsProps) {
  const [search, setSearch] = useState("");

  const filteredContacts = contacts.filter(contact => {
    const searchTerm = search.toLowerCase();
    return (
      contact.email.toLowerCase().includes(searchTerm) ||
      contact.name?.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search contacts..."
          className="max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell className="font-medium">{contact.email}</TableCell>
                <TableCell>{contact.name || '-'}</TableCell>
                <TableCell>
                  <Badge variant={contact.status === 'subscribed' ? 'default' : 'secondary'}>
                    {contact.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/contacts/${contact.id}`}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Link>
                    </Button>
                    <DeleteContact id={contact.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredContacts.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  {contacts.length === 0
                    ? "No contacts found. Add your first contact to get started."
                    : "No contacts match your search."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
} 