# Homepage Repositioning Plan

## Goal

Rework the `dodon.ai` homepage so a **warm, referred visitor is routed cleanly instead of being confused by self-serve SaaS framing.**

Consulting/services leads are sourced offline (verbal intros, referrals, meetings, cold outreach). They do not arrive through organic search. When Nick refers them to "the website," they type `dodon.ai` and land on the homepage root, where today they hit a pure product-signup hero that reads as a self-serve document-processing app, not an AI partner that will build and run systems for their firm. Handing out a deep link (`/ai-managed-services/`) does not solve this because the referral is usually verbal and people go to the root regardless. **The root itself must do the routing.**

## Evidence (why this is safe)

Pulled from Google Search Console via Ahrefs, trailing 90 days (2026-05-24 to 2026-08-24), project 5634318.

**The homepage is a branded front door, not a discovery page.**

- Homepage `/` took **217 organic clicks**, ~80% of all organic clicks to the site.
- Of those homepage clicks, **~99% are branded/navigational queries** the visitor already knew to type:

  | Query | Clicks |
  |---|---|
  | dodonai | 167 |
  | dodon ai | 31 |
  | dodon.ai | 5 |
  | dondai ai / dodon / dodoai / dodona ai / donde ai (brand misspells) | 13 |
  | "what is this" (junk) | 1 |

- There is **zero non-branded product-discovery traffic on the homepage.** You cannot search "dodon ai" unless you already heard the name. That maps almost perfectly onto the warm/referred audience.
- **Product discovery lands on deep pages, not the homepage**, and it is small and low-ranked: `/deposition-summary-software/` 16 clicks (pos 18), `/pricing/` 9, medical-record-review pages 6 each, everything else <=2. All deep product pages combined ~= 50 clicks / 90 days.

**Implication:** Re-leaning the homepage hero toward the partner/services narrative carries near-zero risk to product discovery, because product discovery does not happen on the homepage. It happens on deep SEO pages, which stay untouched, and branded searches will keep finding the homepage no matter what the hero says. Note this is organic-only; GA4 direct/referral traffic (someone typing the domain off a card or email link) is even more warm-skewed and does not appear here, so the real warm share is higher than 99%.

## Current state (what we are changing)

Homepage source: `src/routes/+page.svelte` (282 lines) + `src/lib/components/hero/HeroSection.svelte`.

Current section order:
1. **Hero** (`HeroSection.svelte`) — SaaS-framed. H1 "AI Legal & Medical Records Processing", cycling service subhead, paragraph about software that automates document analysis, CTAs **"Free Summary"** (-> `app.dodon.ai/signup`) and **"See Pricing"**, SOC-2 + HIPAA trust badges.
2. **Use Cases** header
3. Six product feature blocks: Deposition Summaries, Medical Record Summaries, Transcript Management, AI-Powered OCR, Extract & Draft Agents, E-Discovery
4. **"Beyond the app"** dark CTA card linking to `/ai-managed-services/` — services relegated to one band near the bottom
5. Testimonials, Security, FAQ, closing CTA

So the services story already exists and is deep (the full 56-page `/ai-managed-services/` hub with agent catalog + mega-menu shipped on `feature/ai-services-hub`), but the homepage buries it under six product sections and leads new visitors straight into self-serve signup.

## Reference inputs (advisory)

Three references inform this rework. All three are **advisory, not templates**. We take the strong ideas and re-voice/re-skin to Dodonai; we do not lift copy, stats, or layout wholesale.

### A. Josh's mock (`dodonai-homepage-mock-v8`)

A dark, editorial single-page concept for the consulting side. It is a first stab, but several ideas are genuinely strong and worth keeping as design/content input:

- **"Automation in Practice" theory-vs-practice framing.** Hero: "In theory, AI transforms your firm. In practice, it drafts the demand letter at 5:40 a.m. and waits for you to sign it." This is the single best idea in the mock; it captures the human-in-the-loop moat in one line.
- **The overnight "run log" hero visual.** A timestamped panel of what the agents did before anyone got in (intake triage 04:12, deadline monitor 05:03, demand package 05:40, ... "Awaiting your review"), footed by an animated "6h 40m of work, done before the coffee." This dramatizes scheduled-agents-with-a-human-gate far better than a static screenshot. Strongest single asset to carry forward.
- **Three-phase model:** Blueprint (1-2 wks, flat fee) -> Build (weeks not quarters, fixed fee approved first) -> Managed (retainer, no long-term contract). Clean and true to how consulting actually sells.
- **"What we take off your plate"** by function (intake/growth, deadlines/compliance, casework/drafting, client comms, ops/billing, practice intelligence), each linking to the existing `/ai-managed-services/by-function/` pages. Good bridge from homepage into the existing hub.
- **Fixed-scope "builds/packages"** with durations (Discovery Audit, Firm Wiki/LLM Brain, Discovery Ops Pack, Managing Partner Dashboard, Modern AI Software Stack, Marketing Suite).
- **Human-in-the-loop section** ("The work is automated. The judgment never is.") plus ownership guarantees (you own what we build, you can walk away with source, we never train on your data, no long-term contract).
- **The "And the software" app strip near the bottom** that demotes the SaaS product to a proof point / free-trial CTA instead of leading with it. This is exactly the product-as-proof move we want.

