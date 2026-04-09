import React from "react";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      
      {/* HEADER */}
      <section className="py-10 bg-zinc-50 dark:bg-zinc-900/50 border-b border-border">
        <div className="container mx-auto px-6 text-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-orange-600/10 text-orange-600 flex items-center justify-center mx-auto">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-foreground">Privacy Policy</h1>
          <p className="text-xs text-muted-foreground whitespace-nowrap">Last updated: April 09, 2026</p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-12">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="space-y-10">
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-orange-600 mb-1">
                <Lock className="w-5 h-5" />
                <h2 className="text-lg font-bold m-0">Introduction</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                At FoodHub, we take your privacy seriously. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you visit our website and use our application.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-orange-600 mb-1">
                <Eye className="w-5 h-5" />
                <h2 className="text-lg font-bold m-0">Information We Collect</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We collect personal information that you voluntarily provide to us when you register, 
                place an order, or contact us.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted-foreground">
                <li><strong>Personal Data:</strong> Name, email, phone number, and address.</li>
                <li><strong>Payment Data:</strong> Necessary data to process payments.</li>
                <li><strong>Usage Data:</strong> Information on how you interact with our services.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-orange-600 mb-1">
                <FileText className="w-5 h-5" />
                <h2 className="text-lg font-bold m-0">How We Use Your Information</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We use your data to facilitate account creation, process orders, and provide support.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted-foreground">
                <li>To deliver and facilitate delivery of services.</li>
                <li>To respond to user inquiries and offer support.</li>
                <li>To improve our platform based on usage patterns.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-orange-600/5 border border-orange-600/10 space-y-2">
              <h3 className="text-base font-bold text-foreground">Security</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We use reasonable administrative, technical, and physical security measures 
                to protect your personal information.
              </p>
            </div>

            <div className="pt-6 border-t border-border mt-8">
              <p className="text-xs text-muted-foreground text-center">
                Questions? Email us at 
                <a href="mailto:privacy@foodhub.com" className="text-orange-600 font-bold ml-1 hover:underline">privacy@foodhub.com</a>.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
