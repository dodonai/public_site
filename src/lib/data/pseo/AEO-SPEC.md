# pSEO AEO Spec — generation standards

These are the Answer Engine Optimization standards the page-generation prompt
(n8n "pSEO Page Factory" → Claude) must follow. Backed by 2026 AEO research:
FAQ schema, answer-first formatting, and statistical density are the top-weighted
citation factors; freshness and credible sourcing are the controllable variables
that most predict whether a page gets cited.

Fields below map 1:1 to `PseoPage` in `lib/pseo.ts`. They are **optional** in the
schema (so legacy TTV pages don't break) but **required** when the QA gate runs
with `AEO_STRICT=1` — which is the mode the **socialpost.ai clone** runs in.

## Every generated page must include

1. **`keyTakeaway`** — answer-first. A direct, quotable answer to the page's core
   question in **≤60 words**, written so an LLM can lift it verbatim. Rendered in a
   highlighted block above the intro and exposed as the schema `speakable` summary.

2. **`keyStats`** — **≥3** citable data points, each `{ value, label, source }`
   (`sourceUrl` where possible). Aim for a stat roughly every 150–200 words of body.
   Use real, attributable numbers — never invented.

3. **`sources`** — **≥1** authoritative source `{ label, url }`. Cite throughout the
   body and list them in the Sources section. Quotations from named sources lift
   citation rate (Princeton GEO: sources + stats + quotes ≈ +30–40% AI visibility).

4. **`faq`** — **≥2** Q&A items (already enforced). Each answer self-contained and
   directly quotable. Renders FAQPage schema.

5. **Schema breadth** — Article + Breadcrumb + FAQPage (auto). Add
   **`entitySameAs`** (official profiles: LinkedIn, Crunchbase, G2, Wikidata, etc.)
   for Organization `sameAs`, and **`aggregateRating`** on compare/product pages
   when real review data exists (e.g. G2/Capterra).

6. **Freshness** — `dateModified` within **12 months**; refresh, don't only add.
   Allocate part of the monthly page budget to refreshing published pages.

## Structure
- Answer-first: lead each section with the direct answer, then expand.
- Comparison/listicle formats for "best X" intent; comparison tables where natural.
- Clear definitions, numbered steps, FAQ — formats AI engines extract cleanly.

## Conversion archetype (`convert`) — the signup-path page
Bottom-of-funnel page type whose job is to move high-intent traffic to the signup
path (book a call / start a trial), not just rank. Same AEO fields apply (it should
still be citable), **plus** a required **`cta`** object:

```
"cta": { "label": "Book Your Free Strategy Call", "href": "/contact",
         "sub": "30 minutes, no pitch — we map one workflow you can automate now." }
```

Structure for conversion pages (still answer-first + sourced):
- `keyTakeaway` = the value prop / direct answer to "how do I get started / why this".
- `sections` lead with the prospect's problem, then how it works, then the low-risk
  first step — each opening with the direct answer, then expanding.
- `faq` handles the real objections (cost, time-to-result, lock-in, tool fit).
- The renderer surfaces the `cta` both above the fold (after the stats) and at the
  end; on non-convert pages the closing CTA falls back to the site default.
- The QA gate **fails** a `convert` page with no `cta { label, href }` (enforced in
  both `lib/pseo.ts` and `pseo-validate.mjs`, not only under `AEO_STRICT`).

For the socialpost.ai clone, this is the home of Gian's requested **monthly
conversion / signup-path piece** (point #4): the automation drafts it from this
template, Celine reviews, the platform scores it, the client approves.

## Testing loop
Use **Perplexity** as the fast feedback loop — it retrieves new/updated pages in
~2–7 days (vs 7–21 for ChatGPT, 14–45 for Claude/Google AI Overviews). Test and
iterate there before expecting movement on the slower engines.

## Out of this automation (client-side, not delivered by us)
Third-party validation — **G2 / Capterra / Product Hunt / Reddit** — is where AI
engines pull most B2B-SaaS "best tool" citations (the "mention-source divide").
It is **not** produced by this automation: review generation is client-owned (their
customers) and Reddit seeding must be authentic. We advise + set up profiles; the
client drives it.

## Cloning for a client (e.g. socialpost.ai)
1. Copy the repo; set archetypes/hubs + brand in `lib/pseo.ts` and the page component. Archetypes now include **`convert`** (signup-path) — repoint its `cta` to the client's signup/trial URL.
2. Run the QA gate with **`AEO_STRICT=1`** so the fields above are enforced at merge.
3. Point the n8n Page Factory prompt at this spec so generated JSON includes
   `keyTakeaway`, `keyStats`, `sources`, `entitySameAs` (+ `aggregateRating` where real).
