import { redirect } from 'next/navigation';

export default function DashboardPage() {
  // Redirect to the student dashboard by default
  redirect('/student-dashboard');
}
