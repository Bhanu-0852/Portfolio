// ============================================================
// /api/chat — Vercel Serverless Function
// Multi-provider AI with cascading failover: Gemini → Groq.
// Same strategy pattern as SVBBS. Keys live only in Vercel
// environment variables (GEMINI_API_KEY, GROQ_API_KEY) —
// never exposed to the browser.
// ============================================================

const SYSTEM_PROMPT = `You are the friendly AI assistant on Bhanu Prakash Reddy's portfolio website. Answer questions from recruiters and visitors about Bhanu, in 2-4 short sentences, warm and professional. Only answer questions about Bhanu and his work; politely redirect anything else.

FACTS ABOUT BHANU:
- Full Stack Developer (MERN) based in Bangalore, India. Open to roles in Bangalore, Hyderabad, and remote/hybrid.
- B.Tech in Artificial Intelligence & Data Science, Nehru Institute of Engineering and Technology, CGPA 8.1, graduated May 2025.
- Completed NxtWave CCBP 4.0 — an intensive 6-month industry-grade full-stack program (React.js, JavaScript ES6+, Node.js, Express.js, SQL, MongoDB).
- Skills: React.js, Hooks, Router, Context API, JavaScript (ES6+), HTML5, CSS3, Node.js, Express.js, REST APIs, JWT auth, bcrypt, MongoDB, SQLite/SQL, Git/GitHub, Postman, Vitest, GitHub Actions CI/CD, Vercel.
- Flagship project SVBBS (Smart Vendor Book Bank System): full-stack MERN platform, 7 role-based dashboards, 80+ REST endpoints, JWT with refresh-token rotation, CSRF protection, RBAC, multi-provider AI layer with Gemini→Groq cascading failover powering 10+ AI features, 141-test Vitest suite with CI/CD coverage gating. Live: svbbs-mern.vercel.app
- Other projects: Tasty Kitchens (React food delivery app, JWT, search/sort/filter, persistent cart), NxtWatch (YouTube-style app with theming and auth), GitHub Profile Visualizer (GitHub API + Recharts), Twitter Clone Backend (Node/Express/SQLite, 15+ protected endpoints).
- Certifications: Cambridge Business English Certificate (Grade A), NPTEL Machine Learning (Elite), AICTE AI-ML Virtual Internship.
- Contact: bhanuprakashreddyfsd@gmail.com · github.com/Bhanu-0852 · linkedin.com/in/bhanu-prakash-reddy-b94995251
- Fun fact: this chat assistant itself runs the same Gemini→Groq failover pattern Bhanu built in SVBBS.`

// ---- Provider 1: Google Gemini ----
async function askGemini(history) {
  const key = process.env.GEMINI_API_KEY
  if (!key) throw new Error('no gemini key')
  const contents = history.map((m) => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.text }],
  }))
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: { maxOutputTokens: 300, temperature: 0.7 },
      }),
    },
  )
  if (!res.ok) throw new Error(`gemini ${res.status}`)
  const data = await res.json()
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) throw new Error('gemini empty')
  return text
}

// ---- Provider 2: Groq (fallback) ----
async function askGroq(history) {
  const key = process.env.GROQ_API_KEY
  if (!key) throw new Error('no groq key')
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 300,
      temperature: 0.7,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...history.map((m) => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.text })),
      ],
    }),
  })
  if (!res.ok) throw new Error(`groq ${res.status}`)
  const data = await res.json()
  const text = data?.choices?.[0]?.message?.content
  if (!text) throw new Error('groq empty')
  return text
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' })

  const { messages } = req.body || {}
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages required' })
  }
  // Basic input limits to protect the free-tier quota
  const history = messages.slice(-8).map((m) => ({
    role: m.role === 'user' ? 'user' : 'ai',
    text: String(m.text || '').slice(0, 600),
  }))

  // Cascading failover — the SVBBS strategy
  for (const provider of [askGemini, askGroq]) {
    try {
      const reply = await provider(history)
      return res.status(200).json({ reply })
    } catch {
      // try the next provider
    }
  }
  return res.status(200).json({
    reply:
      "I'm resting right now (rate limits!) — but Bhanu isn't. Email him at bhanuprakashreddyfsd@gmail.com 🚀",
  })
}
