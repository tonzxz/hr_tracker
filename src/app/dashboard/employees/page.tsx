"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { employees } from "@/lib/data";

export default function EmployeesPage() {
  const [localEmployees, setLocalEmployees] = useState([...employees]);

  const handleCreate = () => {
    const newEmployee = {
      id: `emp${localEmployees.length + 1}`,
      name: `New Employee ${localEmployees.length + 1}`,
      email: `new${localEmployees.length + 1}@example.com`,
      phoneNumber: null,
      jobTitle: "New Role",
      department: "Engineering",
      hireDate: new Date().toISOString().split("T")[0],
      employeeDetailsId: `det${localEmployees.length + 1}`,
      employeeProcessId: null,
    };
    setLocalEmployees([...localEmployees, newEmployee]);
  };

  const handleDelete = (id: string) => {
    setLocalEmployees(localEmployees.filter((emp) => emp.id !== id));
  };

  const handleUpdate = (id: string) => {
    const updated = localEmployees.map((emp) =>
      emp.id === id ? { ...emp, name: `${emp.name} (Updated)` } : emp
    );
    setLocalEmployees(updated);
  };

  return (
    <Card className="flex-1 rounded-xl bg-white shadow">
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <CardTitle className="text-lg font-semibold">Manage Employees</CardTitle>
            <CardDescription className="text-sm font-normal">
              View, Create, Update and Delete Employees
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCreate}
            className="flex items-center space-x-1"
          >
            <Plus className="h-4 w-4" />
            <span>Add Employee</span>
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
                  <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Job Title</TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Department</TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Hire Date</TableHead>
                  <TableHead className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-border">
                {localEmployees.map((employee, idx) => (
                  <TableRow
                    key={employee.id}
                    className={`transition-colors ${idx % 2 === 0 ? "bg-card" : "bg-muted/5"} hover:bg-muted/10`}
                  >
                    <TableCell className="px-6 py-4 text-sm font-medium">{employee.name}</TableCell>
                    <TableCell className="px-6 py-4 text-sm text-muted-foreground">{employee.email}</TableCell>
                    <TableCell className="px-6 py-4 text-sm">{employee.jobTitle}</TableCell>
                    <TableCell className="px-6 py-4 text-sm">{employee.department}</TableCell>
                    <TableCell className="px-6 py-4 text-sm">{employee.hireDate}</TableCell>
                    <TableCell className="px-6 py-4 text-right">
                      <div className="inline-flex items-center space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => handleUpdate(employee.id)}>
                          <Edit className="h-4 w-4 text-primary" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(employee.id)} className="text-destructive">
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