import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 lg:py-28 section-alt">
      <div className="mx-auto max-w-7xl px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[420px_1fr] lg:gap-14">
          {/* Left – Photo with overlays */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* 20+ Years badge */}
            <div className="stat-card absolute -top-4 -left-4 z-10 flex flex-col items-center rounded-xl px-5 py-3">
              <span className="text-3xl font-extrabold text-foreground">20+</span>
              <span className="text-xs text-muted-foreground">Years in CPG</span>
            </div>

            {/* Photo */}
            <div className="relative h-[500px] w-full overflow-hidden rounded-2xl border border-border/60 bg-card">
              <img
                src="/natalie-headshot.png"
                alt="Natalie Bollinger, Founder of Recruit CPG"
                className="h-full w-full object-cover object-top"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = '<div class="flex h-full w-full items-center justify-center bg-secondary"><span class="text-6xl font-extrabold text-primary/30">NB</span></div>';
                  }
                }}
              />
            </div>

            {/* Name label at bottom-right */}
            <div className="absolute -bottom-4 right-4 z-10 rounded-xl bg-primary px-6 py-3 text-primary-foreground">
              <p className="text-xs font-semibold uppercase tracking-wider opacity-80">
                Founder & CEO
              </p>
              <h3 className="text-lg font-bold">Natalie Bollinger</h3>
            </div>
          </motion.div>

          {/* Right – Story + Quote */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              About Recruit CPG
            </p>
            <h2 className="mb-6 text-3xl font-extrabold text-foreground md:text-4xl lg:text-[2.6rem] lg:leading-[1.15]">
              Built by CPG.<br />For CPG.
            </h2>
            <div className="space-y-4 text-sm leading-[1.8] text-muted-foreground md:text-base">
              <p>
                For Natalie Bollinger, CPG isn't just a career—it's a family legacy.
                She grew up in a CPG family, with her grandfather and father serving
                as operations leadership for a large dairy manufacturer.
                Her mother has worked for Tyson Foods HQ for decades, and her
                husband is an executive in the meat snacks industry.
              </p>
              <p>
                Armed with an MBA in HR Management from Louisiana State University
                and more than 20 years leading recruitment teams inside CPG
                organizations, Natalie saw a persistent problem across the industry:
                companies were being asked to choose between expensive search firms
                that didn't truly understand their business—or overwhelmed internal
                teams that lacked the time, tools, or reach to find the right talent.
              </p>
              <p className="font-semibold text-foreground">
                Recruit CPG was founded to close that gap.
              </p>
              <p>
                Having hired at every level within CPG—from plant-floor roles to executive
                leadership—Natalie understood that CPG hiring is different. It's fast-paced,
                operationally complex, and deeply tied to production schedules, margins,
                food safety, commercialization timelines, and growth targets. Generic
                recruiting models simply don't work in this environment.
              </p>
              <p>
                Recruit CPG was built as a better way to partner with CPG companies—one
                that blends deep industry expertise with modern, flexible recruiting
                solutions. We work as an extension of our clients' teams, aligning hiring
                strategies with real business needs, not just open requisitions.
              </p>
            </div>

            {/* Quote card */}
            <div className="mt-8 rounded-xl border border-border/60 bg-card p-6">
              <div className="flex gap-4">
                <span className="text-3xl leading-none text-primary">"</span>
                <div>
                  <p className="text-sm italic leading-relaxed text-foreground md:text-base">
                    We don't believe in one-size-fits-all recruiting. We believe in
                    smarter partnerships, better hiring outcomes, and long-term impact.
                  </p>
                  <p className="mt-3 text-sm font-bold text-primary" style={{ fontStyle: "italic" }}>
                    Recruit Smarter. Hire Better.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
