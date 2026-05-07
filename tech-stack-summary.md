# Tech Stack Summary — All Projects
_Generated: 2026-05-07_

---

## DG-refresh (`daily-guardian`)
**Type:** News / media web app

| Layer | Stack |
|-------|-------|
| Framework | Next.js 15, React 19, TypeScript |
| Styling | Tailwind CSS 4, Turbopack |
| Notable libs | Google Cloud Text-to-Speech, PDF.js, react-pageflip, Framer Motion, Lucide React |

---

## FMCLaw (`fmc-law` folder)
**Type:** Law firm website

| Layer | Stack |
|-------|-------|
| Framework | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS 4, Turbopack |
| CMS | Contentful (`@contentful/rich-text-react-renderer`) |
| Notable libs | Framer Motion |

---

## home-credit / renzo/home-credit
**Type:** Prize wheel / spin game

| Layer | Stack |
|-------|-------|
| Framework | Next.js 15.5, React 18, TypeScript |
| Styling | Tailwind CSS 4, Turbopack |
| Notable libs | react-custom-roulette, spin-wheel |

---

## jci (root)
**Type:** Static landing page (no framework)

| Layer | Stack |
|-------|-------|
| Styling | Tailwind CSS 4 |
| Animation | GSAP |

---

## jci/JCIRegattaIloiloAstro
**Type:** Event / regatta website

| Layer | Stack |
|-------|-------|
| Framework | Astro 4 |
| Styling | Tailwind CSS 3 |
| Content | MDX, RSS, Sitemap |
| Notable libs | GSAP, page-flip, pdfjs-dist |

---

## prominent-enterprise-app (root level)
**Type:** Minimal starter / shell project

| Layer | Stack |
|-------|-------|
| Framework | Next.js 16.1.6, React 19, TypeScript |
| Styling | Tailwind CSS 4 |

---

## warp-website
**Type:** Company / product website

| Layer | Stack |
|-------|-------|
| Framework | Next.js 15.4.6, React 19, TypeScript |
| Styling | Tailwind CSS 4, Turbopack |
| Notable libs | Lucide React, React Icons |

---

## votingresults (root)
**Type:** Firebase wrapper only

| Layer | Stack |
|-------|-------|
| Service | Firebase 12 |

---

## votingresults/votingresults
**Type:** Election results dashboard

| Layer | Stack |
|-------|-------|
| Framework | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS 4 |
| Database | Firebase 12 |
| Notable libs | jsPDF, jspdf-autotable, XLSX |

---

## anilao/prominent-anilao-deployment-repo
**Type:** Full-stack enterprise admin app (fullest version — has AI)

### Frontend (client)
| Layer | Stack |
|-------|-------|
| Framework | Next.js 14, React 18/latest, TypeScript |
| Styling | Tailwind CSS, tailwind-merge |
| Auth | NextAuth v4 + Prisma adapter |
| UI | MUI, Radix UI, Headless UI, Lucide React |
| State | Zustand, React Hook Form + Zod |
| Rich text | Tiptap (with table, image, color, font, link extensions) |
| Charts | Chart.js, Recharts, react-chartjs-2 |
| Calendar | FullCalendar |
| Documents | jsPDF, @react-pdf/renderer, mammoth, docx |
| Analytics | Vercel Analytics |

### Backend (server)
| Layer | Stack |
|-------|-------|
| Runtime | Node.js 24, Express, TypeScript |
| ORM | Prisma 5.15, PostgreSQL |
| Auth | JWT + bcrypt |
| Storage | AWS S3 (v3 SDK) |
| Email | Nodemailer + Resend |
| Jobs | node-cron |
| SMS | Twilio, TextMagic |
| AI | **Anthropic Claude SDK** (`@anthropic-ai/sdk`) |
| Realtime | WebSocket (`ws`) |
| Exports | XLSX, json2csv |

---

## apmc-prom/prominent-apmc
**Type:** Full-stack accounting / admin app

### Frontend (client)
| Layer | Stack |
|-------|-------|
| Framework | Next.js 14, React 18, TypeScript |
| Styling | Tailwind CSS 3 |
| Auth | NextAuth v4 + Prisma adapter |
| UI | MUI, Radix UI, Headless UI, TanStack Table |
| State | Zustand, React Hook Form + Zod |
| Charts | Chart.js, react-chartjs-2 |
| Documents | jsPDF, @react-pdf/renderer |
| Realtime | Socket.io client |

### Backend (server)
| Layer | Stack |
|-------|-------|
| Runtime | Node.js 20, Express, TypeScript |
| ORM | Prisma 5.15, PostgreSQL |
| Auth | JWT + bcrypt |
| Realtime | Socket.io |
| Queue | Bull (Redis) |
| Storage | AWS SDK v2 |
| Email | Nodemailer |
| Jobs | node-cron |
| SMS | Twilio, TextMagic |
| PDF | PDFKit, pdf2json |
| Extras | Google APIs, Redis, SQLite3 |

---

## asm/apmc-vote-html
**Type:** APMC voting system — HTML-only

| Layer | Stack |
|-------|-------|
| Stack | Vanilla HTML / JS, Tailwind CSS 3, PostCSS |
| Tools | live-server, UglifyJS |

---

## darethefuture/DareTheFuture
**Type:** Static media / event landing page

| Layer | Stack |
|-------|-------|
| Stack | Plain HTML (no framework, no package.json) |
| Deploy | Netlify (`netlify.toml`) |
| Content | Videos, images |

---

## enterprise/prominent-enterprise
**Type:** Company website with waitlist

| Layer | Stack |
|-------|-------|
| Framework | Next.js 16.1.4, React 19, TypeScript |
| Styling | Tailwind CSS 4, tailwind-merge |
| Email | Resend |
| Analytics | Vercel Analytics |
| Notable libs | Framer Motion, Lucide React, Google APIs, XLSX |

