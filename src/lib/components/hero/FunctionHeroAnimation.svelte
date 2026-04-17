<script>
	import AnimationStage from '$lib/components/hero/AnimationStage.svelte';
	import PhaseWrapper from '$lib/components/hero/PhaseWrapper.svelte';
	import { functionAnimationConfig } from '$lib/components/hero/functionAnimationConfig.js';

	let { slug = 'intake-and-growth' } = $props();
	const config = $derived(
		functionAnimationConfig[slug] ?? functionAnimationConfig['intake-and-growth']
	);
</script>

<AnimationStage durations={[4200, 5000, 5200]} height={500}>
	{#snippet children(step)}
		<!-- Phase 0: Before — pain state -->
		{#if step === 0}
			<PhaseWrapper caption="The work that used to fall between cracks.">
				<div class="scene">
					<div class="before-card">
						<div class="card-header">
							<span class="card-title">Before</span>
							<span class="card-tag warn">Manual today</span>
						</div>
						<div class="pain-list">
							{#each config.before as pain, i}
								<div class="pain-row" style="animation-delay: {250 + i * 400}ms">
									<span class="pain-icon">
										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
									</span>
									<div class="pain-body">
										<div class="pain-label">{pain.label}</div>
										<div class="pain-detail">{pain.detail}</div>
									</div>
								</div>
							{/each}
						</div>
						<div class="before-footer" style="animation-delay: 1900ms">
							<span class="footer-note">Repetitive work your team never gets back to.</span>
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 1: Agents animate in -->
		{#if step === 1}
			<PhaseWrapper caption="We deploy a small team of agents on this function.">
				<div class="scene">
					<div class="agents-card">
						<div class="card-header">
							<span class="card-title">{config.label} Agents</span>
							<span class="card-tag card-tag-violet">{config.agents.length} deployed</span>
						</div>
						<div class="agents-list">
							{#each config.agents as agent, i}
								<div class="agent-row" style="animation-delay: {250 + i * 650}ms">
									<div class="agent-avatar">{agent.name.charAt(0)}</div>
									<div class="agent-body">
										<div class="agent-name">{agent.name}</div>
										<div class="agent-status">{agent.status}</div>
									</div>
									<span class="agent-check" style="animation-delay: {600 + i * 650}ms">
										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
									</span>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 2: After — metrics -->
		{#if step === 2}
			<PhaseWrapper caption="The outputs your team sees in the first quarter.">
				<div class="scene">
					<div class="after-card">
						<div class="card-header">
							<span class="card-title">After</span>
							<span class="live-tag">
								<span class="live-dot"></span>
								Running
							</span>
						</div>
						<div class="metric-list">
							{#each config.after as metric, i}
								<div class="metric-row" style="animation-delay: {250 + i * 550}ms">
									<div class="metric-label">{metric.label}</div>
									<div class="metric-value" style="animation-delay: {550 + i * 550}ms">{metric.value}</div>
								</div>
							{/each}
						</div>
						<div class="after-footer" style="animation-delay: 2100ms">
							<span class="footer-dot"></span>
							<span class="footer-note">You stay in the pilot seat. Every action is a draft you approve.</span>
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

	.scene {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		max-height: 100%;
		overflow: hidden;
	}

	.before-card,
	.agents-card,
	.after-card {
		background: white;
		border-radius: 14px;
		box-shadow: 0 10px 40px rgba(40, 40, 118, 0.08), 0 2px 8px rgba(40, 40, 118, 0.04);
		padding: 18px 20px;
		width: 100%;
		max-width: 420px;
		max-height: calc(100% - 24px);
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

	.card-tag-violet {
		color: #836ae4;
		background: #836ae415;
	}

	.card-tag.warn {
		color: #b45309;
		background: #fef3c7;
	}

	/* =============================
	   Phase 0: Before (pain)
	   ============================= */
	.pain-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.pain-row {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 10px 12px;
		background: #fef3c7;
		border: 1px solid #fde68a;
		border-radius: 10px;
		opacity: 0;
		animation: fadeInUp 0.45s ease-out forwards;
	}

	.pain-icon {
		flex-shrink: 0;
		width: 24px;
		height: 24px;
		color: #b45309;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.pain-icon svg {
		width: 18px;
		height: 18px;
	}

	.pain-body {
		flex: 1;
		min-width: 0;
	}

	.pain-label {
		font-size: 11px;
		font-weight: 700;
		color: #282876;
	}

	.pain-detail {
		font-size: 10px;
		color: #8181ac;
		margin-top: 1px;
	}

	.before-footer {
		margin-top: auto;
		padding-top: 14px;
		border-top: 1px solid #eef0fa;
		opacity: 0;
		animation: fadeInUp 0.4s ease-out forwards;
	}

	.footer-note {
		font-size: 11px;
		color: #8181ac;
		font-style: italic;
	}

	/* =============================
	   Phase 1: Agents
	   ============================= */
	.agents-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.agent-row {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px 12px;
		background: #f8f8fc;
		border: 1px solid #eef0fa;
		border-radius: 10px;
		opacity: 0;
		animation: fadeInUp 0.5s ease-out forwards;
	}

	.agent-avatar {
		flex-shrink: 0;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		background: linear-gradient(135deg, #836ae4, #6b4fd4);
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		font-weight: 700;
	}

	.agent-body {
		flex: 1;
		min-width: 0;
	}

	.agent-name {
		font-size: 11px;
		font-weight: 700;
		color: #282876;
	}

	.agent-status {
		font-size: 10px;
		color: #8181ac;
		margin-top: 1px;
	}

	.agent-check {
		flex-shrink: 0;
		width: 20px;
		height: 20px;
		background: #10b981;
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		animation: badgePop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
	}

	.agent-check svg {
		width: 11px;
		height: 11px;
	}

	/* =============================
	   Phase 2: After (metrics)
	   ============================= */
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

	.metric-list {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.metric-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 12px 14px;
		background: #f0fdf4;
		border: 1px solid #bbf7d0;
		border-radius: 10px;
		opacity: 0;
		animation: fadeInUp 0.5s ease-out forwards;
	}

	.metric-label {
		font-size: 11px;
		font-weight: 600;
		color: #282876;
	}

	.metric-value {
		font-size: 13px;
		font-weight: 800;
		color: #10b981;
		opacity: 0;
		animation: fadeInUp 0.4s ease-out forwards;
	}

	.after-footer {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-top: 14px;
		padding-top: 12px;
		border-top: 1px solid #eef0fa;
		opacity: 0;
		animation: fadeInUp 0.4s ease-out forwards;
	}

	.footer-dot {
		flex-shrink: 0;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #10b981;
	}
</style>
