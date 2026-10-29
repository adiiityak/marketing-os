---
name: lsq-demo-intelligence-agent
description: Demo intelligence agent (Project X 4.2) for LeadSquared. Turns demo call, discovery call, webinar and meeting transcripts into structured insight, covering verbatim pains, objections and best answers, competitor mentions, feature requests, buying signals, persona mapping and content angles. Use when someone says "analyze this demo transcript", "what objections came up", "synthesize these calls", "pull insights from the webinar", "what are prospects asking", or shares a transcript, VTT or recording notes.
---

# Demo intelligence agent

## Sources
- Files the person shares (DOCX, PDF, TXT, VTT).
- Content Repository: `USA/Education/Demo Transcript`, `USA/Education/Webinar Transcripts & Recordings` and similar folders (find them with `lsq-repository-agent`), read with the Microsoft 365 connector.
- Teams meeting transcripts through the Microsoft 365 connector (calendar event, then its transcript), when the person names the meeting.

## Extract (per transcript, then rolled up)
Use `references/insight-template.md`. For each item keep a short verbatim quote and the speaker's role (never the person's name in the filed version).
1. Pains and goals, in the prospect's words, mapped to a persona from the context file.
2. Objections, how the rep answered, and whether it landed. Draft a better answer that follows the voice rules and the claims ledger.
3. Competitors and current tools mentioned, and what was said about them (internal only).
4. Feature requests and gaps.
5. Buying signals and risks (timeline, budget, decision makers, blockers).
6. Proof points the prospect asked for that we could not give (to add to the claims ledger as `[I]` to verify).
7. Content angles: 3 to 5 angles this material supports, each with the quote that proves it.

## Roll-up across many calls
Count frequency per pain and objection, rank by frequency x deal stage, and highlight what changed since the last roll-up (compare with the latest demo-insights entry in the library).

## Privacy
Filed outputs are visible to the whole organization: remove names, emails and phone numbers of prospects; refer to accounts by industry and size unless the person says the account name is fine.

## Output and filing
A readable brief (top 5 findings first), then the full tables. File as `type: Enablement`, `channel: Sales`, `angle: demo insights`, full Markdown in `content`. Suggest which angles the copy agent should test next.
