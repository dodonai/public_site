import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const prerender = false;

export async function POST({ request }) {
	const { name, email, company, message } = await request.json();

	if (!name || !email || !message) {
		return json({ error: 'Name, email, and message are required.' }, { status: 400 });
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		return json({ error: 'Invalid email address.' }, { status: 400 });
	}

	const webhookUrl = env.SLACK_WEBHOOK_URL;
	if (!webhookUrl) {
		console.error('SLACK_WEBHOOK_URL not configured');
		return json({ error: 'Contact form is temporarily unavailable.' }, { status: 500 });
	}

	try {
		const slackMessage = {
			text: 'New Contact Form Submission',
			blocks: [
				{
					type: 'header',
					text: { type: 'plain_text', text: 'New Contact Form Submission' }
				},
				{
					type: 'section',
					fields: [
						{ type: 'mrkdwn', text: `*Name:*\n${name}` },
						{ type: 'mrkdwn', text: `*Email:*\n${email}` },
						{ type: 'mrkdwn', text: `*Company:*\n${company || 'Not provided'}` }
					]
				},
				{
					type: 'section',
					text: { type: 'mrkdwn', text: `*Message:*\n${message}` }
				}
			]
		};

		const response = await fetch(webhookUrl, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(slackMessage)
		});

		if (!response.ok) {
			throw new Error('Slack webhook failed');
		}

		return json({ success: true });
	} catch (err) {
		console.error('Contact form error:', err);
		return json({ error: 'Failed to send message. Please try again.' }, { status: 500 });
	}
}
