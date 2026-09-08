<script>
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';
	import { aiServicesOverview } from '$lib/data/navigation.js';
	let mobileOpen = $state(false);
	let header;
	const servicesPage = $derived(
		$page.url.pathname === '/' || $page.url.pathname.startsWith('/ai-managed-services')
	);
	const groups = [
		{
			name: 'AI Services',
			links: aiServicesOverview.filter((link) => !link.href.includes('/how-it-works'))
		},
		{
			name: 'Dodonai App',
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
			name: 'Resources',
			links: [
				{ name: 'Blog', href: '/blog/' },
				{ name: 'Help center', href: 'https://app.dodon.ai/help' },
				{ name: 'Contact us', href: 'mailto:hello@dodon.ai' }
			]
		}
	];
	function closeMenus() {
		mobileOpen = false;
		header?.querySelectorAll('details[open]').forEach((el) => {
			el.open = false;
		});
	}
	function escapeMenu(event) {
		if (event.key !== 'Escape') return;
		const open = header?.querySelector('details[open]');
		if (open) {
			open.open = false;
			open.querySelector('summary').focus();
		} else {
			mobileOpen = false;
			header?.querySelector('.menu-toggle')?.focus();
		}
	}
	afterNavigate(closeMenus);
</script>

<svelte:window
	onkeydown={escapeMenu}
	onpointerdown={(event) => {
		if (header && !header.contains(event.target)) closeMenus();
	}}
/>
<header bind:this={header} class="site-header">
	<div class="shell">
		<a href="/" class="brand" aria-label="Dodonai home"
			><img src="/images/brand/logo-main.webp" alt="Dodonai" width="163" height="29" /></a
		>
		<button
			class="menu-toggle"
			aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
			aria-expanded={mobileOpen}
			aria-controls="site-navigation"
			onclick={() => {
				if (mobileOpen) closeMenus();
				else mobileOpen = true;
			}}>{mobileOpen ? 'Close ✕' : 'Menu ☰'}</button
		>
		<nav id="site-navigation" aria-label="Main navigation" class:open={mobileOpen}>
			<a
				class="nav-item"
				href="/ai-managed-services/how-it-works/"
				aria-current={$page.url.pathname === '/ai-managed-services/how-it-works/'
					? 'page'
					: undefined}>How it works</a
			>
			{#each groups as group}
				<details class="nav-group" name="site-nav">
					<summary>{group.name}<span aria-hidden="true">⌄</span></summary>
					<div class="dropdown">
						{#each group.links as link}
							<a
								href={link.href}
								aria-current={$page.url.pathname === link.href ? 'page' : undefined}>{link.name}</a
							>
						{/each}
					</div>
				</details>
			{/each}
			<div class="actions">
				<a class="login" href="https://app.dodon.ai/login">Log in</a>
				<a
					class="site-cta"
					href={servicesPage
						? 'https://calendly.com/nick-dodonai'
						: 'https://app.dodon.ai/signup?utm_source=website&utm_medium=cta&utm_campaign=header'}
					>{servicesPage ? 'Book a call' : 'Start free trial'}</a
				>
			</div>
		</nav>
	</div>
</header>

<style>
	.site-header {
		background: rgba(255, 255, 255, 0.97);
		border-bottom: 1px solid var(--site-line);
		color: var(--midnight-blue);
		backdrop-filter: blur(12px);
	}
	.shell {
		max-width: 1160px;
		padding: 0 28px;
		margin: auto;
		min-height: 72px;
		display: flex;
		align-items: center;
		gap: 32px;
	}
	.brand {
		flex-shrink: 0;
	}
	.brand img {
		width: 145px;
		height: auto;
	}
	nav {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 24px;
		flex: 1;
		font-size: 14px;
		line-height: 1.5;
		font-weight: 700;
	}
	.nav-group {
		position: relative;
	}
	summary {
		cursor: pointer;
		list-style: none;
		display: flex;
		gap: 7px;
		align-items: center;
		white-space: nowrap;
		padding: 24px 0;
	}
	summary::-webkit-details-marker {
		display: none;
	}
	summary span {
		color: var(--site-muted);
	}
	a:hover,
	summary:hover,
	a[aria-current='page'] {
		color: var(--royal-blue);
	}
	.dropdown {
		position: absolute;
		top: 100%;
		left: -18px;
		width: 280px;
		padding: 10px;
		border: 1px solid var(--site-line);
		border-radius: 12px;
		background: white;
		box-shadow: 0 16px 40px #28287618;
	}
	.dropdown a {
		display: block;
		padding: 10px 12px;
		border-radius: 7px;
		font-size: 13px;
	}
	.dropdown a:hover {
		background: var(--ghost-white);
	}
	.actions {
		display: flex;
		align-items: center;
		gap: 20px;
		margin-left: 8px;
		white-space: nowrap;
	}
	.menu-toggle {
		display: none;
		font-size: 14px;
		font-weight: 700;
		padding: 10px;
	}
	:where(a, button, summary):focus-visible {
		outline: 3px solid var(--royal-blue);
		outline-offset: 4px;
		border-radius: 4px;
	}
	@media (max-width: 1050px) {
		.shell {
			min-height: 68px;
			justify-content: space-between;
		}
		.menu-toggle {
			display: block;
		}
		nav {
			display: none;
			position: absolute;
			top: 100%;
			left: 0;
			right: 0;
			background: white;
			padding: 16px 28px 24px;
			border-bottom: 1px solid var(--site-line);
			box-shadow: 0 20px 30px #28287612;
			max-height: calc(100dvh - 100px);
			overflow-y: auto;
		}
		nav.open {
			display: block;
		}
		.nav-item {
			display: block;
			padding: 12px 0;
		}
		summary {
			padding: 14px 0;
			justify-content: space-between;
			border-top: 1px solid var(--site-line);
		}
		.dropdown {
			position: static;
			width: auto;
			box-shadow: none;
			border: 0;
			padding: 0 0 12px 8px;
		}
		.actions {
			border-top: 1px solid var(--site-line);
			padding-top: 20px;
			margin: 8px 0 0;
			justify-content: space-between;
		}
	}
</style>
