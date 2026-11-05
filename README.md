# Ammar Ali Khan — AI Developer Portfolio

Personal portfolio for **Ammar Ali Khan**, AI Developer, AI Agent Developer and AI Automation Engineer.

**Live site:** https://ammar197khan.github.io/ammar-portfolio/

Plain HTML, CSS and JavaScript. No framework, no build step, no backend. GitHub Pages serves the files exactly as they are in this repository.

## Project structure

```
index.html                 Page layout and fixed text (hero, about, services, contact)
404.html                   "Page not found" page
assets/
  css/style.css            All styles (colours are variables at the top)
  js/data.js               ← Editable content: projects, skills, experience, education, contact settings
  js/main.js               Navigation, filters, animations, contact form
  img/favicon.svg          Browser tab icon
  img/og-image.png         Preview image shown when the link is shared (1200×630)
  img/projects/            Project thumbnails
  cv/Ammar_Ali_Khan_CV.pdf The file behind "Download CV"
tools/                     Sources for the share preview image and concept thumbnails (not used by the live site)
robots.txt, sitemap.xml    Search-engine files
.nojekyll                  Tells GitHub Pages to serve the files as-is
```

## Updating content

Most changes happen in **`assets/js/data.js`**. Each section in that file has comments explaining the fields.

### Projects

The eight projects in `data.js` are **concept placeholders**. Each one shows a "Concept" tag and "Case study coming soon". To add a real project:

1. Add a screenshot to `assets/img/projects/` (16:10 ratio works best, e.g. 1280×800, saved as WebP or JPG under ~200 KB).
2. Edit or add an entry in `projects`:

```js
{
  title: "My Real Project",
  category: "ai-agents",          // ai-apps | ai-agents | ai-automation | web | mobile
  summary: "One or two sentences on the problem and the result.",
  tech: ["Python", "OpenAI API", "n8n"],
  image: "assets/img/projects/my-real-project.webp",
  demo: "https://example.com",    // "" hides the Live demo button
  repo: "https://github.com/ammar197khan/my-real-project", // "" hides the Source code button
  concept: false
}
```

Delete the concept entries you no longer need. The filter counts update on their own. To add a new filter, add `{ id, label }` to `filters` and use that `id` as a project's `category`.

### Skills, experience and education

- **Skills:** edit the `skills` groups. Rename, reorder, add or remove items freely.
- **Experience:** one entry per role, newest first: `role`, `company`, `period`, `location` and a list of `points`.
- **Education:** one card per entry (degree, certification, languages). Leave `period` or `details` as `""` to hide them.

### Text in the page

The hero, About, Services and Contact text lives in `index.html`. Search for the sentence you want to change and edit it in place.

If your email, LinkedIn or GitHub address changes, update it in **both** places:

- `config` at the top of `assets/js/data.js`
- `index.html` (search for the old address; it appears in the hero, contact section and the metadata in `<head>`)

### Colours and fonts

Change the variables at the top of `assets/css/style.css`. `--accent` is the amber highlight colour.

## Replacing the CV

The "Download CV" button serves `assets/cv/Ammar_Ali_Khan_CV.pdf`. To update it, save your new CV as a PDF, copy it over that file **keeping the same file name**, then commit and push. Visitors download it as `Ammar_Ali_Khan_CV.pdf`.

## Replacing images

- **Project thumbnails:** drop a new image into `assets/img/projects/` and point the project's `image` field at it. The concept SVGs come from `tools/generate-thumbnails.js` (`node tools/generate-thumbnails.js`).
- **Profile photo:** the hero portrait is `assets/img/ammar-ali-khan.webp` with `ammar-ali-khan.jpg` as a fallback. Replace both with a new photo cropped to 4:5 portrait (e.g. 656×820), keeping the same file names. If the size changes, update the `width`/`height` on the `<img>` in `index.html`.
- **Share preview image:** edit `tools/og.html` and re-generate `assets/img/og-image.png`:

```powershell
& "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless=new --hide-scrollbars `
  --window-size=1200,630 --virtual-time-budget=4000 `
  --screenshot="$PWD\assets\img\og-image.png" "file:///$($PWD -replace '\\','/')/tools/og.html"
```

## Contact form

Static hosting has no server, so the form works in one of two modes:

1. **Default (no setup):** when a visitor presses "Send message", their email app opens with the name, subject and message already filled in, addressed to `config.email`.
2. **Direct delivery (optional, free):** messages arrive in your inbox without the visitor's email app:
   1. Create a free account at [formspree.io](https://formspree.io) and create a form that sends to your email.
   2. Copy the form endpoint (looks like `https://formspree.io/f/abcdwxyz`).
   3. Paste it into `config.formEndpoint` in `assets/js/data.js`, then commit and push.
   4. Send a test message from the live site and confirm the form in the Formspree email.

The form includes a hidden spam-trap field (`_gotcha`), which Formspree understands.

## Previewing locally

Opening `index.html` directly works. To preview the site exactly as GitHub Pages serves it, run a local server from this folder:

```bash
npx serve .          # or: python -m http.server 8000
```

## Deploying updates

GitHub Pages publishes the `main` branch automatically. After editing:

```bash
git add .
git commit -m "Update projects"
git push
```

The live site updates within a minute or two. Progress shows under the repository's **Actions** tab ("pages build and deployment"). If an update doesn't appear, hard-refresh the browser (Ctrl+F5).

Pages settings: **Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)`**.

All paths in the site are relative, so it also works if you later move it to a custom domain or to `ammar197khan.github.io` (a repository named `ammar197khan.github.io`). In that case, update the absolute URLs in the `<head>` of `index.html`, `robots.txt`, `sitemap.xml` and the `/ammar-portfolio/` paths in `404.html`.
