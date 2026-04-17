# AI Services Hub — Multi-Page Design (Final)

## Context

Dodonai already has a single `/ai-services/` landing page on `public_site` (built in the prior session, not yet committed). Nick wants to expand this into a full multi-page hub before launch. The design below is the final decision after research into competitors, market data, and existing public_site patterns — and three rounds of framing refinement with Nick.

**What exists today** (uncommitted, on `main` in public_site working tree):
- `src/routes/ai-services/+page.svelte` — single overview page
- `src/lib/data/services/ai-services.json`
- `src/lib/components/hero/AiServicesHeroAnimation.svelte` — 2-phase hero animation
- `src/lib/components/layout/Header.svelte` — modified with static "AI Services" nav link

**Design decisions made with Nick**:
1. Hybrid framing: Option A's URL structure + Option B's framing/proof + Option C's agent-catalog depth
2. Full-depth agent detail pages (600-800 words each with scenario narratives)
3. Two-axis taxonomy: practice area + business function
4. Include both practice-area pages and function pages in v1 (not deferred)
5. Split `/safety/` into its own page for SEO
6. Convert "AI Services" top-nav into a mega-menu dropdown consistent with existing Solutions dropdown

---

## Execution Status (as of 2026-04-16)

Branch: `feature/ai-services-hub` on `public_site`. Working without merging to `main` until Phase 5 ships.

| Phase | Scope | Status |
|-------|-------|--------|
| **Phase 1** | Foundation: hub overview page, mega-menu nav, dynamic `[slug]` routes for agents/practice-areas/functions, catalog filter UI, `AiServicesHeroAnimation` 3-phase upgrade, `AgentCard` component | ✅ Done (commit `eb39d0a`) |
| **Phase 2** | 3 core sub-pages: `/how-it-works/`, `/safety/`, `/our-agents/`. Sitemap entries added. Decision: no shared `+layout.svelte` — breadcrumbs render inline per page. | ✅ Done |
| **Phase 3** | 38 agent JSONs (7 flagship + 31 supporting). Files live at `src/lib/data/services/ai-services/agents/<slug>.json`. Voice-DNA scan clean. | ✅ Done |
| **Phase 4** | 7 practice-area JSONs + 6 function JSONs. Routes already exist from Phase 1 windfall. | ⬜ Next |
| **Phase 5** | 6 new hero animations (HowItWorks, Safety, OurAgents, AgentCatalog, PracticeArea-shared, Function-shared). | ⬜ Pending |

### Key changes from original plan during execution

1. **Agent count went 37 → 38** (7 flagship instead of 6, 31 supporting). The flagship-count growth came from the deposition-summary swap below.
2. **Removed 2 agents that competed with core Dodonai SaaS products**:
   - `deposition-summary` (would have competed with `/deposition-summary-software`)
   - `medical-records-chronology` (would have competed with `/ai-medical-record-summaries-chronologies`)
3. **Added 3 replacement agents in Casework & Drafting** (no product overlap):
   - `trial-prep` (new flagship) — assembles trial notebook: witnesses, exhibits, jury instructions, voir dire, opening/closing
   - `mediation-settlement-prep` (new flagship) — mediation brief, leverage analysis, BATNA memo, client-facing settlement one-pager
   - `closing-binder` (supporting) — assembles matter close-out: distribution, lien releases, file index, client summary
4. **JSON path is `src/lib/data/services/ai-services/agents/`** — not `hub-pages/ai-services/agents/` as originally drafted. Sitemap auto-discovery glob extended in `sitemap.xml/+server.js` to match.
5. **No shared `+layout.svelte`** — every sub-page renders its own breadcrumbs inline using `BreadcrumbNav`. Cleaner than a shared layout because each page has different breadcrumb depth and SEO data.
6. **Total page count is 56** (5 core + 38 agents + 7 practice-areas + 6 functions), not 57 as originally targeted. The +1 from the agent swap is offset by collapsing the "marketing" function into `intake-and-growth`.

---

## Research Summary

### Market data
- Legal AI market: $2.67B in 2026, growing 10.53% CAGR to $4.42B by 2031
- Services segment growing at 12.32% CAGR (faster than the overall market)
- 90%+ of surveyed lawyers already use at least one AI tool daily
- Clio 2025: 78% of legal professionals want AI but don't know where to start
- Thomson Reuters 2025: 52% of small firm lawyers would pay for implementation help
- Harvard Law (March 2026): "The era of the AI pilot is over"

### Competitive landscape
- **The Lawyers' Marketer** (launched 2026-04-01) — direct competitor, Claude implementation for small/mid-sized firms
- **Claude Partner Network** ($100M, launched 2026-03-12) — free to join, Services Partner Directory, Claude Certified Architect cert. **Apply in parallel, don't block the hub launch on it.**
- **ClaudeImplementation.com** — founding CPN member, positioned as "the specialist Anthropic Claude consulting firm"
- **Context Studios** — AI-native dev studio emphasizing first-mover advantage for smaller firms
- **Legal consultancies** (Frontline, Epiq, Lighthouse) use multi-page hubs with soft CTAs
- **Agent builders** (Relevance AI, Lindy, Zapier) use long single pages with template/marketplace discovery

**Key insight**: Dodonai sits at the intersection of legal-specific, agent-building, Claude-forward — nobody else occupies all three. The "we run 13 agents on ourselves every day" proof is impossible for competitors to replicate and is the strongest differentiator.

### Existing public_site infrastructure
- Multi-page hub pattern exists: practice-areas, use-cases, industries, compare (all via `[slug]` dynamic routes + `HubPageTemplate`)
- Header uses a 3-column mega-menu for "Solutions" (practiceAreas + useCases + industries from `navigation.js`)
- All components needed already exist: `HubPageTemplate`, `BreadcrumbNav`, `HubNav`, `ServiceHero`, `ValueProposition`, `HowItWorks`, `FAQAccordion`, `CTASection`, `SEOHead`, `BlobBackground`

---

## Final Structure — 57 Pages

### Core Hub (5 pages)

