"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Edit } from "lucide-react";
import { clients } from "@/lib/data";

export default function ClientsPage() {
  const [localClients, setLocalClients] = useState([...clients]);

  const handleCreate = () => {
    const newClient = {
      id: `client${localClients.length + 1}`,
      clientName: `New Client ${localClients.length + 1}`,
      clientShortName: `NC${localClients.length + 1}`,
    };
    setLocalClients([...localClients, newClient]);
  };

  const handleDelete = (id: string) => {
    setLocalClients(localClients.filter((client) => client.id !== id));
  };

  const handleUpdate = (id: string) => {
    const updatedClients = localClients.map((client) =>
      client.id === id ? { ...client, clientName: `${client.clientName} (Updated)` } : client
    );
    setLocalClients(updatedClients);
  };

  return (
    <Card className="flex-1 rounded-xl bg-white shadow">
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <CardTitle className="text-lg font-semibold">Manage Clients</CardTitle>
            <CardDescription className="text-sm font-normal">
              View, Create, Update and Delete Clients
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCreate}
            className="flex items-center space-x-1"
          >
            <Plus className="h-4 w-4" />
            <span>Add Client</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="overflow-x-auto">
          <div className="min-w-[700px] rounded-lg border border-border bg-card">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20">
                  <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Client Name</TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Short Name</TableHead>
                  <TableHead className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-border">
                {localClients.map((client, idx) => (
                  <TableRow
                    key={client.id}
                    className={`transition-colors ${idx % 2 === 0 ? "bg-card" : "bg-muted/5"} hover:bg-muted/10`}
                  >
                    <TableCell className="px-6 py-4 text-sm font-medium">{client.clientName}</TableCell>
                    <TableCell className="px-6 py-4 text-sm">{client.clientShortName}</TableCell>
                    <TableCell className="px-6 py-4 text-right">
                      <div className="inline-flex items-center space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => handleUpdate(client.id)}>
                          <Edit className="h-4 w-4 text-primary" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(client.id)} className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}