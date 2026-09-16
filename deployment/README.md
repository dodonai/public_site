# Public site release and redirects

The workflows build and validate the intended environment, save a 30-day GitHub artifact, upload assets before entry files, then verify public bytes/types. Gzip bytes, Content-Type, Content-Encoding and cache policy are set in the same `gcloud storage cp --gzip-local` upload. Upload errors fail the job. Only content-hashed `_app/immutable` files receive immutable caching; mutable assets revalidate. Old objects are retained. Retire stale assets separately after at least 30 days and only after ensuring no retained release references them. This is not an atomic site deployment.

Production excludes `build/clients`. Staging remains noindex/disallowed; robots directives are not access control. Authenticate private deliverables separately.

## Redirect rollout

`url-map.*.proposed.json` are review snapshots based on the live `dodonai-landing` URL map read September 15, 2026. They have **not been applied**. This map also serves the App/API; never replace it with a marketing-only configuration. Regenerate against a fresh export immediately before use:

```sh
gcloud compute url-maps describe dodonai-landing --global --format=json > current-map.json
python3 scripts/prepare-redirects.py current-map.json staging-map.json --host landing.dodonai.com
gcloud compute url-maps validate --source=staging-map.json --global
# Save current-map.json for rollback before applying the reviewed map.
gcloud compute url-maps import dodonai-landing --source=staging-map.json --global
```

After staging checks, regenerate from the current live map with `--host www.dodon.ai --host dodon.ai` for production. Exact paths only; existing API hosts and `/site-chat/*` backend rules are preserved. Legacy URLs and known canonical unslashed/index.html variants go straight to their final slash URLs with queries preserved. Signup redirects to the App signup path, preserving incoming attribution. No catch-all lowercase redirect. `/Blog/` is a serving-layer redirect: creating a Svelte route differing only by case would collide with `/blog/` on macOS. Existing legacy routes keep their static meta-refresh fallbacks.

```sh
curl -sSI 'https://landing.dodonai.com/Blog/?source=check'
curl -sSI 'https://landing.dodonai.com/pricing?source=check'
curl -sSI 'https://landing.dodonai.com/pricing/index.html?source=check'
curl -sSI 'https://landing.dodonai.com/ai-marketing-operations-services/'
curl -sSI 'https://landing.dodonai.com/sign-up/?utm_source=check'
curl -sSI 'https://landing.dodonai.com/unknown-release-check/'
python3 scripts/verify-delivery.py https://landing.dodonai.com
```

Expect 301 plus the final Location and unchanged query for redirects, real 404 for unknown routes, and unchanged App/API/chat routing. Run the same checks against production after release. Validate the Google rich results and Search Console separately.

## Rollback

Dispatch the matching environment workflow on its deployment branch with `rollback_run_id` set to the previous successful release run. It downloads that environment's artifact, validates it, and uses the same assets-first uploader. Do not mix environment artifacts. Releases predating this artifact workflow cannot be restored this way. Before the first deployment, retain a known good build as a private artifact or private bucket backup. Save the current URL map separately and import that saved map to revert redirect changes. A live rollback exercise remains a release check; the local dry run does not prove it.
