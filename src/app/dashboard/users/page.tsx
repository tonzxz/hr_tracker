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
import { users } from "@/lib/data";

export default function UsersPage() {
  const [localUsers, setLocalUsers] = useState([...users]);

  const handleCreate = () => {
    const newUser = {
      id: `user${localUsers.length + 1}`,
      name: `New User ${localUsers.length + 1}`,
      email: `new${localUsers.length + 1}@example.com`,
      role: "CSM" as "CSM" | "HR_ADMIN",
    };
    setLocalUsers([...localUsers, newUser]);
  };

  const handleDelete = (id: string) => {
    setLocalUsers(localUsers.filter((user) => user.id !== id));
  };

  const handleUpdate = (id: string) => {
    const updatedUsers = localUsers.map((user) =>
      user.id === id ? { ...user, name: `${user.name} (Updated)` } : user
    );
    setLocalUsers(updatedUsers);
  };

  return (
    <Card className="flex-1 rounded-xl bg-white shadow">
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <CardTitle className="text-lg font-semibold">Manage Users</CardTitle>
            <CardDescription className="text-sm font-normal">
              View, Create, Update and Delete Users
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCreate}
            className="flex items-center space-x-1"
          >
            <Plus className="h-4 w-4" />
            <span>Add User</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="overflow-x-auto">
          <div className="min-w-[700px] rounded-lg border border-border bg-card">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20">
                  <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Role</TableHead>
                  <TableHead className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-border">
                {localUsers.map((user, idx) => (
                  <TableRow
                    key={user.id}
                    className={`transition-colors ${idx % 2 === 0 ? "bg-card" : "bg-muted/5"} hover:bg-muted/10`}
                  >
                    <TableCell className="px-6 py-4 text-sm font-medium">{user.name}</TableCell>
                    <TableCell className="px-6 py-4 text-sm text-muted-foreground">{user.email}</TableCell>
                    <TableCell className="px-6 py-4 text-sm">{user.role}</TableCell>
                    <TableCell className="px-6 py-4 text-right">
                      <div className="inline-flex items-center space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => handleUpdate(user.id)}>
                          <Edit className="h-4 w-4 text-primary" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(user.id)} className="text-destructive">
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