"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth, useUser, initiateEmailSignUp } from '@/firebase';
import { Stethoscope, UserPlus } from 'lucide-react';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();

  useEffect(() => {
    if (user && !isUserLoading) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    initiateEmailSignUp(auth, email, password);
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-none shadow-xl">
          <CardHeader className="space-y-2 text-center">
            <div className="flex justify-center mb-2">
              <div className="bg-primary rounded-xl p-2">
                <Stethoscope className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold font-headline">Create Account</CardTitle>
            <CardDescription>
              Join HealthConnect AI to start your health journey
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <p className="text-[10px] text-muted-foreground text-center">
                By signing up, you agree to our Terms of Service and Privacy Policy.
              </p>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                <UserPlus className="mr-2 h-4 w-4" /> Sign Up
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary font-semibold hover:underline">
                  Login
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  );
}
