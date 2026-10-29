# Product marketing context — LeadSquared, US Education

Persistent context for AI agents working on LeadSquared education marketing. The `ad-creative`,
`copywriting`, `ads`, and `cold-email` skills all check for this file first. Keeping it current
means a session starts grounded instead of excavating SharePoint.

Last updated: 25 Sep 2026 · Maintainer: Aditya Kanojiya

---

## 1. What we sell, to whom

A CRM and marketing automation platform built for education. The job it does: capture inbound
student inquiries, score and route them, automate follow-up, and track the applicant through to
enrollment.

**Default market:** United States. US English, US market context, unless another region is named.

**Segments** (as the Content Repository organises them):

| Segment | Notes |
|---|---|
| Career schools / vocational training | Rolling or multiple intakes per year. Short enrollment cycles. Primary US education focus. |
| Higher education | Colleges and universities. Longer cycles, committee buying. |
| Healthcare training | Overlaps Healthcare segment (behavioral health, ultrasound, allied health). |
| India market | EV, Manufacturing, and other verticals. Separate positioning. |

---

## 2. Personas and their stated pains

Verbatim from `Education Persona Matrix.xlsx`. Use their words, not ours.

| Persona | Role | Their pain, in their words |
|---|---|---|
| CEO | Decision maker | "Increasing the number of leads to enrolled students." "Meeting revenue targets." "Losing valuable leads due to slow response times." |
| CIO / Head of IT | Decision maker | "Connecting new tools with my existing tech stack." "Lack of resources for administrative time." "Not having the ability to customize software to our specific use cases." |
| VP / Head of Admissions | Decision maker / influencer | "We're not acting on inbound leads in a timely manner." "Registration data exists across an array of different spreadsheets." "Costly and inefficient methods for responding to applications." |
| VP / Head of Marketing | Decision maker / influencer | "No visibility over the effectiveness of different channels and campaigns." "Retaining students with greater competition." "Managing and utilizing student data." |
| Admissions / Marketing Manager | Influencer | "Meeting increasing enrollment targets with the same resource budget." "We're often overrun with new leads, without a way to prioritize or act on them at scale." |

**The single most ownable pain** (appears as a scripted cold-call play, and maps directly to a
verified competitor weakness): *"When they want to make changes to the workflow or add
automation, it's this big long process where they have to go through IT."*

Recurring secondary themes: student diversity goals, growing online-learner numbers, and
"students applying to up to a dozen schools."

---

## 3. Claims ledger

**This is the most important section.** Every number we use, and whether it can be defended.
`[V]` verified against a public primary source · `[I]` internal, unverified · `[X]` do not use.

| Claim | Status | Notes |
|---|---|---|
| Salesforce Education Cloud Enterprise $81.25/user/mo | `[V]` | salesforce.com/education/cloud, Aug 2026 |
| Salesforce Education Cloud Unlimited $138.75/user/mo | `[V]` | Same source |
| Salesforce rebranded to Agentforce Education | `[V]` | G2 listing, Salesforce site |
| 12x speed-to-lead increase | `[I]` | Appears 4× in the persona matrix, so it is established internally. Still no cited source. **Best available stat we have.** |
| 60–70% of workflows self-configurable by non-technical admins | `[I]` | From the Salesforce battlecard |
| Deployment in 2–6 weeks, no external consultants | `[I]` | From the battlecard. Get real numbers from win/loss records. |
| 1000 schools across 18 countries | `[I]` **conflict** | Persona matrix, CIO and Head of IT rows |
| Over 500 schools across 18 countries | `[I]` **conflict** | Same workbook, different sheet. **These contradict each other. Resolve before either is used.** |
| 13+ years, 1100+ employees, 6 countries, $153M Series C | `[I]` | Behavioral Health pitch deck |
| 2,000 customers / 200,000 users | `[I]` | Verify before quoting |
| 6% contact rate without lead scoring | `[I]` | On live ad creative. Framed there as "institute with no lead scoring." Not a benchmark. |
| 72% inquiry-to-enrollment rate | `[X]` | On live creative, attributed only to "reported by clients." Unusable in competitive or paid contexts until sourced. |
| 42.5% improvement in staff operational efficiency | `[X]` | Same problem. |
| 5-year TCO 30–40% lower than Salesforce | `[X]` | Was modeled against the wrong Salesforce SKU. Invalid until rebuilt against $81.25. |
| "0% churn" across EDU users | `[X]` | Unverifiable absolute. One known churned account destroys the rep. |
| "90% of Salesforce's power at a fraction of the cost" | `[X]` | No source, and it concedes we are 10% worse. |

