import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, LogOut } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  published: boolean;
  created_at: string;
}

const AdminDashboard = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("id, slug, title, category, date, published, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const togglePublish = async (id: string, published: boolean) => {
    const { error } = await supabase
      .from("blog_posts")
      .update({ published: !published })
      .eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, published: !published } : p)));
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold text-foreground">Blog Posts</h1>
          <div className="flex items-center gap-3">
            <Link to="/admin/posts/new">
              <Button size="sm">
                <Plus className="mr-1 h-4 w-4" /> New Post
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="mr-1 h-4 w-4" /> Sign Out
            </Button>
          </div>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : posts.length === 0 ? (
          <p className="text-muted-foreground">No posts yet.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium text-foreground">{post.title}</TableCell>
                  <TableCell className="text-muted-foreground">{post.category}</TableCell>
                  <TableCell className="text-muted-foreground">{post.date}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => togglePublish(post.id, post.published)}
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        post.published
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link to={`/admin/posts/${post.id}/edit`}>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon" onClick={() => deletePost(post.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
