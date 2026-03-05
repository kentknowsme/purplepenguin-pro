# Purple Penguin Properties LLC

Safe, affordable, and reliable housing in West Valley City, Utah.
**Site:** https://purplepenguin.pro | **Email:** manager@purplepenguin.pro

---

## Stack

| Layer    | Technology                                 |
|----------|--------------------------------------------|
| HTML/CSS | Bootstrap 5.3, custom CSS (styles.css)     |
| JS       | Vue 3 (CDN global build)                   |
| Fonts    | Varela Round, Nunito via fonts.bunny.net   |
| Icons    | Font Awesome 4.7                           |
| Forms    | Formspree (endpoint: mpqjkvzy)             |
| Hosting  | Cloudflare Pages                           |

## Accessibility

WCAG 2.2 AA / ADA / Section 508 compliant:
- Skip navigation link
- ARIA landmarks, labelledby, aria-current, aria-required, aria-describedby
- Client-side validation with focus management
- Contrast ratios ≥ 4.5:1 for all body text
- All decorative icons aria-hidden

## Deployment — Cloudflare Pages

1. Push repo to GitHub.
2. Cloudflare Dashboard → Pages → Connect to Git → select repo.
3. Build settings: **Framework preset: None**, **Build command: (blank)**, **Output directory: /**.
4. Deploy. Custom domain: Settings → Custom Domains → `purplepenguin.pro`.
5. Cloudflare handles TLS automatically.

## Local Development
```bash
# Python 3 — simple static server
python3 -m http.server 8080
# or
npx serve .
```

Open `http://localhost:8080`.

## Contact Form

Formspree endpoint `mpqjkvzy` is configured in `scripts.js → submitForm()`.
Submissions route to manager@purplepenguin.pro. Log into formspree.io to manage
spam filters, auto-replies, and submission history.

## Assets

- `ppp-clear.png` — logo, transparent background (purple)
- CSS `filter: brightness(0) invert(1)` renders it white on the dark navbar
- Images via Unsplash (free to use, credited in footer)
- Logo design: Adrian Young

## License

Copyright © 2025–present Purple Penguin Properties LLC. All rights reserved.