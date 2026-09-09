import { load } from 'cheerio';
import postcss from 'postcss';

// Only local, reviewed design files are accepted here. Svelte owns the shell.
export function approvedPage(source, id) {
	const $ = load(source);
	const scope = `#${id}`;
	$('main a[href^="https://www.dodon.ai/"]').each((_, link) => {
		$(link).attr('href', $(link).attr('href').replace('https://www.dodon.ai', ''));
	});
	const css = postcss.parse(
		$('style')
			.map((_, el) => $(el).html())
			.get()
			.join('\n')
	);
	const animations = new Map();
	css.walkAtRules(/keyframes$/, (rule) => {
		animations.set(rule.params, `${id}-${rule.params}`);
		rule.params = `${id}-${rule.params}`;
	});
	css.walkDecls(/^animation/, (decl) => {
		decl.value = decl.value.replace(/[\w-]+/g, (word) => animations.get(word) || word);
	});
	css.walkRules((rule) => {
		if (rule.parent.type === 'atrule' && /keyframes$/.test(rule.parent.name)) return;
		rule.selectors = rule.selectors.map((selector) => {
			if (/^(:root|html|body)(?=[\s.:#\[]|$)/.test(selector))
				return selector.replace(/^(:root|html|body)/, scope);
			if (/^\.home(?=[\s.:#\[]|$)/.test(selector)) return `${scope}${selector}`;
			return `${scope} ${selector}`;
		});
	});
	return { id, html: $('main').html(), css: css.toString(), home: $('body').hasClass('home') };
}
