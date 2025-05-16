/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import EmployeeModal from "@/components/employee-modal";
import { employees, employeeDetails as initialEmployeeDetails } from "@/lib/data";

// Initialize a map for EmployeeDetails
const initialDetailsMap = new Map(
  initialEmployeeDetails.map((detail) => [detail.id, detail])
);

export default function EmployeesPage() {
  const [localEmployees, setLocalEmployees] = useState([...employees]);
  const [detailsMap, setDetailsMap] = useState(initialDetailsMap);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<any | null>(null);
  const [viewEmployee, setViewEmployee] = useState<any | null>(null);

  const handleCreateOrUpdate = (employeeData: any) => {
    const employeeDetail = employeeData.employeeDetails;
    const employee = {
      id: editingEmployee ? editingEmployee.id : `emp${localEmployees.length + 1}`,
      name: employeeData.employee.name,
      email: employeeData.employee.email,
      phoneNumber: employeeData.employee.phoneNumber,
      jobTitle: employeeData.employee.jobTitle,
      department: employeeData.employee.department,
      hireDate: employeeData.employee.hireDate,
      clientId: null,
      employeeDetailsId: employeeDetail.id,
      employeeProcessId: editingEmployee ? editingEmployee.employeeProcessId : null,
    };

    setDetailsMap((prev) => new Map(prev).set(employeeDetail.id, employeeDetail));

    if (editingEmployee) {
      const updatedEmployees = localEmployees.map((emp) =>
        emp.id === editingEmployee.id ? employee : emp
      );
      setLocalEmployees(updatedEmployees);
      setEditingEmployee(null);
    } else {
      setLocalEmployees([...localEmployees, employee]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    const employee = localEmployees.find((emp) => emp.id === id);
    if (employee?.employeeDetailsId) {
      setDetailsMap((prev) => {
        const newMap = new Map(prev);
        newMap.delete(employee.employeeDetailsId);
        return newMap;
      });
    }
    setLocalEmployees(localEmployees.filter((emp) => emp.id !== id));
  };

  const handleEdit = (employee: any) => {
    setEditingEmployee(employee);
    setViewEmployee(null);
    setIsModalOpen(true);
  };

  const handleView = (employee: any) => {
    setViewEmployee(employee);
    setEditingEmployee(null);
    setIsModalOpen(true);
  };

  return (
    <Card className="flex-1 rounded-lg bg-white shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <CardTitle className="text-lg font-semibold">Manage Employees</CardTitle>
            <CardDescription className="text-sm text-gray-500">
              View, Create, Update and Delete Employees
            </CardDescription>
          </div>
          <EmployeeModal
            isOpen={isModalOpen}
            onOpenChange={(open) => {
              setIsModalOpen(open);
              if (!open) {
                setEditingEmployee(null);
                setViewEmployee(null);
              }
            }}
            onSubmit={handleCreateOrUpdate}
            initialData={
              editingEmployee || viewEmployee
                ? { ...editingEmployee, ...viewEmployee, employeeDetails: detailsMap.get((editingEmployee || viewEmployee)?.employeeDetailsId) || { id: "", eonNum: "", employmentCountry: "", inCountryPartnerId: "", visaTypeId: "", insurancePlanId: "", familyStatus: "" } }
                : null
            }
            viewOnly={!!viewEmployee}
            isEditing={!!editingEmployee}
          >
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-1 border-gray-300"
            >
              <Plus className="h-4 w-4" />
              <span>Add Employee</span>
            </Button>
          </EmployeeModal>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="overflow-x-auto">
          <div className="min-w-[800px] rounded-lg border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="px-4 py-2 text-xs font-medium text-gray-700 uppercase tracking-wide">
                    EON Number
                  </TableHead>
                  <TableHead className="px-4 py-2 text-xs font-medium text-gray-700 uppercase tracking-wide">
                    Name
                  </TableHead>
                  <TableHead className="px-4 py-2 text-xs font-medium text-gray-700 uppercase tracking-wide">
                    Email
                  </TableHead>
                  <TableHead className="px-4 py-2 text-xs font-medium text-gray-700 uppercase tracking-wide">
                    Job Title
                  </TableHead>
                  <TableHead className="px-4 py-2 text-xs font-medium text-gray-700 uppercase tracking-wide">
                    Department
                  </TableHead>
                  <TableHead className="px-4 py-2 text-xs font-medium text-gray-700 uppercase tracking-wide">
                    Hire Date
                  </TableHead>
                  <TableHead className="px-4 py-2 text-xs font-medium text-gray-700 uppercase tracking-wide">
                    Country
                  </TableHead>
                  <TableHead className="px-4 py-2 text-xs font-medium text-gray-700 uppercase tracking-wide text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-200">
                {localEmployees.map((employee, idx) => {
                  const details = employee.employeeDetailsId ? detailsMap.get(employee.employeeDetailsId) : null;
                  return (
                    <TableRow
                      key={employee.id}
                      className={`hover:bg-gray-50 cursor-pointer ${idx % 2 === 0 ? "" : "bg-white"}`}
                      onClick={() => handleView(employee)}
                    >
                      <TableCell className="px-4 py-2 text-sm text-gray-900">
                        {details?.eonNum ?? "N/A"}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-sm font-medium text-gray-900">
                        {employee.name}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-sm text-gray-500">
                        {employee.email}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-sm text-gray-900">
                        {employee.jobTitle}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-sm text-gray-900">
                        {employee.department}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-sm text-gray-500">
                        {employee.hireDate}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-sm text-gray-900">
                        {details?.employmentCountry ?? "N/A"}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(employee);
                            }}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(employee.id);
                            }}
                            className="text-red-600 hover:text-red-800"
                          >
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