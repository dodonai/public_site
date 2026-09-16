import rawPlans from './pricing.json' with { type: 'json' };
import billing from './billing.json' with { type: 'json' };
import { company } from './company.js';
export { billing };
export const plans = rawPlans.filter((p) => p.monthlyPrice !== null);
export const monthlyEquivalent = (p) => (p.yearlyPrice / 12).toFixed(2).replace(/\.00$/, '');
export const perCredit = (p, annual) =>
	annual ? p.yearlyPrice / p.yearlyCredits : p.monthlyPrice / p.monthlyCredits;
export const formatRate = (rate) => '$' + rate.toFixed(3);
export const pricingDescription = `App plans from $${Math.min(...plans.map((p) => p.monthlyPrice))}/month, or $${Math.min(...plans.map((p) => p.yearlyPrice))}/year. Every feature included. Compare credits, annual billing, and processing rates.`;
export const annualExplanation = `Annual billing costs about ${Math.round((1 - plans[0].yearlyPrice / (12 * plans[0].monthlyPrice)) * 100)}% less than twelve monthly payments and includes ${plans[0].yearlyCredits / (12 * plans[0].monthlyCredits)}× the credits—about ${Math.round((1 - perCredit(plans[0], true) / perCredit(plans[0], false)) * 100)}% less per credit.`;
export const pricingFaq = [
	{
		question: 'What is a credit?',
		answer: `A billable page is approximately ${billing.tokensPerPage} tokens of text, which may differ from a physical PDF page. Credits measure processing usage, not the number of sheets uploaded.`
	},
	{
		question: 'How do credits work with different process types?',
		answer:
			billing.processes
				.map(
					(p) =>
						`${p.name} use ${p.multiplier} credit${p.multiplier === 1 ? '' : 's'} per billable page.`
				)
				.join(' ') +
			` For 100 billable pages, that is ${billing.processes.map((p) => 100 * p.multiplier).join(', ')} credits respectively. OCR is free. Audio transcription is separate: ${billing.audioCreditsPerMinute} credits per minute on subscriptions or $${billing.audioInvoiceRate.toFixed(2)} per minute on invoice billing. Subscription audio minutes are rounded up with a one-minute minimum per file.`
	},
	{
		question: 'Do unused credits roll over?',
		answer: `Monthly credits ${billing.monthlyRollover ? 'roll over' : 'reset each billing cycle and do not roll over'}. Annual credits ${billing.annualRollover ? 'carry forward on annual renewal' : 'reset on renewal'}.`
	},
	{
		question: 'Can I change plans?',
		answer:
			'You can manage your subscription in the App. Review the price, credits, and any proration shown before confirming a change.'
	},
	{
		question: 'What happens if I run out of credits?',
		answer:
			'Processing that requires credits pauses when the available balance is insufficient. Check the App for available credit purchases and plan changes.'
	}
];
export const pricingSchema = {
	'@context': 'https://schema.org',
	'@type': 'Product',
	name: 'Dodonai App',
	description: pricingDescription,
	image: 'https://www.dodon.ai/images/og-home-2026.webp',
	brand: { '@type': 'Organization', name: company.name },
	offers: plans.flatMap((p) =>
		[false, true].map((annual) => ({
			'@type': 'Offer',
			name: `${p.name} (${annual ? 'Annual' : 'Monthly'})`,
			price: annual ? p.yearlyPrice : p.monthlyPrice,
			priceCurrency: 'USD',
			url: 'https://www.dodon.ai/pricing/',
			description: `${(annual ? p.yearlyCredits : p.monthlyCredits).toLocaleString('en-US')} credits per ${annual ? 'year' : 'month'}. ${annual ? 'Full annual charge; $' + monthlyEquivalent(p) + ' monthly equivalent.' : 'Billed monthly.'}`,
			priceSpecification: {
				'@type': 'UnitPriceSpecification',
				price: annual ? p.yearlyPrice : p.monthlyPrice,
				priceCurrency: 'USD',
				billingDuration: annual ? 'P1Y' : 'P1M'
			}
		}))
	)
};
