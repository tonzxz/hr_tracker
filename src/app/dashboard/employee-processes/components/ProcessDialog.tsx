// Path: employee-processes/components/ProcessDialog.tsx
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Trash2 } from "lucide-react";
import { EmployeeProcess, clients, employees, users } from "@/lib/data";
import { useMemo } from "react";

interface ProcessDialogProps {
  selectedProcess: EmployeeProcess | null;
  isEditing: boolean;
  editedProcess: EmployeeProcess | null;
  onEdit: (isEditing: boolean) => void;
  onSave: (updater: (prev: EmployeeProcess[]) => EmployeeProcess[]) => void;
  onCancel: (isEditing: boolean) => void;
  onDelete: (id: string) => void;
  setIsEditing: (isEditing: boolean) => void;
  setEditedProcess: (editedProcess: EmployeeProcess | null) => void;
}

interface TableRow {
  label: string;
  value: string;
  field?: keyof EmployeeProcess; // Optional field for editable rows
  type: "text" | "date";
  editable?: boolean; // Optional flag to control editability
}

export default function ProcessDialog({
  selectedProcess,
  isEditing,
  editedProcess,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  setIsEditing,
  setEditedProcess,
}: ProcessDialogProps) {
  const employee = useMemo(() => selectedProcess && employees.find((emp) => emp.employeeProcessId === selectedProcess.id), [selectedProcess]);
  const clientName = useMemo(() => selectedProcess && employee?.clientId ? clients.find((c) => c.id === employee.clientId)?.clientName || "" : "", [selectedProcess, employee]);

  const handleInputChange = (field: keyof EmployeeProcess, value: string) => {
    if (editedProcess) {
      setEditedProcess({ ...editedProcess, [field]: value });
    }
  };

  const handleSave = () => {
    if (editedProcess && selectedProcess) {
      onSave((prev) => prev.map((proc) => (proc.id === selectedProcess.id ? editedProcess : proc)));
      setIsEditing(false);
      setEditedProcess(null);
    }
  };

  const tableRows: TableRow[] = [
    { label: "Client", value: clientName, type: "text", editable: false }, // Non-editable field
    { label: "CSM", value: isEditing ? editedProcess?.csmId || "" : users.find((u) => u.id === selectedProcess?.csmId)?.name || "", field: "csmId", type: "text", editable: true },
    { label: "HR Admin", value: isEditing ? editedProcess?.hrAdmId || "" : users.find((u) => u.id === selectedProcess?.hrAdmId)?.name || "", field: "hrAdmId", type: "text", editable: true },
    { label: "Request Date", value: isEditing ? editedProcess?.requestReceiveDateFromCSMSales || "" : selectedProcess?.requestReceiveDateFromCSMSales || "", field: "requestReceiveDateFromCSMSales", type: "date", editable: true },
    { label: "Offer Letter Issued", value: isEditing ? editedProcess?.offerLetterIssueDateForCSMClientReview || "" : selectedProcess?.offerLetterIssueDateForCSMClientReview || "", field: "offerLetterIssueDateForCSMClientReview", type: "date", editable: true },
    { label: "Offer Letter Approved", value: isEditing ? editedProcess?.offerLetterApprovalDateFromClientHR || "" : selectedProcess?.offerLetterApprovalDateFromClientHR || "", field: "offerLetterApprovalDateFromClientHR", type: "date", editable: true },
    { label: "Offer Sent", value: isEditing ? editedProcess?.offerLetterSentDateByCSMEmployee || "" : selectedProcess?.offerLetterSentDateByCSMEmployee || "", field: "offerLetterSentDateByCSMEmployee", type: "date", editable: true },
    { label: "Contract Signed", value: isEditing ? editedProcess?.offerLetterContractSignDateByEmployee || "" : selectedProcess?.offerLetterContractSignDateByEmployee || "", field: "offerLetterContractSignDateByEmployee", type: "date", editable: true },
    { label: "Insurance Request", value: isEditing ? editedProcess?.medicalInsuranceInvoiceRequestDateByCSM || "" : selectedProcess?.medicalInsuranceInvoiceRequestDateByCSM || "", field: "medicalInsuranceInvoiceRequestDateByCSM", type: "date", editable: true },
    { label: "Insurance Paid", value: isEditing ? editedProcess?.medicalInsurancePaymentDateByClient || "" : selectedProcess?.medicalInsurancePaymentDateByClient || "", field: "medicalInsurancePaymentDateByClient", type: "date", editable: true },
    { label: "Visa Request", value: isEditing ? editedProcess?.eVisaWorkPermitIqamaRequestReceiveDateFromCSM || "" : selectedProcess?.eVisaWorkPermitIqamaRequestReceiveDateFromCSM || "", field: "eVisaWorkPermitIqamaRequestReceiveDateFromCSM", type: "date", editable: true },
    { label: "Visa Applied", value: isEditing ? editedProcess?.eVisaWorkPermitIqamaApplyDateByHRAdm || "" : selectedProcess?.eVisaWorkPermitIqamaApplyDateByHRAdm || "", field: "eVisaWorkPermitIqamaApplyDateByHRAdm", type: "date", editable: true },
    { label: "Visa Received", value: isEditing ? editedProcess?.eVisaWorkPermitIqamaReceiveDateFromGafoor || "" : selectedProcess?.eVisaWorkPermitIqamaReceiveDateFromGafoor || "", field: "eVisaWorkPermitIqamaReceiveDateFromGafoor", type: "date", editable: true },
    { label: "Contract Received", value: isEditing ? editedProcess?.contractReceiveDate || "" : selectedProcess?.contractReceiveDate || "", field: "contractReceiveDate", type: "date", editable: true },
    { label: "Expected Start", value: isEditing ? editedProcess?.expectedStartDate || "" : selectedProcess?.expectedStartDate || "", field: "expectedStartDate", type: "date", editable: true },
    { label: "Arrival Status", value: isEditing ? editedProcess?.arrivalChangeStatusDateFromCSMEmployee || "" : selectedProcess?.arrivalChangeStatusDateFromCSMEmployee || "", field: "arrivalChangeStatusDateFromCSMEmployee", type: "date", editable: true },
    { label: "COH Signed", value: isEditing ? editedProcess?.cohFormSignDate || "" : selectedProcess?.cohFormSignDate || "", field: "cohFormSignDate", type: "date", editable: true },
    { label: "CLC/Mob Paid", value: isEditing ? editedProcess?.clcMobPaid || "" : selectedProcess?.clcMobPaid || "", field: "clcMobPaid", type: "date", editable: true },
  ];

  return (
    <DialogContent className="w-[1000px] max-w-[95vw] max-h-[80vh] overflow-y-auto bg-gray-100 rounded-xl shadow-md p-6">
      <DialogHeader >
        <DialogTitle className="text-2xl font-bold text-gray-900">
          {employee ? employee.name || "N/A" : "N/A"}
        </DialogTitle>
        <DialogDescription className="text-sm text-gray-500">{ clientName}</DialogDescription>
      </DialogHeader>
      {selectedProcess && (
        <div className="w-full">
          <div className="border">
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-2 text-left text-sm font-medium text-gray-700">Field</th>
                  <th className="p-2 text-left text-sm font-medium text-gray-700">Value</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map(({ label, value, field, type, editable }, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="p-2 text-sm font-medium text-gray-700">{label}</td>
                    <td className="p-2 text-sm text-gray-900">
                      {editable && field ? (
                        <Input
                          type={type}
                          value={value}
                          onChange={(e) => handleInputChange(field, e.target.value)}
                          disabled={!isEditing}
                          className="w-full border-none focus:ring-0 bg-transparent p-0"
                        />
                      ) : (
                        <span>{value}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div className="mt-6 flex justify-end space-x-4 border-t border-gray-200 pt-4">
        {!isEditing ? (
          <>
            <Button variant="outline" onClick={() => onEdit(true)} className="bg-primary text-white hover:bg-green-600 rounded-md px-4 py-2">
              <Edit className="h-4 w-4 mr-2" /> Edit
            </Button>
            <Button variant="destructive" onClick={() => selectedProcess && onDelete(selectedProcess.id)} className="bg-red-500 text-white hover:bg-red-600 rounded-md px-4 py-2">
              <Trash2 className="h-4 w-4 mr-2" /> Delete
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" onClick={() => onCancel(false)} className="bg-gray-300 text-gray-800 hover:bg-gray-400 rounded-md px-4 py-2">Cancel</Button>
            <Button variant="default" onClick={handleSave} className="bg-blue-500 text-white hover:bg-blue-600 rounded-md px-4 py-2">Save</Button>
          </>
        )}
      </div>
    </DialogContent>
  );
}