| URL | Purpose |
|-----|---------|
| `/ai-services/` | Hub overview. "The 1% Problem" hero, engagement summary, 13-agent proof teaser, CTA |
| `/ai-services/how-it-works/` | "The Paralegal Test" framing + Blueprint → Build → Managed in detail |
| `/ai-services/safety/` | Embarrassment prevention layer, audit trails, ABA ethics mapping, hallucination defense |
| `/ai-services/our-agents/` | "What my AI team does every morning" — 13 agents we run on ourselves. THE PROOF. |
| `/ai-services/agents/` | Agent catalog listing. Filter by practice area + function. Gateway to detail pages. |

### Agent Detail Pages (37)

Tiered depth. ★ **Flagship agents (6)** get full ~600-800 word detail pages with scenario narratives — these are the original catalog. Supporting agents (31) get ~400-500 word pages: scenario, inputs/outputs, typical practice-area fit, safety posture, CTA. URL: `/ai-services/agents/[slug]/`. Copy sources: `ch07_agent-playbook.md` for flagship agents; `~/Desktop/Dodonai Files/case-skills/` skill library + handbook practice-area scenarios for the rest.

**Intake & Growth (6 agents)**
- ★ `intake-triage` — score inbound leads, route to the right attorney, auto-book consults
- `conflict-check` — scan new matters against firm conflicts + ethical walls before acceptance
- `case-viability-screener` — liability + damages + coverage memo to triage PI/employment/commercial intake (case-skill: `case-viability-conflict-check-report.md`)
- `fee-agreement-drafter` — auto-generate retainer + scope of work from matter type (case-skill: `attorney-representation-agreement-litigation-personal-injury.md`)
- `referral-engine` — track referral sources, automate thank-yous, compute source ROI
- `reviews-reputation` — monitor Google/Avvo/Yelp, draft responses, surface review-request opportunities

**Deadlines & Compliance (6 agents)**
- ★ `docketing-deadlines` — aggregated court calendar across all matters, with automatic rule-based deadline propagation
- `sol-tracker` — statute-of-limitations monitor per matter type + jurisdiction with escalating alerts
- `trust-account-reconciler` — IOLTA reconciliation, variance alerts, client ledger auditing
- `ethics-guardian` — ABA Opinion 512 audit trails on every AI-assisted work product (competence + confidentiality + supervision)
- `court-rules-monitor` — watches local rule changes across jurisdictions the firm practices in
- `filing-readiness` — pre-flight check every filing passes before submission (caption, signature, service list, attachments)

**Client Communications (5 agents)**
- ★ `client-communications` — monthly/quarterly case status letters tuned to matter state
- `meeting-prep-brief` — client-specific prep brief auto-assembled before every meeting
- `settlement-explainer` — plain-language settlement/award explanation letters with gross-to-net walkthrough
- `bilingual-translator` — outbound client comms translation (Spanish, Mandarin, Vietnamese) for immigration + PI practices
- `court-date-reminders` — auto SMS/email with time, location, instructions, dress code

**Operations & Billing (6 agents)**
- ★ `inbox-meetings` — firm-wide inbox triage + meeting prep with priority/action/FYI labeling
- `time-capture` — auto-capture billable time from calendar, email, and document activity
- `billing-reconciler` — monthly invoice QA, Clio/QuickBooks sync, write-off flagging
- `vendor-coordination` — court reporters, process servers, interpreters, experts — scheduling + invoicing + tracking
- `medical-records-requester` — HIPAA-authorized records pipeline for PI/employment (intake, chase, re-request, QA)
- `subpoena-manager` — draft, serve, track compliance, log returns (case-skill: `subpoena-duces-tecum-for-records.md`)

**Practice Intelligence (5 agents)**
- ★ `practice-intelligence` — per-matter case health dashboard with risk signals across the book
- `matter-profitability` — per-case profit analysis, realization rates, scope-creep detection
- `pipeline-forecasting` — lead → retained matter → closed pipeline + fee revenue forecast
- `workload-balancer` — attorney/paralegal capacity analysis, overload alerts
- `referral-source-roi` — referral source performance ranked by matter profit, not just intake volume

**Casework & Drafting (10 agents)**

Notes for this group: the 2 agents from the original plan that duplicated core Dodonai SaaS products (`deposition-summary`, `medical-records-chronology`) have been removed. Replaced with 2 new flagships (`trial-prep`, `mediation-settlement-prep`) and 1 new supporting (`closing-binder`). Net +1 agent.

- ★ `trial-prep` — trial notebook assembly: witness list with examination outlines, exhibit list with foundation arguments, pattern jury instructions, voir dire, opening/closing drafts (case-skills: `trial-preparation-summaries.md`, `hearing-preparation-summaries.md`, `litigation-witness-statement-summaries.md`, `litigation-verdict-form-draft.md`)
- ★ `mediation-settlement-prep` — mediation brief, opposing-party leverage analysis, BATNA memo, client-facing settlement one-pager (case-skills: `litigation-personal-injury-mediation-statement.md`, `negotiation-support.md`, `alternative-dispute-resolution-adr-outcomes-summary.md`, `pre-hearing-statement-of-proof.md`)
- `deposition-prep` — deposition outlines, witness binder, key-document index (case-skills: `deposition-preparation.md`, `deposition-questioning-techniques.md`, `deposition-witness-prep-session.md`)
- `discovery-builder` — draft interrogatories, RFPs, RFAs tuned to case theory (case-skills: `litigation-personal-injury-interrogatories-to-defendant.md`, `litigation-personal-injury-request-for-production-of-documents.md`, `litigation-personal-injury-request-for-admissions.md`)
- `discovery-response` — draft responses with objections, privilege log, production set (case-skill: `litigation-personal-injury-discovery-response-builder.md`)
- `demand-package` — PI settlement demand letter + evidence compilation (case-skills: `demand-package-compilation.md`, `litigation-personal-injury-demand-letter.md`, `litigation-personal-injury-settlement-demand-letter.md`, `litigation-personal-injury-demand-summary.md`, `lost-wage-economic-loss-report.md`)
- `motion-drafter` — MSJ, motion in limine, motion to dismiss, motion to compel (case-skills: `litigation-personal-injury-motion-for-summary-judgment.md`, `summary-judgment-summarization.md`, `legal-memoranda.md`)
- `pleading-drafter` — complaints, answers, counterclaims, third-party complaints (case-skill: `complaint-for-negligence.md`)
- `appellate-brief-drafter` — appellant/appellee briefs + record designation (case-skills: `legal-memoranda.md`, `legal-research-summaries.md`)
- `closing-binder` — matter close-out binder: distribution statement, lien releases, file index, client-facing summary (case-skills: `litigation-personal-injury-settlement-distribution-statement.md`, `lien-resolution-summary.md`, `verdict-judgment-summary.md`)

