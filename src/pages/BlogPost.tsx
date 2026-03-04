import { useParams, Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-40 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
          <Link
            to="/#blog"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <article className="pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            to="/#blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="badge-tag rounded-full px-3 py-1">{post.category}</span>
              <span>{post.readTime}</span>
              <span>•</span>
              <span>{post.date}</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight mb-8">
              {post.title}
            </h1>

            <div className="rounded-2xl overflow-hidden mb-12 bg-secondary">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-auto object-cover max-h-[480px]"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>

            <div className="prose-custom space-y-6">
              {post.content.map((block, i) => {
                if (block.startsWith("## ")) {
                  return (
                    <h2
                      key={i}
                      className="text-xl md:text-2xl font-bold text-foreground mt-10 mb-4"
                    >
                      {block.replace("## ", "")}
                    </h2>
                  );
                }
                if (block.startsWith("**") && block.includes(":**")) {
                  const [boldPart, ...rest] = block.split(":**");
                  return (
                    <p key={i} className="text-base text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">
                        {boldPart.replace(/\*\*/g, "")}:
                      </strong>
                      {rest.join(":**")}
                    </p>
                  );
                }
                return (
                  <p key={i} className="text-base text-muted-foreground leading-relaxed">
                    {block}
                  </p>
                );
              })}
            </div>
          </motion.div>

          {/* Blog CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 rounded-2xl border border-primary/20 px-8 py-12 text-center md:px-12"
            style={{
              background: "linear-gradient(135deg, hsl(160 50% 42% / 0.08) 0%, hsl(210 25% 12%) 50%, hsl(160 50% 42% / 0.05) 100%)",
            }}
          >
            <h3 className="text-2xl font-extrabold text-foreground mb-3">
              Need Help Hiring Top CPG Talent?
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto mb-6">
              Let's discuss how Recruit CPG can help you find the right people for your team — faster and smarter.
            </p>
            <a
              href="https://calendly.com/recruitcpg/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
            >
              Schedule a Consultation
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>

          <div className="mt-10 pt-8 border-t border-border/40">
            <Link
              to="/#blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" /> Back to All Articles
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
};

export default BlogPost;
