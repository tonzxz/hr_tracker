export interface EmployeeProcess {
  id: string;
  requestReceiveDateFromCSMSales: string;
  csmId: string;
  hrAdmId: string;
  clientId: string;
  offerLetterIssueDateForCSMClientReview: string | null;
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
  role: "csm" | "hr_admin"| "client";
}

// Expanded Dummy Data
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
  {
    id: "emp3",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phoneNumber: "+5551234567",
    jobTitle: "Project Manager",
    department: "Engineering",
    hireDate: "2023-09-10",
    employeeDetailsId: "det3",
    employeeProcessId: "proc3",
  },
  {
    id: "emp4",
    name: "Sarah Davis",
    email: "sarah.davis@example.com",
    phoneNumber: "+4449876543",
    jobTitle: "Recruiter",
    department: "HR",
    hireDate: "2024-03-05",
    employeeDetailsId: "det4",
    employeeProcessId: "proc4",
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
  {
    id: "det3",
    eonNum: "EON789",
    employmentCountry: "Canada",
    inCountryPartnerId: "icp3",
    visaTypeId: "vt3",
    insurancePlanId: "ip3",
    familyStatus: "Single",
  },
  {
    id: "det4",
    eonNum: "EON101",
    employmentCountry: "Australia",
    inCountryPartnerId: "icp4",
    visaTypeId: "vt4",
    insurancePlanId: "ip4",
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
    csmId: "user3",
    hrAdmId: "user4",
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
  {
    id: "proc3",
    requestReceiveDateFromCSMSales: "2023-09-05",
    csmId: "user5",
    hrAdmId: "user6",
    clientId: "client3",
    offerLetterIssueDateForCSMClientReview: "2023-09-07",
    offerLetterApprovalDateFromClientHR: "2023-09-09",
    offerLetterSentDateByCSMEmployee: "2023-09-10",
    offerLetterContractSignDateByEmployee: "2023-09-11",
    medicalInsuranceInvoiceRequestDateByCSM: "2023-09-12",
    medicalInsurancePaymentDateByClient: "2023-09-15",
    eVisaWorkPermitIqamaRequestReceiveDateFromCSM: null,
    eVisaWorkPermitIqamaApplyDateByHRAdm: null,
    eVisaWorkPermitIqamaReceiveDateFromGafoor: null,
    contractReceiveDate: "2023-09-16",
    expectedStartDate: "2023-10-01",
    arrivalChangeStatusDateFromCSMEmployee: null,
    cohFormSignDate: null,
    clcMobPaid: null,
  },
  {
    id: "proc4",
    requestReceiveDateFromCSMSales: "2024-03-01",
    csmId: "user7",
    hrAdmId: "user8",
    clientId: "client4",
    offerLetterIssueDateForCSMClientReview: "2024-03-03",
    offerLetterApprovalDateFromClientHR: null,
    offerLetterSentDateByCSMEmployee: null,
    offerLetterContractSignDateByEmployee: null,
    medicalInsuranceInvoiceRequestDateByCSM: null,
    medicalInsurancePaymentDateByClient: null,
    eVisaWorkPermitIqamaRequestReceiveDateFromCSM: null,
    eVisaWorkPermitIqamaApplyDateByHRAdm: null,
    eVisaWorkPermitIqamaReceiveDateFromGafoor: null,
    contractReceiveDate: null,
    expectedStartDate: "2024-04-01",
    arrivalChangeStatusDateFromCSMEmployee: null,
    cohFormSignDate: null,
    clcMobPaid: null,
  },
];

export const clients: Client[] = [
  { id: "client1", clientName: "Tech Corp", clientShortName: "TC" },
  { id: "client2", clientName: "Global Solutions", clientShortName: "GS" },
  { id: "client3", clientName: "InnoTech", clientShortName: "IT" },
  { id: "client4", clientName: "Peak Performance", clientShortName: "PP" },
];

export const inCountryPartners: InCountryPartner[] = [
  { id: "icp1", name: "Partner USA" },
  { id: "icp2", name: "Partner UK" },
  { id: "icp3", name: "Partner Canada" },
  { id: "icp4", name: "Partner Australia" },
];

export const visaTypes: VisaType[] = [
  { id: "vt1", name: "H1B" },
  { id: "vt2", name: "L1" },
  { id: "vt3", name: "H2B" },
  { id: "vt4", name: "O1" },
];

export const insurancePlans: InsurancePlan[] = [
  { id: "ip1", name: "Basic Plan" },
  { id: "ip2", name: "Premium Plan" },
  { id: "ip3", name: "Standard Plan" },
  { id: "ip4", name: "Comprehensive Plan" },
];


export const users: User[] = [
  { id: "user1", name: "Firoz", email: "firoz@example.com", role: "csm" },
  { id: "user2", name: "Srini", email: "srini@example.com", role: "hr_admin" },
  { id: "user3", name: "Renesh", email: "renesh@example.com", role: "csm" },
  { id: "user4", name: "Dicksson Paniyadima", email: "dicksson.p@example.com", role: "hr_admin" },
  { id: "user5", name: "Mattieu Marc Geard Tisserand", email: "mattieu.t@example.com", role: "csm" },
  { id: "user6", name: "Peter John John Donnelly", email: "peter.d@example.com", role: "hr_admin" },
  { id: "user7", name: "Kyle Blaze", email: "kyle.b@example.com", role: "csm" },
  { id: "user8", name: "Shabba Eskandar Petri", email: "shabba.p@example.com", role: "hr_admin" },
  { id: "user9", name: "Yasir Gamal Moselly Elsayed Gamal Moselly Els Topsource Worldwide Group Limited", email: "yasir.m@example.com", role: "csm" },
  { id: "user10", name: "Esteban Pinilla Plata", email: "esteban.p@example.com", role: "hr_admin" },
  { id: "user11", name: "Vishnu Kilikkodan Kilikkodan Krishnakutty", email: "vishnu.k@example.com", role: "csm" },
  { id: "user12", name: "Dilip Singh Thakur", email: "dilip.t@example.com", role: "hr_admin" },
  { id: "user13", name: "Hemant Kumar Rathore", email: "hemant.r@example.com", role: "csm" },
  { id: "user14", name: "Tajinder Ahmad Neshat Parveen", email: "tajinder.n@example.com", role: "hr_admin" },
  { id: "user15", name: "John Smith", email: "john.s@example.com", role: "client" },
  { id: "user16", name: "Emma Wilson", email: "emma.w@example.com", role: "client" },
];