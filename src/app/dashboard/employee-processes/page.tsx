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
import { employeeProcesses, EmployeeProcess, users, clients, employees } from "@/lib/data";

export default function EmployeeProcessesPage() {
  const [localProcesses, setLocalProcesses] = useState<EmployeeProcess[]>([...employeeProcesses]);

  const handleCreate = () => {
    const newProcess: EmployeeProcess = {
      id: `proc${localProcesses.length + 1}`,
      requestReceiveDateFromCSMSales: new Date().toISOString().split("T")[0],
      csmId: `user${Math.floor(Math.random() * 4) + 1}`,
      hrAdmId: `user${Math.floor(Math.random() * 4) + 1}`,
      clientId: `client${Math.floor(Math.random() * 4) + 1}`,
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
  };

  const handleUpdate = (id: string) => {
    const updatedProcesses = localProcesses.map((proc) =>
      proc.id === id
        ? {
            ...proc,
            offerLetterApprovalDateFromClientHR: proc.offerLetterApprovalDateFromClientHR
              ? null
              : new Date().toISOString().split("T")[0],
          }
        : proc
    );
    setLocalProcesses(updatedProcesses);
  };

  return (
    <Card className="flex-1 rounded-xl bg-white shadow">
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <CardTitle className="text-lg font-semibold">Manage Employee Processes</CardTitle>
            <CardDescription className="text-sm font-normal">
              View, Create, Update and Delete Employee Processes
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCreate}
            className="flex items-center space-x-1"
          >
            <Plus className="h-4 w-4" />
            <span>Add Process</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="overflow-x-auto">
          <div className="min-w-[700px] rounded-lg border border-border bg-card">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20">
                  <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Process ID</TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Employee Name</TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">CSM Name</TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">HR Admin Name</TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Client Name</TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Request Date</TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Offer Letter Issued</TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Offer Letter Approved</TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Offer Sent</TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Contract Signed</TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Insurance Request</TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Insurance Paid</TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Visa Request</TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Visa Applied</TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Visa Received</TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Contract Received</TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Expected Start</TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Arrival Status</TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">COH Signed</TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">CLC/Mob Paid</TableHead>
                  <TableHead className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-border">
                {localProcesses.map((process, idx) => {
                  const csm = users.find((user) => user.id === process.csmId);
                  const hrAdmin = users.find((user) => user.id === process.hrAdmId);
                  const client = clients.find((client) => client.id === process.clientId);
                  const employee = employees.find((emp) => emp.employeeProcessId === process.id);

                  return (
                    <TableRow
                      key={process.id}
                      className={`transition-colors ${idx % 2 === 0 ? "bg-card" : "bg-muted/5"} hover:bg-muted/10`}
                    >
                      <TableCell className="px-6 py-4 text-sm font-medium">{process.id}</TableCell>
                      <TableCell className="px-6 py-4 text-sm">{employee?.name || "N/A"}</TableCell>
                      <TableCell className="px-6 py-4 text-sm">{csm?.name || "N/A"}</TableCell>
                      <TableCell className="px-6 py-4 text-sm">{hrAdmin?.name || "N/A"}</TableCell>
                      <TableCell className="px-6 py-4 text-sm">{client?.clientName || "N/A"}</TableCell>
                      <TableCell className="px-6 py-4 text-sm">{process.requestReceiveDateFromCSMSales}</TableCell>
                      <TableCell className="px-6 py-4 text-sm">{process.offerLetterIssueDateForCSMClientReview || "N/A"}</TableCell>
                      <TableCell className="px-6 py-4 text-sm">{process.offerLetterApprovalDateFromClientHR || "Pending"}</TableCell>
                      <TableCell className="px-6 py-4 text-sm">{process.offerLetterSentDateByCSMEmployee || "N/A"}</TableCell>
                      <TableCell className="px-6 py-4 text-sm">{process.offerLetterContractSignDateByEmployee || "N/A"}</TableCell>
                      <TableCell className="px-6 py-4 text-sm">{process.medicalInsuranceInvoiceRequestDateByCSM || "N/A"}</TableCell>
                      <TableCell className="px-6 py-4 text-sm">{process.medicalInsurancePaymentDateByClient || "N/A"}</TableCell>
                      <TableCell className="px-6 py-4 text-sm">{process.eVisaWorkPermitIqamaRequestReceiveDateFromCSM || "N/A"}</TableCell>
                      <TableCell className="px-6 py-4 text-sm">{process.eVisaWorkPermitIqamaApplyDateByHRAdm || "N/A"}</TableCell>
                      <TableCell className="px-6 py-4 text-sm">{process.eVisaWorkPermitIqamaReceiveDateFromGafoor || "N/A"}</TableCell>
                      <TableCell className="px-6 py-4 text-sm">{process.contractReceiveDate || "N/A"}</TableCell>
                      <TableCell className="px-6 py-4 text-sm">{process.expectedStartDate || "N/A"}</TableCell>
                      <TableCell className="px-6 py-4 text-sm">{process.arrivalChangeStatusDateFromCSMEmployee || "N/A"}</TableCell>
                      <TableCell className="px-6 py-4 text-sm">{process.cohFormSignDate || "N/A"}</TableCell>
                      <TableCell className="px-6 py-4 text-sm">{process.clcMobPaid || "N/A"}</TableCell>
                      <TableCell className="px-6 py-4 text-right">
                        <div className="inline-flex items-center space-x-2">
                          <Button variant="ghost" size="icon" onClick={() => handleUpdate(process.id)}>
                            <Edit className="h-4 w-4 text-primary" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(process.id)} className="text-destructive">
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
      </CardContent>
    </Card>
  );
}