<script>
	import AnimationStage from '$lib/components/hero/AnimationStage.svelte';
	import PhaseWrapper from '$lib/components/hero/PhaseWrapper.svelte';

	const functionCards = [
		{ name: 'Intake & Growth', count: 6, icon: 'inbox' },
		{ name: 'Deadlines & Compliance', count: 6, icon: 'calendar' },
		{ name: 'Client Communications', count: 5, icon: 'mail' },
		{ name: 'Operations & Billing', count: 6, icon: 'billing' },
		{ name: 'Practice Intelligence', count: 5, icon: 'chart' },
		{ name: 'Casework & Drafting', count: 10, icon: 'docs' }
	];

	const filterChips = ['Personal Injury', 'Family Law', 'Intake & Growth'];

	const filteredCards = [
		{ name: 'Intake & Growth', count: 3, icon: 'inbox' },
		{ name: 'Deadlines & Compliance', count: 2, icon: 'calendar' },
		{ name: 'Casework & Drafting', count: 4, icon: 'docs' }
	];

	const featureAgents = [
		{ name: 'Intake Triage', tag: 'Flagship' },
		{ name: 'Case Viability', tag: 'Supporting' },
		{ name: 'Docketing & Deadlines', tag: 'Flagship' }
	];
</script>

<AnimationStage durations={[4200, 5000, 5200]} height={500}>
	{#snippet children(step)}
		<!-- Phase 0: Grid of function cards -->
		{#if step === 0}
			<PhaseWrapper caption="38 custom agents. Tagged by practice area and function.">
				<div class="scene">
					<div class="catalog-card">
						<div class="card-header">
							<span class="card-title">Agent Catalog</span>
							<span class="card-tag card-tag-violet">38 agents</span>
						</div>
						<div class="function-grid">
							{#each functionCards as func, i}
								<div class="function-card" style="animation-delay: {120 + i * 180}ms">
									<div class="function-icon">
										{#if func.icon === 'inbox'}
											<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></svg>
										{:else if func.icon === 'calendar'}
											<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
										{:else if func.icon === 'mail'}
											<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
										{:else if func.icon === 'billing'}
											<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>
										{:else if func.icon === 'chart'}
											<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></svg>
										{:else if func.icon === 'docs'}
											<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
										{/if}
									</div>
									<div class="function-name">{func.name}</div>
									<div class="function-count">{func.count} agents</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 1: Filter chips + filtered grid -->
		{#if step === 1}
			<PhaseWrapper caption="Filter by practice area or function to narrow the list.">
				<div class="scene">
					<div class="catalog-card">
						<div class="card-header">
							<span class="card-title">Filter agents</span>
							<span class="card-tag">9 matches</span>
						</div>
						<div class="chip-row">
							{#each filterChips as chip, i}
								<span class="chip" style="animation-delay: {200 + i * 200}ms">
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
									{chip}
								</span>
							{/each}
						</div>
						<div class="function-grid function-grid-reduced">
							{#each filteredCards as func, i}
								<div class="function-card" style="animation-delay: {1100 + i * 250}ms">
									<div class="function-icon">
										{#if func.icon === 'inbox'}
											<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></svg>
										{:else if func.icon === 'calendar'}
											<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
										{:else if func.icon === 'docs'}
											<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
										{/if}
									</div>
									<div class="function-name">{func.name}</div>
									<div class="function-count">{func.count} agents</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 2: Zoom into featured agents -->
		{#if step === 2}
			<PhaseWrapper caption="Every agent has a full detail page with scenarios, inputs, and safety posture.">
				<div class="scene">
					<div class="feature-card">
						<div class="card-header">
							<span class="card-title">Matching agents</span>
							<span class="live-tag">
								<span class="live-dot"></span>
								Live
							</span>
						</div>
						<div class="agent-stack">
							{#each featureAgents as agent, i}
								<div class="agent-row" style="animation-delay: {250 + i * 550}ms">
									<div class="agent-avatar">{agent.name.charAt(0)}</div>
									<div class="agent-body">
										<div class="agent-name">{agent.name}</div>
										<div class="agent-tag">{agent.tag}</div>
									</div>
									<span class="agent-arrow">
										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
									</span>
								</div>
							{/each}
						</div>
						<div class="feature-footer" style="animation-delay: 2100ms">
							<span class="footer-note">38 agents, ready for your firm's detail.</span>
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

	.catalog-card,
	.feature-card {
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

	/* =============================
	   Phase 0/1: Function grid
	   ============================= */
	.function-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 8px;
	}

	.function-grid-reduced {
		margin-top: 4px;
	}

	.function-card {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 4px;
		padding: 10px 12px;
		background: #f8f8fc;
		border: 1px solid #eef0fa;
		border-radius: 10px;
		opacity: 0;
		animation: fadeInUp 0.45s ease-out forwards;
	}

	.function-icon {
		width: 28px;
		height: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #836ae41a;
		color: #836ae4;
		border-radius: 8px;
		margin-bottom: 2px;
	}

	.function-icon svg {
		width: 14px;
		height: 14px;
	}

	.function-name {
		font-size: 10px;
		font-weight: 700;
		color: #282876;
		line-height: 1.2;
	}

	.function-count {
		font-size: 9px;
		color: #8181ac;
	}

	/* =============================
	   Phase 1: Filter chips
	   ============================= */
	.chip-row {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin-bottom: 12px;
	}

	.chip {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		padding: 4px 9px;
		background: #216fed;
		color: white;
		font-size: 9px;
		font-weight: 600;
		border-radius: 12px;
		opacity: 0;
		animation: fadeInUp 0.4s ease-out forwards;
	}

	.chip svg {
		width: 9px;
		height: 9px;
	}

	/* =============================
	   Phase 2: Feature agents
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

	.agent-stack {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.agent-row {
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

	.agent-avatar {
		flex-shrink: 0;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: linear-gradient(135deg, #836ae4, #6b4fd4);
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 13px;
		font-weight: 700;
	}

	.agent-body {
		flex: 1;
		min-width: 0;
	}

	.agent-name {
		font-size: 12px;
		font-weight: 700;
		color: #282876;
	}

	.agent-tag {
		font-size: 10px;
		color: #8181ac;
		margin-top: 2px;
	}

	.agent-arrow {
		flex-shrink: 0;
		color: #216fed;
	}

	.agent-arrow svg {
		width: 14px;
		height: 14px;
	}

	.feature-footer {
		margin-top: 14px;
		padding-top: 12px;
		border-top: 1px solid #eef0fa;
		opacity: 0;
		animation: fadeInUp 0.4s ease-out forwards;
	}

	.footer-note {
		font-size: 11px;
		color: #8181ac;
		font-style: italic;
	}
</style>
