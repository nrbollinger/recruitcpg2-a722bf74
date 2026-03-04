

## Plan: Add Contact Form to Footer

### Overview
Add a "Get in Touch" contact form section to the footer, replacing or augmenting the Company column. Submissions will be stored in a database table and can later be forwarded to contact@recruitcpg.com.

### Database
- Create a `contact_submissions` table with columns: `id`, `name`, `email`, `message`, `created_at`
- Enable RLS with a policy allowing anonymous inserts (public-facing form, no auth required)
- No select/update/delete policies for anon users

### Footer Changes
- Restructure the footer grid to 5 columns on large screens (or replace the Company column with the contact form)
- Add a "Get in Touch" column with:
  - Name input
  - Email input  
  - Message textarea
  - Submit button
- Style inputs to match the dark footer background (dark bg, light text, subtle borders)
- Use zod validation for name, email, message
- Show success toast on submission, error toast on failure
- Disable button while submitting

### Files Modified
1. **Database migration** — create `contact_submissions` table with insert-only RLS
2. **`src/components/Footer.tsx`** — add the contact form as a new grid column with inline state management

