// ============================================================
// ALL PORTFOLIO CONTENT LIVES HERE.
// To update text, links, or projects — edit this file only.
// ============================================================

export const profile = {
  name: 'Bhanu Prakash Reddy',
  shortName: 'Bhanu',
  role: 'Full Stack Developer',
  pitch: 'I build production grade MERN applications — from REST APIs to polished UIs',
  email: 'bhanuprakashreddyfsd@gmail.com',
  location: 'Bangalore, India',
  github: 'https://github.com/Bhanu-0852',
  linkedin: 'https://www.linkedin.com/in/bhanu-prakash-reddy-b94995251',
  resume: '/resume.pdf',
  photo: '/bhanu.png',
}

export const about = {
  paragraphs: [
    `I'm a Full Stack Developer from Bangalore who enjoys turning complex problems into clean, working software. I hold a B.Tech in Artificial Intelligence & Data Science (CGPA 8.1) and completed NxtWave's intensive 6-month CCBP 4.0 full-stack program.`,
    `My flagship build, SVBBS, is a complete MERN platform — 7 role-based dashboards, 80+ secured REST endpoints, a multi-provider AI layer with Gemini→Groq failover, and a 141-test suite wired into CI/CD. I focus on writing secure, well-tested code that works without breaking.`,
  ],
}

export const skills = [
  { name: 'React.js', tag: 'Frontend' },
  { name: 'JavaScript (ES6+)', tag: 'Frontend' },
  { name: 'HTML5 & CSS3', tag: 'Frontend' },
  { name: 'Node.js', tag: 'Backend' },
  { name: 'Express.js', tag: 'Backend' },
  { name: 'REST APIs', tag: 'Backend' },
  { name: 'MongoDB', tag: 'Database' },
  { name: 'SQL / SQLite', tag: 'Database' },
  { name: 'JWT Auth', tag: 'Security' },
  { name: 'Git & GitHub', tag: 'Tools' },
  { name: 'Vitest', tag: 'Testing' },
  { name: 'CI/CD', tag: 'Tools' },
]

// Words orbiting in the 3D sphere (keep them short)
export const sphereWords = [
  'React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'HTML5',
  'CSS3', 'REST', 'JWT', 'SQL', 'Git', 'Vitest', 'Vercel', 'CI/CD',
  'Hooks', 'Vite', 'bcrypt', 'Postman',
]

export const featuredProject = {
  title: 'Smart Vendor Book Bank System',
  abbr: 'SVBBS',
  description:
    'A full-stack MERN platform with role-based dashboards for the entire book-bank workflow — secured with JWT refresh-token rotation, CSRF protection and RBAC, powered by a multi-provider AI layer (Gemini → Groq cascading failover) driving 10+ AI features.',
  stats: [
    { value: 7, suffix: '', label: 'Role Dashboards' },
    { value: 80, suffix: '+', label: 'REST Endpoints' },
    { value: 141, suffix: '', label: 'Vitest Tests' },
    { value: 10, suffix: '+', label: 'AI Features' },
  ],
  tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Gemini + Groq', 'Vitest', 'CI/CD'],
  live: 'https://svbbs-mern.vercel.app',
  code: 'https://github.com/Bhanu-0852/svbbs-mern',
}

export const projects = [
  {
    title: 'Tasty Kitchens',
    description:
      'Responsive food-delivery platform with JWT-secured routes, search/sort/filter across 50+ restaurants, persistent cart via Local Storage, and full API state management.',
    tech: ['React', 'REST APIs', 'JWT', 'React Router'],
    live: 'https://react-food-delivery-clone.vercel.app',
    code: 'https://github.com/Bhanu-0852/react-food-delivery-clone',
  },
  {
    title: 'NxtWatch',
    description:
      'A YouTube-style video streaming app with authentication, themed UI (light/dark), saved videos, trending & gaming feeds, and protected routes.',
    tech: ['React', 'Context API', 'JWT', 'Styled Components'],
    live: 'https://nxt-watch-app-psi.vercel.app',
    code: 'https://github.com/Bhanu-0852/nxt-watch-app',
  },
  {
    title: 'GitHub Profile Visualizer',
    description:
      'Interactive dashboard that visualizes any GitHub profile — repositories, language stats and contribution analysis — rendered with live GitHub API data and charts.',
    tech: ['React', 'GitHub API', 'Recharts'],
    live: 'https://github-profile-visualizer-tau.vercel.app',
    code: 'https://github.com/Bhanu-0852/github_profile_visualizer',
  },
  {
    title: 'Twitter Clone Backend',
    description:
      'REST API with 15+ protected endpoints covering tweets, profiles, follows and personalized feeds — JWT auth, bcrypt hashing and middleware-based access control.',
    tech: ['Node.js', 'Express', 'SQLite', 'JWT', 'bcrypt'],
    live: null,
    code: 'https://github.com/Bhanu-0852/twitter-clone-backend',
  },
]

export const timeline = [
  {
    period: '2025 — 2026',
    title: 'NxtWave · CCBP 4.0 Academy',
    subtitle: 'Full Stack Development Program',
    detail:
      'Intensive 6-month industry-grade training — React.js, JavaScript ES6+, Node.js, Express.js, SQL and MongoDB. Built and shipped multiple full-stack projects.',
  },
  {
    period: '2021 — 2025',
    title: 'Nehru Institute of Engineering & Technology',
    subtitle: 'B.Tech · Artificial Intelligence & Data Science · CGPA 8.1',
    detail:
      'Coursework: Python, Operating Systems, Computer Networks, Machine Learning, DBMS, Data Structures & Algorithms.',
  },
  {
    period: 'Certifications',
    title: 'Achievements',
    subtitle: 'Cambridge · NPTEL · AICTE',
    detail:
      'Business English Certificate (Grade A, Cambridge) · Machine Learning with Elite distinction (NPTEL) · AI-ML Virtual Internship (AICTE EduSkills).',
  },
]

// EmailJS — fill these three after creating a free account at emailjs.com
// (see README.md for the 5-minute setup guide)
export const emailjsConfig = {
  serviceId: 'YOUR_SERVICE_ID',
  templateId: 'YOUR_TEMPLATE_ID',
  publicKey: 'YOUR_PUBLIC_KEY',
}

export const easterEggWord = 'bhanu'
