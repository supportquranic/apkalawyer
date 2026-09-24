# ApkaLawyer Progressive Web App (PWA) Specification

## 1. Overview
ApkaLawyer is architected as an installable Progressive Web Application (PWA). It provides an app-like native experience on Android, iOS, Windows, and macOS without requiring app store installation.

## 2. Multi-Platform Targets
1. **Desktop Browsers (Chrome, Edge, Safari, Firefox)**: Standard responsive web application.
2. **Mobile Browsers (iOS Safari, Android Chrome)**: Optimized touch targets, swipe interactions, and safe-area insets.
3. **Installed Mobile/Desktop PWA**:
   - Launches in standalone mode without browser address bars.
   - Dedicated launcher icon and splash branding.
   - Preserved session tokens and offline resilience.

## 3. PWA Assets & Configuration
- **Web App Manifest**: `public/manifest.webmanifest`
  - `start_url`: `/`
  - `display`: `standalone`
  - `theme_color`: `#0f172a` (Slate-900)
  - `background_color`: `#0f172a`
- **Icon Set**: Multi-resolution icons (SVG, 192x192, 512x512) with `maskable` support.

## 4. Progressive Enhancement Roadmap
- **Phase 0/1**: Manifest registration, responsive viewport meta tags, Apple touch icon integration, install prompt readiness.
- **Phase 2+**: Workbox service worker caching strategy:
  - Cache-first for static fonts and branding assets.
  - Network-first with fallback for lawyer directory and hearing schedules.
  - Background sync for offline draft creation.
  - Web Push Notifications for upcoming cause list hearings and new client consultation bookings.