**Caveats (do not ship as-is):** the mock's stats are almost certainly placeholder and must be verified or cut before they go live: "250+ firms", "50+ agents shipped", "8+ hrs reclaimed weekly", "$100k+ recovered per attorney", "~30% lower software spend", and the "Ben, Commercial litigator" quote. House rule: no fabricated or unverified metrics, no superlatives. The ownership/no-train/walk-away guarantees are strong claims that must be literally true before we publish them. Dark/violet/rose palette is a design fork, not a given (see decision 6).

### B. ConductorAI (conductorai.com) — inspiration for design + content

- **Design:** light background with a faint blueprint/dot grid, cobalt-blue accent, near-black bold geometric sans headlines, monospace technical labels ("PROGRESS >>> SEARCH INITIALIZATION... 26%", numbered nodes 0924/0926). An animated **agentic-pipeline diagram**: documents flowing through dashed connectors and decision nodes. Engineered, schematic, "this is real infrastructure" feel.
- **Content:** hero "Decisions in minutes, not months" + outcome subhead; structure is use-cases -> capabilities -> product-UI mockups -> case studies -> investor/partner logos. Voice is short, declarative, domain-specific ("mission speed"). Proof via named backers.
- **Borrow:** the animated pipeline-diagram motif (fits our agents-with-a-gate story), the monospace technical accents, outcome-first headline, credibility-through-specificity.

### C. Varick Agents (varickagents.com) — inspiration for design + content

- **Design:** light/white, very large bold black sans headline, cobalt-blue + navy CTA blocks, a subtle grayscale particle-wave graphic, letter-spaced uppercase monospace nav. Minimal, enterprise, lots of whitespace.
- **Content:** hero "Transform Your Enterprise With AI" + the sharp differentiator subhead ("automate entire departments from the inside, end to end. No generalized software that only does half the job. No 18-month timelines or migrations required."). Structure: contrarian positioning ("We don't just automate tasks, we transform departments") -> 3-step process -> pillars -> industry areas (300+ workflows) -> case studies -> **FAQ** -> final CTA. Metrics framed as speed/lift/scale ("6-12 weeks", "<20 hours of your team's time", "3x the capacity").
- **Borrow:** the comparative/contrarian framing (agents vs. narrow SaaS), the "we embed and map how work actually moves" language, the low-internal-lift + fast-timeline proof, an FAQ section to pre-empt procurement objections, big-bold-sans confidence.

### D. Josh's strategy brain dump (`dodonai-plan (31).html`, "The service" tab)

An internal three-tab strategy doc (The service / The process / Next steps), not a homepage design. It is the most important content input of the four because it settles positioning questions the homepage has to answer. Key material:

- **Hero candidate:** "Agents that never sleep. Owners who finally can."
- **The narrative ladder:** scattered information -> agents doing repeatable work with a person reviewing -> every reviewed run leaves a structured record -> **"institutional intelligence"** -> the **Executive OS** (Review / Attention / Decide panels: "What is ready for me? What needs me? What do we already know?"). This is the strongest articulation yet of the endgame; it upgrades the v8 mock's run-log into a full decision-support story.
- **The honest buying journey:** "Nobody buys institutional intelligence on the first call. They buy a signature-packet builder because the fire drills are killing them." Stage ladder: one painful task -> a whole workflow -> the structured record -> the Executive OS. This should shape the homepage's package/pricing section: lead with the cheap, undeniable first task, not the vision.
- **Transparent pricing architecture:** $5k environment setup; $3k-$7.5k per configured automation *including an 8-week adoption period*; new patterns scoped separately; $300-$600/mo hosting with **API/model cost passed through at cost, no markup**; optional optimization retainer. Also the incentive line: "We are not paid for how much a client spends. We are paid for keeping it running and for driving that number down."
- **Five operating rules** (a person releases everything; they own the work in full source, we run the model-routing harness; never trained on their data; flags rather than guesses; data stays in their own cloud project). These largely answer the plan's earlier "are the guarantees real?" question: Josh frames them as non-negotiable operating rules, not marketing claims. Still needs Nick's explicit sign-off as written commitments.
- **Model-agnostic harness:** "The model should never be the architecture" + the job-routing table. Matches existing Dodonai positioning (model-agnostic) and is a real differentiator worth a homepage section or FAQ answer.
- **"Practice what we preach" sales process:** meeting invite triggers auto-research; a generated one-page brief arrives with the confirmation; discovery transcripts become SOPs; SOPs become the priced build spec. The sales process is itself the demo. Marketing-worthy.
- **No fabricated stats anywhere.** The dump sells with *specificity* (240 questions tied to exhibits, 9 prior files against this carrier, "Illustrative" labels) instead of invented aggregate numbers. This is the model for how the homepage handles proof until real aggregate stats exist, and it resolves the v8 mock's placeholder-stats problem.

