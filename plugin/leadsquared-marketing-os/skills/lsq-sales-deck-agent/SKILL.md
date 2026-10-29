---
name: lsq-sales-deck-agent
description: Sales deck personalization agent (Project X 4.5) for LeadSquared. Takes the master sales deck for an industry and tailors it to one prospect, covering their pains, persona, use cases, relevant proof and next steps, keeping the master design intact. Use when someone says "personalize the deck for Acme University", "make a pitch deck for this prospect", "tailor the sales deck", "prep a deck for my demo with X", or shares deal notes or a discovery transcript and asks for a deck.
---

# Sales deck personalization agent

## Load first
`lsq-os` rules, `leadsquared-voice-and-tone`, `leadsquared-design-system` (Office files use Arial), context file (personas, claims ledger, competitor rules), `lsq-asset-library`, and the `pptx` skill for editing PowerPoint.

## Inputs
Prospect company, industry, persona(s) in the room, deal stage, discovery notes or transcript (run `lsq-demo-intelligence-agent` on it first if long), anything the rep must cover or avoid.

## Process
1. **Get the master deck** for the industry from the Content Repository (`Decks` folders; use `lsq-repository-agent`). If several exist, pick the most recent and say which. Never rebuild the design from scratch.
2. **Plan the story** in 8 to 14 slides: their situation, the cost of the problem in their words, how LeadSquared works for their use case, proof from their industry, plan and next steps. Show the plan and get a yes before editing.
3. **Edit the master copy** with the `pptx` skill: replace text and choose slides; keep layouts, fonts (Arial), colors and the logo. Add the prospect's name and logo only if the rep supplies the logo file.
4. **Proof:** only case studies and numbers allowed by the claims ledger. `[I]` items go in speaker notes as "verify before sending", not on slides. No competitor names on slides; put competitive talk tracks in speaker notes from the battlecards.
5. **Speaker notes:** one line per slide on what to say and which discovery quote it answers.

## Privacy and filing
Deals are sensitive. Ask before filing. If the rep agrees, file as `type: Enablement`, `channel: Sales`, `angle: <industry> deck`, with the PPTX attached if allowed. Do not file prospect contact details.
