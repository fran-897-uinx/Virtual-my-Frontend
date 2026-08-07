# Virtual-my-Frontend (Portfolio)

A **modern portfolio website** built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**, showcasing a multi-section landing experience with animated components, a carousel-based projects section, and integration with a backend API for dynamic content.

---

## 🧠 About this site

This repository is a **starter portfolio template** that combines:

- A **scaffolded Next.js App Router** structure with ready-to-use sections
- **Live data fetching** from a backend API for content like projects, blogs, skills, and testimonials
- A **clean UI system** built with `shadcn-ui`, Tailwind, and reusable components
- A **responsive, animated experience** with `framer-motion` and carousel navigation

It’s designed to be **easy to customize** for your own professional portfolio, while still being fully functional out of the box.

---

## 🚀 What this project includes

✅ **Section-based landing page** (Home, About, Blog, Services, Projects, Testimonials, Certifications, Contact)

✅ **Data-driven content** via backend API (configurable via `NEXT_PUBLIC_API_URL`)

✅ **Interactive UI elements** powered by:
- `framer-motion` animations
- `embla-carousel` for project slides
- `shadcn-ui` components (cards, dialogs, buttons, etc.)

✅ **Dark mode support** via `next-themes`

✅ **Responsive layout** with Tailwind CSS and mobile-first design

✅ **Social/action quick links** (GitHub, LinkedIn, CV download, etc.)

---

## 🧱 Project Structure (Key folders)

- `app/` – Next.js App Router entrypoint and global layout
- `components/sections/` – All major page sections (Navbar, Home, About, Projects, etc.)
- `components/ui/` – Shared UI components (button, card, dialog, carousel, form, etc.)
- `services/` – API client + data fetching helpers (e.g., `getProjects()`, `getAbout()`)
- `backend_data/` – Example / reference code for how backend responses can look
- `public/` – Static assets (CV, images, etc.)

---

## 🧩 How it works (Data & Backend)

This portfolio app is primarily a **frontend shell** that fetches content from an API.

### ✅ Default API URL

By default the app calls:

- `https://code-port-backend.onrender.com/api` (set in `services/api.ts`)

### ✅ Configure your own backend (recommended)

Set the environment variable in your local `.env` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Then restart the dev server.

### ✅ API endpoints used (examples)

- `GET /home/` (home section data)
- `GET /about/` (about section data)
- `GET /projects/` (projects list)
- `GET /services/` (services list)
- `GET /blog/` (blog posts)
- `GET /testimonail/` (testimonials)
- `GET /cert/` (certifications)
- `POST /contact/` (contact form submission)

> Tip: Update these endpoints in `services/*.ts` if you want to point to a different API structure.

---

## 🛠️ Getting Started (Local Development)

### 1) Install dependencies

```bash
pnpm install
```

### 2) Start the dev server

```bash
pnpm dev
```

Open http://localhost:3000 in your browser.

### 3) Build for production

```bash
pnpm build
pnpm start
```

### 4) Lint the code

```bash
pnpm lint
```

---

## 🎛️ Customizing content

### Update navigation / page sections

The page is composed in `app/page.tsx`. Each major section is a React component under:

- `components/sections/` (e.g. `HomePage`, `AboutPage`, `ProjectPage`, etc.)

### Update portfolio data (projects, services, testimonials)

Most sections fetch data from the backend via `services/*` helpers.

Example:
- `components/sections/ProjectPage.tsx` uses `services/project.ts` → `getProjects()`

If you don’t have a backend, you can either:

1. Point `NEXT_PUBLIC_API_URL` to your local server
2. Replace the `get*()` call with hardcoded local data (e.g., `const projects = [...]`)

---

## 🧪 Notes (Helpful tips)

✅ **Images** are loaded via Next.js `Image` component. If remote image domains are used, add them to `next.config.ts`.

✅ **CV download** is configured in `app/page.tsx` as:

```tsx
link: "/cv/Davidfrancis_CV.png"
```

✅ **Dark mode** toggling is handled by `next-themes` (look at `components/sections/Navbar.tsx`).

---

## 📦 Dependencies (high level)

- **Next.js 15** (App Router)
- **React 19**
- **Tailwind CSS v4**
- **shadcn-ui** (UI primitives)
- **framer-motion** (animations)
- **embla-carousel** (carousel)
- **zod** (validation & forms via react-hook-form)

---

## ✅ Deploying

This project is deployable on **Vercel** (recommended) or any Node.js hosting.

### Vercel Steps
1. Connect the repo
2. Add env vars (if using a custom backend):
   - `NEXT_PUBLIC_API_URL`
3. Deploy

---

## 🧠 Troubleshooting

- **API fetch fails / CORS errors:** ensure the backend is running and reachable from the browser.
- **Images missing:** verify the URL is reachable and update `next.config.ts` for remote domains.
- **Build fails:** run `pnpm lint` and fix TypeScript/ESLint errors.

---

## ❤️ Credits

Built as a customizable developer portfolio template using modern React/Next.js tooling.

---

If you want me to help shape the content (projects/services) into your own portfolio story, just say so! 🎉
