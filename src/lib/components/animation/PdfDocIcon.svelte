<script>
	let { height = 50, width = 40, color = '#E2574C', foldColor = '#B53629', label = '' } = $props();
</script>

<svg {height} {width} viewBox="0 0 309.267 309.267" fill="#000000">
	<g>
		<path
			style="fill:{color};"
			d="M38.658,0h164.23l87.049,86.711v203.227c0,10.679-8.659,19.329-19.329,19.329H38.658 c-10.67,0-19.329-8.65-19.329-19.329V19.329C19.329,8.65,27.989,0,38.658,0z"
		/>
		<path
			style="fill:{foldColor};"
			d="M289.658,86.981h-67.372c-10.67,0-19.329-8.659-19.329-19.329V0.193L289.658,86.981z"
		/>
		{#if label}
			<text
				x="154"
				y="200"
				text-anchor="middle"
				fill="white"
				font-size="68"
				font-weight="bold"
				font-family="Arial, sans-serif">{label}</text
			>
		{/if}
	</g>
</svg>