### Practice-Area Landing Pages (7)

URL: `/ai-services/for/[slug]/`. Each page: practice-specific scenario hero + section listing applicable agents + practice-specific engagement path + CTA. Draws heavily from Ch 6 "Seven Practice Areas" and `distribution/blog-2-seven-practice-areas.md`.

- `personal-injury` — PI firms (Ch 6 Gordon Herrin storm-season scenario)
- `family-law` — Family law (consulting-research Jena Maxwell scenario)
- `real-estate` — Real estate closings (Ch 6 David Austin scenario)
- `tax` — Tax disputes (Ch 6 Brandon Siegal scenario)
- `immigration` — Immigration (Ch 6 Debbie Rachlis scenario)
- `estates-probate` — Estates & probate (Ch 6 Alex Bainov scenario)
- `cybersecurity-privacy` — Cyber/privacy (Ch 6 Kellam Parks scenario)

**URL note**: Using `/ai-services/for/[slug]/` not `/ai-services/practice-areas/[slug]/` because the public_site already has a separate `/practice-areas/[slug]/` hub for different content (PI lawyer landing pages, medical malpractice, etc.). The `/for/` prefix avoids collision and reads naturally ("AI Services for Personal Injury Firms").

### Function Landing Pages (6)

URL: `/ai-services/by-function/[slug]/`. Each page: function-specific problem framing + section listing applicable agents + CTA. Aggregates agents by business function.

- `intake-and-growth` — intake triage, conflict check, viability screening, fee agreements, referral engine, reputation
- `deadlines-and-compliance` — docketing, SOL, trust accounting, ethics audit, local rules, filing readiness
- `client-communications` — status updates, meeting prep, settlement explanations, translation, court-date reminders
- `operations-and-billing` — inbox, time capture, billing, vendor coordination, records requests, subpoenas
- `practice-intelligence` — case health dashboards, matter profitability, pipeline forecasting, workload, source ROI
- `casework-and-drafting` — depositions, medical chronologies, discovery, demand packages, motions, pleadings, appeals

---

## Taxonomy (two axes)

Every agent detail page gets tagged with:

**Practice area** (one or more, always includes "All" for agents that apply broadly):
Personal Injury · Family Law · Real Estate · Tax · Immigration · Estates & Probate · Cybersecurity & Privacy · All Practice Areas

**Business function** (primary):
Intake & Growth · Deadlines & Compliance · Client Communications · Operations & Billing · Practice Intelligence · Casework & Drafting

Tags display as badges on each agent detail page and drive the filter UI on `/ai-services/agents/`. Practice-area and function landing pages query this tag data to list relevant agents.

### Data representation

Agent JSON files include:
```json
{
  "slug": "intake-triage",
  "title": "Intake Triage Agent",
  "tier": "flagship",
  "function": "intake-and-growth",
  "practiceAreas": ["personal-injury", "family-law", "immigration", "all"],
  "caseSkills": ["litigation-personal-injury-initial-client-intake-form.md", "case-viability-conflict-check-report.md"],
  ...
}
```

- `tier`: `flagship` (long, ~700 words) or `supporting` (short, ~450 words). Drives the detail-page template variant.
- `function`: single primary function (drives which function page lists it most prominently).
- `practiceAreas`: array — include `all` if broadly applicable; list specific areas for specialized agents.
- `caseSkills`: array of filenames from `~/Desktop/Dodonai Files/case-skills/` that this agent orchestrates. Surfaced on the detail page under "Built from these legal skills" to signal depth without duplicating template contents.

Practice-area and function pages read all agent JSONs and filter by tag to build the "relevant agents" section dynamically — no manual cross-linking required. Each practice-area page shows ≥5 relevant agents (all except the most specialized casework agents apply broadly). Each function page shows 5-10 agents.

---

## Navigation — Mega-Menu Dropdown

Replaces the current single "AI Services" top-nav link with a 3-column mega-menu matching the existing Solutions dropdown pattern.

**Column 1: Overview**
- AI Services Hub → `/ai-services/`
- How It Works → `/ai-services/how-it-works/`
- Safety & Trust → `/ai-services/safety/`
- Our Agents (the proof) → `/ai-services/our-agents/`
- Browse All Agents → `/ai-services/agents/`

**Column 2: By Practice Area**
- Personal Injury → `/ai-services/for/personal-injury/`
- Family Law → `/ai-services/for/family-law/`
- Real Estate → `/ai-services/for/real-estate/`
- Tax → `/ai-services/for/tax/`
- Immigration → `/ai-services/for/immigration/`
- Estates & Probate → `/ai-services/for/estates-probate/`
- Cybersecurity & Privacy → `/ai-services/for/cybersecurity-privacy/`

**Column 3: By Function**
- Intake & Growth → `/ai-services/by-function/intake-and-growth/`
- Deadlines & Compliance → `/ai-services/by-function/deadlines-and-compliance/`
- Client Communications → `/ai-services/by-function/client-communications/`
- Operations & Billing → `/ai-services/by-function/operations-and-billing/`
- Practice Intelligence → `/ai-services/by-function/practice-intelligence/`
- Casework & Drafting → `/ai-services/by-function/casework-and-drafting/`

Add corresponding arrays to `src/lib/data/navigation.js`: `aiServicesPracticeAreas` and `aiServicesFunctions`. Wire into `Header.svelte` alongside the existing Solutions dropdown code.

