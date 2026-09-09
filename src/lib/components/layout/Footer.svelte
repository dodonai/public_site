<script>
	import BrandLogo from './BrandLogo.svelte';
	import {
		aiServicesOverview,
		practiceAreas,
		useCases,
		industries,
		compare
	} from '$lib/data/navigation.js';
	const columns = [
		{ title: 'AI Services', links: aiServicesOverview },
		{
			title: 'Dodonai App',
			links: [
				{ name: 'App overview', href: '/app/' },
				{ name: 'Deposition summaries', href: '/deposition-summary-software/' },
				{ name: 'Medical record chronologies', href: '/ai-medical-record-summaries-chronologies/' },
				{ name: 'Transcript management', href: '/ai-deposition-transcript-software/' },
				{ name: 'Extract & draft agents', href: '/dodonai-extract-and-draft-agents/' },
				{ name: 'E-discovery', href: '/electronic-discovery-software/' },
				{ name: 'AI OCR', href: '/ai-pdf-ocr/' },
				{ name: 'App pricing', href: '/pricing/' }
			]
		},
		{
			title: 'Resources',
			links: [
				{ name: 'Blog', href: '/blog/' },
				{ name: 'Help center', href: 'https://app.dodon.ai/help' },
				{ name: 'Log in', href: 'https://app.dodon.ai/login' },
				{ name: 'Book a call', href: 'https://calendly.com/nick-dodonai' }
			]
		}
	];
	const directories = [
		{ title: 'Practice areas', links: practiceAreas },
		{ title: 'Use cases', links: useCases },
		{ title: 'Industries', links: industries },
		{ title: 'Compare software', links: compare }
	];
</script>

<footer class="site-footer">
	<div class="shell">
		<div class="footer-grid">
			<div class="identity">
				<a href="/" aria-label="Dodonai home"><BrandLogo /></a>
				<p>AI systems built and run for your firm.</p>
				<a href="mailto:hello@dodon.ai">hello@dodon.ai</a>
				<div class="social">
					<a href="https://www.linkedin.com/company/dodon-ai">LinkedIn</a><a
						href="https://www.youtube.com/@dodon-ai">YouTube</a
					><a href="https://twitter.com/Dodon_ai">X</a>
				</div>
			</div>
			{#each columns as column}
				<nav aria-label={column.title + ' footer'}>
					<h2>{column.title}</h2>
					{#each column.links as link}<a href={link.href}>{link.name}</a>{/each}
				</nav>
			{/each}
		</div>
		<div class="directories">
			{#each directories as directory}
				<details>
					<summary>{directory.title}</summary>
					<nav aria-label={directory.title + ' directory'}>
						{#each directory.links as link}<a href={link.href}>{link.name}</a>{/each}
					</nav>
				</details>
			{/each}
		</div>
		<div class="legal">
			<span>© {new Date().getFullYear()} Dodonai. All rights reserved.</span>
			<div>
				<a href="/privacy-policy/">Privacy policy</a><a href="/terms-and-conditions/"
					>Terms & conditions</a
				><a href="#top">Back to top ↑</a>
			</div>
		</div>
	</div>
</footer>

<style>
	.site-footer {
		background: var(--ghost-white);
		border-top: 1px solid var(--site-line);
		color: var(--site-muted);
		font-size: 13px;
		line-height: 1.6;
	}
	.shell {
		max-width: 1160px;
		margin: auto;
		padding: 56px 28px 24px;
	}
	.footer-grid {
		display: grid;
		grid-template-columns: 1.2fr 1fr 1.2fr 0.75fr;
		gap: 36px;
	}
	.identity p {
		max-width: 210px;
		margin: 20px 0 14px;
	}
	h2 {
		font-size: 14px;
		font-weight: 700;
		color: var(--midnight-blue);
		margin-bottom: 18px;
	}
	nav a {
		display: block;
		margin: 10px 0;
	}
	a:hover {
		color: var(--royal-blue);
	}
	.social {
		display: flex;
		gap: 14px;
		margin-top: 20px;
		font-size: 12px;
	}
	.directories {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 24px;
		border-top: 1px solid var(--site-line);
		padding: 22px 0;
		margin-top: 36px;
	}
	summary {
		cursor: pointer;
		color: var(--midnight-blue);
		font-weight: 700;
	}
	.legal {
		display: flex;
		justify-content: space-between;
		gap: 18px;
		flex-wrap: wrap;
		border-top: 1px solid var(--site-line);
		padding-top: 20px;
		font-size: 12px;
	}
	.legal div {
		display: flex;
		gap: 22px;
		flex-wrap: wrap;
	}
	:where(a, summary):focus-visible {
		outline: 3px solid var(--royal-blue);
		outline-offset: 4px;
	}
	@media (max-width: 800px) {
		.footer-grid {
			grid-template-columns: 1fr 1fr;
			gap: 32px;
		}
		.directories {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (max-width: 480px) {
		.identity {
			grid-column: 1/-1;
		}
		.footer-grid {
			gap: 28px 18px;
		}
		.directories {
			grid-template-columns: 1fr;
			gap: 16px;
		}
	}
</style>
