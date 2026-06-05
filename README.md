# New Era Computer Training Centre

Enterprise-ready hybrid CMS platform for a professional computer training centre and skills development provider in Port Elizabeth (Gqeberha), Eastern Cape, South Africa.

## Included now

- Public training-centre website: home, about, courses, corporate training, blog and contact pages.
- Dynamic course pages and dynamic blog pages.
- Supabase-backed CMS data layer with a local demo fallback for first-run review.
- Course booking and contact enquiry route handlers with server-side Zod validation.
- Protected Supabase Auth admin panel.
- CMS screens for courses, categories, bookings, articles, media, testimonials, enquiries, SEO and settings.
- Supabase Storage media library.
- Row Level Security policies.
- Generated metadata, structured data, `robots.txt`, `sitemap.xml` and web manifest.
- Future LMS schema: students, instructors, modules, lessons, enrollments, certificates and quizzes.

## Important first-run behaviour

The public website intentionally loads curated demo content from `data/site.json` when Supabase environment variables are absent. This lets you run and review the design immediately. Once Supabase credentials are configured, public content is queried from PostgreSQL. Public components do not hardcode CMS content.

Booking and enquiry forms return a demo success response until Supabase is configured. In production, submissions are stored in PostgreSQL.

## Requirements

- Node.js 18.17+ or Node.js 20+
- npm
- A Supabase project for production CMS, Auth, PostgreSQL and Storage

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

The exact requested package versions are pinned in `package.json`, including:

```json
"next": "14.2.10",
"eslint": "8.57.0",
"eslint-config-next": "14.2.10"
```

> Security note: the requested `next@14.2.10` version is retained exactly for specification compliance. It is no longer suitable for a public production deployment. Before launch, upgrade the Next.js 14 release line to a patched version and rebuild. See the official Next.js security advisory referenced in `SECURITY.md`.

## Folder structure

```text
app/                         Next.js App Router pages, APIs and metadata files
  admin/                     protected CMS and login
  api/bookings/              validated booking submission
  api/enquiries/             validated contact enquiry submission
  blog/[slug]/               dynamic article pages
  courses/[slug]/            dynamic course pages
components/                  public, form and admin UI components
lib/                         data layer, Supabase clients, validation and helpers
data/site.json               local demo fallback and content reference
public/                      institutional placeholders and logos
supabase/schema.sql          complete schema, RLS and Storage policies
supabase/seed.sql            starter CMS records
```

## Supabase setup

1. Create a Supabase project.
2. Open Supabase SQL Editor.
3. Run `supabase/schema.sql`.
4. Run `supabase/seed.sql`.
5. Copy `.env.example` to `.env.local` and set:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-ANON-KEY
```

6. Restart `npm run dev`.

### Create the first admin login

1. In Supabase Dashboard, open **Authentication → Users**.
2. Add a user with the admin email and password.
3. Run this in SQL Editor, replacing the email:

```sql
insert into public.admin_users(user_id)
select id from auth.users where email = 'YOUR-ADMIN-EMAIL';
```

4. Open `/admin/login` and sign in.

## Database and security model

`supabase/schema.sql` creates CMS and future LMS tables, then enables RLS. Public visitors can:

- read published public content;
- insert booking requests;
- insert contact enquiries;
- read public media objects.

Only users listed in `public.admin_users` can manage CMS data or upload, update and delete Storage objects.

Keep the Supabase service-role key out of the browser. This starter does not require it.

## Course management

Open `/admin/courses` after login. The admin panel supports the common create, feature and delete workflow. The database already supports extended fields such as learning outcomes, requirements, attendance guidance, benefits, FAQ, featured image, Open Graph image and SEO metadata. These can be edited immediately in Supabase Table Editor and can later be exposed through a richer field-array editor without a schema change.

## Blog management

Open `/admin/blog`. Create draft or published articles. Each article table row supports excerpt, full content, featured image, tags, SEO title, SEO description and Open Graph image.

## Media library

Open `/admin/media`. Files upload to the public Supabase Storage bucket named `media`, with admin-only write policies. Public media reads remain available for website images and brochures.

For large brochures or videos, consider resumable upload support in a future iteration.

## SEO

- Global metadata: `/admin/settings`
- SEO guidance: `/admin/seo`
- Dynamic course metadata: `app/courses/[slug]/page.tsx`
- Dynamic article metadata: `app/blog/[slug]/page.tsx`
- Structured data: LocalBusiness, Course and Article JSON-LD
- Discovery routes: `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`

Before production deployment, replace placeholder phone and email details through Site Settings and verify the exact public domain in `NEXT_PUBLIC_SITE_URL`.

## Deployment

Recommended deployment flow:

1. Push this project to a private Git repository.
2. Import it into Vercel or deploy to any Node-compatible platform.
3. Add the environment variables in the hosting dashboard.
4. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS domain.
5. Confirm Supabase Auth redirect URLs include the production domain.
6. Run `npm run build` before release.

## Future LMS expansion

The following tables already exist in the production schema:

- `students`
- `instructors`
- `modules`
- `lessons`
- `enrollments`
- `certificates`
- `quizzes`

A future student portal can be added as a separate protected route group without rebuilding the public CMS. The recommended next phase is learner accounts, enrolment administration, module progression and certificate issuance.

## Production checklist

- Replace placeholder phone, email, logo and social URLs.
- Add all real course details, images and FAQs.
- Confirm admin user access.
- Submit a test booking and enquiry.
- Verify Storage upload policies.
- Check sitemap URLs after setting the production domain.
- Review colour contrast, keyboard navigation and Lighthouse reports after real media content is loaded.

## Troubleshooting a stalled npm install

This archive includes a public-registry `.npmrc` file. For a clean deterministic installation, run:

```bash
npm cache verify
npm ci --no-audit --no-fund
```

If an installation from an older project archive was interrupted, delete its `node_modules` directory before using this corrected copy.