Mobile: collapse into accordion sections matching the existing mobile menu pattern.

---

## Content Mapping — Where Each Page's Copy Comes From

All source files are already in your repos. Most of the writing is adaptation, not creation from scratch.

| Page | Primary source |
|------|---------------|
| `/ai-services/` (hub) | `content/video/2026-04_consulting_promo/voiceover_scripts.md` Hook #1 + `content/handbook/law_firm/drafts/ch01_the-1-percent-problem.md` + existing `ai-services.json` value prop cards |
| `/how-it-works/` | voiceover Hook #4 (Paralegal Test) + `ch03_the-architecture.md` + `ch11_getting-started.md` (Crawl/Walk/Run) + `dodonai-consulting/CLAUDE.md` engagement model |
| `/safety/` | voiceover Hook #6 (Safety Question) + `ch10_safety-layer.md` (6,006 words — Mata v. Avianca, ABA Op. 512, hallucination patterns, embarrassment prevention layer) |
| `/our-agents/` | voiceover Explainer #2 ("What My AI Team Does Every Morning") + `dodonai-marketing/CLAUDE.md` agent table + `cron/plists/` schedule data |
| `/agents/` (catalog) | `ch07_agent-playbook.md` overview table + Ch 6 practice-area framing intro |
| Each ★ flagship agent detail page | `ch07_agent-playbook.md` walkthrough for that agent + practice-area scenario from `ch06_seven-practice-areas.md` + `dodonai-consulting/research/consulting-research-2026-04-08.md` (Jena Maxwell family-law agent table for family-law scenarios) |
| Supporting intake/ops agents | `ch08_marketing-intake-growth.md` (intake, referral, reputation) + `ch09_operations.md` (billing, time, vendor) + `ch07_agent-playbook.md` overview |
| Deadlines/compliance agents | `ch07_agent-playbook.md` (docketing, SOL) + `ch10_safety-layer.md` (ethics guardian, ABA Op. 512) |
| Casework/drafting agents | Case-skill library (`~/Desktop/Dodonai Files/case-skills/` — depositions, e-discovery, personal-injury, commercial-litigation, appeals, criminal-defense, family-law) — each agent page cites 2-5 relevant case-skill templates as the upstream "skills" the agent orchestrates |
| Practice-area pages | `ch06_seven-practice-areas.md` practice-area section + `distribution/blog-2-seven-practice-areas.md` condensed version |
| Function pages | `ch07_agent-playbook.md` (deadlines, docketing, intake) + `ch08_marketing-intake-growth.md` (intake pipeline, marketing) + `ch09_operations.md` (billing, SOPs) + case-skill index for casework-and-drafting |

All copy runs through voice-DNA review per `feedback_drafting_voice_review.md` before commit. Rules from memory:
- Customer-benefit focus, not our metrics
- Numbers as digits
- Always contractions
- No em-dashes
- No "Not X. Y." pattern
- No planted negatives
- Warm, not superlative

---

## Hero Animations — Per-Page

### Upgrade: `AiServicesHeroAnimation.svelte` (hub overview)

Existing 2-phase animation reads thin and occasionally overflows the stage. Upgrade to a 3-phase sequence that tells the Blueprint → Build → Managed story visually, while enforcing a strict content-fits-stage contract.

- **Phase 0 — Blueprint** (~4200ms): schematic of a law firm's workflows. Stylized nodes for Intake, Matters, Docket, Filings, Billing. Dotted connector lines highlight "the 1% gap" where humans still do repetitive work today.
- **Phase 1 — Build** (~5400ms): agents materialize onto the schematic. Roster card renders (upgraded from 4 to 6 agents, 3×2 grid), each agent dock-links to its workflow node with an animated flow line drawn via CSS `stroke-dashoffset`.
- **Phase 2 — Managed** (~5600ms): activity feed (upgraded from 3 to 4 items, cycling via `animation-delay` chain) plus a stats footer row ("Drafts this week / Approved / Time saved"). Small "You stay in the pilot seat" tag overlays bottom-right.

**Fit-to-stage contract** (applies to all hero animations — this is the fix for the hub page overflow):
- `AnimationStage height` prop raised to 500px (was 460). Hub overview + all new pages use this unless explicitly overridden.
- Every scene wrapper (`.roster-scene`, `.feed-scene`, etc.) gets `max-height: 100%; overflow: hidden;` so no phase can push content outside the stage box
- Inner cards get `max-width: 420px` and `max-height: calc(100% - 24px)` to leave room for the caption
- Content density capped per phase: Phase 0 ≤ 5 nodes + 5 connectors; Phase 1 ≤ 6 agents; Phase 2 ≤ 4 feed items + footer
- Verified at 375px / 768px / 1280px viewports with no vertical overflow and no layout shift when phases swap

Reuses the existing framework: `AnimationStage` + `PhaseWrapper` + shared keyframes (`fadeInUp`, `fadeInScale`, `badgePop`, `livePulse`). No new libraries.

### New animations (6 components, same framework)

Same animation framework, same CSS vocabulary (cards, pills, avatars, fade/slide keyframes), same palette (`#282876` ink, `#836ae4` violet, `#10b981` success, `#f8f8fc` card, `#eef0fa` hairline). Each is a 2- or 3-phase loop, 440–500px height, content sized to the stage.

