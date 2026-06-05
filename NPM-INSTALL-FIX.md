# npm install fix

This copy uses the public npm registry only.

Run from the project root:

```bash
npm cache verify
npm ci --no-audit --no-fund
npm run dev
```

If you already attempted an install with an earlier archive, remove the old dependencies first.

Windows PowerShell:

```powershell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue
npm cache verify
npm install --registry=https://registry.npmjs.org/ --no-audit --no-fund
npm run dev
```

Keep the `package-lock.json` included in this corrected archive unless troubleshooting an existing partially-installed copy.
