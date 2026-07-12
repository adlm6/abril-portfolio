# Your Portfolio Site

A 5-page personal portfolio: Home, About, Projects, Photography, Contact.
Plain HTML/CSS/JS — no build step, no framework — so it hosts for free on
GitHub Pages with zero configuration.

```
portfolio/
├── index.html          Home / landing page
├── about.html
├── projects.html
├── contact.html
├── photography.html
├── css/style.css        All styling + color/font variables
├── js/script.js          Nav toggle, form handling, lightbox, filters
└── assets/
    ├── img/               headshot.jpg, about.jpg go here
    ├── photography/       photo1.jpg, photo2.jpg... go here
    └── resume.pdf          (add your resume here)
```

## 1. Personalize the text

Every editable spot is marked with an `<!-- EDIT: ... -->` comment in the
HTML. Open each file and search for `EDIT` to find them fast. The main ones:

- **index.html** — your name/logo, headline, one-sentence bio, badge labels
- **about.html** — full bio (2–3 paragraphs), skills/tags, coursework, internship timeline
- **projects.html** — 3 project cards: title, description, tech tags, Live Demo + GitHub links
- **contact.html** — email, LinkedIn, GitHub links
- **photography.html** — captions and categories for each photo
- Every page's `<footer>` — swap the GitHub/LinkedIn/email links
- Every page's `<title>` and `<meta name="description">` in the `<head>`

To change the site name shown in every nav bar, search-and-replace
`Jordan Lee` and `Jordan` across all 5 HTML files with your name.

## 2. Add your own images

Nothing breaks if you skip this — placeholder images show up automatically
(via each `<img>`'s `onerror` fallback) until you add real files.

1. **Headshot:** save as `assets/img/headshot.jpg` (used on the home page)
2. **About photo:** save as `assets/img/about.jpg`
3. **Resume:** save as `assets/resume.pdf` (linked from the nav's "Resume" button)
4. **Photography page:** drop images into `assets/photography/` as
   `photo1.jpg`, `photo2.jpg`, etc. To add more than 6 photos, copy an
   existing `<div class="photo-item">` block in `photography.html` and
   update its `src`, `alt`, `data-category`, and caption text.

Square-ish images work best for the headshot (it's cropped into a blob
shape); portrait orientation works best for the About photo.

## 3. Wire up the contact form (optional but recommended)

Right now the form validates fields but doesn't send anywhere. The
fastest fix, no backend required:

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form, copy the endpoint URL it gives you
   (looks like `https://formspree.io/f/xxxxxxx`)
3. In `contact.html`, change:
   ```html
   <form id="contact-form" class="reveal" novalidate>
   ```
   to:
   ```html
   <form id="contact-form" class="reveal" novalidate action="https://formspree.io/f/xxxxxxx" method="POST">
   ```
4. In `js/script.js`, delete the `e.preventDefault();` line inside the
   contact form handler (or remove the whole submit listener) so the
   browser does a normal form POST to Formspree instead of intercepting it.

EmailJS is a similar free alternative if you'd rather send mail straight
from JavaScript without a page redirect.

## 4. Host it for free on GitHub Pages

1. Create a new **public** repository on GitHub, e.g. `your-portfolio`
2. Push this folder's contents to the repo root:
   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/your-portfolio.git
   git push -u origin main
   ```
3. On GitHub, go to your repo → **Settings** → **Pages**
4. Under "Build and deployment," set **Source** to `Deploy from a branch`,
   branch `main`, folder `/ (root)` → **Save**
5. Wait ~1 minute, then your site is live at:
   `https://YOUR_USERNAME.github.io/your-portfolio/`

To use a custom domain instead, add a `CNAME` file with your domain name
in the repo root and point your DNS to GitHub Pages (GitHub's docs walk
through the exact DNS records).

## 5. Local preview before you push

You can just double-click `index.html` to open it in a browser, but
running a tiny local server avoids some edge cases with relative paths:

```bash
cd portfolio
python3 -m http.server 8000
# then open http://localhost:8000
```

## 6. Re-theming (optional)

All colors, fonts, and spacing live as CSS variables at the top of
`css/style.css` under `:root`. Change `--accent-violet`, `--bg`, etc. and
the whole site updates — no need to touch individual pages.