**Standing rule:** no invented claims, stats, or testimonials, ever. If a number is `[X]`, run
the angle without it — several angles work stat-free.

---

## 4. Named references

| Reference | Segment | Source |
|---|---|---|
| Stephanie Heaton, Admissions Director, Sacramento Ultrasound Institute | Career school / allied health | Live testimonial creative. **Best-fit reference for career-school audiences.** |
| Caleb Hiddleston, Director of Global Operations, Miscio — "10X their own capacity" | Segment unconfirmed | Live testimonial creative. Confirm Miscio reads as a career school before using it with that audience. |
| Posterity Health — 7x revenue growth | Healthcare | Published case study on leadsquared.com |
| Brookline College · Asher College · Unitek Learning | Career schools | Named as comparable accounts in the persona matrix pitch templates. Confirm reference permission before using in paid creative. |

---

## 5. Competitors

| Competitor | Our angle |
|---|---|
| **Salesforce / Agentforce Education** | Do not lead on list price: their education SKU is $81.25, below ours. Compete on time-to-value, self-sufficiency, and total cost including implementation and admin. They now ship named recruitment agents, so "they only store records" is no longer true. |
| **TargetX** | Salesforce-based. Same admin-dependency and implementation-length arguments apply. |
| **Slate** | Per the persona matrix: schools report needing 2–3 people to manage operations, plus continuous maintenance expense. |
| **Jenzabar** | An SIS, not a CRM competitor. We integrate. |

**Brand rule:** never name a competitor in outward-facing copy unless explicitly instructed.
A generic category contrast ("most CRMs are built around the student record") is acceptable.
Battlecards and internal enablement are exempt.

---

## 5b. Logo

Official SVGs live at `LSQ-OS-Outputs/lsq logo/`:

| File | Use on |
|---|---|
| `lsq vector colored logo.svg` | Light surfaces. Icon `#0C9AFC`, wordmark `#0C293D`. This is Color Positive. |
| `lsq vector white logo.svg` | Dark surfaces. All white. This is Color Reverse. |

Native ratio **863:159 (5.428:1)**. Scale by height and let width follow, never distort.
Do not recreate the mark in CSS or reach for a placeholder: both real files are on disk, and
embedding them as base64 data URIs keeps a template self-contained for artifact publishing.

Working sizes used so far: 44px height on 1200×1200 ad creative, 24px height on a document header.

## 6. Voice constraints

Governed by the `leadsquared-voice-and-tone` skill — **load it, do not work from memory.**
The short version:

- No em dashes, anywhere. Split the sentence or use a colon.
- No "Not this. Not that. But this." and no "it's not just X, it's Y."
- Retired words include: seamless, robust, leverage, unlock, elevate, supercharge, transform,
  empower, delight, effortless, frictionless, one-stop, best-in-class, world-class, game-changer.
- Headlines: sentence case, one idea, no end punctuation.
- Problem first, concrete outcome next. Write to a senior peer, not a prospect.

**Known issue:** the persona matrix and the existing Ad Set 2 copy both predate the current voice
guide and violate it repeatedly (`supercharge`, `seamless`, the negation pattern). Reps paraphrase
from those documents on live calls. They need a copy pass.

---

## 7. Where things live

Canonical locations, with IDs so a session does not have to search.

