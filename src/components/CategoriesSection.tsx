import { motion } from "framer-motion";
import { UtensilsCrossed, GlassWater, Sparkles, Home, PawPrint, HeartPulse } from "lucide-react";

const categories = [
  { icon: UtensilsCrossed, title: "Food & Snacks", desc: "Cereal, snacks, frozen foods, dairy, and packaged meals." },
  { icon: GlassWater, title: "Beverages", desc: "Soft drinks, juices, alcoholic beverages, and functional drinks." },
  { icon: Sparkles, title: "Personal Care", desc: "Skincare, haircare, cosmetics, and grooming products." },
  { icon: Home, title: "Household", desc: "Cleaning supplies, paper goods, and home care essentials." },
  { icon: PawPrint, title: "Pet Care", desc: "Pet food, treats, and care products for all companions." },
  { icon: HeartPulse, title: "Health & Wellness", desc: "OTC medicines, vitamins, supplements, and wellness products." },
];

const CategoriesSection = () => {
  return (
    <section id="categories" className="py-24 lg:py-32 section-alt">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Our Expertise
          </p>
          <h2 className="text-3xl font-extrabold text-foreground md:text-4xl lg:text-[2.6rem]">
            CPG Categories We Serve
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-dim leading-relaxed">
            Deep expertise across every Consumer Packaged Goods vertical. We understand
            your industry because we specialize exclusively in CPG.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group rounded-2xl border border-border/60 bg-card p-7 transition-all hover:border-primary/40"
            >
              <cat.icon className="mb-4 h-8 w-8 text-primary" />
              <h3 className="mb-2 text-lg font-bold text-foreground">{cat.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{cat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
