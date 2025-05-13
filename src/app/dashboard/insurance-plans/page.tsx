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
import { insurancePlans } from "@/lib/data";

export default function InsurancePlansPage() {
  const [localInsurancePlans, setLocalInsurancePlans] = useState([...insurancePlans]);

  const handleCreate = () => {
    const newPlan = {
      id: `ip${localInsurancePlans.length + 1}`,
      name: `New Plan ${localInsurancePlans.length + 1}`,
    };
    setLocalInsurancePlans([...localInsurancePlans, newPlan]);
  };

  const handleDelete = (id: string) => {
    setLocalInsurancePlans(localInsurancePlans.filter((plan) => plan.id !== id));
  };

  const handleUpdate = (id: string) => {
    const updatedPlans = localInsurancePlans.map((plan) =>
      plan.id === id ? { ...plan, name: `${plan.name} (Updated)` } : plan
    );
    setLocalInsurancePlans(updatedPlans);
  };

  return (
    <Card className="flex-1 rounded-xl bg-white shadow">
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <CardTitle className="text-lg font-semibold">Manage Insurance Plans</CardTitle>
            <CardDescription className="text-sm font-normal">
              View, Create, Update and Delete Insurance Plans
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCreate}
            className="flex items-center space-x-1"
          >
            <Plus className="h-4 w-4" />
            <span>Add Insurance Plan</span>
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
                  <TableHead className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-border">
                {localInsurancePlans.map((plan, idx) => (
                  <TableRow
                    key={plan.id}
                    className={`transition-colors ${idx % 2 === 0 ? "bg-card" : "bg-muted/5"} hover:bg-muted/10`}
                  >
                    <TableCell className="px-6 py-4 text-sm font-medium">{plan.name}</TableCell>
                    <TableCell className="px-6 py-4 text-right">
                      <div className="inline-flex items-center space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => handleUpdate(plan.id)}>
                          <Edit className="h-4 w-4 text-primary" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(plan.id)} className="text-destructive">
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