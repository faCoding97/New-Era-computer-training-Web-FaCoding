# Security note

The project specification explicitly pins `next@14.2.10`, and the ZIP retains that exact version.

Do not publish that version to production. The official Next.js security advisory published on 11 December 2025 instructs 14.x projects to upgrade to a patched 14.2.x release and states that there is no workaround for the affected React Server Components issues.

Before deployment, run:

```bash
npm install next@14.2.35
npm run build
```

Then review the current official Next.js security notices again before launch, because patched recommendations can change over time.
