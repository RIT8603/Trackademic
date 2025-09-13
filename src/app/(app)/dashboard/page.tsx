import { AttendanceOverview } from "./components/attendance-overview";
import { IdleTimeSuggestions } from "./components/idle-time-suggestions";
import { TodaysSchedule } from "./components/todays-schedule";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, here's your academic overview.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <AttendanceOverview />
          <IdleTimeSuggestions />
        </div>
        <div className="lg:col-span-1">
          <TodaysSchedule />
        </div>
      </div>
    </div>
  );
}
