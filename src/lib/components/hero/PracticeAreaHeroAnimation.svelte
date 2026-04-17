<script>
	import AnimationStage from '$lib/components/hero/AnimationStage.svelte';
	import PhaseWrapper from '$lib/components/hero/PhaseWrapper.svelte';
	import { practiceAreaAnimationConfig } from '$lib/components/hero/practiceAreaAnimationConfig.js';

	let { slug = 'personal-injury' } = $props();
	const config = $derived(practiceAreaAnimationConfig[slug] ?? practiceAreaAnimationConfig['personal-injury']);
</script>

<AnimationStage durations={[4200, 5400, 5200]} height={540}>
	{#snippet children(step)}
		<!-- Phase 0: Practice-area identity + matter chips -->
		{#if step === 0}
			<PhaseWrapper caption="We map the matter types you actually run.">
				<div class="scene">
					<div class="identity-card">
						<div class="identity-head">
							<div class="identity-icon">
								{#if config.icon === 'shield'}
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
								{:else if config.icon === 'users'}
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
								{:else if config.icon === 'folder'}
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>
								{:else if config.icon === 'chart'}
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></svg>
								{:else if config.icon === 'mail'}
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
								{:else if config.icon === 'docs'}
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
								{/if}
							</div>
							<div class="identity-body">
								<div class="identity-tag">Practice area</div>
								<div class="identity-title">{config.label}</div>
							</div>
						</div>
						<div class="chip-label">Matter types</div>
						<div class="chip-wrap">
							{#each config.matterTypes as chip, i}
								<span class="chip" style="animation-delay: {150 + i * 200}ms">{chip}</span>
							{/each}
						</div>
						<div class="identity-footer" style="animation-delay: 1200ms">
							<span class="footer-dot"></span>
							<span class="footer-note">Your matter mix shapes the agent roster.</span>
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 1: Agents dock onto a matter card -->
		{#if step === 1}
			<PhaseWrapper caption="We dock a small team of agents onto each matter.">
				<div class="scene">
					<div class="dock-card">
						<div class="card-header">
							<span class="card-title">Matter Dashboard</span>
							<span class="card-tag card-tag-violet">{config.agents.length} agents</span>
						</div>
						<div class="matter-head">
							<div class="matter-icon">
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
							</div>
							<div class="matter-body">
								<div class="matter-name">{config.matterTypes[0]} — Matter #1429</div>
								<div class="matter-sub">Open · Active</div>
							</div>
						</div>
						<div class="dock-list">
							{#each config.agents as agent, i}
								<div class="dock-row" style="animation-delay: {350 + i * 700}ms">
									<div class="dock-avatar">{agent.name.charAt(0)}</div>
									<div class="dock-body">
										<div class="dock-name">{agent.name}</div>
										<div class="dock-status">{agent.status}</div>
									</div>
									<span class="dock-badge" style="animation-delay: {700 + i * 700}ms">
										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
									</span>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 2: Outcome card -->
		{#if step === 2}
			<PhaseWrapper caption="The outputs your team sees every week.">
				<div class="scene">
					<div class="outcome-card">
						<div class="card-header">
							<span class="card-title">This Week</span>
							<span class="live-tag">
								<span class="live-dot"></span>
								On schedule
							</span>
						</div>
						<div class="outcome-list">
							{#each config.outcomes as outcome, i}
								<div class="outcome-row" style="animation-delay: {250 + i * 550}ms">
									<div class="outcome-check" style="animation-delay: {600 + i * 550}ms">
										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
									</div>
									<div class="outcome-body">
										<div class="outcome-label">{outcome.label}</div>
										<div class="outcome-value">{outcome.value}</div>
									</div>
								</div>
							{/each}
						</div>
						<div class="outcome-footer" style="animation-delay: 2100ms">
							<span class="footer-note">You approve. Nothing goes out without you.</span>
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

	.identity-card,
	.dock-card,
	.outcome-card {
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

	.card-tag-violet {
		color: #836ae4;
		background: #836ae415;
	}

	/* =============================
	   Phase 0: Identity + chips
	   ============================= */
	.identity-head {
		display: flex;
		align-items: center;
		gap: 14px;
		padding-bottom: 14px;
		border-bottom: 1px solid #eef0fa;
		margin-bottom: 14px;
	}

	.identity-icon {
		flex-shrink: 0;
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #836ae41a;
		color: #836ae4;
		border-radius: 12px;
	}

	.identity-icon svg {
		width: 24px;
		height: 24px;
	}

	.identity-body {
		flex: 1;
		min-width: 0;
	}

	.identity-tag {
		font-size: 9px;
		font-weight: 600;
		color: #8181ac;
		text-transform: uppercase;
		letter-spacing: 0.8px;
	}

	.identity-title {
		font-size: 16px;
		font-weight: 700;
		color: #282876;
		margin-top: 2px;
	}

	.chip-label {
		font-size: 10px;
		font-weight: 600;
		color: #8181ac;
		text-transform: uppercase;
		letter-spacing: 0.6px;
		margin-bottom: 8px;
	}

	.chip-wrap {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.chip {
		display: inline-flex;
		align-items: center;
		padding: 6px 10px;
		background: #f8f8fc;
		border: 1px solid #eef0fa;
		color: #282876;
		font-size: 10px;
		font-weight: 600;
		border-radius: 12px;
		opacity: 0;
		animation: fadeInUp 0.4s ease-out forwards;
	}

	.identity-footer {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-top: auto;
		padding-top: 14px;
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

	.footer-note {
		font-size: 11px;
		color: #8181ac;
		font-style: italic;
	}

	/* =============================
	   Phase 1: Dock
	   ============================= */
	.matter-head {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px 12px;
		background: #f8f8fc;
		border: 1px solid #eef0fa;
		border-radius: 10px;
		margin-bottom: 10px;
	}

	.matter-icon {
		flex-shrink: 0;
		width: 30px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #216fed1a;
		color: #216fed;
		border-radius: 8px;
	}

	.matter-icon svg {
		width: 14px;
		height: 14px;
	}

	.matter-body {
		flex: 1;
		min-width: 0;
	}

	.matter-name {
		font-size: 11px;
		font-weight: 700;
		color: #282876;
	}

	.matter-sub {
		font-size: 9px;
		color: #8181ac;
		margin-top: 1px;
	}

	.dock-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.dock-row {
		position: relative;
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px 12px;
		background: white;
		border: 1px solid #eef0fa;
		border-radius: 10px;
		opacity: 0;
		animation: fadeInUp 0.5s ease-out forwards;
	}

	.dock-avatar {
		flex-shrink: 0;
		width: 28px;
		height: 28px;
		border-radius: 50%;
		background: linear-gradient(135deg, #836ae4, #6b4fd4);
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 11px;
		font-weight: 700;
	}

	.dock-body {
		flex: 1;
		min-width: 0;
	}

	.dock-name {
		font-size: 11px;
		font-weight: 700;
		color: #282876;
	}

	.dock-status {
		font-size: 9px;
		color: #8181ac;
		margin-top: 1px;
	}

	.dock-badge {
		flex-shrink: 0;
		width: 18px;
		height: 18px;
		background: #10b981;
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		animation: badgePop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
	}

	.dock-badge svg {
		width: 10px;
		height: 10px;
	}

	/* =============================
	   Phase 2: Outcomes
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

	.outcome-list {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.outcome-row {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px;
		background: #f8f8fc;
		border: 1px solid #eef0fa;
		border-radius: 10px;
		opacity: 0;
		animation: fadeInUp 0.5s ease-out forwards;
	}

	.outcome-check {
		flex-shrink: 0;
		width: 22px;
		height: 22px;
		background: #10b981;
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		animation: badgePop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
	}

	.outcome-check svg {
		width: 12px;
		height: 12px;
	}

	.outcome-body {
		flex: 1;
		min-width: 0;
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 8px;
	}

	.outcome-label {
		font-size: 11px;
		font-weight: 600;
		color: #282876;
	}

	.outcome-value {
		font-size: 11px;
		font-weight: 700;
		color: #216fed;
	}

	.outcome-footer {
		margin-top: 14px;
		padding-top: 12px;
		border-top: 1px solid #eef0fa;
		opacity: 0;
		animation: fadeInUp 0.4s ease-out forwards;
	}
</style>
