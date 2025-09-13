
"use client"
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, Line, LineChart, Pie, PieChart, Cell } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { studentList } from "@/lib/data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, Download, MoreHorizontal, ShieldAlert, XCircle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import * as XLSX from 'xlsx';


const attendanceData = [
  { date: "2024-05-01", "Present": 95, "Absent": 5 },
  { date: "2024-05-02", "Present": 92, "Absent": 8 },
  { date: "2024-05-03", "Present": 98, "Absent": 2 },
  { date: "2024-05-04", "Present": 91, "Absent": 9 },
  { date: "2024-05-05", "Present": 96, "Absent": 4 },
  { date: "2024-05-06", "Present": 89, "Absent": 11 },
  { date: "2024-05-07", "Present": 99, "Absent": 1 },
]

const chartConfig: ChartConfig = {
  Present: {
    label: "Present",
    color: "hsl(var(--chart-1))",
  },
  Absent: {
    label: "Absent",
    color: "hsl(var(--destructive))",
  },
}

const engagementData = [
    { name: 'Engaged', value: 75, fill: 'hsl(var(--chart-1))' },
    { name: 'Neutral', value: 15, fill: 'hsl(var(--chart-2))' },
    { name: 'Disengaged', value: 10, fill: 'hsl(var(--destructive))' },
]

const initialAttendanceDetails = studentList.map((student, index) => ({
    name: student,
    status: index % 4 === 0 ? 'Absent' : 'Present',
    email: `${student.toLowerCase().replace(' ', '.')}@example.com`,
    parentEmail: `parent.${student.toLowerCase().split(' ')[1]}@example.com`
})).sort((a,b) => a.name.localeCompare(b.name));

const cheatingIncidents = [
    { student: 'Sophia Miller', exam: 'History Mid-term', details: 'Unauthorized notes detected.', email: 'sophia.miller@example.com', parentEmail: 'parent.miller@example.com' },
    { student: 'James Davis', exam: 'History Mid-term', details: 'Mobile phone usage.', email: 'james.davis@example.com', parentEmail: 'parent.davis@example.com' },
    { student: 'Liam Brown', exam: 'Math Mid-term', details: 'Copying from another student.', email: 'liam.brown@example.com', parentEmail: 'parent.brown@example.com' },
]

export default function FacultyDashboardPage() {
  const [attendanceDetails, setAttendanceDetails] = useState(initialAttendanceDetails);

  const handleAttendanceChange = (studentName: string, newStatus: 'Present' | 'Absent') => {
    setAttendanceDetails(prevDetails => prevDetails.map(student => 
        student.name === studentName ? { ...student, status: newStatus } : student
    ));
  }

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(attendanceDetails);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");
    XLSX.writeFile(workbook, "AttendanceDetails.xlsx");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Faculty Dashboard</h1>
        <p className="text-muted-foreground">Data-driven reports for institutional growth and student success.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <Card>
            <CardHeader>
                <CardTitle>Overall Attendance</CardTitle>
                <CardDescription>Last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-64">
                    <BarChart accessibilityLayer data={attendanceData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Bar dataKey="Present" stackId="a" fill="var(--color-Present)" radius={[0, 0, 4, 4]} />
                        <Bar dataKey="Absent" stackId="a" fill="var(--color-Absent)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Live Engagement</CardTitle>
                <CardDescription>Physics 101 - Real-time classroom sentiment</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
                <ChartContainer config={{}} className="h-64 aspect-square">
                    <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Pie data={engagementData} dataKey="value" nameKey="name" innerRadius={60} strokeWidth={5}>
                             {engagementData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Cheating Detection</CardTitle>
                <CardDescription>Incidents during Mid-term Exams</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={{ incidents: { label: "Incidents", color: "hsl(var(--destructive))"}}} className="h-64">
                    <LineChart data={[
                        { exam: "Math", incidents: 2 },
                        { exam: "Physics", incidents: 1 },
                        { exam: "History", incidents: 5 },
                        { exam: "Literature", incidents: 0 },
                    ]}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="exam" tickLine={false} axisLine={false} />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent/>} />
                        <Line type="monotone" dataKey="incidents" stroke="var(--color-incidents)" strokeWidth={2} dot={{ fill: "var(--color-incidents)" }} activeDot={{ r: 6 }}/>
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Today's Attendance Details</CardTitle>
                <CardDescription>Status for all students in Physics 101.</CardDescription>
              </div>
              <Button onClick={exportToExcel} variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export to Excel
              </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Student Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {attendanceDetails.map((student) => (
                            <TableRow key={student.name}>
                                <TableCell className="font-medium">{student.name}</TableCell>
                                <TableCell>
                                    <Select 
                                        value={student.status}
                                        onValueChange={(value: 'Present' | 'Absent') => handleAttendanceChange(student.name, value)}
                                    >
                                        <SelectTrigger className={`w-32 h-8 text-xs [&_svg]:h-4 [&_svg]:w-4 ${student.status === 'Present' ? 'bg-green-100/50 text-green-700 border-green-200' : 'bg-red-100/50 text-red-700 border-red-200'}`}>
                                            <SelectValue placeholder="Set status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Present">
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                                    Present
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="Absent">
                                                <div className="flex items-center gap-2">
                                                    <XCircle className="h-4 w-4 text-destructive" />
                                                    Absent
                                                </div>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
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
                                                <a href={`mailto:${student.email}?subject=Attendance Notice&body=Dear ${student.name},%0D%0A%0D%0AThis is a notification regarding your attendance for Physics 101 today. You were marked as ${student.status}.%0D%0A%0D%0ARegards,%0D%0AFaculty`}>Email Student</a>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <a href={`mailto:${student.parentEmail}?subject=Student Attendance Notice: ${student.name}&body=Dear Parent/Guardian,%0D%0A%0D%0AThis is to inform you that ${student.name} was marked as ${student.status} for Physics 101 today.%0D%0A%0D%0ARegards,%0D%0AFaculty`}>Email Parent</a>
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
            <CardHeader>
                <CardTitle>Cheating Incidents Report</CardTitle>
                <CardDescription>Detailed log of academic integrity violations.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Student</TableHead>
                            <TableHead>Exam</TableHead>
                            <TableHead>Details</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {cheatingIncidents.map((incident, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{incident.student}</TableCell>
                                <TableCell>{incident.exam}</TableCell>
                                <TableCell className="text-destructive flex items-center gap-2">
                                    <ShieldAlert className="h-4 w-4" />
                                    {incident.details}
                                </TableCell>
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
                                                 <a href={`mailto:${incident.email}?subject=Academic Integrity Violation&body=Dear ${incident.student},%0D%0A%0D%0AAn academic integrity violation was reported during your ${incident.exam}: ${incident.details}.%0D%0A%0D%0APlease see the administration.%0D%0A%0D%0ARegards,%0D%0AFaculty`}>Email Student</a>
                                            </DropdownMenuItem>
                                             <DropdownMenuItem asChild>
                                                <a href={`mailto:${incident.parentEmail}?subject=Academic Integrity Notice: ${incident.student}&body=Dear Parent/Guardian,%0D%0A%0D%0AThis is to inform you that an academic integrity violation was reported for ${incident.student} during the ${incident.exam}: ${incident.details}.%0D%0A%0D%0ARegards,%0D%9AFaculty`}>Email Parent</a>
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
      </div>
    </div>
  )
}
