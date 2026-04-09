import React from "react";
import { FileText, CheckCircle2, AlertCircle, Info } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      
      {/* HEADER */}
      <section className="py-10 bg-zinc-50 dark:bg-zinc-900/50 border-b border-border">
        <div className="container mx-auto px-6 text-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-orange-600/10 text-orange-600 flex items-center justify-center mx-auto">
            <FileText className="w-6 h-6" />
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-foreground">Terms of Service</h1>
          <p className="text-xs text-muted-foreground">Last updated: April 09, 2026</p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-12">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="space-y-10">
            
            <div className="p-4 rounded-xl bg-blue-600/5 border border-blue-600/10 flex gap-3">
                <Info className="w-5 h-5 text-blue-600 shrink-0" />
                <p className="text-xs text-blue-800 dark:text-blue-300 m-0">
                    Please read these terms carefully before using FoodHub. By using our service, 
                    you agree to these terms.
                </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-orange-600 mb-1">
                <CheckCircle2 className="w-5 h-5" />
                <h2 className="text-lg font-bold m-0">1. Agreement to Terms</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed m-0">
                These terms constitute a legally binding agreement between you and FoodHub concerning 
                your access to and use of our platform.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-orange-600 mb-1">
                <CheckCircle2 className="w-5 h-5" />
                <h2 className="text-lg font-bold m-0">2. User Representations</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed m-0">
                You represent that all registration information you submit will be true, 
                accurate, and complete.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-orange-600 mb-1">
                <CheckCircle2 className="w-5 h-5" />
                <h2 className="text-lg font-bold m-0">3. Prohibited Activities</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                You may not use the services for any unauthorized commercial endeavors.
              </p>
              <div className="grid grid-cols-1 gap-2">
                  {[
                      "Systematic retrieval of data",
                      "Trick, defraud, or mislead users",
                      "Circumvent security features",
                      "Unauthorized framing or linking"
                  ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 text-[11px] font-medium border border-border">
                          <AlertCircle className="w-3.5 h-3.5 text-orange-600" />
                          {item}
                      </div>
                  ))}
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">4. Governing Law</h2>
              <p className="text-sm text-muted-foreground leading-relaxed m-0">
                These Terms shall be governed by the laws of Bangladesh.
              </p>
            </div>

            <div className="pt-8 border-t border-border mt-12">
                <p className="text-xs text-muted-foreground text-center">
                    Questions? Email us at 
                    <a href="mailto:legal@foodhub.com" className="text-orange-600 font-bold ml-1 hover:underline">legal@foodhub.com</a>.
                </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