**Strategic tension the dump introduces — audience breadth.** The dump is deliberately horizontal: "Every business...", "owners", and its example briefs cover a plaintiff PI firm, an estates practice, a commercial HVAC contractor, a PE fund, and a real estate developer. Its Next-steps tab even lists "forced verticalization" under "Deliberately not yet." But dodon.ai's SEO, product proof, and existing hub are all legal-specific, and the homepage's warm traffic is overwhelmingly legal-vertical referrals today. The homepage cannot be both "for law firms" and "for every business" in one hero. See decision 9.

### Convergence worth noting

Both live inspiration sites are **light, big-bold-sans, cobalt-blue, restrained enterprise-minimal** and both lead **services-first with the product demoted to proof**. Josh's mock reaches the same services-first structure but in a dark/editorial skin. So the *structure* is settled by all three; the *skin* (light-enterprise vs dark-editorial) is the open design fork.

## Recommended approach: services-primary, product as proof

The three references converge on a stronger move than a balanced two-path fork: **make the homepage the consulting/services story, and demote the SaaS product to a single "and the software" proof strip near the bottom** (the Josh/Varick pattern). The GSC evidence supports this fully: the homepage's warm, ~99%-branded traffic is the services audience, and product discovery already happens on deep pages, not here. A self-serve visitor is still served by a clear product strip + the untouched deep pages.

Recommended section order (synthesizing all three references + the existing hub):

1. **Hero** — outcome-first umbrella headline + theory-vs-practice line (from Josh), primary CTA "Book an intro call" (services), secondary "See the agent catalog" (-> existing `/ai-managed-services/agents/`), SOC-2 + HIPAA + "you own what we build" trust chips. Paired with the **overnight run-log visual** (Josh) or an animated agentic-pipeline diagram (Conductor).
2. **Stats/credibility band** — only with *verified* numbers; otherwise cut or replace with named-engagement proof.
3. **What we take off your plate** — the six by-function cards, linking into the existing hub.
4. **How it works** — Blueprint -> Build -> Managed three-phase model.
5. **Where practices start** — fixed-scope builds/packages with durations.
6. **Human in the loop** — the judgment-never-automated section + ownership guarantees (each guarantee verified true before publish).
7. **Proof** — one real testimonial and/or representative engagements (no fabricated quotes).
8. **Explore by practice area** — pills into the existing `/ai-managed-services/for/` pages.
9. **"And the software"** — the app-as-proof strip: free trial + links to the four product pages. This is where self-serve product intent is served.
10. **FAQ** — pre-empt procurement objections (timeline, integrations, security, data, ownership, pricing), Varick-style.
11. **Final CTA** — book a call.

**Guardrails on the rework:** do not touch the deep product pages, the `/ai-managed-services/` hub pages, blog, or SEO routes; they carry the organic + branded equity untouched. Reuse existing hub content and components (AgentCard, by-function pages) rather than authoring net-new.

## Open decisions (Nick's calls)

1. **Hero weighting** — three options:
   - (a) *Balanced fork:* umbrella line + two equal paths.
   - (b) *Services-primary (recommended):* umbrella line, services as the dominant CTA, product as the clear secondary. Matches the warm-traffic evidence and the higher-ACV motion.
   - (c) *Product-primary with a prominent services path:* smallest change, least upside.
