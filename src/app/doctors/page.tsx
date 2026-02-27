"use client";

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Star, MessageSquare, Filter, Video, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Miller",
    specialty: "Cardiologist",
    rating: 4.9,
    reviews: 124,
    location: "Central Medical Center",
    availability: "Available Today",
    image: "https://picsum.photos/seed/doc1/200/200"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "General Practitioner",
    rating: 4.8,
    reviews: 89,
    location: "Green Valley Clinic",
    availability: "Tomorrow",
    image: "https://picsum.photos/seed/doc2/200/200"
  },
  {
    id: 3,
    name: "Dr. Elena Rodriguez",
    specialty: "Neurologist",
    rating: 4.7,
    reviews: 56,
    location: "Neuro Health Hub",
    availability: "In 2 days",
    image: "https://picsum.photos/seed/doc3/200/200"
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Dermatologist",
    rating: 4.9,
    reviews: 210,
    location: "Skin & Care Clinic",
    availability: "Next Week",
    image: "https://picsum.photos/seed/doc4/200/200"
  }
];

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDoctors = doctors.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    doc.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 py-8 px-4 md:px-8">
        <div className="container max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold font-headline">Find your Doctor</h1>
              <p className="text-muted-foreground">Search by specialty, name, or medical center.</p>
            </div>
            <div className="flex gap-2 w-full md:max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Search specialists..." 
                  className="pl-10 h-12 bg-white rounded-xl border-none shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="h-12 w-12 rounded-xl bg-white border-none shadow-sm">
                <Filter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doc) => (
              <Card key={doc.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow group">
                <CardContent className="p-0">
                  <div className="p-6 space-y-4">
                    <div className="flex gap-4">
                      <div className="h-20 w-20 rounded-2xl bg-slate-100 overflow-hidden shrink-0 relative">
                        <Image 
                          src={doc.image} 
                          alt={doc.name} 
                          fill 
                          className="object-cover"
                          data-ai-hint="doctor portrait"
                        />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold text-lg text-slate-900 group-hover:text-primary transition-colors">{doc.name}</h3>
                        <p className="text-primary font-medium text-sm">{doc.specialty}</p>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          <span className="font-bold">{doc.rating}</span>
                          <span className="text-slate-400">({doc.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin className="h-4 w-4 text-slate-400" />
                        {doc.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        {doc.availability}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 border-t flex gap-2">
                    <Button variant="outline" className="flex-1 h-10 rounded-lg gap-2">
                      <MessageSquare className="h-4 w-4" /> Message
                    </Button>
                    <Button className="flex-1 h-10 rounded-lg bg-primary hover:bg-primary/90 gap-2">
                      <Video className="h-4 w-4" /> Video Call
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDoctors.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-slate-100 mb-6">
                <Search className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold font-headline mb-2">No doctors found</h3>
              <p className="text-slate-500">Try adjusting your search terms or filters.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}