| Component | Route | Phases |
|-----------|-------|--------|
| `HowItWorksHeroAnimation.svelte` | `/how-it-works/` | **P0 Paralegal Test**: a request card routes to "AI Paralegal" vs "Human Paralegal" columns with checkmark/question badges. **P1 Three-step path**: Blueprint → Build → Managed timeline with progress bar filling. **P2 Engagement tiers**: Crawl/Walk/Run as stacked cards with deliverables. |
| `SafetyHeroAnimation.svelte` | `/safety/` | **P0 Gate**: draft document flows into "Safety Layer" gate. **P1 Checks**: hallucination scan / ABA 512 audit / embarrassment check animate with green badges. **P2 Audit trail**: timestamped log entries ("Model: Claude Sonnet 4.5 / Source: matter #1429 / Reviewer: K. Parks"). |
| `OurAgentsHeroAnimation.svelte` | `/our-agents/` | **Dedicated 4-phase design — see below.** |
| `AgentCatalogHeroAnimation.svelte` | `/agents/` | **P0 Grid**: 6 function-group cards rise (Intake / Deadlines / Comms / Ops / Intelligence / Casework) with agent counts. **P1 Filter**: chips animate on top, grid re-filters to 3 cards. **P2 Zoom**: one card pulls forward with "37 agents →" teaser. |
| `PracticeAreaHeroAnimation.svelte` + `practiceAreaAnimationConfig.js` | `/for/[slug]/` (shared, slug-driven) | **P0**: practice-area icon + matter-type chips rise. **P1**: 3–4 relevant agents dock onto a matter card with connector lines. **P2**: outcome card ("demand package ready / SOL tracked / intake scored"). Config has 7 entries (one per practice area) — icons, chip labels, agent list, outcome text. |
| `FunctionHeroAnimation.svelte` + `functionAnimationConfig.js` | `/by-function/[slug]/` (shared, slug-driven) | **P0 Before**: workflow strip of pain state (e.g., intake: "missed leads / manual triage / slow follow-up"). **P1 Agents**: function-specific agent cards animate in and overlay. **P2 After**: metrics card ("lead response <5min / 100% triage coverage / auto-booked"). Config has 6 entries. |

### Dedicated design: `OurAgentsHeroAnimation.svelte` (the proof page)

This page IS the proof — the animation must convey "13 agents, running live, on us." Height 520px (justified by density). Four phases, each 4200–4500ms:

- **Phase 0 — Roster** (4200ms): 13 agent chips in a 4×4 grid (15th slot = "+1 you?" ghost chip, 16th blank). Each chip = status dot + short name. Staggered `animation-delay` entrance. Caption: "13 agents. Running every morning. On us."
- **Phase 1 — Day in the life** (4400ms): time-of-day ruler across the top (6am → 6pm). Agent activity markers drop onto the ruler at their real cron times (Inbox Manager 8am + 2pm, Account Health Mon 8am, Churn Intel daily 9am, Meeting Intel weekday 7am, etc.). Uses `badgePop` on each marker. Times pulled from `cron/plists/` schedule data (manually transcribed into the config JSON, not auto-synced).
- **Phase 2 — Per-agent focus** (4400ms): three agents step forward in sequence (Inbox Manager → Outreach Composer → Churn Intel), each showing a "What it did this morning" mini-card: **input** (e.g., "47 new emails") → **output** (e.g., "3 urgent / 8 action / 12 FYI / 24 archived") → **action** (e.g., "Slack digest sent at 8:04am"). Cards cycle via `animation-delay` chain; only one is fully opaque at a time, others dim to 30%.
- **Phase 3 — Activity ticker** (4500ms): horizontal scrolling ticker of today's outputs across all 13 agents, live-updating style. Items like "Inbox → 47 triaged, 3 urgent", "Prospect Intel → 8 signals", "Account Health → 2 save briefs drafted". Footer stat row: "Total today / Approved / Pushed to production".

Data source: new `src/lib/data/services/ai-services/our-agents-animation.json` (one row per agent: name, icon, cron schedule, sample input/output/action, short today-ticker string). Mirrors the 13-agent table in `dodonai-marketing/CLAUDE.md` but is maintained separately — updated by hand when the roster changes.

### Implementation contract (applies to all hero animations)

- Colocated in `src/lib/components/hero/` alongside existing patterns (`DepositionHeroAnimation`, `EDiscoveryAnimation`, `OCRAnimation`, etc.)
- Reuse `AnimationStage` + `PhaseWrapper`; no new stage primitives
- Shared keyframes live inline in each component (matches existing convention) — don't extract to a global stylesheet until 5+ duplicates exist
- Every scene wrapper uses `max-height: 100%; overflow: hidden;` to enforce the stage-height contract
- Every text-containing card needs a `min-width: 0` ancestor to prevent overflow at 375px
- Icons: inline SVGs matching the existing `stroke="currentColor" stroke-width="1.8"` pattern; no external icon font
- Palette restricted to the 5 brand values above — don't introduce new colors
- Every animation component has a matching `.json` config file where strings/timings live — copy edits don't touch Svelte
- Verified on dev server at 375 / 768 / 1280px: clean loop, no overflow, no CLS on phase swap

### Files added

- `src/lib/components/hero/HowItWorksHeroAnimation.svelte`
- `src/lib/components/hero/SafetyHeroAnimation.svelte`
- `src/lib/components/hero/OurAgentsHeroAnimation.svelte`
- `src/lib/components/hero/AgentCatalogHeroAnimation.svelte`
- `src/lib/components/hero/PracticeAreaHeroAnimation.svelte`
- `src/lib/components/hero/FunctionHeroAnimation.svelte`
- `src/lib/components/hero/practiceAreaAnimationConfig.js`
- `src/lib/components/hero/functionAnimationConfig.js`
- `src/lib/data/services/ai-services/our-agents-animation.json`

### Files modified

- `src/lib/components/hero/AiServicesHeroAnimation.svelte` — upgrade to 3 phases, enforce fit-to-stage contract

---

## Technical Implementation

### File structure (actual, as built through Phase 3)

