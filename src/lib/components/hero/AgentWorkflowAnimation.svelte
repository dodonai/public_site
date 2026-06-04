<script>
	import AnimationStage from '$lib/components/hero/AnimationStage.svelte';
	import PhaseWrapper from '$lib/components/hero/PhaseWrapper.svelte';

	let { workflow = [], title = 'Workflow' } = $props();

	const steps = $derived(workflow.slice(0, 5));
	const output = $derived(workflow[workflow.length - 1]);
</script>

<AnimationStage durations={[6200, 4600]} height={540}>
	{#snippet children(step)}
		<!-- Phase 0: Walk through the workflow steps -->
		{#if step === 0}
			<PhaseWrapper caption="Every step runs on its own. You approve the output.">
				<div class="scene">
					<div class="workflow-card">
						<div class="card-header">
							<span class="card-title">{title}</span>
							<span class="live-tag">
								<span class="live-dot"></span>
								Running
							</span>
						</div>
						<div class="step-list">
							{#each steps as stepItem, i}
								<div class="step-row" style="animation-delay: {200 + i * 900}ms">
									<div class="step-index">
										<span class="step-num">{i + 1}</span>
										<span class="step-check" style="animation-delay: {900 + i * 900}ms">
											<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
										</span>
									</div>
									<div class="step-body">
										<div class="step-label">{stepItem.label}</div>
										<div class="step-detail">{stepItem.detail}</div>
									</div>
								</div>
								{#if i < steps.length - 1}
									<div class="step-connector" style="animation-delay: {700 + i * 900}ms"></div>
								{/if}
							{/each}
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 1: Output ready for review -->
		{#if step === 1 && output}
			<PhaseWrapper caption="Draft ready. You're the pilot, always.">
				<div class="scene">
					<div class="output-card">
						<div class="card-header">
							<span class="card-title">{title}</span>
							<span class="card-tag card-tag-success">Complete</span>
						</div>
						<div class="output-hero">
							<div class="output-icon">
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
							</div>
							<div class="output-body">
								<div class="output-label">{output.label}</div>
								<div class="output-detail">{output.detail}</div>
							</div>
						</div>
						<div class="summary-list">
							{#each steps as stepItem, i}
								<div class="summary-row" style="animation-delay: {200 + i * 220}ms">
									<span class="summary-check">
										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
									</span>
									<span class="summary-text">{stepItem.label}</span>
								</div>
							{/each}
						</div>
						<div class="gate-row" style="animation-delay: 1800ms">
							<span class="gate-icon">
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
							</span>
							<span class="gate-text">Ready for your review</span>
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}
	{/snippet}
</AnimationStage>

<style>
	@keyframes fadeInUp {
		from { opacity: 0; transform: translateY(10px); }
		to { opacity: 1; transform: translateY(0); }
	}

	@keyframes fadeInScale {
		from { opacity: 0; transform: scale(0.95); }
		to { opacity: 1; transform: scale(1); }
	}

	@keyframes badgePop {
		0% { opacity: 0; transform: scale(0.2); }
		70% { opacity: 1; transform: scale(1.15); }
		100% { opacity: 1; transform: scale(1); }
	}

	@keyframes livePulse {
		0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
		50% { opacity: 0.85; box-shadow: 0 0 0 4px rgba(16, 185, 129, 0); }
	}

	@keyframes connectorGrow {
		from { transform: scaleY(0); opacity: 0; }
		to { transform: scaleY(1); opacity: 1; }
	}

	.scene {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		max-height: 100%;
		overflow: hidden;
	}

	.workflow-card,
	.output-card {
		background: white;
		border-radius: 14px;
		box-shadow: 0 10px 40px rgba(40, 40, 118, 0.08), 0 2px 8px rgba(40, 40, 118, 0.04);
		padding: 18px 20px;
		width: 100%;
		max-width: 420px;
		max-height: 460px;
		overflow: hidden;
		animation: fadeInScale 0.5s ease-out forwards;
		display: flex;
		flex-direction: column;
	}

	.card-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 12px;
		border-bottom: 1px solid #eef0fa;
		margin-bottom: 14px;
	}

	.card-title {
		font-size: 13px;
		font-weight: 700;
		color: #282876;
	}

	.card-tag {
		font-size: 10px;
		font-weight: 600;
		color: #216fed;
		background: #216fed15;
		padding: 3px 9px;
		border-radius: 20px;
	}

	.card-tag-success {
		color: #10b981;
		background: #10b9811a;
	}

	.live-tag {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 10px;
		font-weight: 600;
		color: #10b981;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.live-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #10b981;
		animation: livePulse 1.8s ease-in-out infinite;
	}

	/* =============================
	   Phase 0: Step-by-step
	   ============================= */
	.step-list {
		display: flex;
		flex-direction: column;
	}

	.step-row {
		display: flex;
		align-items: flex-start;
		gap: 12px;
		padding: 8px 0;
		opacity: 0;
		animation: fadeInUp 0.45s ease-out forwards;
	}

	.step-index {
		position: relative;
		flex-shrink: 0;
		width: 26px;
		height: 26px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.step-num {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #836ae41a;
		color: #836ae4;
		border-radius: 50%;
		font-size: 11px;
		font-weight: 800;
	}

	.step-check {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #10b981;
		color: white;
		border-radius: 50%;
		opacity: 0;
		animation: badgePop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
	}

	.step-check svg {
		width: 12px;
		height: 12px;
	}

	.step-body {
		flex: 1;
		min-width: 0;
		padding-top: 2px;
	}

	.step-label {
		font-size: 12px;
		font-weight: 700;
		color: #282876;
		line-height: 1.3;
	}

	.step-detail {
		font-size: 10px;
		color: #8181ac;
		line-height: 1.35;
		margin-top: 2px;
	}

	.step-connector {
		width: 2px;
		height: 10px;
		background: #eef0fa;
		margin-left: 12px;
		transform-origin: top center;
		opacity: 0;
		animation: connectorGrow 0.35s ease-out forwards;
	}

	/* =============================
	   Phase 1: Output
	   ============================= */
	.output-hero {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 14px 14px;
		background: #f0fdf4;
		border: 1px solid #bbf7d0;
		border-radius: 12px;
		margin-bottom: 14px;
	}

	.output-icon {
		flex-shrink: 0;
		width: 36px;
		height: 36px;
		background: #10b981;
		color: white;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.output-icon svg {
		width: 18px;
		height: 18px;
	}

	.output-body {
		flex: 1;
		min-width: 0;
	}

	.output-label {
		font-size: 13px;
		font-weight: 700;
		color: #282876;
		line-height: 1.2;
	}

	.output-detail {
		font-size: 11px;
		color: #8181ac;
		line-height: 1.35;
		margin-top: 2px;
	}

	.summary-list {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.summary-row {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 3px 0;
		opacity: 0;
		animation: fadeInUp 0.3s ease-out forwards;
	}

	.summary-check {
		flex-shrink: 0;
		width: 14px;
		height: 14px;
		background: #10b981;
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.summary-check svg {
		width: 8px;
		height: 8px;
	}

	.summary-text {
		font-size: 10px;
		font-weight: 500;
		color: #282876;
	}

	.gate-row {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-top: 14px;
		padding: 10px 12px;
		background: #216fed0d;
		border: 1px solid #216fed33;
		border-radius: 10px;
		opacity: 0;
		animation: fadeInUp 0.4s ease-out forwards;
	}

	.gate-icon {
		flex-shrink: 0;
		width: 24px;
		height: 24px;
		background: #216fed1a;
		color: #216fed;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.gate-icon svg {
		width: 13px;
		height: 13px;
	}

	.gate-text {
		font-size: 11px;
		font-weight: 700;
		color: #216fed;
	}
</style>
