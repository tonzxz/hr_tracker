// Path: employee-processes/components/ProcessUtils.ts
import { useState } from "react";
import { EmployeeProcess } from "@/lib/data";

export const calculateProgress = (process: EmployeeProcess): number => {
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
  const filledFields = dateFields.filter((date) => date !== null && date !== "").length;
  return (filledFields / totalFields) * 100;
};

export const getLatestActivities = (process: EmployeeProcess): { label: string; date: string }[] => {
  const dateFields = [
    { label: "Request Date", date: process.requestReceiveDateFromCSMSales || "" },
    { label: "Offer Letter Issued", date: process.offerLetterIssueDateForCSMClientReview || "" },
    { label: "Offer Letter Approved", date: process.offerLetterApprovalDateFromClientHR || "" },
    { label: "Offer Sent", date: process.offerLetterSentDateByCSMEmployee || "" },
    { label: "Contract Signed", date: process.offerLetterContractSignDateByEmployee || "" },
    { label: "Insurance Request", date: process.medicalInsuranceInvoiceRequestDateByCSM || "" },
    { label: "Insurance Paid", date: process.medicalInsurancePaymentDateByClient || "" },
    { label: "Visa Request", date: process.eVisaWorkPermitIqamaRequestReceiveDateFromCSM || "" },
    { label: "Visa Applied", date: process.eVisaWorkPermitIqamaApplyDateByHRAdm || "" },
    { label: "Visa Received", date: process.eVisaWorkPermitIqamaReceiveDateFromGafoor || "" },
    { label: "Contract Received", date: process.contractReceiveDate || "" },
    { label: "Expected Start", date: process.expectedStartDate || "" },
    { label: "Arrival Status", date: process.arrivalChangeStatusDateFromCSMEmployee || "" },
    { label: "COH Signed", date: process.cohFormSignDate || "" },
    { label: "CLC/Mob Paid", date: process.clcMobPaid || "" },
  ].filter((item) => item.date !== "");

  return dateFields
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
};

export const useProcessState = (initialProcesses: EmployeeProcess[]) => {
  const [localProcesses, setLocalProcesses] = useState<EmployeeProcess[]>(initialProcesses);
  const [selectedProcess, setSelectedProcess] = useState<EmployeeProcess | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProcess, setEditedProcess] = useState<EmployeeProcess | null>(null);
  const [filters, setFilters] = useState({
    csms: new Set<string>(),
    clients: new Set<string>(),
    progressRanges: new Set<string>(),
  });

  return {
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
  };
};