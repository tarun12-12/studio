
"use client";

import { Navbar } from '@/components/layout/Navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Globe, Clock, Navigation, Search } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const hospitalsData = [
  {
    id: 1,
    placeholderId: 'hospital-kmch',
    name: "KMCH (Kovai Medical Center and Hospital)",
    address: "Avinashi Road, Coimbatore, Tamil Nadu 641014",
    phone: "+91 422 432 3800",
    website: "kmchhospitals.com",
    status: "Open 24/7",
    distance: "Peelamedu",
    specialties: ["Cardiology", "Oncology", "Multi-Speciality"]
  },
  {
    id: 2,
    placeholderId: 'hospital-psg',
    name: "PSG Hospitals",
    address: "Avinashi Rd, Peelamedu, Coimbatore, Tamil Nadu 641004",
    phone: "+91 422 257 0170",
    website: "psghospitals.com",
    status: "Open 24/7",
    distance: "Peelamedu",
    specialties: ["Education", "Emergency", "Neurology"]
  },
  {
    id: 3,
    placeholderId: 'hospital-kg',
    name: "KG Hospital",
    address: "Arts College Rd, Coimbatore, Tamil Nadu 641018",
    phone: "+91 422 221 2121",
    website: "kghospital.com",
    status: "Open 24/7",
    distance: "Gopalapuram",
    specialties: ["Heart", "Diabetes", "Eye Care"]
  },
  {
    id: 4,
    placeholderId: 'hospital-ramakrishna',
    name: "Sri Ramakrishna Hospital",
    address: "Sarojini Naidu Rd, Sidhapudur, Coimbatore, Tamil Nadu 641044",
    phone: "+91 422 450 0000",
    website: "sriramakrishnahospital.com",
    status: "Open 24/7",
    distance: "Sidhapudur",
    specialties: ["Organ Transplant", "Maternity", "Critical Care"]
  }
];

export default function HospitalsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 py-8 px-4 md:px-8">
        <div className="container max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold font-headline">Hospitals in Coimbatore</h1>
              <p className="text-muted-foreground">Find top-rated medical facilities and multi-speciality centers in Coimbatore.</p>
            </div>
            <div className="flex gap-2 w-full md:max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input placeholder="Search areas (Peelamedu, RS Puram...)" className="pl-10 h-12 bg-white border-none shadow-sm" />
              </div>
              <Button className="h-12 px-6 bg-primary hover:bg-primary/90">Search</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-4 max-h-[700px] overflow-y-auto pr-2">
              {hospitalsData.map((hosp) => {
                const hospitalImage = PlaceHolderImages.find(img => img.id === hosp.placeholderId);
                return (
                  <Card key={hosp.id} className="hover:border-primary transition-colors cursor-pointer border-transparent shadow-sm overflow-hidden group">
                    <div className="relative h-40 w-full overflow-hidden">
                      {hospitalImage && (
                        <Image
                          src={hospitalImage.imageUrl}
                          alt={hosp.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          data-ai-hint={hospitalImage.imageHint}
                        />
                      )}
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-green-500 text-white border-none px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold">
                          {hosp.status}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="p-5">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-medium text-slate-400">{hosp.distance}</span>
                      </div>
                      <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">{hosp.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1.5 text-sm mt-1">
                        <MapPin className="h-3 w-3 shrink-0" /> {hosp.address}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-5 pb-5 pt-0 space-y-4">
                      <div className="flex flex-wrap gap-1.5">
                        {hosp.specialties.map((spec) => (
                          <Badge key={spec} variant="secondary" className="text-[10px] font-medium px-2 py-0.5">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 text-xs h-8">
                          <Phone className="h-3 w-3 mr-1.5" /> Call
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 text-xs h-8">
                          <Navigation className="h-3 w-3 mr-1.5" /> Directions
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="lg:col-span-2 rounded-3xl overflow-hidden relative min-h-[500px] bg-slate-200 shadow-inner">
              <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <MapPin className="h-12 w-12 text-primary animate-bounce mx-auto" />
                  <p className="text-slate-500 font-medium">Map of Coimbatore loading...</p>
                </div>
              </div>
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button variant="secondary" size="icon" className="shadow-lg bg-white rounded-xl">
                  <span className="text-lg font-bold text-slate-900">+</span>
                </Button>
                <Button variant="secondary" size="icon" className="shadow-lg bg-white rounded-xl">
                  <span className="text-lg font-bold text-slate-900">-</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
