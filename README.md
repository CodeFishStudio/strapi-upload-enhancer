# strapi-upload-enhancer

Allows middleware to intercept media uploads to Strapi. On image upload, generates a blur placeholder and dominant color. On "replace media", fetches the image from S3 when no local temp file is available.

## Local development

**Terminal 1 — this repo**

```bash
npm run watch:link
```

**Terminal 2 — Strapi project**

```
npx yalc add strapi-upload-enhancer && npx yalc link strapi-upload-enhancer && npm install

npm run develop
```

Edit `server/src/`. Changes rebuild to `dist/` and push via yalc automatically.
