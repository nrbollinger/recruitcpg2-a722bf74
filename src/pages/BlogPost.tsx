import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { blogPosts as staticPosts } from "@/data/blogPosts";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PostData {
  title: string;
  category: string;
  read_time: string;
  date: string;
  image: string;
  content: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("title, category, read_time, date, image, content")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();

      if (data) {
        setPost(data);
      } else {
        const staticPost = staticPosts.find((p) => p.slug === slug);
        if (staticPost) {
          setPost({
            title: staticPost.title,
            category: staticPost.category,
            read_time: staticPost.readTime,
            date: staticPost.date,
            image: staticPost.image,
            content: staticPost.content,
          });
        } else {
          setNotFound(true);
        }
      }
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-40">
          <p className="text-muted-foreground">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound || !post) {
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

  const sanitizedContent = DOMPurify.sanitize(post.content, {
    ADD_TAGS: ["img"],
    ADD_ATTR: ["src", "alt", "href", "target", "rel"],
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <article className="pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            to="/blog"
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
              <span>{post.read_time}</span>
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

            <div
              className="prose prose-sm md:prose-base max-w-none text-muted-foreground [&_h1]:text-2xl [&_h1]:md:text-3xl [&_h1]:font-extrabold [&_h1]:text-foreground [&_h1]:mt-10 [&_h1]:mb-4 [&_h2]:text-xl [&_h2]:md:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:md:text-xl [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-base [&_p]:leading-relaxed [&_p]:mb-4 [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_li]:mb-1 [&_blockquote]:border-l-4 [&_blockquote]:border-primary/30 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-6 [&_img]:rounded-xl [&_img]:my-6 [&_img]:max-w-full [&_a]:text-primary [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
          </motion.div>

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
