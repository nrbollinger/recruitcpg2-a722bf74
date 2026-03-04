import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const CtaSection = () => {
  return (
    <section className="py-24 lg:py-32" style={{ background: "hsl(210 30% 6%)" }}>
      <div className="mx-auto max-w-7xl px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-primary/20 px-8 py-16 text-center md:px-16 md:py-20"
          style={{
            background: "linear-gradient(135deg, hsl(160 50% 42% / 0.08) 0%, hsl(210 25% 12%) 50%, hsl(160 50% 42% / 0.05) 100%)",
            boxShadow: "0 0 60px -10px hsl(160 50% 42% / 0.15), 0 0 120px -20px hsl(160 50% 42% / 0.08)",
          }}
        >
          {/* Decorative glow */}
          <div className="absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full opacity-30 blur-3xl" style={{ background: "hsl(160 50% 42% / 0.3)" }} />
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Get Started Today
          </p>
          <h2 className="mb-6 text-3xl font-extrabold text-foreground md:text-4xl lg:text-[2.6rem]">
            Ready to Build Your CPG Dream Team?
          </h2>
          <p className="mb-10 text-base text-dim leading-relaxed">
            Let's discuss how we can help you attract, hire, and retain top
            Consumer Packaged Goods talent.
          </p>
          <a
            href="https://calendly.com/recruitcpg/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
          >
            Schedule a Consultation
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
