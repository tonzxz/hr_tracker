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
import { visaTypes } from "@/lib/data";

export default function VisaTypesPage() {
  return (
    <Card className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
      <CardHeader>
        <CardTitle>Visa Type List</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visaTypes.map((visaType) => (
              <TableRow key={visaType.id}>
                <TableCell>{visaType.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}