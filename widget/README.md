# Website chat widget source

The original embed header referenced `chat-relay-poc/widget/index.html` and `build-embed.py`, which are not present in the available workspace. This directory imports the current deployed embed as maintained website source, preserving its same-origin API, history and lead handling. `template.html` owns markup/styles; `client.js` owns behavior. Run `npm run build:chat` to regenerate `static/chat-widget.js`; the website build runs it automatically. Synchronize upstream deliberately if the relay project regenerates the website embed in future.