```
src/routes/ai-services/
├── +page.svelte                        # ✅ Hub overview (Phase 1)
├── how-it-works/+page.svelte           # ✅ Phase 2
├── safety/+page.svelte                 # ✅ Phase 2
├── our-agents/+page.svelte             # ✅ Phase 2
├── agents/
│   ├── +page.svelte                    # ✅ Catalog + filter UI (Phase 1)
│   └── [slug]/
│       ├── +page.js                    # ✅ load() + entries() (Phase 1)
│       └── +page.svelte                # ✅ Rich agent detail template (Phase 1)
├── for/
│   └── [slug]/
│       ├── +page.js                    # ✅ Phase 1 (route exists; needs JSON data)
│       └── +page.svelte                # ✅ Phase 1
└── by-function/
    └── [slug]/
        ├── +page.js                    # ✅ Phase 1
        └── +page.svelte                # ✅ Phase 1

src/lib/data/services/
├── ai-services.json                    # ✅ Hub overview content (Phase 1)
└── ai-services/
    ├── how-it-works.json               # ✅ Phase 2
    ├── safety.json                     # ✅ Phase 2
    ├── our-agents.json                 # ✅ Phase 2
    ├── agents/                         # ✅ 38 files (Phase 1 + Phase 3)
    │   # Intake & Growth (6) — all done
    │   ├── intake-triage.json          ★ flagship
    │   ├── conflict-check.json
    │   ├── case-viability-screener.json
    │   ├── fee-agreement-drafter.json
    │   ├── referral-engine.json
    │   ├── reviews-reputation.json
    │   # Deadlines & Compliance (6) — all done
    │   ├── docketing-deadlines.json    ★ flagship
    │   ├── sol-tracker.json
    │   ├── trust-account-reconciler.json
    │   ├── ethics-guardian.json
    │   ├── court-rules-monitor.json
    │   ├── filing-readiness.json
    │   # Client Communications (5) — all done
    │   ├── client-communications.json  ★ flagship
    │   ├── meeting-prep-brief.json
    │   ├── settlement-explainer.json
    │   ├── bilingual-translator.json
    │   ├── court-date-reminders.json
    │   # Operations & Billing (6) — all done
    │   ├── inbox-meetings.json         ★ flagship
    │   ├── time-capture.json
    │   ├── billing-reconciler.json
    │   ├── vendor-coordination.json
    │   ├── medical-records-requester.json
    │   ├── subpoena-manager.json
    │   # Practice Intelligence (5) — all done
    │   ├── practice-intelligence.json  ★ flagship
    │   ├── matter-profitability.json
    │   ├── pipeline-forecasting.json
    │   ├── workload-balancer.json
    │   ├── referral-source-roi.json
    │   # Casework & Drafting (10) — all done
    │   ├── trial-prep.json             ★ flagship (replaces deposition-summary)
    │   ├── mediation-settlement-prep.json ★ flagship (added)
    │   ├── deposition-prep.json
    │   ├── discovery-builder.json
    │   ├── discovery-response.json
    │   ├── demand-package.json
    │   ├── motion-drafter.json
    │   ├── pleading-drafter.json
    │   ├── appellate-brief-drafter.json
    │   └── closing-binder.json         (added; replaces medical-records-chronology)
    ├── practice-areas/                 # ⬜ Phase 4 — 7 files
    │   ├── personal-injury.json
    │   ├── family-law.json
    │   ├── real-estate.json
    │   ├── tax.json
    │   ├── immigration.json
    │   ├── estates-probate.json
    │   └── cybersecurity-privacy.json
    └── functions/                      # ⬜ Phase 4 — 6 files
        ├── intake-and-growth.json
        ├── deadlines-and-compliance.json
        ├── client-communications.json
        ├── operations-and-billing.json
        ├── practice-intelligence.json
        └── casework-and-drafting.json

src/lib/data/navigation.js              # ✅ aiServicesPracticeAreas + aiServicesFunctions arrays added (Phase 1)

src/lib/components/layout/Header.svelte # ✅ Mega-menu dropdown live (Phase 1)
src/routes/sitemap.xml/+server.js       # ✅ Auto-discovery extended for ai-services subdirectories (Phase 1)
```

**Phase 4 + Phase 5 remaining**: 13 JSON files (7 practice-areas + 6 functions) + 6 hero animation components + 2 animation config files + 1 dedicated our-agents animation data JSON.

### Reusable components (all exist)

- `HubPageTemplate` — `src/lib/components/templates/HubPageTemplate.svelte`
- `BreadcrumbNav` — `src/lib/components/layout/BreadcrumbNav.svelte`
- `HubNav` — `src/lib/components/layout/HubNav.svelte` (related pages grid)
- `ServiceHero`, `ValueProposition`, `HowItWorks`, `FAQAccordion`, `CTASection`, `ContentSection`, `BlobBackground`, `SEOHead`
- `AiServicesHeroAnimation` — keep on hub overview, reuse on how-it-works if appropriate

**No new components needed.** The one new piece is a filter UI on `/ai-services/agents/` — can be built inline in that route's `+page.svelte` using Svelte 5 `$state` for selected tags. Filter UI supports two independent axes (practice area, function); selecting both narrows to the intersection.

### Agent detail page templates

Two variants, both reusing `HubPageTemplate`:

- **Flagship template** (6 pages): ServiceHero → scenario narrative (Ch 7 vignette) → "What it does" → "Inputs and outputs" → "Integrations" → "Practice-area fit" badges → "Safety posture" → FAQAccordion → CTASection
- **Supporting template** (31 pages): ServiceHero → short scenario → "What it does" (3-5 bullets) → "Built from these legal skills" (case-skill filename list, linking to a generic "how skills compose into agents" explainer) → "Practice-area fit" badges → "Safety posture" (1 sentence) → CTASection

Both render from the same `agent.json` schema; the `tier` field selects the Svelte component variant.

### SEO — JSON-LD schemas per page

| Page type | Schemas |
|-----------|---------|
| Hub overview | Service, BreadcrumbList, FAQPage |
| How It Works | HowTo, BreadcrumbList |
| Safety | Article, BreadcrumbList |
| Our Agents | Article, BreadcrumbList |
| Agent catalog | CollectionPage, BreadcrumbList |
| Agent detail | Service (with specific serviceType), BreadcrumbList, FAQPage |
| Practice-area | Service + ItemList (the agents), BreadcrumbList |
| Function | Service + ItemList, BreadcrumbList |

All consumed via the existing `SEOHead` component.

### SEO keyword targets

Rough priority per page (Ahrefs API was rate-limited; volumes inferred from market data + search patterns):

