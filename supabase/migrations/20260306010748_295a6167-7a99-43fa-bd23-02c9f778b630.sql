
-- Add new content_html column
ALTER TABLE public.blog_posts ADD COLUMN content_html text NOT NULL DEFAULT '';

-- Migrate existing array content to HTML by wrapping each element in <p> tags
-- Handle headings (## prefix) as <h2> tags
UPDATE public.blog_posts
SET content_html = (
  SELECT string_agg(
    CASE
      WHEN elem LIKE '## %' THEN '<h2>' || substr(elem, 4) || '</h2>'
      WHEN elem LIKE '**%' AND elem LIKE '%:**%' THEN '<p>' || elem || '</p>'
      ELSE '<p>' || elem || '</p>'
    END,
    E'\n'
  )
  FROM unnest(content) AS elem
);

-- Drop old content column and rename
ALTER TABLE public.blog_posts DROP COLUMN content;
ALTER TABLE public.blog_posts RENAME COLUMN content_html TO content;
