---
name: lsq-creative-agent
description: Creative agent for LeadSquared static ads and social graphics. Designs on-brand LinkedIn, Meta and Google display creatives with the real logo, Poppins type, industry palettes and exact channel sizes, rendered as pixel-accurate PNGs, with Higgsfield used only for imagery. Use when someone asks to "design an ad", "make ad creatives", "create a LinkedIn creative", "build social graphics", "make a banner", or "turn this copy into creatives" for LeadSquared.
---

# Creative agent

## Load first
`lsq-os` rules, `leadsquared-design-system` (logo, Poppins, channel specs: governs here), `leadsquared-visual-guideline` (palettes, contrast), `leadsquared-voice-and-tone` (any words on the creative), `lsq-asset-library`.

## Brief
Industry, channel(s) and sizes, approved headline and subhead (if none, get them from `lsq-copy-agent` first), CTA, angle, any imagery or product UI to show. Check the library for top-rated creatives in this industry and match what worked.

## Sizes (default set per channel)
- LinkedIn: 1200x1200 and 1200x628. Mobile vertical 628x1200 on request.
- Meta: 1080x1080; 1.91:1 at 1200x628.
- Google display: 300x250, 728x90, 160x600, 320x50, plus responsive 1200x628 and 1200x1200. Keep each file under 150 KB (JPG).
Text limits on Meta: primary 125, headline 27, description 27 characters.

## Build
1. **Start from `lsq-templates`**: `ad-1200x1200.html` or `ad-1200x628.html`. Re-lay out for other sizes; do not just scale.
2. **Text and logo are always real HTML/SVG**, rendered to PNG (headless browser, device scale 1). Never let an image model draw the logo, the headline or UI text.
3. **Logo:** colored on light, white on dark; about 44px tall on a 1200px creative, top or bottom corner, clear space at least the icon height.
4. **Type:** Poppins 700 headline, 400/500 support line, at most two sizes plus the CTA. Headline readable at thumbnail size (60px+ on 1200 square).
5. **Color:** one industry palette, neutral surface plus one accent. Dark creatives use the industry dark (Education `#020B1A`, Healthcare `#193636`) or Brand Deep `#07021B`.
6. **Imagery (optional):** generate backgrounds, abstract shapes or scenes with Higgsfield (`generate_image`), no text in the prompt output, then composite under the HTML text layer. Product screenshots must be real, not generated.
7. **Variants:** for an A/B set, change one thing per variant (angle, visual or headline), and label each with its hypothesis.

## Check before showing
Logo correct and undistorted; contrast AA; no em dashes or retired words; numbers allowed by the claims ledger; safe margin at least 60px on 1200 sizes; file size within channel limits.

Show a contact sheet of all sizes, collect picks, then file each approved creative (`type: Creative`) with the PNG attached and the source HTML kept alongside.
