/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { inCountryPartners, visaTypes, insurancePlans, employeeDetails } from "@/lib/data";

interface EmployeeModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
  initialData?: any | null;
  children: ReactNode;
  viewOnly?: boolean;
  isEditing?: boolean;
}

const countryOptions = [
  ...new Set(employeeDetails.map((detail) => detail.employmentCountry)),
];
const familyStatusOptions = ["Single", "Married", "Divorced", "Widowed"];

export default function EmployeeModal({
  isOpen,
  onOpenChange,
  onSubmit,
  initialData = null,
  children,
  viewOnly = false,
  isEditing = false,
}: EmployeeModalProps) {
  const [localIsEditing, setLocalIsEditing] = useState(isEditing);
  const [formData, setFormData] = useState({
    employee: {
      name: "",
      email: "",
      phoneNumber: "",
      jobTitle: "",
      department: "",
      hireDate: new Date().toISOString().split("T")[0],
    },
    employeeDetails: {
      id: `det${Math.floor(Math.random() * 1000)}`,
      eonNum: `EON${String(localStorage.getItem("employeeCount") || 0).padStart(3, "0")}`,
      employmentCountry: "",
      inCountryPartnerId: "",
      visaTypeId: "",
      insurancePlanId: "",
      familyStatus: "",
    },
  });

  useEffect(() => {
    setLocalIsEditing(isEditing);
  }, [isEditing]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        employee: {
          name: initialData.name || "",
          email: initialData.email || "",
          phoneNumber: initialData.phoneNumber || "",
          jobTitle: initialData.jobTitle || "",
          department: initialData.department || "",
          hireDate: initialData.hireDate || new Date().toISOString().split("T")[0],
        },
        employeeDetails: {
          id: initialData.employeeDetails?.id || `det${Math.floor(Math.random() * 1000)}`,
          eonNum: initialData.employeeDetails?.eonNum || `EON${String(localStorage.getItem("employeeCount") || 0).padStart(3, "0")}`,
          employmentCountry: initialData.employeeDetails?.employmentCountry || "",
          inCountryPartnerId: initialData.employeeDetails?.inCountryPartnerId || "",
          visaTypeId: initialData.employeeDetails?.visaTypeId || "",
          insurancePlanId: initialData.employeeDetails?.insurancePlanId || "",
          familyStatus: initialData.employeeDetails?.familyStatus || "",
        },
      });
    } else {
      // Reset form data when adding a new employee
      const count = localStorage.getItem("employeeCount") ? parseInt(localStorage.getItem("employeeCount")!, 10) + 1 : 1;
      setFormData({
        employee: {
          name: "",
          email: "",
          phoneNumber: "",
          jobTitle: "",
          department: "",
          hireDate: new Date().toISOString().split("T")[0],
        },
        employeeDetails: {
          id: `det${Math.floor(Math.random() * 1000)}`,
          eonNum: `EON${String(count).padStart(3, "0")}`,
          employmentCountry: "",
          inCountryPartnerId: "",
          visaTypeId: "",
          insurancePlanId: "",
          familyStatus: "",
        },
      });
      localStorage.setItem("employeeCount", count.toString());
    }
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const [section, field] = name.split(".");
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof formData],
        [field]: value,
      },
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    const [section, field] = name.split(".");
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof formData],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData.employee,
      employeeDetails: formData.employeeDetails,
    });
    onOpenChange(false);
    setLocalIsEditing(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-white border border-gray-200 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {viewOnly && !localIsEditing ? "View Employee" : localIsEditing ? "Edit Employee" : "Add New Employee"}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            {viewOnly && !localIsEditing ? "View employee details below." : "Fill in the details to add or edit an employee."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 p-4">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="flex flex-col">
                <Label htmlFor="employee.name" className="text-sm font-medium text-gray-700">
                  Name
                </Label>
                <Input
                  id="employee.name"
                  name="employee.name"
                  value={formData.employee.name}
                  onChange={handleInputChange}
                  className="mt-1 border-gray-300 rounded-md"
                  required
                  disabled={viewOnly && !localIsEditing}
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="employee.email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <Input
                  id="employee.email"
                  name="employee.email"
                  type="email"
                  value={formData.employee.email}
                  onChange={handleInputChange}
                  className="mt-1 border-gray-300 rounded-md"
                  required
                  disabled={viewOnly && !localIsEditing}
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="employee.phoneNumber" className="text-sm font-medium text-gray-700">
                  Phone
                </Label>
                <Input
                  id="employee.phoneNumber"
                  name="employee.phoneNumber"
                  value={formData.employee.phoneNumber}
                  onChange={handleInputChange}
                  className="mt-1 border-gray-300 rounded-md"
                  disabled={viewOnly && !localIsEditing}
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="employee.jobTitle" className="text-sm font-medium text-gray-700">
                  Job Title
                </Label>
                <Input
                  id="employee.jobTitle"
                  name="employee.jobTitle"
                  value={formData.employee.jobTitle}
                  onChange={handleInputChange}
                  className="mt-1 border-gray-300 rounded-md"
                  required
                  disabled={viewOnly && !localIsEditing}
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="flex flex-col">
                <Label htmlFor="employee.department" className="text-sm font-medium text-gray-700">
                  Department
                </Label>
                <Input
                  id="employee.department"
                  name="employee.department"
                  value={formData.employee.department}
                  onChange={handleInputChange}
                  className="mt-1 border-gray-300 rounded-md"
                  required
                  disabled={viewOnly && !localIsEditing}
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="employee.hireDate" className="text-sm font-medium text-gray-700">
                  Hire Date
                </Label>
                <Input
                  id="employee.hireDate"
                  name="employee.hireDate"
                  type="date"
                  value={formData.employee.hireDate}
                  onChange={handleInputChange}
                  className="mt-1 border-gray-300 rounded-md"
                  required
                  disabled={viewOnly && !localIsEditing}
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="employeeDetails.eonNum" className="text-sm font-medium text-gray-700">
                  EON Number
                </Label>
                <Input
                  id="employeeDetails.eonNum"
                  name="employeeDetails.eonNum"
                  value={formData.employeeDetails.eonNum}
                  readOnly
                  className="mt-1 border-gray-300 rounded-md bg-gray-100"
                  disabled
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="employeeDetails.employmentCountry" className="text-sm font-medium text-gray-700">
                  Country
                </Label>
                <Select
                  value={formData.employeeDetails.employmentCountry}
                  onValueChange={(value) => handleSelectChange("employeeDetails.employmentCountry", value)}
                  disabled={viewOnly && !localIsEditing}
                >
                  <SelectTrigger className="mt-1 border-gray-300 rounded-md">
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countryOptions.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Additional Details Spanning Both Columns */}
            <div className="col-span-2 space-y-4">
              <div className="flex flex-col">
                <Label htmlFor="employeeDetails.inCountryPartnerId" className="text-sm font-medium text-gray-700">
                  Partner ID
                </Label>
                <Select
                  value={formData.employeeDetails.inCountryPartnerId}
                  onValueChange={(value) => handleSelectChange("employeeDetails.inCountryPartnerId", value)}
                  disabled={viewOnly && !localIsEditing}
                >
                  <SelectTrigger className="mt-1 border-gray-300 rounded-md w-full">
                    <SelectValue placeholder="Select Partner" />
                  </SelectTrigger>
                  <SelectContent>
                    {inCountryPartners.map((partner) => (
                      <SelectItem key={partner.id} value={partner.id}>
                        {partner.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col">
                <Label htmlFor="employeeDetails.visaTypeId" className="text-sm font-medium text-gray-700">
                  Visa Type ID
                </Label>
                <Select
                  value={formData.employeeDetails.visaTypeId}
                  onValueChange={(value) => handleSelectChange("employeeDetails.visaTypeId", value)}
                  disabled={viewOnly && !localIsEditing}
                >
                  <SelectTrigger className="mt-1 border-gray-300 rounded-md w-full">
                    <SelectValue placeholder="Select Visa Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {visaTypes.map((visa) => (
                      <SelectItem key={visa.id} value={visa.id}>
                        {visa.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col">
                <Label htmlFor="employeeDetails.insurancePlanId" className="text-sm font-medium text-gray-700">
                  Insurance Plan ID
                </Label>
                <Select
                  value={formData.employeeDetails.insurancePlanId}
                  onValueChange={(value) => handleSelectChange("employeeDetails.insurancePlanId", value)}
                  disabled={viewOnly && !localIsEditing}
                >
                  <SelectTrigger className="mt-1 border-gray-300 rounded-md w-full">
                    <SelectValue placeholder="Select Insurance Plan" />
                  </SelectTrigger>
                  <SelectContent>
                    {insurancePlans.map((plan) => (
                      <SelectItem key={plan.id} value={plan.id}>
                        {plan.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col">
                <Label htmlFor="employeeDetails.familyStatus" className="text-sm font-medium text-gray-700">
                  Family Status
                </Label>
                <Select
                  value={formData.employeeDetails.familyStatus}
                  onValueChange={(value) => handleSelectChange("employeeDetails.familyStatus", value)}
                  disabled={viewOnly && !localIsEditing}
                >
                  <SelectTrigger className="mt-1 border-gray-300 rounded-md w-full">
                    <SelectValue placeholder="Select Family Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {familyStatusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            {viewOnly && !localIsEditing ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => setLocalIsEditing(true)}
                  className="mr-2"
                >
                  Edit
                </Button>
                <Button onClick={() => onOpenChange(false)}>
                  Close
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    onOpenChange(false);
                    setLocalIsEditing(false);
                  }}
                  className="mr-2"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={
                    !formData.employee.name ||
                    !formData.employee.email ||
                    !formData.employee.jobTitle ||
                    !formData.employee.department ||
                    !formData.employee.hireDate ||
                    !formData.employeeDetails.employmentCountry ||
                    !formData.employeeDetails.inCountryPartnerId ||
                    !formData.employeeDetails.visaTypeId ||
                    !formData.employeeDetails.insurancePlanId ||
                    !formData.employeeDetails.familyStatus
                  }
                >
                  {localIsEditing ? "Save Changes" : "Add Employee"}
                </Button>
              </>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}