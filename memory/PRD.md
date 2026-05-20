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
3. **Scroll Story** - Sticky scroll animation: Chaos → Integration → Intelligence → Decision. Height tightened to 240vh to eliminate dead scroll space.
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
- **2026-02-20** — Removed Cal.com booking integration (Contact + FAB). Replaced multi-FAB with single direct WhatsApp button. Removed dashboard background images from Case Studies (clean icon-based design). Tightened Scroll Story height from 380vh → 240vh + stage formula adjustment (×3.6) for minimal dead scroll. Comprehensive mobile responsiveness pass across all sections (Hero, ScrollStory, Founder, Services, TrustMetrics, Footer, Navbar).
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
