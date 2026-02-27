"use client";

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, MoreVertical, Phone, Video, Search, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const contacts = [
  { id: 1, name: "Dr. Sarah Miller", lastMessage: "How are you feeling today?", time: "10:30 AM", online: true, unread: 2 },
  { id: 2, name: "Dr. Michael Chen", lastMessage: "Your test results are ready.", time: "Yesterday", online: false, unread: 0 },
  { id: 3, name: "Health Support", lastMessage: "Welcome to HealthConnect!", time: "Oct 15", online: true, unread: 0 },
];

const messages_mock = [
  { id: 1, sender: "other", text: "Hello John, I've reviewed your recent symptom report.", time: "10:25 AM" },
  { id: 2, sender: "me", text: "Thanks doctor. Should I be concerned about the chest tightness?", time: "10:28 AM" },
  { id: 3, sender: "other", text: "Based on the report, it seems to be related to muscle strain, but I'd like to do a quick video call to confirm.", time: "10:30 AM" },
  { id: 4, sender: "other", text: "How are you feeling today?", time: "10:31 AM" },
];

export default function MessagesPage() {
  const [activeContact, setActiveContact] = useState(contacts[0]);
  const [newMessage, setNewMessage] = useState('');

  return (
    <div className="flex h-screen flex-col bg-background">
      <Navbar />
      <main className="flex flex-1 overflow-hidden">
        <div className="container px-4 md:px-8 flex flex-1 overflow-hidden py-4 md:py-8">
          <div className="flex w-full h-full bg-white rounded-3xl shadow-xl overflow-hidden border">
            {/* Sidebar */}
            <div className="w-full md:w-80 border-r flex flex-col">
              <div className="p-4 border-b space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold font-headline">Messages</h2>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Search className="h-5 w-5" />
                  </Button>
                </div>
                <Input placeholder="Search messages..." className="bg-slate-50 border-none rounded-xl" />
              </div>
              <ScrollArea className="flex-1">
                <div className="p-2 space-y-1">
                  {contacts.map((contact) => (
                    <button
                      key={contact.id}
                      onClick={() => setActiveContact(contact)}
                      className={cn(
                        "w-full flex items-center gap-3 p-3 rounded-2xl transition-all",
                        activeContact.id === contact.id ? "bg-primary/10" : "hover:bg-slate-50"
                      )}
                    >
                      <div className="relative">
                        <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                          <AvatarImage src={`https://picsum.photos/seed/${contact.id}/48/48`} />
                          <AvatarFallback>{contact.name[4]}</AvatarFallback>
                        </Avatar>
                        {contact.online && (
                          <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
                        )}
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <div className="flex justify-between items-start">
                          <p className="font-bold text-slate-900 truncate">{contact.name}</p>
                          <span className="text-[10px] text-slate-400 font-medium">{contact.time}</span>
                        </div>
                        <p className="text-xs text-slate-500 truncate mt-0.5">{contact.lastMessage}</p>
                      </div>
                      {contact.unread > 0 && (
                        <div className="h-5 w-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-[10px] font-bold">
                          {contact.unread}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Chat Area */}
            <div className="hidden md:flex flex-1 flex-col bg-slate-50/50">
              {/* Chat Header */}
              <div className="p-4 bg-white border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={`https://picsum.photos/seed/${activeContact.id}/40/40`} />
                    <AvatarFallback>{activeContact.name[4]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-slate-900 leading-none">{activeContact.name}</h3>
                    <p className="text-xs text-green-500 font-medium mt-1">
                      {activeContact.online ? 'Online' : 'Last seen 2h ago'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="rounded-full text-slate-400 hover:text-primary">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full text-slate-400 hover:text-primary">
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full text-slate-400">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Chat Messages */}
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-6">
                  {messages_mock.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex flex-col max-w-[70%]",
                        msg.sender === 'me' ? "ml-auto items-end" : "items-start"
                      )}
                    >
                      <div
                        className={cn(
                          "p-4 rounded-2xl shadow-sm text-sm font-medium leading-relaxed",
                          msg.sender === 'me' 
                            ? "bg-primary text-primary-foreground rounded-tr-none" 
                            : "bg-white text-slate-700 rounded-tl-none border"
                        )}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium mt-2 px-1">
                        {msg.time}
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Chat Input */}
              <div className="p-4 bg-white border-t">
                <div className="flex gap-2 bg-slate-50 p-2 rounded-2xl items-center">
                  <Input 
                    placeholder="Type a message..." 
                    className="flex-1 bg-transparent border-none focus-visible:ring-0 h-10"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <Button 
                    size="icon" 
                    className="h-10 w-10 rounded-xl bg-primary hover:bg-primary/90 shrink-0"
                    disabled={!newMessage.trim()}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}