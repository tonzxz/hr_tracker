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
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Briefcase, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, FileText, Users, Plus, Trash2, Edit } from "lucide-react";
import { employees, employeeDetails, employeeProcesses, visaTypes, clients } from "@/lib/data";

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [visaTypeFilter, setVisaTypeFilter] = useState("all");
  const [localEmployees, setLocalEmployees] = useState([...employees]);
  const itemsPerPage = 5;

  const filteredEmployees = localEmployees.filter((employee) => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === "all" ? true : employee.department === departmentFilter;
    const employeeDetail = employeeDetails.find((det) => det.id === employee.employeeDetailsId);
    const matchesVisaType = visaTypeFilter === "all"
      ? true
      : employeeDetail?.visaTypeId === visaTypeFilter;
    return matchesSearch && matchesDepartment && matchesVisaType;
  });

  const totalItems = filteredEmployees.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage);

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
      employeeProcessId: `proc${localEmployees.length + 1}`,
    };
    setLocalEmployees([...localEmployees, newEmployee]);
  };

  const handleDelete = (id: string) => {
    setLocalEmployees(localEmployees.filter((emp) => emp.id !== id));
  };

  const handleUpdate = (id: string) => {
    const updatedEmployees = localEmployees.map((emp) =>
      emp.id === id ? { ...emp, name: `${emp.name} (Updated)` } : emp
    );
    setLocalEmployees(updatedEmployees);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Card className="aspect-video bg-white shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{localEmployees.length}</div>
            <p className="text-xs text-muted-foreground">Active employees</p>
          </CardContent>
        </Card>
        <Card className="aspect-video bg-white shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Processes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {employeeProcesses.filter((proc) => !proc.offerLetterApprovalDateFromClientHR).length}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
        <Card className="aspect-video bg-white shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clients</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.length}</div>
            <p className="text-xs text-muted-foreground">Active clients</p>
          </CardContent>
        </Card>
      </div>
      <Card className="flex-1 rounded-xl bg-white shadow">
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <CardTitle className="text-lg font-semibold">Manage Employees</CardTitle>
              <CardDescription className="text-sm font-normal">
                View, Create, Update and Delete Employees
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={handleCreate} className="flex items-center space-x-1">
              <Plus className="h-4 w-4" /> <span>Add Employee</span>
            </Button>
          </div>
          <div className="flex flex-col gap-4 pt-4 md:grid-cols-3 md:flex-row">
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="md:w-1/3"
            />
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="md:w-1/5">
                <SelectValue placeholder="Filter by Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
              </SelectContent>
            </Select>
            <Select value={visaTypeFilter} onValueChange={setVisaTypeFilter}>
              <SelectTrigger className="md:w-1/5">
                <SelectValue placeholder="Filter by Visa Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Visa Types</SelectItem>
                {visaTypes.map((visaType) => (
                  <SelectItem key={visaType.id} value={visaType.id}>
                    {visaType.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
                    <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Visa Type</TableHead>
                    <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Process Status</TableHead>
                    <TableHead className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-border">
                  {paginatedEmployees.map((employee, idx) => {
                    const details = employeeDetails.find((det) => det.id === employee.employeeDetailsId);
                    const process = employeeProcesses.find((proc) => proc.id === employee.employeeProcessId);
                    const visaType = visaTypes.find((vt) => vt.id === details?.visaTypeId);
                    const processStatus = process?.offerLetterApprovalDateFromClientHR ? "Approved" : "Pending";

                    return (
                      <TableRow
                        key={employee.id}
                        className={`transition-colors ${idx % 2 === 0 ? "bg-card" : "bg-muted/5"} hover:bg-muted/10`}
                      >
                        <TableCell className="px-6 py-4 text-sm font-medium">{employee.name}</TableCell>
                        <TableCell className="px-6 py-4 text-sm text-muted-foreground">{employee.email}</TableCell>
                        <TableCell className="px-6 py-4 text-sm">{employee.jobTitle}</TableCell>
                        <TableCell className="px-6 py-4 text-sm">{employee.department}</TableCell>
                        <TableCell className="px-6 py-4 text-sm">{employee.hireDate}</TableCell>
                        <TableCell className="px-6 py-4 text-sm">{visaType?.name || "N/A"}</TableCell>
                        <TableCell className="px-6 py-4 text-sm">{processStatus}</TableCell>
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
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems} entries
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {getPageNumbers().map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}