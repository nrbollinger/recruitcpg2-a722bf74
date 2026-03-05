

## Blog CMS Admin Panel — Implementation Plan

### 1. Database Setup

**Create `blog_posts` table:**
- `id` (uuid, PK), `slug` (text, unique), `title` (text), `excerpt` (text), `category` (text), `read_time` (text), `date` (text), `image` (text), `content` (text array), `published` (boolean, default false), `created_at` (timestamptz), `updated_at` (timestamptz), `author_id` (uuid, references auth.users)

**Create `user_roles` table** (per security guidelines):
- `id` (uuid, PK), `user_id` (uuid, references auth.users), `role` (app_role enum: admin, moderator, user)
- `has_role()` security definer function

**Create `blog-images` storage bucket** (public) for image uploads.

**RLS policies on `blog_posts`:**
- Public SELECT where `published = true`
- Authenticated INSERT/UPDATE/DELETE for users with admin role

**Seed existing 4 blog posts** from `blogPosts.ts` into the table.

### 2. Authentication

- **`/admin/login`** — Email/password login page (no signup form; admin account created manually via the backend)
- **Auth hook** (`useAuth.ts`) for session management

### 3. Admin Pages

- **`/admin`** — Dashboard listing all posts (drafts + published) in a table with edit/delete/publish toggle actions
- **`/admin/posts/new`** — Post editor form: title, slug (auto-generated), category, excerpt, read time, date, image upload, content blocks (textarea per paragraph, add/remove blocks, `## ` prefix for headings)
- **`/admin/posts/:id/edit`** — Same editor, pre-populated
- **`AdminLayout.tsx`** — Protected wrapper that checks auth + admin role, redirects to login if unauthorized

### 4. Frontend Updates

- **`BlogSection.tsx`** — Fetch published posts from DB instead of static file
- **`BlogPost.tsx`** — Fetch single post by slug from DB
- **`App.tsx`** — Add admin routes (`/admin/login`, `/admin`, `/admin/posts/new`, `/admin/posts/:id/edit`)

### Files to Create
- `src/pages/AdminLogin.tsx`
- `src/pages/AdminDashboard.tsx`
- `src/pages/AdminPostEditor.tsx`
- `src/components/AdminLayout.tsx`
- `src/hooks/useAuth.ts`

### Files to Modify
- `src/App.tsx` (add routes)
- `src/components/BlogSection.tsx` (fetch from DB)
- `src/pages/BlogPost.tsx` (fetch from DB)

