# Build verification

Verified locally before packaging:

- `npm install`
- `npm run build`
- `npm run typecheck`
- Homepage returns HTTP 200.
- Dynamic course page `/courses/microsoft-excel` returns HTTP 200.
- Dynamic article page `/blog/why-computer-literacy-still-matters` returns HTTP 200.
- Course category filter displays Microsoft course cards and excludes unrelated course cards.
- Demo booking and enquiry API routes accept validated payloads before Supabase credentials are configured.
- `/admin` redirects to `/admin/login?setup=required` until Supabase credentials are configured.
- `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest` and `/manifest.json` are available.

Expected build notice:

- `components/site/footer.tsx` retains a plain `<img>` element because the requested Elix Code footer signature was preserved exactly. Next.js emits a non-blocking optimization warning for that mandated snippet.