| Keyword | Page |
|---------|------|
| ai services for law firms | Hub |
| ai agents for law firms | Agent catalog |
| ai implementation law firm | How It Works |
| ai safety law firm / ai ethics lawyers | Safety |
| claude ai for law firms | Our Agents |
| ai agents for personal injury firms | for/personal-injury |
| ai for family law attorneys | for/family-law |
| ai intake triage law firm | agents/intake-triage |
| ai conflict check software | agents/conflict-check |
| ai case viability screening | agents/case-viability-screener |
| ai deposition prep agent | agents/deposition-prep |
| ai deposition summary | agents/deposition-summary |
| ai medical records chronology | agents/medical-records-chronology |
| ai discovery response | agents/discovery-builder + discovery-response |
| ai demand letter generator | agents/demand-package |
| ai motion drafting software | agents/motion-drafter |
| ai appellate brief drafting | agents/appellate-brief-drafter |
| ai deadline monitoring law firm | agents/docketing-deadlines |
| ai statute of limitations tracker | agents/sol-tracker |
| ai iolta reconciliation | agents/trust-account-reconciler |
| ai legal ethics compliance (ABA 512) | agents/ethics-guardian |
| ai client updates law firm | agents/client-communications |
| ai legal time capture | agents/time-capture |
| ai matter profitability | agents/matter-profitability |
| ai law firm referral tracking | agents/referral-engine + referral-source-roi |

---

## Implementation Order

1. ~~**Layout + breadcrumbs** — shared `+layout.svelte`~~ — **decided against**; pages render breadcrumbs inline
2. ✅ **Taxonomy data model** — agent JSON schema with `tier`, `function`, `practiceAreas`, `caseSkills` (Phase 1)
3. ✅ **Flagship agent detail pages** (7 at ~700 words each, includes `intake-triage` from Phase 1 reference + 5 Phase 3 + 1 from Casework swap) — written, voice-DNA clean
4. ✅ **Supporting agent detail pages** (31 at ~450 words each) — written, voice-DNA clean
5. ✅ **Agent catalog page** (`/agents/`) — catalog with filter UI reading agent JSONs (Phase 1)
6. ⬜ **Practice-area pages** (7) — dynamic `[slug]` route already exists; needs JSON data per slug
7. ⬜ **Function pages** (6) — dynamic `[slug]` route already exists; needs JSON data per slug
8. ✅ **Core hub pages** — hub overview, how-it-works, safety, our-agents (Phase 1 + Phase 2)
9. ⬜ **Hero animations** — `AiServicesHeroAnimation` upgrade done (Phase 1); 6 new animations remain
10. ✅ **Header mega-menu** — dropdown live, `navigation.js` arrays in place (Phase 1)
11. **Voice-DNA review** — done for Phases 1-3; required for Phase 4 copy as written
12. **Build + browser verification** — current build is 153 HTML files; final target is ~159 (adds 13 from Phase 4)

Rough size (final):
- Flagship agents: 7 × ~700 words = ~4,900 words ✅
- Supporting agents: 31 × ~450 words = ~14,000 words ✅
- Practice-area pages: 7 × ~700 words = ~4,900 words ⬜
- Function pages: 6 × ~500 words = ~3,000 words ⬜
- Safety page: ~1,500 words ✅
- Our-agents page: ~1,500 words ✅

Total new copy through Phase 3: ~21,000 words shipped. Phase 4 adds ~7,900 words.

---

## Phase 4 Plan — Practice-Area + Function Landing Pages

The dynamic routes (`/ai-services/for/[slug]/` and `/ai-services/by-function/[slug]/`) already exist from Phase 1 and gracefully render a generic template when the JSON is null. Phase 4 fills in those JSONs so each page has the right copy + dynamically-listed relevant agents.

### Schema for practice-area JSONs (`src/lib/data/services/ai-services/practice-areas/<slug>.json`)

```json
{
  "slug": "personal-injury",
  "seo": { "title", "description", "canonical" },
  "hero": { "headline", "subheadline", "ctaText", "ctaUrl", "secondaryCtaText", "secondaryCtaUrl" },
  "scenario": { "heading", "paragraphs": [] },
  "whyAi": { "heading", "paragraphs": [] },
  "agentRelevance": { "heading", "intro" },
  "engagementPath": { "heading", "paragraphs": [] },
  "faq": [{ "question", "answer" }]
}
```

The `+page.js` loader for `/for/[slug]/` already reads all agent JSONs and filters by `agent.practiceAreas.includes(slug) || agent.practiceAreas.includes("all")`. The relevant-agents grid populates automatically. No manual cross-linking.

### Schema for function JSONs (`src/lib/data/services/ai-services/functions/<slug>.json`)

Identical shape, with the filter being `agent.function === slug` instead of practice area. Each function page should show 5-10 agents.

### Content sequencing for Phase 4

Write practice-areas first (richer source material in `ch06_seven-practice-areas.md` and the distribution blog posts), then functions (which can reference the agents listed on each page rather than needing fresh narrative).

| Order | Slug | Word target | Primary copy source |
|-------|------|-------------|---------------------|
| 1 | `personal-injury` | ~800 | Ch 6 Gordon Herrin storm-season scenario |
| 2 | `family-law` | ~800 | Jena Maxwell scenario from `consulting-research-2026-04-08.md` |
| 3 | `estates-probate` | ~700 | Ch 6 Alex Bainov scenario |
| 4 | `real-estate` | ~700 | Ch 6 David Austin scenario |
| 5 | `immigration` | ~700 | Ch 6 Debbie Rachlis scenario |
| 6 | `tax` | ~600 | Ch 6 Brandon Siegal scenario |
| 7 | `cybersecurity-privacy` | ~600 | Ch 6 Kellam Parks scenario |
| 8 | `intake-and-growth` | ~500 | Ch 8 marketing/intake/growth |
| 9 | `casework-and-drafting` | ~500 | Ch 7 agent playbook + case-skill library overview |
| 10 | `deadlines-and-compliance` | ~500 | Ch 7 docketing/SOL + Ch 10 ethics |
| 11 | `client-communications` | ~500 | Ch 7 communications playbook |
| 12 | `operations-and-billing` | ~500 | Ch 9 operations |
| 13 | `practice-intelligence` | ~500 | Ch 7 intelligence section |

