

## Problem Analysis

**Issue 1: "Lovable" appearing in Google search results**
The favicon (`public/favicon.svg`) is the default Lovable purple lightning bolt. Google uses the favicon to identify the site, which is why "Lovable" appears as the site name. Additionally, the "Edit with Lovable" badge is visible on the published site (badge visibility is currently `false` for hiding = badge is shown).

**Issue 2: Other pages not being indexed**
The prerendering and SEO setup looks correct -- sitemap.xml includes all public routes, each page gets proper meta tags. The likely reasons other pages don't appear in Google yet:
- The site is relatively new; Google takes time to crawl and index subpages
- There's no `<link rel="icon">` tag in `index.html`, so browsers/crawlers default to the Lovable favicon.svg
- The `_redirects` and `_headers` files have no effect on Lovable hosting (per platform docs), so any redirect rules there are ignored

## Plan

### 1. Replace the Lovable favicon with Shakti Photon's logo
- Download the company logo from Supabase storage (the logo file referenced in `mediaPaths.ts`)
- Create a proper favicon (PNG format) and place it in `public/`
- Add `<link rel="icon">` to `index.html` pointing to the new favicon
- Delete the old `public/favicon.svg`

### 2. Hide the "Edit with Lovable" badge
- Use `publish_settings--set_badge_visibility` to hide the badge on the published site

### 3. Improve internal linking for better indexation
- Ensure the prerendered HTML for the homepage includes visible links to all subpages (solutions, electrolyzers, fuel cells, etc.) so Google can discover them
- Add a `<link rel="icon">` in the `getSeoHeadHtml` output so prerendered pages also include the favicon reference

### 4. Submit to Google Search Console (recommendation)
- The site already has `googleb84ddcd403c448a8.html` for verification
- After these fixes, you should go to Google Search Console and request indexing for each page URL manually to speed up the process

---

**Technical details**

| File | Change |
|------|--------|
| `public/favicon.svg` | Delete (Lovable icon) |
| `public/favicon.png` | Add company logo as favicon |
| `index.html` | Add `<link rel="icon" href="/favicon.png" type="image/png">` |
| `src/seo/siteSeo.ts` | Add favicon link to `getSeoHeadHtml()` output |
| Badge setting | Set `hide_badge: true` |

