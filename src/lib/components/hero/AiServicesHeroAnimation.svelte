<script>
	import AnimationStage from '$lib/components/hero/AnimationStage.svelte';
	import PhaseWrapper from '$lib/components/hero/PhaseWrapper.svelte';

	const agents = [
		{ name: 'Intake Triage', icon: 'inbox', status: 'Scoring new leads' },
		{ name: 'Deposition Prep', icon: 'docs', status: 'Drafting cross-exam outlines' },
		{ name: 'Docket Monitor', icon: 'calendar', status: 'Tracking SOL deadlines' },
		{ name: 'Client Updates', icon: 'mail', status: 'Generating status digests' }
	];

	const feedItems = [
		{
			agent: 'Intake Triage',
			summary: 'Drafted follow-up for new PI lead (score 84)',
			time: 'just now'
		},
		{
			agent: 'Docket Monitor',
			summary: 'Flagged SOL deadline in 14 days on Morales v. Crane',
			time: '2m ago'
		},
		{
			agent: 'Deposition Prep',
			summary: 'Built cross-exam outline from Smith transcript (40 pp)',
			time: '11m ago'
		}
	];
</script>

<AnimationStage durations={[5200, 6400]} height={460}>
	{#snippet children(step)}
		<!-- Phase 0: Your firm's agents -->
		{#if step === 0}
			<PhaseWrapper caption="Agents deployed for your firm">
				<div class="roster-scene">
					<div class="roster-card">
						<div class="roster-header">
							<span class="roster-title">Your Firm's Agents</span>
							<span class="roster-count">4 active</span>
						</div>
						<div class="roster-grid">
							{#each agents as agent, i}
								<div class="agent-card" style="animation-delay: {200 + i * 600}ms">
									<div class="agent-icon">
										{#if agent.icon === 'inbox'}
											<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></svg>
										{:else if agent.icon === 'docs'}
											<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="13" y2="17" /></svg>
										{:else if agent.icon === 'calendar'}
											<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
										{:else if agent.icon === 'mail'}
											<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
										{/if}
									</div>
									<div class="agent-body">
										<div class="agent-name">{agent.name}</div>
										<div class="agent-status">{agent.status}</div>
									</div>
									<div class="agent-badge" style="animation-delay: {700 + i * 600}ms">
										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}

		<!-- Phase 1: Drafts ready for review -->
		{#if step === 1}
			<PhaseWrapper caption="Drafts ready. You stay in the pilot seat.">
				<div class="feed-scene">
					<div class="feed-card">
						<div class="feed-header">
							<span class="feed-title">Activity</span>
							<span class="feed-live">
								<span class="feed-live-dot"></span>
								Live
							</span>
						</div>
						<div class="feed-list">
							{#each feedItems as item, i}
								<div class="feed-item" style="animation-delay: {300 + i * 1200}ms">
									<div class="feed-avatar">{item.agent.charAt(0)}</div>
									<div class="feed-body">
										<div class="feed-line">
											<span class="feed-agent">{item.agent}</span>
											<span class="feed-time">{item.time}</span>
										</div>
										<div class="feed-summary">{item.summary}</div>
										<div class="feed-actions">
											<span class="feed-pill feed-pill-review">Review</span>
											<span class="feed-pill feed-pill-approve">Approve</span>
										</div>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</PhaseWrapper>
		{/if}
	{/snippet}
</AnimationStage>

<style>
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes fadeInScale {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes badgePop {
		0% {
			opacity: 0;
			transform: scale(0.2);
		}
		70% {
			opacity: 1;
			transform: scale(1.15);
		}
		100% {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes livePulse {
		0%, 100% {
			opacity: 1;
			box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
		}
		50% {
			opacity: 0.85;
			box-shadow: 0 0 0 4px rgba(16, 185, 129, 0);
		}
	}

	/* =============================
	   Shared card shell
	   ============================= */
	.roster-scene,
	.feed-scene {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.roster-card,
	.feed-card {
		background: white;
		border-radius: 14px;
		box-shadow: 0 10px 40px rgba(40, 40, 118, 0.08), 0 2px 8px rgba(40, 40, 118, 0.04);
		padding: 18px 20px;
		width: 100%;
		max-width: 420px;
		animation: fadeInScale 0.5s ease-out forwards;
	}

	/* =============================
	   Phase 0: Agent roster
	   ============================= */
	.roster-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 12px;
		border-bottom: 1px solid #eef0fa;
		margin-bottom: 14px;
	}

	.roster-title {
		font-size: 13px;
		font-weight: 700;
		color: #282876;
	}

	.roster-count {
		font-size: 10px;
		font-weight: 600;
		color: #836ae4;
		background: #836ae415;
		padding: 3px 9px;
		border-radius: 20px;
	}

	.roster-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
	}

	.agent-card {
		position: relative;
		display: flex;
		align-items: flex-start;
		gap: 10px;
		padding: 10px 12px;
		background: #f8f8fc;
		border: 1px solid #eef0fa;
		border-radius: 10px;
		opacity: 0;
		animation: fadeInUp 0.45s ease-out forwards;
	}

	.agent-icon {
		flex-shrink: 0;
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #836ae41a;
		color: #836ae4;
		border-radius: 8px;
	}

	.agent-icon svg {
		width: 16px;
		height: 16px;
	}

	.agent-body {
		flex: 1;
		min-width: 0;
	}

	.agent-name {
		font-size: 11px;
		font-weight: 700;
		color: #282876;
		margin-bottom: 2px;
	}

	.agent-status {
		font-size: 10px;
		color: #8181ac;
		line-height: 1.35;
	}

	.agent-badge {
		position: absolute;
		top: 8px;
		right: 8px;
		width: 16px;
		height: 16px;
		background: #10b981;
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		animation: badgePop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
	}

	.agent-badge svg {
		width: 10px;
		height: 10px;
	}

	/* =============================
	   Phase 1: Activity feed
	   ============================= */
	.feed-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 12px;
		border-bottom: 1px solid #eef0fa;
		margin-bottom: 10px;
	}

	.feed-title {
		font-size: 13px;
		font-weight: 700;
		color: #282876;
	}

	.feed-live {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 10px;
		font-weight: 600;
		color: #10b981;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.feed-live-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #10b981;
		animation: livePulse 1.8s ease-in-out infinite;
	}

	.feed-list {
		display: flex;
		flex-direction: column;
	}

	.feed-item {
		display: flex;
		gap: 10px;
		padding: 10px 0;
		border-bottom: 1px solid #f4f5fd;
		opacity: 0;
		animation: fadeInUp 0.5s ease-out forwards;
	}

	.feed-item:last-child {
		border-bottom: none;
	}

	.feed-avatar {
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

	.feed-body {
		flex: 1;
		min-width: 0;
	}

	.feed-line {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 8px;
		margin-bottom: 3px;
	}

	.feed-agent {
		font-size: 11px;
		font-weight: 700;
		color: #282876;
	}

	.feed-time {
		font-size: 9px;
		color: #a0a0c0;
		flex-shrink: 0;
	}

	.feed-summary {
		font-size: 10px;
		color: #8181ac;
		line-height: 1.4;
		margin-bottom: 6px;
	}

	.feed-actions {
		display: flex;
		gap: 6px;
	}

	.feed-pill {
		font-size: 9px;
		font-weight: 600;
		padding: 3px 9px;
		border-radius: 20px;
		letter-spacing: 0.2px;
	}

	.feed-pill-review {
		color: #836ae4;
		background: #836ae415;
		border: 1px solid #836ae435;
	}

	.feed-pill-approve {
		color: #10b981;
		background: #10b98112;
		border: 1px solid #10b98130;
	}
</style>
