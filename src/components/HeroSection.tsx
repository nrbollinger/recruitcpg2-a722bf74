import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { value: "45%", label: "Cost Savings with RPO" },
  { value: "20+", label: "Years of CPG Experience" },
  { value: "150+", label: "CPG Clients" },
  { value: "25K+", label: "Placements" },
];

const tags = ["Food & Snacks", "Beverages", "Personal Care", "Household", "Pet Care", "Health & Wellness"];

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pb-0" style={{
      background: "linear-gradient(180deg, hsl(210 25% 11%) 0%, hsl(210 30% 7%) 60%, hsl(200 35% 5%) 100%)"
    }}>
      {/* Extra top space to match original */}
      <div className="pt-32 lg:pt-44" />

      <div className="mx-auto max-w-7xl px-8 pb-24">
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Consumer Packaged Goods Recruitment
            </p>
            <h1 className="mb-6 text-5xl font-extrabold leading-[1.08] tracking-tight text-foreground md:text-6xl lg:text-[4.2rem]" style={{ fontStyle: "italic" }}>
              Recruit Smarter.
              <br />
              <span className="text-gradient-primary">Hire Better.</span>
            </h1>
            <p className="mb-8 max-w-lg text-base leading-relaxed text-dim md:text-lg">
              The CPG industry's premier talent partner. We connect leading brands
              with exceptional talent across all consumer goods categories.
            </p>
            <a
              href="https://calendly.com/recruitcpg/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
            >
              Schedule a Consultation
              <ArrowRight className="h-4 w-4" />
            </a>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="badge-tag inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium text-muted-foreground"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right – Stats grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 gap-5"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="stat-card flex flex-col items-center justify-center rounded-2xl px-6 py-10 text-center"
              >
                <span className="text-4xl font-extrabold text-primary md:text-5xl">
                  {stat.value}
                </span>
                <span className="mt-3 text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="h-16" style={{
        background: "linear-gradient(180deg, transparent 0%, hsl(200 40% 4%) 100%)"
      }} />

      {/* Scrolling stats ticker */}
      <div className="overflow-hidden border-t border-b border-border/30 py-5" style={{ background: "hsl(200 35% 5%)" }}>
        <div className="animate-scroll-left flex w-max gap-14">
          {[...stats, ...stats, ...stats, ...stats].map((stat, i) => (
            <div key={i} className="flex items-center gap-3 whitespace-nowrap">
              <span className="text-lg font-bold text-primary">{stat.value}</span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
