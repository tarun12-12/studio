import { Navbar } from '@/components/layout/Navbar';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Activity, Search, MapPin, MessageSquare, ArrowRight, Star, Clock, Stethoscope } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-medical');

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden">
          <div className="container px-4 md:px-8 relative z-10">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-2">
                  <Badge variant="secondary" className="px-3 py-1 mb-4 text-sm font-medium">
                    AI-Powered Healthcare
                  </Badge>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-6xl font-headline text-slate-900">
                    Connect with Health, <span className="text-primary underline decoration-secondary/30">Instantly.</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    AI-driven symptom analysis, remote consultations, and local hospital matching. Experience modern healthcare designed around you.
                  </p>
                </div>
                <div className="flex flex-col gap-3 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90 rounded-full h-12 px-8">
                    <Link href="/analyze">
                      Start AI Analysis <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-full h-12 px-8 border-primary text-primary hover:bg-primary/10">
                    <Link href="/doctors">Find a Doctor</Link>
                  </Button>
                </div>
              </div>
              <div className="relative group rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50 bg-slate-200 aspect-[4/3] lg:aspect-auto h-full min-h-[400px]">
                {heroImage && (
                  <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                    data-ai-hint={heroImage.imageHint}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Quick Actions */}
        <section className="py-12 bg-white/50 border-y">
          <div className="container px-4 md:px-8">
            <div className="mb-10 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold font-headline">Welcome back, John</h2>
                <p className="text-muted-foreground">Your health summary for today</p>
              </div>
              <Badge variant="outline" className="text-secondary font-medium border-secondary/20 bg-secondary/5">
                Last login: 2 hours ago
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-shadow border-none shadow-sm bg-primary/5">
                <CardHeader className="pb-2">
                  <div className="p-2 bg-primary/10 rounded-lg w-fit mb-2">
                    <Activity className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Symptom AI</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Quickly check your symptoms and get preliminary advice.
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" size="sm" className="p-0 text-primary font-semibold hover:bg-transparent">
                    <Link href="/analyze">Check now <ArrowRight className="ml-1 h-3 w-3" /></Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="hover:shadow-lg transition-shadow border-none shadow-sm bg-secondary/5">
                <CardHeader className="pb-2">
                  <div className="p-2 bg-secondary/10 rounded-lg w-fit mb-2">
                    <MessageSquare className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle className="text-lg">My Messages</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  2 unread messages from Dr. Sarah Miller.
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" size="sm" className="p-0 text-secondary font-semibold hover:bg-transparent">
                    <Link href="/messages">View inbox <ArrowRight className="ml-1 h-3 w-3" /></Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="hover:shadow-lg transition-shadow border-none shadow-sm">
                <CardHeader className="pb-2">
                  <div className="p-2 bg-slate-100 rounded-lg w-fit mb-2">
                    <MapPin className="h-6 w-6 text-slate-600" />
                  </div>
                  <CardTitle className="text-lg">Hospitals</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Find the nearest medical centers in your area.
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" size="sm" className="p-0 text-slate-600 font-semibold hover:bg-transparent">
                    <Link href="/hospitals">Locate <ArrowRight className="ml-1 h-3 w-3" /></Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="hover:shadow-lg transition-shadow border-none shadow-sm">
                <CardHeader className="pb-2">
                  <div className="p-2 bg-slate-100 rounded-lg w-fit mb-2">
                    <Search className="h-6 w-6 text-slate-600" />
                  </div>
                  <CardTitle className="text-lg">Doctor Finder</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Search for specialists and book remote sessions.
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" size="sm" className="p-0 text-slate-600 font-semibold hover:bg-transparent">
                    <Link href="/doctors">Search <ArrowRight className="ml-1 h-3 w-3" /></Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Upcoming Consultations */}
        <section className="py-16">
          <div className="container px-4 md:px-8">
            <h3 className="text-2xl font-bold font-headline mb-8 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" /> Upcoming Appointments
            </h3>
            <div className="grid gap-4">
              <div className="flex items-center justify-between p-4 bg-white rounded-xl border shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-slate-200 overflow-hidden">
                    <Image 
                      src="https://picsum.photos/seed/doctor1/48/48" 
                      alt="Doctor" 
                      width={48} 
                      height={48}
                      data-ai-hint="doctor portrait"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Dr. Sarah Miller</h4>
                    <p className="text-sm text-muted-foreground">Cardiologist • Remote Session</p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-6">
                  <div className="hidden sm:block">
                    <p className="font-medium text-slate-900">Today, 4:30 PM</p>
                    <p className="text-xs text-muted-foreground">In 2 hours</p>
                  </div>
                  <Button size="sm" className="bg-secondary hover:bg-secondary/90">Join Session</Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white rounded-xl border shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-slate-200 overflow-hidden">
                    <Image 
                      src="https://picsum.photos/seed/doctor2/48/48" 
                      alt="Doctor" 
                      width={48} 
                      height={48}
                      data-ai-hint="doctor portrait"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Dr. Michael Chen</h4>
                    <p className="text-sm text-muted-foreground">General Practitioner • Clinic Visit</p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-6">
                  <div className="hidden sm:block">
                    <p className="font-medium text-slate-900">Oct 24, 10:00 AM</p>
                    <p className="text-xs text-muted-foreground">Tomorrow</p>
                  </div>
                  <Button size="sm" variant="outline">View Details</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-slate-50 py-12">
        <div className="container px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-2">
              <Stethoscope className="h-6 w-6 text-primary" />
              <span className="font-headline font-bold text-slate-900">HealthConnect AI</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2024 HealthConnect AI. All medical recommendations are preliminary.</p>
            <div className="flex space-x-6">
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