**SharePoint Content Repository** — Shivanshi Dash's OneDrive → `Documents/Content Repository`
Drive ID: `b!TQlnGWpH20Cq3U-lE-j98Ht4VqnhXhBBgVcoJ1QR1g2qBrdtCXPXSJTNPbIuftyd`

| Path | Item ID |
|---|---|
| Root | `01XWPYNAL7CW3VKI7MKZHJEHRSRSVH6RY2` |
| USA | `01XWPYNAIURWLYYK4I7JBYW5IQ6JPW4T72` |
| USA / Education (17.5 GB) | `01XWPYNAJJHDFC5H6NSBC23XWIPWW5RWZW` |
| USA / ELEVATE (8.9 GB) | `01XWPYNALPEIUXVSLBRNEKDIXBYQU37AZL` |
| USA / Healthcare (1.9 GB) | `01XWPYNAKPUA552QPAZNFLBR6MAIUADHTN` |

**Other key assets**

- `Education Persona Matrix.xlsx` — USMarketingDepartment / Shared Documents / Market Overview / Education. The best single grounding document for education copy.
- `Ad Set 2 for Career Schools` (folder + sibling .docx) — Content Repository / USA / Education / Ads
- `SFDC Battlecard (1).pdf` — Content Repository / USA / Education / Battlecards. **This is the education battlecard despite the filename.**

**Known repository problems**

1. It lives in a personal OneDrive, not a team site. Access depends on one person's account.
2. Filenames frequently do not describe content. One ad creative still carries its Canva
   template name; another is named "Marketing and admissions" but contains no such content.
3. Many `.url` shortcuts point to public web pages rather than holding files.
4. Empty folder shells exist (FinFlo, LOS, parts of Notespark).
5. Four near-duplicate Salesforce battlecards across three personal OneDrives.

---

## 7b. Rating feedback loop — read this before creating any new asset

**Asset Library:** https://claude.ai/artifact/VjBC3ApxjuPr8V8vKYSaAx

Every asset built for this programme is listed there with a 0-5 star rating and a note.
The ratings are stored in the artifact's database, which means a session can read them.

**Before writing new copy or creative, read what scored:**

    ArtifactData  action="query"  collection="assets"
                  url="https://claude.ai/artifact/VjBC3ApxjuPr8V8vKYSaAx"
                  query={"where": [["rating", ">=", 4]]}

Each row carries `title`, `type`, `segment`, `channel`, `angle`, `created`, `rating`,
`note`, `ratedAt`.

**How to act on it**

| Signal | What to do |
|---|---|
| Angle rated 4 or 5 | Extend it. Keep the angle, vary the execution and the format. |
| Angle rated 1 or 2 | Retired. Do not re-pitch it without a reason that is stated. |
| The `note` field | Worth more than the star. It says *why*, which is what transfers to the next asset. |
| Rating 0 | Not evidence either way. Unrated is not the same as rejected. |

**After building something new, add it to the library** so the next session can see it:

    ArtifactData  action="set"  collection="assets"  doc_id="<slug>"
                  data={title, type, segment, subfolder: null, channel, angle, created, path,
                        createdBy, createdByName, file, rating: 0, note: "", ratedAt: null}

**Who made it and the file itself.** Every asset shows "Created by <name>" and can be opened
or downloaded by anyone who can open the library, so fill both in:

- `createdBy`: the id of the person you are working for. Find it with `ArtifactData
  action="list" collection="members"` and match their name; `createdByName`: their name as
  they gave it, used if no id matches.
- `file`: upload the finished file to the library's file store, then record it:
  `Artifact action="publish" url=<library url> asset=true file_path=<file>` returns an id;
  store `{id, name, type, size}`. Images, PDF, Markdown and plain text are accepted (20 MB).
  Uploading needs edit access to the library. If the upload is refused (most teammates are
  Contributors), still add the asset without `file` and tell the person an Editor can attach
  it from the asset's detail panel with **Attach file**.

