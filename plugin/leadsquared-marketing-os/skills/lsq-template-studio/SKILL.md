---
name: lsq-template-studio
description: Build LeadSquared webinar banners, social posts and event creatives from the team's Figma templates, make a V2 of a template, or design a new template. Use for briefs copied from the Template Studio (they start with "Use the lsq-template-studio skill"), and for requests like "make a webinar banner", "LinkedIn post for our webinar with these speakers", "event creative for CCST", "V2 of this template", or "push this design to Figma".
---

# Template Studio

The Studio lives on the Create page of the Asset Library (https://claude.ai/artifact/VjBC3ApxjuPr8V8vKYSaAx#studio). People fill a template there and get a PNG or an editable Figma frame without you. You handle what the page cannot: V2 variants, new templates, and anything needing judgement.

Follow `lsq-os` first (brand skills, claims, library and feedback, Figma rules).

## 1. Read the brief and the feedback

- The brief names the template id, the read-only source frame, the Figma output file, the content and any direction.
- Load the feedback log (`lsq-asset-library`, "Before you start", steps 4 and 5). Comments with `tpl` equal to the template id come first, then the same industry, then general creative notes. The brief already lists the newest ones; re-read the log in case more arrived.
- Start your answer with the comments you are applying.

## 2. Study the source frame (read only)

`get_screenshot` and `get_design_context` on the source frame. Note the grid, type sizes, colours, spacing and where the speaker sits. Never write to the team's files.

## 3. Build

- **Use this template**: the person can do it in the Studio. If they ask you, build it in HTML at the template size with the Studio's template module (`references/templates.md`), render it with Playwright, and give them the PNG.
- **V2**: keep the family (logo placement, type, palette, speaker treatment) and change what the direction asks for: background, layout shift, accent, crop. Make 2 or 3 options.
- **Totally new**: build from `leadsquared-design-system` and `leadsquared-visual-guideline` for the channel size. Make 2 or 3 options.
- **Speaker photos**: the team prefers cut-out speakers with no photo background (reference: Bambi Frazier square post, node 2121:8163). Remove backgrounds before placing photos; keep shoulders anchored to the bottom edge; never stretch a face.
- Real logos only: LeadSquared logo from `lsq-templates/assets/`, partner and company logos as provided.
- Text must fit: no clipping, two to three lines for titles, consistent date and time formats.

## 4. Put it in Figma (output project only)

Add the approved design as a new frame in the matching file of the "LSQ OS Generated Output" project (`references/figma-output.md`), on the page for the month (`YYYY-MM`), right of the existing frames. Name it `YYYY-MM-DD · <title> · <requester> · <template id or "new">`. Use real text layers (Poppins/Inter), frames for shapes and image fills for photos, so people can edit it. The Studio's "Push to Figma (editable)" button does this the same way.

If a new asset type has no file yet, create one in the project with `create_new_file` and add it to `references/figma-output.md`.

## 5. File it

File the PNG in the Asset Library (`lsq-asset-library`, "After you finish") with `type: Creative`, the industry folder, and the brief in `content` including its `Template: <id>` line, so ratings on it feed back into this template.

## Template format

New templates for the Studio follow `references/template-format.md`: a module with fields, speakers, CSS and Mustache-style HTML at the exact frame size. Send new template modules to the Studio maintainer (the Asset Library owner) to add to the gallery.
