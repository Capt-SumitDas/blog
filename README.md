# 🛡️ 0xHacker — Cybersecurity Blog

A modern, portfolio-style cybersecurity blog with a hacker aesthetic. Built for GitHub Pages.

## 📁 Project Structure

```
cybersec-blog/
├── index.html              ← Homepage
├── 404.html                ← Custom 404 page
├── _config.yml             ← GitHub Pages config
├── css/
│   └── style.css           ← All styles (dark/light mode, animations)
├── js/
│   ├── main.js             ← Core JS (theme, search, animations)
│   └── data.js             ← Blog post data (search index, cards)
├── blog/
│   ├── index.html          ← Blog listing page
│   ├── _TEMPLATE.html      ← ⭐ Copy this for new posts
│   └── sql-injection-bypass.html  ← Example post
├── ctf/
│   ├── index.html          ← CTF writeups listing
│   ├── _TEMPLATE.html      ← ⭐ Copy this for new CTF writeups
│   └── htb-bizness.html    ← Example writeup
├── about/
│   └── index.html          ← About/profile page
└── images/                 ← Put your images here
    └── (profile.jpg, etc.)
```

---

## 🚀 Deploying to GitHub Pages

### Step 1: Create a Repository

1. Go to [github.com/new](https://github.com/new)
2. Name it `yourusername.github.io` (for a personal site) OR any name like `cybersec-blog`
3. Set it to **Public**
4. Click **Create repository**

### Step 2: Upload Files

**Option A: GitHub Web UI**
1. Click "uploading an existing file" on the repository page
2. Drag and drop the entire `cybersec-blog/` folder contents
3. Commit with message: `Initial commit: cybersec blog`

**Option B: Git CLI**
```bash
cd cybersec-blog
git init
git add .
git commit -m "Initial commit: cybersec blog"
git branch -M main
git remote add origin https://github.com/YOURUSERNAME/REPONAME.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository → **Settings** → **Pages**
2. Under "Source", select **Deploy from a branch**
3. Select branch: `main`, folder: `/ (root)`
4. Click **Save**

Your site will be live at:
- Personal repo: `https://yourusername.github.io`
- Project repo: `https://yourusername.github.io/cybersec-blog`

> ⏱️ It takes 1-5 minutes to deploy after pushing changes.

---

## ✍️ Adding New Blog Posts

### Step 1: Copy the Template

```bash
cp blog/_TEMPLATE.html blog/my-new-post.html
```

### Step 2: Edit the File

Open `blog/my-new-post.html` and update the sections marked with `<!-- CUSTOMIZE -->`:

1. **Meta tags** — title, description, OG tags
2. **Breadcrumb slug** — matches the filename
3. **Post header** — date, read time, title, tags
4. **Post body** — your content with `<h2 id="...">` sections
5. **Table of contents** — add `<li><a href="#your-id">Section</a></li>` for each heading

### Step 3: Add to Data Store

Open `js/data.js` and add an entry to `window.BLOG_DATA`:

```javascript
{
  id: 'my-new-post',          // matches filename (without .html)
  type: 'blog',
  title: 'My Post Title',
  date: '2025-01-15',        // YYYY-MM-DD
  tags: ['web', 'sqli'],     // for filtering
  excerpt: 'A short 1-2 sentence preview shown on the homepage.',
  url: 'blog/my-new-post.html',
  readTime: '8 min read',
},
```

### Step 4: Push to GitHub

```bash
git add .
git commit -m "Add post: My Post Title"
git push
```

Done! Your post is live in ~2 minutes. ✅

---

## 🏴 Adding CTF Writeups

Same process as blog posts, but use `ctf/_TEMPLATE.html`:

```bash
cp ctf/_TEMPLATE.html ctf/ctf-name-challenge.html
```

Update the data entry with `type: 'ctf'` and add the extra CTF fields:

```javascript
{
  id: 'ctf-name-challenge',
  type: 'ctf',
  title: 'Challenge Name',
  event: 'CTF Event 2025',
  category: 'web',         // web, crypto, pwn, rev, forensics, misc
  difficulty: 2,           // 1=easy, 2=medium, 3=hard, 4=insane
  points: 200,
  tags: ['web', 'sqli'],
  excerpt: 'Brief description...',
  url: 'ctf/ctf-name-challenge.html',
},
```

---

## 🎨 Customization

### Personal Information

1. **`index.html`** — Update hero name, tagline, stats numbers, social links in footer
2. **`about/index.html`** — Replace placeholder with your real info, photo, skills, timeline
3. **All footers** — Update GitHub/LinkedIn/Twitter links to your profiles

### Profile Photo

Replace the placeholder in `about/index.html`:
```html
<img src="../images/profile.jpg" alt="Your Name" class="profile-img">
```

Add your photo to the `images/` folder.

### Color Scheme

Edit CSS variables in `css/style.css` (around line 15):

```css
:root {
  --accent-green:   #00ff9d;  /* Primary accent - change to any color */
  --accent-cyan:    #00d4ff;  /* Secondary accent */
  --accent-purple:  #7c3aed;  /* CTF section color */
}
```

### Social Links

Search for `yourusername` / `yourhandle` / `yourprofile` in all HTML files and replace.

### Newsletter Integration

The newsletter form currently shows a success UI only. To connect to a real service:

**Mailchimp:**
Replace the `<form>` in `index.html` with your Mailchimp embed code.

**ConvertKit / Buttondown:**
Replace form action with their endpoint URL.

---

## 🔧 Code Syntax Highlighting

Add syntax highlighting to code blocks using CSS classes:

```html
<pre data-lang="python"><code>
<span class="kw">import</span> requests         <!-- keyword -->
<span class="fn">print</span>(<span class="st">"hello"</span>)     <!-- function / string -->
<span class="cm"># this is a comment</span>      <!-- comment -->
<span class="nm">42</span>                       <!-- number -->
</code></pre>
```

Available classes: `.kw` (keyword), `.fn` (function), `.st` (string), `.cm` (comment), `.nm` (number), `.op` (operator)

---

## 📱 Features

| Feature | Status |
|---------|--------|
| Dark / Light Mode | ✅ with localStorage persistence |
| Responsive (mobile) | ✅ |
| Client-side Search | ✅ |
| Tag Filtering | ✅ |
| Typing Animation | ✅ |
| Terminal Animation | ✅ |
| Scroll Animations | ✅ |
| Reading Progress Bar | ✅ |
| Table of Contents | ✅ sticky sidebar |
| Copy Code Button | ✅ auto-added |
| Back to Top | ✅ |
| Newsletter UI | ✅ (needs backend) |
| SEO Meta Tags | ✅ |
| Custom 404 Page | ✅ |
| Syntax Highlighting | ✅ manual CSS classes |

---

## 🐛 Common Issues

**Site not loading after push:**
Wait 5 minutes and hard refresh (Ctrl+Shift+R). Check the Actions tab for build errors.

**Links broken after deploying:**
If your repo is named `cybersec-blog` (not `username.github.io`), you may need to update asset paths. Check the repository name and Pages URL.

**Images not showing:**
Make sure image paths are relative (e.g., `../images/photo.jpg`) not absolute.

**Search not working:**
Ensure you've added the post to `js/data.js` — search only indexes entries there.

---

## 📄 License

MIT License — do whatever you want, attribution appreciated.

---

*Built with ❤️ and too much coffee. Stay ethical, hack responsibly.*
