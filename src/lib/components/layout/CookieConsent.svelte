<script>
	import { onMount, tick } from 'svelte';
	import { loadAnalytics, revokeAnalytics, trackConsentAccepted } from '$lib/utils/analytics.js';
	let visible = $state(false);
	let current = $state('not selected');
	let panel;
	let returnFocus;
	function storedChoice() {
		try {
			return localStorage.getItem('cookie-consent');
		} catch {
			return null;
		}
	}
	function save(choice) {
		try {
			localStorage.setItem('cookie-consent', choice);
			return true;
		} catch {
			return false;
		}
	}
	async function open() {
		returnFocus = document.activeElement;
		current = storedChoice() || 'not selected';
		visible = true;
		await tick();
		panel?.focus();
	}
	onMount(() => {
		current = storedChoice() || 'not selected';
		if (current === 'accepted') loadAnalytics();
		else if (current === 'not selected') visible = true;
		window.addEventListener('open-cookie-preferences', open);
		return () => window.removeEventListener('open-cookie-preferences', open);
	});
	function accept() {
		if (save('accepted')) {
			loadAnalytics();
			trackConsentAccepted();
		}
		current = 'accepted';
		visible = false;
		returnFocus?.focus();
	}
	function decline() {
		const previouslyAccepted = current === 'accepted';
		save('declined');
		const wasLoaded = revokeAnalytics();
		current = 'declined';
		visible = false;
		returnFocus?.focus();
		if (wasLoaded || previouslyAccepted) window.location.reload();
	}
</script>

{#if visible}
	<section
		bind:this={panel}
		tabindex="-1"
		role="region"
		aria-label="Cookie preferences"
		class="fixed bottom-0 left-0 right-0 z-[1000] flex justify-center p-3 sm:p-6"
	>
		<div class="w-full max-w-2xl rounded-2xl bg-white px-5 py-5 shadow-2xl border border-[#dcddf3]">
			<h2 class="text-lg font-bold text-[#282876]">Cookie preferences</h2>
			<p class="mt-2 text-sm text-[#4a4a6a]">
				Optional cookies support analytics and advertising. You can accept or reject them and change
				your choice at any time. Essential site features work either way. <a
					href="/privacy-policy/"
					class="text-[#216fed] underline">Website Privacy Policy</a
				>
			</p>
			<p class="mt-2 text-sm text-[#4a4a6a]">
				Current choice: {current === 'accepted'
					? 'optional cookies accepted'
					: current === 'declined'
						? 'optional cookies rejected'
						: 'not selected'}.
			</p>
			<div class="mt-4 flex flex-wrap justify-end gap-3">
				<button
					onclick={decline}
					class="rounded-full border border-[#282876] px-4 py-2 text-sm font-semibold text-[#282876]"
					>Reject optional cookies</button
				>
				<button onclick={accept} class="btn-brand-primary text-sm">Accept optional cookies</button>
			</div>
		</div>
	</section>
{/if}
