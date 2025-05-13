"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SalesTeamPage() {
  return (
    <Card className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
      <CardHeader>
        <CardTitle>Sales Team</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Sales Team dashboard coming soon.</p>
      </CardContent>
    </Card>
  );
}