---

## food-maps/food-maps
**Type:** Food map discovery app

| Layer | Stack |
|-------|-------|
| Framework | Next.js 15.2.4, React 19, TypeScript |
| Styling | Tailwind CSS 4, tailwind-merge, CVA, Turbopack |
| Maps | Mapbox GL |
| Notable libs | Google APIs, Lucide React, React Icons, Swiper 11, Motion |

---

## food-maps-revamp/food-maps-revamp
**Type:** Food map revamp (newer iteration)

| Layer | Stack |
|-------|-------|
| Framework | Next.js 15.5.15, React 19, TypeScript |
| Styling | Tailwind CSS 4, Turbopack |
| Maps | Mapbox GL |
| Notable libs | Same as food-maps + react-pageflip, Swiper 12 |

---

## fork/forked → /client (Progenitor CRA)
**Type:** Portfolio / agency website (older React SPA)

| Layer | Stack |
|-------|-------|
| Framework | React 18, CRA (react-scripts 5) |
| Styling | Tailwind CSS 3, SASS |
| Routing | React Router DOM v6 |
| 3D | Three.js, @react-three/drei, @react-three/postprocessing |
| Animation | Framer Motion |
| Email | EmailJS |
| Notable libs | react-intersection-observer, react-icons, react-player, react-responsive-carousel |

---

## newteam/prominent-enterprise-app
**Type:** Enterprise app — monorepo frontend (most modern frontend stack)

| Layer | Stack |
|-------|-------|
| Framework | Next.js 16.1.6, React 19, TypeScript |
| Styling | Tailwind CSS 4, tailwind-merge, tw-animate-css |
| Package manager | pnpm workspace |
| Auth | Auth0 (`@auth0/nextjs-auth0`) |
| Data fetching | TanStack Query v5 |
| Forms | React Hook Form v7 + Zod v4 |
| UI | Radix UI, shadcn/ui, react-aria-components |
| State | Zustand v5, nuqs |
| Actions | next-safe-action |
| Theming | next-themes |
| Toasts | Sonner |

---

## newteam/prominent-enterprise-backend
**Type:** Enterprise API — NestJS backend

| Layer | Stack |
|-------|-------|
| Framework | NestJS 11, TypeScript |
| ORM | Prisma 7, PostgreSQL |
| Auth | Auth0 + JWT + Passport.js |
| API docs | Swagger / OpenAPI |
| Validation | class-validator, class-transformer |
| Testing | Jest v30, Supertest |
| Package manager | pnpm |

---

## prismic/my-prismic-site
**Type:** CMS-driven website

| Layer | Stack |
|-------|-------|
| Framework | Next.js 15.4.6, React 19, TypeScript |
| Styling | Tailwind CSS 4 |
| CMS | Prismic (`@prismicio/client`, `@prismicio/next`, `@prismicio/react`) |
| CMS tools | Slice Machine |

---

## progenetor/progen-refresh
**Type:** Personal / agency portfolio with blog

| Layer | Stack |
|-------|-------|
| Framework | Next.js 14, React 18, TypeScript |
| Styling | Tailwind CSS 3, yarn |
| 3D | Three.js, @react-three/fiber, @react-three/drei |
| Animation | Framer Motion |
| Blog | Gray Matter + markdown-to-jsx |
| Services | Google APIs, Redis, EmailJS, SWR |
| Notable libs | react-player, react-responsive-carousel, react-toastify |

---

## progenetor/Progenitor → /client
**Type:** Portfolio / agency website (original React SPA)

| Layer | Stack |
|-------|-------|
| Framework | React 18, CRA |
| Styling | Tailwind CSS 3, SASS |
| Routing | React Router DOM v6 |
| 3D | Three.js (older versions) |
| Animation | Framer Motion |
| Email | EmailJS |

---

## prominent-admin/Prominent-Admin-Module
**Type:** Full-stack admin module (similar build to apmc-prom)

### Frontend (client)
| Layer | Stack |
|-------|-------|
| Framework | Next.js 14, React 18, TypeScript |
| Styling | Tailwind CSS |
| Auth | NextAuth v4 + Prisma adapter |
| UI | MUI, Radix UI, Headless UI |
| State | Zustand, React Hook Form + Zod |
| Charts | Chart.js, react-chartjs-2 |
| Documents | jsPDF, @react-pdf/renderer |

### Backend (server)
| Layer | Stack |
|-------|-------|
| Runtime | Node.js 18, Express, TypeScript |
| ORM | Prisma 5.15, PostgreSQL |
| Auth | JWT + bcrypt |
| Storage | AWS SDK v2 |
| Email | Nodemailer + Resend |
| Jobs | node-cron |
| SMS | Twilio, TextMagic |
| Realtime | WebSocket (`ws`) |

---

## my-website/perfolio (this project)
**Type:** Personal portfolio website

| Layer | Stack |
|-------|-------|
| Framework | Next.js 15.2.4, React 19, TypeScript |
| Styling | Tailwind CSS 4, Turbopack |
| Animation | GSAP |
| Notable libs | React Icons |

---

---

## Freelance Projects

### Meisner Institute — `www.meisnerinstitute.com`
**Type:** Actor training & teacher training educational institution

| Layer | Stack |
|-------|-------|
| Platform | Wix |
| Media | Wix CDN (wixstatic.com) |
| Extras | Google Earth map embed, multi-language / global partner network |

---

## Empty / Placeholder Folders
| Folder | Status |
|--------|--------|
| `ai-proj` | Empty |
| `convert` | Empty |
| `fmc-law` | Empty |
| `ledwall` | Empty |
| `test` | Minimal — TypeScript test files only (`index.ts`, `tsconfig.json`) |
