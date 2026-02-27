import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Stethoscope, User, Bell, Search, MessageSquare, MapPin, Activity } from 'lucide-react';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary rounded-lg p-1.5">
              <Stethoscope className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-headline text-xl font-bold text-primary hidden sm:inline-block">HealthConnect AI</span>
          </Link>
          <nav className="ml-8 hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/analyze" className="transition-colors hover:text-primary flex items-center gap-1.5">
              <Activity className="h-4 w-4" /> Analyze
            </Link>
            <Link href="/doctors" className="transition-colors hover:text-primary flex items-center gap-1.5">
              <Search className="h-4 w-4" /> Doctors
            </Link>
            <Link href="/hospitals" className="transition-colors hover:text-primary flex items-center gap-1.5">
              <MapPin className="h-4 w-4" /> Hospitals
            </Link>
            <Link href="/messages" className="transition-colors hover:text-primary flex items-center gap-1.5">
              <MessageSquare className="h-4 w-4" /> Messages
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Bell className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium leading-none">John Doe</p>
              <p className="text-xs text-muted-foreground mt-1">Patient</p>
            </div>
            <Button variant="outline" size="icon" className="rounded-full border-2 border-primary">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}