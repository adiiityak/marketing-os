---
name: lsq-templates
description: On-brand LeadSquared starting files with the real logo built in - landing page, one-pager, two-page case study, marketing email, 1200x1200 and 1200x628 static ads (light and dark, per industry), a 10-slide sales deck (.pptx) and the logo files (SVG and PNG, colored and white). Use when someone asks for "a template", "start from our landing page / one-pager / case study / email / ad / deck template", "the LeadSquared logo file", or when another LeadSquared agent needs a starting layout.
---

# LeadSquared templates

Every file in `assets/` is a starting point that already follows the brand rules. Copy it, fill the `[bracketed]` slots, and never change the brand layer (logo, brand blue `#0040DF` CTAs, `#0A0A0A` footer).

| File | Use for | Format notes |
|---|---|---|
| `assets/landing-page.html` | Landing, industry and campaign pages | Inter. Set `data-industry` on `<body>`: `education`, `healthcare`, `lending`, `home`. Sections: nav, hero, logos, problem + 3 capabilities, how it works, stats, quote, CTA band, footer. Responsive. |
| `assets/one-pager.html` | Solution or product one-pagers | US Letter, one page. Print to PDF with margins "None". |
| `assets/case-study.html` | Customer stories | US Letter, two pages: results strip, facts sidebar, challenge, solution, results, what's next. |
| `assets/email.html` | Campaign, webinar, nurture emails | 600px, table based, Arial, inline styles. Replace the data-URI logos with hosted PNG URLs before sending. |
| `assets/ad-square.html` | LinkedIn and Meta feed, 1200x1200 | Poppins. On `.ad` set class `light` or `dark` and `data-industry`. Logo swaps automatically (colored on light, white on dark). |
| `assets/ad-landscape.html` | LinkedIn single image, Meta link, Display, 1200x628 | Same controls as the square ad. |
| `assets/sales-deck.pptx` | Prospect decks (used by `lsq-sales-deck-agent`) | 16:9, Arial, 10 slides: title, agenda, what we heard, gaps, solution, product, results, quote, next steps, thank you. Speaker notes say what goes where. |
| `assets/logo-color.svg` / `.png` | Logo on white or light backgrounds | Real file. Never redraw, recolor, stretch or add effects. |
| `assets/logo-white.svg` / `.png` | Logo on dark or colored backgrounds | Real file. Same rules. |

## How to use
1. Load `lsq-os` rules and the brand skills for the asset type (copy: `leadsquared-voice-and-tone`; visuals: `leadsquared-visual-guideline` and `leadsquared-design-system`).
2. Copy the template into the working folder. Do not edit the copy in `assets/`.
3. Set the industry and theme switches. The palettes are built in:
   - Education `#106DFD` on `#020B1A`, tint `#E4F0FF`
   - Healthcare `#3D8181` on `#193636`, tint `#F4ECD4`
   - Lending / BFSI `#277627` on `#0D1309`, tint `#F1F8EC`
   - Home / brand `#0040DF` on `#07021B`, tint `#ECEBF3`
4. Fill every `[slot]`. Remove any section you have no real content for rather than leaving placeholder text. Only `[V]` claims; never invent quotes, logos or customers.
5. Search the finished file for `[` before handing it over. No slot may remain.
6. Render to check:
   - HTML pages: screenshot at 1280 and 390 wide. Check there is no horizontal scroll at 390.
   - Ads: screenshot the `.ad` element at exact size (Playwright `locator('.ad').screenshot()`).
   - One-pager and case study: print to PDF and confirm nothing overflows the page.
   - Deck: convert to PDF (`soffice --headless --convert-to pdf`) and look at every slide.
7. Fonts: the HTML templates load Inter and Poppins from Google Fonts. If rendering offline, install them locally first or the fallback (Arial) will be used.
8. Run `lsq-brand-reviewer`, then file the result through `lsq-asset-library`.

## Adding a new template
Build it from an existing one so the brand layer stays identical, add a row to the table above, and file a copy in the Asset Library under Shared > Templates.
