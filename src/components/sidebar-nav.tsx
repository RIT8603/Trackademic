"use client"
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
} from '@/components/ui/sidebar'
import {
  LayoutDashboard,
  CalendarCheck,
  BookOpenCheck,
  BarChart3,
  ShieldAlert,
  Settings,
  CircleHelp,
  ShieldCheck,
  Video,
  User,
  GraduationCap,
  Briefcase,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const links = [
  { href: '/student-dashboard', label: 'Student Dashboard', icon: GraduationCap },
  { href: 'https://chatbot-n5go.onrender.com', label: 'Student Chatbot', icon: ChatFlow},
  { href: '/faculty-dashboard', label: 'Faculty Dashboard', icon: Briefcase },
  { href: '/admin-dashboard', label: 'Admin Dashboard', icon: LayoutDashboard },
  { href: '/admin-dashboard/manage-students', label: 'Manage Students', icon: Users },
  { href: '/attendance', label: 'Attendance', icon: CalendarCheck },
  { href: '/planner', label: 'Planner', icon: BookOpenCheck },
  { href: '/classroom', label: 'Live Classroom', icon: Video },
  { href: '/security', label: 'Security', icon: ShieldAlert },
]

const bottomLinks = [
    { href: '/profile', label: 'Profile', icon: User },
    { href: '/settings', label: 'Settings', icon: Settings },
    { href: '/help', label: 'Help', icon: CircleHelp },
]

export function SidebarNav() {
  const pathname = usePathname()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])


  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-3 p-2">
            <div className="p-2 rounded-lg bg-primary text-primary-foreground w-10 h-10 flex items-center justify-center">
                <ShieldCheck className="h-6 w-6"/>
            </div>
            <h1 className="text-xl font-bold font-headline text-sidebar-foreground whitespace-nowrap">TrackAcdemic</h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        {isClient && (
          <SidebarMenu>
            {links.map((link) => (
              <SidebarMenuItem key={link.href}>
                <Link href={link.href} passHref>
                  <SidebarMenuButton isActive={pathname.startsWith(link.href)} tooltip={link.label}>
                      <link.icon />
                      <span>{link.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        )}
      </SidebarContent>
      <SidebarFooter>
        {isClient && (
          <SidebarMenu>
              {bottomLinks.map((link) => (
                  <SidebarMenuItem key={link.href}>
                  <Link href={link.href} passHref>
                      <SidebarMenuButton isActive={pathname.startsWith(link.href)} tooltip={link.label}>
                          <link.icon />
                          <span>{link.label}</span>
                      </SidebarMenuButton>
                  </Link>
                  </SidebarMenuItem>
              ))}
          </SidebarMenu>
        )}
      </SidebarFooter>
    </>
  )
}
