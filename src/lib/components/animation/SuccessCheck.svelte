<script>
	let { size = 60, ringDelay = '0.5s', checkDelay = '2s' } = $props();
	let r = $derived((size / 2) * 0.8);
	let circumference = $derived(2 * Math.PI * r);
</script>

<div class="success-check" style="width: {size}px; height: {size}px">
	<svg viewBox="0 0 100 100" width={size} height={size}>
		<circle cx="50" cy="50" r={r} fill="none" stroke="#E4E7E7" stroke-width="6" />
		<circle
			cx="50"
			cy="50"
			r={r}
			fill="none"
			stroke="#4CAF50"
			stroke-width="6"
			class="progress-ring"
			style="stroke-dasharray: {circumference}; stroke-dashoffset: {circumference}; animation-delay: {ringDelay}"
		/>
	</svg>
	<span class="checkmark" style="animation-delay: {checkDelay}">&#10003;</span>
</div>

<style>
	.success-check {
		position: relative;
		margin: 0 auto;
	}

	.progress-ring {
		transform-origin: center;
		animation: drawRing 1.2s ease-in-out forwards;
		animation-delay: inherit;
	}

	@keyframes drawRing {
		to {
			stroke-dashoffset: 0;
		}
	}

	.checkmark {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 24px;
		color: #4caf50;
		opacity: 0;
		animation: checkPop 0.3s ease-out forwards;
	}

	@keyframes checkPop {
		0% {
			opacity: 0;
			transform: translate(-50%, -50%) scale(0.4);
		}
		100% {
			opacity: 1;
			transform: translate(-50%, -50%) scale(1);
		}
	}
</style>