2. **Primary CTA verb for the services path** — "Book a working session" vs "Talk to us" vs "See what we build." (Consulting is a conversation-led sale, not a signup.)
3. **Nav** — the mega-menu already exposes AI Services. Do we also elevate a persistent top-level "Work with us" / services CTA in the header?
4. **Umbrella headline direction** — e.g. "The AI partner for law firms" vs "We build, run, and ship AI for legal teams" vs a Firm-OS framing. (Copy to be drafted through the `copywriting` skill on-voice; no em-dashes per house voice.)
5. **Scope of body reorder** — full reorder (services sections first, product second) vs. minimal (new hero + move the services card up, keep product order). *Recommendation: full reorder to the services-primary structure above.*
6. **Design skin — DECIDED: build variants, don't lock one.** Nick wants to see a few variants before choosing. Locked variant set (same services-primary structure and copy in each, skin swapped):
   - **V1 Light-enterprise** (Conductor/Varick direction): white/blueprint grid, cobalt accent, big bold sans, monospace technical labels, animated pipeline diagram. Closest to current brand and the existing hub.
   - **V2 Dark-editorial** (Josh's direction, v8 mock + brain dump palette): midnight/violet/rose, serif display type, run-log/Executive OS console as hero visual.
   - **V3 Hybrid**: current Dodonai palette (deep indigo #282876 family) evolved: light page with dark console/OS panels as the hero visual, so the run-log reads as "the product" inside the brand's existing skin.
   Build as static mock pages first (fast to compare, no Svelte work wasted), review side by side, then port the winner.
7. **Hero visual** — the overnight run-log panel (Josh) vs. an animated agentic-pipeline diagram (Conductor) vs. both combined. All dramatize scheduled-agents-with-a-gate better than a static screenshot.
8. **Claims to verify before publish** — every stat, guarantee, and testimonial (see caveats under Reference input A). Which of the "250 firms / 8+ hrs / $100k+ / 30% lower spend" numbers are real? Are the ownership / no-train / walk-away-with-source / no-long-term-contract guarantees literally true and something we will stand behind in writing? *Partially resolved by Reference D:* the brain dump frames the guarantees as the five operating rules of every engagement, and its no-fake-stats specificity approach replaces the placeholder numbers. Remaining: Nick signs off on the five rules as written public commitments.
9. **Vertical framing — DECIDED (Nick, 2026-08-24):** legal-first, but written to leave room for other verticals and explicitly PE. Execution: hero and proof lead legal; copy avoids locking to "law firms" where a broader word costs nothing ("firms", "partners", "practices" all read legal AND PE/professional services); an "also works beyond legal" beat lives in the body (Explore section or FAQ), citing the dump's PE/estates/contractor examples without leading with them.
10. **Pricing transparency — DECIDED (Nick, 2026-08-24):** no specific prices on the homepage; publish the *shape* only (one-time setup, fixed fee per automation with adoption included, small monthly hosting, model usage passed through at cost). Specific numbers stay in the sales conversation and proposals.
11. **Destination naming — DECIDED (Nick, 2026-08-24):** neither "Executive OS" nor "Firm OS"; both are placeholders. The homepage must not coin a proper noun for the destination yet. Use descriptive language ("one system your firm runs on", "the operating layer") until a real name is chosen. Follow-up task: naming exploration, separate from this build.

## Proposed phased execution (draft, pending decisions above)

| Phase | Scope |
|---|---|
| **Phase 0** | Settle the remaining open decisions with Nick (esp. vertical framing, pricing transparency, OS naming, claims sign-off). Hero copy options drafted (see below); run voice-DNA scan on the winner. *Services-primary structure: signed off by Nick 2026-08-24. Design: build the three skin variants (decision 6) as static mocks and review side by side.* |
| **Phase 1** | Build V1/V2/V3 static mock pages with the winning hero copy; Nick picks the skin. Then port the winner into `HeroSection`/`+page.svelte`. *Mocks built 2026-08-24 using the C+D hero pairing. Round 2 (same day): V2 dark-editorial ELIMINATED by Nick; V1 and V3 reworked to lead with the brand indigo (#282876) with blue demoted to secondary accent, and both gained an animated "From inbox to signed work" data-flow section: a firmOS-style pulsing agent stack + structured-record loop crossed with Conductor-style moving data dots, an amber human-review gate, and a cycling mono run ticker. Live at `mocks/homepage-v1-light.html` and `mocks/homepage-v3-hybrid.html`; awaiting Nick's pick between the two.* |
| **Phase 2** | Body reorder: promote a services/partner section (reusing `/ai-managed-services/` content + an AgentCard/preview) above the six product blocks; demote product blocks; remove or fold the redundant bottom "Beyond the app" card. |
| **Phase 3** | Header CTA elevation (if chosen in decision 3). |
| **Phase 4** | QA: mobile + desktop, prerender/build clean, no regressions to product deep-links, SOC-2/HIPAA line intact, voice-DNA clean. Verify in the browser preview. |
| **Phase 5** | Ship on a branch, review, merge, deploy to GCS. Optionally instrument GA4 events on the two CTA paths to measure the fork split post-launch. |

## Hero copy (round 2, after Nick's 2026-08-24 review)

**Round-1 verdicts:** A rejected (Nick). B rejected: "In Practice" is the name of a competitor to the SaaS product ("inpractice vs. dodonai" is a live query in our own GSC data), so all "in practice" phrasing is banned site-wide, including the v8 mock's theory/practice couplet. C liked. D's shape liked (one system to rule the others) but the copy needs work.

All options: legal-first wording that also reads for PE/professional services (decision 9); no proper noun for the destination (decision 11); no stats; trust chips SOC 2 certified · HIPAA compliant · You own what we build. Primary CTA `Book an intro call`.

**C (lead, refined): Agents that never sleep**
- H1: `Agents that never sleep. Partners who finally can.`
- Sub: `Your firm already produced the documents, the decisions, and the work product. We build agents that put them to work: reading, drafting, and flagging around the clock, with every output waiting on a person's approval.`
- CTAs: `Book an intro call` / `How it works`
- Note: "Partners" carries both meanings for free: law-firm partners and PE partners. Exactly the decision-9 posture.

**D reworks (one system to rule the others, no coined name):**
- D1: `One system that runs the firm. Built around how you already work.` Sub: `Dodonai wires your intake, deadlines, drafting, and billing into a single set of agents running in infrastructure you own. Start with one painful task. Let it grow into the system the firm runs on.`
- D2: `Ten tools each do half the job. We build the one that does the work.` Sub: `Agents built around your workflows, wired into the systems you keep, replacing the ones you keep paying for. Every output waits on a person's approval.`
- D3: `Stop renting software. Start owning the system.` Sub: `We build AI agents around the way your firm runs, in infrastructure you own, with a person approving every output. One painful task first. The whole operating layer over time.`

**Pairing option:** C as H1 with D's idea as the sub, e.g. `Agents that never sleep. Partners who finally can.` + `We build them around the way your firm already runs, wire them into your systems, and keep them running. Start with one painful task. Let it grow into the system the firm runs on.` This gets the memorable line AND the one-system arc into the same fold.

*Recommendation: the C+D pairing. It survives every constraint (no "in practice", no coined name, legal+PE readable) and stacks the two ideas Nick responded to.*

## New packaged service (Nick, 2026-08-24): File System Blueprint

Productize the firm file-system scan capability as an immediate-ROI packaged service: scan the firm's existing drive/file system, and deliver (1) a data model of what the firm actually produces, (2) document templates for automation, (3) a standardized, governed folder organization, (4) SOPs. Working name "File System Blueprint" (placeholder, like the OS name). Added to the packages section of both mocks (2 to 4 weeks, after the Discovery Audit). Notes:
- This is proven capability, not aspiration: the delivery machinery exists from client work (drive scanning/classification, governed folder taxonomy, template extraction, SOP drafting from transcripts). Never name clients on the site.
- It is also the natural *first* build for most engagements (the Blueprint-phase "scan of past work" from Josh's dump, sold standalone), and it feeds the Firm Brain package: scan -> structure -> brain.
- Follow-ups: add to `templates/consulting/automation_catalog.json` as a commercial package (with catalog regen); dedicated section/page animation (see animation backlog #1).

## Animation backlog (candidates beyond the flow diagram)

Same SVG/CSS vocabulary (indigo stack, marching-ants paths, moving dots, amber gate, mono tickers). Discipline: 2 or 3 signature animations per page maximum; everything else static.

1. **File-system scan, before/after** (for File System Blueprint): a messy file tree (duplicates, loose files, amber flags) swept by a scan beam; files fly into a clean governed taxonomy; output cards appear (data model, templates, SOPs); mono counter ticks files classified. The before/after IS the sales pitch for this package.
2. **Review-gate close-up** (human-in-the-loop section): drafts stack at the amber gate, a cursor approves each, they turn teal and depart; one gets flagged and bounced back to the agents. The "flags rather than guesses" rule, animated.
3. **Document-to-structure lift** (product strip / scan service): lines of a document lift off the page into structured fields that snap into a table. The extraction story in 3 seconds.
4. **Model-routing switchboard** (FAQ / harness story): jobs drop into a router; small jobs go to small model nodes, hard ones to the big node; mid-animation one model node is swapped out and flow continues. "The model is never the architecture."
5. **Stack consolidation** (Modern Software Stack package): a wall of a dozen generic tool tiles merges into one indigo system block; connection lines re-route through it. No invented cost numbers unless verified.
6. **Institutional-memory flywheel** (structured record story): the record layer visibly thickens with each run cycle; a query hits the record and answers instantly instead of re-reading source documents.
7. **Overnight timeline arc** (alternate hero): a 10pm-to-7am arc sweep with agent activity blooming along it, ending on the 7am drafts queue.
8. **Deadline radar** (by-function card): documents flow in, dates fly out onto a calendar grid, a conflict pulses red and gets flagged.
9. **Micro-interactions** (site-wide): marching-ants section dividers, mini pipeline dots on card hover, count-up tickers (verified numbers only), scroll-reveal (already in brief-builder).

Items 10-16 added 2026-08-24 after reviewing `templates/consulting/automation_catalog.json` (55 patterns, most live) — each is grounded in a shipped or built pattern:

10. **Intake assembly line** (lead-capture -> intake-scoring -> engagement-docs-esign -> sign-and-pay -> matter-provisioning): a lead card travels a relay of stations collecting stamps (scored, signed, paid), ending with a matter folder tree unfolding. "One event, the whole matter set up."
11. **Inbound router** (inbound-document-classification, email-capture-filing): mail/fax/records rain into a sorting node and fan out into labeled matter folders. The rail-yard switch.
12. **Records chase loop** (records-request-chase, records-gap-detection): requests fly to provider nodes; records return teal; one gap pulses amber and gets re-chased automatically; a completeness bar fills. "It never forgets to follow up."
13. **Citation web** (cross-doc-objection-drafting, citation-verification): lines draw between contradicting statements across document nodes; a findings card assembles with cite pins.
14. **Ask-the-file** (matter-state-chat, firm-wiki-brain): a typed question beams into the record stack; an answer card assembles with source chips. (Josh's dump ships an interactive version of exactly this.)
15. **Scheduling overlay** (multi-party-scheduling): three calendars overlay, blocked slots dim, the one open slot pulses and books.
16. **Cockpit assembly** (ops-cockpit-dashboard, kpi-reporting, daily-briefing): scattered numbers fly into a one-page dashboard; the Monday brief slides out.

**Triage outcome (Nick, 2026-08-24): all 16 lab sketches discarded except #1**, which was rebuilt as a full-width "Featured build · File System Blueprint" section in V3 (between Packages and Pricing): a 12-second staged narrative on one master timeline — beam scans a recognizable messy drive (real-feeling filenames, duplicate pair flagged amber), classification chips appear per file as the beam passes, files fly color-coded through SCAN/CLASSIFY/FILE nodes into the governed tree (bins flash + counters increment, one duplicate visibly archived mid-flight), then the three deliverable cards assemble (data model with drawing relations, templates with merge-field slots, SOPs), with a phase ticker underneath (SCANNING → CLASSIFYING → EXTRACTING → FOUNDATION READY). The Animation Lab section was removed. Items 2-16 remain here as reference ideas only; none are planned.

## Round 3: outline rework (Nick, 2026-08-24) — V4

Nick supplied a new content outline; built as `mocks/homepage-v4-ai-native.html` (V3 kept for comparison). Structure: **Hero "Go AI Native with Dodonai"** (cycling Organize/Orchestrate/Automate word, echoing the existing site's cycling hero; overnight-run console retained) → path band → **01 Blueprint Audit** (interviews + data/systems audit → the Blueprint deliverable) → **02 Organize** (the file-scan animation, third deliverable card retitled SYSTEMS MAP; deliverables = templates, SOPs, systems maps) → **03 Orchestrate** (the firmOS brief's 4-layer stack animation on a dark panel, brief gradients kept, Dodonai App folded into the FOUNDATION layer; "Integrates with" text-wordmark marquee of ~32 firm platforms + "anything with an inbox, an API, or a screen; no API? we bridge it") → **04 Automate** (Organize + Orchestrate outputs as the starting point; the inbox-to-signed-work flow animation as "Example · Document Ingestion"; pill row of further examples) → **05 Optimize** (we host the harness; smarter overnight on new models; no long-term contract) → **value props** (reduce overhead / execute faster / more matters / happier team) → **app strip** (Dodonai App as tryable proof + part of the foundation) → **security** (human-in-the-loop panel + SOC 2/HIPAA) → final CTA. Branding upgrades: real `logo-main.webp` in nav/footer, ellipse blob backgrounds in the hero, SOC 2/HIPAA icons in chips (all referenced from the live site). Dropped relative to V3 per the outline: pricing-shape section, packages grid, by-function card grid, practice-area pills. "FirmOS" name used in Orchestrate copy despite decision 11 naming freeze: flagged for Nick to confirm or de-name before ship.

## Round 4: V5 systematic rework (2026-08-24)

Nick's verdict on V4: structure right, execution well below the Conductor/Varick bar; specific misses on every section. V5 (`mocks/homepage-v5.html`) rebuilds on a **two-motif design system**: the **console** (dark indigo terminal card = "agent work happening": hero overnight run, Blueprint audit log, Automate example agents, Optimize changelog) and the **diagram** (white SVG card = "shape of the system": Organize storyboard, FirmOS hub, foundation graphic). Every section follows one anatomy: icon step chip → display headline with one gradient word → 2-sentence lede → one signature artifact → proof foot. Fixes per note: new hero eyebrow/sub; path band rebuilt with icon tiles + dashed connector; Blueprint = audit console (interviews/systems/data → The Blueprint); Organize = 3-panel storyboard (classify / systems map with re-key annotations / search with typewriter + timed results) + 3 deliverable cards (templates, SOPs, systems maps); Orchestrate = faithful port of the brief's xform block (scattered tools + runner → FirmOS hub with spokes, Dodonai App as a highlighted spoke) + pure-CSS two-row logo scroller (no JS injection, so it can't fail to render); Automate = foundation graphic (templates+SOPs+maps+FirmOS → automation-ready bar) + bento of 3 example agents with animations; Optimize = harness changelog console; value props redesigned (arrow cards, "Four returns" heading gone); Security = security only, 5 icon cards, control framing cut; App = full split section with animated browser-window mockup + note that the current public_site homepage becomes the app's product page. Inspiration inputs: conductorai.com, varickagents.com, refero patterns (frosted glass, one focal point per view); saaspo blocked robots.

## Round 5: V6 (2026-08-24)

Nine-point iteration on V5 per Nick (`mocks/homepage-v6.html`): hero announce pill routing to the app product page (the current public_site homepage becomes the app page); social-proof band below hero per Josh's screenshot ("IN PRODUCTION / Proven first in legal" + 250+/50+ stats + RUNS INSIDE YOUR CONTROLS chips + dashed SLOT placeholders for client logos and model providers — **250+/50+ still unverified, gate before ship**); Blueprint console now feeds an assembling "The Blueprint (excerpt)" doc with sequenced automations and FIXED PRICE chips; Organize 02.1 reframed to folder standardization + auto-provisioning on intake (NEW MATTER event spawns the standard folder set), 02.2 upgraded to traced workflows with traveling dots + gap badges, 02.3 is now semantic Q&A over the workspace (typewriter questions, answer card with sources); deliverables replaced with rich previews (template with {tokens} and IF/THEN conditional blocks, SOP with branch, mini systems map with GAP pin); Orchestrate anonymized to Case Management/Billing/Payments + Microsoft (Teams, OneDrive, Outlook) in both panels; Automate foundation rebuilt as the docking-agent animation (Organize outputs + FirmOS dock into agent slots → agent activates → staged work flows out); examples now a scroll-snap carousel of 4 (ingestion flow, new deadline-calendar SVG, new records-chase progress SVG, client-digest console); Optimize is a KPI dashboard (4 counters, runs-per-week bars, cost-per-run declining line — all marked illustrative); app section headline de-cheesed ("The same engine, packaged."); value props rebuilt as dark ink band ("Run the firm you always meant to run." + Overhead↓/Speed↑/Capacity↑/Morale↑ hover cards).

## Round 6: V7 (2026-08-31)

`mocks/homepage-v7.html`, eight fixes per Nick: hero words now **accumulate** (Organize stays as Orchestrate and Automate join, then reset together); human-judgment framing demoted out of the hero sub (new sub: "One partner to organize your documents, orchestrate your systems, and automate the work between the work. Live in weeks, priced line by line." — HITL survives only in the console foot + Security section); "RUNS INSIDE YOUR CONTROLS" strip removed, replaced by two grayscale wordmark rows: **TRUSTED BY** (Dabdoub Law, JBY Accounting, Core Litigation, NBC Law, Ginsberg Law — **client-permission gate before ship**) and **RUNS ON** (Anthropic, OpenAI, Google Gemini, Mistral, Meta Llama); Blueprint console replaced with a literal **blueprint-draw animation** (indigo grid paper, four firm rooms draw themselves with pain annotations, then AGENT 01-04 bolt badges stamp on, ending "4 automations found · sequenced by return"); Organize unsquished into three full-width alternating rows (text | large visual) + deliverables widened under a "WHAT YOU KEEP" head; 02.1 retitled "Storage, standardized."; Automate foundation rebuilt as **ready-check → power-on** (four checklist items tick with FROM ORGANIZE/ORCHESTRATE tags → agent console wakes STANDBY→LIVE and emits first-run rows, "No blank-slate AI"); value props moved to a distinct **violet-to-blue gradient band** (differentiated from the ink sections) with glass cards that flip to on-the-ground examples on hover ("Nobody builds a chronology at 9 PM again.").

## Round 7: V8 (2026-08-31)

`mocks/homepage-v8.html`: Nick loves the firm-blueprint animation (keep as-is). Fixes: proof rows rebuilt as a real logo-wall (monogram tiles + wordmarks, grayscale with hover color, label column + divider); "RUNS ON" renamed **PARTNERS WITH** and trimmed to Anthropic / OpenAI / Google Gemini (Mistral and Meta removed — not used); the 02.3 magnifier icon was being inflated by the `.orow .vis svg` width:100% rule — scoped fix; deliverable preview cards enlarged (bigger type, taller previews, 360px min columns); "What changes" cards compacted (arrow + word inline, less padding) to match their information density.

## Round 8: V9 (2026-08-31) — v14 harvest, positively reframed

Reviewed Josh's horizontal draft (`~/Downloads/homepage-broad-v14 (1).html`). Verdict: don't adopt the horizontal frame (conflicts with decision 9); raid the modules. `mocks/homepage-v9.html` adds, per Nick's positive-reframe instruction: **"Why custom" section** between proof and path band — flipped positive ("Your firm is unique. That is the advantage." / It knows you / It knows your rules / It fits the work), with "One size fits all fits almost nobody" as a pull-quote rather than the header, an app carve-out aside ("the Dodonai App handles the document work every firm shares; everything above it gets built around yours"), and the handwritten **"Be unique."** scroll reveal (Caveat). Also: legal-voiced **"Tasks firms bring us" cycler** in the hero; **"Stalled matter watch"** console row; **FAQ + ask-box** (7 answers incl. cost structure and "what if we want to stop"); **Dodona origin band** + Greek nav lockup; v14 craft layer (skip link, scroll-reveal system, self-updating year, footer flinks to legal practice + app). Saved for other pages: the three-layers/harness diagram (→ services hub), the four patterns section (→ future horizontal/PE page), the pricing triad (→ pricing/services page), Institutional Intelligence full section (its closing line now caps our Optimize), and the case-study scaffold (→ Proof section when real cases exist).

**Live hub mining (Nick's ask, same day):** /ai-managed-services/ hub page ideas worth pulling forward: the "Going (AI) Native guide" **lead magnet** (name-matches the new hero — natural homepage or exit-intent CTA); the **human + AI photo strip** ("The attorney stays in every loop. The AI handles the volume." with real photography — our mocks have zero humans); the **de-risk cards** (guarantee framing) as a pre-close section or FAQ complement; the "missing middle" positioning cards (overlaps V9's why-custom, skip); per-agent workflow animations on the 38 agent pages (link targets for the Automate examples); StatStrip's data-driven stat rows (port pattern for the proof band).

## Round 9: V10 (2026-08-31)

`mocks/homepage-v10.html`: hub ideas 1-3 (lead magnet, photo strip, de-risk cards) rejected by Nick — dropped. The Automate pill row replaced with a real **agent-catalog index**: "38" count tile + "Drawn from a catalog of 38 working agents", the 7 flagship agents as filled indigo chips (Intake Triage, Docketing & Deadlines, Inbox & Meetings, Client Communications, Trial Prep, Mediation & Settlement Prep, Practice Intelligence), 11 supporting agents as outline chips, and "All 38 agents →" — every chip deep-links to its live `/ai-managed-services/agents/{slug}/` page (names/tiers pulled from `src/lib/data/services/ai-services/agents/*.json`). **Practice areas** answered: a "BY PRACTICE AREA" row inside the same catalog card, 7 pills linking to the live `/for/{slug}` pages. Path band gained a title ("The path to AI native · Five steps. One partner. Your systems."). Why-custom cards visually upgraded: icon tiles (pin/shield-check/interlocking squares), mono numbering, gradient hover rule.

## Round 10: V11 (2026-08-31)

`mocks/homepage-v11.html`: the app carve-out paragraph restyled as a branded callout card (app "d" tile + copy + "Try the app →"); Blueprint excerpt constrained to 860px centered (was full-bleed under the split — answer: no, it should not be full width); the STANDBY/LIVE overlap in the ready-check console fixed by wrapping both states in a relative fixed-width container (the keyframed `position:absolute` was letting them collide mid-crossfade); the agent-catalog header now carries dual counts — **38 PUBLIC AGENTS + 55 CATALOG PATTERNS** ("38 published agents. A delivery catalog of 55 automation patterns behind them.") — counts pulled from `automation_catalog.json` (55 patterns: 38 live, 2 built, 1 piloted, 13 proposed, 1 ideated). Superseded same day per Nick: header simplified to a single **"100+ automations and counting."** tile (his call — the catalog undercounts what has actually been mapped across engagements); the two-line explainer removed. The chip grid and practice-area row are unchanged.

## Guardrails

- One domain only. No `dodonai.com` public site.
- Leave all deep product/SEO/services-hub pages untouched.
- Keep the product self-serve path reachable and obvious for the ~20% who want it.
- SOC-2 Certified + HIPAA Compliant stays on the hero as the trust/proof line.
- House voice: lead with buyer outcome, no em-dashes, no vendor-slop superlatives. Run voice-DNA before merge.
- **No fabricated or unverified claims.** Every stat, guarantee, and testimonial ships only if it is literally true and verified. Placeholder metrics from Josh's mock get verified or cut, not published.
- References are advisory. Re-voice and re-skin to Dodonai; do not lift copy, stats, or layout wholesale from Josh's mock, Conductor, or Varick.
- **Banned phrasing: "in practice" / "In Practice"** anywhere on the site — it is a competitor's product name and a live comparison query in GSC. This retires the v8 mock's "Automation in Practice" title and theory/practice couplet.
- **No coined destination name** (no "Executive OS" / "Firm OS" on the public site) until the naming exploration lands. Descriptive phrases only.

## Cross-references

- Prior GSC pull + strategic reasoning: this session's chat (homepage warm-traffic analysis).
- Existing services build: `ai-services-hub-plan.md` (the `/ai-managed-services/` hub, `feature/ai-services-hub`).
- Reference A: Josh's mock, `~/Downloads/dodonai-homepage-mock-v8 (4).html` (advisory).
- Reference B: conductorai.com (design + content inspiration).
- Reference C: varickagents.com (design + content inspiration).
- Reference D: Josh's strategy brain dump, `~/Downloads/dodonai-plan (31).html` (positioning source; "The service" tab).
- Voice/brand rules: `public_site/CLAUDE.md`; Dodonai company voice-DNA.
