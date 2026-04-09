"use client";

import React, { useState } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  HelpCircle,
  Clock,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const contactMethods = [
  {
    title: "Email Us",
    value: "support@foodhub.com",
    description: "Response within 2 hours.",
    icon: Mail,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Call Us",
    value: "+880 1234 567890",
    description: "Mon-Fri, 9am - 6pm.",
    icon: Phone,
    color: "bg-green-500/10 text-green-500",
  },
  {
    title: "Our Office",
    value: "Dhaka, Bangladesh",
    description: "Visit us for a chat.",
    icon: MapPin,
    color: "bg-orange-500/10 text-orange-500",
  },
];

import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    value: "item-1",
    q: "How fast is the delivery?",
    a: "Typical delivery time is between 30 to 45 minutes, depending on the restaurant's preparation time and your location."
  },
  {
    value: "item-2",
    q: "Do you offer refunds for issues?",
    a: "Yes! If there are issues with your order that are on our end or the restaurant's, we provide a full refund within 24 hours."
  },
  {
    value: "item-3",
    q: "How can I become a partner?",
    a: "You can email our merchant team at partners@foodhub.com or use the 'Become a Provider' link in our dashboard."
  },
  {
    value: "item-4",
    q: "Which payment methods are supported?",
    a: "We support major credit/debit cards, mobile financial services like bKash/Nagad, and cash on delivery."
  }
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success("Message sent!", {
        description: "We'll get back to you shortly.",
      });
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full pb-16">
      
      {/* 1. HERO HEADER */}
      <section className="relative py-12 md:py-16 bg-slate-950 text-white overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-purple-600/10 opacity-50" />
        <div className="container mx-auto px-6 relative z-10 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-orange-400 text-xs font-bold uppercase tracking-wider">
            <MessageSquare className="w-3 h-3" />
            <span>Contact</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">How can we help?</h1>
          <p className="text-slate-400 max-w-lg mx-auto text-base">
            Have a question or feedback? Our team is available to assist you.
          </p>
        </div>
      </section>

      {/* 2. CONTACT CONTENT */}
      <section className="container mx-auto px-6 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT: Contact Cards */}
          <div className="lg:col-span-1 space-y-4">
            {contactMethods.map((method, i) => (
              <div key={i} className="p-5 rounded-2xl bg-background border border-border shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-start gap-4">
                  <div className={`p-2.5 rounded-lg ${method.color}`}>
                    <method.icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-bold text-foreground">{method.title}</h4>
                    <p className="text-sm text-foreground font-medium">{method.value}</p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{method.description}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="p-5 rounded-2xl bg-orange-600/5 border border-orange-600/10 flex items-center gap-4">
               <div className="w-10 h-10 rounded-full bg-orange-600 text-white flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
               </div>
               <div className="space-y-0">
                  <h4 className="text-sm font-bold text-foreground">Support Hours</h4>
                  <p className="text-[11px] text-muted-foreground font-bold">Mon — Fri | 09:00 — 18:00</p>
               </div>
            </div>
          </div>

          {/* RIGHT: Contact Form */}
          <div className="lg:col-span-2">
            <div className="p-6 md:p-8 rounded-2xl bg-background border border-border shadow-md">
              {submitted ? (
                <div className="h-[400px] flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center">
                     <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-2xl font-black text-foreground">Message Received!</h2>
                    <p className="text-muted-foreground text-sm">We'll get back to you as soon as possible.</p>
                  </div>
                  <Button 
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="rounded-full px-6 h-10 font-bold text-sm"
                  >
                    New Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-xl font-black text-foreground">Send a Message</h2>
                    <p className="text-muted-foreground text-xs">We typically respond within one business day.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground/80 px-1">Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Your name"
                        className="w-full bg-muted/30 border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-600/10 focus:border-orange-600 transition-all outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground/80 px-1">Email</label>
                      <input 
                        required
                        type="email" 
                        placeholder="your@email.com"
                        className="w-full bg-muted/30 border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-600/10 focus:border-orange-600 transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground/80 px-1">Subject</label>
                    <select className="w-full bg-muted/30 border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-600/10 focus:border-orange-600 transition-all outline-none">
                       <option>General Inquiry</option>
                       <option>Order Issue</option>
                       <option>Become a Partner</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground/80 px-1">Message</label>
                    <textarea 
                      required
                      placeholder="Your message..."
                      rows={4}
                      className="w-full bg-muted/30 border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-600/10 focus:border-orange-600 transition-all outline-none resize-none"
                    />
                  </div>

                  <Button 
                    disabled={isSubmitting}
                    className="w-full h-12 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-base shadow-md shadow-orange-500/10 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                         <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                         Sending...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. FAQ SECTION */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-foreground">Frequently Asked Questions</h2>
            <p className="text-xs text-muted-foreground">Quick answers to common questions.</p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq) => (
              <AccordionItem key={faq.value} value={faq.value} className="px-5 rounded-2xl border border-border bg-background shadow-sm overflow-hidden group hover:border-orange-600/20 transition-all">
                <AccordionTrigger className="text-sm font-bold text-foreground hover:no-underline hover:text-orange-600 py-5 transition-colors">
                    {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground leading-relaxed transition-all">
                    {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

    </div>
  );
}

