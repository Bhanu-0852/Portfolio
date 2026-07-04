// ============================================================
// "Ask AI about Bhanu" — floating chat assistant.
// Calls /api/chat (Vercel serverless function) which runs the
// Gemini → Groq cascading failover. No API keys in this file.
// ============================================================
import { useState, useRef, useEffect } from 'react'


// ---- Built-in fallback brain ----
// Used when the /api/chat endpoint is unreachable (local dev) or
// before API keys are configured. Keyword-matched answers from
// Bhanu's real data, so the chat is never dead.
const FALLBACK_QA = [
  { keys: ['strongest', 'best project', 'flagship', 'svbbs', 'biggest'], a: "Bhanu's flagship is SVBBS — a full MERN platform with 7 role-based dashboards, 80+ REST endpoints, JWT refresh-token rotation, a Gemini→Groq AI failover layer and a 141-test Vitest suite with CI/CD. Live at svbbs-mern.vercel.app 🚀" },
  { keys: ['mongodb', 'mongo', 'database', 'sql'], a: "Yes! Bhanu works with MongoDB (used across SVBBS) and SQL/SQLite — including joins, subqueries, indexing and query optimization in his Twitter Clone backend." },
  { keys: ['remote', 'relocate', 'location', 'bangalore', 'hyderabad', 'where'], a: "Bhanu is based in Bangalore and open to roles in Bangalore, Hyderabad, and remote/hybrid positions." },
  { keys: ['react', 'frontend'], a: "React is Bhanu's core frontend skill — Hooks, Router, Context API, plus JavaScript ES6+, HTML5 and CSS3. Tasty Kitchens, NxtWatch and this portfolio itself are all React builds." },
  { keys: ['node', 'backend', 'express', 'api'], a: "Bhanu builds backends with Node.js and Express — 80+ endpoints in SVBBS and a 15+ endpoint Twitter Clone API with JWT auth, bcrypt and middleware-based access control." },
  { keys: ['education', 'degree', 'college', 'b.tech', 'btech', 'study'], a: "Bhanu holds a B.Tech in AI & Data Science (CGPA 8.1, 2025) and completed NxtWave's intensive 6-month CCBP 4.0 full-stack program." },
  { keys: ['experience', 'fresher', 'year'], a: "Bhanu is an entry-level developer with strong project experience — production-grade builds with testing, CI/CD and deployed live demos. He's ready for 0–1 year MERN/Full Stack roles." },
  { keys: ['contact', 'email', 'hire', 'reach', 'linkedin'], a: "Reach Bhanu at bhanuprakashreddyfsd@gmail.com, on LinkedIn (bhanu-prakash-reddy-b94995251) or GitHub (Bhanu-0852). He replies fast! 📬" },
  { keys: ['skill', 'stack', 'tech', 'know'], a: "Bhanu's stack: React.js, JavaScript ES6+, Node.js, Express, MongoDB, SQL, REST APIs, JWT auth, Git/GitHub, Vitest testing and GitHub Actions CI/CD — the full MERN toolkit." },
  { keys: ['test', 'vitest', 'ci', 'cd'], a: "Bhanu practices real testing discipline — a 141-test Vitest suite in SVBBS with GitHub Actions CI/CD enforcing coverage gates and dependency audits on every commit." },
  { keys: ['ai', 'gemini', 'groq', 'llm', 'chatbot'], a: "Bhanu integrates LLMs into his projects — SVBBS runs a multi-provider AI layer with Gemini→Groq cascading failover powering 10+ features. This chat uses the same pattern!" },
]

function fallbackAnswer(q) {
  const lower = q.toLowerCase()
  const hit = FALLBACK_QA.find((f) => f.keys.some((k) => lower.includes(k)))
  return hit
    ? hit.a
    : "Great question! Short version: Bhanu is a MERN Full Stack Developer in Bangalore with production-grade projects (SVBBS, Tasty Kitchens, NxtWatch). For details, email bhanuprakashreddyfsd@gmail.com 😊"
}

const SUGGESTIONS = [
  'What is his strongest project?',
  'Does he know MongoDB?',
  'Is he open to remote roles?',
]

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hi! I'm Bhanu's AI assistant. Ask me anything about his skills, projects, or experience. 🤖" },
  ])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const bodyRef = useRef()

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [messages, busy])

  const send = async (text) => {
    const q = (text ?? input).trim()
    if (!q || busy) return
    setInput('')
    const next = [...messages, { role: 'user', text: q }]
    setMessages(next)
    setBusy(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Send recent history so the AI has conversation context
        body: JSON.stringify({ messages: next.slice(-8).map((m) => ({ role: m.role, text: m.text })) }),
      })
      if (!res.ok) throw new Error('api unavailable')
      const data = await res.json()
      setMessages((m) => [...m, { role: 'ai', text: data.reply || fallbackAnswer(q) }])
    } catch {
      // Endpoint missing (local dev) or providers down → built-in brain answers
      setMessages((m) => [...m, { role: 'ai', text: fallbackAnswer(q) }])
    }
    setBusy(false)
  }

  return (
    <>
      {open && (
        <div className="chat-panel">
          <div className="chat-head">
            <div>Ask AI about Bhanu<small>Gemini → Groq failover · same pattern as SVBBS</small></div>
            <button onClick={() => setOpen(false)} aria-label="Close chat">✕</button>
          </div>
          <div className="chat-body" ref={bodyRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role}`}>{m.text}</div>
            ))}
            {busy && <div className="chat-msg ai typing">thinking…</div>}
          </div>
          {messages.length <= 1 && (
            <div className="chat-suggests">
              {SUGGESTIONS.map((s) => <button key={s} onClick={() => send(s)}>{s}</button>)}
            </div>
          )}
          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Ask about Bhanu…"
            />
            <button onClick={() => send()} disabled={busy}>➤</button>
          </div>
        </div>
      )}
      <button className="chat-fab" onClick={() => setOpen(!open)} aria-label="AI assistant">
        {open ? '✕' : '✦'}
      </button>
    </>
  )
}
