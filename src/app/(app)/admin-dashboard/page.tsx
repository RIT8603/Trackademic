import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, BookOpen, ShieldCheck, BarChart3, AlertTriangle, Clock } from "lucide-react";

const latecomers = [
  { name: "James Davis", lateCount: 35, course: "Calculus II" },
  { name: "Emma Williams", lateCount: 32, course: "Advanced Physics" },
];

const behavioralFlags = [
  { name: "Oliver Martinez", flagCount: 42, issue: "Disruptive Behavior" },
];


export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overall institutional management and oversight.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,345</div>
            <p className="text-xs text-muted-foreground">+5.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">876</div>
            <p className="text-xs text-muted-foreground">+1.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses Offered</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">450</div>
            <p className="text-xs text-muted-foreground">12 new courses this semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Alerts</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">In the last 24 hours</p>
          </CardContent>
        </Card>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>System Wide Analytics</CardTitle>
          <CardDescription>High-level overview of campus metrics.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="font-semibold">Attendance Rate</h3>
             <div className="flex items-center gap-4">
                <BarChart3 className="h-8 w-8 text-primary" />
                <div className="w-full">
                    <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-muted-foreground">Overall</span>
                        <span className="text-sm font-bold">92%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{width: '92%'}}></div>
                    </div>
                </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold">Engagement Level</h3>
             <div className="flex items-center gap-4">
                <BarChart3 className="h-8 w-8 text-accent" />
                <div className="w-full">
                    <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-muted-foreground">Average</span>
                        <span className="text-sm font-bold">81%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2.5">
                        <div className="bg-accent h-2.5 rounded-full" style={{width: '81%'}}></div>
                    </div>
                </div>
            </div>
          </div>
        </CardContent>
       </Card>
       <Card>
        <CardHeader>
          <CardTitle>Student Alerts</CardTitle>
          <CardDescription>Students with repeated behavioral or attendance issues.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
              <Clock className="h-5 w-5 text-destructive" />
              <CardTitle className="text-lg">Frequent Latecomers</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead className="text-right">Count</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {latecomers.map((student) => (
                    <TableRow key={student.name}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.course}</TableCell>
                      <TableCell className="text-right font-bold text-destructive">{student.lateCount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <CardTitle className="text-lg">Behavioral Flags</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Issue</TableHead>
                    <TableHead className="text-right">Count</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {behavioralFlags.map((student) => (
                    <TableRow key={student.name}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.issue}</TableCell>
                      <TableCell className="text-right font-bold text-destructive">{student.flagCount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
