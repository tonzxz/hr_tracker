// Path: employee-processes/page.tsx
// Components:
// - employee-processes/components/ProcessCard.tsx
// - employee-processes/components/ProcessDialog.tsx
// - employee-processes/components/ProcessUtils.ts

"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/ui/dialog";
import { Search, Filter } from "lucide-react";
import { employeeProcesses, EmployeeProcess, users, clients, employees } from "@/lib/data";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import ProcessCard from "./components/ProcessCard";
import ProcessDialog from "./components/ProcessDialog";
import { calculateProgress, getLatestActivities, useProcessState } from "./components/ProcessUtils";

const currentUserId = "user1"; // Replace with actual authentication logic

export default function EmployeeProcessesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    localProcesses,
    selectedProcess,
    isEditing,
    editedProcess,
    filters,
    setLocalProcesses,
    setSelectedProcess,
    setIsEditing,
    setEditedProcess,
    setFilters,
  } = useProcessState(employeeProcesses);

  const uniqueCsms = [...new Set(localProcesses.map((p) => users.find((u) => u.id === p.csmId)?.name || "").filter(Boolean))];
  const uniqueClients = [...new Set(employees.map((e) => clients.find((c) => c.id === e.clientId)?.clientName || "").filter(Boolean))];
  const progressRanges = ["0-25", "26-50", "51-75", "76-100"];

  const filteredProcesses = localProcesses.filter((process) => {
    const isAssigned = process.hrAdmId === currentUserId || process.csmId === currentUserId;
    const employee = employees.find((emp) => emp.employeeProcessId === process.id);
    const clientName = employee?.clientId ? clients.find((c) => c.id === employee.clientId)?.clientName || "" : "";
    const csmName = users.find((u) => u.id === process.csmId)?.name || "";
    const progress = calculateProgress(process);
    const progressRange = progress <= 25 ? "0-25" : progress <= 50 ? "26-50" : progress <= 75 ? "51-75" : "76-100";

    const matchesSearch = !searchTerm || (employee?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || clientName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCsm = filters.csms.size === 0 || filters.csms.has(csmName);
    const matchesClient = filters.clients.size === 0 || filters.clients.has(clientName);
    const matchesProgress = filters.progressRanges.size === 0 || filters.progressRanges.has(progressRange);

    return isAssigned && matchesSearch && matchesCsm && matchesClient && matchesProgress;
  });

  const handleFilterChange = (type: "csms" | "clients" | "progressRanges", value: string, checked: boolean) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      if (checked) {
        newFilters[type].add(value);
      } else {
        newFilters[type].delete(value);
      }
      return newFilters;
    });
  };

  const handleClearFilters = () => {
    setFilters({
      csms: new Set<string>(),
      clients: new Set<string>(),
      progressRanges: new Set<string>(),
    });
  };

  return (
    <Card className="flex-1 rounded-lg bg-white shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <CardTitle className="text-lg font-semibold">Track Employee Processes</CardTitle>
            <CardDescription className="text-sm text-gray-500">View and Manage Employee Processes</CardDescription>
          </div>
        </div>
        <div className="mt-2 flex justify-between items-center">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search by name or client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-80 border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          <div className="flex space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center space-x-2 border-gray-200 rounded-md hover:bg-gray-50">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">CSM</h4>
                    <div className="space-y-2">
                      {uniqueCsms.map((csm) => (
                        <div key={csm} className="flex items-center space-x-2">
                          <Checkbox
                            id={`csm-${csm}`}
                            checked={filters.csms.has(csm)}
                            onCheckedChange={(checked) => handleFilterChange("csms", csm, checked)}
                          />
                          <Label htmlFor={`csm-${csm}`} className="text-sm text-gray-600">{csm}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Client</h4>
                    <div className="space-y-2">
                      {uniqueClients.map((client) => (
                        <div key={client} className="flex items-center space-x-2">
                          <Checkbox
                            id={`client-${client}`}
                            checked={filters.clients.has(client)}
                            onCheckedChange={(checked) => handleFilterChange("clients", client, checked)}
                          />
                          <Label htmlFor={`client-${client}`} className="text-sm text-gray-600">{client}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Progress Range</h4>
                    <div className="space-y-2">
                      {progressRanges.map((range) => (
                        <div key={range} className="flex items-center space-x-2">
                          <Checkbox
                            id={`progress-${range}`}
                            checked={filters.progressRanges.has(range)}
                            onCheckedChange={(checked) => handleFilterChange("progressRanges", range, checked)}
                          />
                          <Label htmlFor={`progress-${range}`} className="text-sm text-gray-600">{range}%</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-2"
                    onClick={handleClearFilters}
                  >
                    Clear Filters
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredProcesses.map((process) => (
            <ProcessCard key={process.id} process={process} onClick={setSelectedProcess} />
          ))}
        </div>
      </CardContent>
      <Dialog open={!!selectedProcess} onOpenChange={() => setSelectedProcess(null)}>
        <ProcessDialog
          selectedProcess={selectedProcess}
          isEditing={isEditing}
          editedProcess={editedProcess}
          onEdit={setIsEditing}
          onSave={setLocalProcesses}
          onCancel={setIsEditing}
          onDelete={(id) => setLocalProcesses((prev) => prev.filter((p) => p.id !== id))}
          setIsEditing={setIsEditing}
          setEditedProcess={setEditedProcess}
        />
      </Dialog>
    </Card>
  );
}