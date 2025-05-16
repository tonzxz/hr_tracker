"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Plus, Search, Filter, Edit, Trash2, Send } from "lucide-react";
import { employeeProcesses, EmployeeProcess, users, clients, employees } from "@/lib/data";
import { Switch } from "@radix-ui/react-switch";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"; // Assuming shadcn/ui provides this

// Placeholder for current user ID (replace with actual authentication logic)
const currentUserId = "user1"; // Example: Replace with context or session value (e.g., useAuth().userId)

export default function EmployeeProcessesPage() {
  const [localProcesses, setLocalProcesses] = useState<EmployeeProcess[]>([...employeeProcesses]);
  const [selectedProcess, setSelectedProcess] = useState<EmployeeProcess | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedProcess, setEditedProcess] = useState<EmployeeProcess | null>(null);
  const [filters, setFilters] = useState({
    csms: new Set<string>(),
    clients: new Set<string>(),
    progressRanges: new Set<string>(),
  });

  // Get unique CSM and Client names for filter options
  const uniqueCsms = [...new Set(localProcesses.map((p) => users.find((u) => u.id === p.csmId)?.name || "").filter(Boolean))];
  const uniqueClients = [...new Set(employees
    .map((e) => clients.find((c) => c.id === e.clientId)?.clientName || "")
    .filter(Boolean))];
  const progressRanges = ["0-25", "26-50", "51-75", "76-100"];

  // Calculate progress
  const calculateProgress = (process: EmployeeProcess) => {
    const dateFields = [
      process.requestReceiveDateFromCSMSales,
      process.offerLetterIssueDateForCSMClientReview,
      process.offerLetterApprovalDateFromClientHR,
      process.offerLetterSentDateByCSMEmployee,
      process.offerLetterContractSignDateByEmployee,
      process.medicalInsuranceInvoiceRequestDateByCSM,
      process.medicalInsurancePaymentDateByClient,
      process.eVisaWorkPermitIqamaRequestReceiveDateFromCSM,
      process.eVisaWorkPermitIqamaApplyDateByHRAdm,
      process.eVisaWorkPermitIqamaReceiveDateFromGafoor,
      process.contractReceiveDate,
      process.expectedStartDate,
      process.arrivalChangeStatusDateFromCSMEmployee,
      process.cohFormSignDate,
      process.clcMobPaid,
    ];
    const totalFields = dateFields.length;
    const filledFields = dateFields.filter(date => date !== null && date !== "").length;
    return (filledFields / totalFields) * 100;
  };

  // Get the latest three dates with their corresponding field names
  const getLatestActivities = (process: EmployeeProcess) => {
    const dateFields: { label: string; date: string }[] = [
      { label: "Request Date", date: process.requestReceiveDateFromCSMSales },
      { label: "Offer Letter Issued", date: process.offerLetterIssueDateForCSMClientReview },
      { label: "Offer Letter Approved", date: process.offerLetterApprovalDateFromClientHR },
      { label: "Offer Sent", date: process.offerLetterSentDateByCSMEmployee },
      { label: "Contract Signed", date: process.offerLetterContractSignDateByEmployee },
      { label: "Insurance Request", date: process.medicalInsuranceInvoiceRequestDateByCSM },
      { label: "Insurance Paid", date: process.medicalInsurancePaymentDateByClient },
      { label: "Visa Request", date: process.eVisaWorkPermitIqamaRequestReceiveDateFromCSM },
      { label: "Visa Applied", date: process.eVisaWorkPermitIqamaApplyDateByHRAdm },
      { label: "Visa Received", date: process.eVisaWorkPermitIqamaReceiveDateFromGafoor },
      { label: "Contract Received", date: process.contractReceiveDate },
      { label: "Expected Start", date: process.expectedStartDate },
      { label: "Arrival Status", date: process.arrivalChangeStatusDateFromCSMEmployee },
      { label: "COH Signed", date: process.cohFormSignDate },
      { label: "CLC/Mob Paid", date: process.clcMobPaid },
    ].filter((item): item is { label: string; date: string } => item.date !== null && item.date !== "");

    return dateFields
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
  };

  const handleCreate = () => {
    const newProcess: EmployeeProcess = {
      id: `proc${localProcesses.length + 1}`,
      requestReceiveDateFromCSMSales: new Date().toISOString().split("T")[0],
      csmId: currentUserId,
      hrAdmId: currentUserId,
      offerLetterIssueDateForCSMClientReview: null,
      offerLetterApprovalDateFromClientHR: null,
      offerLetterSentDateByCSMEmployee: null,
      offerLetterContractSignDateByEmployee: null,
      medicalInsuranceInvoiceRequestDateByCSM: null,
      medicalInsurancePaymentDateByClient: null,
      eVisaWorkPermitIqamaRequestReceiveDateFromCSM: null,
      eVisaWorkPermitIqamaApplyDateByHRAdm: null,
      eVisaWorkPermitIqamaReceiveDateFromGafoor: null,
      contractReceiveDate: null,
      expectedStartDate: null,
      arrivalChangeStatusDateFromCSMEmployee: null,
      cohFormSignDate: null,
      clcMobPaid: null,
    };
    setLocalProcesses([...localProcesses, newProcess]);
  };

  const handleDelete = (id: string) => {
    setLocalProcesses(localProcesses.filter((proc) => proc.id !== id));
    if (selectedProcess?.id === id) setSelectedProcess(null);
  };

  const handleEdit = () => {
    if (selectedProcess) {
      setIsEditing(true);
      setEditedProcess({ ...selectedProcess });
    }
  };

  const handleSave = () => {
    if (editedProcess && selectedProcess) {
      const updatedProcesses = localProcesses.map((proc) =>
        proc.id === selectedProcess.id ? editedProcess : proc
      );
      setLocalProcesses(updatedProcesses);
      setIsEditing(false);
      setEditedProcess(null);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProcess(null);
  };

  const handleInputChange = (field: keyof EmployeeProcess, value: string) => {
    if (editedProcess) {
      setEditedProcess((prev) => (prev ? { ...prev, [field]: value } : null));
    }
  };

  // Handle filter changes
  const handleFilterChange = (type: string, value: string, checked: boolean) => {
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

  // Filter processes based on multiple criteria
  const filteredProcesses = localProcesses.filter((process) => {
    const isAssigned = process.hrAdmId === currentUserId || process.csmId === currentUserId;
    const employee = employees.find((emp) => emp.employeeProcessId === process.id);
    const clientName = employee?.clientId
      ? clients.find((c) => c.id === employee.clientId)?.clientName || ""
      : "";
    const csmName = users.find((u) => u.id === process.csmId)?.name || "";
    const progress = calculateProgress(process);
    const progressRange = progress <= 25 ? "0-25" : progress <= 50 ? "26-50" : progress <= 75 ? "51-75" : "76-100";

    const matchesSearch = !searchTerm || 
      (employee?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
       clientName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCsm = filters.csms.size === 0 || filters.csms.has(csmName);
    const matchesClient = filters.clients.size === 0 || filters.clients.has(clientName);
    const matchesProgress = filters.progressRanges.size === 0 || filters.progressRanges.has(progressRange);

    return isAssigned && matchesSearch && matchesCsm && matchesClient && matchesProgress;
  });

  return (
    <Card className="flex-1 rounded-lg bg-white shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <CardTitle className="text-lg font-semibold">Track Employee Processes</CardTitle>
            <CardDescription className="text-sm text-gray-500">
              View and Manage Employee Processes
            </CardDescription>
          </div>
          <div className="flex space-x-2">
           
            <Button
              variant="outline"
              size="sm"
              onClick={handleCreate}
              className="flex items-center space-x-2 border-gray-300 rounded-md hover:bg-gray-50"
            >
              <Plus className="h-4 w-4" />
              <span>Add Process</span>
            </Button>
          </div>

        </div>
        <div className="mt-2 flex justify-between">
          
         <div className="relative">
              <Input
                type="text"
                placeholder="Search by name or client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-4 py-2 w-64 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-2 top-2 h-4 w-4 text-gray-400" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-1 border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuCheckboxItem
                  checked={filters.csms.size === 0}
                  onCheckedChange={(checked) => handleFilterChange("csms", "all", checked)}
                >
                  All CSMs
                </DropdownMenuCheckboxItem>
                {uniqueCsms.map((csm) => (
                  <DropdownMenuCheckboxItem
                    key={csm}
                    checked={filters.csms.has(csm)}
                    onCheckedChange={(checked) => handleFilterChange("csms", csm, checked)}
                  >
                    {csm}
                  </DropdownMenuCheckboxItem>
                ))}
                <DropdownMenuCheckboxItem
                  checked={filters.clients.size === 0}
                  onCheckedChange={(checked) => handleFilterChange("clients", "all", checked)}
                >
                  All Clients
                </DropdownMenuCheckboxItem>
                {uniqueClients.map((client) => (
                  <DropdownMenuCheckboxItem
                    key={client}
                    checked={filters.clients.has(client)}
                    onCheckedChange={(checked) => handleFilterChange("clients", client, checked)}
                  >
                    {client}
                  </DropdownMenuCheckboxItem>
                ))}
                <DropdownMenuCheckboxItem
                  checked={filters.progressRanges.size === 0}
                  onCheckedChange={(checked) => handleFilterChange("progressRanges", "all", checked)}
                >
                  All Progress
                </DropdownMenuCheckboxItem>
                {progressRanges.map((range) => (
                  <DropdownMenuCheckboxItem
                    key={range}
                    checked={filters.progressRanges.has(range)}
                    onCheckedChange={(checked) => handleFilterChange("progressRanges", range, checked)}
                  >
                    {range}%
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredProcesses.map((process) => {
            const employee = employees.find((emp) => emp.employeeProcessId === process.id);
            const client = employee?.clientId
              ? clients.find((client) => client.id === employee.clientId)
              : undefined;
            const progress = calculateProgress(process);
            const latestActivities = getLatestActivities(process);

            return (
              <Card
                key={process.id}
                className="w-[310px] bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer flex flex-col min-h-[220px]"
                onClick={() => setSelectedProcess(process)}
              >
                <CardHeader className="!py-0">
                  <CardTitle className="text-lg font-medium leading-none">
                    {employee?.name || "N/A"}
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    {client?.clientName || "N/A"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="!-mt-2.5 flex flex-col gap-1.5 flex-1">
                  <div className="mb-1.5 flex items-center space-x-2 border-gray-300 rounded-md border px-3 py-3 h-16">
                    <Send className="h-6 w-6 text-black" />
                    <div className="ml-1 flex-1 space-y-1">
                      <p className="text-xs font-medium leading-none">Request Date</p>
                      <p className="text-xs text-muted-foreground">
                        {process.requestReceiveDateFromCSMSales || "N/A"}
                      </p>
                    </div>
                    {/* <div className="flex flex-col items-end space-y-1">
                      <Switch />
                      <p className="text-xs font-medium leading-none ">
                        <span className="text-muted-foreground"> CSM: </span> {users.find((user) => user.id === process.csmId)?.name || "N/A"}
                      </p>
                      <p className="text-xs font-medium leading-none ">
                        <span className="text-muted-foreground"> HR: </span>{users.find((user) => user.id === process.hrAdmId)?.name || "N/A"}
                      </p>
                    </div> */}
                  </div>
                  <div className="flex-1">
                    {latestActivities.map((activity, index) => (
                      <div
                        key={index}
                        className="mb-2 grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0"
                      >
                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-primary" />
                        <div className="space-y-1">
                          <p className="text-xs font-medium leading-none">{activity.label}</p>
                          <p className="text-xs text-muted-foreground">{activity.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="relative mt-auto">
                  <div className="w-full bg-gray-200 rounded-full h-4  relative">
                    <div
                      className="bg-primary h-4 p-1.5 rounded-full transition-all duration-300 relative"
                      style={{ width: `${progress}%` }}
                    >
                      <span className="absolute inset-0 flex items-center  justify-center text-[10px] text-white font-medium">
                        {Math.round(progress)}%
                      </span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </CardContent>
      <Dialog open={!!selectedProcess} onOpenChange={() => setSelectedProcess(null)}>
        <DialogContent className="w-[1000px] max-w-[95vw] max-h-[80vh] overflow-y-auto bg-gray-100 rounded-xl shadow-md p-6">
          <DialogHeader className="border-b border-gray-300 pb-6 mb-6">
            <DialogTitle className="text-2xl font-bold text-gray-900">
              {selectedProcess && employees.find((emp) => emp.employeeProcessId === selectedProcess.id)?.name || "N/A"} (ID: {selectedProcess?.id})
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              View and edit the employee process details below.
            </DialogDescription>
          </DialogHeader>
          {selectedProcess && (
            <div className="w-full">
              <div className="rounded-md border">
                <table className="w-full border-separate border-spacing-0">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-2 text-left text-sm font-medium text-gray-700">Field</th>
                      <th className="p-2 text-left text-sm font-medium text-gray-700">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="p-2 text-sm font-medium text-gray-700">Client</td>
                      <td className="p-2 text-sm text-gray-900">
                        <Input
                          value={clients.find((client) => client.id === employees.find((emp) => emp.employeeProcessId === selectedProcess.id)?.clientId)?.clientName || ""}
                          onChange={(e) => handleInputChange("clientName" as keyof EmployeeProcess, e.target.value)}
                          disabled={!isEditing}
                          className="w-full border-none focus:ring-0 bg-transparent p-0"
                        />
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-2 text-sm font-medium text-gray-700">CSM</td>
                      <td className="p-2 text-sm text-gray-900">
                        <Input
                          value={isEditing ? (editedProcess?.csmId || "") : users.find((user) => user.id === selectedProcess.csmId)?.name || ""}
                          onChange={(e) => handleInputChange("csmId", e.target.value)}
                          disabled={!isEditing}
                          className="w-full border-none focus:ring-0 bg-transparent p-0"
                        />
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-2 text-sm font-medium text-gray-700">HR Admin</td>
                      <td className="p-2 text-sm text-gray-900">
                        <Input
                          value={isEditing ? (editedProcess?.hrAdmId || "") : users.find((user) => user.id === selectedProcess.hrAdmId)?.name || ""}
                          onChange={(e) => handleInputChange("hrAdmId", e.target.value)}
                          disabled={!isEditing}
                          className="w-full border-none focus:ring-0 bg-transparent p-0"
                        />
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-2 text-sm font-medium text-gray-700">Request Date</td>
                      <td className="p-2 text-sm text-gray-900">
                        <Input
                          type="date"
                          value={isEditing ? (editedProcess?.requestReceiveDateFromCSMSales || "") : selectedProcess.requestReceiveDateFromCSMSales || ""}
                          onChange={(e) => handleInputChange("requestReceiveDateFromCSMSales", e.target.value)}
                          disabled={!isEditing}
                          className="w-full border-none focus:ring-0 bg-transparent p-0"
                        />
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-2 text-sm font-medium text-gray-700">Offer Letter Issued</td>
                      <td className="p-2 text-sm text-gray-900">
                        <Input
                          type="date"
                          value={isEditing ? (editedProcess?.offerLetterIssueDateForCSMClientReview || "") : selectedProcess.offerLetterIssueDateForCSMClientReview || ""}
                          onChange={(e) => handleInputChange("offerLetterIssueDateForCSMClientReview", e.target.value)}
                          disabled={!isEditing}
                          className="w-full border-none focus:ring-0 bg-transparent p-0"
                        />
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-2 text-sm font-medium text-gray-700">Offer Letter Approved</td>
                      <td className="p-2 text-sm text-gray-900">
                        <Input
                          type="date"
                          value={isEditing ? (editedProcess?.offerLetterApprovalDateFromClientHR || "") : selectedProcess.offerLetterApprovalDateFromClientHR || ""}
                          onChange={(e) => handleInputChange("offerLetterApprovalDateFromClientHR", e.target.value)}
                          disabled={!isEditing}
                          className="w-full border-none focus:ring-0 bg-transparent p-0"
                        />
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-2 text-sm font-medium text-gray-700">Offer Sent</td>
                      <td className="p-2 text-sm text-gray-900">
                        <Input
                          type="date"
                          value={isEditing ? (editedProcess?.offerLetterSentDateByCSMEmployee || "") : selectedProcess.offerLetterSentDateByCSMEmployee || ""}
                          onChange={(e) => handleInputChange("offerLetterSentDateByCSMEmployee", e.target.value)}
                          disabled={!isEditing}
                          className="w-full border-none focus:ring-0 bg-transparent p-0"
                        />
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-2 text-sm font-medium text-gray-700">Contract Signed</td>
                      <td className="p-2 text-sm text-gray-900">
                        <Input
                          type="date"
                          value={isEditing ? (editedProcess?.offerLetterContractSignDateByEmployee || "") : selectedProcess.offerLetterContractSignDateByEmployee || ""}
                          onChange={(e) => handleInputChange("offerLetterContractSignDateByEmployee", e.target.value)}
                          disabled={!isEditing}
                          className="w-full border-none focus:ring-0 bg-transparent p-0"
                        />
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-2 text-sm font-medium text-gray-700">Insurance Request</td>
                      <td className="p-2 text-sm text-gray-900">
                        <Input
                          type="date"
                          value={isEditing ? (editedProcess?.medicalInsuranceInvoiceRequestDateByCSM || "") : selectedProcess.medicalInsuranceInvoiceRequestDateByCSM || ""}
                          onChange={(e) => handleInputChange("medicalInsuranceInvoiceRequestDateByCSM", e.target.value)}
                          disabled={!isEditing}
                          className="w-full border-none focus:ring-0 bg-transparent p-0"
                        />
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-2 text-sm font-medium text-gray-700">Insurance Paid</td>
                      <td className="p-2 text-sm text-gray-900">
                        <Input
                          type="date"
                          value={isEditing ? (editedProcess?.medicalInsurancePaymentDateByClient || "") : selectedProcess.medicalInsurancePaymentDateByClient || ""}
                          onChange={(e) => handleInputChange("medicalInsurancePaymentDateByClient", e.target.value)}
                          disabled={!isEditing}
                          className="w-full border-none focus:ring-0 bg-transparent p-0"
                        />
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-2 text-sm font-medium text-gray-700">Visa Request</td>
                      <td className="p-2 text-sm text-gray-900">
                        <Input
                          type="date"
                          value={isEditing ? (editedProcess?.eVisaWorkPermitIqamaRequestReceiveDateFromCSM || "") : selectedProcess.eVisaWorkPermitIqamaRequestReceiveDateFromCSM || ""}
                          onChange={(e) => handleInputChange("eVisaWorkPermitIqamaRequestReceiveDateFromCSM", e.target.value)}
                          disabled={!isEditing}
                          className="w-full border-none focus:ring-0 bg-transparent p-0"
                        />
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-2 text-sm font-medium text-gray-700">Visa Applied</td>
                      <td className="p-2 text-sm text-gray-900">
                        <Input
                          type="date"
                          value={isEditing ? (editedProcess?.eVisaWorkPermitIqamaApplyDateByHRAdm || "") : selectedProcess.eVisaWorkPermitIqamaApplyDateByHRAdm || ""}
                          onChange={(e) => handleInputChange("eVisaWorkPermitIqamaApplyDateByHRAdm", e.target.value)}
                          disabled={!isEditing}
                          className="w-full border-none focus:ring-0 bg-transparent p-0"
                        />
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-2 text-sm font-medium text-gray-700">Visa Received</td>
                      <td className="p-2 text-sm text-gray-900">
                        <Input
                          type="date"
                          value={isEditing ? (editedProcess?.eVisaWorkPermitIqamaReceiveDateFromGafoor || "") : selectedProcess.eVisaWorkPermitIqamaReceiveDateFromGafoor || ""}
                          onChange={(e) => handleInputChange("eVisaWorkPermitIqamaReceiveDateFromGafoor", e.target.value)}
                          disabled={!isEditing}
                          className="w-full border-none focus:ring-0 bg-transparent p-0"
                        />
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-2 text-sm font-medium text-gray-700">Contract Received</td>
                      <td className="p-2 text-sm text-gray-900">
                        <Input
                          type="date"
                          value={isEditing ? (editedProcess?.contractReceiveDate || "") : selectedProcess.contractReceiveDate || ""}
                          onChange={(e) => handleInputChange("contractReceiveDate", e.target.value)}
                          disabled={!isEditing}
                          className="w-full border-none focus:ring-0 bg-transparent p-0"
                        />
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-2 text-sm font-medium text-gray-700">Expected Start</td>
                      <td className="p-2 text-sm text-gray-900">
                        <Input
                          type="date"
                          value={isEditing ? (editedProcess?.expectedStartDate || "") : selectedProcess.expectedStartDate || ""}
                          onChange={(e) => handleInputChange("expectedStartDate", e.target.value)}
                          disabled={!isEditing}
                          className="w-full border-none focus:ring-0 bg-transparent p-0"
                        />
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-2 text-sm font-medium text-gray-700">Arrival Status</td>
                      <td className="p-2 text-sm text-gray-900">
                        <Input
                          type="date"
                          value={isEditing ? (editedProcess?.arrivalChangeStatusDateFromCSMEmployee || "") : selectedProcess.arrivalChangeStatusDateFromCSMEmployee || ""}
                          onChange={(e) => handleInputChange("arrivalChangeStatusDateFromCSMEmployee", e.target.value)}
                          disabled={!isEditing}
                          className="w-full border-none focus:ring-0 bg-transparent p-0"
                        />
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-2 text-sm font-medium text-gray-700">COH Signed</td>
                      <td className="p-2 text-sm text-gray-900">
                        <Input
                          type="date"
                          value={isEditing ? (editedProcess?.cohFormSignDate || "") : selectedProcess.cohFormSignDate || ""}
                          onChange={(e) => handleInputChange("cohFormSignDate", e.target.value)}
                          disabled={!isEditing}
                          className="w-full border-none focus:ring-0 bg-transparent p-0"
                        />
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-2 text-sm font-medium text-gray-700">CLC/Mob Paid</td>
                      <td className="p-2 text-sm text-gray-900">
                        <Input
                          type="date"
                          value={isEditing ? (editedProcess?.clcMobPaid || "") : selectedProcess.clcMobPaid || ""}
                          onChange={(e) => handleInputChange("clcMobPaid", e.target.value)}
                          disabled={!isEditing}
                          className="w-full border-none focus:ring-0 bg-transparent p-0"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className="mt-6 flex justify-end space-x-4 border-t border-gray-200 pt-4">
            {!isEditing ? (
              <>
                <Button variant="outline" onClick={handleEdit} className="bg-primary text-white hover:bg-green-600 rounded-md px-4 py-2">
                  <Edit className="h-4 w-4 mr-2" /> Edit
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(selectedProcess!.id)} className="bg-red-500 text-white hover:bg-red-600 rounded-md px-4 py-2">
                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={handleCancel} className="bg-gray-300 text-gray-800 hover:bg-gray-400 rounded-md px-4 py-2">
                  Cancel
                </Button>
                <Button variant="default" onClick={handleSave} className="bg-blue-500 text-white hover:bg-blue-600 rounded-md px-4 py-2">
                  Save
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}