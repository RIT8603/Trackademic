import { redirect } from 'next/navigation';

export default function AnalyticsPage() {
  // Redirect to the faculty dashboard
  redirect('/faculty-dashboard');
}
