

# Update Navbar Blog Link

The Navbar currently uses anchor links (`#blog`) which scroll to the blog section on the homepage. The "Blog" link needs to navigate to the `/blog` page instead.

## Changes

**`src/components/Navbar.tsx`**
- Import `Link` from `react-router-dom`
- Change the "Blog" nav link `href` from `#blog` to `/blog`
- Render it as a React Router `<Link>` so it performs client-side navigation instead of an anchor scroll

