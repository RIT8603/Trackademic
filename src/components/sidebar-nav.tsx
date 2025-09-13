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
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/attendance', label: 'Attendance', icon: CalendarCheck },
  { href: '/planner', label: 'Planner', icon: BookOpenCheck },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/security', label: 'Security', icon: ShieldAlert },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-3 p-2">
            <div className="p-2 rounded-lg bg-primary text-primary-foreground w-10 h-10 flex items-center justify-center">
                <ShieldCheck className="h-6 w-6"/>
            </div>
            <h1 className="text-xl font-bold font-headline text-sidebar-foreground whitespace-nowrap">Campus Sentinel</h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {links.map((link) => (
            <SidebarMenuItem key={link.href}>
              <Link href={link.href} passHref>
                <SidebarMenuButton asChild isActive={pathname === link.href} tooltip={link.label}>
                  <>
                    <link.icon />
                    <span>{link.label}</span>
                  </>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Help">
              <CircleHelp />
              <span>Help</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  )
}
