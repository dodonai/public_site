import { readFileSync, writeFileSync } from 'node:fs';
const template = readFileSync(new URL('../widget/template.html', import.meta.url), 'utf8');
const source = readFileSync(new URL('../widget/client.js', import.meta.url), 'utf8');
writeFileSync(
	new URL('../static/chat-widget.js', import.meta.url),
	'/* Generated from widget/client.js and widget/template.html. Run npm run build:chat. */\n' +
		source.replace('__WIDGET_HTML__', JSON.stringify(template))
);
