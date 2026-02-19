<script>
	import { page } from '$app/stores';
</script>

<div class="flex min-h-[70vh] flex-col items-center justify-center px-4 py-20 sm:py-28">
	<h1 class="text-6xl font-extrabold tracking-tight text-[#282876] sm:text-8xl">
		{$page.status}
	</h1>
	<p class="mt-4 text-xl text-[#8181ac] sm:text-2xl">
		{#if $page.status === 404}
			We couldn't find the page you're looking for.
		{:else}
			Something went wrong.
		{/if}
	</p>
	<div class="mt-10 flex flex-wrap items-center justify-center gap-4">
		<a href="/" class="btn-brand-primary inline-block">
			Back to Home
		</a>
		<a href="/blog" class="btn-brand-outline inline-block">
			Read Our Blog
		</a>
	</div>
	<div class="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-[#8181ac]">
		<a href="/pricing" class="hover:text-[#216fed]">Pricing</a>
		<a href="/deposition-summary-software" class="hover:text-[#216fed]">Deposition Summaries</a>
		<a href="/ai-medical-record-summaries-chronologies" class="hover:text-[#216fed]">Medical Records</a>
	</div>
</div>
