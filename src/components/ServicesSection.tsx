import { motion } from "framer-motion";
import { Search, Users, Settings, CheckCircle2 } from "lucide-react";

const services = [
  {
    icon: Search,
    title: "Executive Search",
    desc: "Find C-suite and VP-level leaders who understand CPG dynamics. Our deep network spans brand management, supply chain, R&D, and sales leadership.",
    bullets: ["C-Suite Recruitment", "VP & Director Level", "Confidential Searches"],
  },
  {
    icon: Users,
    title: "Talent Acquisition",
    desc: "Scale your CPG workforce with quality hires at every level. From marketing managers to production supervisors, we deliver pre-vetted candidates.",
    bullets: ["Volume Hiring", "Specialized Roles", "Quick Turnaround"],
  },
  {
    icon: Settings,
    title: "RPO Solutions",
    desc: "Outsource your entire CPG recruitment function. We become an extension of your team, handling everything from sourcing to onboarding.",
    bullets: ["Full Cycle Management", "Dedicated Team", "Cost Optimization"],
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 lg:py-32" style={{ background: "hsl(210 28% 8%)" }}>
      <div className="mx-auto max-w-7xl px-8">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            What We Do
          </p>
          <h2 className="text-3xl font-extrabold text-foreground md:text-4xl lg:text-[2.6rem]">
            Recruitment Solutions for CPG
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-dim leading-relaxed">
            Tailored services designed specifically for Consumer Packaged Goods
            companies of all sizes.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-border/60 bg-card p-8 transition-all hover:border-primary/40"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15">
                <svc.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-foreground">{svc.title}</h3>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{svc.desc}</p>
              <ul className="space-y-3">
                {svc.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
