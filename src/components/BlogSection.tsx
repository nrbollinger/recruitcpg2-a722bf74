import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { blogPosts as staticPosts } from "@/data/blogPosts";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  read_time: string;
  image: string;
}

const BlogSection = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("slug, title, excerpt, category, read_time, image")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(4);

      if (error || !data || data.length === 0) {
        // Fallback to static posts
        setPosts(
          staticPosts.map((p) => ({
            slug: p.slug,
            title: p.title,
            excerpt: p.excerpt,
            category: p.category,
            read_time: p.readTime,
            image: p.image,
          }))
        );
      } else {
        setPosts(data);
      }
    };
    fetchPosts();
  }, []);

  return (
    <section id="blog" className="py-24 lg:py-32" style={{ background: "hsl(210 28% 8%)" }}>
      <div className="mx-auto max-w-7xl px-8">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Our Blog
          </p>
          <h2 className="text-3xl font-extrabold text-foreground md:text-4xl lg:text-[2.6rem]">
            CPG Industry Insights
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-dim leading-relaxed">
            Expert perspectives on hiring, talent strategy, and industry trends in
            Consumer Packaged Goods.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post, i) => (
            <Link key={post.slug} to={`/blog/${post.slug}`}>
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group cursor-pointer overflow-hidden rounded-2xl border border-border/60 bg-card transition-all hover:border-primary/40 h-full"
              >
                <div className="h-52 overflow-hidden bg-secondary">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
                <div className="p-7">
                  <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="badge-tag rounded-full px-3 py-1">{post.category}</span>
                    <span>{post.read_time}</span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="mb-5 text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Read Article <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-xl border border-border/60 px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/60 hover:text-primary"
          >
            View All Articles
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
