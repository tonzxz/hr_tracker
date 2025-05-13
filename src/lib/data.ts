export interface EmployeeProcess {
  id: string;
  requestReceiveDateFromCSMSales: string;
  csmId: string;
  hrAdmId: string;
  clientId: string;
  offerLetterIssueDateForCSMClientReview: string;
  offerLetterApprovalDateFromClientHR: string | null;
  offerLetterSentDateByCSMEmployee: string | null;
  offerLetterContractSignDateByEmployee: string | null;
  medicalInsuranceInvoiceRequestDateByCSM: string | null;
  medicalInsurancePaymentDateByClient: string | null;
  eVisaWorkPermitIqamaRequestReceiveDateFromCSM: string | null;
  eVisaWorkPermitIqamaApplyDateByHRAdm: string | null;
  eVisaWorkPermitIqamaReceiveDateFromGafoor: string | null;
  contractReceiveDate: string | null;
  expectedStartDate: string | null;
  arrivalChangeStatusDateFromCSMEmployee: string | null;
  cohFormSignDate: string | null;
  clcMobPaid: string | null;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  jobTitle: string | null;
  department: string | null;
  hireDate: string | null;
  employeeDetailsId: string | null;
  employeeProcessId: string | null;
}

export interface EmployeeDetails {
  id: string;
  eonNum: string;
  employmentCountry: string;
  inCountryPartnerId: string;
  visaTypeId: string;
  insurancePlanId: string;
  familyStatus: string | null;
}

export interface Client {
  id: string;
  clientName: string;
  clientShortName: string;
}

export interface InCountryPartner {
  id: string;
  name: string;
}

export interface VisaType {
  id: string;
  name: string;
}

export interface InsurancePlan {
  id: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "CSM" | "HR_ADMIN";
}

// Dummy Data
export const employees: Employee[] = [
  {
    id: "emp1",
    name: "John Doe",
    email: "john.doe@example.com",
    phoneNumber: "+1234567890",
    jobTitle: "Software Engineer",
    department: "Engineering",
    hireDate: "2024-01-15",
    employeeDetailsId: "det1",
    employeeProcessId: "proc1",
  },
  {
    id: "emp2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phoneNumber: "+9876543210",
    jobTitle: "HR Manager",
    department: "HR",
    hireDate: "2023-06-20",
    employeeDetailsId: "det2",
    employeeProcessId: "proc2",
  },
];

export const employeeDetails: EmployeeDetails[] = [
  {
    id: "det1",
    eonNum: "EON123",
    employmentCountry: "USA",
    inCountryPartnerId: "icp1",
    visaTypeId: "vt1",
    insurancePlanId: "ip1",
    familyStatus: "Single",
  },
  {
    id: "det2",
    eonNum: "EON456",
    employmentCountry: "UK",
    inCountryPartnerId: "icp2",
    visaTypeId: "vt2",
    insurancePlanId: "ip2",
    familyStatus: "Married",
  },
];

export const employeeProcesses: EmployeeProcess[] = [
  {
    id: "proc1",
    requestReceiveDateFromCSMSales: "2024-01-10",
    csmId: "user1",
    hrAdmId: "user2",
    clientId: "client1",
    offerLetterIssueDateForCSMClientReview: "2024-01-12",
    offerLetterApprovalDateFromClientHR: "2024-01-14",
    offerLetterSentDateByCSMEmployee: "2024-01-15",
    offerLetterContractSignDateByEmployee: "2024-01-16",
    medicalInsuranceInvoiceRequestDateByCSM: "2024-01-17",
    medicalInsurancePaymentDateByClient: "2024-01-20",
    eVisaWorkPermitIqamaRequestReceiveDateFromCSM: "2024-01-21",
    eVisaWorkPermitIqamaApplyDateByHRAdm: "2024-01-22",
    eVisaWorkPermitIqamaReceiveDateFromGafoor: "2024-01-25",
    contractReceiveDate: "2024-01-26",
    expectedStartDate: "2024-02-01",
    arrivalChangeStatusDateFromCSMEmployee: "2024-02-01",
    cohFormSignDate: "2024-02-02",
    clcMobPaid: "2024-02-03",
  },
  {
    id: "proc2",
    requestReceiveDateFromCSMSales: "2023-06-15",
    csmId: "user1",
    hrAdmId: "user2",
    clientId: "client2",
    offerLetterIssueDateForCSMClientReview: "2023-06-17",
    offerLetterApprovalDateFromClientHR: null,
    offerLetterSentDateByCSMEmployee: null,
    offerLetterContractSignDateByEmployee: null,
    medicalInsuranceInvoiceRequestDateByCSM: null,
    medicalInsurancePaymentDateByClient: null,
    eVisaWorkPermitIqamaRequestReceiveDateFromCSM: null,
    eVisaWorkPermitIqamaApplyDateByHRAdm: null,
    eVisaWorkPermitIqamaReceiveDateFromGafoor: null,
    contractReceiveDate: null,
    expectedStartDate: "2023-07-01",
    arrivalChangeStatusDateFromCSMEmployee: null,
    cohFormSignDate: null,
    clcMobPaid: null,
  },
];

export const clients: Client[] = [
  { id: "client1", clientName: "Tech Corp", clientShortName: "TC" },
  { id: "client2", clientName: "Global Solutions", clientShortName: "GS" },
];

export const inCountryPartners: InCountryPartner[] = [
  { id: "icp1", name: "Partner USA" },
  { id: "icp2", name: "Partner UK" },
];

export const visaTypes: VisaType[] = [
  { id: "vt1", name: "H1B" },
  { id: "vt2", name: "L1" },
];

export const insurancePlans: InsurancePlan[] = [
  { id: "ip1", name: "Basic Plan" },
  { id: "ip2", name: "Premium Plan" },
];

export const users: User[] = [
  { id: "user1", name: "Alice Johnson", email: "alice@example.com", role: "CSM" },
  { id: "user2", name: "Bob Smith", email: "bob@example.com", role: "HR_ADMIN" },
];