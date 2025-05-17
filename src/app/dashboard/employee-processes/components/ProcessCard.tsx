// Path: employee-processes/components/ProcessCard.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Send } from "lucide-react";
import { EmployeeProcess, clients, employees } from "@/lib/data";
import { calculateProgress, getLatestActivities } from "./ProcessUtils";
import { useMemo } from "react";

interface ProcessCardProps {
  process: EmployeeProcess;
  onClick: (process: EmployeeProcess) => void;
}

export default function ProcessCard({ process, onClick }: ProcessCardProps) {
  const employee = useMemo(() => employees.find((emp) => emp.employeeProcessId === process.id), [process]);
  const client = useMemo(() => employee?.clientId ? clients.find((c) => c.id === employee.clientId) : undefined, [employee]);
  const progress = useMemo(() => calculateProgress(process), [process]);
  const latestActivities = useMemo(() => getLatestActivities(process), [process]);

  return (
    <Card className="w-[310px] bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer flex flex-col min-h-[220px]" onClick={() => onClick(process)}>
      <CardHeader className="!py-0">
        <CardTitle className="text-lg font-medium leading-none">{employee?.name || "N/A"}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">{client?.clientName || "N/A"}</CardDescription>
      </CardHeader>
      <CardContent className="!-mt-2.5 flex flex-col gap-1.5 flex-1">
        <div className="mb-1.5 flex items-center space-x-2 border-gray-300 rounded-md border px-3 py-3 h-16">
          <Send className="h-6 w-6 text-black" />
          <div className="ml-1 flex-1 space-y-1">
            <p className="text-xs font-medium leading-none">Request Date</p>
            <p className="text-xs text-muted-foreground">{process.requestReceiveDateFromCSMSales || "N/A"}</p>
          </div>
        </div>
        <div className="flex-1">
          {latestActivities.map((activity, index) => (
            <div key={index} className="mb-2 grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-primary" />
              <div className="space-y-1">
                <p className="text-xs font-medium leading-none">{activity.label}</p>
                <p className="text-xs text-muted-foreground">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="relative mt-auto">
        <div className="w-full bg-gray-200 rounded-full h-4 relative">
          <div className="bg-primary h-4 rounded-full transition-all duration-300 relative" style={{ width: `${progress}%` }}>
            <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white font-medium">{Math.round(progress)}%</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}