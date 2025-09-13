
"use client"
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
import { CheckCircle, ShieldAlert, XCircle } from "lucide-react"

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

const attendanceDetails = studentList.map((student, index) => ({
    name: student,
    status: index % 4 === 0 ? 'Absent' : 'Present'
})).sort((a,b) => a.name.localeCompare(b.name));

const cheatingIncidents = [
    { student: 'Sophia Miller', exam: 'History Mid-term', details: 'Unauthorized notes detected.' },
    { student: 'James Davis', exam: 'History Mid-term', details: 'Mobile phone usage.' },
    { student: 'Liam Brown', exam: 'Math Mid-term', details: 'Copying from another student.' },
]

export default function FacultyDashboardPage() {
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
            <CardHeader>
                <CardTitle>Today's Attendance Details</CardTitle>
                <CardDescription>Status for all students in Physics 101.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Student Name</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {attendanceDetails.map((student) => (
                            <TableRow key={student.name}>
                                <TableCell className="font-medium">{student.name}</TableCell>
                                <TableCell className="text-right">
                                     <div className="flex items-center justify-end gap-2">
                                        {student.status === 'Present' ? (
                                            <>
                                                <CheckCircle className="h-5 w-5 text-green-500" />
                                                <span>Present</span>
                                            </>
                                        ) : (
                                            <>
                                                <XCircle className="h-5 w-5 text-destructive" />
                                                <span>Absent</span>
                                            </>
                                        )}
                                    </div>
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
