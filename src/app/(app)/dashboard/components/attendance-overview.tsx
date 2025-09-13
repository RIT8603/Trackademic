"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { month: "Jan", attendance: 85, engagement: 75 },
  { month: "Feb", attendance: 88, engagement: 80 },
  { month: "Mar", attendance: 92, engagement: 85 },
  { month: "Apr", attendance: 90, engagement: 88 },
  { month: "May", attendance: 95, engagement: 92 },
  { month: "Jun", attendance: 91, engagement: 89 },
]

const chartConfig = {
  attendance: {
    label: "Attendance",
    color: "hsl(var(--primary))",
  },
  engagement: {
    label: "Engagement",
    color: "hsl(var(--accent))"
  }
} satisfies ChartConfig

export function AttendanceOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Engagement & Attendance</CardTitle>
        <CardDescription>Monthly trends for the last 6 months.</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
              <XAxis dataKey="month" tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => `${value}%`} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
              <Bar dataKey="attendance" fill="var(--color-attendance)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="engagement" fill="var(--color-engagement)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
