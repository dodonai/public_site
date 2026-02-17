<script>
	let { caption, subcaption = '' } = $props();
</script>

<div class="phase-label">
	<div class="phase-caption">{caption}</div>
	{#if subcaption}
		<div class="phase-subcaption">{subcaption}</div>
	{/if}
</div>

<style>
	.phase-label {
		margin-top: 16px;
		padding: 8px 20px;
		background: rgba(255, 255, 255, 0.85);
		backdrop-filter: blur(6px);
		border-radius: 8px;
		text-align: center;
	}

	.phase-caption {
		font-size: 16px;
		font-weight: 600;
		color: #282876;
		opacity: 0;
		animation: phaseFadeIn 0.8s ease-in-out 0.5s forwards;
	}

	.phase-subcaption {
		font-size: 14px;
		color: #2b78b1;
		font-style: italic;
		margin-top: 2px;
		opacity: 0;
		animation: phaseFadeIn 0.8s ease-in-out 1s forwards;
	}

	@keyframes phaseFadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
