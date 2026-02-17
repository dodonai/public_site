<script>
	let { quote, author, role, company } = $props();
</script>

<div class="card border border-base-300 bg-base-100 shadow-sm">
	<div class="card-body">
		<!-- Quotation mark -->
		<div class="select-none text-5xl font-serif leading-none text-primary/20" aria-hidden="true">
			&ldquo;
		</div>

		<blockquote class="-mt-2 text-base italic leading-relaxed text-neutral/80">
			{quote}
		</blockquote>

		<div class="mt-6 flex items-center gap-3">
			<div
				class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white"
			>
				{author ? author.charAt(0).toUpperCase() : '?'}
			</div>
			<div>
				<p class="text-sm font-bold text-neutral">{author}</p>
				<p class="text-xs text-neutral/60">
					{role}{#if company}<span class="mx-1">&middot;</span>{company}{/if}
				</p>
			</div>
		</div>
	</div>
</div>
