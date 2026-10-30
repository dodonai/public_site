<script>
	import SEOHead from '$lib/components/seo/SEOHead.svelte';
</script>

<SEOHead
	title="QuickBooks Online disconnected from Dodonai"
	description="Your QuickBooks Online company is no longer connected to Dodonai."
	url="/quickbooks/disconnected/"
/>

<div class="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
	<h1 class="mb-6 text-4xl font-bold text-[#282876]">QuickBooks Online is disconnected</h1>
	<article class="prose prose-lg max-w-none prose-headings:text-[#282876] prose-a:text-[#216fed]">
		<p>
			Dodonai can no longer read from or post to that QuickBooks company, and we delete the
			connection tokens. Bills already posted stay in QuickBooks, because they are your records.
		</p>
		<p>
			Bills your staff approve from now on won't post until the company is connected again. To
			reconnect, see <a href="/quickbooks/connect/">Connect QuickBooks Online</a>.
		</p>
		<p>
			Didn't mean to disconnect, or have a question? Email
			<a href="mailto:hello@dodon.ai">hello@dodon.ai</a>.
		</p>
	</article>
</div>
