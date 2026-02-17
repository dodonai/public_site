<script>
	let { height = 500, children } = $props();
</script>

<div class="animation-container">
	<div class="animation-stage" style="height: {height}px">
		{@render children()}
	</div>
</div>

<style>
	.animation-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		overflow: hidden;
		position: relative;
	}

	.animation-stage {
		position: relative;
		width: 100%;
		overflow: hidden;
	}
</style>
