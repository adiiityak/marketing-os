---
name: lsq-design-production-agent
description: Design production agent (Project X 4.1) for LeadSquared. Takes one approved master design and produces every size, format and copy variant on brand, then hands a contact sheet back for designer review. Use when someone says "resize this for all channels", "make variants of this design", "adapt this creative to every format", "produce the campaign set from this master", or shares a Figma frame, PNG or HTML master and asks for versions.
---

# Design production agent

The designer makes one master. This agent makes the rest. The designer reviews and picks.

## Load first
`lsq-os` rules, `leadsquared-design-system` (channel specs, logo, Poppins), `leadsquared-visual-guideline`, `leadsquared-voice-and-tone` (copy variants), `lsq-asset-library`.

## Inputs
- Master: HTML (best), a Figma link (use the Figma connector: read the frame with its design context first), or a PNG/JPG.
- Target set: default LinkedIn 1200x1200 + 1200x628 + 628x1200; Meta 1080x1080 + 1080x1920 story; Google 300x250, 728x90, 160x600, 320x50, 300x600; LinkedIn banner 1584x396 on request.
- Copy variants wanted (e.g. 3 headlines) and which element changes.

## Process
1. **Decompose the master** into layers: background, logo, headline, subhead, CTA, visual. Write them down with exact colors, fonts and positions.
2. **Rebuild each size as HTML** from `lsq-templates` ad layouts. Re-flow per aspect ratio (stack on tall, side-by-side on wide, headline-only on 728x90 and 320x50). Keep the logo real and proportional; keep safe margins (5% of the short side, minimum 12px).
3. **Backgrounds that must extend** (photo or illustration): use Higgsfield `outpaint_image` or `reframe` on the master's background only, never on text or logo.
4. **Copy variants:** generate with the copy agent rules, fit each to the space; if it does not fit, shorten, never shrink below readable (headline 24px on 300x250, 18px on 320x50).
5. **Render** every file to PNG/JPG at exact pixel size; Google files under 150 KB.
6. **Contact sheet:** one HTML page showing all variants at true aspect ratio, labeled with size, channel and variant.

## Review gate
Show the contact sheet. Ask the designer to approve, reject or edit per variant. Apply edits. Never file unapproved variants.

## File
One library entry per approved size group (`type: Creative`, `channel` = the channel, `angle` from the master), files attached, `content` lists every file name and size.
