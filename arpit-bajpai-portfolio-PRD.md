# Arpit Bajpai — Demon Slayer Inspired Portfolio
## Product Requirements Document v1.0

> **Tagline:** "Cutting Through Complexity with Code & Intelligence."

---

## 1. Overview

| Field | Detail |
|---|---|
| **Owner** | Arpit Bajpai |
| **Roles** | BCA 3rd Year · Full Stack Developer · AI & ML Engineer · Founder & Technical Lead |
| **Theme** | Demon Slayer (anime-inspired) |
| **Goal** | A cinematic, interactive experience — not just a portfolio. Make visitors say *"This isn't a portfolio. This is a product."* |

---

## 2. Tech Stack

### Frontend
| Layer | Technology |
|---|---|
| Framework | Next.js 15, React 19, TypeScript |
| Styling | Tailwind CSS, ShadCN UI, Framer Motion |
| Animation | GSAP, Lenis Smooth Scroll, Motion One, SplitType |
| 3D | React Three Fiber, Drei, Three.js |
| Effects | Particles.js, Lottie React, React CountUp, React Tilt |

### Backend & Infrastructure
| Layer | Technology |
|---|---|
| Database | Supabase (Auth, DB, Storage, Edge Functions) |
| Deployment | Vercel (frontend), Supabase (DB) |
| Analytics | Google Analytics |

---

## 3. Design System

### Color Palette — Tanjiro Theme
| Token | Value |
|---|---|
| Primary | `#D62828` |
| Secondary | `#111111` |
| Accent | `#00FF9C` |
| Dark | `#050505` |
| Light | `#FFFFFF` |

### Anime Effects — Breathing Styles
Every section uses one of:
- Water Breathing animation
- Flame particles
- Sword slash transitions
- Lightning sparks
- Mist movement

---

## 4. Pages & Sections

### 4.1 Landing Page — Hero Experience

**Intro Sequence (3-second cinematic):**
1. Logo appears
2. Katana slash animation
3. Screen splits
4. Fire particles
5. Text stagger reveal: `ARPIT BAJPAI` → `FULL STACK DEVELOPER` → `AI & ML ENGINEER` → `BUILDING THE FUTURE WITH CODE`

**Background (Three.js scene):**
- Floating particles
- Dynamic fog & moonlight
- Moving clouds + parallax mountains
- Demon Slayer inspired environment

**Interactive 3D Character:**
- Anime warrior standing center-screen
- Mouse-reactive: character rotates, eyes glow, sword reflects light

**CTA Buttons:**
- View Projects
- Hire Me
- Download Resume
- Hover effect: sword slash animation

---

### 4.2 Navigation
- Glassmorphism navbar
- Links: Home · About · Skills · Experience · Projects · Certifications · AI Lab · Contact
- Effects: active section highlight, scroll progress indicator, magnetic hover

---

### 4.3 About Me — Anime Story Mode

Timeline-style storytelling with scroll-triggered reveals:

1. Introduction
2. BCA Student journey
3. Coding journey
4. Hackathons
5. Projects built
6. AI journey
7. Future goals

Effects: character reveals, parallax cards

---

### 4.4 Skills — Demon Slayer Skill Tree

Skills mapped to breathing techniques:

| Breathing Style | Skills |
|---|---|
| Water Breathing | React, Next.js |
| Flame Breathing | Node.js, Express |
| Thunder Breathing | JavaScript, TypeScript |
| Mist Breathing | AI & ML |

Hover effect: sword cut animation + skill power meter increase

---

### 4.5 Experience — Animated Timeline

Scroll-triggered card reveals:
- Catalyst Crew
- Dilootiee
- Hackathons
- Freelance work

---

### 4.6 Projects — Most Advanced Section

**Layout:** 3D floating cards rotating in space

**Per project:**
- Images, Demo link, GitHub link
- Tech stack, Case study, Screenshots

**Categories:** Full Stack · AI Projects · Web Apps · Automation · IoT

**Features:** Filtering · Search · Sorting · Favorites · Featured toggle

---

### 4.7 AI Lab

Visitors interact via chat:
- "Who is Arpit?" and similar questions
- Topics: skills, experience, projects, education

Powered by: OpenAI API (or local model fallback)

---

### 4.8 Achievements

Animated counters:
- Projects completed
- Hackathons
- Clients
- Technologies
- Certificates

---

### 4.9 Certifications

Interactive scroll cards with flip animation:
- Certificate image
- Issuer
- Skills covered
- Verification link

---

### 4.10 Testimonials

- Animated glassmorphism carousel
- Auto-scroll

---

### 4.11 Contact

**Fields:** Name · Email · Subject · Message

**Features:**
- Email validation
- Auto-save draft
- Success animation
- Supabase storage
- Admin notification

---

## 5. Admin Dashboard (`/admin`)

**Auth:** Supabase Auth (admin-only protected route)

### Dashboard Pages

| Page | Features |
|---|---|
| Overview | Total visitors, messages, projects, downloads |
| Contact Management | View/reply messages · Status: Read / Pending / Replied |
| Project Manager | Add / Edit / Delete · Upload images & videos · Featured toggle |
| Resume Manager | Upload new resume · Version control |
| Analytics | Page views · Traffic sources · Countries · Devices |

---

## 6. Database Schema

```sql
-- Users
id, email, role, created_at

-- Projects
id, title, description, category, tech_stack, github_url, live_url, featured, image, created_at

-- Contacts
id, name, email, subject, message, status, created_at

-- Resume
id, file_url, version, created_at
```

---

## 7. Performance Targets

| Metric | Target |
|---|---|
| Performance | 95+ |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

---

## 8. SEO

- Pages: Home, Projects, Blogs, AI Lab
- Schema Markup, OpenGraph, Twitter Cards
- Sitemap.xml, Robots.txt

---

## 9. Responsive Design

Support: Mobile · Tablet · Laptop · Desktop · 4K

Features: Touch animations, mobile navigation, adaptive layouts, optimized images

---

## 10. Easter Eggs

| Trigger | Effect |
|---|---|
| Konami Code | Hidden anime scene |
| Press `D` | Dark mode toggle |
| Mouse drag | Sword trail effect |
| Visit all sections | Unlock "Hashira Developer" badge |

---

## 11. Folder Structure

```
src/
├── app/
├── components/
├── features/
│   ├── animations/
│   ├── three/
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   ├── store/
│   ├── types/
│   ├── constants/
│   ├── dashboard/
│   └── assets/
```

---

## 12. V2 Roadmap

- AI Interview Simulator
- AI Resume Reviewer
- AI Portfolio Chatbot
- Multiplayer Visitor Wall
- Live Coding Playground
- Voice Controlled Portfolio
- 3D Virtual Room
- AI Avatar of Arpit
- AR Experience
- Recruiter Analytics Dashboard
