import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { blogPosts as staticPosts } from "@/data/blogPosts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  read_time: string;
  image: string;
  date: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("slug, title, excerpt, category, read_time, image, date")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (error || !data || data.length === 0) {
        setPosts(
          staticPosts.map((p) => ({
            slug: p.slug,
            title: p.title,
            excerpt: p.excerpt,
            category: p.category,
            read_time: p.readTime,
            image: p.image,
            date: p.date,
          }))
        );
      } else {
        setPosts(data);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-8">
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Our Blog
            </p>
            <h1 className="text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
              CPG Industry Insights
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground leading-relaxed">
              Expert perspectives on hiring, talent strategy, and industry trends in
              Consumer Packaged Goods.
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <p className="text-muted-foreground">Loading articles...</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <Link key={post.slug} to={`/blog/${post.slug}`}>
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="group cursor-pointer overflow-hidden rounded-2xl border border-border/60 bg-card transition-all hover:border-primary/40 h-full"
                  >
                    <div className="h-52 overflow-hidden bg-secondary">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                    <div className="p-7">
                      <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="badge-tag rounded-full px-3 py-1">
                          {post.category}
                        </span>
                        <span>{post.read_time}</span>
                      </div>
                      <h2 className="mb-2 text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                        {post.title}
                      </h2>
                      <p className="mb-5 text-sm text-muted-foreground leading-relaxed">
                        {post.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                        Read Article <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Blog;
