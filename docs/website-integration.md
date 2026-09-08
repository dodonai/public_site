# Homepage and shared site styling

## Routing and preservation

- `/` is the approved company homepage: AI systems built and run for a firm.
- `/ai-managed-services/how-it-works/` is the approved four-stage explanation.
- `/app/` preserves the previous homepage as the document-processing product overview. Its canonical URL and SoftwareApplication URL now identify `/app/`; it is included in the sitemap.
- Header, footer and the homepage's “Explore the app” link make the product overview discoverable. Login still goes to the actual hosted application.

## What was disconnected

The initial integration replaced the entire Svelte response through a server hook. That preserved the mockup appearance but bypassed the real layout, duplicated consent and analytics, and omitted the shared Calendly conversion flow. The original route files still existed behind that replacement.

Both approved pages now render inside the normal Svelte layout. Their reviewed HTML and CSS are extracted at build time. Selectors and animation names are scoped to each page, so rules such as `body`, `.hero`, `.btn` and `.card` cannot restyle the shared shell or remain active on the app overview after navigation. Animation timers, scroll listeners, animation frames and observers are disposed when the page unmounts.

## Styling decisions

| Element | Integration decision | Reason |
| --- | --- | --- |
| Typography | Use the site's locally hosted Plus Jakarta Display for the shell and approved body copy. Retain Caveat and Source Code Pro for illustration annotations. | Removes the visible Sans/Display switch and avoids loading a second body font. |
| Color | Keep midnight `#282876`, blue `#216fed`, and ghost white `#f4f5fd`; share the new muted text `#65658f` and border `#e3e5f2` in the shell. | The new pages already extend the existing palette. Their cream panels and teal diagram states remain useful accents. |
| Width | Shared 1160px maximum outer container, including 28px gutters. | Aligns logo, page content and footer; reconciles the mockups' 1120/1160px difference. |
| Header | Compact sticky white navigation with visible How it works and separate AI Services, Dodonai App and Resources groups. | Visitors can understand the company/product split without losing access to existing service pages. |
| Main action | Book a call on the company/managed-services pages; start a trial on product pages. | Matches the destination's buying motion. The trial banner is omitted from the company homepage. |
| Footer | Same wordmark and palette, three useful link groups plus expandable directories and visible legal links. | Creates a coherent finish while keeping the service, practice-area, industry and comparison routes accessible. |
| Layout and motion | Keep the approved section compositions, illustrations and animation sequences. | Header/footer integration should not reopen the approved page designs. |

## Follow-on design work

The older product/service pages still use their original larger spacing, purple decorations and softer secondary text. That is now a difference between content templates, not two unrelated navigation systems. A later pass can bring those templates toward the new spacing and contrast without rewriting their content or URLs.

The How it works hero currently promises “60 minutes” while nearby copy offers a 30-minute introductory call. Those are in the supplied design; clarify whether they describe two distinct stages before changing approved copy.

## Implementation ownership

- `src/lib/standalone/*.html`: reviewed content and illustration CSS; standalone headers, footers and scripts are not rendered.
- `src/lib/server/approvedPage.js`: extracts the main content and scopes CSS at build time.
- `src/lib/components/marketing/`: lifecycle-managed page interactions and the Svelte content wrapper.
- `src/lib/components/layout/{Header,Footer}.svelte`: the one shared shell across the site.
- `src/routes/+layout.svelte`: consent, paid attribution, booking and navigation analytics.

## Cross-References

- [Repository conventions](../CLAUDE.md)
- [Managed-services hub plan](../ai-services-hub-plan.md)
- [Preserved product overview](../src/routes/app/+page.svelte)
