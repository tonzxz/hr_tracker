"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { employeeProcesses } from "@/lib/data";

export default function EmployeeProcessesPage() {
  return (
    <Card className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
      <CardHeader>
        <CardTitle>Process Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Process ID</TableHead>
              <TableHead>Request Date</TableHead>
              <TableHead>Offer Letter Issued</TableHead>
              <TableHead>Offer Letter Approved</TableHead>
              <TableHead>Expected Start Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employeeProcesses.map((process) => (
              <TableRow key={process.id}>
                <TableCell>{process.id}</TableCell>
                <TableCell>{process.requestReceiveDateFromCSMSales}</TableCell>
                <TableCell>{process.offerLetterIssueDateForCSMClientReview}</TableCell>
                <TableCell>{process.offerLetterApprovalDateFromClientHR || "Pending"}</TableCell>
                <TableCell>{process.expectedStartDate}</TableCell>
                <TableCell>{process.offerLetterApprovalDateFromClientHR ? "Approved" : "Pending"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}