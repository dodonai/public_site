<script>
	let { heading = '', columns = [], rows = [], background = 'bg-white' } = $props();
</script>

<section class="{background} py-20 sm:py-28">
	<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
		{#if heading}
			<h2 class="mb-12 text-center text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl">
				{heading}
			</h2>
		{/if}

		<div class="overflow-x-auto rounded-2xl border border-[#dcddf340] shadow-brand-card">
			<table class="w-full text-left text-sm">
				<thead>
					<tr class="border-b border-[#dcddf340] bg-[#f4f5fd]">
						{#each columns as col}
							<th class="px-6 py-4 text-sm font-bold text-[#282876]">{col}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each rows as row, i}
						<tr class="{i % 2 === 0 ? 'bg-white' : 'bg-[#f4f5fd]/50'} border-b border-[#dcddf340] last:border-0">
							{#each row as cell, j}
								<td class="px-6 py-4 {j === 0 ? 'font-medium text-[#282876]' : 'text-[#8181ac]'}">
									{#if cell === true}
										<svg class="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
											<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
										</svg>
									{:else if cell === false}
										<svg class="h-5 w-5 text-[#8181ac]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
											<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
										</svg>
									{:else}
										{cell}
									{/if}
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</section>
