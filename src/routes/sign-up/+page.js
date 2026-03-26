import { redirect } from '@sveltejs/kit';

export function load() {
	throw redirect(301, 'https://app.dodon.ai/signup');
}
