# LensaData Landing Page - PRD

## Overview
Premium landing page for LensaData, a Business Intelligence & Data Analytics company from Indonesia.
**Parent company:** PT FINXINA LINTAS BENUA
**Tagline:** "Tajam Melihat, Sigap Bertindak"

## Architecture
- **Frontend:** React + Tailwind CSS + Framer Motion + Canvas2D
- **Backend:** FastAPI (not heavily used for landing page)
- **Deployment:** Vercel (planned) / Currently: Emergent platform

## Brand Identity
- Deep Background: #040914
- Deep Blue: #0D3A70
- Teal: #1F7D9F
- Cyan (Primary Accent): #00D1E9
- Orange/Red Accent: #F76F2E
- Muted Text: #8BA0B8
- Fonts: Outfit (headings) + IBM Plex Sans (body)

## Implemented Features (as of 2026-02-20)

### Sections
1. **Navbar** - Sticky, transparent → glass on scroll, EN/ID language toggle, mobile hamburger
2. **Hero Section** - Animated Data Core Sphere (Canvas2D, desktop), KPI floating cards, CTA buttons. Mobile-optimised stats grid (4-col compact).
3. **Scroll Story** - Sticky scroll animation: Chaos → Integration → Intelligence → Decision. Height set to 260vh. **Each of the 4 stages has a unique, data-consulting-specific illustration** (not abstract icons):
   - **Chaos**: 6 scattered data-source cards (Excel.xlsx, POS Export, SFA Mobile, ERP Dump, Manual CSV, Email Rpt) with red warning triangles + broken dashed connection lines
   - **Integration**: ETL pipeline flow — 3 source nodes (ERP/Excel/SFA) → animated data dots flowing through ETL Transform box → Data Warehouse cube
   - **Intelligence**: Realistic BI dashboard mockup — 3 KPI cards (Revenue Rp 2.4B, Outlets 117K, Conv. 68.4%) + animated sparkline trend (+18.6%) + 7-branch bar chart
   - **Decision**: Profit forecast +47.3% with confidence meter (92%), forecast line with "OPTIMAL Q4" badge, AI Recommendation card with sparkle, and "APPROVED" stamp
4. **Trust Metrics** - Animated counters (5+, 300+, 750+, 23, 100M+, National)
5. **Services Section** - 7-service bento grid
6. **Case Studies** - 5 cards in 3+2 bento layout. **Clean icon-only design (no dashboard background images)** — accent-glow cards with category icons.
7. **Founder Section** - Yudanta + Zainuddin photos with bio/achievements (mobile-responsive heights)
8. **Contact Section** - **2 cards: WhatsApp + Email** (Cal.com booking card removed per user request)
9. **Footer** - Logo, navigation, contact info
10. **Floating Action Button** - **Single direct WhatsApp link** to https://s.id/konsultasi-data (with pulse-ring animation). Multi-action expandable FAB removed.

### Language Support
- EN (English) - default
- ID (Indonesian) - toggle via EN|ID button

### Contact Integration
- WhatsApp / Primary CTA: https://s.id/konsultasi-data
- Direct WA: +6285117577707 (wa.me)
- Email: lensadata.id@gmail.com

### Mobile Responsiveness (verified 2026-02-20)
- Tested at 360px and 390px widths — zero horizontal overflow
- All sections collapse cleanly: hero stats in 4-col grid, founder photos stacked side-by-side at smaller heights, scroll story dots without overlapping labels, case studies 1-col
- Padding scales: `px-5 sm:px-6` and `py-20 sm:py-28`

### Key Technical Details
- Canvas2D animation for the Data Core Sphere (replaces R3F for Emergent compatibility)
- Framer Motion for scroll animations and entrance effects
- Lenis smooth scroll
- Intersection Observer for counter animations
- Responsive design (mobile-first)
- Favicon: LensaData Logo 02 - Positive Blue (real brand asset, not AI-generated)

