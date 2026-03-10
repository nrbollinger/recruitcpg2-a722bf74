import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";

const features = [
  { label: "C-Suite & VP Roles", exec: true, talent: false, rpo: true },
  { label: "Mid-Level & Specialist Roles", exec: false, talent: true, rpo: true },
  { label: "Volume / Bulk Hiring", exec: false, talent: true, rpo: true },
  { label: "Confidential Searches", exec: true, talent: false, rpo: true },
  { label: "Dedicated Recruiting Team", exec: false, talent: false, rpo: true },
  { label: "Employer Branding Support", exec: false, talent: false, rpo: true },
  { label: "Full-Cycle Management", exec: false, talent: false, rpo: true },
  { label: "Pre-Vetted Candidates", exec: true, talent: true, rpo: true },
  { label: "Quick Turnaround", exec: false, talent: true, rpo: true },
  { label: "Cost Optimization", exec: false, talent: false, rpo: true },
  { label: "Onboarding Assistance", exec: false, talent: false, rpo: true },
];

const plans = [
  {
    name: "Executive Search",
    tagline: "For leadership hires",
    key: "exec" as const,
    highlight: false,
  },
  {
    name: "Talent Acquisition",
    tagline: "For scaling teams",
    key: "talent" as const,
    highlight: false,
  },
  {
    name: "RPO Solutions",
    tagline: "Full recruitment outsourcing",
    key: "rpo" as const,
    highlight: true,
  },
];

const Cell = ({ included }: { included: boolean }) =>
  included ? (
    <Check className="mx-auto h-5 w-5 text-primary" />
  ) : (
    <Minus className="mx-auto h-5 w-5 text-muted-foreground/40" />
  );

const ServicesComparison = () => {
  return (
    <section className="py-24 lg:py-32" style={{ background: "hsl(210 30% 6%)" }}>
      <div className="mx-auto max-w-5xl px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Compare Services
          </p>
          <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
            Find the Right Fit
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            See how our three service offerings stack up so you can choose the
            solution that matches your hiring needs.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="overflow-x-auto rounded-2xl border border-border/60 bg-card"
        >
          <table className="w-full min-w-[560px] text-sm">
            {/* Header */}
            <thead>
              <tr className="border-b border-border/40">
                <th className="px-6 py-5 text-left font-medium text-muted-foreground">
                  Feature
                </th>
                {plans.map((plan) => (
                  <th
                    key={plan.key}
                    className={`px-4 py-5 text-center ${
                      plan.highlight ? "bg-primary/10" : ""
                    }`}
                  >
                    <span className="block text-base font-bold text-foreground">
                      {plan.name}
                    </span>
                    <span className="mt-1 block text-xs font-normal text-muted-foreground">
                      {plan.tagline}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {features.map((feature, i) => (
                <tr
                  key={feature.label}
                  className={`border-b border-border/20 last:border-0 ${
                    i % 2 === 0 ? "bg-card" : "bg-secondary/30"
                  }`}
                >
                  <td className="px-6 py-4 font-medium text-foreground">
                    {feature.label}
                  </td>
                  {plans.map((plan) => (
                    <td
                      key={plan.key}
                      className={`px-4 py-4 text-center ${
                        plan.highlight ? "bg-primary/5" : ""
                      }`}
                    >
                      <Cell included={feature[plan.key]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* CTA row */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {plans.map((plan) => (
            <a
              key={plan.key}
              href="https://calendly.com/recruitcpg/30min"
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-xl px-6 py-4 text-center text-sm font-semibold transition-all ${
                plan.highlight
                  ? "bg-primary text-primary-foreground hover:brightness-110"
                  : "border border-border/60 bg-card text-foreground hover:border-primary/40"
              }`}
            >
              Get Started with {plan.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesComparison;
