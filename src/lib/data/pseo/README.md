# pSEO for dodon.ai

Scaffold of the TTV pSEO engine, pointed at this repo. Agreed with Nick on the
9 July call: "Fleire will take over blog creation using an AI engine", sourced
from the 95 enterprise call transcripts.

## How a page gets here

1. A row is added to the **Dodon pSEO Matrix** sheet (archetype, slug, primary
   keyword, facts_json, status=queued).
2. The n8n Page Factory drafts it with Claude against `AEO-SPEC.md`.
3. Gates run BEFORE the PR, never after:
   - **originality** — Copyscape, blocks above 10% match, fails closed
   - **source-check** — every statistic must resolve to a live URL that
     actually says that. A fabricated citation is the worst failure this
     engine can produce.
   - **anti-slop** — zero em-dashes, no hype words, no bullet-triads
   - **build** — page renders, appears in sitemap
4. One GitHub PR per page, against `stage`.
5. A human merges. The Reconciler flips the sheet row to published.

## Archetypes

| Archetype | Intent | Example slug |
|---|---|---|
| `compare` | "X vs Y", "best X" | `dodonai-vs-manual-deposition-summaries` |
| `for` | ICP hubs | `for-workers-compensation-firms` |
| `glossary` | definitional, AEO-heavy | `page-line-deposition-summary` |

## Required fields

Set by `AEO-SPEC.md`. In short: `keyTakeaway` (≤60 words, answer-first),
`keyStats` (≥3, each with a real `sourceUrl`), `sources` (≥1 authoritative),
`faq` (≥4 for this site), plus Article + Breadcrumb + FAQPage schema.

## Why this repo is a good fit

dodon.ai already renders data-driven pages from JSON in
`src/lib/data/hub-pages/`, and the sitemap auto-discovers them. pSEO pages
follow the same pattern, so no new rendering layer is needed.

## The real constraint

The bottleneck is not drafting, it is merging. As of 12 Aug there are five open
PRs and production has not deployed since 26 July. An engine that opens one PR
per page makes that queue longer, not shorter. Turn the schedule on only once
merges are moving.