## Assets
- Logo (Negative): https://customer-assets.emergentagent.com/job_data-core-sphere/artifacts/zvm3srae_LensaData%20Logo%2001%20-%20Negative.png
- Logo (White): https://customer-assets.emergentagent.com/job_data-core-sphere/artifacts/i30zm9vo_LensaData%20Logo%2002%20-%20Positive%20White.png
- Favicon (Positive Blue): https://customer-assets.emergentagent.com/job_data-core-sphere/artifacts/tfrexhwr_LensaData%20Logo%2002%20-%20Positive%20Blue.png
- Founder Photo (Danta): https://customer-assets.emergentagent.com/job_data-core-sphere/artifacts/sh5f7uo6_Akselo%20Founder%20-%20DANTA%20%28Fin%29.jpg
- Co-Founder Photo (Zayn): https://customer-assets.emergentagent.com/job_data-core-sphere/artifacts/bi9y4y54_Akselo%20Founder%20-%20ZAYN%20%28Fin%29.jpg

## Changelog
- **2026-02-21** — Major content refresh (10 tasks completed):
  - Hero headline updated to emotional/tension-focused: "Your Business Is Growing. But Is It Really Under Control?"
  - DataSphere KPIs replaced with 7 service roles (Power BI Developer, Data Engineer, Business Intelligence, Data Analyst, Business Analyst, Market Survey Analyst, AI Automation Strategic); DataSphere now visible & responsive on mobile (4 priority badges visible at <md)
  - Hero mini stats: 6T+ IDR / 750+ Users / 23 Branches / 100M+ Records
  - TrustMetrics fully rebuilt with 4 enterprise-scale metric cards: icons (Building/Users/Network/Database), enlarged glowing numbers (text-4xl→5xl→[3.4rem]) with double textShadow, descriptions, vertical+horizontal dividers, hover pulse effect
  - Case Studies: "SFA/DMS Ecosystem" replaced with "Enterprise Power BI Dashboard" (POWER BI / ENTERPRISE / REAL-TIME tags, LayoutDashboard icon)
  - Case Studies: Market Intelligence System tags now use per-tag high-contrast colors (cyan #00F5FF, purple #C084FC, orange #FFB347) with glow + 600 weight
  - Team section rebuilt as 3-member grid (Yudanta, Zainuddin, Imron Rosyadi - AI Engineer) with shared team bio (no longer Yudanta-specific)
  - Instagram added: Contact section (3rd card, pink Instagram icon → @lensa_data.id) + Footer link
- **2026-02-20 (later)** — Redesigned all 4 ScrollStory stage visuals with data-consulting-specific illustrations + fixed sticky positioning bug (`overflow-x: clip` instead of `hidden`).
- **2026-02-20** — Removed Cal.com booking, single direct WhatsApp FAB, clean icon-based case studies, mobile responsiveness pass.
- **2025-01-20** — Real case study images, Trusted-By marquee with 8 clients, SEO meta tags, branded favicon.

## Backlog / Next Action Items

### P0 - Done
- [x] Real case study images (now removed in favor of clean cards per user request)
- [x] "Trusted by" client logo strip (8 clients)
- [x] SEO meta tags (Title, Description, OG, Twitter Card, JSON-LD schema, canonical)
- [x] Favicon (real LensaData logo)
- [x] Direct WhatsApp FAB
- [x] Mobile responsiveness verified
- [x] Cal.com removed

### P1 - Important
- [ ] Page performance optimization (image lazy-loading already in, consider preload critical hero asset)
- [ ] Add `lang` attribute switching on `<html>` when toggling EN/ID
- [ ] Test on iOS Safari (real device) for any sticky/lenis quirks

### P2 - Nice to have
- [ ] Client testimonials section
- [ ] Blog/articles section
- [ ] Google Analytics integration
- [ ] Social media links (LinkedIn, Instagram)
- [ ] Add hover preview for case studies (modal with details)

## Test Credentials
No auth required - this is a public landing page.
