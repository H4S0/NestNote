'use client';

import { CiMenuFries } from 'react-icons/ci';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import DashboardItems from '../components/dashboard/DashboardItems';
import { CircleUser, DollarSign, Home, NotebookTabs } from 'lucide-react';
import { ThemeToggle } from '../components/dashboard/ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';

export const navLinks: { name: string; href: string; icon: any }[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    name: 'Notes',
    href: '/dashboard/sites',
    icon: NotebookTabs,
  },
  {
    name: 'Pricing',
    href: '/dashboard/pricing',
    icon: DollarSign,
  },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const [username, setUsername] = useState<string | null>(null);
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await fetch('/api/auth/creation');
        const result = await response.json();
        setUsername(result.firstName || 'Guest');
      } catch (error) {
        console.error('Error fetching username:', error);
        setUsername('Guest');
      }
    };

    fetchUsername();
  }, []);

  return (
    <section className="grid min-h-screen w-full lg:grid-cols-[250px_1fr]">
      {/* Menu button for small and medium screens */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50"
        onClick={toggleSidebar}
      >
        <CiMenuFries className="h-6 w-6" />
      </button>

      {/* Sidebar, hidden on medium and small screens, toggle-able */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-muted border-r transition-transform duration-300 ease-in-out transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:relative lg:block`}
      >
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <h3 className="text-2xl">
                Nest<span className="text-primary">Note</span>
              </h3>
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto">
            <nav className="grid items-start px-2 font-medium lg:px-4">
              <DashboardItems />
            </nav>
          </div>
        </div>
      </div>

      {/* Backdrop overlay for small and medium screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main content with top navbar */}
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted px-4 lg:h-[60px]">
          {/* Push the navbar items to the right */}
          <div className="ml-auto flex items-center gap-x-5">
            <ThemeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{username}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <LogoutLink>Logout</LogoutLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main content */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </section>
  );
}
