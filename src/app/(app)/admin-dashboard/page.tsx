import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, BookOpen, ShieldCheck, BarChart3, AlertTriangle, Clock, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const latecomers = [
  { name: "James Davis", lateCount: 35, course: "Calculus II", email: "james.davis@example.com", parentEmail: "parent.davis@example.com" },
  { name: "Emma Williams", lateCount: 32, course: "Advanced Physics", email: "emma.williams@example.com", parentEmail: "parent.williams@example.com" },
];

const behavioralFlags = [
  { name: "Oliver Martinez", flagCount: 42, issue: "Disruptive Behavior", email: "oliver.martinez@example.com", parentEmail: "parent.martinez@example.com" },
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
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {latecomers.map((student) => (
                    <TableRow key={student.name}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.course}</TableCell>
                      <TableCell className="text-right font-bold text-destructive">{student.lateCount}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                                <a href={`mailto:${student.email}?subject=Late Arrival Warning&body=Dear ${student.name},%0D%0A%0D%0AThis is a notification regarding your repeated late arrivals for ${student.course}. You have been late ${student.lateCount} times.%0D%0A%0D%0APlease ensure you arrive on time for future classes.%0D%0A%0D%0ARegards,%0D%0AThe Administration`}>Email Student</a>
                            </DropdownMenuItem>
                             <DropdownMenuItem asChild>
                                <a href={`mailto:${student.parentEmail}?subject=Student Late Arrival Notice: ${student.name}&body=Dear Parent/Guardian,%0D%0A%0D%0AThis is to inform you that ${student.name} has been late for ${student.course} ${student.lateCount} times. %0D%0A%0D%0APlease discuss the importance of punctuality with your child.%0D%0A%0D%0ARegards,%0D%0AThe Administration`}>Email Parent</a>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
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
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {behavioralFlags.map((student) => (
                    <TableRow key={student.name}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.issue}</TableCell>
                      <TableCell className="text-right font-bold text-destructive">{student.flagCount}</TableCell>
                       <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                           <DropdownMenuItem asChild>
                                <a href={`mailto:${student.email}?subject=Behavioral Warning&body=Dear ${student.name},%0D%0A%0D%0AThis is a notification regarding repeated instances of ${student.issue}. You have been flagged ${student.flagCount} times.%0D%0A%0D%0APlease adhere to the code of conduct.%0D%0A%0D%0ARegards,%0D%0AThe Administration`}>Email Student</a>
                            </DropdownMenuItem>
                             <DropdownMenuItem asChild>
                                <a href={`mailto:${student.parentEmail}?subject=Student Behavioral Notice: ${student.name}&body=Dear Parent/Guardian,%0D%0A%0D%0AThis is to inform you that ${student.name} has been flagged for ${student.issue} ${student.flagCount} times. %0D%0A%0D%0APlease discuss this with your child.%0D%0A%0D%0ARegards,%0D%0AThe Administration`}>Email Parent</a>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
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