Voice-DNA scan after each batch of 3-4 pages, build verification after each batch.

### Phase 4 JSON-LD per page

| Page type | Schemas |
|-----------|---------|
| `/ai-services/for/[slug]/` | `Service` (with practice-area as `serviceType`), `BreadcrumbList`, `ItemList` of agents, `FAQPage` |
| `/ai-services/by-function/[slug]/` | `Service` (with function as `serviceType`), `BreadcrumbList`, `ItemList` of agents, `FAQPage` |

The dynamic routes need to be checked to confirm they emit the JSON-LD correctly when the JSON is present. If not, add to the route files.

### Phase 4 verification

1. `npm run build` produces 13 new prerendered HTML files (149 → 162 total HTML; current is 153, so +13 new pages = 166)
2. Each practice-area page shows ≥5 relevant agents pulled by `practiceAreas` tag, not hand-maintained
3. Each function page shows 5-10 relevant agents pulled by `function` tag
4. Sitemap includes all 13 new URLs (already auto-discovered via the navigation arrays in `sitemap.xml/+server.js`)
5. Mega-menu dropdown links to all 13 new pages with no 404s
6. JSON-LD validated on a sample of 2 practice-areas + 2 functions via Google Rich Results Test
7. Voice-DNA review passes on all 13 pages

---

## Phase 5 Plan — Hero Animations (6 new + dedicated our-agents)

Build order is set so the highest-stakes animation (`OurAgentsHeroAnimation` — the proof page) lands last when the framework patterns are battle-tested.

| Build order | Component | Route | Config file |
|-------------|-----------|-------|-------------|
| 1 | `HowItWorksHeroAnimation.svelte` | `/how-it-works/` | inline |
| 2 | `SafetyHeroAnimation.svelte` | `/safety/` | inline |
| 3 | `AgentCatalogHeroAnimation.svelte` | `/agents/` | inline |
| 4 | `PracticeAreaHeroAnimation.svelte` + `practiceAreaAnimationConfig.js` | `/for/[slug]/` (7 configs) | shared |
| 5 | `FunctionHeroAnimation.svelte` + `functionAnimationConfig.js` | `/by-function/[slug]/` (6 configs) | shared |
| 6 | `OurAgentsHeroAnimation.svelte` (4-phase, 520px) + `our-agents-animation.json` | `/our-agents/` | dedicated data |

All animations follow the contract documented in the "Hero Animations" section above:
- Reuse `AnimationStage` + `PhaseWrapper`
- `max-height: 100%; overflow: hidden;` on every scene wrapper
- Palette restricted to the 5 brand values (`#282876` ink, `#836ae4` violet, `#10b981` success, `#f8f8fc` card, `#eef0fa` hairline)
- Verified at 375 / 768 / 1280px with no overflow and no CLS on phase swap
- Lazy-loaded with a fixed-height placeholder, matching the existing pattern in `/ai-services/+page.svelte` (commit `3135c37`)

### Phase 5 verification

1. Each animation loops cleanly at 375 / 768 / 1280px viewports — Chrome DevTools MCP for repeatable checks
2. No CLS on phase swap (Lighthouse)
3. No content overflow past the `AnimationStage` height box
4. Lazy-load placeholder dimensions match the loaded animation's height (no layout shift on hydration)
5. Bundle size impact per route is acceptable (each animation should be < 15KB gzipped)

---

## Claude Partner Network (parallel track, non-blocking)

Apply to the Claude Partner Network now at `claude.com/partners`. Free. Doesn't block the hub launch. If accepted before launch, add "Claude Partner Network Member" badge to the hub hero and safety page. If accepted after launch, add the badge in a small follow-up commit.

---

## Verification (final pre-launch checklist)

To be run end of Phase 5, before merging `feature/ai-services-hub` to `main`.

1. `cd "/Users/nicholaschapleau/Github Repos/public_site" && npm run dev` — all 56 pages load with no console errors
2. Mega-menu dropdown works on desktop and mobile; all 18 linked pages resolve ✅ (Phase 1)
3. Breadcrumbs appear on every sub-page (Home > AI Services > [section]) ✅ (Phase 1+2+3)
4. Agent catalog filter UI ✅ (Phase 1) — practice area chip narrows, function chip narrows, intersection works, clear restores all 38 agents
5. Practice-area and function pages — "Relevant agents" section dynamically lists ≥5 agents whose tags match the page (Phase 4 verification)
6. `npm run build` — prerender emits ~166 static HTML files (current 153 + 13 new in Phase 4)
7. JSON-LD present on every page per the table — validate with Google Rich Results Test on a sample of 4 pages (hub, agent detail, practice-area, function)
8. Mobile viewport (375px) — all pages readable, no horizontal overflow
9. Hero animations verified (Phase 5) — every animation loops cleanly, no content overflows the `AnimationStage` height box, no CLS on phase swap, at 375 / 768 / 1280px viewports
10. Voice-DNA review passes on every page ✅ for Phases 1-3; required for Phase 4
11. Internal links between hub pages all resolve (no 404s)
12. SEO: each page has unique `<title>`, meta description, canonical, OG tags
13. No agent in the catalog competes with a core Dodonai SaaS product ✅ (verified during Phase 3; deposition-summary and medical-records-chronology removed and replaced)
14. Claude Partner Network application submitted (parallel, doesn't block launch)

---

## Non-goals (v2 or later)

- Named client case studies — requires written permission from Roc Nation, Jena Maxwell, Ernie Svenson, Brett
- Pricing disclosure — revisit after 3-6 inbound fit calls
- HubSpot/CRM wiring for CTAs — reuse existing email capture pattern
- Blog post companions (`The 1% Problem`, `Seven Practice Areas`, `AI Safety Layer`, `Build Your First Agent`, `Medical Records to Strategy`) — drafts exist in `content/handbook/law_firm/drafts/distribution/`. Ship as separate PRs after the hub launches to drive traffic to it.
- Function page: Marketing — folded into `intake-and-growth` for v1; break out in v2 if content grows
- Claude Certified Architect certification — pursue after CPN acceptance
