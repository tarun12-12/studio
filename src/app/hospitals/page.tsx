
"use client";

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { MapPin, Phone, Globe, Mail, User, Search, Navigation, Info, Stethoscope } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const hospitalsData = [
  {
    id: 1,
    placeholderId: 'hospital-kmch',
    name: "KMCH (Kovai Medical Center and Hospital)",
    address: "Avinashi Road, Coimbatore, Tamil Nadu 641014",
    phone: "+91 422 432 3800",
    email: "info@kmchhospitals.com",
    website: "kmchhospitals.com",
    status: "Open 24/7",
    distance: "Peelamedu",
    specialties: ["Cardiology", "Oncology", "Multi-Speciality"],
    doctors: [
      { name: "Dr. Nalla G Palaniswami", role: "Chairman & Medical Director" },
      { name: "Dr. Thavamani D Palaniswami", role: "Vice Chairman" },
      { name: "Dr. S. Karthikeyan", role: "Chief of Medical Services" }
    ]
  },
  {
    id: 2,
    placeholderId: 'hospital-psg',
    name: "PSG Hospitals",
    address: "Avinashi Rd, Peelamedu, Coimbatore, Tamil Nadu 641004",
    phone: "+91 422 257 0170",
    email: "contact@psghospitals.com",
    website: "psghospitals.com",
    status: "Open 24/7",
    distance: "Peelamedu",
    specialties: ["Education", "Emergency", "Neurology"],
    doctors: [
      { name: "Dr. J.S. Bhuvaneswaran", role: "Director, PSG Super Speciality Hospital" },
      { name: "Dr. T.M. SubbaRao", role: "Principal, PSG IMSR" }
    ]
  },
  {
    id: 3,
    placeholderId: 'hospital-kg',
    name: "KG Hospital",
    address: "Arts College Rd, Coimbatore, Tamil Nadu 641018",
    phone: "+91 422 221 2121",
    email: "kg@kghospital.com",
    website: "kghospital.com",
    status: "Open 24/7",
    distance: "Gopalapuram",
    specialties: ["Heart", "Diabetes", "Eye Care"],
    doctors: [
      { name: "Dr. G. Bakthavathsalam", role: "Chairman & Managing Director" },
      { name: "Dr. Ashok Bakthavathsalam", role: "Medical Director" }
    ]
  },
  {
    id: 4,
    placeholderId: 'hospital-ramakrishna',
    name: "Sri Ramakrishna Hospital",
    address: "Sarojini Naidu Rd, Sidhapudur, Coimbatore, Tamil Nadu 641044",
    phone: "+91 422 450 0000",
    email: "info@sriramakrishnahospital.com",
    website: "sriramakrishnahospital.com",
    status: "Open 24/7",
    distance: "Sidhapudur",
    specialties: ["Organ Transplant", "Maternity", "Critical Care"],
    doctors: [
      { name: "Dr. P. Guhan", role: "Director & Chief Medical Oncologist" },
      { name: "Dr. Isaac S.W. Christian", role: "Medical Director" }
    ]
  }
];

export default function HospitalsPage() {
  const [selectedHospital, setSelectedHospital] = useState<typeof hospitalsData[0] | null>(null);

  const handleHospitalClick = (hospital: typeof hospitalsData[0]) => {
    setSelectedHospital(hospital);
  };

  const closeDialog = () => {
    setSelectedHospital(null);
  };

  const hospitalImage = selectedHospital ? PlaceHolderImages.find(img => img.id === selectedHospital.placeholderId) : null;

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
                const img = PlaceHolderImages.find(i => i.id === hosp.placeholderId);
                return (
                  <Card 
                    key={hosp.id} 
                    className="hover:border-primary transition-all cursor-pointer border-transparent shadow-sm overflow-hidden group hover:shadow-md"
                    onClick={() => handleHospitalClick(hosp)}
                  >
                    <div className="relative h-40 w-full overflow-hidden">
                      {img && (
                        <Image
                          src={img.imageUrl}
                          alt={hosp.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          data-ai-hint={img.imageHint}
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
                      <CardDescription className="flex items-start gap-1.5 text-sm mt-1">
                        <MapPin className="h-3 w-3 shrink-0 mt-0.5" /> {hosp.address}
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
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125322.50349603387!2d76.88483287612716!3d11.0120145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f971cb5%3A0x2d6c3fdd9364828!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1715682456789!5m2!1sen!2sin" 
                className="absolute inset-0 w-full h-full border-0" 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </main>

      {/* Hospital Detail Dialog */}
      <Dialog open={!!selectedHospital} onOpenChange={closeDialog}>
        <DialogContent className="max-w-2xl overflow-hidden p-0 border-none shadow-2xl rounded-3xl">
          {selectedHospital && (
            <div className="flex flex-col">
              <DialogHeader className="sr-only">
                <DialogTitle>{selectedHospital.name}</DialogTitle>
                <DialogDescription>
                  Detailed information about {selectedHospital.name} including doctors and contact info.
                </DialogDescription>
              </DialogHeader>

              <div className="relative h-64 w-full">
                {hospitalImage && (
                  <Image 
                    src={hospitalImage.imageUrl} 
                    alt={selectedHospital.name} 
                    fill 
                    className="object-cover"
                    data-ai-hint={hospitalImage.imageHint}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <Badge className="bg-green-500 text-white mb-2">{selectedHospital.status}</Badge>
                  <h2 className="text-2xl font-bold text-white font-headline">{selectedHospital.name}</h2>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      <Info className="h-5 w-5 text-primary" /> Contact Details
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 text-sm">
                        <MapPin className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
                        <span>{selectedHospital.address}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="h-5 w-5 text-slate-400 shrink-0" />
                        <span className="font-medium">{selectedHospital.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="h-5 w-5 text-slate-400 shrink-0" />
                        <span className="text-primary hover:underline cursor-pointer">{selectedHospital.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Globe className="h-5 w-5 text-slate-400 shrink-0" />
                        <span className="text-primary hover:underline cursor-pointer">{selectedHospital.website}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      <Stethoscope className="h-5 w-5 text-primary" /> Specialist Doctors
                    </h3>
                    <div className="space-y-3">
                      {selectedHospital.doctors.map((doc, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <User className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{doc.name}</p>
                            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{doc.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-lg">Specialities</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedHospital.specialties.map((spec) => (
                      <Badge key={spec} variant="secondary" className="px-3 py-1">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50 border-t flex gap-3">
                <Button className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90">
                  Book Appointment
                </Button>
                <Button variant="outline" className="flex-1 h-12 rounded-xl border-2">
                  Emergency Contact
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
