'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  BookOpen,
  Brain,
  FileText,
  Home,
  LogOut,
  Menu,
  Settings,
  Users
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  userRole?: 'student' | 'instructor' | 'admin';
}

const studentNavItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'My Courses', href: '/courses', icon: BookOpen },
  { name: 'Tests', href: '/tests', icon: Brain },
  { name: 'Results', href: '/results', icon: BarChart3 },
  { name: 'Reports', href: '/reports', icon: FileText },
];

const adminNavItems = [
  { name: 'Dashboard', href: '/admin', icon: Home },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Courses', href: '/admin/courses', icon: BookOpen },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export function Sidebar({ userRole = 'student' }: SidebarProps) {
  const pathname = usePathname();
  const navItems = userRole === 'admin' ? adminNavItems : studentNavItems;

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <Brain className="h-6 w-6 text-[#2E58A6]" />
          <span className="text-[#032B61]">MindLMS</span>
        </Link>
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4 mt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-[#6B86B4] transition-all hover:text-[#032B61] hover:bg-[#F2E5D8]",
                  isActive && "bg-[#F2E5D8] text-[#032B61] font-medium"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start gap-2 text-[#6B86B4] border-[#6B86B4] hover:bg-[#F2E5D8]"
          onClick={() => {
            // Handle logout
            window.location.href = '/auth/login';
          }}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden border-r bg-white lg:block lg:w-64">
        <SidebarContent />
      </div>
      
      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 lg:hidden fixed top-4 left-4 z-50"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-0 w-64">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}