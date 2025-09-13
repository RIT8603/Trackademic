import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, CreditCard, LogOut, Settings, User, ShieldAlert } from "lucide-react"
import { Badge } from "./ui/badge"

export function UserNav() {
  return (
    <div className="flex items-center gap-2 md:gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 justify-center p-0 text-xs">2</Badge>
                <span className="sr-only">Notifications</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80" align="end">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <div className="flex items-start gap-3">
              <ShieldAlert className="h-5 w-5 text-destructive mt-1"/>
              <div>
                <p className="font-semibold">Security Alert</p>
                <p className="text-xs text-muted-foreground">Unauthorized activity detected in Hall 3.</p>
              </div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-yellow-500 mt-1"/>
              <div>
                <p className="font-semibold">Absenteeism Warning</p>
                <p className="text-xs text-muted-foreground">Student A. Miller missed Physics 101.</p>
              </div>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-9 w-9 rounded-full">
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://picsum.photos/seed/user-avatar/100/100" alt="User avatar" data-ai-hint="person face"/>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Prof. John Doe</p>
              <p className="text-xs leading-none text-muted-foreground">
                j.doe@university.edu
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
