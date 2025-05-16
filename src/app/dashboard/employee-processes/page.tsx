"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
import { Plus, Search, Filter, Edit, Trash2 } from "lucide-react";
import { employeeProcesses, EmployeeProcess, users, clients, employees } from "@/lib/data";

// Placeholder for current user ID (replace with actual authentication logic)
const currentUserId = "user1"; // Example: Replace with context or session value (e.g., useAuth().userId)

export default function EmployeeProcessesPage() {
  const [localProcesses, setLocalProcesses] = useState<EmployeeProcess[]>([...employeeProcesses]);
  const [selectedProcess, setSelectedProcess] = useState<EmployeeProcess | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProcess, setEditedProcess] = useState<EmployeeProcess | null>(null);

  // Filter processes based on current user's HR Admin or CSM role, search term, and filter status
  const filteredProcesses = localProcesses.filter((process) => {
    const isAssigned = process.hrAdmId === currentUserId || process.csmId === currentUserId;
    const employee = employees.find((emp) => emp.employeeProcessId === process.id);
    const client = employee?.clientId
      ? clients.find((client) => client.id === employee.clientId)
      : undefined;
    const matchesSearch = !searchTerm || 
      (employee?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
       client?.clientName?.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = !filterStatus || 
      (filterStatus === "Pending" && !process.offerLetterApprovalDateFromClientHR) ||
      (filterStatus === "Completed" && process.offerLetterApprovalDateFromClientHR);
    return isAssigned && matchesSearch && matchesFilter;
  });

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

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold text-gray-900">Manage Employee Processes</h1>
          <p className="text-sm text-gray-500 mt-1">
            View, Create, Update, and Delete Employee Processes
          </p>
        </div>
        <div className="flex space-x-2">
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
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFilterStatus(filterStatus ? null : "Pending")}
            className="flex items-center space-x-1 border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Filter className="h-4 w-4" />
            <span>{filterStatus || "Filter"}</span>
          </Button>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProcesses.map((process) => {
          const employee = employees.find((emp) => emp.employeeProcessId === process.id);
          const client = employee?.clientId
            ? clients.find((client) => client.id === employee.clientId)
            : undefined;
          const imageUrl = "/sample.jpg"; // Using the image from public/sample.jpg

          return (
       <Card
  key={process.id}
  className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer max-w-md"
  onClick={() => setSelectedProcess(process)}
>
  <div className="flex items-center space-x-4">
    <img
      src={imageUrl}
      alt={`${employee?.name || "User"}`}
      className="w-20 h-20 object-cover rounded-full flex-shrink-0"
    />
    <div>
      <CardTitle className="text-lg font-semibold text-gray-900">
        {employee?.name || "N/A"}
      </CardTitle>
      <CardDescription className="text-sm text-gray-500">
        {client?.clientName || "N/A"}
      </CardDescription>
    </div>
  </div>
  <p className="mt-4 text-sm font-semibold text-indigo-600 text-center">
    Request Date: {process.requestReceiveDateFromCSMSales || "N/A"}
  </p>
</Card>



          );
        })}
      </div>

      <Dialog open={!!selectedProcess} onOpenChange={() => setSelectedProcess(null)}>
        <DialogContent className="w-[1000px] max-w-[95vw] max-h-[80vh] overflow-y-auto bg-gray-100 rounded-xl shadow-md p-6">
          <DialogHeader className=" border-gray-300 ">
            <DialogTitle className="text-2xl font-bold text-gray-900">
              {selectedProcess && employees.find((emp) => emp.employeeProcessId === selectedProcess.id)?.name || "N/A"}
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              View and edit the employee process details below.
            </DialogDescription>
          </DialogHeader>
          {selectedProcess && (
            <div className="w-full">
              <div className=" border">
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
                <Button variant="outline" onClick={handleEdit} className="bg-green-500 text-white hover:bg-green-600 rounded-md px-4 py-2">
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
    </div>
  );
}