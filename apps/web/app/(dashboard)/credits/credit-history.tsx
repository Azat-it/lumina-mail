"use client";

import { CreditTransaction } from "@prisma/client";
import { format } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@workspace/ui/components/table";
import { Badge } from "@workspace/ui/components/badge";

type TransactionType = "purchase" | "usage" | "refund";
type TransactionStatus = "pending" | "completed" | "failed";

interface CreditHistoryProps {
  transactions: CreditTransaction[];
}

export function CreditHistory({ transactions }: CreditHistoryProps) {
  return (
    <div className="rounded-[0.375rem] border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>
                {format(transaction.createdAt, "MMM d, yyyy")}
              </TableCell>
              <TableCell className="capitalize">{transaction.type}</TableCell>
              <TableCell className={getAmountColor(transaction.type as TransactionType)}>
                {transaction.type === "usage" ? "-" : "+"}
                {Math.abs(transaction.amount).toLocaleString()}
              </TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(transaction.status as TransactionStatus)}>
                  {transaction.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
          {transactions.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                No transactions found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function getAmountColor(type: TransactionType): string {
  switch (type) {
    case "usage":
      return "text-red-500";
    case "purchase":
    case "refund":
      return "text-green-500";
    default:
      return "";
  }
}

function getStatusVariant(status: TransactionStatus): "default" | "outline" | "destructive" | "secondary" {
  switch (status) {
    case "completed":
      return "default";
    case "pending":
      return "outline";
    case "failed":
      return "destructive";
    default:
      return "secondary";
  }
} 