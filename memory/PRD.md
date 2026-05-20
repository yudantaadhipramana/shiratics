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

## Implemented Features (as of 2025-01-20)

### Sections
1. **Navbar** - Sticky, transparent → glass on scroll, EN/ID language toggle, mobile hamburger
2. **Hero Section** - Animated Data Core Sphere (Canvas2D), KPI floating cards, CTA buttons
3. **Scroll Story** - Sticky scroll animation: Chaos → Integration → Intelligence → Decision
4. **Trust Metrics** - Animated counters (5+, 300+, 750+, 23, 100M+, National)
5. **Services Section** - 7-service bento grid (BI, Data Eng, AI Workflow, Dashboard Dev, Market Intel, Automation, Enterprise Analytics)
6. **Case Studies** - 5 cards in 3+2 bento layout
7. **Founder Section** - Yudanta + Zainuddin photos with bio/achievements
8. **Contact Section** - WhatsApp, Email, Calendar booking cards
9. **Footer** - Logo, navigation, contact info
10. **Floating Action Buttons** - WhatsApp + Book Meeting FAB

### Language Support
- EN (English) - default
- ID (Indonesian) - toggle via EN|ID button

### Contact Integration
- WhatsApp: +6285117577707 (wa.me/6285117577707)
- Alternative: https://s.id/konsultasi-data
- Email: lensadata.id@gmail.com

### Key Technical Details
- Canvas2D animation for the Data Core Sphere (replaces R3F for Emergent compatibility)
- Framer Motion for scroll animations and entrance effects
- Lenis smooth scroll
- Intersection Observer for counter animations
- Responsive design (mobile-first)

## Assets
- Logo (Negative): https://customer-assets.emergentagent.com/job_data-core-sphere/artifacts/zvm3srae_LensaData%20Logo%2001%20-%20Negative.png
- Logo (White): https://customer-assets.emergentagent.com/job_data-core-sphere/artifacts/i30zm9vo_LensaData%20Logo%2002%20-%20Positive%20White.png
- Founder Photo (Danta): https://customer-assets.emergentagent.com/job_data-core-sphere/artifacts/sh5f7uo6_Akselo%20Founder%20-%20DANTA%20%28Fin%29.jpg
- Co-Founder Photo (Zayn): https://customer-assets.emergentagent.com/job_data-core-sphere/artifacts/bi9y4y54_Akselo%20Founder%20-%20ZAYN%20%28Fin%29.jpg

## Backlog / Next Action Items

### P0 - Critical (To be done in next iteration)
- [x] Real case study images from user (dashboard screenshots) — DONE 2025-01-20
- [ ] Cal.com integration with actual username once account is set up
- [ ] SEO meta tags in public/index.html

### P1 - Important
- [ ] Scroll Story animation refinement (stage visuals more detailed)
- [ ] Mobile optimization testing
- [ ] Page performance optimization (lazy loading images)
- [ ] Add real dashboard screenshots to case studies

### P2 - Nice to have
- [ ] Add video or GIF to hero/scroll story
- [ ] Client testimonials section
- [ ] Blog/articles section
- [ ] Google Analytics integration
- [ ] Social media links (LinkedIn, Instagram)

## Test Credentials
No auth required - this is a public landing page.
