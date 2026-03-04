import { useState } from "react";
import { Linkedin, Instagram } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

const Footer = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      toast({ title: "Validation error", description: result.error.errors[0].message, variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const { data, error } = await supabase.functions.invoke("contact-form", {
      body: result.data,
    });
    setSubmitting(false);
    const hasError = error || (data && !data.success);
    if (hasError) {
      toast({ title: "Something went wrong", description: "Please try again later.", variant: "destructive" });
    } else {
      toast({ title: "Message sent!", description: "We'll get back to you soon." });
      setForm({ name: "", email: "", message: "" });
    }
  };

  const inputClass =
    "w-full rounded-md border border-border/40 bg-white/5 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors";

  return (
    <footer style={{ background: "hsl(210 30% 6%)" }}>
      <div className="mx-auto max-w-7xl px-8 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <a href="#" className="inline-block mb-6">
              <img src={logo} alt="Recruit CPG" className="h-20 w-auto" />
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-xs">
              The premier recruitment partner for Consumer Packaged Goods. Connecting exceptional talent with industry-leading brands since 2009.
            </p>
            <div className="flex gap-3">
              <a href="https://www.linkedin.com/company/recruitcpg/" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:text-foreground hover:border-muted-foreground">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="https://www.instagram.com/recruitcpg" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:text-foreground hover:border-muted-foreground">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://x.com/RecruitCPG" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:text-foreground hover:border-muted-foreground">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>

          {/* Services column */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-6">Services</h4>
            <ul className="space-y-4">
              {["Executive Search", "Talent Acquisition", "RPO Solutions", "Contract Staffing"].map((item) => (
                <li key={item}>
                  <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries column */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-6">Industries</h4>
            <ul className="space-y-4">
              {["Food & Beverage", "Personal Care", "Household Products", "Health & Wellness"].map((item) => (
                <li key={item}>
                  <a href="#categories" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-6">Company</h4>
            <ul className="space-y-4">
              {[
                { label: "About Us", href: "#about" },
                { label: "Blog", href: "#blog" },
                { label: "Careers", href: "#" },
                { label: "Contact", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact form column */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-6">Get in Touch</h4>
            <a href="tel:+19713902252" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              (971) 390-2252
            </a>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className={inputClass}
              />
              <input
                type="email"
                placeholder="Your email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className={inputClass}
              />
              <textarea
                placeholder="Your message"
                rows={3}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className={inputClass + " resize-none"}
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto max-w-7xl px-8">
        <div className="border-t border-border/30 py-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Recruit CPG. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
