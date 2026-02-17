<script>
	let {
		formats = [
			{ label: 'PDF', letter: 'P', color: '#E2574C' },
			{ label: 'Word', letter: 'W', color: '#2B78B1' },
			{ label: 'Excel', letter: 'E', color: '#20744A' }
		],
		baseDelay = 1500,
		stagger = 300,
		activeIndex = -1
	} = $props();
</script>

<div class="format-buttons">
	{#each formats as fmt, i}
		<div
			class="format-btn"
			class:format-btn-active={i === activeIndex}
			style="animation-delay: {baseDelay + i * stagger}ms; --fmt-color: {fmt.color}"
		>
			<div class="format-icon" style="background: {fmt.color}">{fmt.letter}</div>
			<span>{fmt.label}</span>
		</div>
	{/each}
</div>

<style>
	.format-buttons {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.format-btn {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px 16px;
		background: white;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
		font-size: 14px;
		font-weight: 600;
		color: #333;
		border-left: 3px solid var(--fmt-color);
		opacity: 0;
		animation: formatAppear 0.5s ease-out forwards;
	}

	.format-btn-active {
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
	}

	@keyframes formatAppear {
		0% {
			opacity: 0;
			transform: scale(0.85);
		}
		100% {
			opacity: 1;
			transform: scale(1);
		}
	}

	.format-icon {
		width: 28px;
		height: 28px;
		border-radius: 6px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-weight: 700;
		font-size: 12px;
	}
</style>
