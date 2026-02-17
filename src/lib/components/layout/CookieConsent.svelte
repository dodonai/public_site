<script>
	import { onMount } from 'svelte';
	import { loadAnalytics } from '$lib/utils/analytics.js';

	let visible = $state(false);

	onMount(() => {
		const consent = localStorage.getItem('cookie-consent');
		if (consent === 'accepted') {
			loadAnalytics();
		} else if (!consent) {
			visible = true;
		}
	});

	function accept() {
		localStorage.setItem('cookie-consent', 'accepted');
		loadAnalytics();
		visible = false;
	}

	function decline() {
		localStorage.setItem('cookie-consent', 'declined');
		visible = false;
	}
</script>

{#if visible}
	<div
		class="fixed bottom-0 left-0 right-0 z-[200] flex justify-center p-4 sm:p-6"
	>
		<div
			class="w-full max-w-2xl rounded-2xl bg-white px-6 py-5 shadow-lg"
		>
			<p class="mb-4 text-sm leading-relaxed text-[#8181ac]">
				We use cookies to analyze site traffic and optimize your experience. By accepting, you
				consent to our use of cookies.
				<a href="/privacy-policy" class="text-[#216fed] underline hover:text-[#282876]"
					>Privacy Policy</a
				>
			</p>
			<div class="flex items-center justify-end gap-3">
				<button
					onclick={decline}
					class="rounded-full px-5 py-2 text-sm font-medium text-[#282876] transition-colors hover:text-[#8181ac]"
				>
					Decline
				</button>
				<button onclick={accept} class="btn-brand-primary text-sm">
					Accept
				</button>
			</div>
		</div>
	</div>
{/if}
