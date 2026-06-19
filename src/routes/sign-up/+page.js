import { redirect } from '@sveltejs/kit';

export function load() {
	throw redirect(
		301,
		'https://app.dodon.ai/signup?utm_source=website&utm_medium=cta&utm_campaign=signup_redirect'
	);
}
