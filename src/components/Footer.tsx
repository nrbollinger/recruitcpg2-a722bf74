import { Linkedin, Instagram } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer style={{ background: "hsl(210 30% 6%)" }}>
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-8 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
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
                  <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </a>
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
                  <a href="#categories" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </a>
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
                  <a href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
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
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