For an industry-specific brief, narrow the read to that industry first, e.g.
`query={"where": [["segment", "==", "Healthcare"], ["rating", ">=", 4]]}`, then widen to all
industries if it comes back empty. Ratings only count once the viewer presses Submit, so
anything in the database is a deliberate judgment, not a stray click.

**Folder structure.** The library files every asset as *industry folder → type subfolder*.
The folder is decided by the `segment` value, so spell it exactly:

| `segment` value | Folder in the library |
|---|---|
| `Education` | Industries / Education |
| `Healthcare` | Industries / Healthcare |
| `Fintech / BFSI` | Industries / Fintech / BFSI (lending, insurance, banking; empty so far) |
| `Cross-segment` | Shared / Cross-industry (setup, governance, reference docs) |
| anything else | Gets its own new industry folder automatically, e.g. `Real estate` |

Type subfolders, one per `type` value: `Creative`, `Copy`, `Enablement`, `Doc` (shown as Docs).

**Folders people create.** Anyone with edit access can create folders, nest them up to four
levels deep (industry > folder > folder > folder, e.g. Manufacturing > Distribution Engine >
Copy > Battlecard) and move assets between them. Read the folder list before filing anything:

    ArtifactData  action="list"  collection="folders"  url="https://claude.ai/artifact/VjBC3ApxjuPr8V8vKYSaAx"

Current folder doc shape: `{name, industry, parent, created}`.

- `industry: null, parent: null`: a **new industry folder**. Its `name` is the `segment`
  value to write on assets that belong there. Its industry key is `x_<name in snake_case>`.
- `industry: "<key>"`: a folder inside that industry (`education`, `healthcare`, `fintech`,
  `shared`, or `x_...`). `parent` says where: `null` = directly in the industry,
  `"t:Copy"` (or `t:Creative`, `t:Enablement`, `t:Doc`) = inside that type folder, or another
  folder's id = nested inside it.
- Older docs have no `industry` field: `{name, parent: null}` is an industry folder and
  `{name, parent: "<industry key>"}` is a folder directly in that industry.

To file an asset in a custom folder, set its `segment` to the industry and its `subfolder` to
the folder doc's id. If that folder sits under a type folder, also set `type` to match. Leave
`subfolder: null` to file it in its own type folder. Treat an asset's current location as the
team's decision: if someone moved it, do not move it back when re-adding it.

**Deleted assets.** People can delete assets from the library. If something Claude built is
no longer listed, assume it was removed on purpose: do not re-add it unless asked, and do not
treat its absence as a rating either way.

**Team and roles.** People join the library with a name, the industry they work on, and a
requested role. Profiles live in `members` (doc id = the person's id) and approved roles in
`roles`, which only editors can write. Only approved Contributors and editors can rate; only
editors can create folders, move or delete. Claude never writes `members` or `roles`. When a
teammate asks for work, their `members` entry lists the industries they cover (`industries`,
an array; older entries have a single `industry` string), which is a good default for which
folders and ratings to read first.
Angles so far: `speed to lead`, `IT bottleneck`, `referrals and intake`, `multi-angle set`,
`competitive and TCO`, `setup and governance`.

**Standing caveat.** These are editorial judgments, not performance. No campaign in the
library has a CTR, cost per lead, or conversion rate attached to it. The moment real numbers
exist they outrank every star on that page. Until then a rating is the only signal there is,
which is still better than the nothing earlier sessions worked from.

## 8. What we do not have

Being explicit about the gaps, so a session does not mistake absence for nothing-to-find.

- **No performance data.** No CTR, CPA, conversion rate, or ROAS for any campaign has been
  available to any session. Angle selection is therefore reasoned judgment, not evidence.
  Mode 2 of `ad-creative` (iterate from performance data) has never been usable.
- **No customer reviews corpus.** No G2, Capterra, or TrustRadius pull.
- **No ad comments.** The highest-value grounding input per the skill, entirely absent.
- **No documented September 2026 campaign.** Event schedules in SharePoint are from 2024.
