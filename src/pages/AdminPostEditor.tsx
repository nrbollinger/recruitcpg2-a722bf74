import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import RichTextEditor from "@/components/RichTextEditor";

const AdminPostEditor = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { user } = useAuth();

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEditing);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [readTime, setReadTime] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (isEditing) {
      supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .single()
        .then(({ data, error }) => {
          if (error || !data) {
            toast({ title: "Post not found", variant: "destructive" });
            navigate("/admin");
            return;
          }
          setTitle(data.title);
          setSlug(data.slug);
          setCategory(data.category);
          setExcerpt(data.excerpt);
          setReadTime(data.read_time);
          setDate(data.date);
          setImage(data.image);
          setContent(data.content || "");
          setPublished(data.published);
          setLoading(false);
        });
    }
  }, [id, isEditing, navigate]);

  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEditing) setSlug(generateSlug(val));
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return image || null;
    const ext = imageFile.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("blog-images").upload(fileName, imageFile);
    if (error) {
      toast({ title: "Image upload failed", description: error.message, variant: "destructive" });
      return null;
    }
    const { data: urlData } = supabase.storage.from("blog-images").getPublicUrl(fileName);
    return urlData.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug) {
      toast({ title: "Title and slug are required", variant: "destructive" });
      return;
    }
    setSaving(true);

    const imageUrl = await uploadImage();
    if (imageFile && !imageUrl) {
      setSaving(false);
      return;
    }

    const postData = {
      title,
      slug,
      category,
      excerpt,
      read_time: readTime,
      date,
      image: imageUrl || "",
      content,
      published,
      author_id: user?.id,
    };

    if (isEditing) {
      const { error } = await supabase.from("blog_posts").update(postData).eq("id", id);
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Post updated!" });
        navigate("/admin");
      }
    } else {
      const { error } = await supabase.from("blog_posts").insert(postData);
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Post created!" });
        navigate("/admin");
      }
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 md:p-10">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/admin"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>

        <h1 className="mb-8 text-2xl font-extrabold text-foreground">
          {isEditing ? "Edit Post" : "New Post"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={title} onChange={(e) => handleTitleChange(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>Slug</Label>
              <Input value={slug} onChange={(e) => setSlug(e.target.value)} required />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Category</Label>
              <Input value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Read Time</Label>
              <Input value={readTime} onChange={(e) => setReadTime(e.target.value)} placeholder="3 min read" />
            </div>
            <div className="space-y-2">
              <Label>Date</Label>
              <Input value={date} onChange={(e) => setDate(e.target.value)} placeholder="March 5, 2026" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Excerpt</Label>
            <Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} />
          </div>

          <div className="space-y-2">
            <Label>Image</Label>
            <div className="flex items-center gap-4">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
              {image && !imageFile && (
                <img src={image} alt="Current" className="h-12 w-12 rounded object-cover" />
              )}
            </div>
            <Input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Or paste image URL"
              className="mt-2"
            />
          </div>

          <div className="space-y-2">
            <Label>Content</Label>
            <RichTextEditor value={content} onChange={setContent} />
          </div>

          <div className="flex items-center justify-between border-t border-border pt-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium text-foreground">Published</span>
            </label>

            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : isEditing ? "Update Post" : "Create Post"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPostEditor;
