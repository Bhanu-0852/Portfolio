# Bhanu Prakash Reddy — 3D Portfolio

Premium interactive portfolio. React + Vite + React Three Fiber (Three.js) + Framer Motion + plain CSS. Light theme default with dark mode toggle, AI chat assistant with Gemini→Groq failover, EmailJS contact form.

**Live 3D hero · draggable tech sphere · animated stat counters · custom cursor · preloader · scroll progress · easter egg (type "bhanu" anywhere).**

---

## 1. Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

> Note: the AI chat needs Vercel's serverless runtime, so locally the chat shows the fallback message. It works after deploying (step 3). To test it locally use `npx vercel dev` instead of `npm run dev`.

## 2. Push to GitHub

```bash
git init
git add .
git commit -m "Premium 3D portfolio"
git branch -M main
git remote add origin https://github.com/Bhanu-0852/portfolio-3d.git
git push -u origin main
```

## 3. Deploy on Vercel

1. Go to vercel.com → **Add New → Project** → import the repo
2. Framework preset: **Vite** (auto-detected) → **Deploy**
3. After deploy, add the AI keys (next section) and redeploy

## 4. AI Assistant setup (5 minutes)

The chat button calls `/api/chat.js` — a serverless function that tries **Gemini first, then Groq** (your SVBBS failover pattern). Keys stay hidden on the server.

1. **Gemini key**: aistudio.google.com → Get API key → create a **fresh** key (old keys with `limit: 0` won't work)
2. **Groq key**: console.groq.com → API Keys → Create
3. In Vercel: your project → **Settings → Environment Variables** → add:
   - `GEMINI_API_KEY` = your Gemini key
   - `GROQ_API_KEY` = your Groq key
4. **Deployments → ⋯ → Redeploy**

No keys set? The site still works — the chat just replies with a friendly fallback message.

## 5. EmailJS contact form setup (5 minutes)

1. Sign up free at emailjs.com
2. **Email Services → Add New Service** → Gmail → connect your Gmail → copy the **Service ID**
3. **Email Templates → Create New Template** — use these variables in the template body: `{{from_name}}`, `{{from_email}}`, `{{message}}` → copy the **Template ID**
4. **Account → General** → copy your **Public Key**
5. Paste all three into `src/data.js` → `emailjsConfig`
6. Commit + push — Vercel redeploys automatically

Until configured, the form shows the "couldn't send" message (direct email/LinkedIn links always work).

## 6. Editing content

Everything lives in **`src/data.js`** — name, pitch, about text, skills, projects, timeline, easter egg word. Edit that one file, push, done.

- Photo: replace `public/bhanu.jpg` (for a background-removed version, use remove.bg, save as `bhanu.png`, and update `photo: '/bhanu.png'` in data.js)
- Resume: replace `public/resume.pdf`

## Project structure

```
api/chat.js            ← serverless AI endpoint (Gemini → Groq failover)
public/                ← resume.pdf, photo, favicon
src/
  data.js              ← ALL content (edit this)
  index.css            ← design tokens + all styles (light/dark themes)
  App.jsx              ← app shell, theme state
  scenes/
    HeroScene.jsx      ← 3D blob + particle galaxy
    IconSphere.jsx     ← draggable 3D tech-word sphere
  components/          ← Navbar, Hero, About, Projects, Timeline,
                          Contact, ChatWidget, EasterEgg, Cursor,
                          Preloader, ScrollProgress, Reveal, Footer
```

---

## Interview cheat sheet — "how did you build this?"

**The 3D:** "I used React Three Fiber, which renders Three.js scenes as React components. The hero has two parts: an icosahedron with drei's MeshDistortMaterial that morphs its surface and shifts hue over time, and a particle field of ~1600 points distributed on a sphere with the Fibonacci method. Both react to the cursor with lerp-smoothed rotation in the useFrame render loop. I cap the pixel ratio and cut particle counts on mobile for performance."

**The tech sphere:** "Words are positioned on a sphere using a Fibonacci spiral so they're evenly spaced, rendered with drei's Text, auto-rotating with OrbitControls for drag."

**The AI chat:** "A Vercel serverless function holds my resume facts as a system prompt and cascades across providers — Gemini first, Groq on failure — the same multi-provider failover strategy I built in SVBBS. Keys live in environment variables, never in the client."

**Theming:** "CSS custom properties on `:root` and `[data-theme='dark']`, toggled via a data attribute and persisted in localStorage. One variable set drives every color in the site."

**Animations:** "Framer Motion for scroll-reveal (whileInView), the preloader, and the scroll progress bar via useScroll + useSpring. Card tilts and the magnetic buttons are hand-written with mouse math — no library."

**Performance:** "3D scenes are lazy-loaded with React.lazy/Suspense so text paints first; the build splits them into separate chunks."
