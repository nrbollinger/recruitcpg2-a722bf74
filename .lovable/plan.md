

## Plan: Replace Block Editor with Rich Text Visual Editor

### Summary
Replace the current multi-block plain text editor with a visual rich text editor (WYSIWYG) that supports all HTML formatting. Content will be stored as a single HTML string. Pasting from Google Docs will preserve headings, bold, italic, lists, images, etc.

### Editor Library
**Tiptap** - a headless, extensible rich text editor built on ProseMirror. It handles Google Docs paste formatting out of the box and is the most popular React-compatible WYSIWYG editor.

NPM packages needed: `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-image`, `@tiptap/extension-underline`, `@tiptap/pm`

### Database Change
Migrate the `content` column from `text[]` (array of strings) to `text` (single HTML string). A migration will:
1. Add a new `content_html` column (`text`, default `''`)
2. Populate it by joining existing `content` array blocks with `<p>` tags (auto-merge)
3. Drop the old `content` column and rename `content_html` to `content`

### Code Changes

**1. New component: `src/components/RichTextEditor.tsx`**
- Tiptap editor instance with a toolbar (bold, italic, underline, h1, h2, h3, bullet list, ordered list, image insert, blockquote)
- Accepts `value` (HTML string) and `onChange` callback
- Styled to match the existing admin UI

**2. Update `src/pages/AdminPostEditor.tsx`**
- Remove multi-block state/logic (`content: string[]`, `addContentBlock`, `removeContentBlock`, etc.)
- Replace with single `content: string` state bound to the RichTextEditor
- Remove GripVertical, Plus, Trash2 block controls

**3. Update `src/pages/BlogPost.tsx`**
- Replace the block-mapping render logic with a single `dangerouslySetInnerHTML` for the HTML content
- Apply prose-style CSS classes for proper formatting of h1-h3, bold, italic, lists, images, etc.
- Add DOMPurify sanitization for security

**4. Update `src/integrations/supabase/types.ts`** - will auto-update after migration

**5. Update `src/data/blogPosts.ts`** - convert static content arrays to HTML strings for consistency

### Toolbar Features
Bold, Italic, Underline, Strikethrough, H1, H2, H3, Bullet List, Ordered List, Blockquote, Image (URL insert), Link, Undo/Redo

