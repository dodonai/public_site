<script>
	let { quote, author, role, company } = $props();
</script>

<div class="rounded-2xl border border-[#e5e7eb] bg-white shadow-sm">
	<div class="p-6">
		<!-- Quotation mark -->
		<div class="select-none text-5xl font-serif leading-none text-[#4f46e5]/20" aria-hidden="true">
			&ldquo;
		</div>

		<blockquote class="-mt-2 text-base italic leading-relaxed text-[#282876]/80">
			{quote}
		</blockquote>

		<div class="mt-6 flex items-center gap-3">
			<div
				class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#4f46e5] text-sm font-bold text-white"
			>
				{author ? author.charAt(0).toUpperCase() : '?'}
			</div>
			<div>
				<p class="text-sm font-bold text-[#282876]">{author}</p>
				<p class="text-xs text-[#282876]/60">
					{role}{#if company}<span class="mx-1">&middot;</span>{company}{/if}
				</p>
			</div>
		</div>
	</div>
</div>
